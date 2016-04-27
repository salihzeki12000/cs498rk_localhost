var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('MainCtrl', ['$scope', 'Auth', 'CommonData', function($scope, Auth, CommonData) {
  $scope.auth = Auth;
  $scope.user = CommonData.getUser();
  $scope.img = CommonData.getProfileImg();
  console.log(Auth.loggedIn);
}]);

mp4Controllers.controller('LandingPageController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.data = "";
   $scope.displayText = ""
   $scope.img = CommonData.getProfileImg();
   $scope.roomImg = CommonData.getRoomImg();
}]);

mp4Controllers.controller('SignupController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.data = "";
   $scope.displayText = "";
   $scope.user = "";
   $scope.img = CommonData.getProfileImg();
  $scope.signup = function(){
    CommonData.setUser($scope.user);
    $window.location.href= "#/travellerhost";
  };

}]);

mp4Controllers.controller('LoginController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);

mp4Controllers.controller('TravellerSearchController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.city = "";

  $scope.chooseCity = function (city) {
    console.log("city chosen: " + city);
    CommonData.setCity(city);
  }

}]);

mp4Controllers.controller('SearchAdsController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData) {
  $scope.city = CommonData.getCity();

  $scope.changeCity = function (city) {
    CommonData.setCity(city);
    console.log("city changed: " + city);
  }
}]);

mp4Controllers.controller('ProfileController', ['$scope', '$http', '$window', 'CommonData', function($scope, $http, $window, CommonData) {
  $scope.img = CommonData.getProfileImg();
  $scope.roomImg = CommonData.getRoomImg();
  $scope.mapImg = CommonData.getMapImg();
  $scope.editListing = function(){
      newURL = "#/createHostAd"
      $window.location.href = newURL;
      //do a bunch of other things.
  }

}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);


mp4Controllers.controller('CreateHostAdController', ['$scope' , '$window' , 'CommonData', function($scope, $window, CommonData) {
  $scope.text = "HELLOOOOO";
  $scope.address = "";
  $scope.bio = "";
  $scope.roomTypes = [{"name": "Single Bed", "value": "Single Bed"}]
  $scope.roomType = $scope.roomTypes[0];
  $scope.date = "";
  $scope.tags = [];
  $scope.img = CommonData.getProfileImg();
  $scope.roomImg = CommonData.getRoomImg();
  $scope.submitForm = function(){
    console.log("horray");
  }

}]);

mp4Controllers.controller('MatchingController', ['$scope', '$window', function($scope, $window){

}]);

mp4Controllers.controller('HostBioController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData){
  $scope.roomImg = CommonData.getRoomImg();
}]);
