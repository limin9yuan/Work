$().ready(function() {
	loadDic("sales_project_gategory","projectGategory");
	loadCrmData("/sales/business/listDic","projectBusiness");
	loadCrmData("/inner/innerOrgEmployee/listDic","projectSales");
	loadCrmData("/inner/innerOrgEmployee/listDic","projectManager");
	validateRule();
	datetimepicker();
});

$.validator.setDefaults({
	submitHandler : function() {
		//getAllSelectNodes();
		save();
		modal(myModal);
	},

});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sales/salesProject/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.projectId > 0) {
 					$('#projectIds').val(data.projectId);
 				}
				parent.layer.msg("操作成功");
				closeParenWindow();
			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}

function modal(myModal) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix+"/save",
			type : "post",
			data : {
				'projectId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
		rules : {
			projectBusiness : {
				required : true
			},
			projectName : {
				required : true,
				maxlength:50
			},
			projectSales : {
				required : true
			},
			projectManager : {
				required : true
			},
			projectBeginDate: {
				required : true
			},
			projectEndDate: {
				required : true
			},
			projectGategory : {
				required : true
			},
			projectPhase: {
				required : true,
				maxlength:20
			}
		},
		messages : {
			projectBusiness : {
				required : icon + "请选择业务名称"
			},
			projectName : {
				required : icon + "请输入项目名称",
				maxlength:icon + "字符长度不能大于50"
			},
			projectSales : {
				required : icon + "请选择销售负责人"
			},
			projectManager : {
				required : icon + "请选择售前经理"
			},
			projectBeginDate : {
				required : icon + "开始时间不能为空"
			},
			projectEndDate : {
				required : icon + "结束时间不能为空"
			},
			projectGategory : {
				required : icon + "请选择项目类型"
			},
			projectPhase : {
				required : icon + "请输入项目阶段",
				maxlength:icon + "字符长度不能大于20"
			}
		}
	})
}

function datetimepicker() {
	 $('#projectBeginDate').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn'),
	    }).on('dp.change', function() {
			$('#projectEndDate').data("DateTimePicker").minDate(new Date($('#projectBeginDate').data('date')));
		});
	 $('#projectEndDate').datetimepicker({
	        format: 'YYYY-MM-DD ',
	        locale: moment.locale('zh-cn'),
	    }).on('dp.change', function() {
			$('#projectBeginDate').data("DateTimePicker").maxDate(new Date($('#projectEndDate').data('date')));
		});
}
