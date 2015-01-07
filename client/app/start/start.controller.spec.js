'use strict';

describe('Controller: StartCtrl', function () {

  // load the controller's module
  beforeEach(module('lostPawsApp'));

  var StartCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    StartCtrl = $controller('StartCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
