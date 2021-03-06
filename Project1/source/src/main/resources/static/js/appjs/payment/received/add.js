$().ready(function() {
	validateRule();
	datetimepicker();
	$('#receivablePrice').bind('input propertychange', function() {
		changeRate();
    });
	 $('#receivedPrice').bind('input propertychange', function() {
		changeRate();
    });
	 $("#receiptDelayTime").bind("change",getDays);


});

$.validator.setDefaults({
	submitHandler : function() {
		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/payment/received/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.receivedId > 0) {
					$('#receivedIds').val(data.receivedId);
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
				receivedTime : {
					required : true
				},
				receivedPrice : {
					required : true,
					rangelength:[1,10],
					digits:true
				},
				receivedCardNumber : {
					required : true,
					digits:true,
					creditcard:true
				},
				receivedType : {
					required : true,
					rangelength:[1,20]
				},
				receivedContractStatus : {
					required : true,
				},
				receivedRemarks: {
					rangelength:[1,200]
				}
			},
			messages : {
				receivedTime : {
					required : icon + "收款时间不能为空"
				},
				receivedPrice : {
					required : icon + "收款金额不能为空",
					rangelength: icon + "请输入不大于10位的数字",
					digits : icon + "请输入数字！"
				},
				receivedCardNumber : {
					required : icon + "收款账户不能为空",
					digits : icon + "请输入数字！"
				},
				receivedType : {
					required : icon + "款项类型不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 20 之间的字符串"
				},
				receivedContractStatus : {
					required : icon + "合同状态不能为空",
				},
				receivedRemarks : {
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"
				}
			}
	})
}
function datetimepicker() {
	$('#receivedTime').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
	$('#receivedTime').on('dp.change',function(){

        //代码块
		getDays();
    });
}

function changeRate(){
    var receivablePrice=$("#receivablePrice").val();
    var receivedPrice=$("#receivedPrice").val();
    if( isNaN(receivablePrice) || isNaN(receivedPrice)){
    	return;
    }
    var rate= (receivedPrice/receivablePrice*100).toFixed(2);
    $("#reimbursementRate").val(rate);
}

//银行卡号验证
//jQuery.validator.addMethod("checkCardNumber", function (value, element) {
//	return this.optional(element) || (luhmCheck(value));
//}, "卡号输入有误，请检查输入");

//Description: 银行卡号Luhm校验
//Luhm校验规则：16位银行卡号（19位通用）:
//1.将未带校验位的 15（或18）位卡号从右依次编号 1 到 15（18），位于奇数位号上的数字乘以 2。
//2.将奇位乘积的个十位全部相加，再加上所有偶数位上的数字。
//3.将加法和加上校验位能被 10 整除。
//bankno为银行卡号 banknoInfo为显示提示信息的DIV或其他控件
function luhmCheck(receivedCardNumber) {
	var lastNum = receivedCardNumber.substr(receivedCardNumber.length - 1, 1);//取出最后一位（与luhm进行比较）

	var first15Num = receivedCardNumber.substr(0, receivedCardNumber.length - 1);//前15或18位
	var newArr = new Array();
	for (var i = first15Num.length - 1; i > -1; i--) { //前15或18位倒序存进数组
	newArr.push(first15Num.substr(i, 1));
	}
	var arrJiShu = new Array(); //奇数位*2的积 <9
	var arrJiShu2 = new Array(); //奇数位*2的积 >9

	var arrOuShu = new Array(); //偶数位数组
	for (var j = 0; j < newArr.length; j++) {
	if ((j + 1) % 2 == 1) {//奇数位
	if (parseInt(newArr[j]) * 2 < 9)
	arrJiShu.push(parseInt(newArr[j]) * 2);
	else
	arrJiShu2.push(parseInt(newArr[j]) * 2);
	}
	else //偶数位
	arrOuShu.push(newArr[j]);
	}

	var jishu_child1 = new Array();//奇数位*2 >9 的分割之后的数组个位数
	var jishu_child2 = new Array();//奇数位*2 >9 的分割之后的数组十位数
	for (var h = 0; h < arrJiShu2.length; h++) {
	jishu_child1.push(parseInt(arrJiShu2[h]) % 10);
	jishu_child2.push(parseInt(arrJiShu2[h]) / 10);
	}

	var sumJiShu = 0; //奇数位*2 < 9 的数组之和
	var sumOuShu = 0; //偶数位数组之和
	var sumJiShuChild1 = 0; //奇数位*2 >9 的分割之后的数组个位数之和
	var sumJiShuChild2 = 0; //奇数位*2 >9 的分割之后的数组十位数之和
	var sumTotal = 0;
	for (var m = 0; m < arrJiShu.length; m++) {
	sumJiShu = sumJiShu + parseInt(arrJiShu[m]);
	}

	for (var n = 0; n < arrOuShu.length; n++) {
	sumOuShu = sumOuShu + parseInt(arrOuShu[n]);
	}

	for (var p = 0; p < jishu_child1.length; p++) {
	sumJiShuChild1 = sumJiShuChild1 + parseInt(jishu_child1[p]);
	sumJiShuChild2 = sumJiShuChild2 + parseInt(jishu_child2[p]);
	}
	//计算总和
	sumTotal = parseInt(sumJiShu) + parseInt(sumOuShu) + parseInt(sumJiShuChild1) + parseInt(sumJiShuChild2);

	//计算Luhm值
	var k = parseInt(sumTotal) % 10 == 0 ? 10 : parseInt(sumTotal) % 10;
	var luhm = 10 - k;

	if (lastNum == luhm && lastNum.length != 0) {
	//$("#banknoInfo").html("验证通过");
	return true;
	}
	else {
	//$("#banknoInfo").html("银行卡号必须符合校验");
	return false;
	}
}

