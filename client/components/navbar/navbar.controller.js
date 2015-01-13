'use strict';

angular.module('lostPawsApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth, $http, socket, gMapFactory) {
    $scope.menu = [
    {
      'title': 'Lost',
      'link': '/lost'
    },
    {
      'title': 'Found',
      'link': '/found'
    }];

    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });