var app = angular.module('mp4', ['ngRoute', 'appControllers', 'appServices']);

/*app.run(function ($rootScope, $location, $route, AuthService) {
  $rootScope.$on('$routeChangeStart',
    function (event, next, current) {
      AuthService.getUserStatus()
      .then(function(){
        if (next.access.restricted && !AuthService.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});*/


app.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
    when('/signup', {
    templateUrl: 'partials/signup.html',
    controller: 'SignupController'
  }).
  when('/login', {
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  }).
  when('/settings', {
    templateUrl: 'partials/settings.html',
    controller: 'SettingsController'
  }).
  when('/profile', {
    templateUrl: 'partials/profile.html',
    controller: 'ProfileController'
  }).
  when('/createHostAd', {
    templateUrl: 'partials/createHostAd.html',
    controller: 'CreateHostAdController'
  }).
  when('/landing', {
    templateUrl: 'partials/landingPage.html',
    controller: 'LandingPageController'
  }).
  when('/travellerhost', {
    templateUrl: 'partials/hostOrTraveller.html',
    controller: 'hostOrTravellerController'
  }).
  when('/travellersearch', {
    templateUrl: 'partials/travellerSearch.html',
    controller: 'TravellerSearchController'
  }).
  when('/hostbio/:hostID/', {
    templateUrl: 'partials/hostBio.html',
    controller: 'HostBioController'
  }).
  when('/hostbio', {
    templateUrl: 'partials/hostBio.html',
    controller: 'HostBioController'
  }).
  when('/searchads', {
    templateUrl: 'partials/searchAds.html',
    controller: 'SearchAdsController'
  }).
  when('/listingdetails/:_id', {
    templateUrl: 'partials/listingDetails.html',
    controller: 'ListingDetailsController'
  }).
  when('/edituserprofile', {
    templateUrl: 'partials/editUserProfile.html',
    controller: 'EditProfileController'
  }).
  when('/matched', {
      templateUrl: 'partials/matched.html',
      controller: 'MatchingController'
  }).
  otherwise({
    redirectTo: '/landing'
  });
}]);
