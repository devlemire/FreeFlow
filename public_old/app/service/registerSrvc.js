angular.module('app').service('registerSrvc', function($http) {
  var connectionString = 'http://localhost:4000/'

  this.localAuth = function(user) {
    return $http({
      method: 'POST',
      url: connectionString + 'api/register/localAuth',
      data: user
    })
  }

  this.googleAuth = function(data) {
    return $http({
      method: 'POST',
      url: connectionString + 'api/register/googleAuth',
      data: data
    })
  }
})
