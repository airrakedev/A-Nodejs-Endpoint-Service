
const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2');

const Schema = require('./schema')

Schema.plugin(mongoosePaginate);
const movie = mongoose.model('Movie', Schema)

module.exports = movie