angular
  .module('app')
  .controller('completedCtrl', function($scope, $rootScope) {

    $scope.delete = function(task) {
      // console.log("DELETE TRIGGERD", data);
      $rootScope.$broadcast('completeDelete', task);
    };

  });
