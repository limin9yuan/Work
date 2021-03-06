var prefixmoduleCategory = "/project/moduleCategory"
$().ready(function() {
	//loadCrmDataValue("/project/productCategory/listDic","productId");
	validateRule();
	moduleCategoryMapper_edit();
});

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