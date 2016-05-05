var LocalStrategy = require('passport-local').Strategy;
var User = require('../app/models/user');

module.exports = function(passport) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('local-signup', new LocalStrategy({
		usernameField : 'email',
		passwordField : 'password',
	},
	function(email, password, done) {
		console.log("inside of sign up");
		User.findOne({'local.email' : email}, function(err, user) {
			if(err)
				return done(err);
			if(user) {
				return done(null, false);
			} else {
				var newUser = new User();
				console.log("reached here");
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);
				console.log("new user" + JSON.stringify(newUser));
				newUser.save(function(err) {
					if(err)
						throw err;
					console.log('success!!');
					return done(null, newUser);
				});
			}

		});
	}));

	passport.use('local-login', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
	},
	function(email, password, done) {
		User.findOne({'local.email': email}, function(err, user) {
			if(err) {
				console.log("error" + err);
				return done(err);
			}
			if(!user) {
				console.log("this user doesn't exist");
				return done(null, false);
			}
			if(!user.validPassword(password)) {
				console.log("invalid password");
				return done(null, false);
			}
			console.log("reached here, done is next");
			return done(null, user);

		});
	}));

};
