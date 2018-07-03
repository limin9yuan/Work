var prefix = "/contract/payout"

$().ready(function() {


	validateRule();
	payout_edit();
	getMainAndCopyPerson_ajax();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
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
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#payoutId").val() +"/approval_payout";
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
								" onclick='deleteMainPerson(\"" + (result[i].employeeId + "_1") +"\" )'>" +
								result[i].person +"</div>";
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
								" onclick='deleteCopyPerson(\"" + (result[i].employeeId + "_2") +"\" )'>" +
								result[i].person +"</div>";
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
			loadCrmDataValue("/sales/salesProject/listAllDic", "projectId",result.projectId);
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
			$("input[name='payoutRelatedContractId']").val(result.payoutRelatedContractId);
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
				checkCardNumber :true,
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
				checkCardNumber :icon + "卡号有误，请输入有效的银行卡号",
				required : icon+"银行卡号不能为空！"
			},
			payoutRelatedContractId : {
				digits:icon+"关联出差申请编号之能是数字！",
				required : icon + "关联出差申请编号不能为空！"
			}
		}
	})
}

//银行卡号验证
jQuery.validator.addMethod("checkCardNumber", function (value, element) {
	return this.optional(element) || (luhmCheck(value));
}, "卡号输入有误，请检查输入");

//Description: 银行卡号Luhm校验
//Luhm校验规则：16位银行卡号（19位通用）:
//1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
//2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
//3.将加法和加上校验位能被 10 整除。
//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(payoutCardNumber) {
	var lastNum = payoutCardNumber.substr(payoutCardNumber.length - 1, 1);//取出最后一位（与luhm进行比较）

	var first15Num = payoutCardNumber.substr(0, payoutCardNumber.length - 1);//前15或18位
	var newArr = new Array();
	for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
	newArr.push(first15Num.substr(i, 1));
	}
	var arrJiShu = new Array(); //奇数位*2的积 <9
	var arrJiShu2 = new Array(); //奇数位*2的积 >9

	var arrOuShu = new Array(); //偶数位数组
	for (var j = 0; j < newArr.length; j++) {
	if ((j + 1) % 2 == 1) {//奇数位
	if (parseInt(newArr[j]) * 2 < 9)
	arrJiShu.push(parseInt(newArr[j]) * 2);
	else
	arrJiShu2.push(parseInt(newArr[j]) * 2);
	}
	else //偶数位
	arrOuShu.push(newArr[j]);
	}

	var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
	for (var h = 0; h < arrJiShu2.length; h++) {
	jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
	jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}

	var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	var sumOuShu = 0; //偶数位数组之和
	var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal = 0;
	for (var m = 0; m < arrJiShu.length; m++) {
	sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	}

	for (var n = 0; n < arrOuShu.length; n++) {
	sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}

	for (var p = 0; p < jishu_child1.length; p++) {
	sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
	sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	//计算总和
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

	//计算Luhm值
	var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	var luhm = 10 - k;

	if (lastNum == luhm && lastNum.length != 0) {
	//$("#banknoInfo").html("验证通过");
	return true;
	}
	else {
	//$("#banknoInfo").html("银行卡号必须符合校验");
	return false;
	}
}
