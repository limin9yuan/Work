var typeCount=0;
var supplier="";
$().ready(function() {
	check_ajax();
});
function check_ajax(){
	var tableName;
	$.ajax({
		url : '/allocationPlan/allocationPlan/check_ajax/'+$("#planNo").val(),
		type : "get",
		data : {
			'code' : $("#purchasePlanId").val(),
		},
		success : function(data) {

			var orderEntry = data.returnList;
			var nameArrays = data.categoryList;
			typeCount = nameArrays.length;
			var supplierArrays = data.supplierList;
			supplier = supplierArrays;
			// localStorage.setItem("supplierArrays",supplierArrays);
			for (var i = 0; i < orderEntry.length; i++) {
				tableName = "t" + i + "table";
				if (i == 0) {
					$("#myTab").append("<li class='active'><a href='#"+"t"+i+ "' data-toggle='tab'>"+nameArrays[i]+"</a></li>");
					$("#myTabContent").append("<div class='tab-pane fade in active' id='"+"t"+i+ "'><div class='gridPanel'><table id='"+tableName+"' data-mobile-responsive='true'></table><div id='requirePlanPage'></div></div></div>");
				}else {
					$("#myTab").append("<li><a href='#"+"t"+i+ "' data-toggle='tab'>"+nameArrays[i]+"</a></li>");
					if (nameArrays[i] == "单独采购") {
						$("#myTabContent").append("<div class='tab-pane fade' id='"+"t"+i+ "'><div class='gridPanel'><table id='"+tableName+"' data-mobile-responsive='true'></table><div id='requirePlanPage'></div></div></div>");
					}
					else {
						$("#myTabContent").append("<div class='tab-pane fade' id='"+"t"+i+ "'><div class='gridPanel'><table id='"+tableName+"' data-mobile-responsive='true'></table><div id='requirePlanPage'></div></div></div>");
					}
				}
			}
			for (var i = 0; i < orderEntry.length; i++) {
				tableName = "t" + i + "table";
				if (i==0) {
					pageInit(tableName,supplierArrays[i]);

				}
				else {
					if (nameArrays[i] == "单独采购") {
						singleSupplierTableInit(tableName);
					}
					else {
						pageInit(tableName,supplierArrays[i]);
					}
				}
				loadData(orderEntry[i], i,supplierArrays[i]);
			}

		}
	});
}
function loadData(orderEntry, i,supplierArrays) {
	tableName = "t" + i + "table";
	var typeEntity = orderEntry;
	if (typeEntity[i].materialClassName == "单独采购") {
		for (var j = 0; j < typeEntity.length; j++) {
			var rowdata = {
				authorDeptName : '<input value="'+typeEntity[j].authorDeptName+'" name="authorDeptName" type="text" class="editable left disabled" readonly/>',//需求机构
				materialClassName : '<input value="'+typeEntity[j].materialClassName+'" name="materialClassName" type="text" class="editable left disabled" readonly/>',//物料类型
				materialName: '<input value="'+typeEntity[j].materialName+'" name="materialName" type="text" class="editable left disabled" readonly/>',//物料名称
				materilaCode: '<input value="'+typeEntity[j].materilaCode+'" name="materilaCode" type="text" class="editable left disabled" readonly/>',//物料编码
				specification: '<input value="'+typeEntity[j].specification+'" name="specification" type="text" class="editable left disabled" readonly/>',//物料特性
				materialUnitName: '<input value="'+typeEntity[j].materialUnitName+'" name="materialUnitName" type="text" class="editable left disabled" readonly/>',//单位
				purchaseQty: '<input value="'+typeEntity[j].purchaseQty+'" name="purchaseQty" type="text" class="editable left disabled decimal" readonly/>',//采购数量
				unitPrice: '<input value="'+typeEntity[j].unitPrice+'" name="unitPrice" type="text" class="editable left disabled" readonly/>',//合同单价
				allotQty: '<input value="'+typeEntity[j].allotQty+'" name="allotQty" type="text" class="editable left disabled" readonly/>',//分配数量
				allotRatio: '<input value="'+typeEntity[j].allotRatio+'" name="allotRatio" type="text" class="editable left disabled" readonly/>',//分配比例
				companyName: '<input value="'+typeEntity[j].companyName+'" name="companyName" type="text" class="editable left disabled decimal" readonly/><input value="'+typeEntity[j].companyId+'" name="companyId" type="hidden" class="editable left disabled decimal" readonly/>',//供应商
			}
			$("#"+tableName).jqGrid('addRowData', j, rowdata);
		};
	}else {
		for (var j = 0; j < typeEntity.length; j++) {
			var jsonGroupStr= "";
			var jsonstr=
			'{"authorDeptName" :  "<input value=\''+typeEntity[j].authorDeptName+'\' name=\'authorDeptName\' type=\'text\' class=\'editable left disabled\' readonly/>",'//需求机构
			+'"materialClassName" :  "<input value=\''+typeEntity[j].materialClassName+'\' name=\'materialClassName\' type=\'text\' class=\'editable left disabled\' readonly/>",'//物料类型
			+'"materialName" :  "<input value=\''+typeEntity[j].materialName+'\' name=\'materialName\' type=\'text\' class=\'editable left disabled\' readonly/>",'//物料名称
			+'"materilaCode" :  "<input value=\''+typeEntity[j].materilaCode+'\' name=\'materilaCode\' type=\'text\' class=\'editable left disabled\' readonly/>",'//物料编码
			+'"specification" :  "<input value=\''+typeEntity[j].specification+'\' name=\'specification\' type=\'text\' class=\'editable left disabled\' readonly/>",'//物料特性
			+'"materialUnitName" :  "<input value=\''+typeEntity[j].materialUnitName+'\' name=\'materialUnitName\' type=\'text\' class=\'editable left disabled\' readonly/>",'//单位
			+'"purchaseQty" :  "<input value=\''+typeEntity[j].purchaseQty+'\' name=\'purchaseQty\' type=\'text\' class=\'editable left disabled\' readonly/>",';//采购数量
			for (var i = 0; i < supplierArrays.length; i++) {
				if (typeEntity[j]["allotQty"+i] != "") {
					var tempUnitPrice = typeEntity[j]["unitPrice"+i];
					if (tempUnitPrice == undefined) {
						tempUnitPrice = "";
					}
					var tempAllotQty = typeEntity[j]["allotQty"+i];
					if (tempAllotQty == undefined) {
						tempAllotQty = "";
					}
					var tempAllotRatio = typeEntity[j]["allotRatio"+i];
					if (tempAllotRatio == undefined) {
						tempAllotRatio = "";
					}
					jsonGroupStr = jsonGroupStr+'"unitPrice'+i+'" :  "<input value=\''+tempUnitPrice+'\' name=\'unitPrice'+i+'\' type=\'text\' class=\'editable left disabled\' readonly/>",'//合同单价
					+'"allotQty'+i+'" :  "<input value=\''+tempAllotQty+'\' name=\'allotQty'+i+'\' type=\'text\' class=\'editable left disabled\' readonly/>",'//分配数量
					+'"allotRatio'+i+'" :  "<input value=\''+tempAllotRatio+'\' name=\'allotRatio'+i+'\' type=\'text\' class=\'editable left disabled\' readonly/>"';//分配比例
					if (i != supplierArrays.length - 1) {
						jsonGroupStr = jsonGroupStr+',';
					}
				}

			}
			jsonstr = jsonstr +jsonGroupStr + '}'//分配比例
			var rowdata = JSON.parse(jsonstr);
			$("#"+tableName).jqGrid('addRowData', j, rowdata);
		};
	}
	$(".ui-jqgrid-view").width(1228);
	$(".ui-jqgrid-hdiv").width(1228);
	$(".ui-jqgrid-bdiv").width(1228);
}
function singleSupplierTableInit(tableName){
	var tableColNames = [ '需求机构', '物料类型', '物料名称', '物料编码', '物料特性','单位',
						  '采购数量', '合同单价', '分配数量','分配比例','供应商'];
	var tableColModel = [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				 {name : 'authorDeptName',index : 'requirePlanid',width : 100,align : "right",sortable: false},
				 {name : 'materialClassName',index : 'materialName',width : 100,align : "right",sortable: false},
				 {name : 'materialName',index : 'materialName',width : 100,align : "right",sortable: false},
				 {name : 'materilaCode',index : 'materilaCode',width : 100,align : "right",sortable: false},
				 {name : 'specification',index : 'specification',width : 100,align : "right",sortable: false},
				 {name : 'materialUnitName',index : 'materialUnitName',width : 100,align : "right",sortable: false},
				 {name : 'purchaseQty',index : 'purchaseQty',width : 100,align : "right",sortable: false},
				 {name : 'unitPrice',index : 'unitPrice',width : 100,align : "right",sortable: false},
				 {name : 'allotQty',index : 'allotQty',width : 100,align : "right",sortable: false},
				 {name : 'allotRatio',index : 'allotRatio',width : 100,align : "right",sortable: false},
				 {name : 'companyName',index : 'companyName',width : 100,align : "right",sortable: false}
			 ];
    var $grid = $("#"+tableName);
	//创建jqGrid组件
	$grid.jqGrid(
			{
				// url : '/requirementPlan/requirementPlan/getRequirePlanDetailByCode/'+code,//组件创建完成之后请求数据的url
				// datatype : "json",//请求数据返回的类型。可选json,xml,txt
				unwritten: false,
                datatype: "local",
				height: '100%',
                autowidth: true,
				colNames : tableColNames,//jqGrid的列显示名字
				colModel : tableColModel,
				rowNum : 10,//一页显示多少条
				rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
				//pager : '#requireApplyPage',//表格页脚的占位符(一般是div)的id
				// gridComplete: completeMethod,
				pager: false,
				sortname : 'id',//初始化的时候排序的字段
				sortorder : "desc",//排序方式,可选desc,asc
				mtype : "get",//向后台请求数据的ajax的类型。可选post,get
				viewrecords : true,
				rownumbers: true,
               	shrinkToFit: false,
               	gridview: true,
               	footerrow: true,
			   	cellEdit:true,
			    multiselect: true,
			   onSelectRow : function(id) {
				  var lastsel;
				   // deleteSelectedRow(id);
                  if (id && id !== lastsel) {
                    jQuery('#singleSupplierTable').jqGrid('restoreRow', lastsel);
                    jQuery('#singleSupplierTable').jqGrid('editRow', id, true);
                    lastsel = id;
                  }
                }
			});
			 //表头合并
		    $grid.jqGrid('setGroupHeaders', {
		        useColSpanStyle: true,
		        groupHeaders: [
		          { startColumnName: 'requireQty', numberOfColumns: 6, titleText: '<div align="center"><span>数量信息</span></div>'},
		          { startColumnName: 'referencePrice', numberOfColumns: 3, titleText: '<div align="center"><span>金额信息</span></div>'}
		        ]
		    });
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	// jQuery("#requirePlanTable").jqGrid('navGrid', '#requirePlanPage', {edit : false,add : false,del : false});
	// jQuery("#requirePlanTable").jqGrid('inlineNav', "#requirePlanPage");
}
function pageInit(tableName,supplier){
	var tableColNames = [ '需求机构', '物料类型', '物料名称', '物料编码', '物料特性','单位',
						  '采购数量'];
	var tableColModel = [ //jqGrid每一列的配置信息。包括名字，索引，宽度,对齐方式.....
				 {name : 'authorDeptName',index : 'requirePlanid',width : 100,align : "right",sortable: false},
				 {name : 'materialClassName',index : 'materialName',width : 100,align : "right",sortable: false},
				 {name : 'materialName',index : 'materialName',width : 100,align : "right",sortable: false},
				 {name : 'materilaCode',index : 'materilaCode',width : 100,align : "right",sortable: false},
				 {name : 'specification',index : 'specification',width : 100,align : "right",sortable: false},
				 {name : 'materialUnitName',index : 'materialUnitName',width : 100,align : "right",sortable: false},
				 {name : 'purchaseQty',index : 'purchaseQty',width : 100,align : "right",sortable: false}
			 ];
	var supplierName = supplier;
	if (supplierName != undefined) {
		for (var i = 0; i < supplierName.length; i++) {
			tableColNames.push('合同单价');
			tableColNames.push('分配数量');
			tableColNames.push('分配比例');
			tableColModel.push({name : 'unitPrice'+i,index : 'unitPrice'+i,width : 100,align : "right",sortable: false});
			tableColModel.push({name : 'allotQty'+i,index : 'allotQty'+i,width : 100,align : "right",sortable: false});
			tableColModel.push({name : 'allotRatio'+i,index : 'allotRatio'+i,width : 100,align : "right",sortable: false});
		}
	}
    var $grid = $("#"+tableName);
	//创建jqGrid组件
	$grid.jqGrid(
			{
				// url : '/requirementPlan/requirementPlan/getRequirePlanDetailByCode/'+code,//组件创建完成之后请求数据的url
				// datatype : "json",//请求数据返回的类型。可选json,xml,txt
				unwritten: false,
                datatype: "local",
				height: '100%',
                autowidth: true,
				colNames : tableColNames,//jqGrid的列显示名字
				colModel : tableColModel,
				rowNum : 10,//一页显示多少条
				rowList : [ 10, 20, 30 ],//可供用户选择一页显示多少条
				//pager : '#requireApplyPage',//表格页脚的占位符(一般是div)的id
				// gridComplete: completeMethod,
				pager: false,
				sortname : 'id',//初始化的时候排序的字段
				sortorder : "desc",//排序方式,可选desc,asc
				mtype : "get",//向后台请求数据的ajax的类型。可选post,get
				viewrecords : true,
				rownumbers: true,
               	shrinkToFit: false,
               	gridview: true,
               	footerrow: true,
			   	cellEdit:true,
			    multiselect: true,
				autoScroll: true,
			   onSelectRow : function(id) {
				  var lastsel;
				   // deleteSelectedRow(id);
                  if (id && id !== lastsel) {
                    jQuery('#allocationPlanTable').jqGrid('restoreRow', lastsel);
                    jQuery('#allocationPlanTable').jqGrid('editRow', id, true);
                    lastsel = id;
                  }
                }
			});
			var tempGroupHeader = [];
			for (var i = 0; i < supplierName.length; i++) {
				tempGroupHeader.push({ startColumnName: 'unitPrice'+i, numberOfColumns: 3, titleText: '<div align="center"><span>'+supplierName[i].companyName+'</span></div>'});

			}
			 //表头合并
		    $grid.jqGrid('setGroupHeaders', {
		        useColSpanStyle: true,
		        groupHeaders: tempGroupHeader
		    });
	/*创建jqGrid的操作按钮容器*/
	/*可以控制界面上增删改查的按钮是否显示*/
	// jQuery("#requirePlanTable").jqGrid('navGrid', '#requirePlanPage', {edit : false,add : false,del : false});
	// jQuery("#requirePlanTable").jqGrid('inlineNav', "#requirePlanPage");
}
$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
