//var deptIds;
$().ready(function() {
	loadDic("project_delivery_status","deliveryStatus");
	loadDic("project_if_outSource","ifOutSource");
	loadDic("project_project_gategory","projectGategory");
	loadDic("project_fllow_type","fllowType");
	loadCrmData("/sales/salesProject/listDic","projectRelatedId");
	loadCrmData("/sales/companyCustomer/listDic","customerId");
	loadCrmData("/inner/innerOrgEmployee/listDic","projectOwner");
	loadCrmData("/inner/innerOrgEmployee/listDic","projectManager");
	loadCrmData("/inner/innerOrgEmployee/listDic","projectSales");
	//loadCrmData("/system/sysDept/listDic","deptId");
	//getProjectMenuTreeData();
	validateRule();
	datetimepicker();
});

$.validator.setDefaults({
	submitHandler : function() {
		//getAllSelectNodes();
		save();
	}
});

function save() {
	//$('#deptId').val(deptIds);
	//alert($('#deptId').val());
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
				closeParenWindow();


			} else {
				parent.layer.alert(data.msg);
			}

		}
	});

}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
		rules : {
			projectRelatedId : {
				required : true
			},
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
			},
			projectDevelopmentBeginDate:{
				required : true
			},
			projectDevelopmentEndDate:{
				required : true
			},
			ContractCenterratio:{
					number:true
			}
		},
		messages : {
			projectRelatedId : {
				required : icon + "关联售前项目不能为空",
			},
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
			},
			projectDevelopmentBeginDate:{
				required : icon + "项目研发开始时间不能为空"
			},
			projectDevelopmentEndDate:{
				required : icon + "项目研发结束时间不能为空"
			}
		}
	})
}
function datetimepicker() {
	 $('#projectBeginDate').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    }).on('dp.change', function() {
			$('#projectEndDate').data("DateTimePicker").minDate(new Date($('#projectBeginDate').data('date')));
		});
	 $('#projectEndDate').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    }).on('dp.change', function() {
			$('#projectBeginDate').data("DateTimePicker").maxDate(new Date($('#projectEndDate').data('date')));
		});
	//研发开始
		$('#projectDevelopmentBeginDate').datetimepicker({
			format : 'YYYY-MM-DD',
			locale : moment.locale('zh-cn')
		}).on('dp.change', function() {
			$('#projectDevelopmentEndDate').data("DateTimePicker").minDate(new Date($('#projectDevelopmentBeginDate').data('date')));
		});
		//研发结束
		$('#projectDevelopmentEndDate').datetimepicker({
			format : 'YYYY-MM-DD',
			locale : moment.locale('zh-cn')
		}).on('dp.change', function() {
			$('#projectDevelopmentBeginDate').data("DateTimePicker").maxDate(new Date($('#projectDevelopmentEndDate').data('date')));
		});
}
var currentFiled = "";
var openDept = function(currentFiledparam){
	currentFiled = currentFiledparam;
	layer.open({
		type:2,
		title:"选择部门",
		area : [ '300px', '450px' ],
		content:"/system/sysDept/treeView"
	})
}
function loadDept( deptId,employeeDept){
	if (currentFiled == "deptId") {
		$("#deptId").val(deptId);
		$("#deptName").val(employeeDept);
	}
}
