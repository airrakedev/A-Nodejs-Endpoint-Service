const _ = require('lodash')
const { Genres } = require('./../../models')
const { catchAsyncErrors } = require('./../../startup/error-logger')

const genresController = {}

genresController.getGenre = catchAsyncErrors(async (req, res) => {

    let genres = await Genres.find()

    if (!genres) return res.status(401).json({ data: 'Something went during fetching data.' })

    let newGenres = _.map(genres, (genre)=>_.pick(genre, [ 'status', '_id', 'title', 'description', 'created']))

    res.status(200).json({
        success: true,
        data: newGenres
    })

})

genresController.createGenre = catchAsyncErrors(async (req, res) => {
    const { title, description } = req.body

    if (!req.body) return res.status(400).json({ success: false, message: "Movie title and description are required." });

    let checkTitle = await Genres.find({ title })
    if (checkTitle.length) return res.status(400).json({ success: false, message: `${title} already taken.` })

    let genre = await Genres.create({ title, description })
    if (!genre) return res.status(400).json({ success: false, message: 'Couldn\'t create a movie.' })

    res.status(200).json({
        success: false,
        data: genre
    })
})


genresController.updateGenre = catchAsyncErrors(async (req, res) => {

    const { title, description } = req.body
    let genreId = req.params.genreId
    if (!genreId) return res.status(400).json({ success: false, message: 'Please provide genre to get updated.' })

    if (!req.body) return res.status(400).json({ success: false, message: 'Please provide data for updates.' });

    let genre = await Genres.findById(genreId)
    if (!genre) return res.status(400).json({ success: false, message: 'Can\'t find record.' });

    genre.title = title
    genre.description = description

    let saveDoc = await genre.save()

    if (!saveDoc) return res.status(400).json({ success: false, message: 'Unable to update record.' })

    res.status(200).json({ success: true, data: saveDoc })

})

module.exports = genresController