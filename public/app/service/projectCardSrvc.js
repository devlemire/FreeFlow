angular
  .module('app')
  .service('projectCardSrvc', function($http) {

    var connectionString = 'http://taskflow.tech:80/';

    this.deleteProject = function(id) {
        return $http({
          method: 'DELETE',
          url: connectionString + 'api/project/' + id
        });
    };

  });
