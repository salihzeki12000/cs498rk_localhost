var appControllers = angular.module('appControllers', ['720kb.datepicker', 'imageupload']);

appControllers.controller('MainCtrl', ['$scope', 'Users', '$window', '$route', 'Auth', 'CommonData', function($scope, Users, $window, $route, Auth, CommonData) {
  if ($window.localStorage.getItem('loggedIn') !== null) {
    $scope.loggedIn = ($window.localStorage.getItem('loggedIn') === 'true');
  } else {
    $scope.loggedIn = false;
  }
  if($scope.loggedIn) {
    $scope.user = JSON.parse($window.localStorage.getItem('user'));
  } else {
    $scope.user = null;
  }
  $scope.img = CommonData.getProfileImg();

  $window.localStorage.setItem('baseurl', 'http://localhost:4000');
  console.log("logged in? " + $window.localStorage.getItem('loggedIn'));

  $scope.logout = function() {
    Auth.logout();
    /*$window.localStorage.setItem('user', "");
    $window.localStorage.setItem('loggedIn', 'false');*/
    $scope.user = null;
    $scope.loggedIn = false;
    $route.reload();
  }

}]);

appControllers.controller('LandingPageController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData) {
  $scope.data = "";
  $scope.displayText = ""
  $scope.img = CommonData.getProfileImg();
  $scope.roomImg = CommonData.getRoomImg();
  var imagePath = './data/';
  $scope.cities = CommonData.getCities();
  $scope.hotCities = [{name: 'Singapore, Singapore', img: imagePath+'singapore.jpg'},{name: 'Prague, Czech Republic', img: imagePath+'prague.jpg'},
  {name: 'Marrakech, Morocco', img: imagePath+'Marrakech.jpg'}, {name: 'San Francisco, USA', img: imagePath+'sanFran.jpg'},
  {name: 'Quito, Ecuador', img: imagePath+'quito.jpg'}, {name: 'Brisbane, Australia', img: imagePath+'brisbane.jpg'}];

  $scope.clickCity = function(city){
    CommonData.setCity(city);
    $window.location.href = '#/searchads';
  }
}]);

appControllers.controller('ProfileController', ['$scope', '$window', '$http', 'Users', 'User', function($scope, $window, $http, Users, User) {

  $scope.profile = ($window.localStorage.getItem('loggedIn') === 'true');

  // substitute dummy data with get services


  //  console.log("user in profile " + $window.localStorage.getItem('user'));
	// $scope.user = JSON.parse($window.localStorage.getItem('user'));
    if($scope.profile){
        var userID = JSON.parse($window.localStorage.getItem('user'));

        User.getFromId(userID._id).success(function(data){
            $scope.user = data.data;
        }).error(function(err){
            console.log(err);
            $scope.user = null;
        })

        //console.log(data);
//        $scope.user = data;
    }


  // these are dummy listings
 // $scope.user = {_id: "1234", name: "Isaac Clerencia", location: "Mountain View, CA, United States", occupation: "Software Engineer", age: "23", gender: "male", bio: "I am curious about everything and a bit of a computer nerd, but still socially capable :P In fact I love meeting new people, going out and I am usually up for anything ... I will enjoy as much a visit to a local bookshop, a BBQ in the park, discussing about whatever, some adventure sport, a good hike or a crazy night out until dawn."};
 // $scope.listing = {description: "My trip is a perfect opportunity to experience local culture", activities: ["My amazing first activity", "My fabulous second activity", "My ingenious third activity"], pendingTravelers: ["Alex", "Daniel"]}
  $scope.pendingTravelersText = "";
  var len = $scope.listing.pendingTravelers.length;
  for(var i = 0; i < len - 1; i++) {
    var tempText = $scope.listing.pendingTravelers[i] + ", ";
    $scope.pendingTravelersText += tempText;
  }
  $scope.pendingTravelersText += $scope.listing.pendingTravelers[len - 1];

//     if($scope.profile){
//         $scope.user = JSON.parse($window.localStorage.getItem('user'));
//         // User.getFromId($scope.user._id).success(function(data){
//         //     $scope.user = data.data;
//         //     console.log(data);
//         // }).error(function(err){
//         //     console.log(err);
//         //     $scope.user=null;
//         // });

//         //console.log(data);
// //        $scope.user = data;
//     }
// $scope.user = {_id: "1234", name: "Isaac Clerencia", location: "Mountain View, CA, United States", occupation: "Software Engineer", age: "23", gender: "male", bio: "I am curious about everything and a bit of a computer nerd, but still socially capable :P In fact I love meeting new people, going out and I am usually up for anything ... I will enjoy as much a visit to a local bookshop, a BBQ in the park, discussing about whatever, some adventure sport, a good hike or a crazy night out until dawn."};

 }]);

