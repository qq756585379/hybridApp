
//路由模块
angular.module('route', ['tab.route','login.route'])
  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/tab');
  });
