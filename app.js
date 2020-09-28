const express = require('express')
const app = express()

const morgan = require('morgan')

const path = require('path')
require('dotenv').config()
const port = process.env.APP_PORT
const { connection } = require('./startup/db')

const { errorBaseCatcher } = require('./startup/error-logger')

// CROSS ORIGIN
var cors = require('cors')
app.use(cors())


const routes = require('./routes')

// UPLOADING FILES
const fileUpload = require('express-fileupload');
app.use(fileUpload());
app.use(express.static(path.join(__dirname, 'public')));

// DB CONNECT
connection()


// JSON
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// ROUTES
app.use(routes)

app.get('/', function (req, res) {
   res.send('hello world')
})

// ERROR LOGGER
app.use(errorBaseCatcher)

// ERROR FILTERS 
process.on('uncaughtException', (error) => {
   console.log(error.message, 'Uncaught Exception')
})

process.on('unhandledRejection', (error) => {
   // console.log(error.message, '\n Unhandled Error Rejection')
   console.log(error, 'Unhandled Error Rejection')
   // process.exit(0)
})

// LOGGER
morgan('tiny')

app.listen(process.env.PORT || 4000, () => console.log(`Live at PORT ${process.env.PORT}`))