angular
  .module('app')
  .directive('priorityStatus', function() {

    return {
      restrict: 'A',
      scope: {
        data: '='
      },
      link: function(scope, ele, attr) {
        if(scope.data === 'High') {
          scope.color = 'red';
        } else if(scope.data === 'Medium') {
          scope.color = '#ffd114';
        } else if(scope.data === 'Low') {
          scope.color = 'green';
        }
        ele.css('background', scope.color);
      }
    };

  });
