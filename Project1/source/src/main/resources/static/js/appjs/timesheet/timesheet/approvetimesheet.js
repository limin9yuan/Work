
var prefix = "/timesheet/timesheet"

$(function() {
        loadCrmData("/sales/companyCustomer/listDic","customerId");
		loadCrmData("/sales/business/listDic","businessId");
		loadCrmData("/project/project/listDic","projectId");

	load();
	datetimepicker();

});
function resetSelect(){
$('#timeMin').data('date','');
	$('#timeMax').data('date','');
$("#timesheetName").val("");
	$("#timesheetName").trigger("chosen:updated"); //回到初始状态
	$("#projectId").val("");
	$("#projectId").trigger("chosen:updated"); //回到初始状态
}




function gettext(){


    		$.ajax({
    			url : "/timesheet/timesheet/getlist/"+$('#timeMin').data('date'),
    			type : "get",
    			data : {
    				timeMin:$('#timeMin').data('date'),
    			},
    			success : function(data) {
    			var ceshi=data.date11;
                			var Date1 = data.date11;
                			var Date2 = data.dat2;
                			var Date3 = data.dat3;
                			var Date4 = data.dat4;
                			var Date5 = data.dat5;
                			var Date6 = data.dat6;
                			var Date7 = data.dat7;
                                var pd1=data.pd1;
                                 var pd2=data.pd2;
                                  var pd3=data.pd3;
                                   var pd4=data.pd4;
                                    var pd5=data.pd5;
                                     var pd6=data.pd6;
                                      var pd7=data.pd7;


                          $("#test1").html(Date1);
                          $("#test2").html(Date2);
                          $("#test3").html(Date3);
                          $("#test4").html(Date4);
                          $("#test5").html(Date5);
                          $("#test6").html(Date6);
                          $("#test7").html(Date7);
                             $("input[name='Date1']").val(pd1);
                                                    $("input[name='Date2']").val(pd2);
                                                    $("input[name='Date3']").val(pd3);
                                                    $("input[name='Date4']").val(pd4);
                                                    $("input[name='Date5']").val(pd5);
                                                    $("input[name='Date6']").val(pd6);
                                                    $("input[name='Date7']").val(pd7);


                		}

    		});
}

function gettext1(){

    		$.ajax({
//    			url : "/timesheet/timesheet/getlist/"+$('#timeMin').data('date')==undefined?"":$('#timeMin').data('date'),
    			url : "/timesheet/timesheet/getlist1/"+$('#Date8').val(),
    			type : "get",
    			data : {
//    			 timeMin:$('#timeMin').data('date')==undefined?"":$('#timeMin').data('date'),
    				 timeMin:$('#Date8').val(),
    			},
    			success : function(data) {
                			var Date1 = data.date11;
                			var Date2 = data.dat2;
                			var Date3 = data.dat3;
                			var Date4 = data.dat4;
                			var Date5 = data.dat5;
                			var Date6 = data.dat6;
                			var Date7 = data.dat7;
                                var pd1=data.pd1;
                                 var pd2=data.pd2;
                                  var pd3=data.pd3;
                                   var pd4=data.pd4;
                                    var pd5=data.pd5;
                                     var pd6=data.pd6;
                                      var pd7=data.pd7;

//                             $('#exampleTable').bootstrapTable('refresh');
//                             $('#exampleTable1').bootstrapTable('refresh');
                          $("#test1").html(Date1);
                          $("#test2").html(Date2);
                          $("#test3").html(Date3);
                          $("#test4").html(Date4);
                          $("#test5").html(Date5);
                          $("#test6").html(Date6);
                          $("#test7").html(Date7);
                                                    $("#testday1").html(Date1);
                                                    $("#testday2").html(Date2);
                                                    $("#testday3").html(Date3);
                                                    $("#testday4").html(Date4);
                                                    $("#testday5").html(Date5);
                                                    $("#testday6").html(Date6);
                                                    $("#testday7").html(Date7);
                          $("input[name='Date1']").val(pd1);
                          $("input[name='Date2']").val(pd2);
                          $("input[name='Date3']").val(pd3);
                          $("input[name='Date4']").val(pd4);
                          $("input[name='Date5']").val(pd5);
                          $("input[name='Date6']").val(pd6);
                          $("input[name='Date7']").val(pd7);

//                          $('#exampleTable').bootstrapTable('refresh');
//                           $('#exampleTable1').bootstrapTable('refresh');

                		}

    		});
}


function datetimepicker() {
	// 开始时间
	$('#timeMin').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
	// 结束时间
	$('#timeMax').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
}






