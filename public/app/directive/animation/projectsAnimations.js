angular
  .module('app')
  .directive('projectsAnimations', function() {

    return {
      restrict: 'A',
      link: function(scope, ele, attr) {
        var $info = $('#first-time-user-info');
        // var $projectCard = $('.project-card-animation');

        // $info.typed({
        //     strings: ["Welcome.^1000", "Thanks for choosing Free Flow!^1000", "You currently do not have any projects.^1000", "To get started click the plus icon at the bottom.^1000"],
        //     typeSpeed: 0,
        //     loop: true,
        //     showCursor: false
        // });

        // $projectCard.hover(function(e) {
        //   $(this).toggleClass('animated pulse infinite');
        // });
      }
    };

  });
