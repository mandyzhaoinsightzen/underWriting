
//List Controller
function playerListCtrl($scope, $http) {
    $(".core-container").css("display","none");
    $scope.userName=sessionStorage.userName;
    $("#loginName").text(sessionStorage.userName);
	var ogd=document.getElementById("imgSearch");
	ogd.onclick= function (){

        var apigClient = apigClientFactory.newClient({
            accessKey: sessionStorage.accessKey,
            secretKey: sessionStorage.secretKey,
        });
        var idCard= $("#core-search-form-input").val().trim();

        if(idCard==null||idCard==""){
            alert("请输入查询的ID");
        }else{
            apigClient.underwritingGet({"id":idCard}).then(function(result){
                $(".core-container").css("display","block");
                var data=result.data;

                $scope.name = data.name;
                $scope.age = data.age+"岁,";
                $scope.sex = data.sex;

                $("#nameId").text(data.name);
                $("#ageId").text(data.age+"岁,");
                $("#sexId").text(data.sex);

                var dtValue1=data.chronicill_label;
                if(dtValue1==0){
                    $("#riskSeriousId").addClass("seriousTypeGreen");
                }else{
                    $("#riskSeriousId").addClass("seriousType");
                }
                var t1Arr=[];
                var t1={name:data.chronicill_pointer_value,value:dtValue1};
                t1Arr.push(t1);
                myHistoryRiskChart1(t1Arr);
                $("#seriousill_Id").text(data.seriousill_count);

                var dtValue2=data.seriousill_label;
                if(dtValue2==0){
                    $("#chronicillSeriousId").addClass("seriousTypeGreen");
                }else{
                    $("#chronicillSeriousId").addClass("seriousType");
                }
                var t2Arr=[];
                var t2={name:data.seriousill_pointer_value,value:dtValue2};
                t2Arr.push(t2);
                myHistoryRiskChart2(t2Arr);
                $("#chronicill_Id").text(data.chronicill_count);

                var dtValue3=data.abnormal_medical_consumption_count;
                if(dtValue3==0){
                    $("#medicalId").addClass("seriousTypeGreen");
                }else{
                    $("#medicalId").addClass("seriousType");
                }
                var t3Arr=[];
                var t3={name:data.abnormal_medical_consumption_pointer_value,value:dtValue3};
                t3Arr.push(t3);
                myHistoryRiskChart3(t3Arr);
                $("#abnormal_medical_consumption_Id").text(data.abnormal_medical_consumption_label);


                var dtValue4=data.abnormal_visiting_behavior_count;
                if(dtValue4==0){
                    $("#behavior_Id").addClass("seriousTypeGreen");
                }else{
                    $("#behavior_Id").addClass("seriousType");
                }
                var t4Arr=[];
                var t4={name:data.abnormal_visiting_behavior_pointer_value,value:dtValue4};
                t4Arr.push(t4);
                myHistoryRiskChart4(t1Arr);
                $("#abnormal_visiting_behavior_Id").text(data.abnormal_visiting_behavior_label);


                $("#underwriting_proposal_Id").text(data.underwriting_proposal);
                $(".medical_advice").text(data.recommended_physical_examination);
                $(".medical_result").text(data.underwriting_conclusions_reference);

                /*  $scope.underwriting_proposal=data.underwriting_proposal;

                  $scope.recommended_physical_examination=data.recommended_physical_examination;

                  $scope.underwriting_conclusions_reference=data.underwriting_conclusions_reference;*/

            }).catch(function(result){
                alert("未查询到匹配的结果");
            });
        }


    /*
     var data=JSON.stringify({accessKey: sessionStorage.accessKey, secretKey:sessionStorage.secretKey});
     $.ajax("https://hhwcni46h8.execute-api.cn-northwest-1.amazonaws.com.cn/dev/underwriting", {
            type: "post",
            dataType:'json',
            data:data,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            success: function(data, status, xhr) {


                var url="http://52.82.56.243:18081/api/search?id="+idCard;
                $http({
                    method: 'get',
                    /!*  url:"http://52.82.56.243:18081/api/search?"+JSON.stringify({"id":idCard}),*!/
                    url:url
                }).then(function successCallback(response) {
                    var data=response.data;
                    $scope.name = data.name;
                    $scope.age = data.age+"岁,";
                    $scope.sex = data.sex;

                    var t1Arr=[];
                    var t1={name:data.chronicill_pointer_value,value:data.chronicill_label};
                    t1Arr.push(t1);
                    myHistoryRiskChart1(t1Arr);
                    $("#seriousill_Id").text(data.seriousill_count);

                    var t2Arr=[];
                    var t2={name:data.seriousill_pointer_value,value:data.seriousill_label};
                    t2Arr.push(t2);
                    myHistoryRiskChart2(t2Arr);
                    $("#chronicill_Id").text(data.chronicill_count);

                    var t3Arr=[];
                    var t3={name:data.abnormal_medical_consumption_pointer_value,value:data.abnormal_medical_consumption_count};
                    t3Arr.push(t3);
                    myHistoryRiskChart3(t3Arr);
                    $("#abnormal_medical_consumption_Id").text(data.abnormal_medical_consumption_label);

                    var t4Arr=[];
                    var t4={name:data.abnormal_visiting_behavior_pointer_value,value:data.abnormal_visiting_behavior_count};
                    t4Arr.push(t4);
                    myHistoryRiskChart4(t1Arr);
                    $("#abnormal_visiting_behavior_Id").text(data.abnormal_visiting_behavior_label);

                    $scope.underwriting_proposal=data.underwriting_proposal;

                    $scope.recommended_physical_examination=data.recommended_physical_examination;

                    $scope.underwriting_conclusions_reference=data.underwriting_conclusions_reference;

                    /!* $("#underwriting_proposal_Id").html("<p>"+data.underwriting_proposal+"</p>");

                     $(".medical_advice").html("<p>"+data.recommended_physical_examination+"</p>");

                     $(".medical_result").html("<p>"+data.underwriting_conclusions_reference+"</p>");*!/
                }, function errorCallback(response) {
                    // 请求失败执行代码
                    alert("查询失败")
                });


            },  error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert("你沒有查询的权限");
            },
        });*/



        }

}

