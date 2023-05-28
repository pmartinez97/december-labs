const Joi = require('joi')

const transactionSchema = Joi.object({
    from: Joi.date().iso(),
    to: Joi.date().iso().min(Joi.ref('from')),
    sourceAccountId: Joi.string().guid()
});

module.exports = transactionSchema;