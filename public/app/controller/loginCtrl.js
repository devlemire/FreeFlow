angular
  .module('app')
  .controller('loginCtrl', function($scope, $location, $auth, ngDialog, loginSrvc) {

    $scope.authenticate = function(provider) {
      ngDialog.close();
      $auth.authenticate(provider).then(function(r) {
        loginSrvc.googleAuth(r.data.user).then(function(r) {
          console.log(r);
          if(r.data.error) {
            $scope.error = "Google account not registered. Register instead.";
            ngDialog.open({ template: './view/authErrorTmpl.html', className: 'ngdialog-theme-default', scope: $scope});
          } else {
            $auth.setToken(r.data.token);
            window.localStorage.setItem('user', JSON.stringify(r.data.user[0]));
            $location.path('/projects');
          }
        });
      });
    };

    $scope.localAuth = function(user) {
      loginSrvc.localAuth(user).then(function(r) {
        if(r.data.error) {
          if(r.data.error == "wrongPassword") {
            $scope.error = "Password is incorrect";
          } else if(r.data.error == "userNotFound") {
            $scope.error = "Account not found";
          }
          ngDialog.open({ template: './view/authErrorTmpl.html', className: 'ngdialog-theme-default', scope: $scope});
        } else {
          ngDialog.close();
          $auth.setToken(r.data.token);
          window.localStorage.setItem('user', JSON.stringify(r.data.user[0]));
          $location.path('/projects');
        }
      });
    };

  });
