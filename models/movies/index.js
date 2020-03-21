
const mongoose = require('mongoose')
const Schema = require('./schema')


const movie = mongoose.model('Movie', Schema)

module.exports = movie