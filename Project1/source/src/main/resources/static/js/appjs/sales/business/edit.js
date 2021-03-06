var prefixbusiness = "/sales/business"
$().ready(function() {
	businessMapper_edit();
	validateRule();
	getMainAndCopyPerson_ajax();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#businessId").val()+"/sales_business";
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
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sales/business/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
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

// 修改——显示数据绑定
function businessMapper_edit(){
	$.ajax({
		url : prefixbusiness + '/edit_ajax/' + $("#businessId").val(),
		type : "get",
		data : {
			'businessId' : $("#businessId").val(),
		},
		success : function(data) {
			var result = data.business;
			$("input[name='businessName']").val(result.businessName);
			$("input[name='businessOldId']").val(result.businessOldId);
			$("textarea[name='businessDescription']").val(result.businessDescription);
			$("textarea[name='businessRemarks']").val(result.businessRemarks);
			$("select[name='customerId']").val(result.customerId);
			$("select[name='customerId']").trigger("chosen:updated");
			loadCrmDataValue("/sales/companyCustomer/listDic","customerId",result.customerId);
			loadCrmDataValue("/sales/customerContact/listDicContact","contactId",result.contactId);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","businessSales",result.businessSales);
			loadDicValue("sales_business_status","businessStatus",result.businessStatus);
			loadDicValue("sales_cusiness_category","businessCategory",result.businessCategory);
		}
	});
}
