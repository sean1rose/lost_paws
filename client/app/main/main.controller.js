'use strict';

angular.module('lostPawsApp')
  .controller('MainCtrl', function ($scope, $http, socket) {

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
      // need to get input and add to get request
      var convertToUrl = function(inputLocation){
        var location = inputLocation;
        var split = location.split(' ');
        var joined = split.join('+');
        var httpAddress = 'http://maps.google.com/maps/api/geocode/json?address=' + joined + '&sensor=false';
        return httpAddress;        
      };

      var convertedUrl = convertToUrl($scope.formInfo.location);
      $scope.formInfo.location = '';
      console.log('Here: ', convertedUrl);

      $http.get(convertedUrl).success(function(mapData) {
        console.log(mapData);
        var ladder = mapData.results[0].geometry.location.lat; 
        var longer = mapData.results[0].geometry.location.lng;
        console.log('lat-', ladder, 'long-', longer);
        $scope.map = {
          center: {
            latitude: ladder,
            longitude: longer
          },
          zoom: 15
        }
      });
    };

    $scope.petMarkers = [];
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
          var location = singlePet.addressFound;
          var split = location.split(' ');
          var joined = split.join('+');
          var httpAddress = 'http://maps.google.com/maps/api/geocode/json?address=' + joined + '&sensor=false';

          $http.get(httpAddress).success(function(mapDataAgain){
            console.log('index is currently ---> ', index);
            console.log('mapDataAgain IS ', mapDataAgain);
            var ladder = mapDataAgain.results[0].geometry.location.lat; 
            console.log('ladder IS ', ladder);
            var longer = mapDataAgain.results[0].geometry.location.lng;
            var obj = {
              latitude: ladder,
              longitude: longer,
              title: petName,
              title2: petType,
              id: index,
              show: false,
              onClick: function(){
                console.log("Clicked!");
                obj.show = !obj.show;
              }
            };
            $scope.$watch(function(){
              console.log('we are in scope.watch');
              return $scope.map.bounds;
            }, function(){
              var markers = [];
              //markers.push(obj);
              $scope.petMarkers.push(obj);
              //$scope.petMarkers = markers;
              console.log('markers = ', $scope.petMarkers);
            }, true);
          });
        });
      };
      markerCreator(listOfPets);
    });
    // iterate thru $scope.foundPets (array of objects --> objectName.addressFound)
    // take each foundPets.addressFound --> convert to lat/long
    // run thru marker

    // var latConverter = function(inputLocation){
    //   var location = inputLocation;
    //   var split = location.split(' ');
    //   var joined = split.join('+');
    //   var httpAddress = 'http://maps.google.com/maps/api/geocode/json?address=' + joined + '&sensor=false';
    //   $http.get(httpAddress).success(function(mapDataAgain){
    //     console.log('mapDataAgain IS ', mapDataAgain);
    //     var ladder = mapDataAgain.results[0].geometry.location.lat; 
    //     console.log('ladder IS ', ladder);
    //     var longer = mapDataAgain.results[0].geometry.location.lng;
    //   });
    // };

    // latConverter('505 SunnyhillWay, Anaheim CA 92808');

    // var listOfPets = $scope.foundPets;
    // // marker time
    // $scope.petMarkers = [];

    // $scope.$watch(function() {
    //   return $scope.map.bounds;
    // }, function(nv, ov){
    //   if (!ov.southwest && nv.southwest){
    //     var markers = [];
    //     for (var i = 0; i < listOfPets.length; i++){
    //       markers.push(latConverter(listOfPets[i].addressFound));
    //     }
    //     $scope.petMarkers = markers;
    //   }
    // }, true);

  });
