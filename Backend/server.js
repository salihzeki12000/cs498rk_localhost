var express = require('express'),
	app = express(),
	port = process.env.PORT || 4000,
	mongoose = require('mongoose'),
	passport = require('passport'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	configDB = require('./config/database.js');
	Listing = require('./models/listing');

mongoose.connect(configDB.url); // db connection
//debugging!
//mongoose.set('debug', true);

require('./config/passport')(passport);

//Allow CORS so that backend and frontend could pe put on different servers
var allowCrossDomain = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept");
	res.header('Access-Control-Allow-Credentials', true);
  next();
};

app.use(allowCrossDomain);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({ secret: 'passport demo' }));

//app.use(express.static(__dirname + '/frontend'));

// Use the body-parser package in our application
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./app/routes.js')(app, passport);

//you can put listing api calls here

app.listen(port);
console.log('Server running on port ' + port);
