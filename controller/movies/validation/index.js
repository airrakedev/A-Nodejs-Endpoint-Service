const Joi = require('@hapi/joi')

const validator = {}

validator.toValidate = function (inputs) {
    const schema = Joi.object({
        title: Joi.string()
            .required()
            .trim(),
        inStock: Joi.number()
            .min(1)
            .integer()
            .required(),
        rentPrice: Joi.number()
            .min(1)
            .required(),
        genre: Joi.string()
            .required(),

        actor: Joi.string(),
        description: Joi.string(),
        plot: Joi.string()
    })

    return schema.validate(inputs)
}

validator.movieUpdate = function (inputs) {
    const schema = Joi.object({
        title: Joi.string()
            .required()
            .trim(),
        inStock: Joi.number()
            .min(1)
            .integer()
            .required(),
        rentPrice: Joi.number()
            .min(1)
            .required(),

        genreTitle: Joi.string()
            .required(),
        actor: Joi.array().items(Joi.string()),
        description: Joi.string(),
        plot: Joi.string()
    })

    return schema.validate(inputs)
}

module.exports = validator