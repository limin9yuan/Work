var prefix = "/inner/innerOrgEmployee"
$(function() {
	// getTreeData()
	// loadCrmData("/inner/innerOrgEmployee/listDic","employeeId");
	load();
    validateRule();
});
function load() {
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/list", // 服务器数据的加载地址
					// showRefresh : true,
					// showToggle : true,
					// showColumns : true,
						iconSize : 'outline',
						toolbar : '#exampleToolbar',
						striped : true, // 设置为true会有隔行变色效果
						dataType : "json", // 服务器返回的数据类型
						pagination : true, // 设置为true会在底部显示分页条
						// queryParamsType : "limit",
						// //设置为limit则会发送符合RESTFull格式的参数
						singleSelect : false, // 设置为true将禁止多选
						// contentType : "application/x-www-form-urlencoded",
						// //发送到服务器的数据编码类型
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						// search : true, // 是否显示搜索框
						showColumns : false, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者
													// "server"
						queryParams : function(params) {
							return {
								// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								// employeeId:$('#employeeId').val(),
								// employeeName:$('#employeeName').val(),
								// employeeDept:$('#employeeDept').val(),
								// employeeOperatorName:$('#employeeOperatorName').val(),
					           // name:$('#searchName').val(),
					           // username:$('#searchName').val()
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
								{
									checkbox : true
								},{
									field : 'employeeCenter',
									title : '所属中心'
								},{
									field : 'employeeDept',
									title : '所属部门'
								},{
									field : 'employeeName',
									title : '姓名'
								},{
									field : 'jobId',
									title : '职位'
								}
																 ]
					});
}
function addSendPerson() {
    layer.open({
        type : 2,
        title : '增加主送人',
        maxmin : true,
        shadeClose : false, // 点击遮罩关闭层
        area : [ '800px', '95%' ],
        content :'/sales/companyCustomer/sendAndReceive'
    });
	$("#sendPerson").append("<div class='personDiv' id='sendDiv' onclick='deleteSendPerson()'>abc</div>")
}
function addRecivePerson() {
    layer.open({
        type : 2,
        title : '增加主送人',
        maxmin : true,
        shadeClose : false, // 点击遮罩关闭层
        area : [ '800px', '95%' ],
        content :'/sales/companyCustomer/sendAndReceive'
    });
	$("#receivePerson").append("<div class='personDiv' id='receiveDiv' onclick='deleteRecivePerson()'>abc</div>")
}
function deleteSendPerson() {
	$("#sendDiv").remove();
}
function deleteRecivePerson() {
	$("#receiveDiv").remove();
}

// function save() {
// 	$.ajax({
// 		cache : true,
// 		type : "POST",
// 		url : "/sales/companyCustomer/save",
// 		data : $('#signupForm').serialize(),// 你的formid
// 		async : false,
// 		error : function(request) {
// 			parent.layer.alert("Connection error");
// 		},
// 		success : function(data) {
// 			if (data.code == 0) {
// 				parent.layer.msg("操作成功");
// 				parent.reLoad();
// 				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
// 				parent.layer.close(index);
//
// 			} else {
// 				parent.layer.alert(data.msg)
// 			}
//
// 		}
// 	});
//
// }
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		rules : {
			name : {
				required : true
			}
		},
		messages : {
			name : {
				required : icon + "请输入姓名"
			}
		}
	})
}
