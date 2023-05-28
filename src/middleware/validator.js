const ApiError = require('../utils/ApiError');
const httpStatus = require('http-status');
//* Include all validators
const Validators = require('./validators')

module.exports = function(validator) {
    //! If validator is not exist, throw err
    if(!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator is not exist`)

    return async function(req, res, next) {
        try {
            const validated = await Validators[validator].validateAsync(req.body)
            req.body = validated
            next()
        } catch (err) {
            //! If validation error occurs call next with HTTP 422. Otherwise HTTP 500
            if(err.isJoi) 
                return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY,err.message))
            next(new ApiError(httpStatus.INTERNAL_SERVER_ERROR))
        }
    }
}