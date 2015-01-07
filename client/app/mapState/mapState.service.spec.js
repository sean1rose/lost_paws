'use strict';

describe('Service: mapState', function () {

  // load the service's module
  beforeEach(module('lostPawsApp'));

  // instantiate service
  var mapState;
  beforeEach(inject(function (_mapState_) {
    mapState = _mapState_;
  }));

  it('should do something', function () {
    expect(!!mapState).toBe(true);
  });

});
