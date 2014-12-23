'use strict';

angular.module('lostPawsApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

    $scope.foundPets = {};
    // $scope.foundpets = [];

    $http.get('/api/pets').success(function(foundPets){
      $scope.foundPets = foundPets;
      socket.syncUpdates('pet', $scope.foundPets);
    });

    $scope.addPet = function(){
      if($scope.foundPet.name === ''){
        return;
      }
      $http.post('/api/pets', { name: $scope.foundPet.name, type: $scope.foundPet.type, color: $scope.foundPet.color, addressFound: $scope.foundPet.address });
      $scope.foundPet.name = '';
      $scope.foundPet.type = '';
      $scope.foundPet.color = '';
      $scope.foundPet.address = '';
    };

    $scope.deletePet = function(pet){
      $http.delete('/api/pets/' + pet._id);
    };

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('pet');
    });

    // google maps 
    $scope.map = {
      center: {
        latitude: 37.7833,
        longitude: -122.4167
      },
      zoom: 15
    };

    // create list of markers to use w/ ng-repeat
    $scope.markerList = [
      {
        latitude: 45,
        longitude: -73
      },
      {
        latitude: 46,
        longitude: -74
      }
    ]

  });
