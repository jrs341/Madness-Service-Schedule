// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var path = require(`path`);
// Mongoose mpromise deprecated - use bluebird promises
var Promise = require("bluebird");
var Customers = require("./models/customers.js");
var ServiceSchedule = require("./models/serviceSchedule.js");
mongoose.Promise = Promise;

// Express Port/App Declaration
var PORT = process.env.PORT || 3000;
var app = express();

// Configure app with morgan and body parser
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// Database configuration for mongoose
// db: madness
mongoose.connect("mongodb://localhost/madness");
// mongoose.connect("mongodb://jrs341:HHCwc3et0@ds145379.mlab.com:45379/calhouns");
// Hook mongoose connection to db
var db = mongoose.connection;

// Log any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Log a success message when we connect to our mongoDB collection with no issues
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Routes this is from example and used for React
// app.get(`*`, function(req, res) {
//   res.sendFile('public/index.html', { root: __dirname });
// });

app.get(`*`, function(req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});

app.listen(PORT, function() {
  console.log(`Listening On Port: ${PORT}`);
});