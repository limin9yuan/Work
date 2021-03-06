var prefixPayable = "/contract/payable"
$().ready(function() {
	datetimepickerService();
	validateRule();
	payable_edit();
});

$.validator.setDefaults({
	submitHandler : function() {
		updatePayable();
	}
});
function updatePayable() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/contract/payable/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoadPayable();
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
	$('#payableDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}
// 修改——显示数据绑定
function payable_edit(){
	$.ajax({
		url : prefixPayable + '/edit_ajax/' + $("#payableId").val(),
		type : "get",
		data : {
			'payableId' : $("#payableId").val(),
		},
		success : function(data) {
			var result = data.payable;
 			$("input[name='contractId']").val(result.contractId);
 			$("input[name='payableDate']").val(result.payableDate);
 			$("input[name='payablePrice']").val(result.payablePrice);
 			$("textarea[name='payableRemarks']").val(result.payableRemarks);
		}
	});
}
