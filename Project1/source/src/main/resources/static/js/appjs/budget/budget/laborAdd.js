var prefix = "/budget/budget";
var prefixlabor = "/budget/labor";
$().ready(function() {
	loadCrmData("/inner/innerOrgEmployee/listDic","employeeId");
	datetimepicker();
	validateRule();
	//员工级别,时薪计算
	$("#employeeId").bind("change", setEmployeeLevelSalary);
});
function setEmployeeLevelSalary(){
	$.ajax({
		url : '/budget/labor/getEmployeeLevelSalary/' + $("#employeeId").val(),
		type : "get",
		data : {
			'employeeId' : $("#employeeId").val()
		},
		success : function(data) {
			var result = data.employee;
			$("input[name='employeeLevel']").val(result.employeeLevel);
			$("input[name='employeeSalaryHour']").val(result.employeeSalaryHour);
		}
	});
}

$.validator.setDefaults({
	submitHandler : function() {
		saveLabor();
	}
});
function saveLabor() {

	var tmpBudgetId = $("#budgetId",window.parent.document).val()==undefined ? $("#relsultBudgetId",window.parent.document).val()
												:$("#budgetId",window.parent.document).val()
	if(tmpBudgetId==-1){
		parent.layer.msg("请先保存项目基本信息");
		return;
	}
	$('#budgetId').val(tmpBudgetId);
	$.ajax({
		cache : true,
		type : "POST",
		url : "/budget/labor/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoadLabor();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
function calculateLaborCost(){
	var laborBeginTime = $('#laborBeginTime').data('date');
	var laborEndTime = $('#laborEndTime').data('date');
	var laborBeginDate = laborBeginTime.substr(0,10);
	var laborEndDate =laborEndTime.substr(0,10);
	var laborBeginHour = laborBeginTime.substr(11,5);
	var laborEndHour = laborEndTime.substr(11,5);

	$.ajax({
		url : '/budget/labor/calculateLaborCost/' +laborBeginDate+'/'+laborEndDate +'/'+
		laborBeginHour+'/'+laborEndHour,
		type : "get",
		data : {
			'employeeId' : $("#employeeId").val()
		},
		success : function(data) {
			var laborRate = $('#laborRate').val()/100;
			var laborTotalHour = data.laborHour;
			var laborTotalHourResult = laborTotalHour * laborRate;
			var laborTotalDay= laborTotalHour/8 ;
			var laborTotalDayResult= laborTotalDay * laborRate;
			var laborPerHourCost = $('#employeeSalaryHour').val();
			var laborTotalCost = laborTotalHour * laborPerHourCost;
			var laborTotalCostResult = laborTotalCost * laborRate;

			$("input[name='laborTotalHourNum']").val(Number(laborTotalHourResult).toFixed(2));
			$("input[name='laborTotalDayNum']").val(Number(laborTotalDayResult).toFixed(2));
			$("input[name='laborTotalCost']").val(Number(laborTotalCostResult).toFixed(2));
		}
	});
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		focusInvalid: false,
		ignore: ":hidden:not(select)",
		rules : {
			employeeId : {
				required : true
			},
			employeeLevel : {
				required : true
			},
			employeeSalaryHour : {
				required : true
			},
			laborRate : {
				required : true,
				number:true,
				range:[0,100],
				maxlength:5
			},
			laborBeginTime: {
				required : true
			},
			laborEndTime: {
				required : true
			},
			laborTotalDayNum : {
				required : true,
				number:true
			},
			laborTotalHourNum: {
				required : true,
				number:true,
				maxlength:10
			},
			laborTotalCost: {
				required : true,
				number:true,
				maxlength:12
			},
			laborGrandTotalCost: {
				required : true,
				number:true,
				maxlength:12
			}
		},
		messages : {
			employeeId : {
				required : icon + "请选择姓名"
			},
			employeeLevel : {
				required : icon + "请输入员工级别"
			},
			employeeSalaryHour : {
				required : icon + "请输入时薪"
			},
			laborRate : {
				required : icon + "请输入投入百分比",
				number:icon + "请输入有效的数字",
				maxlength:icon + "字符长度不能大于5"
			},
			laborBeginTime : {
				required : icon + "投入开始时间不能为空"
			},
			laborEndTime : {
				required : icon + "投入结束时间不能为空"
			},
			laborTotalDayNum : {
				required : icon + "请输入合计天数",
				number:icon + "请输入有效的数字"
			},
			laborTotalHourNum : {
				required : icon + "请输入合计工时数",
				number:icon + "请输入有效的数字",
				maxlength:icon + "字符长度不能大于10"
			},
			laborTotalCost : {
				required : icon + "请输入人工成本合计",
				number:icon + "请输入有效的数字",
				maxlength:icon + "字符长度不能大于12"
			},
			laborGrandTotalCost : {
				required : icon + "请输入人工的成本总计",
				number:icon + "请输入有效的数字",
				maxlength:icon + "字符长度不能大于12"
			}
		}
	})
}
function datetimepicker() {
	var workDay;
	var startWork;
	var endWork;
	$.ajax({
		url : '/budget/labor/getWorkTime/',
		type : "get",
		data : {
			'employeeId' : $("#employeeId").val()
		},
		success : function(data) {
			var result = data.laborHour;
			workDay = result.workDay;
			startWork = result.startWorkAM;
			endWork = result.endWorkPM;
			var startTime = workDay + ' ' + startWork.substr(0,5);
			var endTime = workDay + ' ' + endWork.substr(0,5);
			$('#startTime').val(startTime);
			$('#endTime').val(endTime);
			$('#laborBeginTime').data('date',startTime);
			$('#laborEndTime').data('date',endTime);

		}
	});
	 $('#laborBeginTime').datetimepicker({
	        format: 'YYYY-MM-DD HH:mm',
	        locale: moment.locale('zh-cn'),
			// defaultDate : '2018-08-02 08:00'
			// enabledHours: [8, 9, 10, 11, 13, 14, 15, 16, 17],

	    }).on('dp.change', function() {
			$('#laborEndTime').data("DateTimePicker").minDate(new Date($('#laborBeginTime').data('date')));
		});
	 $('#laborEndTime').datetimepicker({
	        format: 'YYYY-MM-DD HH:mm',
	        locale: moment.locale('zh-cn'),
			// defaultDate : new Date(),
			// enabledHours: [8, 9, 10, 11, 13, 14, 15, 16, 17],
	    }).on('dp.change', function() {
			$('#laborBeginTime').data("DateTimePicker").maxDate(new Date($('#laborEndTime').data('date')));
		});
}
