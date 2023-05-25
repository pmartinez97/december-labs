const { Transaction } = require('../models');

async function getAll(req, res, next) {
  try {
  } catch (err) {
    return next({ status: 400, message: err });
  }
}

module.exports = {
  getAll
}