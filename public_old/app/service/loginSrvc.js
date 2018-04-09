angular.module('app').service('loginSrvc', function($http) {
  var connectionString = 'http://localhost:4000/'

  this.login = function(user) {
    return $http({
      method: 'POST',
      url: connectionString + 'auth/login',
      data: user
    })
  }
})
