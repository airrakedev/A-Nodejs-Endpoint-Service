
const mongoose = require('mongoose')
const Methods = require('./../methods')

const customerSchema = require('./../../customers/schema')
const movieSchema = require('./../../movies/schema')

const Schema = new mongoose.Schema({
    dateOut: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String
    },
    quantity: {
        type: Number,
        // min: 0
    },
    customer: {
        type: new mongoose.Schema({
            firstname: {
                type: String,
                // required: [ true, 'Customer name is required when creating reantals' ],
                // trim: true
            },
            phone: {
                type: String,
                // required: [ true, 'Customer phone number is needed.' ],
                // tirm: true
            }
        }),
        // required: [ true, 'Customer name is required' ]
    },
    movies: [
        {
            type: new mongoose.Schema({
                title: {
                    type: String,
                    // required: [ true, 'Movie title is required when creating reantals' ],
                    // trim: true
                },
                rentPrice: {
                    type: Number,
                    // required: true,
                    // min: 0
                }
            }),
            // required: [ true, 'Movie title is required.' ]
        }
    ],
    rentTotal: {
        type: Number,
        // required: [ true, 'Price is required' ]
    },
    description: {
        type: String
    },
    dateReturn: {
        type: Date
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