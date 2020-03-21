const express = require('express')
const Router = express.Router()

const auth = require('./../../startup/auth')

const { CustomerController } = require('./../../controller')

// REGISTER
Router.post('/register', CustomerController.createCustomer)

// LOGIN
Router.post('/login', CustomerController.login)

module.exports = Router