function myHistoryRiskChart1(indata){
    var myChart=echarts.init(document.getElementById("riskChart1"));
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
            endAngle: -10,
            clockwise: true,		// 仪表盘刻度是否是顺时针增长,默认 true。
            min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
            max: 4,				// 最大的数据值,默认 100 。映射到 maxAngle。
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
                length: '90%',
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
function myHistoryRiskChart2(indata){
    var myChart=echarts.init(document.getElementById("riskChart2"));
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
            endAngle: -10,
            clockwise: true,		// 仪表盘刻度是否是顺时针增长,默认 true。
            min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
            max: 4,				// 最大的数据值,默认 100 。映射到 maxAngle。
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
                }
            },
            pointer: {
                width: "15%",
                length: '90%',
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

function myHistoryRiskChart3(indata){
    var myChart=echarts.init(document.getElementById("riskChart3"));
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
            endAngle: -10,
            clockwise: true,		// 仪表盘刻度是否是顺时针增长,默认 true。
            min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
            max: 4,				// 最大的数据值,默认 100 。映射到 maxAngle。
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
                length: '90%',
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


function myHistoryRiskChart4(indata){
    var myChart=echarts.init(document.getElementById("riskChart4"));
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
            endAngle: -10,
            clockwise: true,		// 仪表盘刻度是否是顺时针增长,默认 true。
            min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
            max: 4,				// 最大的数据值,默认 100 。映射到 maxAngle。
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
                length: '90%',
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

function myHistoryRiskChartInit(){
    var myChart=echarts.init(document.getElementById("riskChart"));
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
            endAngle: -10,
            clockwise: true,		// 仪表盘刻度是否是顺时针增长,默认 true。
            min: 0,					// 最小的数据值,默认 0 。映射到 minAngle。
            max: 4,				// 最大的数据值,默认 100 。映射到 maxAngle。
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
                length: '90%',
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
