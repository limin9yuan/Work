var address = null;
$().ready(function() {
	// loadDic("province","province");
	// loadCrmData("/sales/customerContact/listDic","province");
	// loadCrmData("/sales/province/listDic","province");

	loadDic("sales_customer_contact_Sta", "contactIntroduction");// 联系人信息
	loadDic("sales_Customer_Contact_Status", "contactStatus");// 联系人状态
	loadCrmData("/inner/innerOrgEmployee/listDic", "contactOwner");// 客户所有者
	loadCrmData("/inner/innerOrgEmployee/listDic", "contactSales");// 销售负责人

	$('#contactBirthDay').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
	$('#myTab a[href="#baseInfo"]').on('shown.bs.tab', function(e) {
		$('#lastBtn').attr("disabled", true);
		$('#nextBtn').attr("disabled", false);
	});
	$('#myTab a[href="#linkInfo"]').on('shown.bs.tab', function(e) {
		$('#lastBtn').attr("disabled", false);
		$('#nextBtn').attr("disabled", false);
	});
	$('#myTab a[href="#workUnit"]').on('shown.bs.tab', function(e) {
		$('#lastBtn').attr("disabled", false);
		$('#nextBtn').attr("disabled", false);
		loadCrmData("/sales/customerDept/listDic", "contactDept");// 部门
		loadCrmData("/sales/customerJob/listDic", "contactJob");// 岗位
		if (address == null) {
			address = new addressResolve({
				proId : 'province',
				cityId : 'city',
				areaId : 'area'
			});
			address.init();
		}
		loadCrmData("/sales/companyCustomer/listDic", "customerId");// 客户编号
	});
	$('#myTab a[href="#userDefine"]').on('shown.bs.tab', function(e) {
		$('#lastBtn').attr("disabled", false);
		$('#nextBtn').attr("disabled", true);
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
		url : "/sales/customerContact/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				// parent.reLoad();
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
			contactName : {
				required : true
			},
			contactPhoneNumber : {
				required : true
			},
			province : {
				required : true
			},
			contactIntroduction : {
				required : true
			},
			contactYearsWorking : {
				number : true,
				max : 50
			},
			contactAge : {
				digits : true,
				max : 100
			},
			contactPhoneNumber : {
				digits : true,
				rangelength : [ 5, 11 ]
			},
			// 工作电话
			contactWorkPhoneNumber : {
				digits : true,
				rangelength : [ 5, 11 ]
			},
			// 家庭电话
			contactFamilyPhoneNumber : {
				digits : true,
				rangelength : [ 5, 11 ]
			},
			// 微信
			// contactWeixin:{
			//				
			// },
			// QQ
			contactQq : {
				digits : true
			},
			// 邮件地址
			contactMailbox : {
				email : true
			}

		},
		messages : {
			contactName : {
				required : icon + "请输入姓名"
			},
			contactPhoneNumber : {
				required : icon + "请输入手机"
			},
			province : {
				required : icon + "请选择行政区"
			},
			contactIntroduction : {
				required : icon + "请选择行政区"
			},
			contactYearsWorking : {
				number : icon + "请输入正确的工作年限（数字）！",
				max : $.validator.format("请输入正确的工作年限不大于50年！")
			},
			contactAge : {
				digits : icon + "年龄必须为数字、整数！",
				max : $.validator.format("请输入年龄不大于100岁！")
			},
			contactPhoneNumber : {
				digits : icon + "请输入正确的电话号码（数字）！",
				rangelength : icon + "请输入有效的电话号码、5-11位！！"
			},
			// 工作电话
			contactWorkPhoneNumber : {
				digits : icon + "请输入正确的电话号码（数字）！",
				rangelength : icon + "请输入有效的电话号码、5-11位！！"
			},
			// 家庭电话
			contactFamilyPhoneNumber : {
				digits : icon + "请输入正确的电话号码（数字）！",
				rangelength : icon + "请输入有效的电话号码、5-11位！"
			},

			// 微信
			// contactWeixin:{
			//				
			// },
			// QQ
			contactQq : {
				digits : icon + "QQ必须为数字、整数！",
			},
			// 邮件地址
			contactMailbox : {
				email : icon + "请输入有效的邮件地址！"
			}
		}
	})
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
