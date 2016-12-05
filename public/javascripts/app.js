(function() {
  "use strict";

  var app = angular.module("youber-news", [
    "youber-news.controllers.main",
    "youber-news.controllers.post",
    "youber-news.controllers.auth",
    "youber-news.controllers.nav",
    "youber-news.services.post",
    "youber-news.services.auth",
    "ui.router"
  ]);

  app.config([
    "$stateProvider",
    "$urlRouterProvider",
    function($stateProvider, $urlRouterProvider) {
      $stateProvider.state("root", {
        abstract: true,
        views: {
          "header": {
            templateUrl: "partials/header",
            controller: "NavController"
          }
        }
      });

      $urlRouterProvider.otherwise("home");
    }
  ]);
})();
