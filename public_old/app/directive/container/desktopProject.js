angular
  .module('app')
  .directive('desktopProject', function() {

    return {
      restrict: 'E',
      templateUrl: './view/desktopProjectTmpl.html',
      controller: 'projectCardCtrl',
      scope: {
        data: '='
      }
    };

  });
