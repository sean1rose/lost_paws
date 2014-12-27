'use strict';

angular.module('lostPawsApp')
  .factory('gMapFactory', function ($http, $q) {
    // Service logic

    var geocodeService = {};
    var baseUrl = 'http://maps.google.com/maps/api/geocode/json?address=';
    var _address = '';
    var _finalUrl = '';

    // _address = singlePet.addressFound
    var makeUrl = function(){
      console.log('in makeUrl');
      _address = _address.split(' ').join('+');
      _finalUrl = baseUrl + _address + '&sensor=false';
      return _finalUrl;
    };

    // going to pass in singlePet.addressFound
    geocodeService.setAddress = function(address){
      _address = address;
    }

    geocodeService.getAddress = function(){
      return _address;
    }

    geocodeService.callGMaps = function(){
      console.log('in service + callGMaps');
      makeUrl();
      var deferred = $q.defer();
      $http.get(_finalUrl).success(function(data){
        console.log('data is ', data);
        deferred.resolve(data);
      }).error(function(){
        deferred.reject('Error occurred!');
      })
      return deferred.promise;
    }

    // Public API here
    return geocodeService;
    // return {
    //   someMethod: function () {
    //     return geocodeService;
    //   }
    // };
  });
