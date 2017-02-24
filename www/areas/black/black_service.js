
var serverAdr="http://192.168.0.184:8080";//本地

//网友曝光主页面Service
angular.module('black.service', [])
  .factory('blackFty', function($http, $q) {
    return {
      getCountInfoByUserId : function(userId){
        var deferred = $q.defer();
        $http({
          method:'post',
          url:"http://192.168.0.105:8888/app/networkCollectRecords.htm",
          params:{"userId":userId}
        }).success(function (response) {
          deferred.resolve(response);
        }).error(function(data) {
          deferred.reject();
        });
        return deferred.promise;
      }
    };
  });
