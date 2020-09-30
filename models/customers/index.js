
const mongoose = require('mongoose')
const Schema = require('./schema')
const mongoosePaginate = require('mongoose-paginate-v2');

Schema.plugin(mongoosePaginate);
const customers = mongoose.model('Customers', Schema)

module.exports = customers
