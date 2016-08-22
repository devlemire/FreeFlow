angular
  .module('app')
  .directive('homeAnimations', function() {

    return {
      restrict: 'A',
      link: function(scope, ele, attr, ctrl) {
        var $menuBtn = $('#home-menu-nav');
        var $menu = $('#home-menu');
        var $closeMenuBtn = $('#close-home-menu');
        var $homeTitle = $('#home-title');

        $menuBtn.click(function() {
          $menu.css("right", "0px");
        });

        $closeMenuBtn.click(function() {
          $menu.css("right", "-200px");
        });

        $homeTitle.typed({
            strings: ["Welcome to Free Flow ^1000", "Manage multiple projects ^1000", "Keep track of deadlines ^1000", "Stay in touch with clients ^1000"],
            typeSpeed: 0,
            loop: true
        });

        scope.loginAnimation = function() {
            $menu.css("right", "-200px");
        };
      }
    };

  });
