'use strict';

describe('Controller: FoundCtrl', function () {

  // load the controller's module
  beforeEach(module('lostPawsApp'));

  var FoundCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FoundCtrl = $controller('FoundCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
