$().ready(function() {
	validateRule();
	datetimepicker();
	edit_ajax();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function edit_ajax(){
	$.ajax({
		url : '/project/process/edit_ajax/' + $("#Id").val(),
		type : "get",
		data : {
			'Id' : $("#Id").val(),
		},
		success : function(data) {
			var result = data.process;
			$("input[name='finishPayment']").val(result.finishPayment);
			$("input[name='finishPercent']").val(result.finishPercent);
			$("input[name='finishDate']").val(result.finishDate);

			loadCrmDataValue("/sales/salesProject/listAllDic","projectId",result.projectId);
		}
	});
}
function datetimepicker() {
	 $('#finishDate').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    });
}
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/project/process/update",
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
