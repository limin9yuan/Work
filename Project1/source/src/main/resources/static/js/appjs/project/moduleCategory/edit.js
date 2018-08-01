var prefixmoduleCategory = "/project/moduleCategory"
$().ready(function() {
	//loadCrmDataValue("/project/productCategory/listDic","productId");
	layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#test1', //绑定元素
            url: '/project/moduleCategory/upload', //上传接口
            size: 1000,
            accept: 'file',
            auto: false,			//不自动上传设置
            bindAction: '#uploadFile',	//“上传”按钮的ID
            choose:function(obj){
//******************************预览选择的文件并根据后缀名判断显示不同的图片********************************************
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                	var upFileName = file.name;
              		 var index1=upFileName.lastIndexOf(".");
              		 var index2=upFileName.length;
              		 var suffix=upFileName.substring(index1+1,index2);//后缀名
              		 
              	 $("#fileNames").text(file.name);//将获取到的文件名给p标签显示出来
              	//判断是什么格式应对的预览图片
              	 if(suffix=="xls"||suffix=="xlsx"){//判断上传是否是表格
              		 $('#photo').attr('src', "/img/fileImage/xlsxImage.png"); //图片链接（base64）
           		 }else if(suffix=="docx"||suffix=="doc"){//判断后缀是否是word文档
           			 $('#photo').attr('src', "/img/fileImage/docxImage.png"); //图片链接（base64）
           		 }else if(suffix=="avi"||suffix=="wma"||suffix=="rmvb"||suffix=="rm"||suffix=="flash"||suffix=="mp4"||suffix=="mid"||suffix=="3GP"){
           			 //判断是否是视频文件
           			 $('#photo').attr('src', "/img/fileImage/videoImage.jpg"); //图片链接（base64）
           		 }else if(suffix=="jpg"||suffix=="png"||suffix=="gif"||suffix=="tif"||suffix=="psd"||suffix=="dng"||suffix=="cr2"||suffix=="nef"){
           			 $('#photo').attr('src', result); //图片链接（base64）
           		 }else if(suffix=="rar"||suffix=="zip"){
           			$('#photo').attr('src', "/img/fileImage/rarImage.jpeg"); //图片链接（base64）
                 }else{
           			 //其他文件均显示文件图标
           			 $('#photo').attr('src', "/img/fileImage/fileImage.png"); //图片链接（base64）
           		 }
              	//*********************	END	**********************************************************
                });
              },
            done: function (r) {
            	if (r.code == 0) {
       				if (r.moduleAttachment > 0) {
       					$('#ids').val(r.moduleAttachment);
       					$('#moduleAttachment').val(r.moduleAttachment+','+document.getElementById("moduleAttachment").value);
       				}
//       				$("#serviceAttachment").val(r.fileName);
//       				parent.layer.msg(r.msg);
//      				 app.getData();

       			} else {
       				parent.layer.msg(r.msg)
       			}
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });
	validateRule();
	moduleCategoryMapper_edit();
});

$.validator.setDefaults({
	submitHandler : function() {
		document.getElementById("uploadFile").click();
		setTimeout('removeaa()', 200);
		setTimeout('update()', 500);//延迟执行updte()方法5毫秒
//		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/project/moduleCategory/update",
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
			moduleName : {
				required : true
			},
			productId : {
				required : true
			},
			moduleDescription : {
				required : true
			}
		},
		messages : {
			moduleName : {
				required : icon + "请输入模块名称"
			},
			productId : {
				required : icon + "请输入产品名称"
			},
			moduleDescription : {
				required : icon + "请输入模块描述"
			}
		}
	})
}
//修改——显示数据绑定
function moduleCategoryMapper_edit(){
	$.ajax({
		url : prefixmoduleCategory + '/edit_ajax/' + $("#moduleId").val(),
		type : "get",
		data : {
			'moduleId' : $("#moduleId").val(),
		},
		success : function(data) {
			var result = data.moduleCategory;
			$("input[name='moduleId']").val(result.moduleId);
			$("input[name='moduleName']").val(result.moduleName);
			$("input[name='moduleAttachment']").val(result.moduleAttachment);
			$("textarea[name='moduleDescription']").val(result.moduleDescription);
			$("textarea[name='moduleRemark']").val(result.moduleRemark);
			
			loadCrmDataValue("/project/productCategory/listDic","productId",result.productId);
		}
	});
}
