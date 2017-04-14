
// Dependency
var mongoose = require("mongoose");

// Create the Schema class
var Schema = mongoose.Schema;

// Instantiate a Customers object with the Schema class we just made
var CustomersSchema = new Schema({

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
  phone_number_alt: {
    type: String,
    trim: true,
  },
  // email is a string, and it must be a unique one in our collection
  // Notice how it must match our regex, which checks for email
  email: {
    type: String,
    unique: true,
    match: [/.+\@.+\..+/, "Please enter a valid e-mail address"],
    required: "Email Address is Required"
  },
  address_line_1: {
    type: String,
    trim: true
  },
  locality: {
    type: String,
    trim: true
  },
  administrative_district_level_1: {
    type: String,
    trim: true
  },
  postal_code: {
    type: Number,
    trim: true
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
  }
});

// Create the "Customers" model with our Customers schema
var Customers = mongoose.model("Customers", CustomersSchema);

// Export the Customers model, so it can be used in server.js with a require
module.exports = Customers;
