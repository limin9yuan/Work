$().ready(function() {
	//loadDic("project_gategory","category");
	layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#test1', //绑定元素
            url: '/project/productCategory/upload', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
            	if (r.code == 0) {
	 				if (r.productAttachment > 0) {
	 					$('#ids').val(r.productAttachment);
	 					$('#productAttachment').val(r.productAttachment+','+document.getElementById("productAttachment").value);
	 				}
//            	$("#serviceAttachment").val(r.fileName);
	 			parent.layer.msg(r.msg);
                app.getData();
            }else {
 				parent.layer.alert(r.msg)
            }
            }
        });
    });
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
		url : "/project/productCategory/save",
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
		ignore: ":hidden:not(select)",
		rules : {
			productName : {
				required : true
			},
			productDescription : {
				required : true
			}
		},
		messages : {
			productName : {
				required : icon + "请输入产品名称"
			},
			productDescription : {
				required : icon + "请输入产品描述"
			}
		}
	})
}