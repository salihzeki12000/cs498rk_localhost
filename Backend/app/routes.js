module.exports = function(app, passport) {
	app.post('/signup', passport.authenticate('local-signup'), function(req, res) {
		console.log('endpoint hit - signing up!');
		console.log("new user from server: " + JSON.stringify(req.user));
		res.json({
			data : req.user
		})
	});

	app.post('/login', passport.authenticate('local-login'), function(req, res) {
		res.redirect('#/profile.html');
	});

	app.get('/profile', function(req, res) {
		console.log("profile pg user: " + req.user);
		if (!req.user) {
			return res.status(404).json({message: "There was an error retrieving this user"});
		}
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
		if(req.isAuthenticated())
			return next();
		console.log(JSON.stringify(req));
		res.json({
			error: "User not logged in"
		});
	}

};
