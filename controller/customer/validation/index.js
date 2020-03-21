const Joi = require('@hapi/joi')

const validator = {}

validator.validateCreate = function (inputs) {
    const schema = Joi.object({
        firstname: Joi.string()
            .required()
            .trim(),
        lastname: Joi.string()
            .required()
            .trim(),
        password: Joi.string(),
        
        email: Joi.string()
            .required()
            .trim()
            .email(),
        phone: Joi.string()
            .trim()
            .required(),
        address: Joi.string()
    })

    // return Joi.validate(inputs, schema)
    return schema.validate(inputs)
}

module.exports = validator