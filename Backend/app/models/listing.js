var mongoose = require('mongoose');

var listingSchema = mongoose.Schema({
	address		: String,
	hostName	: String,
	bio 		: String,
	price		: Number,
	roomType	: String,
	date		: String,
	tags		: [String]

});

module.exports = mongoose.model('Listing', listingSchema);