/*function CheckBankNo(receivedCardNumber) {
  　　var bankno = $.trim(receivedCardNumber.val());
  　　if(bankno == "") {
      　　$("#banknoInfo").html("*请填写银行卡号");
         return false;
     }
     if(bankno.length < 16 || bankn
     o.length > 19) {
         $("#banknoInfo").html("*银行卡号长度必须在16到19之间");
         return false;
     }
     var num = /^\d*$/; //全数字
     if(!num.exec(bankno)) {
         $("#banknoInfo").html("*银行卡号必须全为数字");
         return false;
     }
     //开头6位
     var strBin = "10,18,30,35,37,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,58,60,62,65,68,69,84,87,88,94,95,98,99";
     if(strBin.indexOf(bankno.substring(0, 2)) == -1) {
         $("#banknoInfo").html("*银行卡号开头6位不符合规范");
         return false;
     }
     //Luhm校验（新）
     if(!luhmCheck(bankno))
         return false;
         $("#banknoInfo").html("验证通过!");
         return true;
}*/
function getDays() {
	$("receivableDate").attr("disabled",false);
	//var strStartTime = $('#receivableDate').attr("date");
	//var endTime = $('#receivedTime').data('date');
    var strStartTime = $("#receivableDate").val();
    var endTime = $("#receivedTime").data('date');
    //alert(strStartTime);
    //alert(endTime);
    if (strStartTime == "" || endTime == "") {
        $("#receiptDelayTime").val(0);
    }
    else {
        var startNum = parseInt(strStartTime.replace(/-/g, ''), 10);
        var endNum = parseInt(endTime.replace(/-/g, ''), 10);
        if (startNum > endNum) {
        	//parent.layer.alert("收款时间比计划时间提前，不存在延迟！");
            $("#receiptDelayTime").val(0);
        }
        else {
        	var daysDifference = DateDiff(strStartTime, endTime);
        	//alert(daysDifference);
            $("#receiptDelayTime").val(DateDiff(strStartTime, endTime));  //调用/计算两个日期天数差的函数，通用
        }
    }
	//var daysDifference = DateDiff(strStartTime, endTime);
	//alert(daysDifference);
	//$("#receiptDelayTime").val(daysDifference);
}

//计算两个日期天数差的函数，通用
/*function DateDiff(startDate, endDate) {//startDate和endDate是2004-10-18格式
	var aDate, oDate1, oDate2, iDays;

	aDate = startDate.split("-");
    oDate1 = new Date(startDate[1] + '-' + startDate[2] + '-' + startDate[0]);  //转换为10-18-2004格式
    aDate = endDate.split("-");
    oDate2 = new Date(aDate[1] + '-' + aDate[2] + '-' + aDate[0]);
    iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24); //把相差的毫秒数转换为天数
    return iDays;  //返回相差天数
}*/
function DateDiff(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
    var dateSpan,
        tempDate,
        iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    //alert(iDays);
    return iDays
}
