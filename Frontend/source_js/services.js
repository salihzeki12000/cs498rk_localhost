var appServices = angular.module('appServices', []);

appServices.factory('Users', function($http, $window) {
    var baseUrl = $window.sessionStorage.baseurl;
    //console.log("baseurl: "+ baseUrl);
    return {
        get : function() {
            return $http.get(baseUrl+'/profile');
        },
        postSignUp : function(user) {
            //var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'/signup', user);
        },
        postLogIn: function(user) {
            //var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'login', user);
        }
    }
});

appServices.factory('User', function($http, $window) {
    var baseUrl = $window.sessionStorage.baseurl;
    return {
        getFromId : function(userId) {
            return $http.get(baseUrl+'/api/users/' + userId);
        },
        getFromName : function(userName) {
            //var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users' + "?where={ \"name\": \"" + userName + "\"}");
        },
        put : function(userId, updatedUser) {
            //var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl+'/api/users/' + userId, updatedUser);
        },
        delete : function(userId) {
            //var baseUrl = $window.sessionStorage.baseurl;
            return $http.delete(baseUrl+'/api/users/' + userId);
        }
    }
});

appServices.factory('Listings', function($http, $window){
    var baseUrl = $window.sessionStorage.baseurl;
    return {
        postListing : function(listing){
            return $http.post(baseUrl+'/listings', listing);
        },
        getListingsByCity : function(city){
            return $http.get(baseUrl+'/listings?where={"city":"'+city+'"}');
        },
        filterListings : function(city, roomType, dateBegin, dateEnd, priceLow, priceHigh){
            var cityQ = '"city":"'+city+'"';
            var roomQ = '"roomType":"'+roomType+'"';
            var dateQ = '"date": {"$gte":'+dateBegin+'}, "price": {"$lte":'+dateEnd+'}';
            var priceQ = '"price": {"$gte":'+priceLow+'}, "price": {"$lte":'+priceHigh+'}';
            var query = '/listings?where={'+cityQ+','+roomQ+','+dateQ+','+priceQ+'}';
            console.log(query);
            return $http.get(baseUrl+query);
        },
        //fake data, generate this better with a script once we can add stuff in 
        getSampleListings : function(){
            return {message: "OK",
                    data: [{id: 1, Address: '123 Green St.', hostName: 'Sarah', bio: 'This is the most fun adventure you will ever have',
                    price: 60, roomType: 'Private Room', date: 'tomorrow', tags: ['Rock Climbing', 'Nature']},
                    {id: 2, 'Address': '123 Springfield St.', hostName: 'Margie', bio: 'I will take you to the best restaurants ever',
                    price: 50, roomType: 'Shared Room', date: 'the day after tomorrow', tags: ['Food', 'Vegetarian']},
                    {id: 3, Address: '123 Armory St.', hostName: 'Chuanhao', bio: 'Let me show you my town!',
                    price: 30, roomType: 'Private Room', date: 'tomorrow', tags: ['Architecture', 'Nature']},
                    {id: 1, Address: '124 Green St.', hostName: 'Murray', bio: 'We will eat the best burger ever',
                    price: 60, roomType: 'Shared Room', date: 'tomorrow', tags: ['Hamburgers', 'Food']}
                    ]};
        }
    }
});

appServices.factory('Listing', function($http, $window){
    var baseUrl = $window.sessionStorage.baseurl;
    return {
        getFromId : function(listingId){
            console.log("getting the listing with id " + listingId);
            return $http.get(baseUrl+'/api/listings/' + listingId);
        },
        put : function(listingId, updatedListing) {
            console.log("update " + listingId + " with: ");
            console.log(updatedListing);
            return $http.put(baseUrl+'/api/listings/' + listingId, updatedListing);
        },
        delete : function(listingId) {
            console.log("deleting " + listingId);
            return $http.delete(baseUrl+'/api/listings/' + listingId);
        }
    }
});


appServices.factory('CommonData', function(){
    var data = "";
    var user = "";
    var city = "";
    var commonProfileImg = "http://i.imgur.com/a7emodJ.jpg";
    var commonRoomImg = "http://i.imgur.com/tXMM9Ed.jpg";
    var mapImg = "http://i.imgur.com/ODTtRQr.png";
    var roomTypes = [{name: "Private Room", value: "Private Room"}, {name: "Shared Room", value: "Shared Room"}];
    return{
        getUser : function(){
            return user;
        },
        setUser: function(newUser){
            user = newUser;
        },
        getCity : function(){
            return city;
        },
        setCity: function(newCity){
            city = newCity;
        },
        getProfileImg: function(){
          return commonProfileImg;
        },
        getRoomImg: function(){
          return commonRoomImg;
        },
        getMapImg: function(){
          return mapImg;
        },
        getRoomTypes: function() {
            return roomTypes;
        }
    }
});

appServices.service('Auth', function() {
  var auth = {};

  auth.loggedIn = true;//false;

  auth.login = function() {
    auth.loggedIn = true;
  };

  auth.logout = function() {
    auth.loggedIn = false;
  };

  return auth;
});
