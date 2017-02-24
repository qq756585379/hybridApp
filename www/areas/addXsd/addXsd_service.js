
var serverZjrAdr="http://192.168.0.158:8080";

angular.module('addXsd.service', [])
  .factory('addXsdFty', function($http, $q) {
    return {
      xsdData:function(){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/xsb/xsbData.htm"
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      countProduceToday:function() {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/countProduceToday.htm"
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getAvailableCreditValue:function() {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getAvailableCreditValue.htm"
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      addProduce:function(produce) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/addProduce.htm",
          params:{"totalPrice":produce.totalPrice,
            "interestRates":produce.interestRates,"memo":produce.memo,"limitTime":produce.limitTime,
            "deadTime":produce.deadTime}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      addXsb:function(produce) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/xsb/addXsb.htm",
          params:{"totalPrice":produce.totalPrice,
            "interestRates":produce.interestRates,"memo":produce.memo,"limitTime":produce.limitTime,
            "deadTime":produce.deadTime}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getProduceById:function(produceId) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getProduceById.htm",
          params:{"produceId":produceId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getMyProduceList:function(page){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getMyProduceList.htm",
          params:{"page":page}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      }
      ,getProduceListByUserId:function(status,page) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getProduceListByUserId.htm",
          params:{"status":status,"page":page}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      savePayBack:function(produceId) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/savePayBack.htm",
          params:{"produceId":produceId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      savePayBackXsb:function(produceId) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/xsb/xsbPayBack.htm",
          params:{"produceId":produceId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //我不借了
      releaseProduce:function(produceId) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/releaseProduce.htm",
          params:{"produceId":produceId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      //根据产品查用户信息数据
      getUserDetailByProduceId:function(produceId) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getUserDetailByProduceId.htm",
          params:{"produceId":produceId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getProduceCountToday:function() {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getProduceCountToday.htm"
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getProduceListByFilter:function(page,filter) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/attention/myAttentionProduce.htm",
          params:{"page":page,"filter":filter}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getProduceListBySortAndFilter:function(page,sort,filter) {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getProduceList.htm",
          params:{"page":page,"filter":filter,"sort":sort}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getCreditInfo:function() {
        var deferred = $q.defer();
        $http({
          method:'post',
          url:serverZjrAdr+"/app/produce/getCreditInfo.htm"
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      },
      getAppLoanCollection:function(companyUserId){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:"http://cuishou.credit-manage.com/getAppLoanCollection.htm",
          params:{"assigneId":companyUserId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  });
