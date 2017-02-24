

angular.module('addProduce.route', ['addProduce.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('tab.addProduce', {
        url: '/addProduce',
        cache: false,
        views: {
          'tab-addProduce': {
            templateUrl: 'areas/addProduce/addProduce.html',
            controller: 'addProduceCtrl'
          }
        }
      })
  });
