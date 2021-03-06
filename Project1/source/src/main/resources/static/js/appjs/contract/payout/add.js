$().ready(function() {
	loadCrmData("/sales/business/listDic", "businessId");
	loadCrmData("/sales/companyCustomer/listDic", "customerId");
	loadCrmData("/sales/salesProject/listAllDic", "projectId");
	loadCrmData("/inner/innerOrgEmployee/listDic", "payoutPerson");
	loadDic("contract_payout_Means", "payoutMeans");
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {

		save();
	}
});
function relateTravel() {
	layer.open({
		type : 2,
		title : '关联出差',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
		content :'/contract/payout/relateTravel' // iframe的url
	});
}
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/contract/payout/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.payoutId > 0) {
 					$('#payoutIds').val(data.payoutId);
 				}
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
		ignore : ":hidden:not(select)",
		rules : {
			customerId : {
				required : true
			},
			businessId : {
				required : true
			},
			projectId : {
				required : true
			},
			payoutPerson : {
				required : true
			},
			payoutUseage : {
				required : true
			},
			payoutPrice : {
				digits:true,
				required : true,
				max:99999999
			},
			payoutMeans : {
				required : true
			},
			payoutBeneficiaryBank : {
				required : true
			},
			payoutCardNumber : {
				required : true,
			 	creditcard:true
			},
			payoutRelatedContractId : {
				required : true
			}
		},
		messages : {

			customerId : {
				required : icon + "企业客户编号不能为空！"
			},
			businessId : {
				required : icon + "业务编号不能为空！"
			},
			projectId : {
				required : icon + "项目编号不能为空！"
			},
			payoutPerson : {
				required : icon + "申请人姓名不能为空！"
			},
			payoutUseage : {
				required :icon + "请款用途不能为空！"
			},
			payoutPrice : {
				digits:icon+"请款金额必须是数字！",
				required : icon+"请款金额不能为空！",
				max:$.validator.format("请款金额不能大于8位数！")
			},
			payoutMeans : {
				required : icon + "结算方式不能为空！"
			},
			payoutBeneficiaryBank : {
				required : icon + "收款人银行不能为空！"

			},
			payoutCardNumber : {
				required : icon+"银行卡号不能为空！",
			 	creditcard:icon+"请输入正确的银行卡号"
			},
			payoutRelatedContractId : {
				digits:icon+"关联出差申请编号之能是数字！",
				required : icon + "关联出差申请编号不能为空！"
			}
		}
	})
}
