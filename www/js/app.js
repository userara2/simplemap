// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordova'])
.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
  .state('map', {
    url: '/',
    templateUrl: 'templates/map.html',
    controller: 'MapCtrl'
  });

  $urlRouterProvider.otherwise("/");
})
.controller('MapCtrl', function($scope, $state, $cordovaGeolocation) {
  var options = {timeout: 10000, enableHighAccuracy: true};

  $cordovaGeolocation.getCurrentPosition(options).then(function(position){

    var latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

    var mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

    $scope.doit = function() {
console.log("inside do it.");
  //  google.maps.event.addListenerOnce(map, 'bounds_changed', function() {

      // Getting the boundaries of the map
      var bounds = $scope.map.getBounds();

      // Getting the corners of the map
      var southWest = bounds.getSouthWest();
      var northEast = bounds.getNorthEast();

      // Calculating the distance from the top to the bottom of the map
      var latSpan = northEast.lat() - southWest.lat();

      // Calculating the distance from side to side
      var lngSpan = northEast.lng() - southWest.lng();

      // Creating a loop

    //amountitems  $scope.startnum = "John";

    var   start = $scope.startnum;
    var   amount = parseInt(start) + parseInt($scope.amountitems);

    console.log("start: "+start+" amount: "+amount);

      for (start; start < amount; start++) {

        // Creating a random position
        var lat = southWest.lat() + latSpan * Math.random();
        var lng = southWest.lng() + lngSpan * Math.random();
        var latlng = new google.maps.LatLng(lat, lng);
//console.log("{"+lat+lng+"}");
  var min = Math.ceil(5);
  var max = Math.floor(50);
  var price = Math.floor(Math.random() * (50 - 5)) + 5;
console.log("INSERT INTO `ad_8a93163026d50a0`.`activespots` (`id`,`name`,`label`,`price`,`coor`)VALUES("+start+", 'point"+start+"', 'label"+start+"', '"+price+"', GeomFromText('POINT("+lat+" "+lng+")'));");

        // Adding a marker to the map
        new google.maps.Marker({
          position: latlng,
          map: $scope.map
        });

      }


}




  }, function(error){
    console.log("Could not get location");
  });
});
