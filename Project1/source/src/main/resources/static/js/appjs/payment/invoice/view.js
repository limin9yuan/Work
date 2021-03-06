var prefixinvoice = "/payment/invoice"
$().ready(function() {
//	layui.use('upload', function () {
//        var upload = layui.upload;
//        //执行实例
//        var uploadInst = upload.render({
//            elem: '#test1', //绑定元素
//            url: '/common/sysFile/upload', //上传接口
//            size: 1000,
//            accept: 'file',
//            done: function (r) {
//            	alert(r.fileName);
//            	$("#invoiceAttachment").val(r.fileName);
//                //layer.msg(r.msg);
//                //app.getData();
//            },
//            error: function (r) {
//                layer.msg(r.msg);
//            }
//        });
//    });
	validateRule();
	datetimepicker();
	invoiceMapper_edit();
	getMainAndCopyPerson_ajax();
	$("#contractId").bind("change", setContractId);
});
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#invoiceId").val()+"/invoice";
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

function setContractId(){
	$.ajax({
		url : '/payment/invoice/getContractId/' + $("#contractId").val(),
		type : "get",
		data : {
			'contractId' : $("#contractId").val()
		},
		success : function(data) {
			var result = data.contract;
			$("input[name='businessId']").val(result.businessId);
			$("input[name='customerId']").val(result.customerId);
			$("input[name='projectId']").val(result.projectId);
			$("input[name='contractSales']").val(result.contractSales);
			$("input[name='contractTotalPrice']").val(result.contractTotalPrice);
			$("input[name='contractInvoiceType']").val(result.contractInvoiceType);
			$("input[name='contractInvoiceTime']").val(result.contractInvoiceTime);
			$("input[name='contractReceivablePrice']").val(result.contractReceivablePrice);
		}
	});
}

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/payment/invoice/update",
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
			invoiceId : {
				required : true,
				maxlength:50
			},
			invoiceCompany : {
				required : true,
				maxlength:10
			},
			invoiceNumber : {
				required : true,
				maxlength:50
			},
			invoicePrice : {
				required : true,
				maxlength:20
			},
			invoiceType: {
				required : true,
				maxlength:20
			},
			invoicePerson: {
				required : true
			},
			invoiceDate: {
				required : true
			},
			invoiceContractStatus: {
				required : true
			}
		},
		messages : {
			invoiceId : {
				required : icon + "请输入发票序号",
				maxlength:icon + "字符长度不能大于50"
			},
			invoiceCompany : {
				required : icon + "请输入开票公司",
				maxlength:icon + "字符长度不能大于10"
			},
			invoiceNumber : {
				required : icon + "请输入发票号码",
				maxlength:icon + "字符长度不能大于50"
			},
			invoicePrice : {
				required : icon + "请输入发票金额",
				maxlength:icon + "字符长度不能大于20"
			},
			invoiceType : {
				required : icon + "请输入发票类型",
				maxlength:icon + "字符长度不能大于20"
			},
			invoicePerson : {
				required : icon + "请选择开票人"
			},
			invoiceDate : {
				required : icon + "开票日期不能为空"
			},
			invoiceContractStatus : {
				required : icon + "请选择合同状态"
			}
		}
	})
}
function datetimepicker() {
	 $('#invoiceDate').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    });
	 $('#invoiceReceiverTime').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    });
}
//修改——显示数据绑定
function invoiceMapper_edit(){
	$.ajax({
		url : prefixinvoice + '/edit_ajax/' + $("#invoiceId").val(),
		type : "get",
		data : {
			'invoiceId' : $("#invoiceId").val()
		},
		success : function(data) {
			var result = data.invoice;
			$("input[name='invoiceId']").val(result.invoiceId);
			$("input[name='invoiceCompany']").val(result.invoiceCompany);
			$("input[name='invoiceNumber']").val(result.invoiceNumber);
			$("input[name='invoicePrice']").val(result.invoicePrice);
			$("input[name='invoiceType']").val(result.invoiceType);
			$("input[name='invoiceContent']").val(result.invoiceContent);
			$("input[name='invoiceDate']").val(result.invoiceDate);
			$("input[name='invoiceReceiverTime']").val(result.invoiceReceiverTime);
			$(":radio[name='invoiceContractStatus'][value='" + result.invoiceContractStatus + "']").prop("checked", "checked");
			$("input[name='invoiceAttachment']").val(result.invoiceAttachment);
			$("textarea[name='invoiceRemarks']").val(result.invoiceRemarks);

			$("input[name='businessId']").val(result.businessId);
			$("input[name='customerId']").val(result.customerId);
			$("input[name='projectId']").val(result.projectId);
			$("input[name='contractSales']").val(result.contractSales);
			$("input[name='contractTotalPrice']").val(result.contractTotalPrice);
			$("input[name='contractInvoiceType']").val(result.contractInvoiceType);
			$("input[name='contractInvoiceTime']").val(result.contractInvoiceTime);
			$("input[name='contractReceivablePrice']").val(result.contractReceivablePrice);
			loadCrmDataValue("/contract/contract/listDic","contractId",result.contractId);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","invoicePerson",result.invoicePerson);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","invoiceReceiver",result.invoiceReceiver);
		}
	});
}
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