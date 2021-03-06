var address = null;
var prefix = "/budget/budget";
$().ready(function() {
	loadDic("budget_Responsible_Center","responsibleCenter");
	loadDic("project_project_gategory","projectGategory");
	loadDic("budget_project_gategory","budgetType");
	loadCrmData("/system/sysDept/listDic","deptId");
	//loadCrmData("/inner/innerOrgEmployee/listDic","projectSupervisor");
	loadCrmData("/inner/innerOrgEmployee/listDic","projectOwner");
	// loadCrmData("/project/project/listDic","projectId");
	loadCrmData("/sales/companyCustomer/listDic","customerId");
	loadCrmData("/sales/business/listDic","businessId");
	loadCrmData("/contract/contract/listDic","contractId");
	$('#myTab a[href="#budgetInfo"]').on('shown.bs.tab', function(e){
		 $('#lastBtn').attr("disabled",true);
		 $('#nextBtn').attr("disabled",false);
		 //getType();
		 setTotal();
		 setType();
	 });
	 $('#myTab a[href="#labor"]').on('shown.bs.tab', function(e){
		 $('#lastBtn').attr("disabled",false);
		 $('#nextBtn').attr("disabled",false);
		 loadLabor();
	 });
	 $('#myTab a[href="#expenses"]').on('shown.bs.tab', function(e){
		 $('#lastBtn').attr("disabled",false);
		 $('#nextBtn').attr("disabled",false);
		 loadExpenses();
	 });
	 $('#myTab a[href="#budgetPurchase"]').on('shown.bs.tab', function(e){
		 $('#lastBtn').attr("disabled",false);
		 $('#nextBtn').attr("disabled",false);
		 loadPurchase();
	 });
	validateRule();
	var address = new addressResolve({
	    proId: 'province',
	    cityId: 'city',
	    areaId: 'area',
		projectId:'projectId'
	});
	address.init();

	//获取项目描述,项目主管，项目类别，客户名称,业务名称
	$("#projectId").bind("change", getProjectId);
	//获取服务收入（合同额）
	$("#projectId").bind("change", getBudgetServiceRevenue);
	//获取项目计划利润率
	//$("#projectGategory").bind("change", getType);
	// listProjectByArea_ajax();

});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
// function listProjectByArea_ajax(){
//
// 	$.ajax({
// 		url : '/budget/budget/listProjectByArea_ajax/',
// 		type : "get",
// 		data : {
// 			'province' : $("#province").val(),
// 			'city' : $("#city").val(),
// 			'area' : $("#area").val(),
// 		},
// 		success : function(data) {
// 			var result = data.projectByArea;
// 			for (var i = 0; i < result.length; i++) {
// 				if($("#province").val() != null){
// 					$("#option").chosen("destroy");
// 				    $("#option").empty();
// 					$("#projectId").append("<option id='" + "option" + "'>" + result[i].idname + "</option>");
// 				}
// 				if($("#city").val() != null){
// 					$("#option").chosen("destroy");
// 				    $("#option").empty();
// 					$("#projectId").append("<option id='" + "option" + "'>" + result[i].idname + "</option>");
// 				}
// 			}
// 		}
// 	});
// }
function getProjectId(){
	$.ajax({
		url : '/budget/budget/getProjectId/' + $("#projectId").val(),
		type : "get",
		data : {
			'projectId' : $("#projectId").val()
		},
		success : function(data) {
			var result = data.project;
			//alert(result.projectGategory);
			$("textarea[name='projectDescription']").val(result.projectDescription);
			$("select[name='projectOwner']").val(result.projectOwner);
			$("select[name='projectOwner']").trigger("chosen:updated");
			$("select[name='projectGategory']").val(result.projectGategory);
			$("select[name='projectGategory']").trigger("chosen:updated");
			$("select[name='customerId']").val(result.customerId);
			$("select[name='customerId']").trigger("chosen:updated");
			$("select[name='businessId']").val(result.businessId);
			$("select[name='businessId']").trigger("chosen:updated");
		}
	});
}

