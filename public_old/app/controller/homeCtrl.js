angular
  .module('app')
  .controller('homeCtrl', function($scope, $location, ngDialog, $auth) {

    $scope.login = function() {
      ngDialog.open({ template: './view/loginTmpl.html', className: 'ngdialog-theme-default', controller: 'loginCtrl' });
    };

    $scope.register = function() {
      ngDialog.open({ template: './view/registerTmpl.html', className: 'ngdialog-theme-default', controller: 'registerCtrl' });
    };

    $scope.loggedIn = function() {
      if($auth.getToken()) {
        $location.path('/projects');
      }
    }();
  });
