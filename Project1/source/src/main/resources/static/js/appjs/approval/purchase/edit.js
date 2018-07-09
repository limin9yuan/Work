var prefixpurchase = "/approval/purchase"
$().ready(function() {
	validateRule();
	datetimepicker();
	purchaseMapper_edit();
	getMainAndCopyPerson_ajax();





});


$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#purchaseId").val()+"/approval_purchase";
	var mainPerson="";
	var copyPerson="";
	var isMainPerson;
	$.ajax({
		url : tmpUrl,
		type : "get",
		data : {
			// 'projectId' : $("#projectId").val(),
		},
		success : function(data) {
			result = data.mainAndCopyPerson;
			var mainPersonIds = "";
			var copyPersonIds = "";
			for (var i = 0; i < result.length; i++) {
				if (result[i].mainPerson == 1) {
					mainPerson = mainPerson + "<div class='personDiv' id=" + (result[i].employeeId + "_1") +
								" onclick='deleteMainPerson(\"" + (result[i].employeeId + "_1") +"\" )'>" +
								result[i].person +"</div>";
					$('#sendPerson').html(mainPerson);
					if (mainPersonIds == "") {
						mainPersonIds = result[i].employeeId
					}else {
						mainPersonIds = mainPersonIds + ","+result[i].employeeId;
					}

					$('#mainPersonId').val(mainPersonIds);

				}
				if (result[i].mainPerson == 0) {
					copyPerson = copyPerson + "<div class='personDiv' id=" + (result[i].employeeId + "_2") +
								" onclick='deleteCopyPerson(\"" + (result[i].employeeId + "_2") +"\" )'>" +
								result[i].person +"</div>";
					$('#receivePerson').html(copyPerson);
					if (copyPersonIds == "") {
						copyPersonIds = result[i].employeeId
					}else {
						copyPersonIds = copyPersonIds + ","+result[i].employeeId;
					}

					$('#copyPersonId').val(copyPersonIds);


				}
			}
		}
	});
}
function update() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/approval/purchase/update",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				parent.layer.msg("操作成功");
				closeParenWindow();
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
			projectId : {
				required : true
			},
			purchaseDept : {
				required : true
			},
			purchasePerson : {
				required : true
			},
			purchaseConsignee : {
				required : true,
				maxlength:6
			},
			purchaseDate: {
				required : true
			},
			purchaseDeliveryTime: {
				required : true
			},
			purchaseDeliveryPlace : {
				required : true,
				maxlength:50
			},
			purchasePhoneNumber: {
				required : true,
				maxlength:20
			},
			purchaseName: {
				required : true,
				maxlength:50
			},
			purchaseConfig: {
				required : true,
				maxlength:200
			},
			purchaseBrand: {
				required : true,
				maxlength:50
			},
			purchaseMode: {
				required : true,
				maxlength:50
			},
			purchaseUnit: {
				required : true,
				maxlength:10
			},
			purchaseNumber: {
				required : true,
				maxlength:10
			},
			purchaseUnitPrice: {
				required : true,
				maxlength:10
			},
			purchaseTotalPrice: {
				required : true,
				maxlength:10
			}/*
			purchaseApprovalStatus: {
			required : true
		},*/
		},
		messages : {
			projectId : {
				required : icon + "请选择项目名称"
			},
			purchaseDept : {
				required : icon + "请选择申购部门"
			},
			purchasePerson : {
				required : icon + "请选择申购人"
			},
			purchaseConsignee : {
				required : icon + "请输入收货人",
				maxlength:icon + "字符长度不能大于6"
			},
			purchaseDate : {
				required : icon + "申购时间不能为空"
			},
			purchaseDeliveryTime : {
				required : icon + "要求交货时间不能为空"
			},
			purchaseDeliveryPlace : {
				required : icon + "请输入交货地点",
				maxlength:icon + "字符长度不能大于50"
			},
			purchasePhoneNumber : {
				required : icon + "请输入联系电话",
				maxlength:icon + "字符长度不能大于20"
			},
			purchaseName : {
				required : icon + "请输入物品名称",
				maxlength:icon + "字符长度不能大于50"
			},
			purchaseConfig : {
				required : icon + "请输入规格/配置",
				maxlength:icon + "字符长度不能大于200"
			},
			purchaseBrand : {
				required : icon + "请输入品牌",
				maxlength:icon + "字符长度不能大于50"
			},
			purchaseMode : {
				required : icon + "请输入型号",
				maxlength:icon + "字符长度不能大于50"
			},
			purchaseUnit : {
				required : icon + "请输入单位",
				maxlength:icon + "字符长度不能大于10"
			},
			purchaseNumber : {
				required : icon + "请输入数量",
				maxlength:icon + "字符长度不能大于10"
			},
			purchaseUnitPrice : {
				required : icon + "请输入预算单价",
				maxlength:icon + "字符长度不能大于10"
			},
			purchaseTotalPrice : {
				required : icon + "请输入总价",
				maxlength:icon + "字符长度不能大于10"
			}/*
			purchaseApprovalStatus : {
			required : icon + "请选择订货情况"
		},*/
		}
	})
}

