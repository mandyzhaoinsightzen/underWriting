var myApp =  angular.module("myApp", []);
myApp.controller("myCtrl", function($scope) {
    $scope.userName=sessionStorage.userName;
    $(".core-container").css("display","none");
    var ogd=document.getElementById("imgSearch");
    ogd.onclick= function (){

        var apigClient = apigClientFactory.newClient({
            accessKey: sessionStorage.accessKey,
            secretKey: sessionStorage.secretKey,
        });
        var idCard= $("#core-search-form-input").val().trim();

        apigClient.underwritingGet({"id":idCard}).then(function(result){
            $(".core-container").css("display","block");
            var data=result.data;

            $scope.players = data;

            $scope.name = data.name;
            $scope.age = data.age+"岁,";
            $scope.sex = data.sex;

            var dtValue1=data.seriousill_label;

            if(dtValue1==0){
                dtValue1=0.1;
                $("#riskSeriousId").removeClass("seriousType");
                $("#riskSeriousId").addClass("seriousTypeGreen");
            }else{
                $("#riskSeriousId").removeClass("seriousTypeGreen");
                $("#riskSeriousId").addClass("seriousType");
            }
            var t1Arr=[];
            var t1={name:data.seriousill_pointer_value,value:dtValue1};
            t1Arr.push(t1);
            var id1=document.getElementById("riskChart1");
            myHistoryRiskChartInit(t1Arr,id1);
            $scope.seriousill_Id=data.seriousill_count;

            var dtValue2=data.chronicill_label;
            if(dtValue2==0){
                dtValue2=0.1;
                $("#chronicillSeriousId").removeClass("seriousType");
                $("#chronicillSeriousId").addClass("seriousTypeGreen");
            }else{
                $("#chronicillSeriousId").removeClass("seriousTypeGreen");
                $("#chronicillSeriousId").addClass("seriousType");
            }
            var t2Arr=[];
            var t2={name:data.chronicill_pointer_value,value:dtValue2};
            t2Arr.push(t2);

            var id2=document.getElementById("riskChart2");
            myHistoryRiskChartInit(t2Arr,id2);
            $scope.chronicill_Id=data.chronicill_count;

            var dtValue3=data.abnormal_medical_consumption_count;
            if(dtValue3==0){
                dtValue3=0.1;
                $("#medicalId").removeClass("seriousType");
                $("#medicalId").addClass("seriousTypeGreen");
            }else{
                $("#medicalId").removeClass("seriousTypeGreen");
                $("#medicalId").addClass("seriousType");
            }
            var t3Arr=[];
            var t3={name:data.abnormal_medical_consumption_pointer_value,value:dtValue3};
            t3Arr.push(t3);
            var id3=document.getElementById("riskChart3");
            myHistoryRiskChartInit(t3Arr,id3);
            $scope.abnormal_medical_consumption_Id=data.abnormal_medical_consumption_label;

            var dtValue4=data.abnormal_visiting_behavior_count;
            if(dtValue4==0){
                dtValue4=0.1;
                $("#behavior_Id").removeClass("seriousType");
                $("#behavior_Id").addClass("seriousTypeGreen");
            }else{
                $("#behavior_Id").removeClass("seriousTypeGreen");
                $("#behavior_Id").addClass("seriousType");
            }
            var t4Arr=[];
            var t4={name:data.abnormal_visiting_behavior_pointer_value,value:dtValue4};
            t4Arr.push(t4);
            var id4=document.getElementById("riskChart4");
            myHistoryRiskChartInit(t4Arr,id4);
             $scope.abnormal_visiting_behavior_Id=data.abnormal_visiting_behavior_label;

              $scope.underwriting_proposal=data.underwriting_proposal;

              $scope.recommended_physical_examination=data.recommended_physical_examination;

              $scope.underwriting_conclusions_reference=data.underwriting_conclusions_reference;
            $scope.$apply();//需要手动刷新
        }).catch(function(result){

            /* alert("未查询到匹配的结果");*/
            $('#maskMatchId').css({'display': 'block'});
            center($('#messMatchId'));
            setTimeout(function(){//定时器
                $('#maskMatchId').css("display","none");
                $('#messMatchId').css("display","none");
            }, 1000);
            $(".core-container").css("display","none");
        });
    }
});


function loginOut() {
    window.location.href="login.html";
}

