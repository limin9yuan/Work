var prefixbugCategory = "/sales/bugCategory"
$().ready(function() {
	validateRule();
	bugCategoryMapper_edit();
	getMainAndCopyPerson_ajax();
});

$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#bugId").val() +"/sales_bug_category";
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
		url : "/sales/bugCategory/update",
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
			bugCategoryType : {
				required : true
			},
			bugCategory : {
				required : true
			},
			productId : {
				required : true
			},
			moduleId : {
				required : true
			},
			elseCategory : {
				required : true,
				maxlength:50
			}
		},
		messages : {
			bugCategoryType : {
				required : icon + "请选择分类类别"
			},
			bugCategory : {
				required : icon + "请选择Bug分类"
			},
			productId : {
				required : icon + "请选择产品分类"
			},
			moduleId : {
				required : icon + "请选择模块分类"
			},
			elseCategory : {
				required : icon + "请输入其他分类",
				maxlength:icon + "字符长度不能大于50"
			}
		}
	})
}
//修改——显示数据绑定
function bugCategoryMapper_edit(){
	$.ajax({
		url : prefixbugCategory + '/edit_ajax/' + $("#bugId").val(),
		type : "get",
		data : {
			'bugId' : $("#bugId").val()
		},
		success : function(data) {
			var result = data.bugCategory;
			$("input[name='bugId']").val(result.bugId);
			$("input[name='elseCategory']").val(result.elseCategory);
			$("input[name='bugNewTypeInfo']").val(result.bugNewTypeInfo);
			$("input[name='requirementDescription']").val(result.requirementDescription);
			$("textarea[name='requirementDescription']").val(result.requirementDescription);
			$("textarea[name='bugRemarks']").val(result.bugRemarks);
			loadDicValue("sales_categoryType","bugCategoryType",result.bugCategoryType);
			loadDicValue("sales_newCategory","bugNewType",result.bugNewType);

			loadCrmDataValue("/project/moduleCategory/listDic","bugCategory",result.bugCategory);
			loadCrmDataValue("/project/productCategory/listDic","productId",result.productId);
			loadCrmDataValue("/project/moduleCategory/listDic","moduleId",result.moduleId);
		}
	});
}
