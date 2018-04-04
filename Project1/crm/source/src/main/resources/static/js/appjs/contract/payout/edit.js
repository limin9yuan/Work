var prefix = "/contract/payout"

$().ready(function() {
	
	
	validateRule();
	payout_edit();
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
		url : "/contract/payout/update",
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
function payout_edit() {
	$.ajax({
		 url : prefix + '/edit_ajax/' + $("#payoutId").val(),
		type : "get",
		data : {
			'payoutId' : $("#payoutId").val(),
		},

		success : function(data) {
			result = data.payout;
			// 企业客户编号--下拉框
			loadCrmDataValue("/sales/companyCustomer/listDic", "customerId",result.customerId);
			// 业务编号--下拉框
			loadCrmDataValue("/sales/business/listDic", "businessId",result.businessId);
			// 项目编号--下拉框
			loadCrmDataValue("/sales/salesProject/listDic", "projectId",result.projectId);
			// 申请人姓名--下拉框
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "payoutPerson",result.payoutPerson);
			// 请款用途--文本框
			$("input[name='payoutUseage']").val(result.payoutUseage);
			// 请款金额--文本框
			$("input[name='payoutPrice']").val(result.payoutPrice);
			// 结算方式--下拉框
			loadDicValue("contract_payout_Means", "payoutMeans",result.payoutMeans);
			// 收款人银行 --文本框
			$("input[name='payoutBeneficiaryBank']").val(result.payoutBeneficiaryBank);
			// 银行卡号--文本框
			$("input[name='payoutCardNumber']").val(result.payoutCardNumber);
			// 关联出差申请编号--下拉框
			loadCrmDataValue("/contract/travel/listDic", "payoutRelatedContractId",result.payoutRelatedContractId);
			// 备注--文本框
			$("textarea[name='payoutRemarks']").val(result.payoutRemarks);
			//审批状态--单选按钮
			$(":radio[name='payoutApprovalStatus'][value='" + result.payoutApprovalStatus + "']").prop("checked", "checked");
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
				max:99999999,
				digits:true,
				required : true
			},
			payoutMeans : {
				required : true
			},
			payoutBeneficiaryBank : {
				required : true
			},
			payoutCardNumber : {
				max:9999999999999999999999999,
				digits:true,
				required : true
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
				max:$.validator.format("请款金额不能大于8位数（99999999）！"),
				digits:icon+"请款金额必须是数字！",
				required : icon+"请款金额不能为空！"
			},
			payoutMeans : {
				required : icon + "结算方式不能为空！"
			},
			payoutBeneficiaryBank : {
				required : icon + "收款人银行不能为空！"
			},
			payoutCardNumber : {
				max:$.validator.format("银行卡号最多不能超过25位数字！"),
				digits:icon+"银行卡号只能是数字！",
				required : icon+"银行卡号不能为空！"
			},
			payoutRelatedContractId : {
				digits:icon+"关联出差申请编号之能是数字！",
				required : icon + "关联出差申请编号不能为空！"
			}
		}
	})
}
