//登录页面路由模块
angular.module('login.route', ['login.controller'])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'areas/login/login.html',
        controller: 'loginCtrl'
      })
  });
