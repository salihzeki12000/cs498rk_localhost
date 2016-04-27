var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('MainCtrl', ['$scope', 'Auth', 'CommonData', function($scope, Auth, CommonData) {
  $scope.auth = Auth;
  $scope.user = CommonData.getUser();
  console.log(Auth.loggedIn);
}]);

mp4Controllers.controller('LandingPageController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

}]);

mp4Controllers.controller('SignupController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.data = "";
   $scope.displayText = "";
   $scope.user = "";

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

mp4Controllers.controller('SearchAdsController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.city = CommonData.getCity();

  $scope.changeCity = function (city) {
    CommonData.setCity(city);
    console.log("city changed: " + city);
  }
}]);

mp4Controllers.controller('ProfileController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });
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


mp4Controllers.controller('CreateHostAdController', ['$scope' , '$window' , function($scope, $window) {
  $scope.text = "HELLOOOOO";
  $scope.address = "";
  $scope.bio = "";
  $scope.roomTypes = [{"name": "Single Bed", "value": "Single Bed"}]
  $scope.roomType = $scope.roomTypes[0];
  $scope.date = "";
  $scope.tags = [];
  $scope.submitForm = function(){
    console.log("horray");
  }

}]);

mp4Controllers.controller('MatchingController', ['$scope', '$window', function($scope, $window){

}]);
