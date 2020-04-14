
const mongoose = require('mongoose')
const Methods = require('./../methods')

const genreSchema = require('./../../genres/schema')

const Schema = new mongoose.Schema({
    title: {
        type: String,
        // unique: [ true, 'Movie title is already taken.' ],
        required: [true, 'Movie title is required'],
        trim: true
    },
    inStock: {
        type: Number,
        min: 0
    },
    rentPrice: {
        type: Number,
        required: [true, 'Price is required']
    },
    description: {
        type: String
    },
    plot: {
        type: String
    },
    genre: [
        {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    // required: [ true, 'Please provide title' ],
                    trim: true
                }
            }),
            required: [true, 'Movie genre is required.']
        }
    ],
    image: {
        type: String
    },
    actor: {
        type: Array,
        default: []
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