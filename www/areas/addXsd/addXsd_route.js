

angular.module('addXsd.route', ['addXsd.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab.addXsd', {
        url: '/addXsd',
        cache: false,
        views: {
          'tab-addXsd': {
            templateUrl: 'areas/addXsd/addXsd.html',
            controller: 'addXsdCtrl'
          }
        }
      })
  });
