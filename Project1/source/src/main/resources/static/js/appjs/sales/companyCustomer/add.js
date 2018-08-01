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
			auto: false,			//不自动上传设置
            bindAction: '#uploadFile',	//“上传”按钮的ID
            choose:function(obj){
//******************************预览选择的文件并根据后缀名判断显示不同的图片********************************************  
                //预读本地文件示例，不支持ie8
                obj.preview(function(index, file, result){
                	var upFileName = file.name;
              		 var index1=upFileName.lastIndexOf(".");
              		 var index2=upFileName.length;
              		 var suffix=upFileName.substring(index1+1,index2);//后缀名
//              		 alert(suffix);
              	$("#fileNames").text(file.name);//将获取到的文件名给p标签显示出来	 
              		 //判断是什么格式应对的预览图片
              	 if(suffix=="xls"||suffix=="xlsx"){//判断上传是否是表格
              		 $('#photo').attr('src', "/img/fileImage/xlsxImage.png"); //图片链接（base64）
           		 }else if(suffix=="docx"||suffix=="doc"){//判断后缀是否是word文档
           			 $('#photo').attr('src', "/img/fileImage/docxImage.png"); //图片链接（base64）
           		 }else if(suffix=="avi"||suffix=="wma"||suffix=="rmvb"||suffix=="rm"||suffix=="flash"||suffix=="mp4"||suffix=="mid"||suffix=="3GP"){
           			 //判断是否是视频文件
           			 $('#photo').attr('src', "/img/fileImage/videoImage.jpg"); //图片链接（base64）
           		 }else if(suffix=="jpg"||suffix=="png"||suffix=="gif"||suffix=="tif"||suffix=="psd"||suffix=="dng"||suffix=="cr2"||suffix=="nef"){
           			 $('#photo').attr('src', result); //图片链接（base64）
           		 }else if(suffix=="rar"||suffix=="zip"){
           			$('#photo').attr('src', "/img/fileImage/rarImage.jpeg"); //图片链接（base64）
                 }else{
           			 //其他文件均显示文件图标
           			 $('#photo').attr('src', "/img/fileImage/fileImage.png"); //图片链接（base64）
           		 }
              	//*********************	END	**********************************************************               	 
                });
              },
			done : function(r) {
				if (r.code == 0) {
	 				if (r.customerAttachment > 0) {
	 					$('#ids').val(r.customerAttachment);
	 					$('#customerAttachment').val(r.customerAttachment+','+document.getElementById("customerAttachment").value);
	 				}
//	 				layer.msg(r.msg);
//					 app.getData();

	 			} else {
	 				parent.layer.alert(r.msg)
	 			}
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
		document.getElementById("uploadFile").click();
		setTimeout('savecompanyCustomer()', 500);//延迟执行save()方法2毫秒
//		 savecompanyCustomer();
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
						showRefresh:true,					// 显示刷新按钮
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
 				$("#test1").attr("disabled",true);
 				$("#submitButton").attr("disabled", true);//上面的验证通过才会执行到这里禁用按钮。
 				reloadParenWindow();
 			} else {
 				parent.layer.alert(data.msg)
 			}

 		}
 	});

 }
 //点击提交按钮后刷新列表不关闭窗口
 function reloadParenWindow(){
		// 选项卡菜单已存在
		$('.J_menuTab',window.parent.document).each(function () {
			if ($(this).hasClass('active')) {
				var dataUrl = $(this).data('id') ;
				$('.J_mainContent .J_iframe',window.parent.document).each(function () {
					if ($(this).data('id') == dataUrl) {
						 $(this).context.contentWindow.reLoad();
					}
				});
			}
		});
	}
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
			customerMailbox:{
				email:true
			},
//			生产信息
			customerPaymentRate:{
				required:true,
				number:true,
				range:[0,1]
			},
			customerHeatingShare:{
				required:true,
				number:true,
				range:[0,1]
			},
			customerComplaintRate:{
				required:true,
				number:true,
				range:[0,1]
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
			},
			customerHeatLoss:{
				number:true
			},
			customerWaterLoss:{
				number:true
			},
			customerElectrickLoss:{
				number:true
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
			customerMailbox:{
				email:icon +"请输入正确的邮箱！"
			},
//			生产信息
			customerPaymentRate:{
				required:icon +"收费收缴率不能为空！",
				number:icon +"收费收缴率必须小数！",
				range:$.validator.format("请输入0到1之间的数值！")
			},
			customerHeatingShare:{
				required:icon +"企业占全市热化率不能为空！",
				number:icon +"企业占全市热率必须小数！",
				range:$.validator.format("请输入0到1之间的数值！")
			},
			customerComplaintRate:{
				required:icon +"投诉率不能为空！",
				number:icon +"投诉率必须小数！",
				range:$.validator.format("请输入0到1之间的数值！")
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
			},
			customerHeatLoss:{
				number:icon +"请输入数字！"
			},
			customerWaterLoss:{
				number:icon +"请输入数字！"
			},
			customerElectrickLoss:{
				number:icon +"请输入数字！"
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
//图片预览
function previewImg(obj) {
    var img = new Image();  
    img.src = obj.src;
    var imgHtml = "<img src='" + obj.src + "' style='width:90% height:90%'/>";  
    //弹出层
    parent.layer.open({  
        type: 1,  
        shade: 0.8,
        offset: 'auto',
        area: [90 + '%',90+'%'],
        shadeClose:true,
        scrollbar: false,
        title: "图片预览", //不显示标题  
        content: imgHtml, //捕获的元素，注意：最好该指定的元素要存放在body最外层，否则可能被其它的相对元素所影响  
        cancel: function () {  
            //layer.msg('捕获就是从页面已经存在的元素上，包裹layer的结构', { time: 5000, icon: 6 });  
        }  
    }); 
}