function load() {



	$('#exampleTable')
			.bootstrapTable(
					{
						method : 'get', // 服务器数据的请求方式 get or post
						url : prefix + "/approvelist", // 服务器数据的加载地址

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
//						 search : false, // 是否显示搜索框
//						showColumns : true, // 是否显示内容下拉框（选择显示的列）
						sidePagination : "server", // 设置在哪里进行分页，可选值为"client" 或者 "server"
						queryParams : function(params) {
							return {
								//说明：传入后台的参数包括offset开始索引，limit步长，sort排序列，order：desc或者,以及所有列的键值对
								limit: params.limit,
								offset:params.offset,
								date:$('#date8').val(),
								project:$('#projectId').val(),
                                timeMin:$('#timeMin').data('date'),
//	                            timeMin:$('#timeMin').data('date')==undefined?"":$('#timeMin').data('date'),
                                   timesheetName:$('#timesheetName').val()
//								timeMax:$('#timeMax').data('date'),

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
                                title:'操作',
                                align : 'center',
                                formatter : function(value, row, index) {
                                  var m = '<a href="#" mce_href="#"   onclick="approveall(\''+
                                 (row.idDate1==null?"":row.idDate1) +'\',\''+(row.pdIdDate1==null?"":row.pdIdDate1)+'\',\''+(row.taskIdDate1==null?"":row.taskIdDate1)+'\',\''+
                                 (row.idDate2==null?"":row.idDate2) +'\',\''+(row.pdIdDate2==null?"":row.pdIdDate2)+'\',\''+(row.taskIdDate2==null?"":row.taskIdDate2)+'\',\''+
                                 (row.idDate3==null?"":row.idDate3) +'\',\''+(row.pdIdDate3==null?"":row.pdIdDate3)+'\',\''+(row.taskIdDate3==null?"":row.taskIdDate3)+'\',\''+
                                 (row.idDate4==null?"":row.idDate4) +'\',\''+(row.pdIdDate4==null?"":row.pdIdDate4)+'\',\''+(row.taskIdDate4==null?"":row.taskIdDate4)+'\',\''+
                                 (row.idDate5==null?"":row.idDate5) +'\',\''+(row.pdIdDate5==null?"":row.pdIdDate5)+'\',\''+(row.taskIdDate5==null?"":row.taskIdDate5)+'\',\''+
                                 (row.idDate6==null?"":row.idDate6) +'\',\''+(row.pdIdDate6==null?"":row.pdIdDate6)+'\',\''+(row.taskIdDate6==null?"":row.taskIdDate6)+'\',\''+
                                 (row.idDate7==null?"":row.idDate7) +'\',\''+(row.pdIdDate7==null?"":row.pdIdDate7)+'\',\''+(row.taskIdDate7==null?"":row.taskIdDate7)+'\')"><p1>审批<p1></a> ';


                                 if(row.pdIdDate1==undefined&&row.pdIdDate2==undefined&&row.pdIdDate3==undefined&&row.pdIdDate4==undefined&&row.pdIdDate5==undefined&&row.pdIdDate6==undefined&&row.pdIdDate7==undefined)
                                 {
                                         c='<p1>审批<p1> ';
                                     return c;
                                 }
                                 else
                                 {
                                   return m;
                                 }
                                                                         }
                                	},

								{
								field:'timesheetName',
								title:'员工姓名'
								},


								{
									field : 'projectName',
   								title : '项目名称'
								},

									{
                    field : 'assignmentTaskName',
                  	title : '任务内容'
                },

								{
									title : "<div id='test1'>"+$('#Date1').val()+"<br>星期一</br></div>",
//									field : 'timesheetId',
									align : 'center',
									formatter : function(value, row, index) {
                      var c=row.normalDate1+row.overDate1;
                      if(row.pdIdDate1== "" || row.pdIdDate1== null || row.pdIdDate1 == undefined)
	                  {
											     var m='<div align=center><p>'+c+'<p> ';
                              return m;
										}
										else
										{
									             var m = '<a href="#" mce_href="#"  onclick="approve(\'' + row.pdIdDate1+ '\',\''+row.taskIdDate1+'\')">'+ c + '</a> ';
                                  return m;

										}
                                                                         }

								},
								{
                               title : "<div id='test2'>"+$('#Date2').val()+"<br>星期二</br></div>",
//                             field : 'timesheetId',
                               align : 'center',
                               formatter : function(value, row, index) {
                               var c=row.normalDate2+row.overDate2;
                               if(row.pdIdDate2== "" || row.pdIdDate2== null || row.pdIdDate2 == undefined)
                 {
                          			 var m='<div align=center><p>'+c+'<p> ';
                                           return m;
                	}
                    	else
                      	{
                           var m = '<a href="#" mce_href="#"  onclick="approve(\'' + row.pdIdDate2+ '\',\''+row.taskIdDate2+'\')">'+ c + '</a> ';
                              return m;

                        	}
                  	}
                	},
                {
                               title : "<div id='test3'>"+$('#Date3').val()+"<br>星期三</br></div>",
//                                field : 'timesheetId',
                               align : 'center',
                               formatter : function(value, row, index) {
                              var c=row.normalDate3+row.overDate3;
                               if(row.pdIdDate3== "" || row.pdIdDate3== null || row.pdIdDate3 == undefined)
                         {
                                  var m='<div align=center><p>'+c+'<p> ';
                                   return m;
                          	}
                            	else
                            	{
                                 var m = '<a href="#" mce_href="#"  onclick="approve(\'' + row.pdIdDate3+ '\',\''+row.taskIdDate3+'\')">'+ c + '</a> ';
                                     return m;

                            	}
                               }
                            	},
                          {
                               title : "<div id='test4'>"+$('#Date4').val()+"<br>星期四</br></div>",
//                              field : 'timesheetId',
                               align : 'center',
                               formatter : function(value, row, index) {
                               var c=row.normalDate4+row.overDate4;
                                      if(row.pdIdDate4== "" || row.pdIdDate4== null || row.pdIdDate4 == undefined)
                                   {
                                           var m='<div align=center><p>'+c+'<p> ';
                                             return m;
                                    	}
                                    	else
                                      	{
                                           var m = '<a href="#" mce_href="#"  onclick="approve(\'' + row.pdIdDate4+ '\',\''+row.taskIdDate4+'\')">'+ c + '</a> ';
                                            return m;

                                          	}
                                								}
                                              },
                              {
                               title : "<div id='test5'>"+$('#Date5').val()+"<br>星期五</br></div>",
//                               field : 'timesheetId',
                               align : 'center',
                               formatter : function(value, row, index) {
                              var c=row.normalDate5+row.overDate5;
                              if(row.pdIdDate5== "" || row.pdIdDate5== null || row.pdIdDate5 == undefined)
                        {
                              var m='<div align=center><p>'+c+'<p> ';
                                  return m;
                                	}
                        	else
                          	{
                           var m = '<a href="#" mce_href="#"  onclick="approve(\'' + row.pdIdDate5+ '\',\''+row.taskIdDate5+'\')">'+ c + '</a> ';
                            return m;
                              }

                                		}
                                        },
                        {
                               title : "<div id='test6'>"+$('#Date6').val()+"<br>星期六</br></div>",
//                               field : 'timesheetId',
                               align : 'center',
                               formatter : function(value, row, index) {
                               var c=row.normalDate6+row.overDate6;
                                if(row.pdIdDate6== "" || row.pdIdDate6== null || row.pdIdDate6 == undefined)
                                 {
                                 var m='<div align=center><p>'+c+'<p> ';
                                    return m;
                                  }
                                	else
                                	{
                                     var m = '<a href="#" mce_href="#"  onclick="approve(\'' + row.pdIdDate6+ '\',\''+row.taskIdDate6+'\')">'+ c + '</a> ';
                                        return m;

                                    	}

                                							}
                                            },
                            {
                               title : "<div id='test7'>"+$('#Date7').val()+"<br>星期日</br></div>",
//                                 field : 'timesheetId',
                               align : 'center',
                               formatter : function(value, row, index) {
                              var c=row.normalDate7+row.overDate7;
                                 if(row.pdIdDate7== "" || row.pdIdDate7== null || row.pdIdDate7 == undefined)
                                 {
                                   var m='<div align=center><p>'+c+'<p> ';
                                     return m;
                                  	}
                                  	else
                                  	{
                                     var m = '<a href="#" mce_href="#"  onclick="approve(\'' + row.pdIdDate7+ '\',\''+row.taskIdDate7+'\')">'+ c + '</a> ';
                                     return m;

                                	}
                                								}
                            								}

							]
					}
        );
}



