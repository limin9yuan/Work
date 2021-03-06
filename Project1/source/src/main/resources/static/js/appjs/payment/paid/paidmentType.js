var prefixpurchase = "/payment/purchaseManagement"
var prefixcontract = "/contract/contract"
$(function() {
	loadPurchase();
	loadContract();
});

function loadPurchase() {
	$('#purchaseTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefixpurchase + "/list", // 服务器数据的加载地址
					//	showRefresh : true,
					//	showToggle : true,
					//	showColumns : true,
						iconSize : 'outline',
						toolbar : '#purchaseToolbar',
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
								offset:params.offset					           // name:$('#searchName').val(),
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
									field : 'purchaseId', 
									title : '采购编号' 
								},{
									field : 'projectId', 
									title : '项目编号' 
								},{
									field : 'projectName', 
									title : '项目名称' 
								},{
									field : 'purchasePersonName', 
									title : '采购人' 
								},{
									field : 'purchaseTime', 
									title : '采购时间' 
								},{
									field : 'purchaseName', 
									title : '物品名称' 
								},{
									field : 'purchaseNumber', 
									title : '数量' 
								},{
									field : 'purchaseTotalPrice', 
									title : '总计' 
								},{
									field : 'purchaseFulfilmentStatus', 
									title : '发货情况' 
								},{
									field : 'purchaseOperatorName', 
									title : '申请人员' 
								}
																 ]
					});
}

function getPurchase() {
	var rows = $('#purchaseTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length != 1) {
		layer.msg("请选择一条采购记录");
		return;
	}

    // 遍历所有选择的行数据，取每条数据对应的ID
    $.each(rows, function(i, row) {
    	//alert(row['purchaseId']);
        $("#purchaseId",window.parent.document).val(row['purchaseId']);
        $("#paidAccountPrice",window.parent.document).val(row['purchaseTotalPrice']);
    });
    //alert(purchaseIds.text);
    closeWin();
}

function loadContract() {
	$('#contractTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefixcontract + "/list", // 服务器数据的加载地址
					//	showRefresh : true,
					//	showToggle : true,
					//	showColumns : true,
						iconSize : 'outline',
						toolbar : '#contractToolbar',
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
									title : '合同审批状态'
								},{
									field : 'contractName',
									title : '合同名称'
								}, {
									field : 'contractId',
									title : '合同编号'
								}, {
									field : 'contractType',
									title : '合同类型'
								}, {
									field : 'contractCategory',
									title : '合同种类'
								}, {
									field : 'contractTotalPrice',
									title : '合同总金额'
								},{
									field : 'contractSales',
									title : '销售负责人'
								}, {
									field : 'contractCommitTime',
									title : '提交评审时间'
								}
											 ]
					});
}
function getContract() {
	var rows = $('#contractTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length != 1) {
		layer.msg("请选择一条合同记录");
		return;
	}
	// var isCopyPerson = 2;
    // 遍历所有选择的行数据，取每条数据对应的ID
    $.each(rows, function(i, row) {
        $("#purchaseId",window.parent.document).val(row['contractId']);
        $("#paidAccountPrice",window.parent.document).val(row['contractTotalPrice']);
    });
    closeWin();
}
function addPurchase() {
	layer.open({
		type : 2,
		title : '增加采购',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '950px', '95%' ],
		content :'/payment/paid/purchaseType' // iframe的url
	});
}
function addContract() {
	layer.open({
		type : 2,
		title : '增加合同',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '950px', '95%' ],
		content : '/payment/paid/contractType' // iframe的url
	});
}
