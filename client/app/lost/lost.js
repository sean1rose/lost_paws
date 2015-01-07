'use strict';

angular.module('lostPawsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('lost', {
        url: '/lost',
        templateUrl: 'app/lost/lost.html',
        controller: 'LostCtrl'
      });
  });