var prefix = "/budget/budget"
var prefixLabor = "/budget/labor"


function loadLabor() {
	$('#laborTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefixLabor + "/list", // 服务器数据的加载地址
					//	showRefresh : true,
					//	showToggle : true,
					//	showColumns : true,
						iconSize : 'outline',
						toolbar : '#laborToolbar',
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
								//budgetId: $("#budgetId").val()
								budgetId: $("#budgetId").val()==undefined ? $("#relsultBudgetId").val():$("#budgetId").val()
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
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="editLabor(\''
												+ row.laborId
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="removeLabor(\''
												+ row.laborId
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
												+ row.laborId
												+ '\')"><i class="fa fa-key"></i></a> ';
										return e + d ;
									}
								},{
									field : 'employeeId', 
									title : '员工编号' 
								},{
									field : 'laborBeginTime', 
									title : '投入开始时间' 
								},{
									field : 'laborEndTime', 
									title : '投入结束时间' 
								},{
									field : 'laborTotalDayNum', 
									title : '合计天数' 
								},{
									field : 'laborRate', 
									title : '投入百分比' 
								},{
									field : 'laborTotalHourNum', 
									title : '合计工时数' 
								},{
									field : 'laborTotalCost', 
									title : '人工成本合计' 
								},{
									field : 'laborRemarks', 
									title : '备注' 
								}/*,
																{
									field : 'laborOperator', 
									title : '操作人' 
								},
																{
									field : 'laborOperateTime', 
									title : '操作时间' 
								},*/
																 ]
					});
}
function reLoadLabor() {
	$('#laborTable').bootstrapTable('refresh');
}
function addLabor() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '900px', '95%' ],
		//content : prefix + '/add' // iframe的url
		content : prefixLabor + '/add/'+$('#budgetId').val() // iframe的url
	});
}
function editLabor(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '900px', '95%' ],
		content : prefixLabor + '/edit/' + id // iframe的url
	});
}
function removeLabor(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefixLabor+"/remove",
			type : "post",
			data : {
				'laborId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoadLabor();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

function resetPwd(id) {
}
function batchRemoveLabor() {
	var rows = $('#laborTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
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
			ids[i] = row['laborId'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefixLabor + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoadLabor();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
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
			field : "budgetId",
			title : "项目预算编号",
			align : "center",
			edit : {
				//required : true,
				type : 'text'
			}
		}],
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
