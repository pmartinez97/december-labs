const models = require('../models')
const { Op } = require("sequelize");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { convertCurrency } = require('../utils/currency');

const TOTAL_ACCOUNTS_ON_TRANSFER = 2

async function create(req, res, next) {
  const transferInfo = req.body;
  const transaction = await models.sequelize.transaction();
  try {
    if ( transferInfo.accountFrom === transferInfo.accountTo ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The sender and destination should be different');
    }

    const transferAccounts = await models.Account.findAll({
      where: {
        accountId: {
          [Op.in]: [transferInfo.accountFrom, transferInfo.accountTo]
        }
      },
      transaction
    })

    if ( transferAccounts.length !== TOTAL_ACCOUNTS_ON_TRANSFER ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The sender or destination account does not exist');
    }

    const fromAccount = transferAccounts.find( account => account.accountId === transferInfo.accountFrom );
    const toAccount = transferAccounts.find( account => account.accountId === transferInfo.accountTo );
    const mustHaveAmount = shouldChargeTransaction(fromAccount.userId, toAccount.userId) ? transferInfo.amount * process.env.COMISSION_MULTIPLIER : transferInfo.amount;

    // Check if sender account has has enough funds
    if ( fromAccount.balance < mustHaveAmount ) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'The sender account does not have sufficient funds');
    }

    let amount = transferInfo.amount; // Be careful not to use mustHaveAmount to calculate the amount that the recipient account will receive
    // Check if the currencies of the accounts are different

    if ( shouldConvertCurrency(fromAccount.currencyId, toAccount.currencyId) ) {
      amount = await convertCurrency(
        {
          amount,
          fromCurrency: fromAccount.currencyId,
          toCurrency: toAccount.currencyId,
        },
        transaction
      );
    }

    const accountUpdatePromises = [
      // Add amount to balance on the destination account
      models.Account.update({
        balance: toAccount.balance + amount
      }, {
        where: {
          accountId: toAccount.accountId
        },
        transaction
      }),
      // Remove total transfer amount from sender account
      models.Account.update({
        balance: fromAccount.balance - mustHaveAmount
      }, {
        where: {
          accountId: fromAccount.accountId
        },
        transaction
      }),
    ];

    await Promise.all(accountUpdatePromises);

    const transferCreated = await models.Transfer.create({
      amount: transferInfo.amount,
      description: transferInfo.description,
      fromAccountId: transferInfo.accountFrom,
      toAccountId: transferInfo.accountTo,
      transferDate: transferInfo.date,
    }, {
      transaction
    })

    await transaction.commit();
    return res.status(201).json(transferCreated);
  } catch(err) {
    await transaction.rollback();
    next(err)
  }
}

// If the transfer is made between two accounts of the same user
function shouldChargeTransaction(userFrom, userTo) {
  return userFrom !== userTo
}

function shouldConvertCurrency(currencyIdFrom, currencyIdTo) {
  return currencyIdFrom != currencyIdTo
}

module.exports = {
  create
}