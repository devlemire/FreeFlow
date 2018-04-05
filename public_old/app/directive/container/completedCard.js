angular
  .module('app')
  .directive('completedCard', function() {

    return {
      restrict: 'E',
      templateUrl: './view/completedCardTmpl.html',
      scope: {
        data: '='
      },
      controller: 'completedCtrl'
    };

  });
