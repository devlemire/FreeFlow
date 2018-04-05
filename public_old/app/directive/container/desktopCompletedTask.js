angular
  .module('app')
  .directive('desktopCompletedTask', function() {

    return {
      restrict: 'E',
      templateUrl: './view/desktopCompletedTaskTmpl.html',
      scope: {
        data: '='
      },
      controller: 'completedCtrl'
    };

  });
