'use strict';

angular.module('lostPawsApp')
  .controller('FoundCtrl', function ($scope, $http, socket, gMapFactory, $location) {
    $scope.addPet = function(){
      if($scope.foundPet.name === ''){
        return;
      }
      $http.post('/api/pets', { name: $scope.foundPet.name, type: $scope.foundPet.type, color: $scope.foundPet.color, addressFound: $scope.foundPet.address });
      $scope.foundPet.name = '';
      $scope.foundPet.type = '';
      $scope.foundPet.color = '';
      $scope.foundPet.address = '';
      $location.path('/')
    };
  });
