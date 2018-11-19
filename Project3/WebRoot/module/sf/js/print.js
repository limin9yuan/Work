/**
 * 打印二(支持回调函数)
 */
function printInvoice(params) {
	//showWaitMsg('正在打印票据,请稍等...');
	/*Ext.Ajax.request({
				url : 'prt.ered?reqCode=executePrint',
				success : function(response) {
					hideWaitMsg();
				},
				failure : function(response) {
					hideWaitMsg();
					Ext.Msg.alert('提示', "打印发生错误,请联系管理员!");
				},
				params:params
			});*/
	var str = "";
	str +='<APPLET ID="JrPrt" CODE="org.module.rpt.web.JRPrinterApplet.class" CODEBASE = "./" ARCHIVE = "applets.jar,jasperreports-fonts-3.7.0.jar,jasperreports-3.1.0-applet.jar" WIDTH = "0" HEIGHT = "0">';
	str +='<PARAM NAME = "type" VALUE="application/x-java-applet;version=1.2.2">';
	str +='<PARAM NAME = "scriptable" VALUE="false">';
	str +='<PARAM NAME = "REPORT_URL" VALUE =../jasperPrint?'+encodeURI(params)+'>';
	str +='</APPLET>';
	/*var str = "";
	str += "<APPLET id='JRPrinterApplet'  WIDTH = '0' HEIGHT = '0'>";
	str += "<PARAM NAME = CODE VALUE = 'JRPrinterApplet.class' >";
	str += "<PARAM NAME = CODEBASE VALUE = './' >";
	str += "<PARAM NAME = ARCHIVE VALUE = 'applets.jar,jasperreports-1.3.4-applet.jar' >";
	str += "<PARAM NAME='type' VALUE='application/x-java-applet;version=1.2.2'>";
	str += "<PARAM NAME='scriptable' VALUE='false'>";
	str += "<PARAM NAME = 'REPORT_URL' VALUE =../print?"+encodeURI(params)+">";
	str += "</APPLET>";*/
	document.getElementById('iprint').contentWindow.document.write(str);
	//iprint.document.write(str);
	//hideWaitMsg();
}
function lodopPrint(params){
	var LODOP=getLodop(document.getElementById('LODOP_OB'),document.getElementById('LODOP_EM'));
	LODOP.PRINT_INIT('');
	// LODOP.ADD_PRINT_LINE("30mm","1mm","30mm","201mm",0,1);// 第一层上横线
	LODOP.ADD_PRINT_TEXT("37mm","60mm","200mm","20mm",parent.companyName);
	LODOP.SET_PRINT_STYLEA(0,"FontSize",18);
	LODOP.SET_PRINT_STYLEA(0, "Bold", 1);
    // LODOP.ADD_PRINT_LINE("30mm","1mm", "50mm", "1mm", 0, 1);// 第一层左竖线
	// LODOP.ADD_PRINT_LINE("30mm","201mm", "50mm", "201mm", 0, 1);// 第一层右竖线
	// LODOP.ADD_PRINT_LINE("50mm","1mm", "50mm", "201mm", 0, 1);// 第一层下横线
	// LODOP.ADD_PRINT_LINE("30mm","141mm", "40mm", "141mm", 0, 1);// 收据代码左竖线
	LODOP.ADD_PRINT_TEXT("34mm","145mm","200mm","20mm",'收据代码:');
	LODOP.ADD_PRINT_TEXT("34mm","160mm","200mm","20mm",params.invoice_number);

	// LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	// LODOP.ADD_PRINT_LINE("40mm","141mm", "40mm", "201mm", 0, 1);// 收据代码下横线

	// LODOP.ADD_PRINT_LINE("50mm","1mm", "60mm", "1mm", 0, 1);// 第二层左竖线
	LODOP.ADD_PRINT_TEXT("53mm","3mm","200mm","10mm",'用户编号:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("53mm","20mm","200mm","10mm",params.house_code);

	// LODOP.ADD_PRINT_LINE("50mm","201mm", "60mm", "201mm", 0, 1);// 第二层右竖线
	// LODOP.ADD_PRINT_LINE("60mm","1mm", "60mm", "201mm", 0, 1);// 第二层下横线
	// LODOP.ADD_PRINT_LINE("50mm","26mm", "60mm", "26mm", 0, 1);// 第二层内第一竖线
	// LODOP.ADD_PRINT_LINE("50mm","101mm", "60mm", "101mm", 0, 1);// 第二层内第二竖线
	LODOP.ADD_PRINT_TEXT("53mm","103mm","200mm","10mm",'地址:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("53mm","113mm","200mm","10mm",params.address);
	// LODOP.ADD_PRINT_LINE("50mm","126mm", "60mm", "126mm", 0, 1);// 第二层内第三竖线

	// LODOP.ADD_PRINT_LINE("60mm","1mm", "70mm", "1mm", 0, 1);// 第三层左竖线
	LODOP.ADD_PRINT_TEXT("63mm","3mm","200mm","10mm",'姓名:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("63mm","15mm","200mm","10mm",params.owner_name);

	// LODOP.ADD_PRINT_LINE("60mm","201mm", "70mm", "201mm", 0, 1);// 第三层右竖线
	LODOP.ADD_PRINT_LINE("70mm","1mm", "70mm", "201mm", 0, 1);// 第三层下横线
	// LODOP.ADD_PRINT_LINE("60mm","26mm", "70mm", "26mm", 0, 1);// 第三层内第一竖线
	// LODOP.ADD_PRINT_LINE("60mm","101mm", "70mm", "101mm", 0, 1);// 第三层内第二竖线
	LODOP.ADD_PRINT_TEXT("63mm","103mm","200mm","10mm",'交费日期:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	var myDate = new Date();
	var date = myDate.getFullYear() + "年"+Number(Number(myDate.getMonth())+1)+ "月"+myDate.getDate()+"日";
	LODOP.ADD_PRINT_TEXT("63mm","120mm","200mm","10mm",date);

	// LODOP.ADD_PRINT_LINE("60mm","126mm", "70mm", "126mm", 0, 1);// 第三层内第三竖线
	// LODOP.ADD_PRINT_LINE("60mm","151mm", "70mm", "151mm", 0, 1);// 第三层内第四竖线
	LODOP.ADD_PRINT_TEXT("63mm","153mm","200mm","10mm",'收据编号:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("63mm","170mm","200mm","10mm",params.invoice_code);

	// LODOP.ADD_PRINT_LINE("60mm","176mm", "70mm", "176mm", 0, 1);// 第三层内第五竖线

	LODOP.ADD_PRINT_LINE("70mm","1mm", "80mm", "1mm", 0, 1);// 第四层左竖线
	LODOP.ADD_PRINT_TEXT("73mm","3mm","200mm","10mm",'收费年度');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_LINE("70mm","201mm", "80mm", "201mm", 0, 1);// 第四层右竖线
	LODOP.ADD_PRINT_LINE("80mm","1mm", "80mm", "201mm", 0, 1);// 第四层下横线
	LODOP.ADD_PRINT_LINE("70mm","26mm", "80mm", "26mm", 0, 1);// 第四层内第一竖线
	LODOP.ADD_PRINT_TEXT("73mm","29mm","200mm","10mm",'收费面积');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_LINE("70mm","51mm", "80mm", "51mm", 0, 1);// 第四层内第二竖线
	LODOP.ADD_PRINT_TEXT("73mm","60mm","200mm","10mm",'标准');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_LINE("70mm","76mm", "80mm", "76mm", 0, 1);// 第四层内第三竖线
	LODOP.ADD_PRINT_TEXT("73mm","80mm","200mm","10mm",'收费项目');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_LINE("70mm","101mm", "80mm", "101mm", 0, 1);// 第四层内第四竖线
	LODOP.ADD_PRINT_TEXT("73mm","104mm","200mm","10mm",'应收金额');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_LINE("70mm","126mm", "80mm", "126mm", 0, 1);// 第四层内第五竖线
	LODOP.ADD_PRINT_TEXT("73mm","129mm","200mm","10mm",'实应收');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_LINE("70mm","151mm", "80mm", "151mm", 0, 1);// 第四层内第六竖线
	LODOP.ADD_PRINT_TEXT("73mm","154mm","200mm","10mm",'滞纳金');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_LINE("70mm","176mm", "80mm", "176mm", 0, 1);// 第四层内第七竖线
	LODOP.ADD_PRINT_TEXT("73mm","179mm","200mm","10mm",'实收金额');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);

	LODOP.ADD_PRINT_LINE("80mm","1mm", "100mm", "1mm", 0, 1);// 第五层左竖线
	LODOP.ADD_PRINT_TEXT("87mm","8mm","200mm","20mm",params.charge_month);
	LODOP.ADD_PRINT_LINE("80mm","201mm", "100mm", "201mm", 0, 1);// 第五层右竖线
	LODOP.ADD_PRINT_LINE("100mm","1mm", "100mm", "201mm", 0, 1);// 第五层下横线
	LODOP.ADD_PRINT_LINE("80mm","26mm", "100mm", "26mm", 0, 1);// 第五层内第一竖线
	LODOP.ADD_PRINT_TEXT("87mm","39mm","200mm","20mm",params.charge_area);
	LODOP.ADD_PRINT_LINE("80mm","51mm", "100mm", "51mm", 0, 1);// 第五层内第二竖线
	LODOP.ADD_PRINT_TEXT("87mm","65mm","200mm","20mm",params.price);
	LODOP.ADD_PRINT_LINE("80mm","76mm", "100mm", "76mm", 0, 1);// 第五层内第三竖线
	LODOP.ADD_PRINT_TEXT("87mm","83mm","200mm","20mm",'供热费');
	LODOP.ADD_PRINT_LINE("80mm","101mm", "100mm", "101mm", 0, 1);// 第五层内第四竖线
	LODOP.ADD_PRINT_TEXT("87mm","113mm","200mm","20mm",params.total_account);
	LODOP.ADD_PRINT_LINE("80mm","126mm", "100mm", "126mm", 0, 1);// 第五层内第五竖线
	LODOP.ADD_PRINT_TEXT("87mm","138mm","200mm","20mm",params.real_account);
	LODOP.ADD_PRINT_LINE("80mm","151mm", "100mm", "151mm", 0, 1);// 第五层内第六竖线
	LODOP.ADD_PRINT_TEXT("87mm","168mm","200mm","20mm",params.latefee_charge);
	LODOP.ADD_PRINT_LINE("80mm","176mm", "100mm", "176mm", 0, 1);// 第五层内第七竖线
	LODOP.ADD_PRINT_TEXT("87mm","188mm","200mm","20mm",params.real_charge);

	LODOP.ADD_PRINT_LINE("100mm","1mm", "110mm", "1mm", 0, 1);// 第六层左竖线
	LODOP.ADD_PRINT_TEXT("103mm","3mm","200mm","10mm",'本次实收金额(大写):');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("104mm","36mm","200mm","20mm",params.capitalNumber);
	LODOP.ADD_PRINT_LINE("100mm","201mm", "110mm", "201mm", 0, 1);// 第六层右竖线
	LODOP.ADD_PRINT_LINE("110mm","1mm", "110mm", "201mm", 0, 1);// 第六层下横线
	// LODOP.ADD_PRINT_LINE("100mm","45mm", "110mm", "45mm", 0, 1);// 第六层内第一竖线
	// LODOP.ADD_PRINT_LINE("100mm","130mm", "110mm", "130mm", 0, 1);// 第六层内第二竖线
	LODOP.ADD_PRINT_TEXT("103mm","133mm","200mm","10mm",'￥:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("103mm","140mm","200mm","10mm",params.real_charge);
	// LODOP.ADD_PRINT_LINE("100mm","155mm", "110mm", "155mm", 0, 1);// 第六层内第三竖线

	LODOP.ADD_PRINT_LINE("110mm","1mm", "120mm", "1mm", 0, 1);// 第七层左竖线
	LODOP.ADD_PRINT_LINE("110mm","201mm", "120mm", "201mm", 0, 1);// 第七层右竖线
	LODOP.ADD_PRINT_LINE("120mm","1mm", "120mm", "201mm", 0, 1);// 第七层下横线
	// LODOP.ADD_PRINT_LINE("110mm","130mm", "120mm", "130mm", 0, 1);// 第七层内第一竖线
	LODOP.ADD_PRINT_TEXT("113mm","133mm","200mm","10mm",'结算方式:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("113mm","150mm","200mm","10mm",params.pay_mode);
	// LODOP.ADD_PRINT_LINE("110mm","155mm", "120mm", "155mm", 0, 1);// 第七层内第二竖线

	// LODOP.ADD_PRINT_LINE("120mm","1mm", "130mm", "1mm", 0, 1);// 第八层左竖线
	LODOP.ADD_PRINT_TEXT("123mm","3mm","200mm","10mm",'供热单位: (章)');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	// LODOP.ADD_PRINT_LINE("120mm","201mm", "130mm", "201mm", 0, 1);// 第八层右竖线
	// LODOP.ADD_PRINT_LINE("130mm","1mm", "130mm", "201mm", 0, 1);// 第八层下横线
	// LODOP.ADD_PRINT_LINE("120mm","60mm", "130mm", "60mm", 0, 1);// 第八层内第一竖线
	LODOP.ADD_PRINT_TEXT("123mm","63mm","200mm","10mm",'开票人:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("123mm","77mm","200mm","10mm",parent.currentUser);

	// LODOP.ADD_PRINT_LINE("120mm","90mm", "130mm", "90mm", 0, 1);// 第八层内第二竖线
	// LODOP.ADD_PRINT_LINE("120mm","130mm", "130mm", "130mm", 0, 1);// 第八层内第三竖线
	LODOP.ADD_PRINT_TEXT("123mm","133mm","200mm","10mm",'收款人:');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	LODOP.ADD_PRINT_TEXT("123mm","147mm","200mm","10mm",parent.currentUser);
	// LODOP.ADD_PRINT_LINE("120mm","155mm", "130mm", "155mm", 0, 1);// 第八层内第四竖线

	// LODOP.ADD_PRINT_LINE("130mm","1mm", "140mm", "1mm", 0, 1);// 第九层左竖线
	LODOP.ADD_PRINT_TEXT("133mm","3mm","200mm","10mm",'白联-记账联，粉联-用户联，黄联-存查联');
	LODOP.SET_PRINT_STYLEA(0,"FontSize",10);
	// LODOP.ADD_PRINT_LINE("130mm","201mm", "140mm", "201mm", 0, 1);// 第九层右竖线
	// LODOP.ADD_PRINT_LINE("140mm","1mm", "140mm", "201mm", 0, 1);// 第九层下横线
	LODOP.PRINT();
	// LODOP.PREVIEW();

}
