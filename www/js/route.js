
//路由模块
angular.module(
  'route',
  ['tab.route','login.route','home.route','black.route','addProduce.route',
  'addXsd.route','credit.route','my.route'
  ]).config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/tab/home');
  });
