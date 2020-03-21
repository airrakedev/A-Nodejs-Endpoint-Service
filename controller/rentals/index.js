const _ = require('lodash')
const path = require('path')

const { Rentals, Customers, Movie } = require('./../../models')
const { createRental } = require('./validation')
const { catchAsyncErrors } = require('./../../startup/error-logger')

const rentalController = {}

rentalController.getRental = catchAsyncErrors(async (req, res) => {
    let getAllRentals = await Rentals.find()

    if (!getAllRentals) return res.status(500).json({ success: false, message: 'No rental record available.' });

    return res.status(200).json({ success: true, data: getAllRentals })
})


rentalController.createRental = async (req, res) => {
    // CUSTOM VALIDATOR
    let { error } = await createRental(req.body)
    const { dateOut, title, description, customerId, movieId, dateReturn } = req.body

    if (error) return res.status(500).json({ success: false, message: error.details[ 0 ].message })

    // CUSTOMER ID
    let customer = await Customers.findById(customerId)
    if (!customer) return res.status(500).json({ success: false, message: 'Unable to locate customer record.' })


    // MOVIE ID
    let movieData = await validateMovies(movieId)
    if (movieData.length != 2) return res.status(500).json({ success: false, message: 'Unable to locate movie record.' })

    console.log('\n mos vae boom')
    let createRentalRecord = await Rentals.create({
        dateOut,
        title,
        quantity: movieData[ 1 ].qty,
        customer: {
            firstname: customer.firstname,
            phone: customer.phone
        },
        movies: movieData[ 0 ],
        // [ {
        //     title,
        //     rentPrice
        // } ],
        rentTotal: movieData[ 1 ].totalRental,
        description,
        dateReturn
    })

    if (!createRentalRecord) return res.status(400).json({ success: false, message: "Cant create Rental record." });
    return res.status(200).json({ success: true, data: createRentalRecord });
}

// movieId = [
//     {
//         id:id,
//         qty:qty,
// rentPrice:rentPrice
//     }
// ]

let validateMovies = async function (movies) {
    let countMovies = movies.length
    let eachMovie = []
    let movieQuantity = []
    let movieRentTotal = []
    let allMovies = []
    let price = 0

    if (countMovies) {

        for (let index = 0; index < countMovies; index++) {

            let movieRecord = await Movie.findById(movies[ index ].id)
            if (!movieRecord) return res.status(400).json({ success: false, message: 'Could not find movie record.' })

            price = parseInt(movies[ index ].qty * movies[ index ].rentPrice, 10)
            movieRentTotal.push(eval(movies[ index ].qty * movies[ index ].rentPrice, 10))
            movieQuantity.push(movies[ index ].qty)
            eachMovie.push({ id: movieRecord._id, title: movieRecord.title, rentPrice: movieRecord.rentPrice })
        }
        allMovies.push(eachMovie, { qty: customReducer(movieQuantity), totalRental: customReducer(movieRentTotal) })
    }
    return allMovies
}

const customReducer = function (inputArray) {
    return inputArray.reduce((accumulator, currentValue) => accumulator + currentValue);
}
module.exports = rentalController