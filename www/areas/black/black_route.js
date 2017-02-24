
//黑名单
angular.module('black.route', ['black.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab.black', {
        url: '/black',
        cache: true,
        views: {
          'tab-black': {
            templateUrl: 'areas/black/black.html',
            controller: 'blackCtrl'
          }
        }
      })
  });
