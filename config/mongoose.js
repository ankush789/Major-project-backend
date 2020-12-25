const mongoose = require('mongoose');
const env = require('./environment');
//Connect to database
mongoose.connect(`mongodb://localhost/${env.db}`);

const db = mongoose.connection;

//Handling Errors
db.on('error', console.error.bind(console, "Error connecting to MongoDB"));

//If connected successfully 
db.once('open', function(){
    console.log("Connected to database:: MongoDB");
})

//exporting db
module.exports = db;