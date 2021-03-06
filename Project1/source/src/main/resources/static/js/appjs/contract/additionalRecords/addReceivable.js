$().ready(function() {
	validateRule();
	datetimepickerService();
});

$.validator.setDefaults({
	submitHandler : function() {
		saveReceivable();
	}
});
function saveReceivable() {
	var tmpRecordId = $("#recordId",window.parent.document).val()==undefined ? $("#resultRecordId",window.parent.document).val()
			:$("#recordId",window.parent.document).val();
	if(tmpRecordId==-1){
		parent.layer.msg("请先保存合同增补基本信息");
		return;
	}
	$('#contractId').val(tmpRecordId);
	$.ajax({
		cache : true,
		type : "POST",
		url : "/additionalRecords/receivable/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoadReceivable();
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
				required : icon + "请输入姓名"
			}
		}
	})
}
function datetimepickerService() {
	// 付款计划时间
	$('#receivableDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}