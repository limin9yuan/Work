$().ready(function() {
	loadCrmData("/inner/innerOrgEmployee/listDic","recordName");
	loadCrmData("/inner/innerOrgEmployee/listDic","recordSales");
	loadCrmData("/inner/innerOrgEmployee/listDic","contractDraftPerson");
	loadCrmData("/inner/orgJob/listDic", "jobId");
	loadCrmData("/contract/contract/listDic","recordRelatedContractId");
	validateRule();
	datetimepicker();
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
		url : "/contract/additionalRecords/save",
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
var openDept = function(){
	layer.open({
		type:2,
		title:"选择部门",
		area : [ '300px', '450px' ],
		content:"/system/sysDept/treeView"
	})
}
function loadDept( deptId,deptName){
	$("#deptId").val(deptId);
	$("#employeeDept").val(deptName);
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
		rules : {
			recordName : {
				required : true
			},
			jobId : {
				required : true
			},
			contractName : {
				required : true,
				maxlength:50
			},
			recordBulidCompany : {
				required : true,
				maxlength:50
			},
			recordSales: {
				required : true
			},
			recordTotalPrice : {
				required : true,
				maxlength:16
			},
			recordDescription: {
				required : true,
				maxlength:1000
			},recordReason: {
				required : true,
				maxlength:1000
			},recordCommitTime: {
				required : true
			},preInvoiceDate: {
				required : true
			},contractDraftPerson: {
				required : true
			}
		},
		messages : {
			recordName : {
				required : icon + "请选择申请人姓名"
			},
			jobId : {
				required : icon + "请选择岗位"
			},
			contractName : {
				required : icon + "请输入合同名称",
				maxlength:icon + "字符长度不能大于50"
			},
			recordBulidCompany : {
				required : icon + "请输入建设单位",
				maxlength:icon + "字符长度不能大于50"
			},
			recordSales : {
				required : icon + "请选择销售负责人"
			},
			recordTotalPrice : {
				required : icon + "请输入增补总金额",
				maxlength:icon + "字符长度不能大于16"
			},
			recordDescription : {
				required : icon + "请输入增补内容描述",
				maxlength:icon + "字符长度不能大于1000"
			},
			recordReason : {
				required : icon + "请输入增补原因",
				maxlength:icon + "字符长度不能大于1000"
			},
			recordCommitTime : {
				required : icon + "开始时间提交评审时间"
			},
			preInvoiceDate : {
				required : icon + "预计开发票时间不能为空"
			},
			contractDraftPerson : {
				required : icon + "请选择合同拟定人"
			}
		}
	})
}
function datetimepicker() {
	 $('#recordCommitTime').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    });
	 $('#preInvoiceDate').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    });
}