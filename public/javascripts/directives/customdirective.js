app.directive('myIFrame', function(){
  return {
      "template: <iframe width="560" height="315" ng-src={{post.link}} frameborder="0" allowfullscreen></iframe>"
  };
});
