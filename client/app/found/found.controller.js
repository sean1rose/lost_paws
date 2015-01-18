'use strict';

angular.module('lostPawsApp')
  .controller('FoundCtrl', function ($scope, $http, socket, gMapFactory, $location) {
    $scope.addPet = function(){
      if($scope.foundPet.name === ''){
        return;
      }
      $http.post('/api/pets', { name: $scope.foundPet.name, type: $scope.foundPet.type, color: $scope.foundPet.color, addressFound: $scope.foundPet.address, dateFound: $scope.foundPet.dateFound, foundBy: $scope.foundPet.foundBy, finderContact: $scope.foundPet.finderContact });
      $scope.foundPet.name = '';
      $scope.foundPet.type = '';
      $scope.foundPet.color = '';
      $scope.foundPet.address = '';
      $scope.foundPet.dateFound = '';
      $scope.foundPet.foundBy = '';
      $scope.foundPet.finderContact = '';
      $location.path('/lost')
    };

    // want to make sure that the currently-logged-in user's info is entered into the database along with this information...

  });