function center(obj) {
    var screenWidth = $(window).width(), screenHeight = $(window).height(); //当前浏览器窗口的 宽高
    var scrolltop = $(document).scrollTop();//获取当前窗口距离页面顶部高度
    var objLeft = (screenWidth - obj.width())/2 ;
    var objTop = (screenHeight - obj.height())/2 + scrolltop;
    obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
    //浏览器窗口大小改变时
    $(window).resize(function() {
        screenWidth = $(window).width();
        screenHeight = $(window).height();
        scrolltop = $(document).scrollTop();
        objLeft = (screenWidth - obj.width())/2 ;
        objTop = (screenHeight - obj.height())/2 + scrolltop;
        obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
    });
    //浏览器有滚动条时的操作、
    $(window).scroll(function() {
        screenWidth = $(window).width();
        screenHeight = $(widow).height();
        screenHeight = $(widow).height();
        scrolltop = $(document).scrollTop();
        objLeft = (screenWidth - obj.width())/2 ;
        objTop = (screenHeight - obj.height())/2 + scrolltop;
        obj.css({left: objLeft + 'px', top: objTop + 'px','display': 'block'});
    });
}

function myHistoryRiskChartInit(indata,id){
    var myChart=echarts.init(id);
    var option={
        tooltip: {
            show: true,
            trigger: 'item',
            formatter: "{a}:{b}",
            position: ['100%', '0%']
        },
        series: [{
            type: "gauge",
            startAngle: 185,
            endAngle: -8,
            clockwise: true,		// 仪表盘刻度是否是顺时针增长,默认 true。
            min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
            max: 4.1,				// 最大的数据值,默认 100 。映射到 maxAngle。
            splitNumber: 5,		// 仪表盘刻度的分割段数,默认 10。
            center: ["50%", "65%"],	// 仪表盘位置(圆心坐标)
            axisLine: {
                show: true,
                lineStyle: {
                    width: 15,
                    color: [

                        [
                            0.2, new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                offset: 0,
                                color: '#57f987'
                            },
                                {
                                    offset: 1,
                                    color: '#6bd471'
                                }
                            ]
                        )
                        ],
                        [
                            0.4, new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                offset: 0,
                                color: '#6bd471'
                            },
                                {
                                    offset: 1,
                                    color: '#6bd471'
                                }
                            ]
                        )
                        ],
                        [
                            0.6, new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                offset: 0,
                                color: '#6bd471'
                            },
                                {
                                    offset: 1,
                                    color: '#eb7742'
                                }
                            ]
                        )
                        ],
                        [
                            0.8, new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                offset: 0,
                                color: '#edb168'
                            },
                                {
                                    offset: 1,
                                    color: '#d0391c'
                                }
                            ]
                        )
                        ],
                        [
                            1, new echarts.graphic.LinearGradient(
                            0, 0, 1, 0, [{
                                offset: 0,
                                color: '#d0391c'
                            },
                                {
                                    offset: 1,
                                    color: '#e41608'
                                }
                            ]
                        )
                        ]
                    ]
                },
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                show: false
            },
            splitLine: {			// 分隔线样式。
                show: true,				// 是否显示分隔线,默认 true。
                length:30,				// 分隔线线长。支持相对半径的百分比,默认 30。
                lineStyle: {			// 分隔线样式。
                    color: "#fff",				//线的颜色,默认 #eee。
                    opacity: 1,					//图形透明度。支持从 0 到 1 的数字，为 0 时不绘制该图形。
                    width: 5,					//线度,默认 2。
                    type: "solid",				//线的类型,默认 solid。 此外还有 dashed,dotted
                    shadowBlur: 10,				//(发光效果)图形阴影的模糊大小。该属性配合 shadowColor,shadowOffsetX, shadowOffsetY 一起设置图形的阴影效果。
                    shadowColor: "#fff",		//阴影颜色。支持的格式同color。
                }
            },
            pointer: {
                width: "15%",
                length: '70%',
            },

            title: {
                show: true,
                offsetCenter: [0, '-130%'],
                // textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                fontSize: 20,
                fontWeight: 'bolder',
                fontStyle: 'italic',
                color: 'auto'

                // }

            },
            detail: {
                show: true
            },
            /*data:[{value:1.5,name:'异常'}]*/
            data:indata

        }]};
    myChart.setOption(option);
}