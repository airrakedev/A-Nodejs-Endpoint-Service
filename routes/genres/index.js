const express = require('express')
const Router = express.Router()

const { catchAsyncErrors } = require('./../../startup/error-logger')
const auth = require('./../../startup/auth')

const { Genres } = require('./../../models')

const { GenreController } = require('./../../controller')


Router.get('/', GenreController.getGenre)

Router.post('/', auth, GenreController.createGenre)

Router.put('/:genreId', auth, GenreController.updateGenre)



module.exports = Router