function getBudgetServiceRevenue(){
	$.ajax({
		url : '/budget/budget/getBudgetServiceRevenue/' + $("#projectId").val(),
		type : "get",
		data : {
			'projectId' : $("#projectId").val()
		},
		success : function(data) {
			var result = data.project;
			$("input[name='budgetServiceRevenue']").val(result.budgetServiceRevenue);
		}
	});
}

function setTotal(){
	$.ajax({
		url : '/budget/budget/getTotal/' + $("#relsultBudgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#relsultBudgetId").val()
		},
		success : function(data) {
			var result = data.budget;
			$("input[name='budgetLaborCost']").val(result.budgetLaborCost);
			$("input[name='budgetTravelCost']").val(result.budgetTravelCost);
			$("input[name='budgetPurchaseCost']").val(result.budgetPurchaseCost);
		}
	});
}

function setOldProject(){
	$.ajax({
		url : '/budget/budget/setOldProject/' + $("#relsultBudgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#relsultBudgetId").val()
		},
		success : function(data) {
			var result = data.budget;
			$("input[name='budgetCost']").val(result.budgetCost);
			$("input[name='budgetTotalCost']").val(result.budgetTotalCost);
			$("input[name='budgetConformance']").val(result.budgetConformance);
		}
	});
}

function setSoftware(){
	$.ajax({
		url : '/budget/budget/setSoftware/' + $("#relsultBudgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#relsultBudgetId").val()
		},
		success : function(data) {
			var result = data.budget;
			$("input[name='budgetTax']").val(result.budgetTax);
			$("input[name='budgetServiceRevenueNet']").val(result.budgetServiceRevenueNet);
			$("input[name='budgetCost']").val(result.budgetCost);
			$("input[name='budgetProfit']").val(result.budgetProfit);
			$("input[name='budgetTotalCost']").val(result.budgetTotalCost);
			$("input[name='budgetConformance']").val(result.budgetConformance);
		}
	});
}

function setBlender(){
	$.ajax({
		url : '/budget/budget/setBlender/' + $("#relsultBudgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#relsultBudgetId").val()
		},
		success : function(data) {
			var result = data.budget;
			$("input[name='budgetTax']").val(result.budgetTax);
			$("input[name='budgetServiceRevenueNet']").val(result.budgetServiceRevenueNet);
			$("input[name='budgetCost']").val(result.budgetCost);
			$("input[name='budgetTotalCost']").val(result.budgetTotalCost);
			$("input[name='budgetConformance']").val(result.budgetConformance);
		}
	});
}

function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/budget/budget/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.budgetId > 0) {
				$('#relsultBudgetId').val(data.budgetId);
				parent.layer.msg("操作成功");
				freshParenWindow();
				$("#submitButton").attr("disabled", true);//上面的验证通过才会执行到这里禁用按钮。
			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}


function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
		rules : {
			responsibleCenter : {
				required : true
			},
			deptId : {
				required : true,
				maxlength:50
			},
			projectSupervisor : {
				required : true
			},
			projectGategory : {
				required : true
			},
			projectId: {
				required : true
			},
			contractId: {
				required : true
			},
			customerId : {
				required : true
			},
			businessId: {
				required : true
			},
			province: {
				required : true
			},
			city: {
				required : true
			},
			area: {
				required : true
			},
			budgetProfitRate:{
				required : true,
				number:true
			},
			budgetType:{
				required : true,
			}
		},
		messages : {
			responsibleCenter : {
				required : icon + "请选择负责中心"
			},
			deptId : {
				required : icon + "请选择部门"
			},
			projectSupervisor : {
				required : icon + "请选择项目主管"
			},
			projectGategory : {
				required : icon + "请选择项目类别"
			},
			projectId : {
				required : icon + "请选择项目名称"
			},
			contractId : {
				required : icon + "请选择合同名称"
			},
			customerId : {
				required : icon + "请选择客户名称"
			},
			businessId : {
				required : icon + "请选择业务名称"
			},
			province : {
				required : icon + "请选择省"
			},
			city : {
				required : icon + "请选择市"
			},
			area : {
				required : icon + "请选择区"
			},
			budgetProfitRate:{
				required : icon + "项目计划利润率不能为空"
			},
			budgetType:{
				required : icon + "预算类别不能为空"
			}
		}

	})
}

