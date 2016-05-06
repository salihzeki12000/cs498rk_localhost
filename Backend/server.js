var express = require('express'),
	app = express(),
	port = process.env.PORT || 4000,
	mongoose = require('mongoose'),
	passport = require('passport'),
	morgan = require('morgan'),
	cookieParser = require('cookie-parser'),
	bodyParser = require('body-parser'),
	session = require('express-session'),
	configDB = require('./config/database.js'),
	Listing = require('./app/models/listing'),
    User = require('./app/models/user'),
	LocalStrategy = require('passport-local').Strategy,
    path = require('path'),
    fs = require('fs');

mongoose.connect(configDB.url); // db connection
//debugging!
mongoose.set('debug', true);

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

//Begin routing code
var router = express.Router();
app.use('/api', router);

//Default route
var home = router.route('/');
home.get(function(req,res){
    res.json({message: "Please use either /api/users or /api/listings"});
});
var image = router.route('/image');
image.post(function(req,res){
	var data = req.body;
	console.log(data);
	res.status(200).json({message: "WE OKAY"});
});

/*----------------------------User Route--------------------------------------*/
var usersRoute = router.route('/users');
var idUsersRoute = router.route('/users/:id');

usersRoute.get(function(req,res){
    var where = req.query.where;
    var sort = req.query.sort;
    var select = req.query.select;
    var skip = req.query.skip;
    var limit = req.query.limit;
    var count = req.query.count;

    if(where){
        where = JSON.parse(where);
    }
    var query = User.find(where);
    if(sort){
        sort = JSON.parse(sort);
        query.sort(sort);
    }
    if(select){
        select = JSON.parse(select);
        query.select(select);
    }
    if(skip){
        query.skip(skip);
    }
    if(limit){
        query.limit(limit);
    }
    if(count){
        query.count(count);
    }

    query.exec(function(err, users){
        if(err) return res.status(404).json({message:"User not found", data:null});

        res.status(200).json({message:'OK', data:users});
    });
//    User.find(function(err, user){
//        if(err) return console.error(err);
//        res.status(200).json({message:'OK', data: user});
//    })
});

