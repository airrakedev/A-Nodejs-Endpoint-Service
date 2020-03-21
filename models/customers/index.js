
const mongoose = require('mongoose')
const Schema = require('./schema')


const customers = mongoose.model('Customers', Schema)

module.exports = customers
