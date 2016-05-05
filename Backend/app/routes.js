module.exports = function(app, passport) {
	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		console.log('endpoint hit - signing up!');
		res.json({
			data : req.user
		});
	});

	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		console.log("logging in!" + JSON.stringify(req.user));
		res.json({
			data : req.user
		});
	});

	app.get('/profile', isLoggedIn, function(req, res) {
		if (!req.user) {
			return res.status(404).json({message: "There was an error retrieving this user"});
		}
		console.log("profile pg user: " + req.user);
		res.json({
			data: req.user
		});

	});

	app.get('/logout', function(req, res) {
		console.log('test');
		req.logout();
		res.redirect('#/');
	});

	function isLoggedIn(req, res, next) {
		console.log(req.isAuthenticated());
		if(req.isAuthenticated())
			return next();
		res.json({
			error: "User not logged in"
		});
	}

};
