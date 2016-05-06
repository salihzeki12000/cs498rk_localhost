var appControllers = angular.module('appControllers', ['720kb.datepicker','lr.upload', 'ngResource']);

appControllers.controller('MainCtrl', ['$scope', 'User', '$window', '$route', 'Auth', 'CommonData', function($scope, User, $window, $route, Auth, CommonData) {
  //$("#request-modal").modal({show: true});
  $scope.requests = [];
   $("#request-modal").modal({ show : false });
  if ($window.localStorage.getItem('loggedIn') !== null) {
    $scope.loggedIn = ($window.localStorage.getItem('loggedIn') === 'true');
  } else {
    $scope.loggedIn = false;
  }
  if($scope.loggedIn) {
    $scope.user = JSON.parse($window.localStorage.getItem('user'));
    User.getFromId($scope.user._id).success(function(data) {
      var newUser = data.data;
      console.log("window " + $window.location.href);
      if (newUser.flag && $window.location.href.indexOf("matched") == -1) {
        console.log(newUser.pendingTravelers);
        if (newUser.pendingTravelers.length > 0) {
          for(var i = 0; i < newUser.pendingTravelers.length; i++) {
            User.getFromId(newUser.pendingTravelers[i]).success(function (data) {
              $scope.requests.push(data.data);
            });
          };
          $("#request-modal").modal({ show : true });
        }
        if (newUser.matchedHost !== undefined) {
          User.getFromId(newUser.matchedHost).success(function (data) {
            console.log("success");
            $window.location.href="#/matched";
          });
        }
      }
    });
  } else {
    $scope.user = null;
  }
  $scope.img = CommonData.getProfileImg();

  $window.localStorage.setItem('baseurl', 'http://localhost:4000');
  console.log("logged in? " + $window.localStorage.getItem('loggedIn'));



  $scope.logout = function() {
    Auth.logout();
    $scope.user = null;
    $scope.loggedIn = false;
    $route.reload();
  }

  $scope.accept = function(user) {
    User.getFromId(user._id).success(function (data) {
      var updateUser = data.data;
      console.log("updated " + JSON.stringify(updateUser));
      updateUser.matchedHost = $scope.user._id;
      updateUser.flag = false;
      User.put(updateUser._id, updateUser).success(function(data) {
        console.log("success");
        User.getFromId($scope.user._id).success(function (data) {
      var updateUser = data.data;
      console.log("updated " + JSON.stringify(updateUser));
      updateUser.matchedTravelers.push($scope.user._id);
      updateUser.flag = true;
      User.put(updateUser._id, updateUser).success(function(data) {
        console.log("success");
        $("#request-modal").modal({ show : false});
        $window.location.href="#/matched";
      });
    });
      });
    });

    
    //add to matched hosts
  }

  $scope.reject = function(user) {
    //
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

appControllers.controller('ProfileController', ['$scope', '$window', '$http', 'Listings', 'User', function($scope, $window, $http, Listings, User) {
  $scope.hasListings = false;
  $scope.profile = ($window.localStorage.getItem('loggedIn') === 'true');

  $scope.exampleImg = $window.localStorage.getItem('exampleImage');
  //console.log($scope.exampleImg);

  $scope.pendingTravelersText = "";

  if($scope.profile) {
      var user = JSON.parse($window.localStorage.getItem('user'));
      console.log("user " + JSON.stringify(user));
      User.getFromId(user._id).success(function(data) {
        $scope.user = data.data;
        var len = $scope.user.pendingTravelers.length;
        var pendingTravelersIDs = [];
        for(var i = 0; i < len - 1; i++) {
          var currUserID = $scope.user.pendingTravelers[i];
          User.getFromId(currUserID).success(function(data) {
            var tempText = data.data.name + ", ";
            $scope.pendingTravelersText += tempText;
          });
        }
        var currUserID = $scope.user.pendingTravelers[len - 1];
        User.getFromId(currUserID).success(function(data) {
          $scope.pendingTravelersText += data.data.name;
        });       

        console.log(" scope user " + JSON.stringify($scope.user));
        //$window.localStorage.setItem('user', $scope.user);
        Listings.getListingsByUser($scope.user._id).success(function(data) {
          $scope.listings = data.data;
          if ($scope.listings.length > 0) {
            $scope.hasListings = true;
          }




        }).error (function() {
          console.log("error");
        });
      }).error(function() {
        console.log("error");
    });
  }

  // these are dummy listings
 // $scope.user = {_id: "1234", name: "Isaac Clerencia", location: "Mountain View, CA, United States", occupation: "Software Engineer", age: "23", gender: "male", bio: "I am curious about everything and a bit of a computer nerd, but still socially capable :P In fact I love meeting new people, going out and I am usually up for anything ... I will enjoy as much a visit to a local bookshop, a BBQ in the park, discussing about whatever, some adventure sport, a good hike or a crazy night out until dawn."};
 // $scope.listing = {description: "My trip is a perfect opportunity to experience local culture", activities: ["My amazing first activity", "My fabulous second activity", "My ingenious third activity"], pendingTravelers: ["Alex", "Daniel"]}/
  
  // var len = $scope.listing.pendingTravelers.length;
  // for(var i = 0; i < len - 1; i++) {
  //   var tempText = $scope.listing.pendingTravelers[i] + ", ";
  //   $scope.pendingTravelersText += tempText;
  // }
  // $scope.pendingTravelersText += $scope.listing.pendingTravelers[len - 1];

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
    if($scope.user.email !== undefined && $scope.user.password !== undefined) {
      Users.postLogIn($scope.user).success(function (data) {
        Auth.login(data.data);
        /*$window.localStorage.setItem('user', JSON.stringify(data.data));
        $window.localStorage.setItem('loggedIn', 'true');*/
        $window.location.href = '#/profile';
      }).error(function (data) {
        $('.alert').show();
      });
    }
  };

}]);

appControllers.controller('SignupController', ['$scope', '$window', '$route', 'Auth', 'Users', 'User', function($scope, $window, $route, Auth, Users, User) {
  $scope.newUser = "";
  $('.alert').hide();
  $scope.errorMsg = "";
  $scope.name ="";
  $scope.signup = function() {

        console.log($scope.newUser);
    //if email is correct type!
    if($scope.name !== undefined && $scope.newUser.email !== undefined && $scope.newUser.password !== undefined) {
      Users.postSignUp($scope.newUser).success(function (data) {
          var user = data.data;
          user.name = $scope.name;
          Auth.login(data.data);
          user.postedHostAds = [];
          user.location = "";
          user.matchedHost = "";
          user.matchedTravelers= [];
          user.bio = "";
          user.gender = "";
          user.age = "";
          user.occupation = "";
          user.pendingTravelers = [];
          user.flag = false;

          User.put(user._id, user);
          $window.location.href = '#/travellerhost';
      }).error(function(data) {
        $('.alert').show();
      });
    }
  }

}]);

appControllers.controller('hostOrTravellerController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData){

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


appControllers.controller('CreateHostAdController', ['$scope' , '$window' , 'CommonData', 'Listings', 'User', '$http', function($scope, $window, CommonData, Listings, User, $http) {
  $scope.roomTypes = CommonData.getRoomTypes();
  $scope.img = CommonData.getProfileImg();
  $scope.roomImg = CommonData.getRoomImg();
  $scope.Image1 = null;
  $scope.Image2 = null;
  $scope.Image3 = null;
  $scope.roomType = "";

  $scope.cities = CommonData.getCities();
  $scope.tagList = CommonData.getTags();
  $scope.user = $window.localStorage.getItem('user');
  var user = JSON.parse($scope.user);
  //console.log($scope.tagList);

  $scope.thingsToDo = {first: "", second: "", third: "", fourth: ""};


  var act = [];
  $scope.listing = {hostName: user.name, hostID: user._id, address: "", city: "", bio: "", roomType: $scope.roomType.name, price: 0, dateStart: "", dateEnd: "", tags: [], activities: act};


  $('.alert').hide();
  $scope.displayErr = "";
  $scope.submitForm = function(){

//      console.log($scope.Image1.dataURL);
//      console.log($scope.Image2);
   /* $scope.listing.city = $scope.listing.city.name;
    $scope.listing.roomType = $scope.listing.roomType.name;
    console.log($scope.listing);
    console.log($scope.listing.city);
    console.log("create host ad");*/
    console.log($scope.listing);


    act = [];
    if($scope.thingsToDo.first)
        act.push($scope.thingsToDo.first);
    if($scope.thingsToDo.second)
        act.push($scope.thingsToDo.second);
    if($scope.thingsToDo.third)
        act.push($scope.thingsToDo.third);
    if($scope.thingsToDo.fourth)
        act.push($scope.thingsToDo.fourth);
    $scope.listing.activities = act;
    /*var listingTags = [];
    for(var i = 0; i < tags.length; i++){
        listingTags.push(tags[i]);
    }*/
//      console.log($scope.Image1.dataURL);
//      console.log($scope.Image2);
    // var hostImagesArr = [];
    // if($scope.Image1) hostImagesArr.push(String($scope.Image1.dataURL));
    // if($scope.Image2) hostImagesArr.push(String($scope.Image2.dataURL));
    // if($scope.Image3) hostImagesArr.push(String($scope.Image3.dataURL));
    // if($scope.user._id === $window.localStorage.getItem('user')._id){
    //     $window.localStorage.setItem('example1', $scope.Image1.dataURL);
    //     $window.localStorage.setItem('example2', $scope.Image2.dataURL);
    //     $window.localStorage.setItem('example3', $scope.Image3.dataURL);
    // } else {
    //     $window.localStorage.setItem('2example1', $scope.Image1.dataURL);
    //     $window.localStorage.setItem('2example2', $scope.Image2.dataURL);
    //     $window.localStorage.setItem('2example3', $scope.Image3.dataURL);
    // } 

    // $http.post("http://localhost:4000/api/images", $scope.Image1.dataURL).success(function(data){
    //     console.log("wut");
    // }).error(function(err){
    //     console.log(err);
    // })
//    $scope.listing.images.push($scope.Image2.dataURL);
//    $scope.listing.images.push($scope.Image3.dataURL);
//    $window.localStorage.setItem('exampleImage', $scope.Image1.dataURL);
    /*if ($scope.listing.description !== "" && $scope.listing.address !== "" && $scope.listing.city !== undefined
      && $scope.listing.dateStart !== "" && $scope.listing.dateEnd !== "" && $scope.listing.roomType !== undefined
      && $scope.listing.price !== 0 && $scope.listing.dateStart < $scope.listing.dateEnd){*/

      $scope.listing.city = $scope.listing.city.name;
      $scope.listing.roomType = $scope.listing.roomType.name;
      Listings.postListing($scope.listing).success(function(data){
        // add the listing id to user
        user.postedHostAds.push(data.data._id);
        User.put(user._id, user);
        console.log(data);
        $window.location.href= "#/profile";
      }).error(function(err){
        console.log(err);
      });
    /*} else {
      $scope.displayErr = "You must fill out the required fields";
      $('.alert').show();
    }*/

  }
}]);

appControllers.controller('MatchedController', ['$scope', '$window', function($scope, $window){

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

appControllers.controller('ListingDetailsController', ['$scope', '$window', '$routeParams', 'Listing', 'User', 'CommonData',
                          function($scope, $window, $routeParams, Listing, User, CommonData) {
  console.log('listing detail controller created');
  $scope.requestSent = false;
  $scope.requestSentError = false;
  $scope.requestSentText = 'Request';

  //$scope.img1 = $window.localStorage.getItem('example1');
  //$scope.img2 = $window.localStorage.getItem('example2');
  //$scope.img3 = $window.localStorage.getItem('example3');
  $scope.img1 = CommonData.getRandomImg();
  $scope.img2 = CommonData.getRandomImg();
  $scope.img3 = CommonData.getRandomImg();

  console.log($routeParams._id);
  $scope.listing= {};
  $scope.host = {};
  $scope.user = JSON.parse($window.localStorage.getItem('user'));
  Listing.getFromId($routeParams._id).success(function(data){
    //   console.log("what the fuck");
      $scope.listing = data.data;
//      console.log(data);
//      console.log($scope.listing);
      User.getFromId($scope.listing.hostID).success(function(data){
          $scope.host = data.data;
      }).error(function(err){
          $scope.host = null;
          console.log(err);
      });
  }).error(function(err){
      $scope.listing= null;
      console.log(err);
  });
  var genderPro = "he";
  console.log("host" + JSON.stringify($scope.host));
  console.log("user" + JSON.stringify($scope.user));
  console.log("listing" + JSON.stringify($scope.listing));


  $scope.requestToBook = function() {
    console.log("request to book button pressed! " + JSON.stringify($scope.host));
    var hostID = $scope.host._id;
    console.log("traveller id " +  $scope.user._id);
    var travellerID = $scope.user._id;
    var listingID = $scope.listing._id;
    $scope.host.pendingTravelers.push(travellerID);
    console.log("host pending travellers " +  $scope.host.pendingTravelers);
    $scope.host.flag = true;
    User.put(hostID, $scope.host).success(function(data) {
      console.log("request book:", data.message);
      if($scope.host.gender == "female") {
        genderPro = "she";
      }
      $scope.requestSentText += ' sent to ' + $scope.host.name + ", " + genderPro + " will reply to you when he gets the message!";
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


appControllers.controller('EditProfileController', ['$scope', '$routeParams', '$window', 'CommonData', 'User', 'upload', function($scope, $routeParams,
                          $window, CommonData, User, upload) {
  // $scope.user = {};
  // test local user
  $scope.user = JSON.parse($window.localStorage.getItem('user'));
  $scope.cities = CommonData.getCities();
  $scope.genders = [{name: "male"}, {name: "female"}, {name: "other"}];
  $scope.gender = "";
  $scope.location="";
  $scope.user = JSON.parse($window.localStorage.getItem('user'));
  $('.alert').hide();
  console.log($scope.user);
  $scope.submitChange = function() {
      $scope.user.gender = $scope.gender.name;
      $scope.user.location = $scope.location.name;
      if ($scope.user.name !== "" && $scope.user.name !== undefined
        && $scope.user.gender !== "" && $scope.user.gender !== undefined
        && $scope.user.location !== "" && $scope.user.location !== undefined
        && $scope.user.occupation !== "" && $scope.user.occupation !== undefined
        && $scope.user.age !== "" && $scope.user.age !== undefined
        && $scope.user.bio !== "" && $scope.user.bio !== undefined) {
        User.put($scope.user._id, $scope.user).success(function(data) {
          console.log("Edit user:", data.message + JSON.stringify(data.data));
          $window.location.href = '#/profile';
        });
      } else {
        $scope.displayErr = "You must fill out every field";
        $('.alert').show();
      }
  }

 }]);
