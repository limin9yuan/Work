$().ready(function() {
	validateRule();
	datetimepickerService();
	receivable_edit();
});

$.validator.setDefaults({
	submitHandler : function() {
		updateReceivable();
	}
});
function receivable_edit(){
	$.ajax({
		url : '/contract/receivable/edit_ajax/' + $("#receivableId").val(),
		type : "get",
		data : {
			'receivableId' : $("#receivableId").val(),
		},
		success : function(data) {
			var result = data.receivable;
 			$("input[name='contractId']").val(result.contractId);
 			$("input[name='receivableDate']").val(result.receivableDate);
 			$("input[name='receivablePrice']").val(result.receivablePrice);
			$("input[name='receivableOwner']").val(result.receivableOwner);
 			$("textarea[name='receivableRemarks']").val(result.receivableRemarks);
		}
	});
}
function updateReceivable() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/contract/receivable/update",
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
				required : icon + "请输入名字"
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
