angular
  .module('app')
  .service('projectCardSrvc', function($http) {

    this.deleteProject = function(id) {
        return $http({
          method: 'DELETE',
          url: 'http://localhost:3000/api/project/' + id
        });
    };

  });
