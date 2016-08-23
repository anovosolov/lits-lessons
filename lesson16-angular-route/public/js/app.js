// Define the `commentSystemApp` module
var commentSystemApp = angular.module('commentSystemApp', ["ngAnimate"]);

// Define the `commentListController` controller on the `commentSystemApp` module
commentSystemApp.controller('CommentListController', ["$scope", "$http", function CommentListController($scope, $http) {
  $scope.comment = {
    name: "Khrystyna",
    email: "example@example.com",
    message: "HTML enhanced for web apps!"
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

  function showError(){
    alert("Sorry! An error ocuured!");
  }

  $scope.addComment = function(){
    if ($scope.commentForm.$invalid) {
      $scope.commentForm.$setSubmitted();
      return;
    }

    if ($scope.comment.id){
      $http
        .put('/comments/' + $scope.comment.id, JSON.stringify($scope.comment))
        .success(function(data) {
          $scope.comments.forEach(function(elem, index){
            if (elem.id == $scope.comment.id){
              $scope.comments[index].name = $scope.comment.name;
              $scope.comments[index].email = $scope.comment.email;
              $scope.comments[index].message = $scope.comment.message;
            }
          });

          // clear form
          $scope.comment = {};
          $scope.commentForm.$setPristine();
          $scope.commentForm.$setUntouched();
        })
        .error(showError);
    }
    else {
      $scope.comment.createdDate = new Date();
      $http
        .post('/comments', JSON.stringify($scope.comment))
        .success(function(data) {
          $scope.comments.push(data);

          // clear form
          $scope.comment = {};
          $scope.commentForm.$setPristine();
          $scope.commentForm.$setUntouched();
        })
        .error(showError);
    }
  };

  $scope.remove = function(comment){
    $http
      .delete("/comments/" + comment.id)
      .success(function() {
        $scope.comments = $scope.comments.filter(function(elem){
          return elem.id !== comment.id;
        });
      })
      .error(showError);
  };

  $scope.edit = function(comment){
    $scope.comment = {
      name: comment.name,
      email: comment.email,
      message: comment.message,
      id: comment.id
    };


  };

}]);
