var appControllers = angular.module('appControllers', ['720kb.datepicker']);

appControllers.controller('MainCtrl', ['$scope', 'Auth', 'CommonData', function($scope, Auth, CommonData) {
  $scope.auth = Auth;
  $scope.user = CommonData.getUser();
  $scope.img = CommonData.getProfileImg();
  console.log(Auth.loggedIn);
}]);

appControllers.controller('LandingPageController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.data = "";
   $scope.displayText = ""
   $scope.img = CommonData.getProfileImg();
   $scope.roomImg = CommonData.getRoomImg();
}]);

appControllers.controller('ProfileController', ['$scope', '$http', 'Users', function($scope, $http, Users) {
   $scope.profile = false;
   Users.get().success(function(data) {
     console.log("frontend profile" + JSON.stringify(data));
		if(!data.error) {
			$scope.profile = true;
			$scope.user = data.data.user;
		}

   });
 }]);

appControllers.controller('LoginController', ['$scope', '$window', 'Users', function($scope, $window, Users) {
  $scope.data = "";
   $scope.displayText = ""

  $scope.login = function() {
    console.log($scope.user);
    Users.postLogIn($scope.user).success(function (data) {
      console.log("success");
      $window.location.href = '#/profile';
    });
  };

}]);

appControllers.controller('SignupController', ['$scope', '$window', 'Users', function($scope, $window, Users) {
  $scope.data = "";

  $scope.signup = function() {
    console.log($scope.user);
    Users.postSignUp($scope.user).success(function (data) {
      console.log("data: " + JSON.stringify(data));
      $window.location.href = '#/profile';
    });
  }

}]);

appControllers.controller('TravellerSearchController', ['$scope', '$window', 'CommonData'  , function($scope, $window, CommonData) {
  $scope.city = "";

  $scope.chooseCity = function (city) {
    console.log("city chosen: " + city);
    CommonData.setCity(city);
  }

}]);

appControllers.controller('SearchAdsController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData) {
  $scope.city = CommonData.getCity();
  $scope.roomTypes = [{"name": "Single Bed", "value": "Single Bed"}];
  $scope.changeCity = function (city) {
    CommonData.setCity(city);
    console.log("city changed: " + city);
  }
}]);

appControllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    console.log("base url: " +$scope.url);
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";
  };

}]);


appControllers.controller('CreateHostAdController', ['$scope' , '$window' , 'CommonData', function($scope, $window, CommonData) {
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

appControllers.controller('MatchingController', ['$scope', '$window', function($scope, $window){

}]);

appControllers.controller('HostBioController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData){
  $scope.roomImg = CommonData.getRoomImg();
}]);
