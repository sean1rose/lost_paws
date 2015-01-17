'use strict';

angular.module('lostPawsApp')
  .factory('gMapFactory', function ($http, $q) {
    // Service logic

    var geocodeService = {};

    geocodeService.displayMap = function(standardAddress, map){
      var geocoder = new google.maps.Geocoder();
      geocoder.geocode( {'address': standardAddress}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
          console.log('results are ', results);
          map.setCenter(results[0].geometry.location);
        } else {
          console.log('displayMap service func did not work cuz ', status);
        }
      })
    };

    geocodeService.parsePetSearch = function(location, map){
      var geocoder = new google.maps.Geocoder();
      // parsing in order to retrieve formatted address for input to displayMap...
      geocoder.geocode( {'address': location}, function(results, status){
        if (status == google.maps.GeocoderStatus.OK){
          console.log('in the parsePetSearch geocoder');
          var coordObj = results[0].geometry.location;
          var lati = coordObj.D;
          var longi = coordObj.k;
          var regAddress = results[0].formatted_address;
          console.log('address is ', regAddress);
          // call displayMap w/ formatted address
          geocodeService.displayMap(regAddress, map);
        } else {
          console.log('parsePetSearch failed! cuz ', status);
        }
      })
    };

    geocodeService.markerCreator = function(arrayOfPets, map){
      var geocoder = new google.maps.Geocoder();
      console.log('inside markerCreator service function, we have an array of pets from the db: ', arrayOfPets);
      arrayOfPets.forEach(function(item, index, array){
        var singlePet = item;
        var petName = singlePet.name;
        var petType = singlePet.type;
        var petDate = singlePet.dateFound;
        var location = singlePet.addressFound;
        geocoder.geocode( { 'address': location}, function(results, status){
          if (status == google.maps.GeocoderStatus.OK){
            console.log('markerCreator service func status is A-OK, see: ', results);
            var regularAddress = results[0].formatted_address;
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location
            });
            console.log('marker: ', marker);
          }
        })
      })
    };

    return geocodeService;

  });
