angular.module('app').service('projectCardSrvc', function($http) {
  var connectionString = 'http://localhost:4000/'

  this.deleteProject = function(id) {
    return $http({
      method: 'DELETE',
      url: connectionString + 'api/project/' + id
    })
  }
})
