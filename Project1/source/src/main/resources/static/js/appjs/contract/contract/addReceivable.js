$().ready(function() {
	validateRule();
	datetimepickerService();
	$("#contractIds",window.parent.document).val()==undefined
	? $("#contractId").val($("#contractId",window.parent.document).val())
	: $("#contractId").val($("#contractIds",window.parent.document).val());
});

$.validator.setDefaults({
	submitHandler : function() {
		saveReceivable();
	}
});
function saveReceivable() {
	if($("#contractId").val()==-1){
		parent.layer.msg("请先保存项目基本信息");
		return;
	}
	$.ajax({
		cache : true,
		type : "POST",
		url : "/contract/receivable/save",
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
		ignore: ":hidden:not(select)",
			rules : {
				receivableDate : {
					required : true
				},
				receivablePrice : {
					required : true,
					number:true
				},
				receivableOwner : {
					required : true
				}
			},
			messages : {
				receivableDate : {
					required : icon + "收款计划时间不能为空"
				},
				receivablePrice : {
					required : icon + "请输入价格"
				},
				receivableOwner : {
					required : icon + "收款负责人不能为空"
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
