var appServices = angular.module('appServices', []);

appServices.factory('Users', function($http, $window) {
    var baseUrl = 'http://localhost:4000';
    return {
        get : function() {
            return $http.get(baseUrl+'/profile');
        },
        postSignUp : function(user) {
            return $http.post(baseUrl+'/signup', user);
        },
        postLogIn: function(user) {
            return $http.post(baseUrl+'/login', user);
        }
    }
});

appServices.factory('User', function($http, $window) {
    var baseUrl = 'http://localhost:4000' +'/api';
    return {
        getFromId : function(userId) {
            return $http.get(baseUrl+'/users/' + userId);
        },
        getFromName : function(userName) {
            return $http.get(baseUrl+'/users' + "?where={ \"name\": \"" + userName + "\"}");
        },
        put : function(userId, updatedUser) {
            return $http.put(baseUrl+'/users/' + userId, updatedUser);
        },
        delete : function(userId) {
            return $http.delete(baseUrl+'/users/' + userId);
        },
        //upload
        uploadImage : function(formData) {
            return $http.post(baseUrl+'/upload/', formData, {
                        headers: { 'Content-Type': false },
                        transformRequest: angular.identity
                    });
        }
    }
});

appServices.factory('Listings', function($http, $window){
    var baseUrl = 'http://localhost:4000'+'/api';
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
        filterListings : function(city, roomType, dateStart, dateEnd, priceLow, priceHigh, tags){
            var query = '/listings?where={';
            if (city !== "")
                query += '"city":"'+city+'", ';
            query += '"roomType":"'+roomType+'"';
            if (dateStart !== "")
                query += ', "date": {"$gte":'+dateStart+'}, "date": {"$lte":'+dateEnd+'}';
            query += ', "price": {"$gte":'+priceLow+'}, "price": {"$lte":'+priceHigh+'}';
            if (tags.length > 0)
                query += ', "tags":{"$in":["'+tags+'"]}';
            query += '}';
            console.log(query);
            return $http.get(baseUrl+query);
        },
    }
});

appServices.factory('Listing', function($http, $window){
    var baseUrl = 'http://localhost:4000'+'/api';
    return {
        getFromId : function(listingId){
            return $http.get(baseUrl+'/listings/' + listingId);
        },
        put : function(listingId, updatedListing) {
            return $http.put(baseUrl+'/listings/' + listingId, updatedListing);
        },
        delete : function(listingId) {
            return $http.delete(baseUrl+'/listings/' + listingId);
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
    var roomTypes = [{name: "Private Room", value: "Private"}, {name: "Shared Room", value: "Shared"}];
    var cities = [{name:'San Francisco, USA', value:'San Francisco, USA'},{name:'Singapore, Singapore', value:'Singapore, Singapore'},{name:'Prague, Czech Republic', value:'Prague, Czech Republic'},
        {name:'Marrakech, Morocco', value:'Marrakech, Morocco'},{name:'Quito, Ecuador', value:'Quito, Ecuador'},{name:'Brisbane, Australia', value:'Brisbane, Australia'}];
    var tags = [{name:'Nature', value:'Nature'}, {name:'Dancing', value:'Dancing'},{name:'Vegetarian', value:'Vegetarian'},{name:'Hiking', value:'Hiking'},{name:'City', value:'City'},
                {name:'Sports', value:'Sports'}, {name:'Water', value:'Water'},{name:'Animals', value:'Animals'},{name:'Architecture', value:'Architecture'},
                {name:'Gourmet', value:'Gourmet'}];
    return {
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
        },
        getCities : function() {
            return cities;
        }
    }
});

appServices.service('Auth', function($window) {
  var auth = {};
    //$rootScope.loggedIn = false;
    //$rootScope.user = null;

  auth.login = function(user) {
    $window.localStorage.setItem('user', JSON.stringify(user));
    $window.localStorage.setItem('loggedIn', 'true');
  };

  auth.logout = function() {
    $window.localStorage.setItem('user', "");
    $window.localStorage.setItem('loggedIn', 'false');
  };

  return auth;
});
