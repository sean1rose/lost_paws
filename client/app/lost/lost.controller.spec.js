'use strict';

describe('Controller: LostCtrl', function () {

  // load the controller's module
  beforeEach(module('lostPawsApp'));

  var LostCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    LostCtrl = $controller('LostCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
