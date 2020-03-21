
const mongoose = require('mongoose')
const Schema = require('./schema')


const admin = mongoose.model('Admin', Schema)

module.exports = admin
