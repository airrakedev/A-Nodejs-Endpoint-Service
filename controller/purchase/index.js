const _ = require('lodash')
const path = require('path')

const { Customers, Movie, Purchases } = require('./../../models')
const { createPurchaseValidation } = require('./validation')
const { catchAsyncErrors } = require('./../../startup/error-logger')

const purchaseController = {}



purchaseController.getCheckout = catchAsyncErrors(async (req, res) => {

   const { pageNumber, limit, sort, id, clientId } = req.query

   const options = {
      page: parseInt(pageNumber, 10) || 1,
      limit: parseInt(limit, 10) || 10,
      sort: (sort) ? JSON.parse(sort) : { created: -1 },
   };

   let checkOut = false

   checkOut = await Purchases.paginate({}, options)

   if (clientId) {
      checkOut = await Purchases.paginate({ client: { _id: clientId } }, options)
      console.log(req.query, "boom")
   }
   if (id) {
      checkOut = await Purchases.paginate({ _id: id }, options)
   }

   if (!checkOut) return res.status(500).json({ success: false, message: 'No checkout record available.' });

   return res.status(200).json({ success: true, data: checkOut })
})


purchaseController.createPurchase = async (req, res) => {

   const { client, movies, amountTotal, quantity, paymentMethod, status, paymentDetails } = req.body
   const clientSelected = {
      _id: client._id,
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email
   }
   const updateCustomer = {
      firstname: client.firstname,
      lastname: client.lastname,
      email: client.email,
      address: client.address,
      country: client.country,
      zipcode: client.zipcode
   }

   // CHECK CUSTOMER
   let customer = await Customers.findById(client._id)
   if (!customer) return res.status(400).json({ success: false, message: 'Can\'t find customer account.' })

   // UPDATE CUSTOMER RECORDS
   let updateClient = await Customers.findByIdAndUpdate({ _id: client._id }, updateCustomer, { new: true })
   if (!updateClient) return res.status(400).json({ success: false, message: 'Failed to update customer account.' })

   // CREATE PURCHASE
   let checkout = await Purchases.create(req.body)
   if (!checkout) return res.status(400).json({ success: false, message: 'Unable to perform checkout.' })

   // UPDATE MOVIE QUANTITY
   await movies.forEach(async (item) => {
      let movieId = item._id
      let movieQty = item.qty

      let movie = await Movie.findById(movieId)
      if (!movie) return

      let updateQty = await Movie.findByIdAndUpdate({ _id: movieId }, { inStock: movie.inStock - parseInt(movieQty, 10) })
      if (!updateQty) return
   })

   return res.status(200).json({ success: true, message: 'Checkout succesfully created.' })
}


let validateMovies = async function (movies) {
   let countMovies = movies.length
   let eachMovie = []
   let movieQuantity = []
   let movieRentTotal = []
   let allMovies = []
   let price = 0

   if (countMovies) {

      for (let index = 0; index < countMovies; index++) {
         let movieId = movies[index]._id
         let movieRecord = await Movie.findById(movieId)
         if (!movieRecord) return res.status(400).json({ success: false, message: 'Could not find movie record.' })

         let updateQty = await Movie.findByIdAndUpdate(movieId, { inStock: movieRecord.inStock - parseInt(movies[index].qty, 10) })
         movieQuantity.push(movies[index].qty)
         eachMovie.push({ id: movieRecord._id, title: movieRecord.title, rentPrice: movieRecord.rentPrice })
      }
      allMovies.push(eachMovie, { qty: customReducer(movieQuantity), totalRental: customReducer(movieRentTotal) })
   }
}

const customReducer = function (inputArray) {
   return inputArray.reduce((accumulator, currentValue) => accumulator + currentValue);
}
module.exports = purchaseController