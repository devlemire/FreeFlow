angular
  .module('app', ['ui.router', 'ngDialog','720kb.datepicker', 'satellizer'])
  .config(function($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

    $locationProvider.html5Mode(true);

    $authProvider.google({
      clientId: '708213002355-2vr7p6akcv3j2hmq4qobumju1k3mcbud.apps.googleusercontent.com'
    });

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: './view/homeTmpl.html',
        controller: 'homeCtrl',
      })
      .state('projects', {
        url: '/projects',
        templateUrl: './view/projectsTmpl.html',
        controller: 'projectsCtrl'
      });


    $urlRouterProvider.otherwise('/');
  });