function nextStepThis(tabId,totalStep,lastBtn,nextBtn){
	nextStep(tabId,totalStep,lastBtn,nextBtn);
	if(address ==null ){
			if( $('#'+tabId+' li:eq(2)').attr("class")=='active'){
				address = new addressResolve({
				    proId: 'province',
				    cityId: 'city',
				    areaId: 'area'
				  });
				address.init();
			}

	}
}

function getType(){
	//项目类别
	var budgetType=$("#budgetType").val();
	//人工成本
	var budgetLaborCost=$("#budgetLaborCost").val();
	//差旅成本
	var budgetTravelCost=$("#budgetTravelCost").val();
	//采购成本
	var budgetPurchaseCost=$("#budgetPurchaseCost").val();
	//服务收入（合同额）
	var budgetServiceRevenue=$("#budgetServiceRevenue").val();

	if(budgetType=="老项目"){
		//计划利润率
		$("#budgetProfitRate").val('');
		var budgetProfitRate=$("#budgetProfitRate").val();
		//税金
		$("#budgetTax").val('0');
		//服务净收入
		$("#budgetServiceRevenueNet").val('0');
		//计划成本总额
		//var budgetTotalCost= (Number(budgetServiceRevenue)-Number(budgetServiceRevenue)*budgetProfitRate).toFixed(4);
		$("#budgetTotalCost").val('0');
		//费用和支出
		var budgetCost=(Number(budgetLaborCost)+Number(budgetTravelCost)+Number(budgetPurchaseCost)).toFixed(2);
		$("#budgetCost").val(budgetCost);
		//利润
		$("#budgetProfit").val('0');
		//计划是否合规
		if(budgetTotalCost-budgetCost>0){
			$("#budgetConformance").val("是");
		}
		if(budgetTotalCost-budgetCost<0){
			$("#budgetConformance").val("否");
		}
	}
	if(budgetType=="软件项目技术开发类"){
		//计划利润率
		var budgetProfitRate=$("#budgetProfitRate").val(0.5);
		//税金
		var budgetTax= (Number(budgetServiceRevenue)*0.06).toFixed(2);
		$("#budgetTax").val(budgetTax);
		//服务净收入
		var budgetServiceRevenueNet= (Number(budgetServiceRevenue)-Number(budgetTax)).toFixed(2);
		$("#budgetServiceRevenueNet").val(budgetServiceRevenueNet);
		//计划成本总额
		var budgetTotalCost= (Number(budgetServiceRevenue)-Number(budgetServiceRevenue)*0.5).toFixed(2);
		$("#budgetTotalCost").val(budgetTotalCost);
		//费用和支出
		var budgetCost=(Number(budgetTax)+Number(budgetLaborCost)+Number(budgetTravelCost)+Number(budgetPurchaseCost)).toFixed(2);
		$("#budgetCost").val(budgetCost);
		//利润
		var budgetProfit= (Number(budgetServiceRevenue)-Number(budgetCost)).toFixed(2);
		$("#budgetProfit").val(budgetProfit);
		//计划是否合规
		if(budgetTotalCost-budgetCost>0){
			$("#budgetConformance").val("是");
		}
		if(budgetTotalCost-budgetCost<0){
			$("#budgetConformance").val("否");
		}
	}
	if(budgetType=="软硬件混合项目软件为主"){
		//计划利润率
		var budgetProfitRate=$("#budgetProfitRate").val(0.4);
		//税金
		var budgetTax= ((Number(budgetServiceRevenue)-Number(budgetPurchaseCost))*0.17).toFixed(2);
		$("#budgetTax").val(budgetTax);
		//服务净收入
		var budgetServiceRevenueNet= (Number(budgetServiceRevenue)-Number(budgetTax)-Number(budgetLaborCost)-Number(budgetTravelCost)-Number(budgetPurchaseCost)).toFixed(2);
		$("#budgetServiceRevenueNet").val(budgetServiceRevenueNet);
		//计划成本总额
		var budgetTotalCost= (Number(budgetServiceRevenue)-Number(budgetServiceRevenue)*0.4).toFixed(2);
		$("#budgetTotalCost").val(budgetTotalCost);
		//费用和支出
		var budgetCost=(Number(budgetTax)+Number(budgetLaborCost)+Number(budgetTravelCost)+Number(budgetPurchaseCost)).toFixed(2);
		$("#budgetCost").val(budgetCost);
		//利润
		$("#budgetProfit").val('0');
		//计划是否合规
		if(budgetTotalCost-budgetCost>0){
			$("#budgetConformance").val("是");
		}
		if(budgetTotalCost-budgetCost<0){
			$("#budgetConformance").val("否");
		}
	}
	if(budgetType=="软硬件混合项目硬件为主"){
		//计划利润率
		var budgetProfitRate=$("#budgetProfitRate").val(0.35);
		//税金
		var budgetTax= ((Number(budgetServiceRevenue)-Number(budgetPurchaseCost))*0.17).toFixed(2);
		$("#budgetTax").val(budgetTax);
		//计划成本总额
		var budgetTotalCost= (Number(budgetServiceRevenue)-Number(budgetServiceRevenue)*0.35).toFixed(2);
		$("#budgetTotalCost").val(budgetTotalCost);
		//费用和支出
		var budgetCost=(Number(budgetTax)+Number(budgetLaborCost)+Number(budgetTravelCost)+Number(budgetPurchaseCost)).toFixed(2);
		$("#budgetCost").val(budgetCost);
		//利润
		$("#budgetProfit").val('0');
		//计划是否合规
		if(budgetTotalCost-budgetCost>0){
			$("#budgetConformance").val("是");
		}
		if(budgetTotalCost-budgetCost<0){
			$("#budgetConformance").val("否");
		}
	}
	if(budgetType=="硬件类"){
		//计划利润率
		var budgetProfitRate=$("#budgetProfitRate").val(0.25);
		//税金
		var budgetTax= ((Number(budgetServiceRevenue)-Number(budgetPurchaseCost))*0.17).toFixed(2);
		$("#budgetTax").val(budgetTax);
		//计划成本总额
		var budgetTotalCost= (Number(budgetServiceRevenue)-Number(budgetServiceRevenue)*0.25).toFixed(2);
		$("#budgetTotalCost").val(budgetTotalCost);
		//费用和支出
		var budgetCost=(Number(budgetTax)+Number(budgetLaborCost)+Number(budgetTravelCost)+Number(budgetPurchaseCost)).toFixed(2);
		$("#budgetCost").val(budgetCost);
		//利润
		$("#budgetProfit").val('0');
		//计划是否合规
		if(budgetTotalCost-budgetCost>0){
			$("#budgetConformance").val("是");
		}
		if(budgetTotalCost-budgetCost<0){
			$("#budgetConformance").val("否");
		}
	}

}

function setType(){
	//项目类别
	var budgetType=$("#budgetType").val();
	//人工成本
	var budgetLaborCost=$("#budgetLaborCost").val();
	//差旅成本
	var budgetTravelCost=$("#budgetTravelCost").val();
	//采购成本
	var budgetPurchaseCost=$("#budgetPurchaseCost").val();
	//计划利润率
	var budgetProfitRate=$("#budgetProfitRate").val();
	//服务收入（合同额）
	var budgetServiceRevenue=$("#budgetServiceRevenue").val();
	if(budgetType=="老项目"){
		 setOldProject();
		 var budgetServiceRevenueNet=$("#budgetServiceRevenueNet").val('');
		 var budgetTax=$("#budgetTax").val('');
		 var budgetTotalCost= $("#budgetTotalCost").val('');
		 var budgetCost=$("#budgetCost").val();
	}
	if(budgetType=="软件项目技术开发类"){
		setSoftware();
	}
	if(budgetType=="硬件类"){
		setBlender();
	}
	if(budgetType=="软硬件混合项目软件为主"){
		setBlender();
	}
	if(budgetType=="软硬件混合项目硬件为主"){
		setBlender();
	}

};
