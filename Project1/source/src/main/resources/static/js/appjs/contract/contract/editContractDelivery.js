var prefix = "/contract/contract";
var prefixDelivery = "/contract/contractDelivery";
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
	contractDelivery_ajax();
});
$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/contract/contractDelivery/updateEditContractDelivery",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				parent.reLoad();
				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
				parent.layer.close(index);

			} else {
				parent.layer.alert(data.msg)
			}
		}
	});
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
			rules : {
				deliveryPersonName : {
					required : true,
				},
				deliveryContent : {
					required : true,
					rangelength:[1,1000]
				},
				deliveryDate : {
					required : true,
				},
				deliveryStatus : {
					required : true,
				},
				deliveryRmarks : {
					rangelength:[1,200]
				}
			},
			messages : {
				deliveryPersonName : {
					required : icon + "交付人不能为空",
				},
				deliveryContent : {
					required : icon + "交付内容不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 1000 之间的字符串"
				},
				deliveryDate : {
					required : icon + "交付时间不能为空",
				},
				deliveryStatus : {
					required : icon + "合同状态不能为空",

				},
				deliveryRmarks : {
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"
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
//修改数据绑定（交付管理）
function contractDelivery_ajax(){
	$.ajax({
		url : prefixDelivery + '/edit_ajax/' + $("#deliveryId").val(),
		type : "get",
		data : {
			'deliveryId' : $("#deliveryId").val(),
		},
		success : function (data) {
			result = data.contractDelivery;
			$("select[name='deliveryPersonName']").val(result.deliveryPersonName);
			$("Select[name='deliveryPersonName']").trigger("chosen:updated");
			$(":radio[name='deliveryStatus'][value='" + result.deliveryStatus + "']").prop("checked", "checked");
			$("input[name='contractId']").val(result.contractId);
			$("input[name='deliveryDate']").val(result.deliveryDate);
			$("input[name='deliveryOperator']").val(result.deliveryOperator);
			$("input[name='deliveryOperateTime']").val(result.deliveryOperateTime);
			$("textarea[name='deliveryContent']").val(result.deliveryContent);
			$("textarea[name='deliveryRmarks']").val(result.deliveryRmarks);
			// // 交付人
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "deliveryPersonName", result.deliveryPersonName);
		}
	});
}
