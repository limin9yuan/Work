var address = null;
var prefix = "/budget/budget"
$().ready(function() {
	$('#myTab a[href="#budgetInfo"]').on('shown.bs.tab', function(e){
		 $('#lastBtn').attr("disabled",true);
		 $('#nextBtn').attr("disabled",false);
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
	budgetMapper_edit();
	getMainAndCopyPerson_ajax();
	// getProvince_ajax();

	//获取项目描述,项目经理，项目类别，客户名称,业务名称
	$("#projectId").bind("change", getProjectId);
	//获取服务收入（合同额）
	$("#projectId").bind("change", getBudgetServiceRevenue);

	setTotal();
	//setOldProject();
	//setSoftware();
    //$("#projectGategory").bind("change", setType);
	//setType();

});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
//修改——显示数据绑定
function budgetMapper_edit(){
	$.ajax({
		url : prefix + '/edit_ajax/' + $("#budgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#budgetId").val()
		},
		success : function(data) {
			var result = data.budget;
			$("input[name='budgetId']").val(result.budgetId);
			$("input[name='budgetAccountReceivable']").val(result.budgetAccountReceivable);
			$("input[name='budgetTotalCost']").val(result.budgetTotalCost);
			$("input[name='budgetProfitRate']").val(result.budgetProfitRate);
			$("input[name='budgetConformance']").val(result.budgetConformance);
			$("input[name='budgetServiceRevenue']").val(result.budgetServiceRevenue);
			$("input[name='budgetTax']").val(result.budgetTax);
			$("input[name='budgetServiceRevenueNet']").val(result.budgetServiceRevenueNet);
			$("input[name='budgetCost']").val(result.budgetCost);
			$("input[name='budgetPurchaseCost']").val(result.budgetPurchaseCost);
			$("input[name='budgetLaborCost']").val(result.budgetLaborCost);
			$("input[name='budgetTravelCost']").val(result.budgetTravelCost);
			$("input[name='budgetProfit']").val(result.budgetProfit);
			// $("select[name='projectId']").val(result.projectId);
			$("textarea[name='projectDescription']").val(result.projectDescription);
			loadDicValue("budget_Responsible_Center","responsibleCenter",result.responsibleCenter);
			loadDicValue("project_project_gategory","projectGategory",result.projectGategory);
			loadDicValue("budget_project_gategory","budgetType",result.budgetType);
			loadCrmDataValue("/system/sysDept/listDic","deptId",result.deptId);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","projectSupervisor",result.projectSupervisor);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","projectOwner",result.projectOwner);
			// loadCrmDataValue("/project/project/listDic","projectId",result.projectId);
			loadCrmDataValue("/sales/companyCustomer/listDic","customerId",result.customerId);
			loadCrmDataValue("/sales/business/listDic","businessId",result.businessId);
			loadCrmDataValue("/contract/contract/listDic","contractId",result.contractId);
			var address = new addressResolve({
			    proId: 'province',
			    cityId: 'city',
			    areaId: 'area',
				projectId:'projectId'
			  },{
		    	    proId: result.province,
		    	    cityId: result.city,
		    	    areaId: result.area,
					projectId:result.projectId
		    	  });
			address.init();
		}
	});
}
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#budgetId").val() +"/project_budget";
	var mainPerson="";
	var copyPerson="";
	var isMainPerson;
	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.mainAndCopyPerson;
			var mainPersonIds = "";
			var copyPersonIds = "";
			for (var i = 0; i < result.length; i++) {
				if (result[i].mainPerson == 1) {
					mainPerson = mainPerson + "<div class='personDiv' id=" + (result[i].employeeId + "_1") +
								">" +result[i].person +"<div style='float:right;margin-top:-8px;margin-right:5px'><img id=" +(result[i].employeeId + "_1") +" onclick='deleteMainPerson(\"" +  (result[i].employeeId + "_1") +"\" )' src='../../../img/close.png'></div>"+"</div>";
					$('#sendPerson').html(mainPerson);
					if (mainPersonIds == "") {
						mainPersonIds = result[i].employeeId
					}else {
						mainPersonIds = mainPersonIds + ","+result[i].employeeId;
					}

					$('#mainPersonId').val(mainPersonIds);

				}
				if (result[i].mainPerson == 0) {
					copyPerson = copyPerson + "<div class='personDiv' id=" + (result[i].employeeId + "_2") +
								">" +result[i].person +"<div style='float:right;margin-top:-8px;margin-right:5px'><img id=" +(result[i].employeeId + "_2") +" onclick='deleteMainPerson(\"" +  (result[i].employeeId + "_2") +"\" )' src='../../../img/close.png'></div>"+"</div>";
					$('#receivePerson').html(copyPerson);
					if (copyPersonIds == "") {
						copyPersonIds = result[i].employeeId
					}else {
						copyPersonIds = copyPersonIds + ","+result[i].employeeId;
					}

					$('#copyPersonId').val(copyPersonIds);


				}
			}
		}
	});
}
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

