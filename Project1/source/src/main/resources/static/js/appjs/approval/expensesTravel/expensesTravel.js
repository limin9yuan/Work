
var prefix = "/approval/expensesTravel"
$(function() {
//	loadCrmData("/project/project/listDic","projectId");
	loadCrmData("/sales/salesProject/listAllDic","projectId");
	load();
	datetimepicker();
	validateRule();
});
$.validator.addMethod("compareDate",function(value,element){
				var assigntime = $("#start").val();
                var deadlinetime = $("#end").val();
                var reg = new RegExp('-','g');
                assigntime = assigntime.replace(reg,'/');//正则替换
                deadlinetime = deadlinetime.replace(reg,'/');
                assigntime = new Date(parseInt(Date.parse(assigntime),10));
                deadlinetime = new Date(parseInt(Date.parse(deadlinetime),10));
                if(assigntime>deadlinetime){
                    return false;
                }else{
                    return true;
                }
},"<font color='#E47068'>结束日期必须大于开始日期</font>");

function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
			rules : {
				expensesTravelCreateTime : {
					compareDate: true
				},
				expensesTravelOptTime : {
					compareDate: true
				}
			},
			messages : {
				expensesTravelCreateTime : {
					compareDate : icon + "开始时间不能大于结束时间"
				},
				expensesTravelOptTime : {
					compareDate : icon + "开始时间不能大于结束时间"
				}
			}
	})
}
function resetSelect(){
	$('#expensesTravelCreateTime').data('date','');
	$('#expensesTravelOptTime').data('date','');
	$("#projectId").val("");
	$("#projectId").trigger("chosen:updated"); //回到初始状态
}
function datetimepicker(){
	//开始时间(创建时间)
	$('#expensesTravelCreateTime').datetimepicker({
		format:'YYYY-MM-DD',
		locale:moment.locale('zh-cn')
	});
	//结束时间(最后修改时间)
	$('#expensesTravelOptTime').datetimepicker({
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
						showRefresh:true,// 显示刷新按钮
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								expensesTravelId:$("#expensesTravelId").val(),
								expensesTravelName:$("#expensesTravelName").val(),
								projectId:$("#projectId").val(),
								expensesTravelCreateTime:$("#expensesTravelCreateTime").data('date'),
								expensesTravelOptTime:$("#expensesTravelOptTime").data('date'),
								assigneeName:$("#assigneeName").val()
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
										var a='<div style="width:110px"></div>'
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="edit(\''
												+ row.expensesTravelId
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
												+ row.expensesTravelId
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-success btn-sm" href="#" title="查看"  mce_href="#" onclick="examine(\''
												+ row.expensesTravelId
												+ '\')"><i class="fa fa-search"></i></a> ';
										return  a+f+e + d ;
									}
								},
																{
									align : 'center',
									formatter : function(value, row, index) {
										if (row.expensesTravelStatus != null) {
											var a = '<a href="#" mce_href="#"  onclick="taskTrace(\''
											+ row.processInstanceId
											+ '\')">'
											+ row.expensesTravelStatus + '</a> ';
											return a;
										}
									},
									// field : 'expensesTravelStatus',
									title : '审批状态'
								},
																{
									align : 'center',
									field : 'expensesTravelId',
									title : '报销申请编号'
								},
																{
									align : 'center',
									field : 'customerId',
									title : '企业客户编号'
								},
																{
									align : 'center',
									field : 'businessId',
									title : '业务编号'
								},
																{
									align : 'center',
									field : 'projectId',
									title : '项目编号'
								},
																{
									align : 'center',
									field : 'expensesTravelName',
									title : '申请人姓名'
								},
																{
									align : 'center',
									field : 'expensesTravelTask',
									title : '出差任务'
								},
																{
									align : 'center',
									field : 'expensesTravelAllowance',
									title : '出差补助'
								},
																{
									align : 'center',
									field : 'expensesTravelType',
									title : '其他费用类型'
								},
																{
									align : 'center',
									field : 'expensesTravelPrice',
									title : '其他费用金额'
								},
																{
									align : 'center',
									field : 'expensesTravelTid',
									title : '关联出差申请人姓名'
								},
																{
									align : 'center',
									field : 'expensesTravelPayid',
									title : '关联请款申请人姓名'
								},
																{
									align : 'center',
									field : 'expensesTravelPayPrice',
									title : '预借金额'
								},
																{
									align : 'center',
									field : 'expensesTravelPayMode',
									title : '结算方式'
								},
																{
									align : 'center',
									field : 'expensesTravelBank',
									title : '收款人银行'
								},
																{
									align : 'center',
									field : 'expensesTravelCardNum',
									title : '卡号'
								},
																{
									align : 'center',
									field : 'expensesTravelRemarks',
									title : '备注'
								},
																{
									field : 'expensesTravelOperator',
									title : '操作人'
								},
																{
									align : 'center',
									field : 'expensesTravelOptTime',
									title : '修改时间'
								},
//																{
//									field : 'expensesTravelCreator',
//									title : '创建人'
//								},
																{
									align : 'center',
									field : 'expensesTravelCreateTime',
									title : '创建时间'
								}
															 ]
					});
	// 页面导入按钮点击事件
	$("button[name=excelinsertbtn]").click(function () {
	    layer.open({
				type : 2,
				title :'导入',
				maxmin : true,
				shadeClose : false, // 点击遮罩关闭层
				area : [ '400px', '55%' ],
				content : prefix + '/import'  // iframe的url
			});

	})
}
function taskTrace(processInstanceId){
	parent.layer.open({
		type : 2,
		title : '流程跟踪',
		maxmin : true,
		shadeClose : false,
		area : [ '95%', '95%'],
		content : '/activiti/task/taskTrace/'+processInstanceId
	});
}
function reLoad() {

	$('#exampleTable').bootstrapTable('refresh');
}
function examine(id) {
	parent.layer.open({
		type : 2,
		title : '查看信息',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
		content : prefix + '/examine/' + id
	});
}
function add() {
	parent.layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
		content : prefix + '/add' // iframe的url
	});
}
function edit(id) {
	parent.layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
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
				'expensesTravelId' : id
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
			ids[i] = row['expensesTravelId'];
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
