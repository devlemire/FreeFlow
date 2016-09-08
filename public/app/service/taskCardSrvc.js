angular
  .module('app')
  .service('taskCardSrvc', function($http) {

    var connectionString = 'http://taskflow.tech:80/';

    this.deleteTask = function(data) {
      return $http({
        method: 'DELETE',
        url: connectionString + 'api/task/' + data.id + "/" + data.project_id
      });
    };

  });
