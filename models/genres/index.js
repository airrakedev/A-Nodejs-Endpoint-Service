
const mongoose = require('mongoose')
const Schema = require('./schema')


const genres = mongoose.model('Genres', Schema)

module.exports = genres