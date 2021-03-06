$().ready(function() {

	validateRule();
});

$.validator.setDefaults({
	submitHandler : function() {


		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/timesheet/timesheet/edit",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				closeParenWindow();
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
			assignmentTaskName : {
				required : true
			},
			timesheetNormal:{
				required : true,
				number:true
			}
		},
		messages : {
			assignmentTaskName : {
				required : icon + "请输入工作内容！"
			},
			timesheetNormal:{
				required : icon+"请填写正常工时！",
				number:icon+"请填写数字"
			}
		}
	})
}
