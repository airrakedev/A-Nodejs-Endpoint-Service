
const mongoose = require('mongoose')
const Schema = require('./schema')

const mongoosePaginate = require('mongoose-paginate-v2');

Schema.plugin(mongoosePaginate);
const purchase = mongoose.model('Purchase', Schema)

module.exports = purchase