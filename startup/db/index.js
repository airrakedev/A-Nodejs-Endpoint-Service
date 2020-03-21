const mongoose = require('mongoose');
const { config } = require('./config.js')


require('dotenv').config()

exports.connection = function () {
    try {
        mongoose.connect(process.env.DB_HOST, config);
        console.log("connected")
    } catch (error) {
        console.log("Got error Connecting to DB \n", error)
    }
}
