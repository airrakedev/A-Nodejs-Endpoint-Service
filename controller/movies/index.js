const _ = require('lodash')
const { Movie, Genres } = require('./../../models')
const { catchAsyncErrors } = require('./../../startup/error-logger')

const { getGenresIdArray } = require('./../../startup/helpers')

const { toValidate, movieUpdate } = require('./validation')

const movieController = {}


movieController.getMovies = catchAsyncErrors(async (req, res) => {
    let movies = await Movie.find()
    if (!movies) return res.status(400).json({ success: false, message: 'No records found for Movies' })

    res.status(200).json({ success: true, data: movies })
})




movieController.createMovies = async (req, res, next) => {
    
    console.log(req.body,'\'n Request')
    console.log(req.files,'\'n Files')
    return
    // GENRES ID
    const { genre, actor, title, inStock, rentPrice, description, plot } = req.body
    const { error } = toValidate(req.body)

    
    if (error) return res.status(400).json({ sucsess: false, message: error.details[ 0 ].message })

    // CHECK IF ALL GENRES ID ARE AVAILABLE
    let getGenresHelper = await getGenresIdArray(genre)
   
    if (!getGenresHelper.length) return res.status(400).json({ success: false, message: 'Please select movie genres.' })

    let movie = await Movie.create({
        genre: getGenresHelper,
        actor,
        title,
        inStock,
        rentPrice,
        description,
        plot
    })
    if (!movie) return res.status(400).json({ success: false, message: 'Couldn\'t create the movie.' })

    res.status(200).json({ success: true, data: movie })
}



movieController.updateMovie = catchAsyncErrors(async (req, res) => {
    // CHECK PARAMS ID
    let movieId = req.params.id
    if (!movieId) return res.status(400).json({ success: false, message: 'Provide movie id.' })

    // CHECK MOVIE RECORD
    let movie = await Movie.findById(movieId)
    if (!movie) return res.status(400).json({ success: false, message: 'Cant find this movie.' })

    const { genreTitle, actor, title, inStock, rentPrice, description, plot } = req.body
    const { error } = movieUpdate(req.body)

    // CHECK MOVIE VALIDATION
    if (error) return res.status(400).json({ sucsess: false, message: error.details[ 0 ].message })

    let updateData = await Movie.findByIdAndUpdate(movieId, { genre: { title: genreTitle }, actor, title, inStock, rentPrice, description, plot }, { new: true })

    if (!updateData) res.status(400).json({ success: false, message: 'Cant update record.' })

    res.status(200).json({ success: true, data: updateData })
})


movieController.uploadProfile = catchAsyncErrors(async (req, res) => {
    // CHECK FILE UPLOAD

    if (!req.files) return res.status(400).json({ success: false, message: 'Please upload movie profile image' })
    let profile = req.files.movieProfile
    // CHECK PARAMS ID
    let movieId = req.params.id
    if (!movieId) return res.status(400).json({ success: false, message: 'Provide movie id.' })

    // CHECK MOVIE RECORD

    let movieRecord = await Movie.findById(movieId)
    if (!movieRecord) return res.status(500).json({ success: false, message: 'Cant find movie record.' })

    // PROCESS MOVIE IMAGE PROFILE
    if (!profile.mimetype.startsWith('image')) return res.status(200).json({ success: false, message: 'Please upload image file only.' })

    let split = profile.mimetype.split('/')
    let fileExt = split[ split.length - 1 ]
    let imageFile = `movie_profile_${movieId}.${fileExt}`
    let filename = `${process.env.UPLOAD_LOCATION}/${imageFile}`

    let uploaded = await profile.mv(filename, async (err) => {
        if (err) return res.status(400).json({ success: false, message: 'Sorry unable to upload your profile image.' })

        movieRecord.image = imageFile;

        let saveDoc = await movieRecord.save()
        if (!saveDoc) return res.status(400).json({ success: false, message: 'Couldn\'t update your profile record.' })

        return res.status(200).json({ success: true, data: filename, doc: saveDoc })
    })
})

module.exports = movieController
