angular
  .module('app')
  .service('loginSrvc', function($http) {
   
    var connectionString = 'http://taskflow.tech:80/';

    this.localAuth = function(user) {
      return $http({
        method: 'POST',
        url: connectionString + 'auth/local',
        data: user
      });
    };

    this.googleAuth = function(user) {
      return $http({
        method: 'POST',
        url: connectionString + '/login/google',
        data: user
      });
    };
  });
