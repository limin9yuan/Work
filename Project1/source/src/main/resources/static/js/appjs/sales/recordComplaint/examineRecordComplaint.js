var prefixrecordComplaint = "/sales/recordComplaint"
var result;
$().ready(function() {
			$('#myTab a[href="#baseInfo"]').on('shown.bs.tab', function(e){
				 $('#lastBtn').attr("disabled",true);
				 $('#nextBtn').attr("disabled",false);
			 });
			$('#myTab a[href="#serviceSS"]').on('shown.bs.tab', function(e) {
				if ($("#complaintAfterSaleType option").length == 1) {
					loadDic("sales_record_type", "complaintAfterSaleType");

				}
				$('#lastBtn').attr("disabled",false);
				 $('#nextBtn').attr("disabled",false);
			 });
			 $('#myTab a[href="#information"]').on('shown.bs.tab', function(e){
				 $('#lastBtn').attr("disabled",false);
				 $('#nextBtn').attr("disabled",false);
			 });
			 $('#myTab a[href="#options"]').on('shown.bs.tab', function(e){
				 $('#lastBtn').attr("disabled",false);
				 $('#nextBtn').attr("disabled",true);
			 });
// 文件上传
	layui.use('upload', function() {
		var upload = layui.upload;
		// 执行实例
		var uploadInst = upload.render({
			elem : '#test1', // 绑定元素
			url : '/common/sysFile/upload', // 上传接口
			size : 1000,
			accept : 'file',
			done : function(r) {
				// alert(r.fileName);
				$("#complaintAttachment").val(r.fileName);
				// layer.msg(r.msg);
				// app.getData();
			},
			error : function(r) {
				layer.msg(r.msg);
			}
		});
	});
	RecordComplaint_ajax();
	datetimepicker();
	validateRule();
	getMainAndCopyPerson_ajax();
	getFileSize();
});
$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#complaintId").val() +"/sales_record_complaint";
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
								" onclick='delete(\"" + (result[i].employeeId + "_1") +"\" )'>" +
								result[i].person +"</div>";
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
								" onclick='delete(\"" + (result[i].employeeId + "_2") +"\" )'>" +
								result[i].person +"</div>";
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
		url : "/sales/recordComplaint/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				layer.msg("操作成功");
				reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				layer.close(index);

			} else {
				layer.alert(data.msg)
			}

		}
	});
}

function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
			rules : {
				complaintDate : {
					required : true
				},
				complaintName : {
					required : true,
					rangelength:[1,6]
				},
				complaintCompany : {
					required : true,
					rangelength:[1,50]
				},
				customerId : {
					required : true
				},
				projectId : {
					required : true
				},
				complaintProduct : {
					required : true,
					rangelength:[1,50]
				},
				complaintFeedbackType : {
					required : true,
					rangelength:[1,10]
				},
				complaintProblem : {
					required : true,
					rangelength:[1,500]
				},
				complaintAfterSaleType : {
					required: true,
					rangelength:[1,10]
				},
				complaintExecutor : {
					required: true,
					rangelength:[1,500]
				},
				complaintResult : {
					required: true,
					rangelength:[1,10]
				},
				complaintAfterSaleRemarks : {
					rangelength:[1,200]
				},
				complaintMailbox : {
					rangelength:[1,50]
				},
				complaintPhoneNumber : {
					required: true,
					rangelength:[1,20]
				},
			},
			messages : {
				complaintDate : {
					required : icon + "问题出现时间不能为空"
				},
				complaintName : {
					required : icon + "投诉人姓名姓名不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 6 之间的字符串"
				},
				complaintCompany : {
					required : icon + "所在单位不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				customerId : {
					required : icon + "客户名称不能为空"
				},
				projectId : {
					required : icon + "项目名称不能为空"
				},
				complaintProduct : {
					required : icon + "使用产品不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				complaintFeedbackType : {
					required : icon + "反馈方式不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 10 之间的字符串"
				},
				complaintProblem : {
					required : icon + "反馈内容不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 500 之间的字符串"
				},
				complaintAfterSaleType : {
					required : icon + "服务类型不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 10 之间的字符串"
				},
				complaintExecutor : {
					required : icon + "处理过程不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 500 之间的字符串"
				},
				complaintResult : {
					required : icon + "处理结果不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 10 之间的字符串"
				},
				complaintAfterSaleRemarks : {
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"
				},
				complaintMailbox : {
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				complaintPhoneNumber : {
					required : icon + "电话不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 20 之间的字符串"
				},
			}
	})
}

