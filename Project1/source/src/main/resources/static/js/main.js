$().ready(function() {
	// alert($(".myTask").html());
	if ($(".totalFinance").html() != undefined) {
		firstPieChart();
	    secondPieChart();
	    firstBarChart();
	}
    datetimepicker();
	getRecipient_ajax();
	getPrincipal_ajax();
	getLog_ajax();
	getUndoLog_ajax();
	if ($(".myTask").html() != undefined) {
		getDoneActiviti_ajax();
		getWaitActiviti_ajax();
		getApplyActiviti_ajax();
	}

    getFinanceDataList_ajax();
    getDataList_ajax($("#inputFirstTime").val());
    // 项目名称
    loadCrmData("/sales/salesProject/listAllDic", "projectId");
    $("#projectId").bind("change",getFinanceDataList_ajax);
});
function datetimepicker() {
	$('#pickFirstTime').datetimepicker({
		format : 'YYYY',
		locale : moment.locale('zh-cn')
	});

    $('#pickFirstTime').on('dp.change',function(){

        //代码块
        var year = $("#inputFirstTime").val();
        getDataList_ajax(year);
    });
    $('#pickSecondTime').datetimepicker({
		format : 'YYYY',
		locale : moment.locale('zh-cn')
	});
    $('#pickSecondTime').on('dp.change',function(){

        //代码块
        getFinanceDataList_ajax();
    });
}
function getRecipient_ajax() {
	var tmpUrl = '/contract/contract/getRecipient_ajax/';
	var Recipient;
	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.recipient;
			Recipient = result[0].recipient;
			$("#Recipient").html(Recipient);
		}

	});
}
function getPrincipal_ajax() {
	var tmpUrl = '/contract/contract/getPrincipal_ajax/';
	var Principal;
	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.principal;
			Principal = result[0].principal;
			$("#Principal").html(Principal);
		}

	});
}
function getLog_ajax() {
	var tmpUrl = '/contract/contract/getLog_ajax/';
	var log;
	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.log;
			log = result[0].log;
			$("#log").html(log);
		}
	});
}
function getUndoLog_ajax() {
	var tmpUrl = '/contract/contract/getUndoLog_ajax/';
	var undoLog;
	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.undoLog;
			undoLog = result[0].undoLog;
			$("#undoLog").html(undoLog);
		}

	});
}
function firstPieChart() {
    var totalCost = $("#totalCost").val();
    var totalNet = $("#totalNet").val();
    // 基于准备好的dom，初始化echarts实例
    var myChartFirstPie = echarts.init(document.getElementById('firstPieChart'));

    var option = {
        title : {
            // text: '总金额、利润占比',
            subtext: '成本、利润占比',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['利润','成本']
        },
        series : [
            {
                name: '成本、利润占比',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:totalNet, name:'利润'},
                    {value:totalCost, name:'成本'}

                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
};
    // 使用刚指定的配置项和数据显示图表。
    myChartFirstPie.setOption(option);
}

function secondPieChart(totalFinCost,totalFinNet) {
    // 基于准备好的dom，初始化echarts实例
    var myChartSecondPie = echarts.init(document.getElementById('secondPieChart'));

        var option = {
            title : {
                // text: '总金额、利润占比',
                subtext: '成本、利润占比',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: ['利润','成本']
            },
            series : [
                {
                    name: '成本、利润占比',
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:totalFinNet, name:'利润'},
                        {value:totalFinCost, name:'成本'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChartSecondPie.setOption(option);
}
function firstBarChart() {
    var janIncome = $("#janIncome").val();
    var febIncome = $("#febIncome").val();
    var marIncome = $("#marIncome").val();
    var aprIncome = $("#aprIncome").val();
    var mayIncome = $("#mayIncome").val();
    var junIncome = $("#junIncome").val();
    var julIncome = $("#julIncome").val();
    var augIncome = $("#augIncome").val();
    var sepIncome = $("#sepIncome").val();
    var octIncome = $("#octIncome").val();
    var novIncome = $("#novIncome").val();
    var decIncome = $("#decIncome").val();

    var janNet = $("#janNet").val();
    var febNet = $("#febNet").val();
    var marNet = $("#marNet").val();
    var aprNet = $("#aprNet").val();
    var mayNet = $("#mayNet").val();
    var junNet = $("#junNet").val();
    var julNet = $("#julNet").val();
    var augNet = $("#augNet").val();
    var sepNet = $("#sepNet").val();
    var octNet = $("#octNet").val();
    var novNet = $("#novNet").val();
    var decNet = $("#decNet").val();
    // 基于准备好的dom，初始化echarts实例
    var myChartFirstBar = echarts.init(document.getElementById('firstBarChart'));
    var option = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['总金额','利润']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'总金额',
                type:'bar',
                data:[janIncome, febIncome, marIncome, aprIncome, mayIncome, junIncome,
                    julIncome, augIncome, sepIncome, octIncome, novIncome, decIncome]
            },
            {
                name:'利润',
                type:'bar',
                stack: '广告',
                data:[janNet, febNet, marNet, aprNet, mayNet, julNet,
                    julNet, augNet, sepNet, octNet, novNet, decNet]
            }

        ]
    };


    // 使用刚指定的配置项和数据显示图表。
    myChartFirstBar.setOption(option);
}
function getDoneActiviti_ajax() {
	var tmpUrl = '/contract/contract/getDoneActiviti_ajax/';
	var travelTaskCount;
	var payoutTaskCount;
	var expensesTravelTaskCount;
	var expensesNormalTaskCount;
	var contractTaskCount;
	var additionalRecordsTaskCount;
	var purchaseTaskCount;
	var approvalAssignmentTaskCount;
	var timeSheetTaskCount;
	var budgetTaskCount;

	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.countList;
			travelTaskCount = result[0];
			payoutTaskCount = result[1];
			expensesTravelTaskCount = result[2];
			expensesNormalTaskCount = result[3];
			contractTaskCount = result[4];
			additionalRecordsTaskCount = result[5];
			purchaseTaskCount = result[6];
			approvalAssignmentTaskCount = result[7];
			timeSheetTaskCount = result[8];
			budgetTaskCount = result[9];
			$("#travelTask").html('(' +travelTaskCount+')');
			$("#payoutTask").html('(' +payoutTaskCount+')');
			$("#expensesTravelTask").html('(' +expensesTravelTaskCount+')');
			$("#expensesNormalTask").html('(' +expensesNormalTaskCount+')');
			$("#contractTask").html('(' +contractTaskCount+')');
			$("#additionalRecordsTask").html('(' +additionalRecordsTaskCount+')');
			$("#purchaseTask").html('(' +purchaseTaskCount+')');
			$("#approvalAssignmentTask").html('(' +approvalAssignmentTaskCount+')');
			$("#timeSheetTask").html('(' +timeSheetTaskCount+')');
			$("#budgetTask").html('(' +budgetTaskCount+')');
		}

	});

}
function getWaitActiviti_ajax() {
	var tmpUrl = '/contract/contract/getWaitActiviti_ajax/';
	var waitTravelTaskCount;
	var waitPayoutTaskCount;
	var waitExpensesTravelTaskCount;
	var waitExpensesNormalTaskCount;
	var waitContractTaskCount;
	var waitAdditionalRecordsTaskCount;
	var waitPurchaseTaskCount;
	var waitApprovalAssignmentTaskCount;
	var waitTimeSheetTaskCount;
	var waitBudgetTaskCount;

	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.countList;
			waitTravelTaskCount = result[0];
			waitPayoutTaskCount = result[1];
			waitExpensesTravelTaskCount = result[2];
			waitExpensesNormalTaskCount = result[3];
			waitContractTaskCount = result[4];
			waitAdditionalRecordsTaskCount = result[5];
			waitPurchaseTaskCount = result[6];
			waitApprovalAssignmentTaskCount = result[7];
			waitTimeSheetTaskCount = result[8];
			waitBudgetTaskCount = result[9];
			$("#waitTravelTask").html('(' +waitTravelTaskCount+')');
			$("#waitPayoutTask").html('(' +waitPayoutTaskCount+')');
			$("#waitExpensesTravelTask").html('(' +waitExpensesTravelTaskCount+')');
			$("#waitExpensesNormalTask").html('(' +waitExpensesNormalTaskCount+')');
			$("#waitContractTask").html('(' +waitContractTaskCount+')');
			$("#waitAdditionalRecordsTask").html('(' +waitAdditionalRecordsTaskCount+')');
			$("#waitPurchaseTask").html('(' +waitPurchaseTaskCount+')');
			$("#waitApprovalAssignmentTask").html('(' +waitApprovalAssignmentTaskCount+')');
			$("#waitTimeSheetTask").html('(' +waitTimeSheetTaskCount+')');
			$("#waitBudgetTask").html('(' +waitBudgetTaskCount+')');
			// alert(payoutTask);
		}

	});

}
function getApplyActiviti_ajax() {
	var tmpUrl = '/contract/contract/getApplyActiviti_ajax/';
	var travelTaskCount;
	var payoutTaskCount;
	var expensesTravelTaskCount;
	var expensesNormalTaskCount;
	var contractTaskCount;
	var additionalRecordsTaskCount;
	var purchaseTaskCount;
	var approvalAssignmentTaskCount;
	var timeSheetTaskCount;
	var budgetTaskCount;

	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.countList;
			travelTaskCount = result[0];
			payoutTaskCount = result[1];
			expensesTravelTaskCount = result[2];
			expensesNormalTaskCount = result[3];
			contractTaskCount = result[4];
			additionalRecordsTaskCount = result[5];
			purchaseTaskCount = result[6];
			approvalAssignmentTaskCount = result[7];
			timeSheetTaskCount = result[8];
			budgetTaskCount = result[9];
			$("#applyTravelTask").html('(' +travelTaskCount+')');
			$("#applyPayoutTask").html('(' +payoutTaskCount+')');
			$("#applyExpensesTravelTask").html('(' +expensesTravelTaskCount+')');
			$("#applyExpensesNormalTask").html('(' +expensesNormalTaskCount+')');
			$("#applyContractTask").html('(' +contractTaskCount+')');
			$("#applyAdditionalRecordsTask").html('(' +additionalRecordsTaskCount+')');
			$("#applyPurchaseTask").html('(' +purchaseTaskCount+')');
			$("#applyApprovalAssignmentTask").html('(' +approvalAssignmentTaskCount+')');
			$("#applyTimeSheetTask").html('(' +timeSheetTaskCount+')');
			$("#applyBudgetTask").html('(' +budgetTaskCount+')');
		}

	});

}
function getDataList_ajax(year){

    var tmpUrl = '/contract/contract/getDataList_ajax/' + year;

	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.getDataList;
            var strHTML="<tr><th>月份</th>" +
                        "<th>1月</th>" +
                        "<th>2月</th>" +
                        "<th>3月</th>" +
                        "<th>4月</th>" +
                        "<th>5月</th>" +
                        "<th>6月</th>" +
                        "<th>7月</th>" +
                        "<th>8月</th>" +
                        "<th>9月</th>" +
                        "<th>10月</th>" +
                        "<th>11月</th>" +
                        "<th>12月</th>" +
                        "<th>合计</th></tr>";

            for (var i = 0; i < result.length; i++) {
                strHTML=strHTML+"<tr><td>"+result[i].name+"</td>"+
                        "<td>"+(result[i].january==null?"":result[i].january)+"</td>"+
                        "<td>"+(result[i].february==null?"":result[i].february)+"</td>"+
                        "<td>"+(result[i].march==null?"":result[i].march)+"</td>"+
                        "<td>"+(result[i].april==null?"":result[i].april)+"</td>"+
                        "<td>"+(result[i].may==null?"":result[i].may)+"</td>"+
                        "<td>"+(result[i].june==null?"":result[i].june)+"</td>"+
                        "<td>"+(result[i].july==null?"":result[i].july)+"</td>"+
                        "<td>"+(result[i].august==null?"":result[i].august)+"</td>"+
                        "<td>"+(result[i].september==null?"":result[i].september)+"</td>"+
                        "<td>"+(result[i].october==null?"":result[i].october)+"</td>"+
                        "<td>"+(result[i].november==null?"":result[i].november)+"</td>"+
                        "<td>"+(result[i].december==null?"":result[i].december)+"</td>"+
                        "<td>"+(result[i].total==null?"":result[i].total)+"</td></tr>";

            }
            $('#totalTable').html(strHTML);


		}
	});
}
function getFinanceDataList_ajax(){
    year = $("#inputSecondTime").val();
    // alert(year);
    var tmpUrl
    if ($("#projectId").val() == "") {
        tmpUrl = '/contract/contract/getFinanceDataList_ajax/' + 0 + '/'+year;
    }else {
        tmpUrl = '/contract/contract/getFinanceDataList_ajax/' + $("#projectId").val()+ '/'+year;
    }

	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.financeDataList;
            var strHTML="<tr><th>月份</th>" +
                        "<th>1月</th>" +
                        "<th>2月</th>" +
                        "<th>3月</th>" +
                        "<th>4月</th>" +
                        "<th>5月</th>" +
                        "<th>6月</th>" +
                        "<th>7月</th>" +
                        "<th>8月</th>" +
                        "<th>9月</th>" +
                        "<th>10月</th>" +
                        "<th>11月</th>" +
                        "<th>12月</th>" +
                        "<th>合计</th></tr>";

            for (var i = 0; i < result.length; i++) {
                strHTML=strHTML+"<tr><td>"+result[i].name+"</td>"+
                        "<td>"+(result[i].january==null?"":result[i].january)+"</td>"+
                        "<td>"+(result[i].february==null?"":result[i].february)+"</td>"+
                        "<td>"+(result[i].march==null?"":result[i].march)+"</td>"+
                        "<td>"+(result[i].april==null?"":result[i].april)+"</td>"+
                        "<td>"+(result[i].may==null?"":result[i].may)+"</td>"+
                        "<td>"+(result[i].june==null?"":result[i].june)+"</td>"+
                        "<td>"+(result[i].july==null?"":result[i].july)+"</td>"+
                        "<td>"+(result[i].august==null?"":result[i].august)+"</td>"+
                        "<td>"+(result[i].september==null?"":result[i].september)+"</td>"+
                        "<td>"+(result[i].october==null?"":result[i].october)+"</td>"+
                        "<td>"+(result[i].november==null?"":result[i].november)+"</td>"+
                        "<td>"+(result[i].december==null?"":result[i].december)+"</td>"+
                        "<td>"+(result[i].total==null?"":result[i].total)+"</td></tr>";

            }
                $('#financeTable').html(strHTML);
                var totalFinCost = (result[2].total==null? 0:Number(result[2].total))+
                                    (result[3].total==null? 0:Number(result[3].total))+
                                    (result[4].total==null? 0:Number(result[4].total))+
                                    (result[5].total==null? 0:Number(result[5].total))+
                                    (result[6].total==null? 0:Number(result[6].total));
                var totalFinNet = result[7].total;
                secondPieChart(totalFinCost,totalFinNet);

		}
	});
}
