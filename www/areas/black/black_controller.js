
angular.module('black.controller', ['black.service'])
  .controller('blackCtrl', function($scope,blackFty) {
    console.log("网友曝光主页面controller");
    var userId=null;
    blackFty.getCountInfoByUserId(userId).then(function(response){
      if(response.success=="success"){
        console.log("获取数据成功");
        $scope.networkCollectRecords=response.data;
        console.log($scope.networkCollectRecords);
      }
    })
  });

