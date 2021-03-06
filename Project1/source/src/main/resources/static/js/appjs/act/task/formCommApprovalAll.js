$().ready(function() {
	$('#btnSubmit').click(save);
	$('#TaskTitle').html('审批'+'['+$('#taskName').val()+']');

	$('#btnFlowChart').click(trace);


	// loadTraceList();
	load();

});
function load() {

	$('#exampleTable').bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : "/payment/contractApproval/listApproval", // 服务器数据的加载地址
				        clickToSelect: true,
					//	showRefresh : true,
					//	showToggle : true,
					//	showColumns : true,
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
						search : false, // 是否显示搜索框
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								contractIds:$('#contractId').val(),
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
									align : 'center',
									field : 'contractName',
									title : '合同名称'
								}, {
									align : 'center',
									field : 'contractId',
									title : '合同编号'
								}, {
									align : 'center',
									field : 'contractType',
									title : '合同类型'
								}, {
									align : 'center',
									field : 'contractCategory',
									title : '合同种类'
								}, {
									align : 'center',
									field : 'contractTotalPrice',
									title : '合同总金额'
								},{
									align : 'center',
									field : 'contractSalesName',
									title : '销售负责人'
								}, {
									align : 'center',
									field : 'contractCommitTime',
									title : '提交评审时间'
								}
											 ]
					});
// 导入弹出层
        $("button[name=excelinsertbtn]").click(function () {
            layer.open({
					type : 2,
					title :'合同审批导入',
					maxmin : true,
					shadeClose : false, // 点击遮罩关闭层
					area : [ '500px', '70%' ],
					content : prefix + '/import'  // iframe的url
				});
        });
}

//提交审批信息
function save()
{
	var formData="";
	//console.log(formData);
	formData=formData+"&taskId="+$('#taskId').val()
	                 +"&processInstanceId="+$('#processInstanceId').val()
									 +"&contractId="+$('#contractId').val();
	// //工时表批量审批的id
  // formData=formData+"&timesheetId="+('#timesheetId').val();

	formData=formData+"&taskAction="+$('input:radio[name=taskAction]:checked').val()
	                 +"&taskComment="+$('#taskComment').val();
	$.ajax({
		cache : true,
		type : "POST",
		url : "/contract/contract/form/updateAll",//"/contract/travel/form/update",
		data : formData,// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				//parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});
}
//查看流程图
function trace() {
	var processInstanceId=$('#processInstanceId').val();

	layer.open({
		type : 2,
		title : '审批记录',
		maxmin : true,
		shadeClose : false,
		area : [ '1000px', '450px' ],
		content : '/activiti/task/taskTrace/' +processInstanceId
	});

}


// function loadTraceList() {
// 	var processInstanceId=$('#processInstanceId').val();
//
// 	$('#tableTraceList')
// 		.bootstrapTable(
// 			{
// 				method : 'get', // 服务器数据的请求方式 get or post
// 				url :  "/activiti/task/taskTraceList/"+processInstanceId, // 服务器数据的加载地址
// 				// showRefresh : true,
// 				// showToggle : true,
// 				// showColumns : true,
// 				iconSize : 'outline',
// 				toolbar : '#exampleToolbar',
// 				striped : true, // 设置为true会有隔行变色效果
// 				dataType : "json", // 服务器返回的数据类型
// 				pagination : false, // 设置为true会在底部显示分页条
// 				// queryParamsType : "limit",
// 				// //设置为limit则会发送符合RESTFull格式的参数
// 				singleSelect : false, // 设置为true将禁止多选
// 				// contentType : "application/x-www-form-urlencoded",
// 				// //发送到服务器的数据编码类型
// 				pageSize : 50, // 如果设置了分页，每页数据条数
// 				pageNumber : 1, // 如果设置了分布，首页页码
// 				// search : true, // 是否显示搜索框
// 				showColumns : false, // 是否显示内容下拉框（选择显示的列）
// 				sidePagination : "client", // 设置在哪里进行分页，可选值为"client" 或者
// 				// "server"
// 				queryParams : function(params) {
// 					return {
// 						// 说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
// 						limit : params.limit,
// 						offset : params.offset,
// 						name : $('#searchName').val(),
// 					};
// 				},
// 				// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
// 				// queryParamsType = 'limit' ,返回参数必须包含
// 				// limit, offset, search, sort, order 否则, 需要包含:
// 				// pageSize, pageNumber, searchText, sortName,
// 				// sortOrder.
// 				// 返回false将会终止请求
// 				columns : [
//                     {
//                         field : 'assigneeName',
//                         title : '人员',
// 						formatter:function(value,row,index){
//                         	var f =row.assigneeName+'<br>['+row.taskName+']';
//
//                         	return f;
// 						}
//                     },
//                     {
//                         field : 'status',
//                         title : '状态',
// 						formatter:function(value,row,index){
//                         	var f ='['+row.status+']';
//                         	if(row.comment!=null&&row.comment!=''){
//                         		f=f+'<br>'+row.comment+'';
//                         	}
//                         	if(row.endDate!=null){
//                         		f=f+'<br>'+row.endDate;
//                         	}
//                         	return f;
// 						}
//                     }]
// 			});
// }
