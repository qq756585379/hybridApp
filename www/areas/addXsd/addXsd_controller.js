//添加产品
angular.module('addXsd.controller', ['addXsd.service'])
  .controller('addXsdCtrl', function($scope,$state,addXsdFty,$ionicLoading,$ionicPopup,ionicDatePicker) {

    $scope.$on('$ionicView.beforeEnter',function () {
      console.log("数据还没展示出来之前，调用");
      var userId=JSON.parse($window.localStorage["user"] || '{}').userId;
      var token=JSON.parse($window.localStorage["user"] || '{}').token;
      if(userId==null||token==null){
        console.log("未登录，开始跳转");
        $state.go('login');
        return ;
      }
    });

    //获取后台配置数据
    addXsbFty.xsbData().then(function(response){
      $ionicLoading.show({content: '请稍候...',animation: 'fade-in'});
      if(response.success =='success' ){
        //定义数据实体
        $scope.produce={
          "totalPrice":response.price,
          "deadTime":null,
          "interestRates":response.rate,
          "memo":null,
          "limitTime":new Date()
        };
        $scope.countXsb=response.countXsb;
        $scope.cv=response.cv;
        $ionicLoading.hide();
      }else{
        $ionicLoading.hide();
      }
    });

    $scope.appointment=0;//约为多少钱
    $scope.appointmentChange=function(produce){
      var days = new Date(produce.deadTime).getTime()-new Date().getTime();
      var deadDays=parseInt(days/(1000 * 60 * 60 * 24))+1;
      $scope.appointment=produce.totalPrice*((produce.interestRates/100/360)*deadDays);
    };

    //查询可用额度
    var creditValue=0;
    addXsbFty.getAvailableCreditValue().then(function(response) {
      if(response.success=="success"){
        if(response.data<0){
          creditValue=0;
          $scope.creditValue = 0;
        }else{
          creditValue=response.data;
          $scope.creditValue = response.data;
        }
      }
    });

    //保存产品
    $scope.addXsd=function() {
      var produce = $scope.produce;
      //验证借款金额
      if (produce.totalPrice == null || produce.totalPrice == '') {
        $ionicPopup.alert({title: '系统提示', template: '借款金额不能为空'});
        return;
      }
      //验证借款金额
      var r = /^\+?[1-9][0-9]*$/;
      if (!r.test(produce.totalPrice)) {
        $ionicPopup.alert({title: '系统提示', template: '金额输入错误'});
        return;
      }
      //金额不能大于信用身价
      if (produce.totalPrice > creditValue) {
        $ionicPopup.alert({title: '系统提示', template: '借款金额不能大于可借款额度'});
        return;
      }
      if (produce.totalPrice % 50 != 0) {
        $ionicPopup.alert({title: '系统提示', template: '0'});
        return;
      }
      //借款用途
      if (produce.memo == null || produce.memo == '') {
        $ionicPopup.alert({title: '系统提示', template: '借款用途不能为空'});
        return;
      }
      //还款日期验证
      if (produce.deadTime == null || produce.deadTime == '') {
        $ionicPopup.alert({title: '系统提示', template: '请选择还款日期'});
        return;
      }
      //弹出确认对话框
      $ionicPopup.confirm({
        title: '用户确认',
        cancelText: '取消',
        okText: '确定',
        template: '你确定发布该借款信息吗?'
      }).then(function (res) {
        if (res) {
          $ionicLoading.show({template: '系统处理中...'});
          //确认发布
          addXsbFty.addXsb(produce).then(function (response) {
            if (response.success == "success") {
              $ionicLoading.hide();
              //弹出提示并进行页面跳转
              $ionicPopup.alert({title: '系统提示', template: response.msg}).then(function (res) {
                $state.go('tab.produces');
              });
            } else if (response.success == "nologin") {
              $ionicLoading.hide();
              $state.go('info', {msg: '登录已过期，请重新进入'});
            } else {
              $ionicLoading.hide();
              $ionicPopup.alert({title: '系统提示', template: response.msg});
            }
          });
        }
      });
    };

    //初始化日期控件
    var toDate=new Date();

    var ipObj = {
      callback: function (val) {  //Mandatory
        var date=new Date(val);
        $scope.produce.deadTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        var days = new Date(val).getTime()-new Date().getTime();
        var deadDays=parseInt(days/(1000 * 60 * 60 * 24))+1;
        //计算到期后利息
        var produce=$scope.produce;
        $scope.appointment=produce.totalPrice*((produce.interestRates/100/360)*deadDays);
      },
      from: new Date(toDate.getFullYear(),toDate.getMonth(),toDate.getDate()+3), //Optional
      to: new Date(toDate.getFullYear(),toDate.getMonth(),toDate.getDate()+25), //Optional
      inputDate: new Date(toDate.getFullYear(),toDate.getMonth(),toDate.getDate()+3), //Optional
      showTodayButton:false,
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'modal'       //Optional
    };

    //弹出日期控件
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj);
    };

  });
