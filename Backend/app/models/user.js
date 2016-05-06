var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = new mongoose.Schema({
	postedHostAds	: [String], // id of ads
	local: {
		email		: String,  //required
		password	: String   //required
	},
	name			: String,  //required
	location		: String,
	matchedHost		: String,  //only match with 1 host at any time
	matchedTravelers: [String],
	pendingTravelers: [String],
	flag			: Boolean,
	bio				: String,
	gender			: String,
	occupation		: String,
	age				: String

});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
