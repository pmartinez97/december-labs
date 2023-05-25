const { Account } = require('../models')

const auth = async (req, res, next) => {
  const userLoggedIn = req.headers['user-id'];
  const accountFromTransfer = req.body.accountFrom;
  const accountInstance = await Account.findByPk(accountFromTransfer);

  if (!userLoggedIn || !accountInstance || accountInstance.userId != userLoggedIn ) {
    return res.status(400).send("This user doesn't have the necessary permissions to execute this action")
  }

  next()
}

module.exports = auth;