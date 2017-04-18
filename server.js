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
// mongoose.connect("mongodb://mlab conncetion here");
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

app.get(`/`, function(req, res) {
  res.sendFile('public/index.html', { root: __dirname });
});

app.post("/submitInfoToServiceSchedule", function(req, res) {
 // check our req.body against our user model
  var service = new ServiceSchedule(req.body);
  service.save(function(error, doc) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      res.send(doc);
      console.log(doc);
    }
  });
});

app.post("/addCustomerToDB", function(req, res){
	var customer = new Customers(req.body);
	customer.save(function(error, doc){
		if(error) {
			console.log(error);
			res.send(error);
		}
		else {
			console.log(doc);
			res.send(doc);
		}
	});
});

app.get("/checkCustomerDB/:email", function(req, res){
    Customers.findOne({"email": req.params.email}, function(error, doc) {
    if (error) {
      console.log(error);
      res.send(error);
    }
    else {
      console.log(doc);
      res.send(doc);
    }
  });
});

app.get("/availableTimes/:date/:location", function(req, res){
	ServiceSchedule.find({"date": req.params.date, "location": req.params.location},{time: 1}, function(error, doc) {
		if (error) {
	      res.send(error);
	      console.log(error);
	    }
	    else {
	      console.log(doc);
	      res.send(doc);
	    }	
	});
});

app.get("/scheduleForToday/:date/:location", function(req, res){
    ServiceSchedule.find({"date": req.params.date, "location": req.params.location}, function(error, doc) {
	    if (error) {
	      res.send(error);
	      console.log(error);
	    }
	    else {
	      console.log(doc);
	      res.send(doc);
	    }
  });
});

app.get("/getSchedule/:date/:location", function(req, res){
	console.log(req.params.date);
	console.log(req.params.location);
    ServiceSchedule.find({"date": req.params.date, "location": req.params.location}, function(error, doc) {
    if (error) {
      res.send(error);
      console.log(error);
    }
    else {
      console.log(doc);
      res.send(doc);
    }
  });
});

app.post('/serviceStatus', function(req, res) {
	console.log(req.body);
	ServiceSchedule.findOneAndUpdate({email: req.body.email}, req.body, function(error, doc){
		if(error){
			res.send(error);
		}
		else{
			res.send(doc);
		}
	});
});

app.listen(PORT, function() {
  console.log(`Listening On Port: ${PORT}`);
});