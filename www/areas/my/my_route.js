
angular.module('my.route', ['my.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab.my', {
        url: '/my',
        cache: true,
        views: {
          'tab-my': {
            templateUrl: 'areas/my/my.html',
            controller: 'myCtrl'
          }
        }
      })
  });