function datetimepicker() {
	 $('#purchaseDate').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    });
	 $('#purchaseDeliveryTime').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    });
}
//修改——显示数据绑定
function purchaseMapper_edit(){
	$.ajax({
		url : prefixpurchase + '/edit_ajax/' + $("#purchaseId").val(),
		type : "get",
		data : {
			'purchaseId' : $("#purchase").val(),
		},
		success : function(data) {
			var result = data.purchase;
			$("input[name='purchaseId']").val(result.purchaseId);
			$("input[name='purchaseConsignee']").val(result.purchaseConsignee);
			$("input[name='purchaseDate']").val(result.purchaseDate);
			$("input[name='purchaseDeliveryTime']").val(result.purchaseDeliveryTime);
			$("input[name='purchaseDeliveryPlace']").val(result.purchaseDeliveryPlace);
			$("input[name='purchasePhoneNumber']").val(result.purchasePhoneNumber);
			$("input[name='purchaseName']").val(result.purchaseName);
			$("input[name='purchaseConfig']").val(result.purchaseConfig);
			$("input[name='purchaseBrand']").val(result.purchaseBrand);
			$("input[name='purchaseMode']").val(result.purchaseMode);
			$("input[name='purchaseUnit']").val(result.purchaseUnit);
			$("input[name='purchaseNumber']").val(result.purchaseNumber);
			$("input[name='purchaseUnitPrice']").val(result.purchaseUnitPrice);
			$("input[name='purchaseTotalPrice']").val(result.purchaseTotalPrice);
			$("input[name='purchaseApprovalStatus']").val(result.purchaseApprovalStatus);
			$("textarea[name='purchaseRemarks']").val(result.purchaseRemarks);

			//$("select[name='projectGategory']").val(result.projectGategory);
			//$("select[name='projectGategory']").trigger("chosen:updated");
			loadCrmDataValue("/system/sysDept/listDic","purchaseDept",result.purchaseDept);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic","purchasePerson",result.purchasePerson);
			loadCrmDataValue("/project/project/listDic","projectId",result.projectId);
		}
	});
}




var id=$('#purchaseId').val();
 var curRow = {};
