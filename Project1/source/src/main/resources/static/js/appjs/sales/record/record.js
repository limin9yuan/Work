
var prefix = "/sales/record"
$(function() {
	load();
	loadCrmData("/project/project/listDic","projectId","全部");
	loadCrmData("/sales/companyCustomer/listDic","customerId","全部");
	loadCrmData("/sales/business/listDic","businessId","全部");
});
function resetSelect(){
	$("#projectId").val("");
	$("#projectId").trigger("chosen:updated"); //回到初始状态
	$("#customerId").val("");
	$("#customerId").trigger("chosen:updated"); //回到初始状态
	$("#businessId").val("");
	$("#businessId").trigger("chosen:updated"); //回到初始状态

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
						showRefresh:true,					// 显示刷新按钮
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								projectId:$('#projectId').val(),
								customerId:$('#customerId').val(),
								businessId:$('#businessId').val(),
								recordExecutor:$('#recordExecutor').val()
					            //username:$('#searchName').val()
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
									width : '130px',
									title : '操作',
									field : 'id',
									align : 'center',
									formatter : function(value, row, index) {
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.recordId
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ row.recordId
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-success btn-sm'+s_see_h+'"href="#" title="查看"  mce_href="#" onclick="see(\''
												+ row.recordId
												+ '\')"><i class="fa fa-search"></i></a> ';
										return f + e + d;
									}
								},
																{
									align : 'center',
									width : '130px',
									field : 'recordId',
									title : '行动记录编号'
								},{
									align : 'center',
									width : '130px',
									field : 'recordCreateTime',
									title : '首次保存时间'
								},{
									align : 'center',
									width : '130px',
									field : 'recordOperateTime',
									title : '最后一次保存时间'
								},{
									align : 'center',
									width : '130px',
									field : 'recordCustomerName',
									title : '客户名称'
								},{
									align : 'center',
									width : '130px',
									field : 'recordBusinessName',
									title : '业务名称'
								},
//								{
//									width : '130px',
//									field : 'projectId',
//									title : '项目编号'
//								},
								{
									align : 'center',
									width : '130px',
									field : 'projectId',
									title : '项目名称'
								},{
									align : 'center',
									width : '130px',
									field : 'recordName',
									title : '行动主题'
								},{
									align : 'center',
									width : '130px',
									field : 'recordPhase',
									title : '阶段'
								},{
									align : 'center',
									width : '130px',
									field : 'recordExpenseActual',
									title : '实际费用'
								},{
									align : 'center',
									width : '130px',
									field : 'recordExecutorName',
									title : '执行人'
								},{
									align : 'center',
									width : '130px',
									field : 'recordExecuteStatus',
									title : '执行状态'
								}
																 ]
					});
	 // 页面导入按钮点击事件
    $("button[name=excelinsertbtn]").click(function () {
        parent.layer.open({
				type : 2,
				title :'Excel导入',
				maxmin : true,
				shadeClose : false, // 点击遮罩关闭层
				area : [ '500px', '250px' ],
				content : prefix + '/import'  // iframe的url
			});

    })
    // 导入弹出框返回按钮tab_excelinsertQuitbtn
    $("div[name='record_window'] button[name='tab_excelinsertQuitbtn']").click(function () {
        $("div[name='record_window']").modal('hide')
    })
}
function reLoad() {
	$('#exampleTable').bootstrapTable('refresh');
}
//————查看
function see(id) {
	parent.layer.open({
		type : 2,
		title : '查看',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '75%', '95%' ],
		content : prefix + '/see/' + id
	});
}
function add() {
	parent.layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '75%', '95%' ],
		content : prefix + '/add' // iframe的url
	});
}
function edit(id) {
	parent.layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '75%', '95%' ],
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
				'recordId' : id
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
			ids[i] = row['recordId'];
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
