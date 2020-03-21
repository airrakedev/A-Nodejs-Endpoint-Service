
const mongoose = require('mongoose')
const Schema = require('./schema')


const rentals = mongoose.model('Rentals', Schema)

module.exports = rentals