//detail表格
 $(function () {
  $('#subprocessTable').bootstrapTable('destroy');
	$('#subprocessTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : "/approval/purchase/listDetail", // 服务器数据的加载地址
//						 idField: "Id",
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
								   approvalpurchaseId:$('#purchaseId').val()
//
							};
						},
						 //请求服务器数据时，你可以通过重写参数的方式添加一些额外的参数，例如 toolbar 中的参数 如果
//						 queryParamsType = 'limit' ,返回参数必须包含
//						 limit, offset, search, sort, order 否则, 需要包含:
//						 pageSize, pageNumber, searchText, sortName,
//						 sortOrder.
//						 返回false将会终止请求
						columns : [
								{
									checkbox : true
								},
								{
								 title:'id',
								 field:'purchaseId',
								 align:"center",edit:true,
								 formatter:function(value, row, index){
                                return row.index=index ; //返回行号
                                 }
								},
								{
									field : 'purchaseName',
									title : '物品名称',
									 formatter: function (value, row, index) {
                       return "<a href=\"#\" name=\"purchaseName\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"物品\">" + value + "</a>";


                                                                              }
								}
								,{
									field : 'purchaseConfig',
									title : '规格/配置',
                         formatter: function (value, row, index) {
                       return "<a href=\"#\" name=\"purchaseConfig\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"规格/配置\">" + value + "</a>";
                                                                   }
								},{
									field : 'purchaseBrand',
									title : '品牌',
                            formatter: function (value, row, index) {
                             return "<a href=\"#\" name=\"purchaseBrand\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"品牌\">" + value + "</a>";
                                                                     }
								},{
									field : 'purchaseMode',
									title : '型号',
                              formatter: function (value, row, index) {
                               return "<a href=\"#\" name=\"purchaseMode\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"型号\">" + value + "</a>";
                                                                       }
								},{
									field : 'purchaseUnit',
									title : '单位',
                                 formatter: function (value, row, index) {
                                  return "<a href=\"#\" name=\"purchaseUnit\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"单位\">" + value + "</a>";
                                                                            }
								},
								{
                                   	field : 'purchaseNumber',
                                	title : '数量',
                                  formatter: function (value, row, index) {
                                   return "<a href=\"#\" name=\"purchaseNumber\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"数量\">" + value + "</a>";
                                                                            }
                                },
                                {
                                   	field : 'purchaseUnitPrice',
                                    title : '预算单价',
                                    formatter: function (value, row, index) {
                                    return "<a href=\"#\" name=\"purchaseUnitPrice\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"预算单价\">" + value + "</a>";
                                                                            }
                                },
                                {
                                  	field : 'purchaseTotalPrice',
                                    title : '总价',
                                    formatter: function (value, row, index) {
                                     return "<a href=\"#\" name=\"purchaseTotalPrice\" data-type=\"text\" data-pk=\""+row.purchaseId+"\" data-title=\"总价\">" + value + "</a>";
                                                                           }
                                 },
                                 {
                                 	title : '操作',
                                 	field : 'purchaseId',
                                 	align : 'center',edit:true,
                                 	formatter : function(value, row, index) {

                                 	var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="remove(\''
                                 + row.purchaseId
                                 + '\')"><i class="fa fa-remove"></i></a> ';

                                 	return  d  ;
                                 	}
                                 		}

								],
         onClickRow: function (row, $element) {

                        curRow = row;
                    },
                    onLoadSuccess: function (aa, bb, cc) {
                        $("#subprocessTable a").editable({
                            url: function (params) {
                                var sName = $(this).attr("name");
                                curRow[sName] = params.value;
                                $.ajax({
                                    type: 'POST',
                                    url:  "/approval/purchase/updateDetail",
                                    data: curRow,
                                    dataType: 'JSON',
                                    	success : function(data) {
                                    			if (data.code == 0) {
                                    				 alert('保存成功！');}},
//                                    success: function (data, textStatus, jqXHR) {
//                                        alert('保存成功！');
//                                    },
                                    error: function () { alert("error");}
                                });
                            },
                            type: 'text'
                        });
                    },




	});




});
//添加新的一行表格
 $('#addRowbtn').click(function(){
                  var data = {purchaseId: '',purchaseName: '', purchaseConfig: '',purchaseBrand:'', purchaseMode: '', purchaseUnit: '', purchaseNumber: '', purchaseUnitPrice: '', purchaseTotalPrice: ''};
                  $('#subprocessTable').bootstrapTable('prepend', data);
                  $("#dataTable tr:eq(1) td:eq(0)").trigger("dblclick");
//                $("#dataTable input")[0].focus();
$.ajax({
		cache : true,
		type : "POST",
		url : "/approval/purchase/saveDetail",
		data : {purchaseName: '', purchaseConfig: '',purchaseBrand:'', purchaseMode: '', purchaseUnit: '', purchaseNumber: '', purchaseUnitPrice: '', purchaseTotalPrice: '','approvalpurchaseId' : $("#purchaseId").val()},
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.purchaseId > 0) {
					$('#purchaseIds').val(data.purchaseId);
				}
				parent.layer.msg("操作成功");


			} else {
				parent.layer.alert(data.msg)
			}

		}
	});
 $('#subprocessTable').bootstrapTable('refresh');
             });


function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : "/approval/purchase/removeDetail",
			type : "post",
			data : {
				'purchaseId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					$('#subprocessTable').bootstrapTable('refresh');
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

