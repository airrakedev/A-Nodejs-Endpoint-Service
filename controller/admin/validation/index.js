const Joi = require('@hapi/joi')

const validator = {}

validator.toValidate = function (inputs) {
    const schema = Joi.object({
        firstname: Joi.string()
            .required()
            .trim(),
        lastname: Joi.string()
            .required()
            .trim(),
        email: Joi.string()
            .required()
            .trim()
            // .unique()
            .email(),
        password: Joi.string()
            .required()
    })

    // return Joi.validate(inputs, schema)
    return schema.validate(inputs)
}

module.exports = validator