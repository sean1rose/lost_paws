'use strict';

describe('Service: gMapFactory', function () {

  // load the service's module
  beforeEach(module('lostPawsApp'));

  // instantiate service
  var gMapFactory;
  beforeEach(inject(function (_gMapFactory_) {
    gMapFactory = _gMapFactory_;
  }));

  it('should do something', function () {
    expect(!!gMapFactory).toBe(true);
  });

});
