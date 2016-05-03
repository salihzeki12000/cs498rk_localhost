// Load required packages
var mongoose = require('mongoose');

// Define our beer schema
var HostAdSchema = new mongoose.Schema({
  city: {type: String, required: true},
  date: {type: Date, required: true},
  activities: [String],
  tags: [String],
  price: float,
  dateCreated: Date
});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);