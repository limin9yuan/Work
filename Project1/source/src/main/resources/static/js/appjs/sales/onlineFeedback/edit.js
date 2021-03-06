$().ready(function() {
	validateRule();
	companyCustomer_edit();
//	layui.use('upload', function () {
//        var upload = layui.upload;
//        //执行实例
//        var uploadInst = upload.render({
//            elem: '#test1', //绑定元素
//            url: '/sales/onlineFeedback/upload', //上传接口
//            size: 1000,
//            accept: 'file',
//            done: function (r) {
//            	 if (r.code == 0) {
//       				if (r.feedbackAttachment > 0) {
//       					$('#ids').val(r.feedbackAttachment);
//       					$('#feedbackAttachment').val(r.feedbackAttachment+','+document.getElementById("feedbackAttachment").value);
//       				}
//       				parent.layer.msg(r.msg);
////      				 app.getData();
//
//       			} else {
//       				parent.layer.msg(r.msg)
//       			}
//                  },
//                  error: function (r) {
//                      layer.msg(r.msg);
//                  }
//              });
//          });
    });

$.validator.setDefaults({
	submitHandler : function() {
//		update();
	}
});
//修改附件id
//function update() {
//	$.ajax({
//		cache : true,
//		type : "POST",
//		url : "/sales/onlineFeedback/updateFeedbackAttachment",
//		data : $('#signupForm').serialize(),// 你的formid
//		async : false,
//		error : function(request) {
//			parent.layer.alert("Connection error");
//		},
//		success : function(data) {
//			if (data.code == 0) {
//				parent.layer.msg("操作成功");
//				closeParenWindow();
//
//			} else {
//				parent.layer.alert(data.msg)
//			}
//
//		}
//	});
//
//}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
		rules : {
			feedbackCategory : {
				required : true
			},
			feedbackPhoneNumber : {
				required : true,
				maxlength:20
			},
			feedbackMailbox : {
				required : true,
				maxlength:50
			},
			feedbackName : {
				required : true,
				maxlength:50
			},
			feedbackCompanyName : {
				required : true,
				maxlength:50
			},
			feedbackProduct : {
				required : true,
				maxlength:50
			},
			feedbackDescription : {
				required : true,
				maxlength:1000
			}
		},
		messages : {
			feedbackCategory : {
				required : icon + "请选择反馈内容分类"
			},
			feedbackPhoneNumber : {
				required : icon + "请输入手机",
				maxlength:icon + "字符长度不能大于20"
			},
			feedbackMailbox : {
				required : icon + "请输入邮箱",
				maxlength:icon + "字符长度不能大于50"
			},
			feedbackName : {
				required : icon + "请输入姓名",
				maxlength:icon + "字符长度不能大于50"
			},
			feedbackCompanyName : {
				required : icon + "请输入公司名称",
				maxlength:icon + "字符长度不能大于50"
			},
			feedbackProduct : {
				required : icon + "请输入使用产品",
				maxlength:icon + "字符长度不能大于50"
			},
			feedbackDescription : {
				required : icon + "请输入问题描述",
				maxlength:icon + "字符长度不能大于1000"
			}
		}
	})
}

//修改--现实绑定数据
function companyCustomer_edit(){
	$.ajax({
		 url : '/sales/onlineFeedback/edit_ajax/' + $("#feedbackId").val(),
		type : "get",
		data : {
			'feedbackId' : $("#feedbackId").val(),
		},
		success:function(data){
			result=data.onlineFeedback;
			$("input[name='feedbackAttachment']").val(result.feedbackAttachment);
			$("textarea[name='feedbackDescription']").val(result.feedbackDescription);
		}
	});
}
