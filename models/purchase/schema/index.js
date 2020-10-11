
const mongoose = require('mongoose')
const Methods = require('../methods')

const customerSchema = require('../../customers/schema')
const movieSchema = require('../../movies/schema')

const Schema = new mongoose.Schema({
   client: {
      _id: {
         type: String,
         required: true
      },
      firstname: {
         type: String,
         trim: true
      },
      lastname: {
         type: String,
         trim: true
      },
      email: {
         type: String,
         trim: true
      }
   },
   movies: [
      {
         _id: {
            type: String,
            required: true
         },
         title: {
            type: String,
         },
         rentPrice: {
            type: String,
         },
         inStock: {
            type: String,
         }
      }
   ],
   amountTotal: {
      type: Number,
   },
   quantity: {
      type: Number
   },
   paymentMethod: {
      type: String,
      default: 'cc'
   },
   paymentDetails: {
      type: new mongoose.Schema({
         ccNumber: {
            type: String,
         },
         month: {
            type: Number,
         },
         year: {
            type: Number,
         },
         securityCode: {
            type: String,
         },
      }),
      // required: [ true, 'Movie title is required.' ]
   },
   status: {
      type: Boolean,
      default: true
   },
   created: {
      type: Date,
      default: Date.now
   },
   updated: {
      type: Date
   }
})

Schema.methods = Methods


module.exports = Schema