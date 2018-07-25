var prefix = "/contract/contract";
$().ready(function() {
	// // 项目名称
	// loadCrmData("/sales/salesProject/listAllDic", "projectId");
	// 客户名称
	loadCrmData("/sales/companyCustomer/listDic", "customerId");
	// 业务名称
	loadCrmData("/sales/business/listDic", "businessId");
	// 申请人姓名(员工表)
	loadCrmData("/inner/innerOrgEmployee/listDic", "contractApplicantName");
	// 业务发起人(员工表)
	loadCrmData("/inner/innerOrgEmployee/listDic", "contractApplicant");
	// 销售负责人
	loadCrmData("/inner/innerOrgEmployee/listDic", "contractSales");
	// 岗位(内部)
	loadCrmData("/inner/orgJob/listDic", "jobId");
	// 关联合同名称
	loadCrmData("/contract/contract/listDic", "contractRelatedId");
	// 合同类型
	loadDic("contract_Contract_Type", "contractType");
	// 合同种类
	loadDic("contract_Contract_Category", "contractCategory");
	// 发票类型
	loadDic("contract_invoice_type", "contractInvoiceType");
	/**
	 * 基本信息
	 */
			validateRule();
			datetimepicker();
			loadEditTable();
			loadSalesProject();

	// 附件
	layui.use('upload', function() {
		var upload = layui.upload;
		// 执行实例
		var uploadInst = upload.render({
			elem : '#test1', // 绑定元素
			url : '/contract/contract/upload', // 上传接口
			size : 1000,
			accept : 'file',
			done : function(r) {
				if (r.code == 0) {
	 				if (r.contractAttachment > 0) {
	 					$('#ids').val(r.contractAttachment);
	 					$('#contractAttachment').val(r.contractAttachment+','+document.getElementById("contractAttachment").value);
	 				}
	 				parent.layer.msg(r.msg);
//					 app.getData();

	 			} else {
	 				parent.layer.alert(r.msg)
	 			}
			}

		});
	});

	//硬件明细
	layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#fileTest2', //绑定元素
            url: '/contract/contract/hardwareDetail', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
            	//alert(r.fileName);
            	$("#hardwareDetailFile").val(r.fileName);
                parent.layer.msg(r.msg);
                //app.getData();
            },
            error: function (r) {
            	parent.layer.msg(r.msg);
            }
        });
    });
	//软件明细
	layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#fileTest3', //绑定元素
            url: '/contract/contract/softwareDetail', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
            	//alert(r.fileName);
            	$("#softwaresetailFile").val(r.fileName);
                parent.layer.msg(r.msg);
                //app.getData();
            },
            error: function (r) {
            	parent.layer.msg(r.msg);
            }
        });
    });

});
$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function loadSalesProject() {
	$('#salesProject')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url :"/sales/salesProject/list", // 服务器数据的加载地址
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

						sorStable : true, 					 // 是否启用排序
						sortOrder : "desc",// 排序方式
						sortName:"Project_ID",

						pageSize : 10, // 如果设置了分页，每页数据条数
						pageNumber : 1, // 如果设置了分布，首页页码
						search : false, // 是否显示搜索框
						showColumns : true, // 是否显示内容下拉框（选择显示的列）列表配置显示
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							//alert($('#province').val()+$('#city').val()+$('#area').val());
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
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
									width : '130px',
									field : 'projectName',
									title : '项目名称'
								},{
									sortable : true,
									width : '130px',
									field : 'projectCreateTime',
									title : '首次保存时间'
								},{
									sortable : true,
									width : '130px',
									field : 'projectOperateTime',
									title : '最后一次保存时间'
								},{
									width : '130px',
									field : 'projectCreatorName',
									title : '创建人'
								},
								{
									width : '130px',
									field:'projectOperator',
									title:'操作人'
								},
								{
									width : '130px',
									field : 'projectBusiness',
									title : '业务编号'
								},{
									width : '130px',
									field : 'projectBusinesName',
									title : '业务名称'
								},{
									width : '130px',
									field : 'projectSalesName',
									title : '销售负责人'
								},{
									width : '130px',
									field : 'projectManagerName',
									title : '售前经理'
								},{
									width : '130px',
									field : 'projectBeginDate',
									title : '项目开始时间'
								},{
									width : '130px',
									field : 'projectEndDate',
									title : '项目结束时间'
								},{
									width : '130px',
									field : 'projectGategory',
									title : '项目类型'
								},{
									width : '130px',
									field : 'projectPhase',
									title : '项目阶段'
								}
																 ]
					});
}
function pickMultiProjects() {
	var rows = $('#salesProject').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择项目");
		return;
	}
    var projectIds="";
	// var isMainPerson = 1;
    // 遍历所有选择的行数据，取每条数据对应的ID
    $.each(rows, function(i, row) {
        var projectDiv = row['projectId']+"_1";
		var projectId = $("#projectId",window.parent.document).val();
		var flag = 0;
		var arrayIds = projectId.split(",");
		for (var i = 0; i < arrayIds.length; i++) {
			if (arrayIds[i] == row['projectId']) {
					flag = 1;
					break;

			}
		}
		if (flag == 0){
			if(projectIds==""){
	            projectIds = row['projectId'];
	        }else{
	            projectIds = projectIds+","+row['projectId'];
	        }
			// $("#sendPerson",window.parent.document).append("<div class='personDiv' id=" +
			// sendDiv +" onclick='deleteMainPerson(\"" + sendDiv +"\" )'>"
			// 						+ row['employeeName'] +"</div>");
			$("#multiProjects",window.parent.document).append("<div class='projectDiv' id=" +
			projectDiv +">"+ row['projectId']+" "+ row['projectName']+"<div style='float:right;margin-top:-8px;margin-right:5px'><img id=" +projectDiv +" onclick='deleteMultiProjects(\"" + projectDiv +"\" )' src='../../../img/close.png'></div>"
									 +"</div>");

		}
    });

    // //子窗口给父窗口元素赋值
	if(projectIds!=""){
		var newProjectId=$("#projectId",window.parent.document).val()==""
						?projectIds
						:($("#projectId",window.parent.document).val()+","+projectIds);
		$("#projectId",window.parent.document).val(newProjectId);
	}
    closeWin();
}
function deleteMultiProjects(id) {
    $("#"+id).remove();
	var MultiProjectIds = $("#projectId").val();
	var splitId = id.split("_");
	var deleteId = splitId[0];
	MultiProjectIds = (","+MultiProjectIds+",").replace(","+deleteId+",",",");
	var subString = MultiProjectIds.substr(1,MultiProjectIds.length-2);

	$("#projectId").val(subString);
}
function addSalesProject(){
    layer.open({
        type : 2,
        title : '增加项目',
        maxmin : true,
        shadeClose : false, // 点击遮罩关闭层
        area : [ '95%', '95%' ],
        content :'/contract/contract/multiProjects'
    });
}
function aa(){
	if($("#contractIds").val()==-1){
		parent.layer.msg("请先保存项目基本信息");
		return;
	}
}
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/contract/contract/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.contractId > 0) {
 					$('#contractIds').val(data.contractId);
 				}
				parent.layer.msg("操作成功");
				$("#submitButton").attr("disabled", true);//上面的验证通过才会执行到这里禁用按钮。
				freshParenWindow();

			} else {
				parent.layer.alert(data.msg)
			}

		}
	});

}
//硬件设备明细表
function contractHardwareDetai() {
	parent.layer.open({
		type : 2,
		title : '硬件明细列表',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '80%', '80%' ],
		content : '/contract/contract/contractHardwareDetai'
	});
}
//软件设备
function contractSoftwareDetail(){
	parent.layer.open({
		type:2,
		title:'软件功能列表',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '80%', '80%' ],
		content : '/contract/contract/contractSoftwareDetail'
	});
}
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
		ignore: ":hidden:not(select)",
			rules : {
				customerId : {
					required : true
				},
				businessId : {
					required : true,
				},
				projectId : {
					required : true,
				},
				contractApplicantName : {
					required : true
				},
				deptId : {
					required : true
				},
				jobId : {
					required : true,
				},
				contractName : {
					required : true,
					rangelength:[1,50]
				},
				contractBuildCompany : {
					required : true,
					rangelength:[1,50]
				},
				contractType : {
					required: true,
				},
				contractCategory : {
					required: true,
				},
				contractTotalPrice : {
					required: true,
					rangelength:[1,16],
					number:true
				},
				contractDept : {
					required: true,
				},
				contractApplicant : {
					required: true,
				},
				contractDraftPerson : {
					required: true,
					rangelength:[1,6]
				},
				contractSales : {
					required: true,
				},
				contractCommitTime : {
					required: true,
				},
				contractAttachment : {
					required: true,
				},
				contractRemarks : {
					rangelength:[1,200]
				}
			},
			messages : {
				customerId : {
					required : icon + "客户名称不能为空"
				},
				businessId : {
					required : icon + "业务名称不能为空",
				},
				projectId : {
					required : icon + "项目名称不能为空",
				},
				contractApplicantName : {
					required : icon + "申请人姓名不能为空"
				},
				deptId : {
					required : icon + "所在部门不能为空"
				},
				jobId : {
					required : icon + "岗位不能为空",
				},
				contractName : {
					required : icon + "合同名称不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				contractBuildCompany : {
					required : icon + "建设单位不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				contractType : {
					required : icon + "合同类型不能为空",
				},
				contractCategory : {
					required : icon + "合同种类不能为空",
				},
				contractTotalPrice : {
					required : icon + "合同总金额不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 16 之间的字符串"
				},
				contractDept : {
					required : icon + "合同发起部门不能为空",
				},
				contractApplicant : {
					required : icon + "业务发起人不能为空",
				},
				contractDraftPerson : {
					required : icon + "合同拟定人不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 6 之间的字符串"
				},
				contractSales : {
					required : icon + "销售负责人不能为空",
				},
				contractCommitTime : {
					required : icon + "提交评审时间不能为空"
				},
				contractAttachment : {
					required : icon + "附件不能为空"
				},
				contractRemarks : {
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
			alert(row.rowId);
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
var currentFiled = "";
var openDept = function(currentFiledparam){
	currentFiled = currentFiledparam;
	layer.open({
		type:2,
		title:"选择部门",
		area : [ '300px', '450px' ],
		content:"/system/sysDept/treeView"
	})
}
function loadDept( deptId,employeeDept){
	if (currentFiled == "deptId") {
		$("#deptId").val(deptId);
		$("#deptName").val(employeeDept);
	}
	if (currentFiled == "contractDept") {
		$("#contractDept").val(deptId);
		$("#contractDeptName").val(employeeDept);
	}
}
function datetimepicker() {
	// 预计开具发票时间
	$('#contractInvoiceTime').datetimepicker({
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
