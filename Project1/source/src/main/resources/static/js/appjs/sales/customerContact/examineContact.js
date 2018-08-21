var prefix = "/sales/customerContact"
var address = null;
var result = null;
$().ready(
		function() {

			$('#contactBirthDay').datetimepicker({
				format : 'YYYY-MM-DD',
				locale : moment.locale('zh-cn')
			});
			$('#myTab a[href="#baseInfo"]').on('shown.bs.tab', function(e) {
				$('#lastBtn').attr("disabled", true);
				$('#nextBtn').attr("disabled", false);
			});
			$('#myTab a[href="#linkInfo"]').on('shown.bs.tab', function(e) {
				$('#lastBtn').attr("disabled", false);
				$('#nextBtn').attr("disabled", false);
			});
			$('#myTab a[href="#workUnit"]').on( 'shown.bs.tab', function(e) {
						$('#lastBtn').attr("disabled", false);
						$('#nextBtn').attr("disabled", false);
//						loadCrmDataValue("/sales/companyCustomer/listDic","customerId", result.customerId);// 客户编号
						$("#customerId").chosen("destroy");
						 $("#contactJob").chosen("destroy");
					});
			$('#myTab a[href="#userDefine"]').on('shown.bs.tab', function(e) {
				$('#lastBtn').attr("disabled", false);
				$('#nextBtn').attr("disabled", true);
			});

			customerContactMapper_edit();
			getMainAndCopyPerson_ajax();
			loadField();
});
//function loadJob(){
//	loadCrmDataValue("/sales/customerContact/listDicjob/" + $('#customerId').val(), "contactJob",result.contactJob);// 岗位
//}
function loadField() {
	$('#listCustomField')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : "/sales/customerContact/listField", // 服务器数据的加载地址
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
								t_id:$('#contactId').val()
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
function getMainAndCopyPerson_ajax() {
	var tmpUrl = '/common/MainCopyPerson/getMainAndCopyPerson_ajax/' + $("#contactId").val() +"/sales_customer_contact";
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
								" onclick='delete(\"" + (result[i].employeeId + "_1") +"\" )'>" +
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
								" onclick='delete(\"" + (result[i].employeeId + "_2") +"\" )'>" +
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
// 修改——显示数据绑定
function customerContactMapper_edit() {
	$.ajax({
		url : prefix + '/edit_ajax/' + $("#contactId").val(),
		type : "get",
		data : {
			'contactId' : $("#contactId").val(),
		},
		success : function(data) {
			result = data.customerContact;
			$("input[name='contactName']").val(result.contactName);
			$("input[name='contactSalutation']").val(result.contactSalutation);
			$(":radio[name='contactSex'][value='" + result.contactSex + "']").prop("checked", "checked");
			$(":radio[name='contactMaritalStatus'][value='"+ result.contactMaritalStatus + "']").prop("checked", "checked");
			$("input[name='contactBirthDay']").val(result.contactBirthDay);
			$("input[name='contactAge']").val(result.contactAge);
			$("input[name='contactFamilyStatus']").val(
					result.contactFamilyStatus);
			$("input[name='contactGraduateInstitutions']").val(
					result.contactGraduateInstitutions);
			$("input[name='contactSkill']").val(result.contactSkill);
			$("input[name='contactYearsWorking']").val(
					result.contactYearsWorking);
			$("textarea[name='contactExperience']").val(result.contactExperience);
			$("input[name='contactPreviousCompany']").val(
					result.contactPreviousCompany);
			$("input[name='contactSuperiors']").val(result.contactSuperiors);
			$("input[name='contactIntroduction']").val(
					result.contactIntroduction);
			$("input[name='contactResponsibility']").val(
					result.contactResponsibility);
			$("input[name='contactMailbox']").val(result.contactMailbox);
			$("input[name='contactWorkPhoneNumber']").val(
					result.contactWorkPhoneNumber);
			$("input[name='contactFamilyPhoneNumber']").val(
					result.contactFamilyPhoneNumber);
			$("input[name='contactFax']").val(result.contactFax);
			$("input[name='contactFamilyAddress']").val(
					result.contactFamilyAddress);
			$("input[name='contactWeixin']").val(result.contactWeixin);
			$("input[name='contactQq']").val(result.contactQq);
			$("input[name='contactPhoneNumber']")
					.val(result.contactPhoneNumber);
			loadDicValue("sales_customer_contact_Sta", "contactIntroduction",
					result.contactIntroduction);
			// 部门
			$("input[name='contactDept']").val(result.contactDept);
			// 岗位
			$("input[name='contactJob']").val(result.contactJob);
			// 职务
			$("input[name='contactTitle']").val(result.contactTitle);
			// 角色
			$("input[name='contactRole']").val(result.contactRole);
			// 负责业务
			$("input[name='contactResponsibility']").val(
					result.contactResponsibility);
			// 纪念日类别
			$("input[name='contactSpecialDayCategory']").val(
					result.contactSpecialDayCategory);
			// 纪念日
			$("input[name='contactSpecialDay']").val(result.contactSpecialDay);
			// 爱好
			$("input[name='contactInterest']").val(result.contactInterest);
			// 单位地址
			// $("input[name='contactRemarks']").val(result.contactRemarks);
			// 备注
			$("textarea[name='contactRemarks']").val(result.contactRemarks);
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "contactOwner",
					result.contactOwner);// 客户所有者
			loadDicValue("sales_Customer_Contact_Status", "contactStatus",
					result.contactStatus);// 联系人状态
			loadCrmDataValue("/inner/innerOrgEmployee/listDic", "contactSales",
					result.contactSales);// 销售负责人
			// loadDic("sales_customer_contact_Sta","contactIntroduction");
		}
	});
}
function nextStepThis(tabId, totalStep, lastBtn, nextBtn) {
	nextStep(tabId, totalStep, lastBtn, nextBtn);
	if (address == null) {
		if ($('#' + tabId + ' li:eq(2)').attr("class") == 'active') {
			address = new addressResolve({
				proId : 'province',
				cityId : 'city',
				areaId : 'area'
			});
			address.init();
		}
	}

}
