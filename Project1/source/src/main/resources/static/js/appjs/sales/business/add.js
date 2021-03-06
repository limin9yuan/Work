$().ready(function() {
	loadCrmData("/inner/innerOrgEmployee/listDic","businessSales");
	loadCrmData("/sales/companyCustomer/listDic","customerId");
	loadCrmData("/sales/customerContact/listDicContact","contactId");
	loadDic("sales_business_status","businessStatus");
	loadDic("sales_cusiness_category","businessCategory");
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
		url : "/sales/business/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.businessId > 0) {
 					$('#businessIds').val(data.businessId);
 				}
				parent.layer.msg("操作成功");
//				var iframeWin = window[parent.document.find('iframe')[0]['name']]
//				alert(iframeWin)
 				closeParenWindow();
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
			customerId : {
				required : true
			},
			contactId : {
				required : true
			},
			businessName : {
				required : true,
				rangelength:[1,50]
			},
			businessCategory : {
				required : true
			},
			businessStatus : {
				required : true
			},
			businessSales : {
				required : true
			},
			businessOldId : {
				required : true,
				rangelength:[1,50]
			},
			businessDescription : {
				required : true,
				rangelength:[1,1000]
			},
			businessRemarks : {
				rangelength:[1,200]
			}
		},
		messages : {
			customerId : {
				required : icon + "客户名称不能为空"
			},
			contactId : {
				required : icon + "联系人姓名不能为空"
			},
			businessName : {
				required : icon + "业务名称不能为空",
				rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
			},
			businessCategory : {
				required : icon + "业务类型不能为空"
			},
			businessStatus : {
				required : icon + "业务状态不能为空"
			},
			businessSales : {
				required : icon + "销售负责人不能为空"
			},
			businessOldId : {
				required : icon + "旧业务编号不能为空",
				rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
			},
			businessDescription : {
				required : icon + "业务描述不能为空",
				rangelength: icon + "请输入一个长度介于 1 和 1000 之间的字符串"
			},
			businessRemarks : {
				required : icon + "请输入一个长度介于 1 和 200 之间的字符串"
			}
		}
	})
}
