
// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a userSchema object with the Schema class we just made
var ServiceScheduleSchema = new Schema({

  	location: {
  	type: String
  	},

  	date: {
    type: String
  	},

  	time: {
    type: String
  	},

  	reserved: {
    type: Boolean
  	},

    given_name: {
    type: String,
    trim: true,
    required: "First Name Required"
    },

    family_name: {
    type: String,
    trim: true,
    // required: "Last Name Required",
    },
    phone_number: {
    type: String,
    trim: true,
    // required: "Phone Number Required"
    },

  	email: {
  	type: String
  	},

    vehicle_make: {
    type: String,
    trim: true
    },

    vehicle_model: {
    type: String,
    trim: true
    },

    vehicle_year: {
    type: Number,
    trim: true
    },

    scheduled_by: {
      type: String
    },

    service_request: { 
    type: String
    }
 
});

// Create the "ServiceSchedule" model with our UserSchema schema
var ServiceSchedule = mongoose.model("ServiceSchedule", ServiceScheduleSchema);

// Export the User model, so it can be used in server.js with a require
module.exports = ServiceSchedule;
