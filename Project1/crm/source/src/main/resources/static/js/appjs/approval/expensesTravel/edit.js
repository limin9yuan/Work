var prefix = "/approval/expensesTravel"

$().ready(function() {
	

	$('#myTab a[href="#cost"]').on('shown.bs.tab', function(e) {

		if ($("#expensesTravelPayMode option").length == 1) {
//			loadCrmDataValue("contract/payout/listDic", "expensesTravelPayMode",result.expensesTravelPayMode);
		}
	});
	expensesTravel_edit();
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/approval/expensesTravel/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
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
		rules : {
			name : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入名字"
			}
		}
	})
}
// 修改--实现绑定数据
function expensesTravel_edit() {
	$.ajax({
		url : prefix + '/edit_ajax' + $("#expensesTravelId").val(),
		type : "get",
		data : {
			'expensesTravelId' : $("#expensesTravelId").val(),
		},
		success : function(data) {
			result = data.expensesTravel;
			
//			loadCrmData("/sales/companyCustomer/listDic", "customerId");
//			loadCrmData("/sales/business/listDic", "businessId");
//			loadCrmData("/sales/salesProject/listDic", "projectId");
//			loadCrmData("/inner/innerOrgEmployee/listDic", "expensesTravelName");
//			loadCrmData("/contract/travel/listDic", "expensesTravelTid");
//			loadCrmData("/contract/payout/listDic", "expensesTravelPayid");
			//企业客户编号--下拉框customerId
			loadCrmDataValue("/sales/companyCustomer/listDic", "customerId",result.customerId);
			//业务编号--下拉框businessId
			loadCrmDataValue("/sales/business/listDic", "businessId",result.businessId);
			//项目编号--下拉框projectId
			loadCrmDataValue("/sales/salesProject/listDic", "projectId",result.projectId);
			//申请人姓名--下拉框expensesTravelName
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "expensesTravelName",result.expensesTravelName);
			//关联出差申请表--下拉框expensesTravelTid
			loadCrmDataValue("/contract/travel/listDic", "expensesTravelTid",result.expensesTravelTid);
			//关联请款申请表--下拉框expensesTravelPayid
			loadCrmDataValue("/contract/payout/listDic", "expensesTravelPayid",result.expensesTravelPayid);
			//出差任务--文本框expensesTravelTask
			
			//出差补助--文本框expensesTravelAllowance
			
			//其他费用类型--文本框expensesTravelType

			//其他费用金额--文本框expensesTravelPrice
			
			//预借金额--文本框expensesTravelPayPrice
			
			//结算方式--下拉框expensesTravelPayMode
			
			//收款人银行--文本框expensesTravelBank
			
			//卡号--文本框expensesTravelCardNum
			
			//备注--文本框expensesTravelRemarks

			
		}
	});
}

function nextStepThis(tabId, totalStep, lastBtn, nextBtn) {
	nextStep(tabId, totalStep, lastBtn, nextBtn);
	if (address == null) {
		if ($('#' + tabId + ' li:eq(2)').attr("class") == 'active') {
			address = new addressResolve({
				proId : 'province',
				cityId : 'city',
				areaId : 'area'
			});
			address.init();
		}

	}

}