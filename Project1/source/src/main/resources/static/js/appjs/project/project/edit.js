var prefixproject = "/project/project"
$().ready(function() {
	//getProjectMenuTreeData();
	validateRule();
	datetimepicker();
	projectMapper_edit();
	getMainAndCopyPerson_ajax();
});


$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#projectId").val() + "/development_project";
	var mainPerson="";
	var copyPerson="";
	var isMainPerson;
	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.mainAndCopyPerson;
			var mainPersonIds = "";
			var copyPersonIds = "";
			for (var i = 0; i < result.length; i++) {
				if (result[i].mainPerson == 1) {
					mainPerson = mainPerson + "<div class='personDiv' id=" + (result[i].employeeId + "_1") +
								">" +result[i].person +"<div style='float:right;margin-top:-8px;margin-right:5px'><img id=" +(result[i].employeeId + "_1") +" onclick='deleteMainPerson(\"" +  (result[i].employeeId + "_1") +"\" )' src='../../../img/close.png'></div>"+"</div>";
					$('#sendPerson').html(mainPerson);
					if (mainPersonIds == "") {
						mainPersonIds = result[i].employeeId
					}else {
						mainPersonIds = mainPersonIds + ","+result[i].employeeId;
					}

					$('#mainPersonId').val(mainPersonIds);

				}
				if (result[i].mainPerson == 0) {
					copyPerson = copyPerson + "<div class='personDiv' id=" + (result[i].employeeId + "_2") +
								">" +result[i].person +"<div style='float:right;margin-top:-8px;margin-right:5px'><img id=" +(result[i].employeeId + "_2") +" onclick='deleteMainPerson(\"" +  (result[i].employeeId + "_2") +"\" )' src='../../../img/close.png'></div>"+"</div>";
					$('#receivePerson').html(copyPerson);
					if (copyPersonIds == "") {
						copyPersonIds = result[i].employeeId
					}else {
						copyPersonIds = copyPersonIds + ","+result[i].employeeId;
					}

					$('#copyPersonId').val(copyPersonIds);


				}
			}
		}
	});
}
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/project/project/update",
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
//修改——显示数据绑定
function projectMapper_edit(){
	$.ajax({
		url : prefixproject + '/edit_ajax/' + $("#projectId").val(),
		type : "get",
		data : {
			'projectId' : $("#projectId").val(),
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
			$("input[name='deptId']").val(result.deptId);
			$("input[name='projectDevelopmentBeginDate']").val(result.projectDevelopmentBeginDate);
			$("input[name='projectDevelopmentEndDate']").val(result.projectDevelopmentEndDate);

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
