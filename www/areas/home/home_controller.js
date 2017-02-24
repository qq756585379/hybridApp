
angular.module('home.controller', ['home.service'])
  .controller('HomeCtrl', function($scope,$window,$state,$ionicPopup,homeFty) {
    console.log("调用自金融查询功能");

    //用户等级说明
    $scope.showMe = function(){
      var html = "<div>【<font style='font-weight:bold;'>用户等级说明</font>】</div>"
        + "<div>Lv是平台用户等级标识,等级不同最高可借额度不同,等级提升规则到“投借学院-帮助”中查看,等级提升到“APP-我的-增值服务-购买升级卡”完成.</div>"
        + "<div>【<font style='font-weight:bold;'>粉丝说明</font>】</div>"
        + "<div>1.借款人还款后,出借人可关注还款人成为其粉丝,粉丝可提高借款成功率.</div>" +
        + "<div> 2.借款人获得一个粉丝，信用身价+10，失去一个粉丝，信用身价-10</div> " +
        + "<div>3.借款人逾期,逾期5天后,系统自动清空所有粉丝.</div>"
        + "<div>【<font style='font-weight:bold;'>皇冠说明</font>】</div>"
        + "<div>提前王：借款人连续15次以上提前还款.</div>" +
        + "<div> 守时王：借款人连续15次以上按时还款(含提前还款).</div>"
        + "<div> 借款人逾期,提前王和守时王标记消失,从零开始记录重新封王. 数据每日凌晨统计刷新.</div>"
        + "<div style='margin-top:10px;'>信用,才是您最高贵的财富!</div>";
      $ionicPopup.alert({title:'用户等级说明',template:html});
    };

    //检测是否绑定邀请码，如果没有绑定提示用户去绑定邀请码
    var tipPopup;
    //用于记录用户是否点击了下次不在提示
    var checkBoxIndex = $window.localStorage.getItem("checkBoxIndex");

    if(checkBoxIndex != true && checkBoxIndex !='true' && name!=null && name!="" && name!="-1"){
      //是否已绑定    通过then方法触发状态监听
      homeFty.isBanDin().then(function(response){
        if(response.data<=0){
          $window.localStorage.setItem("checkBoxIndex",false);
          $scope.check = false;
          tipPopup = $ionicPopup.show({
            title: '',
            template:'<img ng-click="closeTip()" style="position:absolute;right:12%;top:38%;width:6%;height:4%;z-Index:99999; border:none" src="../img/inviteCode/icon_cc.png" />'
            +'<img src="../img/inviteCode/tup.png" style="width:100%;height:100%" border: 0;/>'
            +'<div style="position:absolute;left:24%;top:48%;color:#fff832;">您 尚 未 绑 定 邀 请 码</div>'
            +'<div style="position:absolute;left:20%;top:58%;color:white;">绑定邀请码 +50  信用身价</div>'
            +'<input style="line-height:13px;position:absolute;left:28%;top:70%;width:5%;height:5%;" type="checkbox" ng-model="check" ng-click="changeCheck()"/>'
            +'<span style="position:absolute;left:33%;top:70%;font-size:13px;color:white;">&nbsp;&nbsp;下次不再提示</span>'
            +'<button style="position:absolute;left:20%;top:80%;width:60%;height:10%;background:#fff832;color:black;border:none;font-weight:bold;" ng-click="toUser()">去绑定</button>',
            scope: $scope,
            cssClass: 'tipCss'
          });
        }else{
          $window.localStorage.setItem("checkBoxIndex",true);
        }
      })
    }

    //关闭绑定邀请码提示框
    $scope.closeTip = function(){
      $window.localStorage.setItem("checkBoxIndex",$scope.check);
      tipPopup.close();
    };

    //触发选择框事件
    $scope.changeCheck = function($event){
      if($scope.check==false||$scope.check=='false'){
        $scope.check=true;
      }else if($scope.check==true||$scope.check=='true'){
        $scope.check=false;
      }
    };

    //跳转到绑定邀请码界面
    $scope.toUser = function(){
      $window.localStorage.setItem("checkBoxIndex",$scope.check);
      tipPopup.close();
      //这里需要更改
      //$state.go("tab.user",{},{reload:true});
    };

    var sort=5; //首次排序处理
    $scope.produces=[];
    var page=0; //初始化page为0
    $scope.noMore=true; //开启加载更多
    $scope.isDuan=0;  //短贷为0，长贷为1
    //查询短贷数据
    $scope.loadProduces=function(){
      console.log('加载数据');
      var promise = homeFty.getProduceList(page,sort);
      promise.then(
        function (response) {
          if(response.data!=null){
            if(response.data.length<=0){
              $scope.noMore=false;
              if(page==0){
                $scope.noData=true;
              }
            }else{
              for(var i=0;i<response.data.length;i++){
                $scope.produces.push(response.data[i]);
              }
              page=page+1;
            }
          }else if(response.success=="nologin"){
            $state.go('info',{msg:'登录已过期，请重新进入'});
          }
        },
        function(reason){

        }
      ).finally(function () {
        // 停止广播ion-refresher
        $scope.$broadcast('scroll.refreshComplete');
        $scope.$broadcast('scroll.infiniteScrollComplete');
      })
    }

  });

