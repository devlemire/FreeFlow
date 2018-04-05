angular
  .module('app')
  .controller('projectCardCtrl', function($scope, $rootScope, ngDialog, projectCardSrvc, projectsSrvc) {

    $scope.deleteProjectConfirmation = function(name, project_id, freelancer_id) {
      $scope.name = name;
      $scope.project_id = project_id;
      $scope.freelancer_id = freelancer_id;
      ngDialog.open({ template: './view/confirmationTmpl.html', className: 'ngdialog-theme-default', scope: $scope });
    };

    $scope.deleteProject = function() {
      // console.log('ATTEMPTING TO DELETE', $scope.project_id);
      projectsSrvc.deleteProject($scope.project_id).then(function(r) {
        if(r.data.failed) {
          projectsSrvc.deleteAllTasks($scope.project_id).then(function(r) {
            projectsSrvc.getProjects($scope.freelancer_id).then(function(r) {
              console.log("UPDATED PROJECTS - AFTER DELETE", r.data);
              $rootScope.$broadcast('deleted', {projects: r.data});
              ngDialog.close();
            });
          });
        } else {
          projectsSrvc.getProjects($scope.freelancer_id).then(function(r) {
            console.log("UPDATED PROJECTS - AFTER DELETE", r.data);
            $rootScope.$broadcast('deleted', {projects: r.data});
            ngDialog.close();
          });
        }
      });
    };

    $scope.cancel = function() {
      ngDialog.close();
    };

    $scope.detailedView = function(data) {
      // console.log('Detailed View Trigggerd', data);
      $rootScope.$broadcast('detailedView', data);
    };

  });
