angular
  .module('app')
  .service('registerSrvc', function($http) {

    this.localAuth = function(user) {
      return $http({
          method: 'POST',
          url: 'http://localhost:3000/api/register/localAuth',
          data: user
      });
    };

    this.googleAuth = function(data) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/api/register/googleAuth',
        data: data
      });
    };

  });