function reLoad() {
    if($('#timeMin').data('date')==undefined?"":$('#timeMin').data('date')!=''){
        gettext();

    }
    if($('#timeMin').data('date')=='')
    {gettext1();}
    $('#exampleTable').bootstrapTable('refresh');



}
function add() {
	layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '95%' ],
		content : prefix + '/add' // iframe的url
	});
}
function add1()
{
layer.open({
		type : 2,
		title : '增加',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '800px', '95%' ],
		content : prefix + '/add1' // iframe的url
	});
}

function approve(id,pid) {

		parent.layer.open({
		type : 2,
		title : '编辑',
		maxmin : true,
		shadeClose : false, // 点击遮罩关闭层
		area : [ '95%', '95%' ],
		content : prefix + '/approve/' + id+"/" +pid,// iframe的url
		  end: function () {
                         location.reload();
                     }
	});
}
//测试用的
function approveall(idDate1,pdIdDate1,taskIdDate1,
                    idDate2,pdIdDate2,taskIdDate2,
                    idDate3,pdIdDate3,taskIdDate3,
                    idDate4,pdIdDate4,taskIdDate4,
                    idDate5,pdIdDate5,taskIdDate5,
                    idDate6,pdIdDate6,taskIdDate6,
                    idDate7,pdIdDate7,taskIdDate7){

$.ajax({
			type : 'POST',
			data : {
				"pdIdDate1" :pdIdDate1,
				"pdIdDate2" :pdIdDate2,
				"pdIdDate3" :pdIdDate3,
				"pdIdDate4" :pdIdDate4,
				"pdIdDate5" :pdIdDate5,
				"pdIdDate6" :pdIdDate6,
				"pdIdDate7" :pdIdDate7,
				"taskIdDate1":taskIdDate1,
				"taskIdDate2":taskIdDate2,
				"taskIdDate3":taskIdDate3,
				"taskIdDate4":taskIdDate4,
				"taskIdDate5":taskIdDate5,
				"taskIdDate6":taskIdDate6,
				"taskIdDate7":taskIdDate7,
				"idDate1":idDate1,
				"idDate2":idDate2,
				"idDate3":idDate3,
				"idDate4":idDate4,
				"idDate5":idDate5,
				"idDate6":idDate6,
				"idDate7":idDate7
			},
			url : prefix + '/approveall',
			success : function(result) {
			 var htmlCont = result;

       	parent.layer.open({
         type : 2,
         title : '编辑',
         maxmin : true,
         shadeClose : false, // 点击遮罩关闭层
         area : [ '95%', '95%' ],

         content : prefix + '/goToApprovePage/' + result.processInstanceId+"/" +result.taskId+"/"+result.timeSheetId,/// iframe的url
        end: function () {
                       location.reload();
                   }
       });
			}
		});}




