const express = require('express')
const Router = express.Router()

const auth = require('./../../startup/auth')

const { AdminController } = require('./../../controller')

Router.post('/', AdminController.createAdmin)

Router.post('/login', AdminController.userLogin)

Router.put('/update', auth, AdminController.updateAdmin)

Router.post('/upload-profile', auth, AdminController.uploadProfile)

module.exports = Router