usersRoute.post(function(req,res){
    var data = (req.body);
	if(typeof data.local === 'string'){
		data.local = data.local.replace(/\'/g, "\"");
		data.local = JSON.parse(data.local);
	}

	// console.log((data.local));
	// console.log(datLocal);
	// console.log(datLocal.password);
	// console.log(datLocal.email);
	//console.log(data.local.email);
	console.log(data);
    if(!data.name || !data.local.email || !data.local.password){
        return res.status(500).json({message: "Valid name and email required", data: null});
    }
    var d = new Date();
    var newUser = new User({
        name: data.name,
        postedHostAds: data.postedHostAds,
        location: data.location,
//        matchedHosts: [],
        matchedTravelers: [],
		pendingTravelers: [],
		flag: false,
        dateCreated: d.getDate(),
		bio: data.bio,
		age: data.age,
		gender: data.gender,
		occupation: data.occupation,

    });
	newUser.local.email = data.local.email;
	newUser.local.password = newUser.generateHash(data.local.password);
    newUser.save(function(err){
        if(err){
            return res.status(500).send({'error':'internal service error', data:null});
        }
        res.status(201).json({message: "User created", data: newUser});
    });
});
idUsersRoute.get(function(req,res){
	User.findById(req.params.id, function(err, user){
		if(err) return res.status(404).json({message: 'User not found'});

		return res.status(200).json({message: 'OK', data: user});
	});
});
idUsersRoute.put(function(req,res){
	var data = req.body;
//	if(!data.name || !data.local.email || !data.local.password){
//        return res.status(500).json({message: "Valid name and email required", data: null});
//    }
    User.findById(req.params.id, function(err, user){
        if(err || user === null) res.status(404).json({message:"User not found", data:null});

        var d = new Date();
        user.name = data.name;
//can email and password be modified by standard put? Probably not?

		user.local.email = user.local.email;
		user.local.password = user.local.password;

        user.postedHostAds= data.postedHostAds;
        user.location= data.location;
        user.matchedHosts= data.matchedHosts;
        user.matchedTravelers= data.matchedTravelers;
		user.bio = data.bio;
        user.gender = data.gender;
        user.age = data.age;
        user.occupation = data.occupation;
		user.flag = data.flag;
        user.save(function(err){
            if(err){
				console.error(err);
                return res.status(500).send({'error':'internal service error', data:null});
            }
            res.status(201).json({message: "User Updated", data: user});
        });
    });
});
idUsersRoute.delete(function(req,res){
	User.findByIdAndRemove(req.params.id, function(err, user){
        if(err || user === null) return res.status(404).json({message: "User not found", data:null});

        return res.status(200).json({message: "User removed.", data : null});
    });
});

/*----------------------------Listings Route----------------------*/

var listingsRoute = router.route('/listings');
var idListingsRoute = router.route('/listings/:id');

listingsRoute.get(function(req,res){
    console.log(req.query);
    var where = req.query.where;
    var sort = req.query.sort;
    var select = req.query.select;
    var skip = req.query.skip;
    var limit = req.query.limit;
    var count = req.query.count;

    if(where){
        where = JSON.parse(where);
    }
    var query = Listing.find(where);
    if(sort){
        sort = JSON.parse(sort);
        query.sort(sort);
    }
    if(select){
        select = JSON.parse(select);
        query.select(select);
    }
    if(skip){
        query.skip(skip);
    }
    if(limit){
        query.limit(limit);
    }
    if(count){
        query.count(count);
    }

    query.exec(function(err, listings){
        if(err) return res.status(404).json({message:"Listing not found", data:null});

        res.status(200).json({message:'OK', data:listings});
    });
});
listingsRoute.post(function(req,res){
    var data = req.body;
	if(typeof data.tags === 'string'){
		data.tags = data.tags.replace(/\'/g, "\"");
	//	console.log(JSON.parse(data.tags));
		data.tags=JSON.parse(data.tags);
	}
	console.log(data);
	if(typeof data.activities === 'string'){
		data.activities = data.activities.replace(/\'/g, "\"");
		data.activities = JSON.parse(data.activities);
	}
//	console.log("______________");
//	console.log(data);
    if(!data.hostName || !data.address){
        return res.status(500).json({message: "Valid host name and address required", data: null});
    }
    var d = new Date();
    var newListing = new Listing({
        hostName: data.hostName,
		hostID: data.hostID,
        bio: data.bio,
		address: data.address,
        city: data.city,
		description: data.description,
        dateStart: data.dateStart,
        dateEnd: data.dateEnd,
        roomType: data.roomType,
        currentTraveler: data.currentTraveler,
        currentTravelerName: data.currentTravelerName,
        price: data.price,
        tags: data.tags,
		activities: data.activities
    });
    newListing.save(function(err){
        if(err) return res.status(500).json({message:'internal service error sorry', data:null});

        res.status(201).json({message:"Ad Created", data: newListing});
    });
});
idListingsRoute.get(function(req, res){
    Listing.findById(req.params.id, function(err, listing){
        if(err || listing === null) return res.status(404).json({message: "Ad not found", listing:null});

        return res.status(200).json({message: "OK", data:listing});
    });
});
idListingsRoute.put(function(req,res){
    var data = req.body;
    if(!data.hostName || !data.address){
        return res.status(500).json({message: "Valid host name and address required", data: null});
    }
    Listing.findById(req.params.id, function(err, listing){
        if(err || listing === null) return res.status(404).json({message: "Ad not found", data: null});

        listing.name = data.name;
        listing.bio = data.bio;
		listing.description = data.description;
		listing.price = data.price;
		listing.roomType = data.roomType;
		listing.address = data.address;
        listing.city = data.city;
        listing.currentTraveler = data.currentTraveler;
        listing.currentTravelerName = data.currentTravelerName;
		listing.dateStart = data.dateStart;
        listing.dateEnd = data.dateEnd;
		listing.tags = data.tags;

        listing.save(function(err){
            if(err) return res.status(500).json({message: "internal service error sorry", data:null});
            res.status(201).json({message:"Listing Updated", data:listing});
        });
    });
});
idListingsRoute.delete(function(req,res){
	Listing.findByIdAndRemove(req.params.id, function(err, listing){
        if(err || listing === null) return res.status(404).json({message: "Ad not found", data:null});

        return res.status(200).json({message: "Ad removed.", data : null});
    });
});

/***********UPLOAD**************/
var uploadRoute = router.route('/upload');
uploadRoute.post(function(req, res) {
    console.log("POST");
    console.log(req.json);
    if (req.json === undefined){
        return res.status(404).json({message: "Something went wrong", data: null});
    }
    var image = req.json.image;
    //var image =  req.files.image;
    var filename = image.file.name;
    var path = '../Frontend/public/data/';
    var newImageLocation = path.join(__dirname, path, filename);

    fs.readFile(image.path, function(err, data) {
        fs.writeFile(newImageLocation, data, function(err) {
            if (err){
                return res.status(404).json({message: "Something went wrong, can't find the file", data: null});
            }
            return res.status(200).json({
                src: path + filename,
                size: image.size
            });
        });
        console.log("POSTED!!");
    });

});

app.listen(port);
console.log('Server running on port ' + port);
