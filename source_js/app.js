var app = angular.module('mp4', ['ngRoute', 'mp4Controllers', 'mp4Services']);

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
    controller: 'CreateHostAdController'
  }).
  when('/travellerhost', {
    templateUrl: 'partials/hostOrTraveller.html',
    controller: 'CreateHostAdController'
  }).
  when('/travellersearch', {
    templateUrl: 'partials/travellerSearch.html',
    controller: 'CreateHostAdController'
  }).
  when('/:hostID/hostbio', {
    templateUrl: 'partials/hostBio.html',
    controller: 'CreateHostAdController'
  }).
  when('/searchads', {
    templateUrl: 'partials/searchAds.html',
    controller: 'CreateHostAdController'
  }).
  when('/matched', {
      templateUrl: 'partials/matched.html',
      controller: 'MatchingController'
  }).
  otherwise({
    redirectTo: '/landing'
  });
}]);
