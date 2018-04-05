angular
  .module('app')
  .directive('projectCard', function() {

    return {
      restrict: 'E',
      templateUrl: './view/projectCardTmpl.html',
      controller: 'projectCardCtrl',
      scope: {
        data: '='
      }
    };

  });
