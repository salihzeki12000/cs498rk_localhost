var appControllers = angular.module('appControllers', ['720kb.datepicker']);

appControllers.controller('MainCtrl', ['$scope', '$window', 'Auth', 'CommonData', function($scope, $window, Auth, CommonData) {
  $scope.auth = Auth;
  $scope.user = CommonData.getUser();
  $scope.img = CommonData.getProfileImg();
  $window.sessionStorage.baseurl = "localhost:4000"
  console.log("logged in? " + Auth.loggedIn);
}]);

appControllers.controller('LandingPageController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData) {
  $scope.data = "";
  $scope.displayText = ""
  $scope.img = CommonData.getProfileImg();
  $scope.roomImg = CommonData.getRoomImg();
  var imagePath = './data/';
  $scope.hotCities = [{name: 'Chicago', img: imagePath+'chicago.jpg'},{name: 'New York', img: imagePath+'newYork.jpg'},
  {name: 'London', img: imagePath+'london.jpeg'}, {name: 'San Francisco', img: imagePath+'sanFran.jpg'},
  {name: 'Seattle', img: imagePath+'seattle.jpg'}, {name: 'Paris', img: imagePath+'paris.jpg'}];
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

appControllers.controller('hostOrTravellerController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData){

}]);

appControllers.controller('TravellerSearchController', ['$scope', '$window', 'CommonData', function($scope, $window, CommonData) {
  $scope.city = "";

  $scope.chooseCity = function (city) {
    console.log("city chosen: " + city);
    CommonData.setCity(city);
  }

}]);

appControllers.controller('SearchAdsController', ['$scope', '$window', 'CommonData', 'Listings', function($scope, $window, CommonData, Listings) {
  $scope.city = CommonData.getCity();
  $scope.roomTypes = CommonData.getRoomTypes();
  $scope.roomType = $scope.roomTypes[0];
  $scope.ads = Listings.getSampleListings().data; 
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
  $scope.address = "";
  $scope.bio = "";
  $scope.roomTypes = CommonData.getRoomTypes();
  $scope.roomType = $scope.roomTypes[0];
  $scope.price = "";
  $scope.dateStart = "";
  $scope.dateEnd = "";
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
  $scope.img = CommonData.getProfileImg();
  var loremIpsum = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
  $scope.user = {name: 'Sample Host', address: '123 S Main St', bio: 'My name is Sample Host. '+loremIpsum, roomType: 'Private Room', tags: ['Dancing', 'Vegetarian'], dates:['tomorrow']};
}]);
