angular
  .module('app')
  .controller('registerCtrl', function($scope, registerSrvc, ngDialog, $location, $auth) {

    $scope.localAuth = function(user) {
      if(user.type == 'freelancer') {
        user.freelancer = true;
        user.client = false;
      } else if(user.type == 'client') {
        user.client = true;
        user.freelancer = false;
      }
      // console.log("REGISTER TRIGGERED", user);
      registerSrvc.localAuth(user).then(function(r) {
        if(r.data.error) {
          if(r.data.error == 'passwordMatch') {
            $scope.error = "Passwords do not match.";
          } else if(r.data.error == "userTaken") {
            $scope.error = "Username is taken.";
          } else if(r.data.error == "emailTaken") {
            $auth.authenticate('google').then(function(r) {
              console.log(r);
            });
            $scope.error = "Email is taken.";
          }
          ngDialog.open({ template: './view/authErrorTmpl.html', className: 'ngdialog-theme-default', scope: $scope});
        } else {
          //Registration was successful
          console.log("REGISTRATION SUCCESSFUL");
          $auth.setToken(r.data.token);
          window.localStorage.setItem('user', JSON.stringify(r.data.user[0]));
          ngDialog.close();
          $location.path('/projects');
        }
      });
    };

    $scope.googleAuth = function(type) {
      // console.log("CHOSEN ACCOUNT TYPE", type);
      $auth.authenticate('google').then(function(r) {
        var data = {};
        if(type === 'freelancer') {
          data.freelancer = true;
          data.client = false;
        } else {
          data.client = true;
          data.freelancer = false;
        }
        data.user = r.data.user;

        localStorage.clear();

        registerSrvc.googleAuth(data).then(function(r) {
          if(r.data.error) {
            $scope.error = "Google account already registered. Sign-in instead.";
            ngDialog.open({ template: './view/authErrorTmpl.html', className: 'ngdialog-theme-default', scope: $scope});
          } else {
            console.log('REGISTRATION WITH GOOGLE SUCCESSFUL', r);
            $auth.setToken(r.data.token);
            window.localStorage.setItem('user', JSON.stringify(r.data.user[0]));
            ngDialog.close();
            $location.path('/projects');
          }
        });

        // if(r.data.error) {
        //
        // } else {
        //   //Registration was successful
        //   $auth.setToken(r.data.token);
        //   window.localStorage.setItem('user', JSON.stringify(r.data.user[0]));
        //   ngDialog.close();
        //   $location.path('/projects');
        // }
      });
    };

    $scope.googleRegister = function() {
      ngDialog.close();
      ngDialog.open({ template: './view/accountTypeTmpl.html', className: 'ngdialog-theme-default', controller: 'registerCtrl'});
    };

  });
