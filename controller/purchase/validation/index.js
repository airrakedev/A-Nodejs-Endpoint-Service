const Joi = require('@hapi/joi')

const JoiValidator = {}

JoiValidator.createPurchaseValidation = function (input) {
   const schema = Joi.object({

      client: Joi.object().keys({
         _id: Joi.string(),
         firstname: Joi.string(),
         lastname: Joi.string(),
         email: Joi.string()
      }),
      movies: Joi.array()
         .items(Joi.object())
         .required(),
   })
   return schema.validate(input)
}

module.exports = JoiValidator