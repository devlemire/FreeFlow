angular
  .module('app')
  .service('loginSrvc', function($http) {

    this.localAuth = function(user) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/auth/local',
        data: user
      });
    };

    this.googleAuth = function(user) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/login/google',
        data: user
      });
    };
  });
