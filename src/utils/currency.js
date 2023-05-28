const models = require('../models')
const { Op } = require("sequelize");
const redisClient = require('../services/redis.service')
const redisHelper = require('../utils/redisHelper');
const ApiError = require('../utils/ApiError');
const axios = require('axios');
const fixerConfig = require('../config/fixerAPI');

const CURRENCY_RATE_KEY = 'currencies'
const CURRENCIES_SUPPORTED = 'UYU,USD,EUR'
const BASE_CURRENCY = 'UYU'

async function convertCurrency(info, transaction) {
  const currenciesFromDB = await models.Currency.findAll({
    where: {
      currencyId: {
        [Op.in]: [info.fromCurrency, info.toCurrency]
      }
    },
    transaction: transaction
  })

  const fromCurrency = currenciesFromDB.find( currency => currency.currencyId === info.fromCurrency );
  const toCurrency = currenciesFromDB.find( currency => currency.currencyId === info.toCurrency );

  // Save currencies rates information on redis to reduce posts done to FIXER api
  let currencies = await redisHelper.get(redisClient, CURRENCY_RATE_KEY);
  if (currencies === null ) {
    currencies = await getCurrenciesFixerAPI()
    redisHelper.setEx(redisClient, CURRENCY_RATE_KEY, process.env.KEY_EXPIRES_TIME, JSON.stringify(currencies))
  } else {
    currencies = JSON.parse(currencies);
  }

  let convertedAmount = null;
  const fromCurrencyCode = fromCurrency.currencyCode
  const toCurrencyCode = toCurrency.currencyCode

  if ( fromCurrencyCode === BASE_CURRENCY ) {
    convertedAmount = info.amount * currencies.rates[toCurrencyCode];
  } else if ( toCurrencyCode === BASE_CURRENCY ) {
    convertedAmount = info.amount / currencies.rates[fromCurrencyCode];
  } else {
    convertedAmount = ( info.amount / currencies.rates[fromCurrencyCode] ) * currencies.rates[toCurrencyCode];
  }

  return convertedAmount;
}

async function getCurrenciesFixerAPI() {
  const requestOptions = {
    method: 'GET',
    headers: {
      'apikey': fixerConfig.fixerApiKey
    }
  }

  try {
    const response = await axios.get(`${fixerConfig.fixerApiUrl}/latest?symbols=${CURRENCIES_SUPPORTED}&base=${BASE_CURRENCY}`, requestOptions);

    return response.data;
  } catch(error) {
    throw new ApiError(httpStatus.BAD_REQUEST, error.message);
  }
}

module.exports = {
  convertCurrency
}
