$().ready(function() {
	loadDic("inner_org_job_rank","jobRank");
	loadCrmData("/inner/orgJob/listDic","jobId");

	validateRule();
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
		url : "/inner/orgJob/save",
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
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
			rules : {
				jobName : {
					required : true,
					rangelength:[1,50]
				},
				deptId : {
					required : true,
				},
				jobRank : {
					required : true,
				},
				jobRankDescription : {
					required : true,
					rangelength:[1,200]
				},
				jobDescrription : {
					required : true,
					rangelength:[1,200]
				},
				jobRemarks : {
					rangelength:[1,200]
				}
			},
			messages : {
				jobName : {
					required : icon + "岗位名称不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				deptId : {
					required : icon + "部门不能为空",
				},
				jobRank : {
					required : icon + "级别名称不能为空",
				},
				jobRankDescription : {
					required : icon + "级别描述不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"

				},
				jobDescrription : {
					required : icon + "岗位描述不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"
				},
				jobRemarks : {
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"
				}
			}
	})
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
	$("#jobDept").val(deptName);
}
