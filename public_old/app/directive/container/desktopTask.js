angular
  .module('app')
  .directive('desktopTask', function() {

    return {
      restrict: 'E',
      templateUrl: './view/desktopTaskTmpl.html',
      scope: {
        data: '='
      },
      controller: 'taskCardCtrl'
    };

  });
