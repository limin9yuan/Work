var address = null;
$().ready(function() {

	loadDic("sales_customer_category", "customerCategory");
	loadDic("sales_customer_product", "customerProduct");
	loadDic("sales_customer_character", "customerCharacter");
	loadDic("sales_customer_status", "customerStatus");
	loadDic("sales_customer_level", "customerLevel");
	loadDic("sales_customer_sale_Phase", "customerSalePhase");
	loadDic("sales_customer_inner_Phase", "customerInnerPhase");
	loadDic("sales_customer_sourcee", "customerSource");
	loadDic("sales_customer_credit_Rank", "customerCreditRank");
	loadDic("sales_customer_potential", "customerPotential");
	loadDic("sales_customer_visit_Mode", "customerVisitMode");

	loadCrmData("/inner/innerOrgEmployee/listDic", "customerOwner");
	loadCrmData("/inner/innerOrgEmployee/listDic", "customerSales");

	$('#myTab a[href="#baseInfo"]').on('shown.bs.tab', function(e){
		 if(address==null){
			 address = new addressResolve({
				    proId: 'province',
				    cityId: 'city',
				    areaId: 'area'
			 });
			 address.init();
		 }

		 });

	$('#myTab a[href="#Hotspot"]').on('shown.bs.tab', function(e) {
		if ($("#customerHotRank option").length == 1) {
			loadDic("sales_customer_hot_Rank", "customerHotRank");
		}
		if($("#customerHotClassif option").length == 1){
			loadDic("sales_Customer_Hot_Classif","customerHotClassif");
		}

	});
	$('#myTab a[href="#linkInfo"]').on('shown.bs.tab', function(e) {

		if ($("#customerContactSta option").length == 1) {
			loadDic("sales_customer_contact_Sta", "customerContactSta");
		}

	});
	$('#myTab a[href="#Gegner"]').on('shown.bs.tab', function(e) {
		loadCompetitor();
	});
	$('#myTab a[href="#Organisation"]').on('shown.bs.tab', function(e) {
		loadChild();
		loadJob();
		loadDept();
	});

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
	loadField();
	if (address == null) {
		address = new addressResolve({
			proId : 'province',
			cityId : 'city',
			areaId : 'area'
		});
		address.init();
	}
});

$.validator.setDefaults({
	submitHandler : function() {
		 savecompanyCustomer();
//		saveMainCopyPerson();
	}
});
function loadField() {
	$('#listCustomField')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : "/sales/companyCustomer/listField", // 服务器数据的加载地址
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
								t_id: $('#customerIds').val()
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
										var e = '<a class="btn btn-primary btn-sm '+s_edit_h+'" href="#" mce_href="#" title="编辑" onclick="editField(\''
												+ row.id
												+ '\')"><i class="fa fa-edit"></i></a> ';
										var d = '<a class="btn btn-warning btn-sm '+s_remove_h+'" href="#" title="删除"  mce_href="#" onclick="removeField(\''
												+ row.id
												+ '\')"><i class="fa fa-remove"></i></a> ';
										var f = '<a class="btn btn-success btn-sm" href="#" title="备用"  mce_href="#" onclick="resetPwd(\''
												+ row.id
												+ '\')"><i class="fa fa-key"></i></a> ';
										return e + d ;
									}
								},
																{
									field : 'fieldName',
									title : '新建字段名称'
								},
																{
									field : 'belongCategory',
									title : '所属分类'
								},
																{
									field : 'content',
									title : '内容'
								}]
					});
}
function addField() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '950px', '95%' ],
		content : '/sales/companyCustomer/addField'
	});
}
function editField(id) {
	layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '950px', '95%' ],
		content : '/sales/companyCustomer/editField/' + id // iframe的url
	});
}
 function savecompanyCustomer() {

 	$.ajax({
 		cache : true,
 		type : "POST",
 		url : "/sales/companyCustomer/save",
 		data : $('#signupForm').serialize(),// 你的formid
 		async : false,
 		error : function(request) {
 			parent.layer.alert("Connection error");
 		},
 		success : function(data) {
 			if (data.code == 0) {
 				if (data.customerId > 0) {
 					$('#customerIds').val(data.customerId);
 				}
 				parent.layer.msg("操作成功");
// 				parent.reLoad();
// 				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
// 				parent.layer.close(index);

 			} else {
 				parent.layer.alert(data.msg)
 			}

 		}
 	});

 }
