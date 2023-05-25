const models = require('../models');
const { Op } = require("sequelize");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

// This endpoint will only return the transactions sended by user logged in
async function getAll(req, res, next) {
  const userId = req.headers['user-id'];
  const { from, to, sourceAccountId } = req.body;
  try {
    const where = {}
    const include = [
      {
        model: models.Account,
        as: 'from',
        where: {
          userId
        },
        required: true,
        include: [{
          model: models.User,
          as: 'user'
        }]
      },
      {
        model: models.Account,
        as: 'to',
        include: [{
          model: models.User,
          as: 'user'
        }]
      }
    ];

    if ( from || to ) {
      where.transferDate = {}
      if ( from ) {
        where.transferDate[Op.gte] = from
      }    
      if ( to ) {
        where.transferDate[Op.lte] = to
      }
    }

    if ( sourceAccountId ) {
      // Validate if sourceAccountId belongs to an account of logged user
      const accountBelongsToLoggedUser = await models.Account.findAll({
        where: {
          accountId: sourceAccountId,
          userId
        }
      })

      if ( !accountBelongsToLoggedUser ) {
        throw new ApiError(httpStatus.BAD_REQUEST, 'The account does not belong to the logged in user');
      }

      where.fromAccountId = sourceAccountId
    }

    const transfers = await models.Transfer.findAll({where, include})
    return res.status(200).json(transfers);
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll
}