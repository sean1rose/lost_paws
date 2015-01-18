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

    geocodeService.markerCreator = function(arrayOfPets, map, contentArray){
      var geocoder = new google.maps.Geocoder();

      var infoWindow = new google.maps.InfoWindow();

      console.log('inside markerCreator service function, we have an array of pets from the db: ', arrayOfPets);

      arrayOfPets.forEach(function(item, index, array){
        var singlePet = item;
        var petName = singlePet.name;
        var petType = singlePet.type;
        var petColor = singlePet.color;
        var petDate = singlePet.dateFound;
        var petFounder = singlePet.foundBy;
        var petContact = singlePet.finderContact;
        var location = singlePet.addressFound;

        var contentString = '<div id="content">'+
          '<div id="siteNotice">'+
          '</div>'+
          '<h1 id="firstHeading" class="firstHeading">' + petName +'</h1>'+
          '<div id="bodyContent">'+
          '<p>' + 'Breed: ' + '<b>' + petType + '</b>' + '</p>'+
          '<p>' + 'Color: ' + '<b>' + petColor + '</b>' + '</p>'+
          '<p>' + 'Found By: ' + '<b>' + petFounder + '</b>' + '</p>'+
          '<p>' + 'Contact: ' + '<b>' + petContact + '</b>' + '</p>'
          '</div>'+
          '</div>';


        geocoder.geocode( { 'address': location}, function(results, status){
          if (status == google.maps.GeocoderStatus.OK){
            console.log('markerCreator service func status is A-OK, see: ', results);
            var regularAddress = results[0].formatted_address;
            var marker = new google.maps.Marker({
              map: map,
              title: petName,
              animation: google.maps.Animation.DROP,
              position: results[0].geometry.location
            });
            console.log('marker: ', marker);

            //infowindow event
            google.maps.event.addListener(marker, 'click', (function(marker, index){
              return function(){
                console.log('inside infowindo event listener!');
                infoWindow.setContent(contentString);
                infoWindow.open(map, marker);
              }
            })(marker, index));
          }
        })
      })
    };

    return geocodeService;

  });
