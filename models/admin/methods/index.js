const jwt = require('jsonwebtoken');
require('dotenv').config()

const bcrypt = require('bcrypt');
const saltRounds = 10;

const methods = {}

methods.setUserAuthentication = function (schema) {
    let user = schema
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_PRIVATE_KEY);
    return token
}


methods.hashPassword = function (next, schema) {
    let user = schema

    if (!user.isModified('password')) return next()

    bcrypt.genSalt(saltRounds, function (err, salt) {
        if (err) return next(err)

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err)

            user.password = hash
            next()
        })
    })
}

methods.comparePassword = async function (candidatePassword, schema) {
    let user = schema
    // return candidatePassword
    let decrypt = await bcrypt.compare(candidatePassword, user.password);
    return decrypt
}



module.exports = methods