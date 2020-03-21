const Joi = require('@hapi/joi')

const JoiValidator = {}

JoiValidator.createRental = function (input) {
    const schema = Joi.object({
        dateOut: Joi.date()
            .default(Date.now),
        title: Joi.string()
            .required(),
        description: Joi.string()
            .required(),
        customerId: Joi.string()
            .required(),
        movieId: Joi.array()
            .items(Joi.object())
            .required(),
        dateReturn: Joi.date()
    })
    return schema.validate(input)
}

module.exports = JoiValidator