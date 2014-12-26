'use strict';

angular.module('lostPawsApp')
  .controller('MainCtrl', function ($scope, $http, socket, gMapFactory) {

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

    // default google maps 
    $scope.map = {
      center: {
        latitude: 37.7833,
        longitude: -122.4167
      },
      zoom: 15,
      bounds: {}
    };

    // model for find pet search box (user inputs address/zip and map centers to that location)
    $scope.findPet = function(){
      var location = $scope.formInfo.location;
      $scope.formInfo.location = '';
      gMapFactory.setAddress(location);
      gMapFactory.callGMaps().then(function(data){
        var petLatitude = data.results[0].geometry.location.lat;
        var petLongitude = data.results[0].geometry.location.lng;
        $scope.map = {
          center: {
            latitude: petLatitude,
            longitude: petLongitude
          },
          zoom: 15
        };
      });
    };

    $scope.petMarkers = [];
    // display each pet in database to map + add markers/windows
    $http.get('/api/pets').success(function(foundPets){
      $scope.foundPets = foundPets;
      var listOfPets = $scope.foundPets;
      console.log('list! ', listOfPets);
      var markerCreator = function(arrayOfPets){
        console.log('markerCreator is called! arrayOfPets is - ', arrayOfPets);
        arrayOfPets.forEach(function(item, index, array){
          var singlePet = item;
          var petName = singlePet.name;
          var petType = singlePet.type;
          var location = singlePet.addressFound  
          // incorporate factory
          gMapFactory.setAddress(location);
          gMapFactory.callGMaps().then(function(data){
            var petLatitude = data.results[0].geometry.location.lat;
            var petLongitude = data.results[0].geometry.location.lng;
            var obj = {
              latitude: petLatitude,
              longitude: petLongitude,
              title: petName,
              title2: petType,
              id: index,
              show: false,
              onClick: function(){
                console.log("Clicked");
                obj.show = !obj.show;
              }
            };
            $scope.$watch(function(){
              return $scope.map.bounds;
            }, function(){
              var markers = [];
              $scope.petMarkers.push(obj);
            }, true);
          });
        });
      };
      markerCreator(listOfPets);
    });

  });
