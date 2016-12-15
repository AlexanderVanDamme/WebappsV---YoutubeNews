describe('controller: NavController', function() {
  var ctrl, authService, post, postService $scope;

  var comment = {
    "_id": "58456264ac4f1d1e88d9851e",
    "post": "584554206dea4f20685ac4f1",
    "body": "xd",
    "author": {
      "_id": "584554036dea4f20685ac4f0",
      "username": "alisk"
    }

  beforeEach(module('app'));

  beforeEach(inject(function($rootScope, $controller) {
    authService = {
      isLoggedIn: function() {}
    };

    postService = {
      addComment:  function(){},
      currentUserId: function(){}
    };


    spyOn(authService, 'currentUserId').and.returnValue("584554036dea4f20685ac4f0");
    spyOn(postService, 'addComment').and.returnValue(comment);

    $scope = $rootScope.$new();

    ctrl = $controller('PostController', {$scope: $scope , postService :postService, post : post, authService: authService });
  }));

    it('Na het toevoegen van een comment moet de body in de controller leeg zijn en de juiste comment bevatten', function() {
    $scope.body("xd");
    $scope.post.comments= [];
    ctrl.addComment();

    expect($scope.body).toBe("");

    });

    it('Na het toevoegen van een comment moet de body de juiste comment bevatten', function() {
    $scope.body("xd");
    $scope.post.comments= [];
    ctrl.addComment();

    expect($scope.posts.comments[0].body).toBe(comment.body);

    });

      expect($scope.posts.comments[0].body).toBe(comment.body);

    it('Wanneer de huidige user de comment nog niet geliked heeft, moet getUpvoteColor "text-primary" retourneren', function() {

    comment.upvoteHover= true;

    var result = ctrl.getUpvoteColor(comment);

    expect(result).toBe("text-primary");
    });

});