appControllers.controller('LoginController', ['$scope', '$window', '$route', 'Auth', 'Users', function($scope, $window, $route, Auth, Users) {
  $scope.data = "";
  $scope.displayText = "";
  $('.alert').hide();

  $scope.login = function() {
    console.log($scope.user);
    Users.postLogIn($scope.user).success(function (data) {
      Auth.login(data.data);
      /*$window.localStorage.setItem('user', JSON.stringify(data.data));
      $window.localStorage.setItem('loggedIn', 'true');*/
      $window.location.href = '#/profile';
    }).error(function (data) {
      $('.alert').show();
    });
  };

}]);

appControllers.controller('SignupController', ['$scope', '$window', '$route', 'Auth', 'Users', 'User', function($scope, $window, $route, Auth, Users, User) {
  $scope.newUser = "";
  $('.alert').hide();
  $scope.name ="";
  $scope.signup = function() {
    Users.postSignUp($scope.newUser).success(function (data) {
        var user = data.data;
        user.name = $scope.name;

        User.put(user._id, user);
        Auth.login(data.data);
        /*$window.localStorage.setItem('user', JSON.stringify(data.data));
        $window.localStorage.setItem('loggedIn', 'true');*/
        $window.location.href = '#/travellerhost';
        $route.reload();
    }).error(function(data) {
      $('.alert').show();
    });
  }

}]);

appControllers.controller('hostOrTravellerController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData){
  $scope.user = {_id: "1234", email: "abc@gmail.com", name: "Isaac Clerencia", location: "Mountain View, CA, United States", occupation: "Software Engineer", age: "23", gender: "male", bio: "I am curious about everything and a bit of a computer nerd, but still socially capable :P In fact I love meeting new people, going out and I am usually up for anything ... I will enjoy as much a visit to a local bookshop, a BBQ in the park, discussing about whatever, some adventure sport, a good hike or a crazy night out until dawn."};

}]);

appControllers.controller('TravellerSearchController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData) {
  $scope.cities = CommonData.getCities();
  $scope.city = "";

  $scope.chooseCity = function (city) {
    console.log("city chosen: " + city);
    CommonData.setCity(city);
    $window.location.href = '#/searchads';
  }

}]);

appControllers.controller('SearchAdsController', ['$scope', '$window', 'CommonData', 'Listings', function($scope, $window, CommonData, Listings) {
  $scope.cities = CommonData.getCities();
  $scope.city = {name: CommonData.getCity(), value: CommonData.getCity()};
  $scope.roomTypes = CommonData.getRoomTypes();
  $scope.roomType = $scope.roomTypes[0];
  $scope.dates = {dateStart: "", dateReturn: ""};
  $scope.dateReturn = "";
  $scope.minRating = 1;
  $scope.priceRange = { low: 0, high: 500 };
  $scope.tagList = CommonData.getTags();
  $scope.tags = [];

  getListings($scope.city.name);

  function getListings(city){
      if (city === undefined || city === ""){
        Listings.getListings().success(function(data){
          console.log(data);
          $scope.ads = data.data;
        }).error(function(err){
          console.log(err);
        });
      } else {
        Listings.getListingsByCity(city).success(function(data){
          console.log(data);
          $scope.ads = data.data;
        }).error(function(err){
          console.log(err);
        });
      }
  }

  $scope.changeCity = function (city) {
    CommonData.setCity(city);
    $scope.city = {name: city, value: city};
    console.log("city changed: " + city);
    getListings(city);
  }

  $scope.filterAds = function(){
    var tags = [];
    for (var i = 0; i < $scope.tags.length; i++){
      tags.push($scope.tags[i].name);
    }
    console.log(tags);
    Listings.filterListings($scope.city.name, $scope.roomType.value, $scope.dates.dateStart, $scope.dates.dateReturn,
      $scope.priceRange.low, $scope.priceRange.high, tags).success(function(data){
        console.log(data);
        $scope.ads = data.data;
      }).error(function(err){
        console.log(err);
      });
  }
}]);

appControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.localStorage.baseurl;

  $scope.setUrl = function(){
    console.log("base url: " +$scope.url);
    $window.localStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";
  };

}]);


appControllers.controller('CreateHostAdController', ['$scope' , '$window' , 'CommonData', 'Listings', 'User', function($scope, $window, CommonData, Listings, User) {
  $scope.roomTypes = CommonData.getRoomTypes();
  $scope.img = CommonData.getProfileImg();
  $scope.roomImg = CommonData.getRoomImg();
  $scope.cities = CommonData.getCities();
  $scope.tagList = CommonData.getTags();
  $scope.user = $window.localStorage.getItem('user');
  var user = JSON.parse($scope.user);
  console.log($scope.tagList);
  $scope.listing = {hostName: user.name, hostID: user._id, address: "", city: "", bio: "", roomType: $scope.roomTypes[0], price: 0, dateStart: "", dateEnd: "", tags: []};
  $scope.thingsToDo = {first: "", second: "", third: "", fourth: ""};

  $scope.submitForm = function(){
    console.log("create host ad");
    console.log($scope.listing);
    Listings.postListing($scope.listing).success(function(data){
      // add the listing id to user
      user.postedHostAds.push(data.data._id);
      User.put(user._id, user);
      console.log(data);
    }).error(function(err){
      console.log(err);
    });
  }
}]);

appControllers.controller('MatchedController', ['$scope', '$window', function($scope, $window){
  $scope.user = {_id: "1234", email: "abc@gmail.com", name: "Isaac Clerencia", location: "Mountain View, CA, United States", occupation: "Software Engineer", age: "23", gender: "male", bio: "I am curious about everything and a bit of a computer nerd, but still socially capable :P In fact I love meeting new people, going out and I am usually up for anything ... I will enjoy as much a visit to a local bookshop, a BBQ in the park, discussing about whatever, some adventure sport, a good hike or a crazy night out until dawn."};
  $scope.matchedUserName = $scope.user.name;

}]);

appControllers.controller('HostBioController', ['$scope', '$window', 'CommonData', '$routeParams', 'User', 'Listing', function($scope, $window, CommonData, $routeParams, User, Listing){
  var loremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  $scope.data = {name: 'Sample Host', address: '123 S Main St', bio: 'My name is Sample Host. '+loremIpsum, roomType: 'Private Room', tags: ['Dancing', 'Vegetarian'], dates:['tomorrow']};
  var hostID = $routeParams.hostID;
  console.log(hostID);
  User.getFromId(hostID).success(function(data){
    //console.log(data);
    var user = data.data;
    $scope.listings = [];
    var ads = user.postedHostAds;
    for (var i=0; i<ads.length;i++){
      Listing.getFromId(ads[i]).success(function(data){
        //console.log(data.data);
        $scope.listings.push(data.data);
        $scope.data = data.data;
        console.log($scope.listings);
      }).error(function(err){
        console.log(err);
      });
    }
    console.log(user);
  }).error(function(err){
    console.log(err);
  });

  $scope.roomImg = CommonData.getRoomImg();
  $scope.img = CommonData.getProfileImg();
}]);

