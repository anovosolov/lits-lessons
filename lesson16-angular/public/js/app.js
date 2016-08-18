// Define the `commentSystemApp` module
var commentSystemApp = angular.module('commentSystemApp', []);

// Define the `commentListController` controller on the `commentSystemApp` module
commentSystemApp.controller('CommentListController', ["$scope", "$http", function CommentListController($scope, $http) {
  $scope.comment = {
    name: "",
    email: "",
    message: ""
  };

  $scope.comments = [];
  getAllComments();

  function getAllComments(){
    $http
      .get('/comments')
      .success(function(data) {
        $scope.comments = data;
      });
  }

  $scope.addComment = function(){
    if ($scope.commentForm.$invalid) {
      $scope.commentForm.$setSubmitted();
      return;
    }

    $scope.comment.createdDate = new Date();

    $http
      .post('/comments', JSON.stringify($scope.comment))
      .success(function(data) {
        $scope.comments.push(data);
      });

  };

}]);
