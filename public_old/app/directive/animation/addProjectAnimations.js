angular
  .module('app')
  .directive('addProjectAnimations', function() {

    return {
      restrict: 'A',
      link: function(scope, ele, attr) {
        var $datepicker = $('#datepicker');

        $datepicker.datepicker();
      }
    };

  });
