var prefixDelivery = "/contract/contractDelivery"
var prefix = "/contract/contract"
$().ready(function() {
	// 附件
	layui.use('upload', function() {
		var upload = layui.upload;
		// 执行实例
		var uploadInst = upload.render({
			elem : '#test1', // 绑定元素
			url : '/common/sysFile/upload', // 上传接口
			size : 1000,
			accept : 'file',
			done : function(r) {
				// alert(r.fileName);
				$("#serviceAttachment").val(r.fileName);
				// layer.msg(r.msg);
				// app.getData();
			},
			error : function(r) {
				layer.msg(r.msg);
			}
		});
	});
	validateRule();
	datetimepicker();
	Contract_ajax();
	loadDeliveryContract();
});
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
				required : icon + "请输入名字"
			}
		}
	})
}

function loadDeliveryContract() {
	$('#deliveryTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefixDelivery + "/list", // 服务器数据的加载地址
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
						//search : true, // 是否显示搜索框
						showColumns : false, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								contractId:$('#contractId').val()
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
									field : 'deliveryId',
									title : '合同交付信息ID'
								},
																{
									field : 'contractId',
									title : '合同编号'
								},
																{
									field : 'deliveryPersonName',
									title : '交付人'
								},
																{
									field : 'deliveryDate',
									title : '交付时间'
								},
																{
									field : 'deliveryContent',
									title : '交付内容'
								},
																{
									field : 'deliveryStatus',
									title : '合同状态'
								},
																{
									field : 'deliveryRmarks',
									title : '备注'
								},
																{
									field : 'deliveryOperator',
									title : '操作人'
								},
																{
									field : 'deliveryOperateTime',
									title : '操作时间'
								}]
					});
}
function reLoad() {
	$('#deliveryTable').bootstrapTable('refresh');
}
function addContractDelivery() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '95%' ],
		content : prefixDelivery + '/addContractDelivery/'+$('#contractId').val() // iframe的url
	});
}
function edit(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '95%' ],
		content : prefixDelivery + '/editContractDelivery/' + id // iframe的url
	});
}
function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefixDelivery+"/remove",
			type : "post",
			data : {
				'deliveryId' : id
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
function batchRemoveContractDelivery() {

	var rows = $('#deliveryTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
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
			ids[i] = row['deliveryId'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefixDelivery + '/batchRemove',
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
$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
// function update() {
// 	$.ajax({
// 		cache : true,
// 		type : "POST",
// 		url : "/contract/contract/update",
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
// 		}
// 	});
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
				required : icon + "请输入名字"
			}
		}
	})
}
/*
 * @param 主表ID
 * 加载可编辑列表公共方法*/
function loadEditTable() {
	// 重置table内数据
	$('#reportTable1').bootstrapTable('destroy');// 这里必须要添加这个销毁，否则新增、修改、查看的切换可编辑列表中的数据可能加载出现问题。

	$('#reportTable1').bootstrapTable({
		method : 'get',
		url : prefix + "/listDic",
		editable : true,// 开启编辑模式
		clickToSelect : true,
		cache : false,
		dataType : "json", // 服务器返回的数据类型
		columns : [ {
			field : "contractName",
			title : "合同名称",
			align : "center",
			edit : {
				required : true,
				type : 'text'
			}
		}, {
			field : "contractId",
			title : "合同编号",
			align : "center",
			edit : {
				type : 'text'
			}
		} ],
		onEditableHidden : function(field, row, $el, reason) { // 当编辑状态被隐藏时触发
			if (reason === 'save') {
				var $td = $el.closest('tr').children();
				$td.eq(-1).html((row.price * row.number).toFixed(2));
				$el.closest('tr').next().find('.editable').editable('show'); // 编辑状态向下一行移动
			} else if (reason === 'nochange') {
				$el.closest('tr').next().find('.editable').editable('show');
			}
		},
		onEditableSave : function(field, row, oldValue, $el) {
			$table = $('#reportTable1').bootstrapTable({});
			$table.bootstrapTable('updateRow', {
				index : row.rowId,
				row : row
			});
		}
	});
}
function operateFormatter1(value, row, index) {
    return [
      "<a class=\"remove\" href='javascript:removeRow("+index+",1)' title=\"删除改行\">",
      "<i class='glyphicon glyphicon-remove'></i>",
      "</a>     "
    ].join('');
  }
