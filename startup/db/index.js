const mongoose = require('mongoose');
const { config } = require('./config.js')


exports.connection = function () {
   try {
      mongoose.connect(process.env.DB_HOST_NEW, config);
      console.log("connected")
   } catch (error) {
      console.log("Got error Connecting to DB \n", error)
   }
}