function remove(id) {
	layer.confirm('确定要删除选中的记录？', {
		btn : [ '确定', '取消' ]
	}, function() {
		$.ajax({
			url : prefix+"/remove",
			type : "post",
			data : {
				'timesheetId' : id
			},
			success : function(r) {
				if (r.code==0) {
					layer.msg(r.msg);
					reLoad();
				}else{
					layer.msg(r.msg);
				}
			}
		});
	})
}

function resetPwd(id) {
}
////测试用的
//function approveall(idDate1,pdIdDate1,taskIdDate1,
//                    idDate2,pdIdDate2,taskIdDate2,
//                    idDate3,pdIdDate3,taskIdDate3,
//                    idDate4,pdIdDate4,taskIdDate4,
//                    idDate5,pdIdDate5,taskIdDate5,
//                    idDate6,pdIdDate6,taskIdDate6,
//                    idDate7,pdIdDate7,taskIdDate7){
//
//$.ajax({
//			type : 'POST',
//			data : {
//				"pdIdDate1" :pdIdDate1,
//				"pdIdDate2" :pdIdDate2,
//				"pdIdDate3" :pdIdDate3,
//				"pdIdDate4" :pdIdDate4,
//				"pdIdDate5" :pdIdDate5,
//				"pdIdDate6" :pdIdDate6,
//				"pdIdDate7" :pdIdDate7,
//				"taskIdDate1":taskIdDate1,
//				"taskIdDate2":taskIdDate2,
//				"taskIdDate3":taskIdDate3,
//				"taskIdDate4":taskIdDate4,
//				"taskIdDate5":taskIdDate5,
//				"taskIdDate6":taskIdDate6,
//				"taskIdDate7":taskIdDate7,
//				"idDate1":idDate1,
//				"idDate2":idDate2,
//				"idDate3":idDate3,
//				"idDate4":idDate4,
//				"idDate5":idDate5,
//				"idDate6":idDate6,
//				"idDate7":idDate7
//			},
//			url : prefix + '/approveall',
//			success : function(r) {
//				if (r.code == 0) {
//					layer.msg(r.msg);
//					reLoad();
//				} else {
//					layer.msg(r.msg);
//				}
//			}
//		});}





function batchRemove() {
	var rows = $('#exampleTable').bootstrapTable('getSelections'); // 返回所有选择的行，当没有选择的记录时，返回一个空数组
	if (rows.length == 0) {
		layer.msg("请选择要删除的数据");
		return;
	}
	layer.confirm("确认要删除选中的'" + rows.length + "'条数据吗?", {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		var ids = new Array();
		// 遍历所有选择的行数据，取每条数据对应的ID
		$.each(rows, function(i, row) {
			ids[i] = row['timesheetId'];
		});
		$.ajax({
			type : 'POST',
			data : {
				"ids" : ids
			},
			url : prefix + '/batchRemove',
			success : function(r) {
				if (r.code == 0) {
					layer.msg(r.msg);
					reLoad();
				} else {
					layer.msg(r.msg);
				}
			}
		});
	}, function() {

	});
}