// function save() {
// 	$.ajax({
// 		cache : true,
// 		type : "POST",
// 		url : "/sales/companyCustomer/save",
// 		data : $('#signupForm').serialize(),// 你的formid
// 		async : false,
// 		error : function(request) {
// 			parent.layer.alert("Connection error");
// 		},
// 		success : function(data) {
// 			if (data.code == 0) {
// 				parent.layer.msg("操作成功");
// 				reLoad();
// 				var index = parent.layer.getFrameIndex(window.name); // 获取窗口索引
// 				parent.layer.close(index);
//
// 			} else {
// 				parent.layer.alert(data.msg)
// 			}
//
// 		}
// 	});
// }
function validateRule() {
	var icon = "<i class='fa fa-times-circle'></i> ";
	$("#signupForm").validate({
	ignore: ":hidden:not(select)",
		rules : {
			customerProvince : {
				required : true
			},
			customerCity : {
				required : true
			},
			customerCounty : {
				required : true
			},
			customerName : {
				required : true
			},
			customerSimpleName : {
				required : true
			},
			customerOwner : {
				required : true
			},
			customerSales : {
				required : true
			},
			customerProduct : {
				required : true
			},
			customerCategory : {
				required : true
			},
			customerCharacter : {
				required : true
			},
			customerStatus : {
				required : true
			},
			customerLevel : {
				required : true
			},
			customerSalePhase : {
				required : true
			},
			customerInnerPhase : {
				required : true
			},
//			customerParent : {
//				required : true
//			},
				  customerHotClassif : {
				required : true
			},
			customerHotRank : {
				required : true
			},
			customerVolume : {
				digits:true,
				required : true
			},
			customerHotDesc : {
				required : true
			},
			// 联系方式
			customerContactSta:{
				required:true
			},
			customerAddress:{
				required:true
			},
			customerPhoneNum:{
				required:true
			},
			customerLeader:{
				required:true
			},
//			生产信息
			customerPaymentRate:{
				required:true,
				number:true,
				range:[0.1,1]
			},
			customerHeatingShare:{
				required:true,
				number:true,
				range:[0.1,1]
			},
			customerComplaintRate:{
				required:true,
				number:true,
				range:[0.1,1]
			},
			customerHeatingArea:{
				max:99999999999999
			},
			customerHeatingSourceNumber:{
				max:99999999
			},
			customerSteamArea:{
				max:99999999999999
			},
			customerHotWaterArea:{
				max:99999999999999
			},
			customerOwnHeatingSource:{
				max:99999999
			},
			customerOutHeatingSource:{
				max:99999999
			},
			customerEmpNumber:{
				max:9999999,
				digits:true
			},
			customerStaffSize:{
				digits:true,
				max:999999
			}
		},
		messages : {
			customerProvince : {
				required : icon + "请输入省份！"
			},
			customerCity : {
				required : icon + "请输入城市！"
			},
			customerCounty : {
				required : icon + "请输入区县！"
			},
			customerName : {
				required : icon + "请输入企业名称！"
			},
			customerSimpleName : {
				required : icon + "请输入助记简称！"
			},
			customerOwner : {
				required : icon + "请输入客户所有者！"
			},
			customerSales : {
				required : icon + "请输入销售负责人！"
			},
			customerProduct : {
				required : icon + "请输入产品需求！"
			},
			customerCategory : {
				required : icon + "请输入客户类别！"
			},
			customerCharacter : {
				required : icon + "请输入企业性质！"
			},
			customerStatus : {
				required : icon + "请输入客户状态！"
			},
			customerLevel : {
				required : icon + "请输入客户级别！"
			},
			customerSalePhase : {
				required : icon + "请输入销售阶段！"
			},
			customerInnerPhase : {
				required : icon + "请输入客户内部阶段！"
			},
//			customerParent : {
//				required : icon + "请输入上级单位！"
//			},
			label1 : {
				required : icon + "热点客户分类为空！"
			},
			customerHotRank : {
				required : icon + "请热度不能为空！"
			},
			customerVolume : {
				required : icon + "与其成交金额不能为空！",
				digits:icon+"请输入有效的数字！"
			},
			customerHotDesc : {
				required : icon + "热点说明不能为空！"
			},
			customerContactSta:{
				required:icon+"联系情况不能为空！"
			},
			customerAddress:{
				required:icon+"企业地址不能为空！"
			},
			customerPhoneNum:{
				required:icon +"电话号码不能为空！"
			},
			customerLeader:{
				required:icon +"企业负责人不能为空！"
			},
//			生产信息
			customerPaymentRate:{
				required:icon +"收费收缴率不能为空！",
				number:icon +"收费收缴率必须小数！",
				range:$.validator.format("请输入0.1到1之间的数值！")
			},
			customerHeatingShare:{
				required:icon +"企业占全市热化率不能为空！",
				number:icon +"企业占全市热率必须小数！",
				range:$.validator.format("请输入0.1到1之间的数值！")
			},
			customerComplaintRate:{
				required:icon +"投诉率不能为空！",
				number:icon +"投诉率必须小数！",
				range:$.validator.format("请输入0.1到1之间的数值！")
			},
			customerEmpNumber:{
				max:icon+"员工数量不能大于7位数（9999999）！",
				digits:icon+"员工数量必须为数字！"
			},
			customerHeatingArea:{
				max:$.validator.format("请输入不大于 99999999999999在14位之间的数值")
			},
			customerHeatingSourceNumber:{
				max:$.validator.format("请输入不大于 999999999 在14位之间的数值")
			},
			customerSteamArea:{
				max:$.validator.format("请输入不大于 99999999999999 在14位之间的数值")
			},
			customerHotWaterArea:{
				max:$.validator.format("请输入不大于 99999999999999 在14位之间的数值")
			},
			customerOwnHeatingSource:{
				max:$.validator.format("请输入不大于 999999999 在14位之间的数值")
			},
			customerOutHeatingSource:{
				max:$.validator.format("请输入不大于 999999999 在14位之间的数值")
			},
			customerStaffSize:{
				digits:icon +"人员规模必须为数字！",
				max:$.validator.format("请输入不大于999999在14位之间的数值")
			}
		}
	})
}

function nextStepThis(tabId,totalStep,lastBtn,nextBtn){
	nextStep(tabId,totalStep,lastBtn,nextBtn);
	if(address ==null ){
			if( $('#'+tabId+' li:eq(2)').attr("class")=='active'){
				address = new addressResolve({
				    proId: 'province',
				    cityId: 'city',
				    areaId: 'area'
				  });
				address.init();
			}

	}

}
