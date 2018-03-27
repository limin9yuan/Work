var prefixDetailed_information = "/payment/projectExpenditure"
$(function() {
	// // 客户名称
	// loadCrmData("/sales/companyCustomer/listDic", "customerId");
	// // 项目主管
	// loadCrmData("/payment/projectExpenditure/listDic", "projectOwner");
	// // 项目经理
	// loadCrmData("/payment/projectExpenditure/listDicManager", "projectManager");
	// // 业务名称
	// loadCrmData("/sales/business/listDic", "businessId");

	// 参与中心(部门)
// 	loadCrmData("/inner/innerOrgEmployee/listDic", "responsibleCenter");
			// 选项卡 上一页 下一页
			$('#myTab a[href="#detailed_information"]').on('shown.bs.tab', function(e){
				 $('#lastBtn').attr("disabled",true);
				 $('#nextBtn').attr("disabled",false);
			 });
			$('#myTab a[href="#labor_cost"]').on('shown.bs.tab', function(e) {
				 $('#lastBtn').attr("disabled",false);
				 $('#nextBtn').attr("disabled",false);
			 });
			 $('#myTab a[href="#details_of_reimbursement"]').on('shown.bs.tab', function(e){
				 $('#lastBtn').attr("disabled",false);
				 $('#nextBtn').attr("disabled",false);
			 });
			 $('#myTab a[href="#details_of_procurement"]').on('shown.bs.tab', function(e){
				 $('#lastBtn').attr("disabled",false);
				 $('#nextBtn').attr("disabled",false);
			 });
			 $('#myTab a[href="#summary_of_income_and_expenditure"]').on('shown.bs.tab', function(e){
				 $('#lastBtn').attr("disabled",false);
				 $('#nextBtn').attr("disabled",true);
			 });
	projectBeginDate();
	projectEndDate();
	loadLabor();
	loadDetailed_information();
});

function loadLabor() {
	$('#detailed_informationTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefixDetailed_information + "/list", // 服务器数据的加载地址
					//	showRefresh : true,
					//	showToggle : true,
					//	showColumns : true,
						iconSize : 'outline',
						toolbar : '#detailed_informationToolbar',
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
						//search : true, // 是否显示搜索框
						showColumns : false, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset
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
									field : 'laborId',
									title : '项目人力安排编号'
								},
																{
									field : 'budgetId',
									title : '项目预算编号'
								},
																{
									field : 'employeeId',
									title : '员工编号'
								},
																{
									field : 'laborBeginTime',
									title : '投入开始时间'
								},
																{
									field : 'laborEndTime',
									title : '投入结束时间'
								},
																{
									field : 'laborTotalDayNum',
									title : '合计天数'
								},
																{
									field : 'laborRate',
									title : '投入百分比'
								},
																{
									field : 'laborTotalHourNum',
									title : '合计工时数'
								},
																{
									field : 'laborTotalCost',
									title : '人工成本合计'
								},
																{
									field : 'laborRemarks',
									title : '备注'
								},
																{
									field : 'laborOperator',
									title : '操作人'
								},
																{
									field : 'laborOperateTime',
									title : '操作时间'
								}]
					});
}
// 导出
function exportData(){
	projectExpenditureForm.projectManager.value = $('#projectManager').val();
	projectExpenditureForm.projectSales.value = $('#projectSales').val();
	projectExpenditureForm.projectId.value = $('#projectId').val();
	projectExpenditureForm.contractApplicantName.value = $('#contractApplicantName').val();
	$("#projectExpenditureForm").submit();
}
function reLoadDetailed_information() {
	$('#detailed_informationTable').bootstrapTable('refresh');
}

function addDetailed_informationTable() {
	parent.layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
		content : prefixDetailed_information + '/add' // iframe的url
	});
}

function editDetailed_information(id) {
	parent.layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
		content : prefixDetailed_information + '/edit/' + id // iframe的url
	});
}

// 详细信息
function detailed_information(){
	parent.layer.open({
		type : 2,
		title : '详细信息',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
		content : prefixDetailed_information + '/detailed_information/'// iframe的url
	});
}

function removeDetailed_information(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefixDetailed_information+"/remove",
			type : "post",
			data : {
				'projectId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoadDetailed_information();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

function resetPwd(id) {
}

function batchRemoveDetailed_information() {
	var rows = $('#detailed_informationTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
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
			ids[i] = row['contractId'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefixDetailed_information + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoadDetailed_information();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}

// 项目开始时间
function projectBeginDate() {
	$('#projectBeginDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}

// 项目结束时间
function projectEndDate() {
	$('#projectEndDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}

function loadDetailed_information() {
	$.ajax({
		url : prefixDetailed_information + '/detailed_information_ajax/' + $("#paramProjectId").val(),
		type : "get",
		data : {
			'projectId' : $("#paramProjectId").val(),
		},
		success : function(data) {
			var result = data.project;
			/* 项目名称 自加载 */
			loadCrmDataValue("/project/project/listDic", "projectId",$("#paramProjectId").val());
			$("textarea[name='projectDescription']").val(result.projectDescription);
			$("input[name='budgetProfitRate']").val(result.budgetProfitRate);
			$("input[name='projectBeginDate']").val(result.projectBeginDate);
			$("input[name='projectEndDate']").val(result.projectEndDate);
			// 客户名称
			loadCrmDataValue("/sales/companyCustomer/listDic", "customerId", result.customerId);
			// 项目主管
			loadCrmDataValue("/payment/projectExpenditure/listDic", "projectOwner", result.projectOwner);
			// 项目经理
			loadCrmDataValue("/payment/projectExpenditure/listDicManager", "projectManager", result.projectManager);
			// 业务名称
			loadCrmDataValue("/sales/business/listDic", "businessId", result.businessId);
		}
	});
}
