angular
  .module('app')
  .directive('taskCard', function() {

    return {
      restrict: 'E',
      templateUrl: './view/taskCardTmpl.html',
      scope: {
        data: '='
      },
      controller: 'taskCardCtrl'
    };
  });
