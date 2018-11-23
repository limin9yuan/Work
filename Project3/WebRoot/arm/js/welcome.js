/**
 * 我的工作台显示
 * 
 * @author
 * @since 2018-11-09
 */



Ext.onReady(function() {   
	var rownum;
	var bbar =null;
	var number=null;
	var grid = null;
	var store =null;
	var summary = null;
	var cm;
	// 定义自动当前页行号
	rownum = new Ext.grid.RowNumberer({
    	header : 'NO',
    	width : 28
	});
	
		cm = new Ext.grid.ColumnModel([rownum, {
		header : '收费员编号',
		dataIndex : 'userid',
		hidden : false,
		width:95,
		align:'right',
		sortable : true
	},{
		header : '收费员',
		dataIndex : 'house_manager_name',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '收费面积',
		dataIndex : 'charge_area',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '应收金',
		dataIndex : 'real_account',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '减免',
		dataIndex : 'minus_money',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '已收',
		dataIndex : 'now_cash',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '已收抹零',
		dataIndex : 'delzero',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '实收',
		dataIndex : 'real_charge',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '欠费',
		dataIndex : 'qf',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	},{
		header : '清欠率(%)',
		dataIndex : 'qql',
		hidden : false,
		width:100,
		align:'right',
		sortable : true
	}
		]); 
	
	/**
	 * 数据存储
	 */
	store = new Ext.data.Store({
    	// 获取数据的方式
    	proxy : new Ext.data.HttpProxy({
    				url : 'module/hou.ered?reqCode=queryChargeList'
        }),
		// 数据读取器
		reader : new Ext.data.JsonReader({
    		totalProperty : 'TOTALCOUNT', // 记录总数
    		root : 'ROOT' // Json中的列表数据根节点
		}, [{
    			name : 'userid'
    		},{
    			name : 'house_manager_name'
    		},{
    			name : 'charge_area'
    		},{
    			name : 'real_account'
    		},{
    			name : 'minus_money'
    		},{
    			name : 'now_cash'
    		},{
    			name : 'delzero'
    		},{
    			name : 'real_charge'
    		},{
    			name : 'qf'
    		},{
    			name : 'qql'
    		}
    		
		])
    });
	
	// 每页显示条数下拉选择框
	var pagesize_combo = new Ext.form.ComboBox({
		name : 'pagesize',
		triggerAction : 'all',
		mode : 'local',
		store : new Ext.data.ArrayStore({
					fields : ['value', 'text'],
					data : [[10, '10条/页'], [20, '20条/页'], [50, '50条/页'], [100, '100条/页'], [250, '250条/页'], [500, '500条/页']]
				}),
		valueField : 'value',
		displayField : 'text',
		value : '20',
		editable : false,
		width : 85
	});
	
	number = parseInt(pagesize_combo.getValue());
	// 改变每页显示条数reload数据
	pagesize_combo.on("select", function(comboBox) {
				bbar.pageSize = parseInt(comboBox.getValue());
				number = parseInt(comboBox.getValue());
				store.reload({
							params : {
								start : 0,
								limit : bbar.pageSize
							}
						});
			});
	// 分页工具栏
	bbar = new Ext.PagingToolbar({
		pageSize : 10,
		store : store,
		displayInfo : true,
		displayMsg : '显示{0}条到{1}条,共{2}条',
		plugins : new Ext.ux.ProgressBarPager(), // 分页进度条
		emptyMsg : "没有符合条件的记录",
		items : ['-', '&nbsp;&nbsp;', pagesize_combo, '-', {
			text : '合计',
			iconCls : 'addIcon',
			handler : function() {
				summary.toggleSummary();
			}
		}]
    });
	
	// 合计
	summary = new Ext.ux.grid.GridSummary();
	

	store.load({
		params : {
			start : 0,
			limit : bbar.pageSize,
			charge_month : '',
			have_minus:'1' 
		},
		callback :fnSumInfo
	});
	
	grid = new Ext.grid.GridPanel({
    	region : 'center',
    	collapsible : false,
    	border : false,
    	height:200,
    	width:'100%',
    	title : '',
    	autoScroll : true,
    	frame : true,
    	store : store, // 数据存储
    	stripeRows : true, // 斑马线
    	cm : cm, // 列模型
    	//sm : sm, // 复选框
    	bbar : bbar,// 分页工具栏
    	singleSelect:true,
    	renderTo: 'cumGrid',
    	plugins : [summary], // 合计
    	viewConfig : {
    		// 不产生横向滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
    		forceFit : false
    	},
    	loadMask : {
    		msg : '正在加载表格数据,请稍等...'
    	}
	});	
	/**
	 * 汇总表格
	 */
	function fnSumInfo() {
		Ext.Ajax.request({
					url : 'module/hou.ered?reqCode=sumChargeList',
					success : function(response) { // 回调函数有1个参数
						summary.toggleSummary(true);
						summary.setSumValue(Ext.decode(response.responseText));
					},
					failure : function(response) {
						Ext.MessageBox.alert('提示', '汇总数据失败');
					}
				});
	}
	
/*******************首页收费情况饼图**************************/

	Ext.Ajax.request({
		url : 'module/hou.ered?reqCode=sumChargePie',
		success : function(response) {
			var resultArray = Ext.util.JSON.decode(response.responseText);
			var dateArray = new Array();
			dateArray.push({name:"已收",value:resultArray.now_cash});
			dateArray.push({name:"欠费",value:resultArray.qf});
			
		//	console.log(dateArray);
				var myChart1 = echarts.init(document.getElementById('pie1'));
				option1 = {	
				    title:{
				        text:'用户缴费情况',
				        top:'bottom',
				        left:'center',
				        textStyle:{
				            fontSize: 14,
				            fontWeight: '',
				            color: '#333'
				        },
				    },//标题
				    tooltip: {
				       trigger: 'item',
				        formatter: "{a} <br/>{b}: {c} ({d}%)",
				        /*formatter:function(val){   //让series 中的文字进行换行
				             console.log(val);//查看val属性，可根据里边属性自定义内容
				             var content = var['name'];
				             return content;//返回可以含有html中标签
				         },*/ //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
				    },//提示框，鼠标悬浮交互时的信息提示 
				   
				    /*legend: {
				        show: false,	
				        orient: 'vertical',
				        x: 'left',
				        data: ['50%-学生', '25%-老师', '25%-家长']
				    },//图例属性，以饼状图为例，用来说明饼状图每个扇区，data与下边series中data相匹配
			*/	  
				    graphic:{
				        type:'text',
				        left:'center',
				        top:'center',
				        style:{
				            text:'用户', //使用“+”可以使每行文字居中
				            textAlign:'center',
				            font:'italic bolder 16px cursive',
				            fill:'#000',
				            width:30,
				            height:30
				        }
				    },//此例饼状图为圆环中心文字显示，这是一个原生图形元素组件，功能很多
				   
				    series: [
				        {
				            name:'用户',//tooltip提示框中显示内容
				            type: 'pie',//图形类型，如饼状图，柱状图等
				            radius: ['35%', '65%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
				         //   roseType:'area',  //是否显示成南丁格尔图，默认false
				            itemStyle: {
				                normal:{
				                    label:{
				                        show:true,
				                        textStyle:{color:'#3c4858',fontSize:"18"},
				                        formatter:function(val){   //让series 中的文字进行换行
				                            return val.name.split("-").join("\n");}
				                    },//饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
				                    labelLine:{
				                        show:true,
				                        lineStyle:{color:'#3c4858'}
				                    }//线条颜色
				                },//基本样式
				                emphasis: {
				                    shadowBlur: 10,
				                    shadowOffsetX: 0,
				                    shadowColor: 'rgba(0, 0, 0, 0.5)',//鼠标放在区域边框颜色
				                    textColor:'#000'
				                }//鼠标放在各个区域的样式                
				            },
				            data:dateArray,
				           	
				            color: ['#FFB703','#5FA0FA'],//各个区域颜色
				        },//数组中一个{}元素，一个图，以此可以做出环形图
				    ],//系列列表
				};
				myChart1.setOption(option1);
				
				
		},
		failure : function(response) {
			Ext.MessageBox.alert('读取失败！');
		}
	});
	
	/*********************首页收费员收费情况饼图******************************/
	
	
	
	
});	
Ext.Ajax.request({
	url : 'module/hou.ered?reqCode=userChargePie',
	success : function(response) {
		var resultArray = Ext.util.JSON.decode(response.responseText);
		var dateArray = resultArray.ROOT;
		
	//	console.log(dateArray);
			var myChart1 = echarts.init(document.getElementById('pie2'));
			option1 = {	
			    title:{
			        text:'收费员收费情况',
			        top:'bottom',
			        left:'center',
			        textStyle:{
			            fontSize: 14,
			            fontWeight: '',
			            color: '#333'
			        },
			    },//标题
			    tooltip: {
			       trigger: 'item',
			        formatter: "{a} <br/>{b}: {c} ({d}%)",
			        /*formatter:function(val){   //让series 中的文字进行换行
			             console.log(val);//查看val属性，可根据里边属性自定义内容
			             var content = var['name'];
			             return content;//返回可以含有html中标签
			         },*/ //自定义鼠标悬浮交互信息提示，鼠标放在饼状图上时触发事件
			    },//提示框，鼠标悬浮交互时的信息提示 
			    graphic:{
			        type:'text',
			        left:'center',
			        top:'center',
			        style:{
			            text:'收费员', //使用“+”可以使每行文字居中
			            textAlign:'center',
			            font:'italic bolder 16px cursive',
			            fill:'#000',
			            width:30,
			            height:30
			        }
			    },//此例饼状图为圆环中心文字显示，这是一个原生图形元素组件，功能很多
			    series: [
			        {
			            name:'收费员',//tooltip提示框中显示内容
			            type: 'pie',//图形类型，如饼状图，柱状图等
			            radius: ['35%', '65%'],//饼图的半径，数组的第一项是内半径，第二项是外半径。支持百分比，本例设置成环形图。具体可以看文档或改变其值试一试
			         //   roseType:'area',  //是否显示成南丁格尔图，默认false
			            itemStyle: {
			                normal:{
			                    label:{
			                        show:true,
			                        textStyle:{color:'#3c4858',fontSize:"18"},
			                        formatter:function(val){   //让series 中的文字进行换行
			                            return val.name.split("-").join("\n");}
			                    },//饼图图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。可以与itemStyle属性同级，具体看文档
			                    labelLine:{
			                        show:true,
			                        lineStyle:{color:'#3c4858'}
			                    }//线条颜色
			                },//基本样式
			                emphasis: {
			                    shadowBlur: 10,
			                    shadowOffsetX: 0,
			                    shadowColor: 'rgba(0, 0, 0, 0.5)',//鼠标放在区域边框颜色
			                    textColor:'#000'
			                }//鼠标放在各个区域的样式                
			            },
			            data:dateArray,
			           	
			           // color: ['#FFB703','#5FA0FA'],//各个区域颜色
			        },//数组中一个{}元素，一个图，以此可以做出环形图
			    ],//系列列表
			};
			myChart1.setOption(option1);
			
			
	},
	failure : function(response) {
		Ext.MessageBox.alert('读取失败！');
	}
});

