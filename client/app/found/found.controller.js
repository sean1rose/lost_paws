'use strict';

angular.module('lostPawsApp')
  .controller('FoundCtrl', function ($scope, $http, socket, gMapFactory, $location) {
    $scope.foundPet = {};
    $scope.errors = {};

    $scope.addPet = function(form){
      $scope.submitted = true;
      // if($scope.foundPet.name === ''){
      //   return;
      // }

      // $scope.foundPetForm
      if (form.$valid){
        $http.post('/api/pets', { name: $scope.foundPet.name, type: $scope.foundPet.type, color: $scope.foundPet.color, addressFound: $scope.foundPet.address, dateFound: $scope.foundPet.dateFound, foundBy: $scope.foundPet.foundBy, finderContact: $scope.foundPet.finderContact })
        .success(function(data){
          console.log('data has been sent to backend...', data);
        })
        .error(function(err){
          console.log('error', err);
        })
        .then(function(){
          $location.path('/lost');
        })
        $scope.foundPet.name = '';
        $scope.foundPet.type = '';
        $scope.foundPet.color = '';
        $scope.foundPet.address = '';
        $scope.foundPet.dateFound = '';
        $scope.foundPet.foundBy = '';
        $scope.foundPet.finderContact = '';
        $location.path('/lost') 
      }
    };

    // want to make sure that the currently-logged-in user's info is entered into the database along with this information...

  });
