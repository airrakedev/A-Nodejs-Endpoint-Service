const express = require('express')
const Router = express.Router()

const auth = require('./../../startup/auth')

const { CustomerController } = require('./../../controller')

// REGISTER
Router.post('/register', CustomerController.createCustomer)

// LOGIN
Router.post('/login', CustomerController.login)

// ALL CLIENTS
Router.get('/all-clients', auth, CustomerController.getAllClient)

module.exports = Router