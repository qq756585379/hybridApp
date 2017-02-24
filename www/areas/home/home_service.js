
var serverZjrAdr="http://192.168.0.158:8080";

angular.module('home.service', [])
  .factory('homeFty', function($http, $q) {
    return {
      getProduceList:function(page,sort) {
        var deferred = $q.defer();
        $http.post(serverZjrAdr+"/app/produce/getProduceList.htm",
          {"page":page,"sort":sort}).success(function(data,status,headers,config){
          deferred.resolve(data);
        }).error(function(reason,status,headers,config){
          console.log(reason);
          deferred.reject(reason);
        });
        return deferred.promise;
      },
      //授权操作
      userAuth:function () {
        //定义一个延迟对象,实现延迟加载
        var deferred = $q.defer();
        $http({method:'post',url:serverZjrAdr+"/app/userAuth.htm"})
          .success(function (response) {
            deferred.resolve(response);//resolve方法：让promise的状态为fulfilled,走成功回调方法
          }).error(function(data) {
            deferred.reject();//rejected方法：让promise的状态为failed，走失败回调方法
          });
        return deferred.promise;
      },
      //新增邀请码
      createInviteCode:function(userId){
        var deferred = $q.defer();
        $http({method:'post',url:serverZjrAdr+"/app/createInviteCode.htm",params:{"uid":userId}})
          .success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      isBanDin:function () {
        var deferred = $q.defer();
        $http({method:'post',url:serverZjrAdr+"/app/isBanDin.htm"})
          .success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //提交邀请码
      submitInviteCode:function(inviteCode){
        var deferred = $q.defer();
        $http({method:'post',url:serverZjrAdr+"/app/submitInviteCode.htm",params:{"inviteCode":inviteCode}})
          .success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //查询用户信息
      getUserById:function(){
        var deferred = $q.defer();
        $http({method:'post',url:serverZjrAdr+"/app/getUserById.htm"})
          .success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //实名认证状态
      getMnoAccountStatus:function(){
        var deferred = $q.defer();
        $http({method:'post',url:serverZjrAdr+"/app/getMnoAccountStatus.htm"})
          .success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //查询粉丝
      getFs:function(){
        var deferred = $q.defer();
        $http({method:'post',url:serverZjrAdr+"/app/getFs.htm"})
          .success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //转码
      switchEncoding:function(pass,type){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/switchEncoding.htm",
          params:{"pass":pass,"type":type}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //实名认证
      submitMno:function(dealCode){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:"http://www.credit-manage.com:8058/phone/juhe/saveJuHeMnoZJR.htm",
          params:{"dealCode":dealCode}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //获取统计信息
      getUserCountById:function(){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/getUserCountById.htm"
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //获取资金明细
      getAccountDetailList:function(page){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/getAccountDetailList.htm",
          params:{"page":page}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //用户资料信息
      getUserInfoByUserId:function(customerId){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/getUserInfoByUserId.htm",
          params:{"customerId":customerId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getTxwlAccountByUserId:function(){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/getTxwlAccountByUserId.htm"
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getZJRUserInfoByUserId:function(customerId){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/getZJRUserInfoByUserId.htm",
          params:{"customerId":customerId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getInviteList:function(page){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/getInviteList.htm",
          params:{"page":page}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  });
