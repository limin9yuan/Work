var prefixrequirementCategory = "/sales/requirementCategory"
$().ready(function() {
	validateRule();
	requirementCategoryMapper_edit();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sales/requirementCategory/update",
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
			requirementCategoryType : {
				required : true
			},
			demandType : {
				required : true
			},
			productId : {
				required : true
			},
			moduleId : {
				required : true
			},
			newCategory : {
				required : true
			},
			elseCategory : {
				required : true,
				maxlength:50
			}
		},
		messages : {
			requirementCategoryType : {
				required : icon + "请选择分类类别"
			},
			demandType : {
				required : icon + "请选择需求分类"
			},
			productId : {
				required : icon + "请选择产品分类"
			},
			moduleId : {
				required : icon + "请选择模块分类"
			},
			newCategory : {
				required : icon + "请选择新建分类类别"
			},
			elseCategory : {
				required : icon + "请输入其他分类",
				maxlength:icon + "字符长度不能大于50"
			}
		}
	})
}
//修改——显示数据绑定
function requirementCategoryMapper_edit(){
	$.ajax({
		url : prefixrequirementCategory + '/edit_ajax/' + $("#requirementId").val(),
		type : "get",
		data : {
			'requirementId' : $("#requirementId").val(),
		},
		success : function(data) {
			result = data.requirementCategory;
			
			$("input[name='newCategoryContent']").val(result.newCategoryContent);//新建分类内容
			loadDicValue("sales_requirementCategory_demandType","demandType",result.demandType);//需求分类
			loadDicValue("sales_newCategory","requirementProductName",result.requirementProductName);//新建分类类别
			
			$("input[name='requirementId']").val(result.requirementId);
			$("input[name='elseCategory']").val(result.elseCategory);//其他分类
			$("textarea[name='requirementDescription']").val(result.requirementDescription);//新需求描述
			$("textarea[name='requirementRemarks']").val(result.requirementRemarks);//备注
			loadDicValue("sales_categoryType","requirementCategoryType",result.requirementCategoryType);//分类类别
			loadCrmDataValue("/project/productCategory/listDic","productId",result.productId);//产品分类
			loadCrmDataValue("/project/moduleCategory/listDic","moduleId",result.moduleId);//模块分类
		}
	});
}
