'use strict';

angular.module('lostPawsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('found', {
        url: '/found',
        templateUrl: 'app/found/found.html',
        controller: 'FoundCtrl',
        authenticate: true
      });
  });