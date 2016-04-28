var appServices = angular.module('appServices', []);

appServices.factory('CommonData', function(){
    var data = "";
    return{
        getData : function(){
            return data;
        },
        setData : function(newData){
            data = newData;
        }
    }
});

appServices.factory('Users', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/profile');
        },
        postSignUp : function(user) {
            var baseUrl = $window.sessionStorage.baseurl;

              console.log("baseurl: "+ baseUrl);
            return $http.post(baseUrl+'/signup', user);
        },
        postLogIn: function(user) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.post(baseUrl+'login', user);
        }
    }
});

appServices.factory('User', function($http, $window) {
    return {
        getFromId : function(userId) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users/' + userId);
        },
        getFromName : function(userName) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/users' + "?where={ \"name\": \"" + userName + "\"}");
        },
        put : function(userId, updatedUser) {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.put(baseUrl+'/api/users/' + userId, updatedUser);
        },
        delete : function(userId) {
            var baseUrl = $window.sessionStorage.baseurl;
            //TODO: reassign assigned tasks to undefined!
            return $http.delete(baseUrl+'/api/users/' + userId);
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
        }
    }
});

appServices.service('Auth', function() {
  var auth = {};

  auth.loggedIn = false;

  auth.login = function() {
    auth.loggedIn = true;
  };

  auth.logout = function() {
    auth.loggedIn = false;
  };

  return auth;
});
