const mongoose = require('mongoose');

// set up mongoDB connection
// Example URI ---> mongodb+srv://weblab:6jYctMizX5Y5ie6W@catbook-fsjig.mongodb.net/catbookdb?retryWrites=true
//const mongoURL = 'mongodb+srv://yc_huang:sprite@cluster0-ebwkp.mongodb.net/test?retryWrites=true';
const mongoURL = process.env.ATLAS_SRV;
const options = {
  useNewUrlParser: true
};
mongoose.connect(mongoURL, options);
mongoose.Promise = global.Promise;
const db = mongoose.connection;

// db error handling
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = db;
