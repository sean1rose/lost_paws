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
      if($scope.newPet === ''){
        return;
      }
      $http.post('/api/pets', { name: $scope.foundPet.name, type: $scope.foundPet.type, color: $scope.foundPet.color, addressFound: $scope.foundPet.address });
      $scope.newPet = '';
    };

    $scope.deletePet = function(pet){
      $http.delete('/api/pets/' + pet._id);
    };

    $scope.$on('$destroy', function(){
      socket.unsyncUpdates('pet');
    })

  });
