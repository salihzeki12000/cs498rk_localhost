var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('SignupController', ['$scope', 'CommonData'  , function($scope, CommonData) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.setData = function(){
    CommonData.setData($scope.data);
    $scope.displayText = "Data set"

  };

}]);

mp4Controllers.controller('LoginController', ['$scope', 'CommonData' , function($scope, CommonData) {
  $scope.data = "";

  $scope.getData = function(){
    $scope.data = CommonData.getData();

  };

}]);


mp4Controllers.controller('ProfileController', ['$scope', '$http', 'Llamas', '$window' , function($scope, $http,  Llamas, $window) {

  Llamas.get().success(function(data){
    $scope.llamas = data;
  });


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
