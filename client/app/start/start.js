'use strict';

angular.module('lostPawsApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('start', {
        url: '/start',
        templateUrl: 'app/start/start.html',
        controller: 'StartCtrl'
      });
  });