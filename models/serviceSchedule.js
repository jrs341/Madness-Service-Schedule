
// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
var ServiceScheduleSchema = new Schema({

  currentReservations: [{

  	location: {
  	type: Number
  	},

  	date: {
    type: String
  	},

  	time: {
    type: Number
  	},

  	reserved: {
    type: Boolean
  	},

  	email: {
  	type: String
  	}
  	
  }]
 
});

// Create the "ServiceSchedule" model with our UserSchema schema
var ServiceSchedule = mongoose.model("ServiceSchedule", ServiceScheduleSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = ServiceSchedule;
