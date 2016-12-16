(function() {
  "use strict";

  var app = angular.module("youber-news.controllers.main", [
    "ui.router"
  ]);

  app.config(function($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist([
      // Allow same origin resource loads.
      'self',
      // Allow loading from our assets domain.  Notice the difference between * and **.
      'https://www.youtube.com/**'
    ]);
  });


  app.directive('mijnFilmpje', function() {
    return {
      restrict: 'AE',
      replace: 'true',
      template: '<div class="flex-video widescreen"><iframe width=100% height=auto ng-src="{{post.link}}" frameborder="0" allowfullscreen></iframe></div>'
    };
  });


  app.directive('confirm', [function () {
    return {
      priority: 100,
      restrict: 'A',
      link: {
        pre: function (scope, element, attrs) {
          var msg = attrs.confirm || "Are you sure?";

          element.bind('click', function (event) {
            if (!confirm(msg)) {
              event.stopImmediatePropagation();
              event.preventDefault;
            }
          });
        }
      }
    };
  }]);

  app.config([
    "$stateProvider",
    function($stateProvider) {
      $stateProvider.state("home", {
        parent: "root",
        url: "/home",
        views: {
          "container@": {
            templateUrl: "partials/home",
            controller: "MainController"
          }
        },
        resolve: {
          getPostsPromise: [
            "postService",
            function(postService) {
              return postService.getAll();
            }
          ]
        }
      });
    }
  ]);

  app.controller("MainController", [
    "$scope",
    "postService",
    "authService",
    function($scope, postService, authService) {
      $scope.isLoggedIn = authService.isLoggedIn;

      $scope.posts = postService.posts;

      $scope.shouldShowAddNewPostForm = false;

      function addPost() {
        if (!$scope.title || $scope.title === "") {
          return;
        }

        var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = $scope.link.match(regExp);
        if (match && match[2].length == 11) {
          $scope.link= "https://www.youtube.com/embed/" + match[2];
        } else {
          return;
          Console.console.log("slechte youtube url");
        }

        postService.create({
          title: $scope.title,
          link: $scope.link,
          author: authService.currentUserId()
        });

        $scope.title = "";
        $scope.link = "";
        $scope.shouldShowAddNewPostForm = false;
      }

      function deletePost(post) {

        postService.deletePost(post);
      }

      function incrementUpvotes(post) {
        postService.upvote(post);
      }

      function incrementDownvotes(post) {
        postService.downvote(post);
      }

      function getUpvoteColor(post) {
        if (post.upvoteHover || isUpvotedByCurrentUser(post)) {
          return "text-primary";
        } else {
          return "text-muted";
        }
      }

      function getDownvoteColor(post) {
        if (post.downvoteHover || isDownvotedByCurrentUser(post)) {
          return "text-danger";
        } else {
          return "text-muted";
        }
      }

      function isUpvotedByCurrentUser(post) {
        return post.usersWhoUpvoted.indexOf(authService.currentUserId()) != -1;
      }

      function isDownvotedByCurrentUser(post) {
        return post.usersWhoDownvoted.indexOf(authService.currentUserId()) != -1;
      }

      function showAddNewPostForm() {
        $scope.shouldShowAddNewPostForm = true;
      }

      function hideAddNewPostForm() {
        $scope.shouldShowAddNewPostForm = false;
        $scope.title = "";
        $scope.link = "";
      }

      function showDeletePost(post) {
        return post.author._id == authService.currentUserId();
      }

      $scope.addPost = addPost;
      $scope.deletePost = deletePost;
      $scope.incrementUpvotes = incrementUpvotes;
      $scope.incrementDownvotes = incrementDownvotes;
      $scope.getUpvoteColor = getUpvoteColor;
      $scope.getDownvoteColor = getDownvoteColor;
      $scope.showAddNewPostForm = showAddNewPostForm;
      $scope.hideAddNewPostForm = hideAddNewPostForm;
      $scope.showDeletePost = showDeletePost
    }
  ]);
})();
