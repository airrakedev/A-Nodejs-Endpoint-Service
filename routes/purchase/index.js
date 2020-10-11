const express = require('express')
const Router = express.Router()

const auth = require('./../../startup/auth')

const { PurchaseController } = require('./../../controller')


Router.get('/', auth, PurchaseController.getCheckout)

Router.post('/create', auth, PurchaseController.createPurchase)


module.exports = Router