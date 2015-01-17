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


    var latlng = new google.maps.LatLng(37.7833, -122.4167);
    
    var mapOptions = {
      zoom: 15,
      center: latlng
    };
    
    // initial Initialization of map
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    var displayMap = function(standardAddress){
      var geocoder = new google.maps.Geocoder();
      // var mapOptions = {
      //   center: { lat: latit, lng: longit},
      //   zoom: 15
      // }
      geocoder.geocode( {'address': standardAddress}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
          console.log('results are ', results);
          map.setCenter(results[0].geometry.location);
        } else {
          console.log('map and geocoder did not display cuz ', status);
        }
      })
    }


    // model for find pet search box (user inputs address/zip and map centers to that location)
    $scope.findPet = function(){
      var location = $scope.formInfo.location;
      $scope.formInfo.location = '';

      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( { 'address': location}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
          console.log('in the findPets geocoder');
          var coordObj = results[0].geometry.location;
          var lati = coordObj.D;
          var longi = coordObj.k;
          var regAddress = results[0].formatted_address;
          console.log('address is ', regAddress);
          displayMap(regAddress);
        } else {
          console.log('pet search failed!');
        }
      })


      // gMapFactory.setAddress(location);
      // gMapFactory.callGMaps().then(function(data){
      //   var petLatitude = data.results[0].geometry.location.lat;
      //   var petLongitude = data.results[0].geometry.location.lng;
      //   $scope.map = {
      //     center: {
      //       latitude: petLatitude,
      //       longitude: petLongitude
      //     },
      //     zoom: 15
      //   };
      // });
    };

    $scope.petMarkers = [];

    $http.get('/api/pets').success(function(foundPets){
      $scope.foundPets = foundPets;
      var listOfPets = $scope.foundPets;
      var markerCreator = function(arrayOfPets){
        var geocoder = new google.maps.Geocoder();
        console.log('inside markerCreator funciton, have an array of pets from db - ', arrayOfPets);
        arrayOfPets.forEach(function(item, index, array){
          var singlePet = item;
          var petName = singlePet.name;
          var petType = singlePet.type;
          var location = singlePet.addressFound;
          geocoder.geocode( { 'address': location}, function(results, status){
            if (status == google.maps.GeocoderStatus.OK){
              console.log('status is GOOD!, see!!! --- ', results);
              // console.log('retrieve address correctly? --> ', results[0].formatted_address);
              var polePosition = results[0].formatted_address;
              // var petLatitude = results[0].geometry.location.lat;
              // var petLongitude = results[0].geometry.location.lng;

              var petLatitude = results[0].geometry.location.D;
              var petLongitude = results[0].geometry.location.k;
              console.log('petLatitude ', petLatitude);
              console.log('petLongitude ', petLongitude);
              var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
              });
              console.log('marker is ', marker);
            }
          })
        })
      }
      markerCreator(listOfPets);
    });


  });

    // default google maps 
    // $scope.map = {
    //   center: {
    //     latitude: 37.7833,
    //     longitude: -122.4167
    //   },
    //   zoom: 15,
    //   bounds: {}
    // };

              // var obj = {
              //   latitude: petLatitude,
              //   longitude: petLongitude,
              //   title: petName,
              //   title2: petType,
              //   id: index,
              //   show: false,
              //   onClick: function(){
              //     console.log('Marker clicked');
              //     obj.show = !obj.show;
              //   }
              // };
              // console.log('obj IS ', obj);
              // $scope.$watch(function(){
              //   return $scope.map.bounds;
              // }, function(){
              //   var markers = [];
              //   $scope.petMarkers.push(obj);
              //   console.log('petMarkers IS ', $scope.petMarkers);
              // }, true);

    // // PURPOSE: display each pet in database to map + add markers/windows
    // // get the pet-database data from API, upon success...
    // $http.get('/api/pets').success(function(foundPets){
    //   $scope.foundPets = foundPets;
    //   var listOfPets = $scope.foundPets;
    //   console.log('list! ', listOfPets);
    //   var markerCreator = function(arrayOfPets){
    //     console.log('markerCreator is called! arrayOfPets is - ', arrayOfPets);
    //     arrayOfPets.forEach(function(item, index, array){
    //       var singlePet = item;
    //       var petName = singlePet.name;
    //       var petType = singlePet.type;
    //       var location = singlePet.addressFound  
    //       // incorporate factory
    //       gMapFactory.setAddress(location);
    //       gMapFactory.callGMaps().then(function(data){
    //         var petLatitude = data.results[0].geometry.location.lat;
    //         var petLongitude = data.results[0].geometry.location.lng;
    //         var obj = {
    //           latitude: petLatitude,
    //           longitude: petLongitude,
    //           title: petName,
    //           title2: petType,
    //           id: index,
    //           show: false,
    //           onClick: function(){
    //             console.log("Clicked");
    //             obj.show = !obj.show;
    //           }
    //         };
    //         $scope.$watch(function(){
    //           return $scope.map.bounds;
    //         }, function(){
    //           var markers = [];
    //           $scope.petMarkers.push(obj);
    //         }, true);
    //       });
    //     });
    //   };
    //   markerCreator(listOfPets);
    // });
