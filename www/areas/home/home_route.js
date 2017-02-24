
angular.module('home.route', ['home.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      //自金融
      .state('tab.home', {
        url: '/home',
        cache: true,
        views: {
          'tab-home': {
            templateUrl: 'areas/home/home.html',
            controller: 'HomeCtrl'
          }
        }
      })
  });
