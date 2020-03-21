const mongoose = require('mongoose')
const Methods = require('./../methods')

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: [ true, 'Please provide title' ],
        unique: [ true, 'Title already taken. Please provide another title.' ],
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date
    }
})

Schema.methods = Methods


module.exports = Schema