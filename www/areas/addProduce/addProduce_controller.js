
angular.module('addProduce.controller', ['addXsd.service'])
  .controller('addProduceCtrl', function($scope,addXsdFty) {
    console.log("进入添加产品模块");

    $scope.$on('$ionicView.beforeEnter', function(event, data) {
      console.log("数据还没展示出来之前，调用");
      var userId=JSON.parse($window.localStorage["user"] || '{}').userId;
      var token=JSON.parse($window.localStorage["user"] || '{}').token;
      if(userId==null||token==null){
        console.log("未登录，开始跳转");
        $state.go('login');
        return ;
      }
    });

    //定义数据实体
    $scope.produce={
      "totalPrice":null,
      "deadTime":null,
      "interestRates":null,
      "memo":null,
      "limitTime":null
    };

    //约为多少钱
    $scope.appointment=0;
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
      }else if(response.success=="nologin"){
        $state.go('info',{msg:'登录已过期，请重新进入'});
      }
    });
    $scope.toTip = function(){
      $state.go('tab.addProduceTip');
    };

    //保存产品
    $scope.addProduce=function(){
      var produce=$scope.produce;
      //验证借款金额
      if(produce.totalPrice==null||produce.totalPrice==''){
        $ionicPopup.alert({title:'系统提示',template:'借款金额不能为空'});
        return ;
      }

      //验证借款金额
      var r = /^\+?[1-9][0-9]*$/;
      if(!r.test(produce.totalPrice)){
        $ionicPopup.alert({title:'系统提示',template:'金额输入错误'});
        return ;
      }

      //金额不能大于信用身价
      if(produce.totalPrice>creditValue){
        $ionicPopup.alert({title:'系统提示',template:'借款金额不能大于可借款额度'});
        return ;
      }

      if(produce.totalPrice%100!=0){
        $ionicPopup.alert({title:'系统提示',template:'借款金额只能为100的倍数'});
        return ;
      }

      //验证年利率
      if(produce.interestRates==null||produce.interestRates==''){
        $ionicPopup.alert({title:'系统提示',template:'年利率不能为空'});
        return ;
      }

      //验证年利率
      if(!r.test(produce.interestRates)){
        $ionicPopup.alert({title:'系统提示',template:'年利率输入错误'});
        return ;
      }

      //利率低于150%
      if(produce.interestRates<150){
        $ionicPopup.alert({title:'系统提示',template:'系统经历史数据分析，您当前的设置借款成功率为3%以下，请调整利率为150%以上重试'});
        return ;
      }

      //借款用途
      if(produce.memo==null||produce.memo==''){
        $ionicPopup.alert({title:'系统提示',template:'借款用途不能为空'});
        return ;
      }

      //还款日期验证
      if(produce.deadTime==null||produce.deadTime==''){
        $ionicPopup.alert({title:'系统提示',template:'请选择还款日期'});
        return ;
      }

      //借款发布期验证
      if(produce.limitTime==null||produce.limitTime==''){
        $ionicPopup.alert({title:'系统提示',template:'请选择借款发布期'});
        return ;
      }

      if(new Date(produce.deadTime).getTime()<=new Date(produce.limitTime).getTime()){
        $ionicPopup.alert({title:'系统提示',template:'还款日期必须大于借款发布期'});
        return ;
      }

      //弹出确认对话款
      var confirmPopup = $ionicPopup.confirm({
        title: '用户确认',
        cancelText: '取消',
        okText: '确定',
        template: '你确定发布该借款信息吗?'
      });
      confirmPopup.then(function(res) {
        if(res) {
          var loading =  $ionicLoading.show({
            template: '系统处理中...'
          });
          //确认发布
          ZjrProduceService.addProduce(produce).then(function(response) {
            if(response.success=="success"){
              $ionicLoading.hide();
              //弹出提示并进行页面跳转
              $ionicPopup.alert({title:'系统提示',template:response.msg}).then(function(res){
                $state.go('tab.produces');
              });
            }else if(response.success=="nologin"){
              $ionicLoading.hide();
              $state.go('info',{msg:'登录已过期，请重新进入'});
            }else{
              $ionicLoading.hide();
              //只弹出页面提示
              $ionicPopup.alert({title:'系统提示',template:response.msg});
            }
          });
        }
      });
    };


    var toDate=new Date();

    //初始化日期控件
    var ipObj1 = {
      callback: function (val) {  //Mandatory
        var date=new Date(val);
        $scope.produce.deadTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
        var days = new Date(val).getTime()-new Date().getTime();
        var deadDays=parseInt(days/(1000 * 60 * 60 * 24))+1;

        //计算到期后利息
        var produce=$scope.produce;
        $scope.appointment=produce.totalPrice*((produce.interestRates/100/360)*deadDays);
      },
      from: new Date(), //Optional
      to: new Date(toDate.getFullYear(),toDate.getMonth(),toDate.getDate()+25), //Optional
      inputDate: new Date(),      //Optional
      showTodayButton:false,
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'modal'       //Optional
    };

    var ipObj2 = {
      callback: function (val) {  //Mandatory
        var date=new Date(val);
        $scope.produce.limitTime=date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
      },
      from: new Date(), //Optional
      to: new Date(toDate.getFullYear(),toDate.getMonth(),toDate.getDate()+3), //Optional
      inputDate: new Date(),      //Optional
      showTodayButton:false,
      mondayFirst: true,          //Optional
      closeOnSelect: false,       //Optional
      templateType: 'modal'       //Optional
    };

    //弹出日期控件
    $scope.openDatePicker = function(){
      ionicDatePicker.openDatePicker(ipObj1);
    };
    //弹出日期控件
    $scope.openDatePicker2 = function(){
      ionicDatePicker.openDatePicker(ipObj2);
    };

  });
