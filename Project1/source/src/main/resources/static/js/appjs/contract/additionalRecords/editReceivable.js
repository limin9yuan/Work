var prefixreceivable = "/additionalRecords/receivable"
$().ready(function() {
	validateRule();
	datetimepickerService();
	receivableMapper_edit();
});

$.validator.setDefaults({
	submitHandler : function() {
		updateReceivable();
	}
});
function updateReceivable() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/additionalRecords/receivable/update",
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
				number:true,
				maxlength:16
			},
			receivableOwner : {
				required : true,
				maxlength:6
			}
		},
		messages : {
			receivableDate : {
				required : icon + "收款计划时间不能为空"
			},
			receivablePrice : {
				required : icon + "请输入收款计划金额",
				number:icon + "请输入有效的数字",
				maxlength:icon + "字符长度不能大于16"
			},
			receivableOwner : {
				required : icon + "请输入收款负责人",
				maxlength:icon + "字符长度不能大于6"
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
//修改——显示数据绑定
function receivableMapper_edit(){
	$.ajax({
		url : prefixreceivable + '/edit_ajax/' + $("#receivableId").val(),
		type : "get",
		data : {
			'receivableId' : $("#receivableId").val()
		},
		success : function(data) {
			var result = data.receivable;
			$("input[name='receivableId']").val(result.receivableId);
			$("input[name='contractId']").val(result.contractId);
			$("input[name='receivableDate']").val(result.receivableDate);
			$("input[name='receivablePrice']").val(result.receivablePrice);
			$("input[name='receivableOwner']").val(result.receivableOwner);
			$("textarea[name='receivableRemarks']").val(result.receivableRemarks);
		}
	});
}