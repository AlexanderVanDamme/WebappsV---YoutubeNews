describe('controller: NavController', function() {
  var ctrl, authService, $scope;

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope, $controller) {
    authService = {
      isLoggedIn: function() {}
    };

    spyOn(authService, 'isLoggedIn').and.returnValue(true); // <----------- HERE

    $scope = $rootScope.$new();

    ctrl = $controller('NavController', {$scope: $scope , authService: authService });
  }));

  it('Is logged in should be true', function() {
    expect($scope.isLoggedIn).toBe(true);
    });

});


/*
app.service('foo', function() {
  this.fn = function() {
    return "Foo";
  };
});
*/

/*
app.controller('MainCtrl', function($scope, foo) {
  $scope.bar = foo.fn();
});

*/
