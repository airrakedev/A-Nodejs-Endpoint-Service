const express = require('express')
const Router = express.Router()

const auth = require('./../../startup/auth')

const { MovieController } = require('./../../controller')


Router.get('/', auth, MovieController.getMovies)

Router.post('/', auth, MovieController.createMovies)

Router.put('/:id/update', auth, MovieController.updateMovie)

Router.put('/:id/profile', auth, MovieController.uploadProfile)


module.exports = Router