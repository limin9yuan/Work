
var prefix = "/contract/travel"
$(function() {
	loadCrmData("/sales/salesProject/listDic","projectId");
	load();
	datetimepicker();
});
function datetimepicker(){
	//开始时间(创建时间)
	$('#travelCreateTime').datetimepicker({
		format:'YYYY-MM-DD',
		locale:moment.locale('zh-cn')
	});
	//结束时间(最后修改时间)
	$('#travelOperateTime').datetimepicker({
		format:'YYYY-MM-DD',
		locale:moment.locale('zh-cn')
	});
}
function load() {
	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/list", // 服务器数据的加载地址
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
								travelOperateTime:$("#travelOperateTime").data('date'),
								travelCreateTime:$("#travelCreateTime").data('date'),
								travelName:$("#travelName").val(),
								projectId:$("#projectId").val()

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
								},
								{
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var a ='<div style="width:110px"></div>'
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.travelId
												+ '\')"><i class="fa fa-edit"></i></a> ';
									var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ row.travelId
												+ '\')"><i class="fa fa-remove"></i></a> ';
										// var f = '<a class="btn btn-success btn-sm" href="#" title="跟踪流程"  mce_href="#" onclick="taskTrace(\''
										// 	+ +row.processInstanceId
										// 		+ '\')"><i class="fa fa-external-link"></i></a> ';
										return  a + e + d;
									}
								},
																{
									align : 'center',
									formatter : function(value, row, index) {
										if (row.travelApprovalStatus != null) {
											var a = '<a href="#" mce_href="#"  onclick="taskTrace(\''
											+ row.processInstanceId
											+ '\')">'
											+ row.travelApprovalStatus + '</a> ';
											return a;
										}
									},


									// field : 'travelApprovalStatus',
									title : '审批状态'
								},
																{
									align : 'center',
									field : 'travelId',
									title : '出差申请编号'
								},
																{
									align : 'center',
									field : 'customerId',
									title : '企业客户编号'
								},
																{
									align : 'center',
									field : 'projectId',
									title : '项目编号'
								},
																{
									align : 'center',
									field : 'businessId',
									title : '业务编号'
								},
																{
									align : 'center',
									field : 'travelName',
									title : '出差人姓名'
								},
																{
									align : 'center',
									field : 'travelPlaceIssue',
									title : '出发地'
								},
																{
									align : 'center',
									field : 'travelPlaceEnded',
									title : '目的地'
								},
																{
									align : 'center',
									field : 'travelPartner',
									title : '同行人'
								},
																{
									align : 'center',
									field : 'travelDepartureDate',
									title : '拟出差时间'
								},
																{
									align : 'center',
									field : 'travelReturnDate',
									title : '拟返程时间'
								},
																{
									align : 'center',
									field : 'travelPlanCostType',
									title : '预计费用类别'
								},
																{
									align : 'center',
									field : 'travelVisitMode',
									title : '预计交通方式'
								},
																{
									align : 'center',
									field : 'travelPlanTask',
									title : '计划任务信息'
								},
																{
									align : 'center',
									field : 'travelActualPerformance',
									title : '实际完成结果'
								},
																{
									align : 'center',
									field : 'travelUncompletedCause',
									title : '未完成原因'
								},
																{
									align : 'center',
									field : 'travelTaskConfirm',
									title : '出差任务确认'
								},

																{
									align : 'center',
									field : 'travelOperator',
									title : '操作人'
								},
																{
									align : 'center',
									field : 'travelOperateTime',
									title : '修改时间'
								},
																{
									align : 'center',
									field : 'travelCreateTime',
									title : '创建时间'
								}
															]
					});
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
function add() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '95%' ],
		content : prefix + '/add' // iframe的url
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '95%' ],
		content : prefix + '/edit/' + id // iframe的url
	});
}
function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix+"/remove",
			type : "post",
			data : {
				'travelId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

function resetPwd(id) {
}
function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['travelId'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}

function taskTrace(processInstanceId){
	layer.open({
		type : 2,
		title : '流程跟踪',
		maxmin : true,
		shadeClose : false,
		area : [ '95%', '95%'],
		content : '/activiti/task/taskTrace/'+processInstanceId
	});
}