function datetimepicker() {
	$('#complaintDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}
// 绑定
function RecordComplaint_ajax(){
	$.ajax({
		url : prefixrecordComplaint + '/edit_ajax/' + $("#complaintId").val(),
		type : "get",
		data : {
			'complaintId' : $("#complaintId").val(),
		},
		success : function(data) {
			result = data.recordComplaint;
			$("input[name='complaintId']").val(result.complaintId);
			$("input[name='complaintCompany']").val(result.complaintCompany);
			$("input[name='complaintName']").val(result.complaintName);
			$("input[name='complaintProduct']").val(result.complaintProduct);
			$("textarea[name='complaintProblem']").val(result.complaintProblem);
			$("textarea[name='complaintAttachmentCustomer']").val(result.complaintAttachmentCustomer);
			$("textarea[name='complaintProblemRemarks']").val(result.complaintProblemRemarks);
			$("input[name='complaintExecutor']").val(result.complaintExecutor);
			$("input[name='complaintResult']").val(result.complaintResult);
			$("input[name='complaintMailbox']").val(result.complaintMailbox);
			$("input[name='complaintPhoneNumber']").val(result.complaintPhoneNumber);
			$("input[name='complaintAttachment']").val(result.complaintAttachment);
			$("input[name='complaintDate']").val(result.complaintDate);
			$("textarea[name='complaintAfterSaleRemarks']").val(result.complaintAfterSaleRemarks);
			// 按钮
			loadCrmDataValue("/sales/companyCustomer/listDic","customerId",result.customerId);
			loadCrmDataValue("/project/project/listDic","projectId",result.projectId);
			loadDicValue("sales_record_service_Service_Feedback_Type","complaintFeedbackType",result.complaintFeedbackType);
		}
	});
}


//*********************** 文件下载及相关 ************************************
//文件大小
function getFileSize() {
	console.log("文件大小数据加载");
	$.ajax({
		type : "Post",
		url : "/sales/companyCustomer/getFileSize",
		data : {},
		async : false,
		success : function(data) {
			// 将后台传来的fileSizeString文件代销传给html页面的fileSizeString
			$("#fileSizeString").val(data);
		},
		error : function(msg) {
			parent.layer.msg("文件总大小计算错误！");
		}
	});
}
//下载全部附件
function download() {
	console.log("下载全部附件");
	$.ajax({
		type : "Post",
		url : "/sales/companyCustomer/compressedFile",
		data : {},
		success : function(data) {
			parent.layer.msg("附件下载成功！已保存在您的卓面！");
			// alert("success");
		},
		error : function(msg) {
			parent.layer.msg("附件下载失败!请联系管理员！");
			// alert(msg);
		}
	});
}

//*************************** END *************************************
//图片预览
function previewImg(obj) {
    var img = new Image();
    img.src = obj.src;
    var imgHtml = "<img src='" + obj.src + "' style='width:90% height:90%'/>";
    //弹出层
    parent.layer.open({
        type: 1,
        shade: 0.8,
        offset: 'auto',
        area: [90 + '%',90+'%'],
        shadeClose:true,
        scrollbar: false,
        title: "图片预览", //不显示标题
        content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响
        cancel: function () {
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });
        }
    });
}
