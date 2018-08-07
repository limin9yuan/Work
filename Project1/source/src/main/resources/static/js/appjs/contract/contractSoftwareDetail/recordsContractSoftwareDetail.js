
var prefix = "/contract/additionalRecords"
$(function() {
	load();
});

function load() {
	var tmpCustomerId = $("#recordId", window.parent.document).val() == undefined ? 
			$("#recordId", window.parent.document).val() : $("#recordId", window.parent.document).val()
				$('#recordId').val(tmpCustomerId);
//			alert(tmpCustomerId);
	$("#recordContractSoftwareDetail")
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/listR/"+tmpCustomerId, // 服务器数据的加载地址
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
						showRefresh:true,					// 显示刷新按钮
						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						search : false, // 是否显示搜索框
						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset
//								contractId:$('#contractId').val()
							};
						},
						// //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
						// queryParamsType = 'limit' ,返回参数必须包含
						// limit, offset, search, sort, order 否则, 需要包含:
						// pageSize, pageNumber, searchText, sortName,
						// sortOrder.
						// 返回false将会终止请求
						columns : [
//								{
//									checkbox : true
//								},{
//									title : '操作',
//									field : 'id',
//									align : 'center',
//									formatter : function(value, row, index) {
//										var e = '<a class="btn btn-success" href="#" mce_href="#" title="查看" onclick="editContractHardwareDetail(\''
//												+ row.feedbackId
//												+ '\')"><i class="fa fa-search"></i></a> ';
////										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
////												+ row.feedbackId
////												+ '\')"><i class="fa fa-remove"></i></a> ';
////										var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
////												+ row.feedbackId
////												+ '\')"><i class="fa fa-key"></i></a> ';
//										return e ;
//									}
//								},
							{
								align : 'center',
								field : 'softwareDetailId', 
								title : '软件功能编号' 
							},{
								align : 'center',
								field : 'contractId', 
								title : '合同编号' 
							},{
								align : 'center',
								field : 'softwareDetailSystem', 
								title : '系统' 
							},{
								align : 'center',
								field : 'softwareDetailModel', 
								title : '模块' 
							},{
								align : 'center',
								field : 'softwareDetailCreationTime', 
								title : '创建时间' 
							},{
								align : 'center',
								field : 'softwareDetailOperator', 
								title : '操作人' 
							},
															 ]
				});
}























