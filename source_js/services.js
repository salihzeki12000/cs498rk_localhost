var mp4Services = angular.module('mp4Services', []);

mp4Services.factory('CommonData', function(){
    var data = "";
    var user = "";
    var city = "";
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
        }
    }
});

mp4Services.service('Auth', function() {
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

mp4Services.factory('Llamas', function($http, $window) {
    return {
        get : function() {
            var baseUrl = $window.sessionStorage.baseurl;
            return $http.get(baseUrl+'/api/llamas');
        }
    }
});
