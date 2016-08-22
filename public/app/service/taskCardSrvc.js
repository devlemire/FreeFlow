angular
  .module('app')
  .service('taskCardSrvc', function($http) {

    this.deleteTask = function(data) {
      return $http({
        method: 'DELETE',
        url: 'http://localhost:3000/api/task/' + data.id + "/" + data.project_id
      });
    };

  });
