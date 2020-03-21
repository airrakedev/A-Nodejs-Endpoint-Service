
const mongoose = require('mongoose')
const Methods = require('../methods')

const bcrypt = require('bcrypt');
const saltRounds = 10;

const Schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [ true, 'Firstname is required' ],
        trim: true
    },
    lastname: {
        type: String,
        required: [ true, 'Lastname is required' ],
        trim: true
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: [ true, 'Email already exist. Please provide different email address' ],
        trim: true,
        match: [ /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address' ]
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]
    },
    reset_token: {
        type: String,

    },
    image: {
        type: String,

    },
    status: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: [ 'admin', 'user' ],
        default: 'admin'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,

    }
})

// ENCRYPT PASSWORD
Schema.pre('save', function (next) {
    return Methods.hashPassword(next, this)
})

// AUTHORIZATION
Schema.methods.setUSerAuthorizationToken = function () {
    return Methods.setUserAuthentication(this)
}

// DECRYPT PASSWORD
Schema.methods.comparePassword = function (userPass) {
    return Methods.comparePassword(userPass, this)
}


module.exports = Schema