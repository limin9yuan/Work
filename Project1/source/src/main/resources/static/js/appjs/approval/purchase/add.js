$().ready(function() {
	loadCrmData("/system/sysDept/listDic","purchaseDept");
	loadCrmData("/inner/innerOrgEmployee/listDic","purchasePerson");
	loadCrmData("/project/project/listDic","projectId");
	validateRule();

	datetimepicker();
});


$.validator.setDefaults({

	submitHandler : function() {
		save();


	}
});

//function test(){
//
//var error = $('.Error');
// var purchaseName = document.getElementById("purchaseName").value;
// alert(purchaseName);
//
//
// if($("#purchaseName").val()==""||$("#purchaseName").val()==null)
// {
//// parent.layer.msg("物品名称不能为空！");
//error.html('<font color="red">物品名称不能为空！</font>');
//return false;
// }
//}

var tableadd="";
var tableadds="";
function save() {

var tb = document.getElementById('tabProduct');    // table 的 id
 var rows = tb.rows;                           // 获取表格所有行
 for(var i = 1; i<rows.length; i++ )
 {
    for(var j = 2; j<rows[i].cells.length; j++ )
    {    // 遍历该行的 td
//        alert("第"+(i)+"行，第"+(j)+"个td的值："+rows[i].cells[j].innerHTML+"。");// 输出每个td的内容
        if(tableadd=="")
        {
        tableadd=rows[i].cells[j].innerHTML;
        }
        else
        {
        tableadds=tableadd;
         tableadd=rows[i].cells[j].innerHTML+","+tableadds;

         }
    }
 }
 //把table的数据变成数组传到界面 用表单到后台处理这数组
  $('#detailid').val(tableadd);

	$.ajax({
		cache : true,
		type : "POST",
		url : "/approval/purchase/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.purchaseId > 0) {

					$('#purchaseIds').val(data.purchaseId);
					chaseId=data.purchaseId;
				}
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
		   purchaseName:{
		   required : true
		   },
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
				isMobile:true
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
		purchaseName:{
		required : icon + "请输入数量"
		},
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
					isMobile : icon + "请输入正确的电话号码！"

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
	    }).on('dp.change', function() {
			$('#purchaseDeliveryTime').data("DateTimePicker").minDate(new Date($('#purchaseDate').data('date')));
		});
	 $('#purchaseDeliveryTime').datetimepicker({
	        format: 'YYYY-MM-DD',
	        locale: moment.locale('zh-cn')
	    }).on('dp.change', function() {
			$('#purchaseDate').data("DateTimePicker").maxDate(new Date($('#purchaseDeliveryTime').data('date')));
		});
}





//可编辑表格
 $(function() {
//显示修改页 的详细表数据

var i=1;


        var da = { pkey: [{ key: "num", value: i}], value: [[{ key: 1, value: "" },{ key: 1, value: i },   { key: 1, value: "" }, { key: 1, value:"" }, { key: 1, value: "" }, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}]] };
        var op = { data: da, headerRows: 1 };

        $.jtool.loaddata("tabProduct", op);


       $("#tabProduct").jFixedtable({ colums: [{ name: "num"}], fixedCols:2 , width: "100%", height: "300", headerRows: 1, pkey: ["num"], edit: true });




        i += 1;
        $("#add").click(function() {
           var da = { pkey: [{ key: "num", value: i}], value: [[{ key: 1, value: "" },{ key: 2, value: i },   { key: 1, value: "" }, { key: 1, value:"" }, { key: 1, value: "" }, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}]] };
            var op = { data: da };

            i++;
            $.jtool.addRow('tabProduct', op);
        });
    });


//删除表格
    function del(key) {


        return true;
    }
