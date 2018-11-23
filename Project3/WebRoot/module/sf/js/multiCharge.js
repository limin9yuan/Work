/**
 * 综合实例：查询1
 *
 * @author XiongChun
 * 
 * @since 2010-11-20
 */
 var bbar =null;
 var store =null;
 var pForm = null;
 var grid = null;
 var summary = null;
 var latefeeWindow =null;
 var latefeeForm = null;
Ext.onReady(function() {

    //收费项目
    item_codeStore = new Ext.data.Store({
        proxy : new Ext.data.HttpProxy({
            url : 'chg.ered?reqCode=getItems'
        }),
        reader : new Ext.data.JsonReader({},
            [{
                name : 'value'
            }, {
                name : 'text'
            }])
        });
   item_codeStore.load();
   item_codeCbx = new Ext.form.ComboBox({
        id : 'query_item_code',
        fieldLabel : '收费项目',
        emptyText : '请选择收费项目',
        triggerAction : 'all',
        store : item_codeStore,
        displayField : 'text',
        valueField : 'value',
        loadingText : '正在加载数据...',
        mode : 'local',
        forceSelection : true,
        typeAhead : true,
        resizable : true,
        editable : false,
        typeAhead : true,
        selectOnFocus:true,
        anchor : '100%',
        cls:'m_in',
        allowBlank :true,
        value:'供热费'
    });
	/*字典-交款方式*/
	pay_modeCbx= new Ext.form.ComboBox({
		hiddenName : 'pay_mode',
		fieldLabel : '交款方式',
		labelWidth : 60,
		store : PAY_MODEStore,
		mode : 'local',
		triggerAction : 'all',
		valueField : 'value',
		displayField : 'text',
		emptyText : '请选择...',
		allowBlank : false,
		forceSelection : true,
		editable : false,
		typeAhead : true,
		anchor : '100%'
	});
	pForm = new Ext.form.FormPanel({
		region : 'south',
		//region : 'north',
		title : '',
		//collapsible : true,
		border : false,
		labelWidth : 90, // 标签宽度
		// frame : true, //是否渲染表单面板背景色
		labelAlign : 'right', // 标签对齐方式
		bodyStyle : 'padding:3 5 0', // 表单元素和表单面板的边距
		buttonAlign : 'right',
		height : 200,
		renderTo : 'pFormDiv',
		items : [{
    				layout : 'column',
    				border : false,
    				items : [{
								columnWidth : .25,
								layout : 'form',
								labelWidth : 90, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
                                            fieldLabel : '滞纳金截止日期',
    			                            name:'enter_date',
    			                            labelStyle : 'color:blue;',
    										format:'Y-m-d', //日期格式化
    										maxValue:'3000-12-31', //允许选择的最大日期
    										minValue:'1900-01-01',//允许选择的最小日
    									    allowBlank :true,
    										blankText:'滞纳金截止日期!',
    										cls :'ipt_r',
    										name:'latefee_enddate',
    										anchor : '100%',
    										xtype : 'datefield',
    										readOnly:true,
    										labelStyle : 'color:black;'
										},{
											fieldLabel : '供热费应收',
                                            id:'real_account',
											name : 'real_account',
											xtype : 'textfield', // 设置为数字输入框类型
											anchor : '100%',
											cls :'ipt_r',
											readOnly:true
										}]
							},{
								columnWidth : .25,
								layout : 'form',
								labelWidth : 70, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [new Ext.form.NumberField({
    										fieldLabel:"滞纳金应收",
    										id:'latefee_realaccount',
    										name :'latefee_realaccount',
    										allowDecimals:true,  //不允许输入小数
    										nanText:"请输入有效数字", //无效数字提示
    										allowNegative:false,       //不允许输入负数
    										anchor : '100%',
    										value:0,
    										cls :'ipt_rb',
    										readOnly:true
									   }),new Ext.form.NumberField({
                                           fieldLabel:"滞纳金实收",
                                           id:'latefee_charge',
                                           name :'latefee_charge',
                                           labelStyle : 'color:blue;',
                                           allowDecimals:true,  //不允许输入小数
                                           nanText:"请输入有效数字", //无效数字提示
                                           allowNegative:false,       //不允许输入负数
                                           anchor : '100%',
                                           value:0,
                                           cls :'ipt_rb',
                                           enableKeyEvents: true,
                                           readOnly:true,
                                           listeners: {
                                               keyup: function(src, evt){
                                                   pform=pForm.getForm();
                                                   pform.findField('total_charge').setValue((Number(pform.findField('real_charge').getValue())+Number(pform.findField('latefee_charge').getValue())).toFixed(2));

                                               }
                                           }
                                       })]
							},{
								columnWidth : .25,
								layout : 'form',
								labelWidth : 70, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
    										fieldLabel : '发票代码', // 标签
    										name : 'invoice_number', // name:后台根据此name属性取值
    										maxLength : 20, // 可输入的最大文本长度,不区分中英文字符
    										allowBlank : true,
    										anchor : '100%'// 宽度百分比
										},new Ext.form.NumberField({
											fieldLabel:"供热费实收",
											id:'real_charge',
											name :'real_charge',
											labelStyle : 'color:blue;',
											allowDecimals:true,  //不允许输入小数
											nanText:"请输入有效数字", //无效数字提示
											allowNegative:false,       //不允许输入负数
											anchor : '100%',
											value:0,
											cls :'ipt_rb',
											enableKeyEvents: true,
                                            readOnly:true,
											listeners: {
    											keyup: function(src, evt){
    												pform=pForm.getForm();
    												pform.findField('total_charge').setValue(Number(pform.findField('real_charge').getValue())+Number(pform.findField('latefee_charge').getValue()));
    											}
											}
									   })]
    						},{
								columnWidth : .25,
								layout : 'form',
								labelWidth : 70, // 标签宽度
								defaultType : 'textfield',
								border : false,
								items : [{
    										fieldLabel : '发票编号', // 标签
    										name : 'invoice_code', // name:后台根据此name属性取值
    										maxLength : 20, // 可输入的最大文本长度,不区分中英文字符
    										allowBlank : true,
    										anchor : '100%'// 宽度百分比
										},new Ext.form.NumberField({
											fieldLabel:"本次总收费",
											id:'total_charge',
											name :'total_charge',
											labelStyle : 'color:blue;',
											allowDecimals:true,  //不允许输入小数
											nanText:"请输入有效数字", //无效数字提示
											allowNegative:false,       //不允许输入负数
											anchor : '100%',
											value:0,
											cls :'ipt_rb',
											readOnly:true
									   }),new Ext.form.NumberField({
											id:'delzero',
											name :'delzero',
											labelStyle : 'color:blue;',
											allowDecimals:true,  //不允许输入小数
											nanText:"请输入有效数字", //无效数字提示
											allowNegative:false,       //不允许输入负数
											anchor : '100%',
											value:0,
											cls :'ipt_rb',
											hidden : true
									   })]
    						}]
				},{
					id : 'p_id',
					xtype : 'textfield',
					hidden : true
				},{
					id : 'item_code',
					xtype : 'textfield',
					hidden : true
				},{
					id : 'minus_reason',
					xtype : 'textfield',
					hidden : true
				},{
					id : 'remark',
					xtype : 'textfield',
					hidden : true
				},{
					id : 'standard_code',
					xtype : 'textfield',
					hidden : true
				}],
		buttons : ['->',new Ext.form.Checkbox({
    			id : 'auto_print',
    			name : 'auto_print',
    			boxLabel : '自动打印票据',
    			listeners : { "check" : function(obj,ischecked){
    						setCookie("eredg4.charge.auto_print", ischecked);
    				}}
    		}),'-',{
				text : '收费',
				id:'01040201',
				iconCls : 'acceptIcon',
				hidden:parent.checkBtn('01040201'),
				style:'height:40px;width:180px;',
				handler : function() {
					charge(0);
				}
			},{
				text : '读用户卡',
				id:'01040202',
				iconCls : 'acceptIcon',
				hidden:parent.checkBtn('01040202'),
				style:'height:40px;width:180px;',
				handler : function() {
					readUserCardWriteBack();
				}
			},  {
				text : '重置',
				iconCls : 'tbar_synchronizeIcon',
				style:'height:40px;width:180px;',
				handler : function() {
				}
			}, {
				text : '预打印收据',
				iconCls : 'printerIcon',
				style:'height:40px;width:180px;margin-right:10px;',
				handler : function() {
					printReceipt('prePrint');
				}
			}]
    });

	// 定义自动当前页行号
	var rownum = new Ext.grid.RowNumberer({
    	header : 'NO',
    	width : 28
	});
	var sm = new Ext.grid.CheckboxSelectionModel();
	// 定义列模型
	var cm = new Ext.grid.ColumnModel([rownum, {
		header : '用户编号',
		dataIndex : 'house_code',
		hidden : false,
		width:120,
		sortable : true
	}, {
		header : '用户名称',
		dataIndex : 'owner_name',
		width:120
	}, {
		header : '收费项目',
		dataIndex : 'item_name',
		align:'center',
		width:70
	}, {
		header : '收费年度',
		dataIndex : 'charge_month',
		align:'center',
		width:70
	}, {
		header : '建筑面积',
		dataIndex : 'build_area',
		align:'right',
		width:80
	}, {
		header : '总应收',
		dataIndex : 'total_account',
		align:'right',
		width:80
	}, {
		header : '减免',
		dataIndex : 'minus_money',
		align:'right',
		width:70
	}, {
		header : '实应收',
		dataIndex : 'real_account',
		align:'right',
		width:80
	}, {
		header : '已收',
		dataIndex : 'now_cash',
		align:'right',
		width:80
	}, {
		header : '欠费',
		dataIndex : 'not_money',
		align:'right',
		width:80
	}, {
		header : '供热开始日期',
		dataIndex : 'plan_begin_date',
		align:'right',
		width:95
	}, {
		header : '供热截止日期',
		dataIndex : 'plan_end_date',
		align:'right',
		width:95
	}, {
		header : '滞纳金开始日期',
		dataIndex : 'latefee_startdate',
		align:'right',
		width:115
	}, {
		header : '滞纳金截止日期',
		dataIndex : 'latefee_enddate',
		align:'right',
		width:115
	}, {
		header : '滞纳金应收',
		dataIndex : 'latefee_totalaccount',
		align:'right',
		width:95
	}, {
		header : '滞纳金减免',
		dataIndex : 'latefee_minus',
		align:'right',
		width:95
	}, {
		header : '滞纳金实应收',
		dataIndex : 'latefee_realaccount',
		align:'right',
		width:95
	}, {
		header : '滞纳金实欠费',
		dataIndex : 'not_money_latefee',
		align:'right',
		width:95
	}, {
		header : '滞纳金实收',
		dataIndex : 'latefee_nowcash',
		align:'right',
		width:95
	}]);

	/**
	 * 数据存储
	 */
	store = new Ext.data.Store({
    	// 获取数据的方式
    	proxy : new Ext.data.HttpProxy({
    				url : 'chg.ered?reqCode=queryMultiChargePlan'
        }),
		// 数据读取器
		reader : new Ext.data.JsonReader({
    		totalProperty : 'TOTALCOUNT', // 记录总数
    		root : 'ROOT' // Json中的列表数据根节点
		}, [{
    			name : 'house_code'
    		}, {
    			name : 'owner_name'
    		}, {
    			name : 'item_name'
    		}, {
    			name : 'charge_month'
    		}, {
    			name : 'price'
    		}, {
    			name : 'build_area'
    		}, {
    			name : 'charge_area'
			}, {
				name : 'total_account'
			}, {
				name : 'minus_money'
			}, {
				name : 'real_account'
			}, {
				name : 'now_cash'
			}, {
				name : 'not_money'
			}, {
				name : 'p_id'
			}, {
				name : 'item_code'
			}, {
				name : 'plan_begin_date'
			}, {
				name : 'plan_end_date'
			}, {
				name : 'latefee_startdate'
			}, {
				name : 'latefee_enddate'
			}, {
				name : 'latefee_totalaccount'
			}, {
				name : 'latefee_minus'
			}, {
				name : 'latefee_realaccount'
			}, {
				name : 'not_money_latefee'
			}, {
				name : 'latefee_nowcash'
			}, {
				name : 'standard_code'
    	}])
    });
    store.on('beforeload', function() {
        var checkedNodes = parent.fcTreePanel.getChecked();
        var strID = '';
        Ext.each(checkedNodes, function(node) {
                strID = strID + "'"+node.id + "',";
            });
        strID=strID.substring(0,strID.length-1);
        this.baseParams = {
            p_item_code:Ext.getCmp('item_code').getValue(),
			p_range:strID,
			p_charge_month:Ext.getCmp('charge_month').getValue(),
			// item_code : Ext.getCmp('item_code').getValue(),
			p_returnNumber:'1'
        };
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
	// 改变每页显示条数reload数据
	pagesize_combo.on("select", function(comboBox) {
    	bbar.pageSize = parseInt(comboBox.getValue());
    	number = parseInt(comboBox.getValue());
    	store.reload({
    		params : {
    			start : 0,
    			limit : bbar.pageSize,
                p_item_code:Ext.getCmp('item_code').getValue(),
    			p_range:strID,
    			p_charge_month:Ext.getCmp('charge_month').getValue(),
    			// item_code : Ext.getCmp('item_code').getValue(),
    			p_returnNumber:'1'

    		}
    	});
	});
	var number = parseInt(pagesize_combo.getValue());
    var myDate = new Date();
    var year = myDate.getFullYear();
	var tbar = new Ext.Toolbar({
    	items : [{
				xtype : 'textfield',
				id : 'charge_month',
				name : 'charge_month',
				emptyText : '请输入年度',
				width : 150,
                value : year,
				enableKeyEvents : true,
				// 响应回车键
				listeners : {
					specialkey : function(field, e) {
						if (e.getKey() == Ext.EventObject.ENTER) {
							queryChargePlan("");
						}
					}
				}
			},'-',item_codeCbx,{
				text : '查询',
				iconCls : 'page_findIcon',
                handler : function() {
					queryPlan();
				}
			},{
				text : '刷新',
				iconCls : 'page_refreshIcon',
				handler : function() {
					store.reload();
				}
			}]
	});
    // 分页工具栏
    bbar = new Ext.PagingToolbar({
		pageSize : number,
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
	// 表格实例
	grid = new Ext.grid.GridPanel({
    	region : 'center',
    	 collapsible : false,
    	border : false,
    	title : '',
    	// height : 200,
    	autoScroll : true,
    	frame : true,
    	store : store, // 数据存储
    	stripeRows : true, // 斑马线
    	cm : cm, // 列模型
    	sm : sm, // 复选框
        tbar : tbar, // 表格工具栏
    	bbar : bbar,// 分页工具栏
    	singleSelect:true,
    	renderTo : 'gridDiv',
    	plugins : [summary], // 合计
    	viewConfig : {
    		// 不产横向生滚动条, 各列自动扩展自动压缩, 适用于列数比较少的情况
    		forceFit : false
    	},
    	loadMask : {
    		msg : '正在加载表格数据,请稍等...'
    	}
	});
	/*单选 begin*/
	var gridEl = grid.getEl();
	gridEl.select('div.x-grid3-hd-checker').removeClass('x-grid3-hd-checker'); // 删除表头的checkbox
	grid.store.on('load', function() { // 数据加载完毕替换为checkbox列增加一个class，然后我们在这个class中
    	gridEl.select("div[class=x-grid3-row-checker]").each(
    		function(x) {
    			x.addClass('x-grid3-row-radioBtn');
    		});
	});
	// 是否默认选中第一行数据
	bbar.on("change", function() {
		grid.getSelectionModel().selectFirstRow();

	});
	var noteWindow;
	var noteForm = new Ext.form.FormPanel({
    	region : 'center',
    	title : '',
    	collapsible : false,
    	border : false,
    	labelWidth : 60, // 标签宽度
    	// frame : true, //是否渲染表单面板背景色
    	labelAlign : 'right', // 标签对齐方式
    	bodyStyle : 'padding:5 5 0', // 表单元素和表单面板的边距
    	buttonAlign : 'center',
    	renderTo : 'noteDiv',
    	height : 250,
    	items : [{
    		fieldLabel : '银行名称', // 标签
    		name : 'note_bank_name', // name:后台根据此name属性取值
    		xtype : 'textfield',
    		maxLength : 100,
    		emptyText : '',
    		anchor : '100%'
    	},{
    		fieldLabel : '银行账号', // 标签
    		name : 'note_bank_code', // name:后台根据此name属性取值
    		xtype : 'textfield',
    		maxLength : 100,
    		emptyText : '',
    		anchor : '100%'
    	} ]
	});
	var v_note_bank_code = getCookie('eredg4.charge.note_bank_code');
	noteForm.getForm().findField('note_bank_code').setValue(v_note_bank_code);
	var v_note_bank_code = getCookie('eredg4.charge.note_bank_name');
	noteForm.getForm().findField('note_bank_name').setValue(v_note_bank_code);
	var v_auto_print = getCookie('eredg4.charge.auto_print');
	Ext.getCmp("auto_print").setValue(v_auto_print);
	//noteForm.getForm().findField('auto_print').setValue(v_auto_print);
	/*设置打印凭条*/
	function noteClick(){
    	if(!noteWindow){
    		noteWindow = new Ext.Window({
    			title : '设置银行账号',
    			layout : 'fit',
    			width : 350,
    			height : 150,
    			closable : true,
    			closeAction: 'hide',
    			collapsible : true,
    			maximizable : true,
    			border : true,
    			constrain : true,
    			modal : true,
    			pageY : 160,
    			pageX : document.body.clientWidth / 2 - 400 / 2,
    			items : [noteForm],
    			buttons : [{
    				text : '设置',
    				iconCls : 'acceptIcon',
    				handler : function() {
    					setCookie("eredg4.charge.note_bank_code", noteForm.getForm().findField("note_bank_code").getValue());
    					setCookie("eredg4.charge.note_bank_name", noteForm.getForm().findField("note_bank_name").getValue());
    					noteWindow.hide();
    				}
				},{
					text : '关闭',
					iconCls : 'deleteIcon',
					handler : function() {
						noteWindow.hide();
					}
				}]
			});
		}
		noteWindow.show();
    }
	/*字典-减免原因*/
	minus_reasonCbx= new Ext.form.ComboBox({
    	hiddenName : 'minus_reason',
    	fieldLabel : '减免原因',
    	labelWidth : 60,
    	store : MINUS_REASONStore,
    	mode : 'local',
    	triggerAction : 'all',
    	valueField : 'value',
    	displayField : 'text',
    	emptyText : '请选择...',
    	allowBlank : true,
    	forceSelection : true,
    	editable : false,
    	typeAhead : true,
    	anchor : '100%'
    });
	latefeeForm = new Ext.form.FormPanel({
    	region : 'center',
    	title : '',
    	collapsible : false,
    	border : false,
    	labelWidth : 100, // 标签宽度
    	// frame : true, //是否渲染表单面板背景色
    	labelAlign : 'right', // 标签对齐方式
    	bodyStyle : 'padding:5 5 0', // 表单元素和表单面板的边距
    	buttonAlign : 'center',
    	renderTo : 'noteDiv',
    	height : 280,
		items : [new Ext.form.NumberField({
    		fieldLabel:"滞纳金减免金额",
    		id:'latefee_minus',
    		name :'latefee_minus',
    		allowDecimals:true,  //不允许输入小数
    		nanText:"请输入有效数字", //无效数字提示
    		allowNegative:false,       //不允许输入负数
    		anchor : '100%',
    		value:0,
    		cls :'ipt_rb',
    		readOnly:true
	   }),minus_reasonCbx,{
    		fieldLabel : '滞纳金减免备注',
    		name : 'remark',
    		height:60,
    		xtype : 'textarea',
    		maxLength : 100,
    		emptyText : '',
    		anchor : '100%'
    	}]
	});
	// 布局
	var viewport = new Ext.Viewport({
    	layout : 'border',
        items : [ pForm,grid]
	});


			/*********************************************************************	读用户卡反写开始 ***********************************************************/

	var readUserCardWriteBackWin = null;//读用户卡反写弹出层
	var readUserCardWriteBackForm = null;//读用户卡反写菜单
	/**
	 * 读用户卡反写弹出层
	 */
	function readUserCardWriteBack() {
    	// 显示层页面
    	if(!readUserCardWriteBackWin){
    		//写阀门序列号卡表单
    		readUserCardWriteBackForm = new Ext.form.FormPanel({
    			region : 'center',
    			title : '',
    			collapsible : false,
    			border : false,
    			labelWidth : 120, // 标签宽度
    			// frame : true, //是否渲染表单面板背景色
    			labelAlign : 'right', // 标签对齐方式
    			bodyStyle : 'padding:5 5 0', // 表单元素和表单面板的边距
    			buttonAlign : 'center',
    			//renderTo : 'insertAndModDiv',
    			height : 250,
				items : [{
    				layout : 'column',
    				border : false,
    				items : [{
        				columnWidth : .9,
        				layout : 'form',
        				labelWidth : 260, // 标签宽度
        				defaultType : 'displayfield',
        				border : false,
        				items : [{fieldLabel : '以下为用户卡的反写内容',anchor : '100%'}]
    				}]
				},{
                    xtype : "panel",
                    border : false,
                    height : 10,
                    html : '<hr class="hr">'
                },{
					fieldLabel : '阀门系统时钟', // 标签
					name : 'valveSystemClock', // name:后台根据此name属性取值
					xtype : 'displayfield',
					allowBlank : false,
					//blankText:"改变IC卡读写器的串口号不能为空！",
					anchor : '100%'// 宽度百分比
				},{
					fieldLabel : '开门时间', // 标签
					name : 'openValveDate', // name:后台根据此name属性取值
					xtype : 'displayfield',
					allowBlank : false,
					//blankText:"改变IC卡读写器的串口号不能为空！",
					anchor : '100%'// 宽度百分比
				},{
					fieldLabel : '关门时间', // 标签
					name : 'closeValveDate', // name:后台根据此name属性取值
					xtype : 'displayfield',
					allowBlank : false,
					//blankText:"改变IC卡读写器的串口号不能为空！",
					anchor : '100%'// 宽度百分比
				},{
    				fieldLabel : '防盗时间', // 标签
    				name : 'alarmDate', // name:后台根据此name属性取值
    				xtype : 'displayfield',
    				allowBlank : false,
    				//blankText:"改变IC卡读写器的串口号不能为空！",
    				anchor : '100%'// 宽度百分比
    			},{
					fieldLabel : '阀门序列号', // 标签
					name : 'valveCode', // name:后台根据此name属性取值
					xtype : 'displayfield',
					allowBlank : false,
					//blankText:"改变IC卡读写器的串口号不能为空！",
					anchor : '100%'// 宽度百分比
				},{
					fieldLabel : '用户卡号', // 标签
					name : 'card_id', // name:后台根据此name属性取值
					xtype : 'displayfield',
					allowBlank : false,
					//blankText:"改变IC卡读写器的串口号不能为空！",
					anchor : '100%'// 宽度百分比
				},{
					fieldLabel : '开启度', // 标签
					name : 'openAngle', // name:后台根据此name属性取值
					xtype : 'displayfield',
					allowBlank : false,
					//blankText:"改变IC卡读写器的串口号不能为空！",
					anchor : '100%'// 宽度百分比
				} ]
    		});
    		readUserCardWriteBackWin = new Ext.Window({
    			title : '读射频卡反写内容', // 窗口标题
    			layout : 'fit', // 设置窗口布局模式
    			width : 550, // 窗口宽度
    			height : 300, // 窗口高度
    			closable : true, // 是否可关闭
    			closeAction: 'hide',
    			collapsible : true, // 是否可收缩
    			maximizable : true, // 设置是否可以最大化
    			border : true, // 边框线设置
    			constrain : true, // 设置窗口是否可以溢出父容器
    			modal : true,
    			pageY : 100, // 页面定位X坐标
    			pageX : document.body.clientWidth / 2 - 400 / 2, // 页面定位Y坐标
    			items : [readUserCardWriteBackForm], // 嵌入的表单面板
    			buttons : [{ // 窗口底部按钮配置
    				text : '读卡', // 按钮文本
    				iconCls : 'acceptIcon', // 按钮图标
    				handler : function() {
    					readUserCardWriteBackFCT();
    				}
				},{ // 窗口底部按钮配置
    				text : '关闭', // 按钮文本
    				iconCls : 'deleteIcon', // 按钮图标
    				handler : function() { // 按钮响应函数
    					readUserCardWriteBackWin.hide();
					}
				}]
			});
		}
		// 显示window
		readUserCardWriteBackWin.show();
	}
	/**
	 * 读用户卡反写弹出层中的读卡按钮
	 */
	function readUserCardWriteBackFCT() {
    	var fm = readUserCardWriteBackForm.getForm();
    	spReader = parent.spReader;
    	var dt ="";
		if(spReader != ""){
            var rcFlag = checkReadyCard(spReader);//校验读卡器
    			if(rcFlag == "1"){
    				/* 调用世达科技接口-读用户卡
    				 * SDWriteCARD.ReadUserCard(参数1)
    				 * 参数1:端口号(COM口号)
    				 * 返回值:阀门号/开门时间/关门时间/开启度
    				 */
					var rucwbValue = SDWriteCARD.ReadUserCard(spReader);
					var successInfo = "";
					var readContent = "";
					if(rucwbValue == "0"){
        				successInfo = "读卡失败";
        				readUserCardWriteBackWin.hide();//读用户卡反写弹出层隐藏
					}else{
						var backValue = rucwbValue.split("/");
						fm.findField("valveSystemClock").setValue("");//阀门系统时钟
						fm.findField("openValveDate").setValue(backValue[1]);//开门时间
						fm.findField("closeValveDate").setValue(backValue[2]);//关门时间
						fm.findField("alarmDate").setValue("");//防盗时间
						fm.findField("valveCode").setValue(backValue[0]);//阀门序列号
						fm.findField("openAngle").setValue(backValue[3]);//阀门开启度
						//readUserCardWriteBackForm.valveSystemClock.value = "";//阀门系统时钟
						//readUserCardWriteBackForm.openValveDate.value = backValue[1];//开门时间
						//readUserCardWriteBackForm.closeValveDate.value = backValue[2];//关门时间
						//readUserCardWriteBackForm.alarmDate.value = "";//防盗时间
						//readUserCardWriteBackForm.valveCode.value = backValue[0];//阀门序列号
						//readUserCardWriteBackForm.openAngle.value = backValue[3];//阀门开启度

						successInfo = "读卡成功";
						readContent = ",阀门序列号:"+backValue[0]+",开门时间:"+backValue[1]+",关门时间:"+backValue[2]+",开启度:"+backValue[3];
						var tmpValveCode = backValue[0];
						loadInfoListByValveCode(tmpValveCode);
					}
					Ext.Ajax.request({
    					url : 'userCard.ered?reqCode=userCard',
    					params : {
    						operateName:"读用户卡反写",
    						operateContent:successInfo+",COM口号:"+spReader+""+readContent
    					},
						success : function(response) { // 回调函数有1个参数
							hideWaitMsg();
								readUserCardWriteBackWin.hide();//读用户卡反写弹出层隐藏
						},
						failure : function(response) {
							hideWaitMsg();
							Ext.MessageBox.alert('提示', '数据保存失败');
						}
					});
				}else{
    				return false;
				}
			}else{
    			alert("SP卡COM口号没有设置,请到用户卡管理->设置读写器里设置!");
    			return false;
			}
	}
	/**
	 * 校验读卡器  几乎所有按钮都调用
	 */
	function checkReadyCard(spReader) {
		/* 调用世达科技接口-写用户卡
		 * SDWriteCARD.CheckDevice(参数1)
		 * 参数1:端口号(COM口号)
		 * 返回值:成功 返回值 1
		 *		 不成功 返回值
		 *		 0 ----  代表 加载动态库错误
		 *		 2 ----  代表 没有读写器
		 *		 3 ----  代表 没有卡
		 */
		if (spReader != "") {
			var readyCardFlag = SDWriteCARD.CheckDevice(spReader);
			if(readyCardFlag == "1"){
				return readyCardFlag;
			}else if(readyCardFlag == "0"){
				alert("加载动态库错误!");
				return readyCardFlag;
			}else if(readyCardFlag == "2"){
				alert("没有插入读写器或串口号错误!");
				return readyCardFlag;
			}else if(readyCardFlag == "3"){
				alert("读写器上没有放卡!");
				return readyCardFlag;
			}
						}else{
							alert("SP卡COM口号没有设置,请到用户卡管理->设置读写器里设置!");
							return false;
						}
					}
			/*********************************************************************	读用户卡反写结束 ***********************************************************/
});
/**
 * 查询
 */
function queryPlan() {
    var checkedNodes = parent.fcTreePanel.getChecked();
    if (Ext.isEmpty(checkedNodes)) {
        Ext.Msg.alert('提示', '请选择要批量缴费的小区、大楼或者房间。');
        return;
    }
    if (Ext.isEmpty(Ext.getCmp('charge_month').getValue())) {
        Ext.Msg.alert('提示', '请输入要生成批量缴费的年度。');
        //Ext.getCmp('charge_month').focus(true);
        return;
    }
    if (Ext.isEmpty(Ext.getCmp('query_item_code').getValue())) {
        Ext.Msg.alert('提示', '请选择收费项目。');
        //Ext.getCmp('charge_month').focus(true);
        return;
    }
    var strID = '';
    Ext.each(checkedNodes, function(node) {
                strID = strID + "'"+node.id + "',";
            });
    strID=strID.substring(0,strID.length-1);
        var params={
            p_item_code:Ext.getCmp('item_code').getValue(),
            p_range:strID,
            p_charge_month:Ext.getCmp('charge_month').getValue(),
            p_returnNumber:'1'};
            queryChargePlan("");
}

function queryChargePlan(p_house_code) {
	var checkedNodes = parent.fcTreePanel.getChecked();
	var strID = '';
	Ext.each(checkedNodes, function(node) {
			strID = strID + "'"+node.id + "',";
		});
	strID=strID.substring(0,strID.length-1);
    if(Ext.getCmp('query_item_code').getValue() == '供热费'){
        Ext.getCmp('query_item_code').setValue('A');
    }
	store.load({
		params : {
			start : 0,
			limit : bbar.pageSize,
			charge_month : Ext.getCmp('charge_month').getValue(),
			item_code : Ext.getCmp('item_code').getValue(),
			p_range:strID,
            query_item_code : Ext.getCmp('query_item_code').getValue()
		},
		callback :fnSumInfo
	});

}
/*减免滞纳金*/
function showLatfee(){
	if(!latefeeWindow){
		latefeeForm.getForm().findField('latefee_minus').setValue(
				(Number(pform.findField('latefee_realaccount').getValue()) -	Number(pform.findField('latefee_charge').getValue())).toFixed(2)
		);
		latefeeWindow = new Ext.Window({
				title : '滞纳金减免',
				layout : 'fit',
				width : 400,
				height : 250,
				closable : true,
				closeAction: 'hide',
				collapsible : true,
				maximizable : true,
				border : true,
				constrain : true,
				modal : true,
				pageY : 160,
				pageX : document.body.clientWidth / 2 - 400 / 2,
				items : [latefeeForm],
				buttons : [{
					text : '减免滞纳金并收费',
					iconCls : 'acceptIcon',
					handler : function() {
						var pform=pForm.getForm();
						var latefeeform=latefeeForm.getForm();
						pform.findField('minus_reason').setValue(latefeeform.findField('minus_reason').getValue());
						pform.findField('remark').setValue(latefeeform.findField('remark').getValue());
						charge(1);
						latefeeWindow.hide();
					}
				},{
					text : '取消',
					iconCls : 'deleteIcon',
					handler : function() {
						pform.findField('minus_reason').setValue("");
						pform.findField('remark').setValue("");
						latefeeWindow.hide();
					}
				}]
			});
		}
		latefeeWindow.show();
	}
/**
 * 汇总表格
 */
function fnSumInfo() {
	Ext.Ajax.request({
    	url : 'chg.ered?reqCode=sumMultiChargePlan',
    	success : function(response) { // 回调函数有1个参数
    		summary.toggleSummary(true);
    		summary.setSumValue(Ext.decode(response.responseText));
            computeRecord(Ext.decode(response.responseText))
    	},
    	failure : function(response) {
    		Ext.MessageBox.alert('提示', '汇总数据失败');
    	}
    });
}

function loadInvoice(v_item_code){
	var params={'item_code':v_item_code};
	Ext.Ajax.request({
		url : 'chg.ered?reqCode=loadInvoiceCode',
		success : function(response) {
			var resultArray = Ext.util.JSON.decode(response.responseText);
			pform=pForm.getForm();
			pform.findField('invoice_code').setValue(resultArray.data.invoice_code);
			pform.findField('invoice_number').setValue(resultArray.data.invoice_number);

		},
		failure : function(response) {
			Ext.MessageBox.alert('提示', '取得票据失败!');
		},
		params : params
	});
}

function loadInfoListByValveCode(p_valve_code){
	loadHouseInfoByValveCode(p_valve_code);

}
function computeRecord(p_record){
	pform=pForm.getForm();
	pform.findField('latefee_realaccount').setValue(p_record.not_money_latefee);
	pform.findField('real_account').setValue(p_record.not_money);
	pform.findField('latefee_charge').setValue(p_record.not_money_latefee);
	pform.findField('real_charge').setValue(p_record.not_money);
	pform.findField('total_charge').setValue((Number(p_record.not_money_latefee)+Number(p_record.not_money)).toFixed(2));
	// loadInvoice(p_record.get('item_code'));
}
function charge(fromLateFee){
	var rows = grid.getSelectionModel().getSelections();
	if (Ext.isEmpty(rows)) {
		Ext.Msg.alert('提示', '无欠费记录，不能收费！');
		return;
	}
	var money = pForm.getForm().findField('total_charge').getValue();
	if(Number(money)==0){
		Ext.Msg.alert('提示', '本次总收费金额必须大于0！');
		return;
	}

	if(!pForm.form.isValid()){
		Ext.Msg.alert('提示', '请修改录入错误的数据！');
		return;
	}
	var v_latefee_realaccount = pForm.getForm().findField('latefee_realaccount').getValue();
	var v_latefee_charge = pForm.getForm().findField('latefee_charge').getValue();
	if(Number(v_latefee_realaccount)<Number(v_latefee_charge)){
		Ext.Msg.alert('提示', '滞纳金实收不能大于滞纳金应收！');
		return;
	}
	if(fromLateFee==0){

		if(Number(v_latefee_realaccount)!=Number(v_latefee_charge)){
			showLatfee();
			return;
		}
	}
	var params = pForm.getForm().getValues();
    var checkedNodes = parent.fcTreePanel.getChecked();
    var strID = '';
    Ext.each(checkedNodes, function(node) {
                strID = strID + "'"+node.id + "',";
            });
    strID=strID.substring(0,strID.length-1);
    var params={
        p_range:strID,
        p_item_code:Ext.getCmp('query_item_code').getValue(),
        p_charge_month:Ext.getCmp('charge_month').getValue()
    };
	Ext.Ajax.request({
		url : 'chg.ered?reqCode=multiCharge',
		success : function(response) {
			var resultArray = Ext.util.JSON.decode(response.responseText);
			if(resultArray.success==true){
				printReceipt('chargePrint');
				clearForm(pForm.getForm());
			}
			Ext.Msg.alert('提示', resultArray.msg);
			pform=pForm.getForm();
            queryPlan();
		},
		failure : function(response) {
			Ext.MessageBox.alert('提示', '数据保存失败');
		},
		params : params
	});

}
function printReceipt(printType){
	if((Ext.getCmp('auto_print').getValue()!=true)&&(printType!='prePrint')){
		return;
	}
	var record = grid.getSelectionModel().getSelected();
	var pform = pForm.getForm();
	str="rpt_id=sysReceipt"
	+"&invoice_code="+pform.findField('invoice_code').getValue()
	+"&invoice_number="+pform.findField('invoice_number').getValue()
	+"&real_account="+pform.findField('real_account').getValue()
	+"&latefee_charge="+pform.findField('latefee_charge').getValue()
	+"&real_charge="+pform.findField('total_charge').getValue()
	+"&charge_month="+record.get('charge_month')
	+"&plan_begin_date="+record.get('plan_begin_date')
	+"&plan_end_date="+record.get('plan_end_date')
	+"&total_account="+record.get('total_account')
	+"&item_code="+record.get('item_code')
	+"&item_name="+record.get('item_name')
	+"&standard_code="+record.get('standard_code');
	alert(str);
	printInvoice(str);

}
function searchHouse(){
}