function setTotal(){
	$.ajax({
		url : '/budget/budget/getTotal/' + $("#budgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#budgetId").val()
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
		url : '/budget/budget/setOldProject/' + $("#budgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#budgetId").val()
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
		url : '/budget/budget/setSoftware/' + $("#budgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#budgetId").val()
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
		url : '/budget/budget/setBlender/' + $("#budgetId").val(),
		type : "get",
		data : {
			'budgetId' : $("#budgetId").val()
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


function setType(){
	//预算类别
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
	//税金
	//var budgetTax=$("#budgetTax").val();
	//服务净收入
	//var budgetServiceRevenueNet=$("#budgetServiceRevenueNet").val();
	//费用和支出（含税）
	//var budgetCost=$("#budgetCost").val();
	//利润
	//var budgetProfit=$("#budgetProfit").val();
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
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/budget/budget/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				closeParenWindow();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

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
			budgetAccountReceivable: {
				required : true,
				maxlength:20
			},
			budgetTotalCost: {
				required : true,
				maxlength:20
			},
			budgetProfitRate: {
				required : true,
				maxlength:5
			},
			budgetConformance: {
				required : true,
				maxlength:1
			},
			budgetServiceRevenue: {
				required : true,
				maxlength:20
			},
			budgetTax: {
				required : true,
				maxlength:20
			},
			budgetServiceRevenueNet: {
				required : true,
				maxlength:20
			},
			budgetCost: {
				required : true,
				maxlength:20
			},
			budgetPurchaseCost: {
				required : true,
				maxlength:20
			},
			budgetLaborCost: {
				required : true,
				maxlength:20
			},
			budgetTravelCost: {
				required : true,
				maxlength:20
			},
			budgetProfit: {
				required : true,
				maxlength:20
			},
			province: {
				required : true
			},
			city: {
				required : true
			},
			area: {
				required : true
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
			budgetAccountReceivable : {
				required : icon + "请选择应收账款总额",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetTotalCost : {
				required : icon + "请选择计划成本总额",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetProfitRate : {
				required : icon + "请选择项目计划利润率",
				maxlength:icon + "字符长度不能大于5"
			},
			budgetConformance : {
				required : icon + "请选择计划是否合规",
				maxlength:icon + "字符长度不能大于1"
			},
			budgetServiceRevenue : {
				required : icon + "请选择服务收入（合同额）",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetTax : {
				required : icon + "请选择税金",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetServiceRevenueNet : {
				required : icon + "请选择服务净收入",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetCost : {
				required : icon + "请选择费用和支持（含税）",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetPurchaseCost : {
				required : icon + "请选择采购成本",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetLaborCost : {
				required : icon + "请选择人工成本",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetTravelCost : {
				required : icon + "请选择差旅成本",
				maxlength:icon + "字符长度不能大于20"
			},
			budgetProfit : {
				required : icon + "请选择利润",
				maxlength:icon + "字符长度不能大于20"
			},
			province : {
				required : icon + "请选择省"
			},
			city : {
				required : icon + "请选择市"
			},
			area : {
				required : icon + "请选择区"
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
