var prefixproject = "/project/project"
$().ready(function() {
	getProjectMenuTreeData();
	validateRule();
	datetimepicker();
	projectMapper_edit();
});


$.validator.setDefaults({
	submitHandler : function() {
		getAllSelectNodes();
		save();
	}
});
function getAllSelectNodes() {
	var ref = $('#projectMenuTree').jstree(true); // 获得整个树

	deptIds = ref.get_selected(); // 获得所有选中节点的，返回值为数组
	//alert(deptIds);

	$("#projectMenuTree").find(".jstree-undetermined").each(function(i, element) {
		deptIds.push($(element).closest('.jstree-node').attr("id"));
	});
}
function getProjectMenuTreeData() {
	$.ajax({
		type : "GET",
		url : "/system/sysDept/tree",
		success : function(projectMenuTree) {
			loadProjectMenuTree(projectMenuTree);
		}
	});
}
function loadProjectMenuTree(projectMenuTree) {
	$('#projectMenuTree').jstree({
		'core' : {
			'data' : projectMenuTree
		},
		"checkbox" : {
			"three_state" : true,
		},
		"plugins" : [ "wholerow", "checkbox" ]
	});
	//$('#menuTree').jstree("open_all");

}
function save() {
	$('#deptIds').val(deptIds);
	var role = $('#signupForm').serialize();
	$.ajax({
		cache : true,
		type : "POST",
		url : "/project/project/save",
		data : role, // 你的formid
		//data : $('#signupForm').serialize(),// 你的formid
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
			projectName : {
				required : true,
				maxlength:50
			},
			customerId : {
				required : true
			},
			projectOwner : {
				required : true
			},
			projectManager: {
				required : true
			},
			projectGategory: {
				required : true
			},
			projectSales : {
				required : true
			},
			deliveryStatus: {
				required : true
			},
			projectBeginDate : {
				required : true
			},
			projectEndDate: {
				required : true
			},
			projectPhase: {
				required : true,
				maxlength:20
			},
			fllowType : {
				required : true
			},
			ifOutSource: {
				required : true
			}
		},
		messages : {
			projectName : {
				required : icon + "请输入项目名称",
				maxlength:icon + "字符长度不能大于50"
			},
			customerId : {
				required : icon + "请选择客户名称"
			},
			projectOwner : {
				required : icon + "请选择项目经理"
			},
			projectManager : {
				required : icon + "请选择研发经理"
			},
			projectGategory : {
				required : icon + "请选择项目类型"
			},
			projectSales : {
				required : icon + "请选择销售负责人"
			},
			deliveryStatus : {
				required : icon + "请选择是否签订合同"
			},
			projectBeginDate : {
				required : icon + "项目开始时间不能为空"
			},
			projectEndDate : {
				required : icon + "项目结束时间不能为空"
			},
			projectPhase : {
				required : icon + "请输入项目阶段",
				maxlength:icon + "字符长度不能大于20"
			},
			fllowType : {
				required : icon + "请选择流程种类"
			},
			ifOutSource : {
				required : icon + "请选择是否分包"
			}
		}
	})
}
function datetimepicker() {
	 $('#projectBeginDate').datetimepicker({  
	        format: 'YYYY-MM-DD',  
	        locale: moment.locale('zh-cn')  
	    });  
	 $('#projectEndDate').datetimepicker({  
	        format: 'YYYY-MM-DD',  
	        locale: moment.locale('zh-cn')  
	    }); 
}
//修改——显示数据绑定
function projectMapper_edit(){
	$.ajax({
		url : prefixproject + '/edit_ajax/' + $("#project").val(),
		type : "get",
		data : {
			'projectId' : $("#project").val(),
		},
		success : function(data) {
			var result = data.project;
			$("input[name='projectId']").val(result.projectId);
			$("input[name='projectName']").val(result.projectName);
			$("input[name='ContractCenterratio']").val(result.ContractCenterratio);
			$("input[name='projectBeginDate']").val(result.projectBeginDate);
			$("input[name='projectEndDate']").val(result.projectEndDate);
			$("input[name='projectPhase']").val(result.projectPhase);
			$("input[name='projectOldId']").val(result.projectOldId);
			$("textarea[name='projectDescription']").val(result.projectDescription);
			$("textarea[name='projectRemarks']").val(result.projectRemarks);

			loadDicValue("project_delivery_status","deliveryStatus",result.deliveryStatus);
			loadDicValue("project_if_outSource","ifOutSource",result.ifOutSource);
			loadDicValue("project_project_gategory","projectGategory",result.projectGategory);
			loadDicValue("project_fllow_type","fllowType",result.fllowType);
			loadCrmDataValue("/sales/salesProject/listDic","projectRelatedId",result.projectRelatedId);
			loadCrmDataValue("/sales/companyCustomer/listDic","customerId",result.customerId);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","projectOwner",result.projectOwner);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","projectManager",result.projectManager);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","projectSales",result.projectSales);
			//loadCrmDataValue("/system/sysDept/listDic","deptId",result.deptId);
		}
	});
}