appControllers.controller('ListingDetailsController', ['$scope', '$window', '$routeParams', 'Listing', 'User',
                          function($scope, $window, $routeParams, Listing, User) {
  console.log('listing detail controller created');
  $scope.requestSent = true;
  $scope.requestSentError = false;
  $scope.requestSentText = 'Request';
  console.log($routeParams._id);
  $scope.listing= {};
  $scope.user = {};

  Listing.getFromId($routeParams._id).success(function(data){
    //   console.log("what the fuck");
      $scope.listing = data.data;
//      console.log(data);
//      console.log($scope.listing);
      User.getFromId($scope.listing.hostID).success(function(data){
          $scope.user = data.data;
      }).error(function(err){
          $scope.user = null;
          console.log(err);
      });
  }).error(function(err){
      $scope.listing= null;
      console.log(err);
  });
  var genderPro = "he";
  console.log($scope.user);
  console.log($scope.listing);



//  $scope.user = {name: "Isaac Clerencia", location: "Mountain View, CA, United States", occupation: "Software Engineer", age: "23", gender: "male", bio: "I am curious about everything and a bit of a computer nerd, but still socially capable :P In fact I love meeting new people, going out and I am usually up for anything ... I will enjoy as much a visit to a local bookshop, a BBQ in the park, discussing about whatever, some adventure sport, a good hike or a crazy night out until dawn."};
//  $scope.listing = {description: "Interaction with Guests We want to meet interesting people so we are open to interact with the guests, if they want to, but the garden house is separate, so they can decide! The Neighborhood It's in the center of the Silicon Valley. It's closed to University Avenue, where all the restaurants and stores like the Palo Alto Apple Store are located. So it's the best place to start a journey through the Valley. Getting Around Palo Alto Public Transportation is great! You can get to many places in the Bay Area with the CalTrain or Uber. Other Things to Note There is no kitchen in the garden house, just a sink, but if you are here, you want to eat out and go to events anyway ;-)"}
  // get listing and host data, uncommnet when hook up to database
  // $scope.user = {};
  // $scope.listings = {};
  // var listingID = $routeParams._id;
  // Listings.getFromId(listingID).success(function(data) {
  //   $scope.listing = data.data;
  //   var hostID = $scope.listing.hostID;
  //   User.getFromId(hostID).success(function(data) {
  //     $scope.user = data.data;
  //   });
  // })

  $scope.requestToBook = function() {
    console.log("request to book button pressed!");
    var userID = $scope.user._id;
    $scope.user.matchedTravelers.push(listingID);
    User.put(userID, $scope.user).success(function(data) {
      console.log("request book:", data.message);

      if($scope.user.gender == "female") {
        genderPro = "she";
      }
      $scope.requestSentText += ' sent to ' + $scope.user.name + ", " + genderPro + "will reply you in a moment!";
      $scope.requestSent = true;
      $scope.requestSentError = false;
    }).error(function(err) {
      console.log("request to book:", err);
      $scope.requestSentText += ' error!';
      $scope.requestSent = false;
      $scope.requestSentError = true;
    });
  }

}]);



appControllers.controller('EditProfileController', ['$scope', '$window', 'CommonData', 'User', function($scope,
                          $window, CommonData, User) {
  // $scope.user = {};
  // test local user
  $scope.user = JSON.parse($window.localStorage.getItem('user'));
  $scope.cities = CommonData.getCities();
  $scope.genders = [{name: "male"}, {name: "female"}, {name: "other"}];
  $scope.gender = "";
  $scope.location="";
  $scope.user = JSON.parse($window.localStorage.getItem('user'));

  console.log($scope.user);
  $scope.submitChange = function() {
      $scope.user.gender = $scope.gender.name;
      $scope.user.location=$scope.location.name;
      console.log($scope.user.gender.name);
      console.log($scope.user.location.name);
      User.put(userID, $scope.user).success(function(data) {
      console.log("Edit user:", data.message);
      $window.location.href = '#/profile/'+$routeParams._id;
    })
  }

  $scope.upload = function(image){
    console.log("UPLOAD");
    console.log(image);
    var formData = new FormData();
    formData = {image: image};
    //formData.append('image', image, image.file.name);
    //formData.set('image', image, image.file.name);
    //console.log(formData);
    User.uploadImage(formData)
      .success(function(result) {
        console.log(result);
        $scope.uploadedImgSrc = result.src;
        $scope.sizeInBytes = result.size;
    }).error(function(err){
      console.log(err);
    });
   }

}]);
