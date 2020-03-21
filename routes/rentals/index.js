const express = require('express')
const Router = express.Router()

const auth = require('./../../startup/auth')

const { RentalController } = require('./../../controller')


Router.get('/', auth, RentalController.getRental)

Router.post('/create', auth, RentalController.createRental)


module.exports = Router