function operateFormatter2(value, row, index) {
    return [
      "<a class=\"remove\" href='javascript:removeRow("+index+",2)' title=\"删除改行\">",
      "<i class='glyphicon glyphicon-remove'></i>",
      "</a>     "
    ].join('');
  }

$('#reportTable1', '#reportTable2').on('click', 'td:has(.editable)',
		function(e) {
			// e.preventDefault();
			e.stopPropagation(); // 阻止事件的冒泡行为
			$(this).find('.editable').editable('show'); // 打开被点击单元格的编辑状态
		});

//可编辑列表新增一行
function addRow(mark){
    var rows = [];

    //通过mark来判断为哪个可编辑框创建新一行
    if(mark == 1){
         $('#reportTable1').bootstrapTable('append',rows);
    }else if(mark == 2){
        $('#reportTable2').bootstrapTable('append',rows);
    }
}
//删除指定行
function removeRow(deleteIndex,mark){
    if(mark == "1"){
        $('#reportTable1').bootstrapTable('removeRow', deleteIndex);
    }else if(mark == "2"){
        $('#reportTable2').bootstrapTable('removeRow', deleteIndex);
    }
}
var openDept = function(){
	layer.open({
		type:2,
		title:"选择部门",
		area : [ '300px', '450px' ],
		content:"/system/sysDept/treeView"
	})
}
function loadDept( deptId,deptName){
	$("#deptId").val(deptId);
	$("#employeeDept").val(deptName);
}
function datetimepicker() {
	// 交付时间
	$('#deliveryDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
	// 提交评审时间
	$('#contractCommitTime').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}
function datetimepickerService() {
	// 付款计划时间
	$('#payableDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
	// 收款计划时间
	$('#receivableDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
	// 计划交付时间
	$('#planDeliveryDate').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}
// 修改数据绑定
function Contract_ajax(){
	$.ajax({
		url : prefix + '/edit_ajax/' + $("#contractId").val(),
		type : "get",
		data : {
			'contractId' : $("#contractId").val(),
		},
		success : function(data) {
			result = data.contract;
 			$("input[name='contractName']").val(result.contractName);
 			$("input[name='contractBuildCompany']").val(result.contractBuildCompany);
 			$("input[name='contractTotalPrice']").val(result.contractTotalPrice);
 			$("input[name='contractDraftPerson']").val(result.contractDraftPerson);
 			$("input[name='employeeDept']").val(result.employeeDept);
			$("input[name='contractCommitTime']").val(result.contractCommitTime);
			$("input[name='contractInvoiceTime']").val(result.contractInvoiceTime);
 			$("textarea[name='contractRemarks']").val(result.contractRemarks);
 			// 关联合同名称
			loadCrmDataValue("/contract/contract/listDic", "contractRelatedId",result.contractRelatedId);
			// 项目名称
			loadCrmDataValue("/sales/salesProject/listDic", "projectId",result.projectId);
			// 客户名称
			loadCrmDataValue("/sales/companyCustomer/listDic", "customerId",result.customerId);
			// 业务名称
			loadCrmDataValue("/sales/business/listDic", "businessId",result.businessId);
			// 申请人姓名(员工表)
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "contractApplicantName",result.contractApplicantName);
			// 业务发起人(员工表)
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "contractApplicant",result.contractApplicant);
			// 销售负责人(员工表)
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "contractSales",result.contractSales);
			// 岗位(内部)
			loadCrmDataValue("/inner/orgJob/listDic", "jobId",result.jobId);
			// 合同类型
			loadDicValue("contract_Contract_Type", "contractType",result.contractType);
			// 合同种类
			loadDicValue("contract_Contract_Category", "contractCategory",result.contractCategory);
			// 发票类型
			loadDicValue("Contract_Invoice_Type", "contractInvoiceType",result.contractInvoiceType);
		}
	});
}
