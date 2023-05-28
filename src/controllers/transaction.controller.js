const models = require('../models');
const { Op } = require("sequelize");
const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

async function getAll(req, res, next) {
  const userId = req.headers['user-id'];
  const { from, to, sourceAccountId } = req.body;
  try {
    const where = {}
    const includeAsSource = [
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

    const includeAsReceiver = [
      {
        model: models.Account,
        as: 'from',
        include: [{
          model: models.User,
          as: 'user'
        }]
      },
      {
        model: models.Account,
        as: 'to',
        where: {
          userId
        },
        required: true,
        include: [{
          model: models.User,
          as: 'user'
        }]
      }
    ]

    if ( from || to ) {
      where.transferDate = {}
      if ( from ) {
        where.transferDate[Op.gte] = from
      }    
      if ( to ) {
        where.transferDate[Op.lte] = to
      }
    }

    const response = {};
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
    } else {
      response.transfersReceived = await models.Transfer.findAll({
        where, 
        include: includeAsReceiver,
        order: [ ['transferDate', 'DESC'] ]
      });
    }
    
    response.transfersSent = await models.Transfer.findAll({
      where, 
      include: includeAsSource,
      order: [ ['transferDate', 'DESC'] ]
    });

    return res.status(200).json(response);
  } catch (err) {
    next(err)
  }
}

module.exports = {
  getAll
}