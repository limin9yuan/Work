var prefixplan = "/additionalRecords/plan"
$().ready(function() {
	datetimepicker();
	validateRule();
	planMapper_edit();
});

$.validator.setDefaults({
	submitHandler : function() {
		updatePlan();
	}
});
function updatePlan() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/additionalRecords/plan/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoadPlan();
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
			planDeliveryDate : {
				required : true
			},
			planDeliveryContent : {
				required : true,
				maxlength:1000
			}
		},
		messages : {
			planDeliveryDate : {
				required : icon + "计划交付时间不能为空"
			},
			planDeliveryContent : {
				required : icon + "请输入计划交付内容",
				maxlength:icon + "字符长度不能大于1000"
			}
		}
	})
}
function datetimepicker() {
	// 付款计划时间
	$('#planDeliveryDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}
//修改——显示数据绑定
function planMapper_edit(){
	$.ajax({
		url : prefixplan + '/edit_ajax/' + $("#planId").val(),
		type : "get",
		data : {
			'planId' : $("#planId").val()
		},
		success : function(data) {
			var result = data.plan;
			$("input[name='planId']").val(result.planId);
			$("input[name='contractId']").val(result.contractId);
			$("input[name='planDeliveryDate']").val(result.planDeliveryDate);
			$("textarea[name='planDeliveryContent']").val(result.planDeliveryContent);
			$("textarea[name='planRemarks']").val(result.planRemarks);
		}
	});
}
