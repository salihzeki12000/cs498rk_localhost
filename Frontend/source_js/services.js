var appServices = angular.module('appServices', []);

appServices.factory('Users', function($http, $window) {
    var baseUrl = 'http://localhost:4000';
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
            return $http.post(baseUrl+'/login', user);
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
        getListings : function(){
            return $http.get(baseUrl+'/listings');
        },
        getListingsByCity : function(city){
            console.log(city);
            return $http.get(baseUrl+'/listings?where={"city":"'+city+'"}');
        },
        filterListings : function(city, roomType, dateBegin, dateEnd, priceLow, priceHigh, tags){
            var query = '/listings?where={';
            if (city !== "")
                query += '"city":"'+city+'", ';
            query += '"roomType":"'+roomType+'"';
            if (dateBegin !== "")
                query += ', "date": {"$gte":'+dateBegin+'}, "date": {"$lte":'+dateEnd+'}';
            query += ', "price": {"$gte":'+priceLow+'}, "price": {"$lte":'+priceHigh+'}';
            if (tags.length > 0)
                query += ', "tags":{"$in":"'+tags+'"}'
            query += '}';
            console.log(query);
            return $http.get(baseUrl+query);
        },
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
    var tags = [{name:'Hiking', value:'Hiking'},{name:'Dancing', value:'Dancing'}];
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
        },
        getTags : function() {
            return tags;
        }
    }
});

appServices.service('Auth', function($rootScope) {
  var auth = {};
    //$rootScope.loggedIn = false;
    //$rootScope.user = null;

  auth.login = function(user) {
    $rootScope.user = user;
    $rootScope.loggedIn = true;
  };

  auth.logout = function() {
    $rootScope.user = null;
    $rootScope.loggedIn = false;
  };

  return auth;
});
