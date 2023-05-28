const Joi = require('joi')

const transferSchema = Joi.object({
    accountFrom: Joi.string().guid().required(),
    accountTo: Joi.string().guid().required(),
    amount: Joi.number().min(0).required(),
    date: Joi.date().timestamp('unix').required(),
    description: Joi.string()
});

module.exports = transferSchema;