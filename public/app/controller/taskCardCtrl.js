angular
  .module('app')
  .controller('taskCardCtrl', function($scope, $rootScope, taskCardSrvc) {

    $scope.determinePriority = function(priority) {
      console.log(priority);
    };

    $scope.deleteTask = function(data) {
      var newData = {
        id: data.id,
        project_id: data.project_id
      };
      // console.log('ATTEMPTING TO DELETE TASK', data.id, "FROM PROJECT", data.project_id);
      taskCardSrvc.deleteTask(newData).then(function(r) {
        $rootScope.$broadcast('taskDeletion', r.data);
      });
    };

    $scope.addCompleted = function(task) {
      console.log("ADD TO COMPLETED", task);
      $rootScope.$broadcast('addCompleted', task);
    };

  });
