var prefixpurchase = "/approval/purchase"
$().ready(function() {
  //可编辑表格

                  var id=$('#purchaseId').val();
                  var curRow = {};
                  var  purchaseName=new Array();
                   var  purchaseConfig=new Array();
                    var  purchaseMode=new Array();
                     var  purchaseUnit=new Array();
                      var  purchaseNumber=new Array();
                       var  purchaseUnitPrice=new Array();
                        var  purchaseBrand=new Array();
                         var  purchaseTotalPrice=new Array();
                   var tableadd;
   $(function() {
  //显示修改页 的详细表数据
  $.ajax({
  		url : prefixpurchase + '/edit_table/' + $("#purchaseId").val(),
  		type : "get",
  		async : false,
  		data : {
  			'purchaseId' : $("#purchaseId").val(),
  		},
  		success : function(data) {
            var result =data.purchasedetail;
            for(var l=0;l<data.tableadd;l++)
            {
           purchaseName[l]=result[l].purchaseName;
           purchaseConfig[l]=result[l].purchaseConfig;
           purchaseMode[l]=result[l].purchaseMode;
           purchaseUnit[l]=result[l].purchaseUnit;
           purchaseBrand[l]=result[l].purchaseBrand;
           purchaseNumber[l]=result[l].purchaseNumber;
           purchaseUnitPrice[l]=result[l].purchaseUnitPrice;
           purchaseTotalPrice[l]=result[l].purchaseTotalPrice;
            }
   		}
  	});


           var i=1;
                     if(purchaseName.length>0){

                             var da = { pkey: [{ key: "num", value: i}], value: [[{ key: 1, value: "" },{ key: 2, value: i},   { key: 1, value: purchaseName[0] }, { key: 1, value:purchaseConfig[0] }, { key: 1, value: purchaseBrand[0] }, { key: 1, value: purchaseMode[0]}, { key: 1, value: purchaseUnit[0]}, { key: 1, value: purchaseNumber[0]}, { key: 1, value: purchaseUnitPrice[0]}, { key: 1, value: purchaseTotalPrice[0]}]] };
                             }
                             else{
                             var da = { pkey: [{ key: "num", value: i}], value: [[{ key: 1, value: "" },{ key: 2, value: i},   { key: 1, value: "" }, { key: 1, value:"" }, { key: 1, value: "" }, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}, { key: 1, value: ""}]] };
                             }
          var op = { data: da, headerRows: 2 };
          $.jtool.loaddata("tabProduct", op);
          $("#tabProduct").jFixedtable({ colums: [{ name: "num"}], fixedCols: 1, width: "95%", height: "300", headerRows: 1, pkey: ["num"], edit: true });



  for(var l=1;l<purchaseName.length;l++)
          {
          i += 1;
           var da = { pkey: [{ key: "num", value: i}], value: [[{ key: 1, value: "" },{ key: 2, value: i},   { key: 1, value: purchaseName[l] }, { key: 1, value:purchaseConfig[l] }, { key: 1, value: purchaseBrand[l] }, { key: 1, value: purchaseMode[l]}, { key: 1, value: purchaseUnit[l]}, { key: 1, value: purchaseNumber[l]}, { key: 1, value: purchaseUnitPrice[l]}, { key: 1, value: purchaseTotalPrice[l]}]] };
             var op = { data: da };

                    $.jtool.addRow('tabProduct', op);
          }
  			  });
});
