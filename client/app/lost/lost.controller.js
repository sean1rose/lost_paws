'use strict';

angular.module('lostPawsApp')
  .controller('LostCtrl', function ($scope, $http, socket, gMapFactory, $location) {

    $scope.foundPets = {};
    $scope.mapData = {};
    $scope.formInfo = {};
    $scope.options = {
      scrollwheel: false
    }

    $http.get('/api/pets').success(function(foundPets){
      $scope.foundPets = foundPets;
      console.log('items in database ', $scope.foundPets);
      socket.syncUpdates('pet', $scope.foundPets);
    });

    $scope.deletePet = function(pet){
      $http.delete('/api/pets/' + pet._id);
    };

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('pet');
    });

    // initial setting config of g-map
    var latlng = new google.maps.LatLng(37.7833, -122.4167);
    
    var mapOptions = {
      zoom: 15,
      center: latlng
    };
    
    // initial Initialization of map
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Lost Pet Search that displays a map centered at searched address
    $scope.findPet = function(){
      var location = $scope.formInfo.location;
      $scope.formInfo.location = '';
      gMapFactory.parsePetSearch(location, map);
    };

    $scope.petMarkers = [];

    // accessing pets API to retrieve pets and display markers
    $http.get('/api/pets').success(function(foundPets){
      $scope.foundPets = foundPets;
      var listOfPets = $scope.foundPets;
      console.log('LOOK HERE! ---> ', listOfPets[0].name)
      gMapFactory.markerCreator(listOfPets, map);
    });


  });
