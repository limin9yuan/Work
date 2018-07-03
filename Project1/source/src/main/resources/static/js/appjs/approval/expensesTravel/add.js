$().ready(function() {
	 loadCrmData("/sales/companyCustomer/listDic","customerId");
	 loadCrmData("/sales/business/listDic","businessId");
	 loadCrmData("/sales/salesProject/listAllDic","projectId");
	 loadCrmData("/inner/innerOrgEmployee/listDic","expensesTravelName");
	 loadCrmData("/contract/travel/listDic","expensesTravelTid");
	 loadCrmData("/contract/payout/listDic","expensesTravelPayid");

	 $('#myTab a[href="#cost"]').on('shown.bs.tab', function(e){

		 if($("#expensesTravelPayMode option").length==1){
			 loadDic("contract_payout_Means","expensesTravelPayMode");
		 }

	 });
	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/approval/expensesTravel/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.expensesTravelId > 0) {
 					$('#expensesTravelIds').val(data.expensesTravelId);
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
		ignore:":hidden:not(select)",
		rules : {

			//企业客户编号
			customerId : {
				required : true
			},
			//业务编号
			businessId:{
				required : true
			},
			//项目编号
			projectId:{
				required : true
			},
			//申请人姓名
			expensesTravelName:{
				required : true
			},
			//关联出差申请编号
			expensesTravelTid:{
				required : true
			},
			//关联请款申请编号
			expensesTravelPayid:{
				required : true
			},
			//出差任务
			expensesTravelTask:{
				required : true
			},
			//出差补助
			expensesTravelAllowance:{
				number:true,
				max:999999999
			},
			//其他费用金额
			expensesTravelPrice:{
				number:true,
				max:999999999
			},
			//预借金额
			expensesTravelPayPrice:{
				required : true,
				number:true,
				max:99999999
			},
			//结算方式
			expensesTravelPayMode:{
				required : true
			},
			//收款人银行
			expensesTravelBank:{
				required : true
			},
			//卡号
			expensesTravelCardNum:{
				checkCardNumber :true,
				required : true
			}

		},
		messages : {
			//企业客户编号
			customerId : {
				required : icon + "请选择企业客户编号！"
			},
			//业务编号
			businessId:{
				required : icon + "请选择业务编号！"
			},
			//项目编号
			projectId:{
				required : icon + "请选择项目编号！"
			},
			//申请人姓名
			expensesTravelName:{
				required : icon + "请选择申请人姓名！"
			},
			//关联出差申请编号
			expensesTravelTid:{
				required : icon + "请选择关联出差申请编号！"
			},
			//关联请款申请编号
			expensesTravelPayid:{
				required : icon + "情选择关联请款申请编号！"
			},
			//出差任务
			expensesTravelTask:{
				required : icon + "请输入出差任务！"
			},
			//出差补助
			expensesTravelAllowance:{
				number:icon + "请输入合法的数字小数、整数！",
				max:$.validator.format("出差补助不能大于8位数99999999！")
			},
			//其他费用金额
			expensesTravelPrice:{
				number:icon + "请输入合法的数字小数、整数！",
				max:$.validator.format("其他费用金额不能大于8位数99999999！")
			},
			//预借金额
			expensesTravelPayPrice:{
				required : icon + "请输入预借金额！",
				number:icon + "请输入合法的数字小数、整数！",
				max:$.validator.format("预借金额不能大于8位数99999999！")
			},
			//结算方式
			expensesTravelPayMode:{
				required : icon + "请选择结算方式！"
			},
			//收款人银行
			expensesTravelBank:{
				required : icon + "请输入收款人银行！"
			},
			//卡号
			expensesTravelCardNum:{
				checkCardNumber :icon + "卡号有误，请输入有效的银行卡号",
				required : icon+"银行卡号不能为空！"
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
function luhmCheck(expensesTravelCardNum) {
	var lastNum = expensesTravelCardNum.substr(expensesTravelCardNum.length - 1, 1);//取出最后一位（与luhm进行比较）

	var first15Num = expensesTravelCardNum.substr(0, expensesTravelCardNum.length - 1);//前15或18位
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
