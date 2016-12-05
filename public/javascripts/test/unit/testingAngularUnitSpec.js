describe('Testing AngularJS Test Suite', function(){

  beforeEach(module('testingAngularApp'));

  describe('Testing AngularJS Controller',function(){
    var scope ,ctrl;

    beforeEach(inject(function($controller, $rootScope){
      scope = $rootScope.$new();
      ctrl = $controller('testingAngularCtrl', {$scope:scope});
    }));

      afterEach(function(){
        //cleanup code
      });

    it('should initialize the title of the scope', function(){
      expect(scope.title).toBeDefined();
      expect(scope.title).toBe("Youber news");
    });

    it('should add 2 destinations to the destinations list', function(){
      expect(scope.destinations).toBeDefined();
      expect(scope.destinations.length).toBe(0);

      scope.newDestination = {
        city: "London",
        country: "England"
      };

      scope.addDestination();

      expect(scope.destinations.length).toBe(1);
      expect(scope.destinations[0].city).toBe("London");
      expect(scope.destinations[0].country).toBe("England");

      scope.newDestination = {
        city: "Dortmund",
        country: "Germany"
      };

      scope.addDestination();

      expect(scope.destinations.length).toBe(2);
      expect(scope.destinations[0].city).toBe("London");
      expect(scope.destinations[0].country).toBe("England");
      expect(scope.destinations[1].city).toBe("Dortmund");
      expect(scope.destinations[0].country).toBe("Germany");



    });

  });
});
