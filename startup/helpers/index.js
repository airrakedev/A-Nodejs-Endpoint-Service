const _ = require('lodash')
const {
  Genres,
  Movie
} = require('./../../models')
const helpers = {}

helpers.getGenresIdArray = async function (array_id) {
  let result = []

  for (var i = array_id.length - 1; i >= 0; i--) {
    let checkId = await Genres.findById(array_id[i])

    if (checkId) {
      result.push({
        _id: checkId._id,
        title: checkId.title
      })
    }
  }
  console.log('Hoy', result)
  return result
}

helpers.processImageProfile = async function (movieProfile, id) {

  let profile = movieProfile
  // CHECK PARAMS ID
  let movieId = id
  if (!movieId) next()

  // CHECK MOVIE RECORD

  let movieRecord = await Movie.findById(movieId)
  if (!movieRecord) next()

  // PROCESS MOVIE IMAGE PROFILE
  if (!profile.mimetype.startsWith('image')) next()

  let split = profile.mimetype.split('/')
  let fileExt = split[split.length - 1]
  let imageFile = `movie_profile_${movieId}.${fileExt}`
  let filename = `${process.env.UPLOAD_LOCATION}/${imageFile}`

  let uploaded = await profile.mv(filename, async (err) => {
    if (err) next()

    movieRecord.image = imageFile;

    let saveDoc = await movieRecord.save()
    if (!saveDoc) next()

    // return res.status(200).json({
    //   success: true,
    //   data: filename,
    //   doc: saveDoc
    // })
  })
}

module.exports = helpers