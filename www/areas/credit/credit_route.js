
//黑名单
angular.module('credit.route', ['credit.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab.credit', {
        url: '/credit',
        cache: true,
        views: {
          'tab-credit': {
            templateUrl: 'areas/credit/credit.html',
            controller: 'creditCtrl'
          }
        }
      })
  });
