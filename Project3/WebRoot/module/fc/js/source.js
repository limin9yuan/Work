/**
 * 热源站所管理
 *
 * @author smile
 * @since 2011-08-12
 */
var current_source_id="";
var menuid="";
Ext.onReady(function() {
	var root = new Ext.tree.AsyncTreeNode( {
		text : '所有热源',
		expanded : true,
		id : '01'
	});
	var menuTree = new Ext.tree.TreePanel( {
		loader : new Ext.tree.TreeLoader( {
			baseAttrs : {},
			dataUrl : 'sr.ered?reqCode=querySourceTree'
		}),
		root : root,
		title : '',
		applyTo : 'sourceTreeDiv',
		autoScroll : false,
		animate : false,
		useArrows : false,
		//rootVisible:false,
		border : false
	});
	menuTree.on('click', function(node) {
		menuid = node.attributes.id;
		//menuname = node.attributes.text;
		//Ext.getCmp('source_name').setValue(menuname);
		Ext.getCmp('source_id').setValue(menuid);
		if(node.getDepth()==1){
		current_source_id=	menuid;
		}
		store.load( {
			params : {
				start : 0,
				limit : bbar.pageSize,
				source_id : menuid
			}
		});
	});
	menuTree.root.select();
	var contextMenu = new Ext.menu.Menu( {
		id : 'menuTreeContextMenu',
		items : [ {
			text : '新建热源',
			iconCls : 'page_addIcon',
			handler : function() {
				addSource();
			}
		}, {
			text : '修改热源',
			iconCls : 'page_edit_1Icon',
			handler : function() {
				editSource();
			}
		}, {
			text : '删除热源',
			iconCls : 'page_delIcon',
			handler : function() {
				deleteSource('2', '01');
			}
		}, {
			text : '新建换热站',
			iconCls : 'page_addIcon',
			handler : function() {
				addStat();
			}
		}, {
			text : '修改换热站',
			iconCls : 'page_edit_1Icon',
			handler : function() {
				editInit();
			}
		}, {
			text : '删除换热站',
			iconCls : 'page_delIcon',
			handler : function() {
				var selectModel = menuTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				deleteStation('2', selectNode.attributes.id);
			}
		}, {
			text : '刷新节点',
			iconCls : 'page_refreshIcon',
			handler : function() {
				var selectModel = menuTree.getSelectionModel();
				var selectNode = selectModel.getSelectedNode();
				if (selectNode.attributes.leaf) {
					selectNode.parentNode.reload();
				} else {
					selectNode.reload();
				}
			}
		} ]
	});
	menuTree.on('contextmenu', function(node, e) {
		e.preventDefault();
		menuid = node.attributes.id;
		menuname = node.attributes.text;
		//Ext.getCmp('source_name').setValue(menuname);
		Ext.getCmp('source_id').setValue(menuid);
		store.load( {
			params : {
				start : 0,
				limit : bbar.pageSize,
				menuid : menuid
			},
			callback : function(r, options, success) {
				for ( var i = 0; i < r.length; i++) {
					var record = r[i];
					var menuid_g = record.data.menuid;
					if (menuid_g == menuid) {
						grid.getSelectionModel().selectRow(i);
					}
				}
			}
		});
		node.select();
		contextMenu.showAt(e.getXY());
	});

	var sm = new Ext.grid.CheckboxSelectionModel();
	var cm = new Ext.grid.ColumnModel( [ new Ext.grid.RowNumberer(), sm,
	{
		header : '序号',
		dataIndex : 'order_id',
		sortable : true,
		width : 50
	}, {
		header : '热源编号',
		dataIndex : 'source_id',
		width : 130
	},{
		header : '热源名称',
		dataIndex : 'source_name',
		width : 130
	},  {
		header : '换热站编码',
		dataIndex : 'stat_id',
		width : 130
	}, {
		header : '换热站名称',
		dataIndex : 'stat_name',
		width : 200
	}, {
		id : 'remark',
		header : '备注',
		dataIndex : 'remark'
	} ]);
	/**
	 * 数据存储
	 */
	var store = new Ext.data.Store( {
		proxy : new Ext.data.HttpProxy( {
			url : 'sr.ered?reqCode=queryStation'
		}),
		reader : new Ext.data.JsonReader( {
			totalProperty : 'TOTALCOUNT',
			root : 'ROOT'
		}, [  {
			name : 'order_id'
		},{
			name : 'source_id'
		}, {
			name : 'source_name'
		}, {
			name : 'stat_id'
		}, {
			name : 'stat_name'
		},{
			name : 'remark'
		} ])
	});

	// 翻页排序时带上查询条件
		store.on('beforeload', function() {
			this.baseParams = {
				//queryParam : Ext.getCmp('queryParam').getValue()
			};
		});
		store.on('load', function() {
			if(menuid=='01'){
				cm.setHidden(  3 ,  false ) ;
				cm.setHidden(  4 ,  false ) ;
				cm.setHidden(  5 ,  true ) ;
				cm.setHidden(  6 ,  true ) ;
			}else{
				//cm.setHidden(  3 ,  true ) ;
				//cm.setHidden(  4 ,  true ) ;
				cm.setHidden(  5 ,  false ) ;
				cm.setHidden(  6 ,  false ) ;
			}
		});

		var pagesize_combo = new Ext.form.ComboBox( {
			name : 'pagesize',
			hiddenName : 'pagesize',
			typeAhead : true,
			triggerAction : 'all',
			lazyRender : true,
			mode : 'local',
			store : new Ext.data.ArrayStore(
					{
						fields : [ 'value', 'text' ],
						data : [ [ 10, '10条/页' ], [ 20, '20条/页' ],
								[ 50, '50条/页' ], [ 100, '100条/页' ],
								[ 250, '250条/页' ], [ 500, '500条/页' ] ]
					}),
			valueField : 'value',
			displayField : 'text',
			value : '50',
			editable : false,
			width : 85
		});
		var number = parseInt(pagesize_combo.getValue());
		pagesize_combo.on("select", function(comboBox) {
			bbar.pageSize = parseInt(comboBox.getValue());
			number = parseInt(comboBox.getValue());
			store.reload( {
				params : {
					start : 0,
					limit : bbar.pageSize
				}
			});
		});

		var bbar = new Ext.PagingToolbar( {
			pageSize : number,
			store : store,
			displayInfo : true,
			displayMsg : '显示{0}条到{1}条,共{2}条',
			emptyMsg : "没有符合条件的记录",
			items : [ '-', '&nbsp;&nbsp;', pagesize_combo ]
		});

		var grid = new Ext.grid.GridPanel(
				{
					title : '',
					iconCls:'application_view_listIcon',
					renderTo : 'menuGridDiv',
					height : 500,
					// width:600,
					autoScroll : true,
					region : 'center',
					store : store,
					/*loadMask : {
						msg : '正在加载表格数据,请稍等...'
					},*/
					stripeRows : true,
					frame : true,
					autoExpandColumn : 'remark',
					cm : cm,
					sm : sm,
					tbar : [ {
						text : '新建热源',
						id:'01030401',
						iconCls : 'page_addIcon',
						hidden:parent.checkBtn('01030401'),
						handler : function() {
							addSource();
						}
					}, '-', {
						text : '修改热源',
						id:'01030402',
						iconCls : 'page_edit_1Icon',
						hidden:parent.checkBtn('01030402'),
						handler : function() {
							editSource();
						}
					}, '-', {
						text : '删除热源',
						id:'01030403',
						iconCls : 'page_delIcon',
						hidden:parent.checkBtn('01030403'),
						handler : function() {
							deleteSource('1', '01');
						}
					}, {
						text : '新建换热站',
						id:'01030404',
						iconCls : 'page_addIcon',
						hidden:parent.checkBtn('01030404'),
						handler : function() {
							addStat();
						}
					}, {
						text : '修改换热站',
						id:'01030405',
						iconCls : 'page_edit_1Icon',
						hidden:parent.checkBtn('01030405'),
						handler : function() {
							editStat();
						}
					}, {
						text : '删除换热站',
						id:'01030406',
						iconCls : 'page_delIcon',
						hidden:parent.checkBtn('01030406'),
						handler : function() {
							deleteStation('2', current_source_id);
						}
					},
					 '->', /*new Ext.form.TextField( {
						id : 'queryParam',
						name : 'queryParam',
						emptyText : '请输站所名称',
						enableKeyEvents : true,
						listeners : {
							specialkey : function(field, e) {
								if (e.getKey() == Ext.EventObject.ENTER) {
									queryMenuItem();
								}
							}
						},
						width : 130
					}), {
						text : '查询',
						iconCls : 'previewIcon',
						handler : function() {
							queryMenuItem();
						}
					},*/ '-', {
						text : '刷新',
						iconCls : 'arrow_refreshIcon',
						handler : function() {
							store.reload();
						}
					} ],
					bbar : bbar
				});
		store.load( {
			params : {
				start : 0,
				limit : bbar.pageSize
			}
		});
		grid.on('rowdblclick', function(grid, rowIndex, event) {
			editInit();
		});
		grid.on('sortchange', function() {
			// grid.getSelectionModel().selectFirstRow();
			});

		bbar.on("change", function() {
			// grid.getSelectionModel().selectFirstRow();
			});

		var addSourceWindow, addSourceFormPanel;
		//热源
			sourceStore = new Ext.data.Store({
					proxy : new Ext.data.HttpProxy({
								url : 'fc.ered?reqCode=getSourceDatas'
							}),
					reader : new Ext.data.JsonReader({}, [{
										name : 'value'
									}, {
										name : 'text'
									}])
				});
		   sourceStore.load();
		   sourCbx =  new Ext.form.ComboBox({
					hiddenName : 'source_id',
					fieldLabel : '所属热源',
					emptyText : '请选择',
					triggerAction : 'all',
					store : sourceStore,
					displayField : 'text',
					valueField : 'value',
					loadingText : '正在加载数据...',
					mode : 'local', // 数据会自动读取,如果设置为local又调用了store.load()则会读取2次；也可以将其设置为local，然后通过store.load()方法来读取
					forceSelection : true,
					typeAhead : true,
					resizable : true,
					editable : true,
					typeAhead : true, // 输入的时候自动匹配待选项目
					selectOnFocus:true,
					anchor : '100%'
			});
		addSourceFormPanel = new Ext.form.FormPanel( {
			id : 'addSourceFormPanel',
			name : 'addSourceFormPanel',
			defaultType : 'textfield',
			labelAlign : 'right',
			labelWidth : 65,
			frame : false,
			bodyStyle : 'padding:5 5 0',
			items : [ {
				fieldLabel : '热源编号',
				name : 'source_id',
				id : 'source_id',
				allowBlank : false,
				readOnly:false,
				maxLength :4,
				blankText:"换热站编号不能为空！",
				labelStyle : 'color:blue;',
				focusClass : 'color:blue;',
				vtype : 'alphanum',
				vtypeText:'换热站编号只能为数字或者字母！',
				anchor : '99%'
			}, {
				fieldLabel : '热源名称',
				name : 'source_name',
				allowBlank : false,
				anchor : '99%'
			},new Ext.form.NumberField({
				fieldLabel : '序号',
				name : 'order_id',
				allowDecimals:true,  //允许输入小数
				decimalPrecision:2,
				nanText:"请输入有效数字", //无效数字提示
				allowNegative:false,       //不允许输入负数
				anchor : '99%',
				value:0,
				allowBlank :true
			   }), {
				fieldLabel : '备注',
				name : 'remark',
				allowBlank : true,
				anchor : '99%'
			}, {
				id : 'windowmode',
				name : 'windowmode',
				hidden : true
			}]
		});
		addSourceWindow = new Ext.Window( {
			layout : 'fit',
			width : 420,
			height : 280,
			resizable : false,
			draggable : true,
			closeAction : 'hide',
			title : '<span style="font-weight:normal">新建热源</span>',
			// iconCls : 'page_addIcon',
			modal : true,
			collapsible : true,
			titleCollapse : true,
			maximizable : false,
			buttonAlign : 'right',
			border : false,
			animCollapse : true,
			pageY : 20,
			pageX : document.body.clientWidth / 2 - 420 / 2,
			animateTarget : Ext.getBody(),
			constrain : true,
			items : [ addSourceFormPanel ],
			buttons : [
					{
						text : '保存',
						iconCls : 'sracceptIcon',
						handler : function() {
							if (runMode == '0') {
								Ext.Msg.alert('提示',
										'系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
								return;
							}
							var mode = Ext.getCmp('windowmode').getValue();
							if (mode == 'add')
								saveSource('insertSource');
							else
								saveSource('updateSource');
						}
					}, {
						text : '重置',
						id : 'srbtnReset',
						iconCls : 'tbar_synchronizeIcon',
						handler : function() {
							clearForm(addSourceFormPanel.getForm());
						}
					}, {
						text : '关闭',
						iconCls : 'srdeleteIcon',
						handler : function() {
							addSourceWindow.hide();
						}
					} ]
		});
		addStatFormPanel = new Ext.form.FormPanel( {
			id : 'addStatFormPanel',
			name : 'addStatFormPanel',
			defaultType : 'textfield',
			labelAlign : 'right',
			labelWidth : 70,
			frame : false,
			bodyStyle : 'padding:5 5 0',
			items : [ {
				fieldLabel : '换热站编号',
				name : 'stat_id',
				id : 'stat_id',
				allowBlank : false,
				readOnly:false,
				maxLength : 3, // 可输入的最大文本长度,不区分中英文字符
				regex:/^[0-9A-Za-z]{3}/,
				regexText:'换热站编必须是3位!',
				blankText:"换热站编号不能为空！",
				labelStyle : 'color:blue;',
				focusClass : 'color:blue;',
				vtype : 'alphanum',
				vtypeText:'换热站编号只能为数字或者字母！',
				anchor : '99%'
			}, {
				fieldLabel : '换热站名称',
				name : 'stat_name',
				allowBlank : true,
				anchor : '99%'
			},sourCbx,new Ext.form.NumberField({
				fieldLabel : '序号',
				name : 'order_id',
				allowDecimals:true,  //允许输入小数
				decimalPrecision:2,
				nanText:"请输入有效数字", //无效数字提示
				allowNegative:false,       //不允许输入负数
				anchor : '99%',
				value:0,
				allowBlank :true
			   }),{
				fieldLabel : '备注',
				name : 'remark',
				allowBlank : true,
				anchor : '99%'
			}, {
				id : 'statmode',
				name : 'statmode',
				hidden : true
			}]
		});
		addStatWindow = new Ext.Window( {
			layout : 'fit',
			width : 420,
			height : 280,
			resizable : false,
			draggable : true,
			closeAction : 'hide',
			title : '<span style="font-weight:normal">新建换热站</span>',
			// iconCls : 'page_addIcon',
			modal : true,
			collapsible : true,
			titleCollapse : true,
			maximizable : false,
			buttonAlign : 'right',
			border : false,
			animCollapse : true,
			pageY : 20,
			pageX : document.body.clientWidth / 2 - 420 / 2,
			animateTarget : Ext.getBody(),
			constrain : true,
			items : [ addStatFormPanel ],
			buttons : [
					{
						text : '保存',
						iconCls : 'acceptIcon',
						handler : function() {
							if (runMode == '0') {
								Ext.Msg.alert('提示',
										'系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
								return;
							}
							var mode = Ext.getCmp('statmode').getValue();
							if (mode == 'add')
								saveStation('insertStation');
							else
								saveStation('updateStation');
						}
					}, {
						text : '重置',
						id : 'btnReset',
						iconCls : 'tbar_synchronizeIcon',
						handler : function() {
							clearForm(addStatFormPanel.getForm());
						}
					}, {
						text : '关闭',
						iconCls : 'deleteIcon',
						handler : function() {
							addStatWindow.hide();
						}
					} ]
		});
		/**
		 * 布局
		 */
		var viewport = new Ext.Viewport( {
			layout : 'border',
			items : [ {
				title : '<span style="font-weight:normal">热源站所</span>',
				iconCls : 'layout_contentIcon',
				tools : [ {
					id : 'refresh',
					handler : function() {
						menuTree.root.reload()
					}
				} ],
				collapsible : true,
				width : 210,
				minSize : 160,
				maxSize : 280,
				split : true,
				region : 'west',
				autoScroll : true,
				// collapseMode:'mini',
				items : [ menuTree ]
			}, {
				region : 'center',
				layout : 'fit',
				items : [ grid ]
			} ]
		});
		/**
		 * 保存热源数据
		 */
		function saveSource(operateType) {
			if (!addSourceFormPanel.form.isValid()) {
				return;
			}
			var params = addSourceFormPanel.getForm().getValues();
			Ext.Ajax.request({
					url : 'sr.ered?reqCode='+operateType,
					success : function(response) { // 回调函数有1个参数
						store.reload();
						var resultArray = Ext.util.JSON.decode(response.responseText);
						Ext.Msg.alert('提示', resultArray.msg);
						if(resultArray.success==true){
							refreshNode(addSourceFormPanel.getForm().findField("source_id").getValue());
						}

						if (addSourceFormPanel.getForm().findField("windowmode").getValue()=='edit'){
							addSourceWindow.hide();
						}else{
							addSourceFormPanel.form.reset();
							addSourceFormPanel.getForm().findField("windowmode").setValue('add');
						}
					},
					failure : function(response) {
						Ext.MessageBox.alert('提示', '数据保存失败');
					},
					params : params
				});
		}

		/**
		 * 保存换热站数据
		 */
		function saveStation(operateType) {
			if (!addStatFormPanel.form.isValid()) {
				return;
			}
			var params = addStatFormPanel.getForm().getValues();
			Ext.Ajax.request({
					url : 'st.ered?reqCode='+operateType,
					success : function(response) { // 回调函数有1个参数
						store.reload();

						var resultArray = Ext.util.JSON.decode(response.responseText);
						Ext.Msg.alert('提示', resultArray.msg);
						if(resultArray.success==true){
							refreshNode(addStatFormPanel.getForm().findField("stat_id").getValue());
						}
						if (addStatFormPanel.getForm().findField("statmode").getValue()=='edit')
							addStatWindow.hide();
						//addStatFormPanel.form.reset();
					},
					failure : function(response) {
						Ext.MessageBox.alert('提示', '数据保存失败');
					},
					params : params
				});
		}

		/**
		 * 刷新指定节点
		 */
		function refreshNode(nodeid) {
			var node = menuTree.getNodeById(nodeid);
			/* 异步加载树在没有展开节点之前是获取不到对应节点对象的 */
			if (Ext.isEmpty(node)) {
				menuTree.root.reload();
				return;
			}
			if (node.attributes.leaf) {
				node.parentNode.reload();
			} else {
				node.reload();
			}
		}

		/**
		 * 根据条件查询菜单
		 */
		function queryMenuItem() {
			store.load( {
				params : {
					start : 0,
					limit : bbar.pageSize,
					queryParam : {queryParam:Ext.getCmp('queryParam').getValue(),source_id:'01'}
				}
			});
		}

		/**
		 * 删除菜单
		 */
		function deleteSource(pType, pMenuid) {
			var rows = grid.getSelectionModel().getSelections();
			if (Ext.isEmpty(rows)) {
				Ext.Msg.alert('提示', '请先选中要删除的热源!');
				return;
			}
			var fields = '';
			var strChecked = '';
			for ( var i = 0; i < rows.length; i++) {
				if (rows[i].get('stat_count') >0) {
					fields = fields + rows[i].get('source_name') + '<br>';
				}else{
					if(strChecked!="")
					strChecked = strChecked + ",'"+ rows[i].get('source_id') + "'";
					else
					strChecked = "'"+rows[i].get('source_id')+"'";
				}
			}
			if (fields != '') {
				Ext.Msg
						.alert(
								'提示',
								'<b>您选中的热源中</b><br>' + fields + '<font color=red>下有换热站不能删除!</font>');
				return;
			}
			Ext.Msg
					.confirm(
							'请确认',
							'您确定要删除选中的热源吗?',
							function(btn, text) {
								if (btn == 'yes') {
									if (runMode == '0') {
										Ext.Msg
												.alert('提示',
														'系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
										return;
									}
									showWaitMsg();
									Ext.Ajax
											.request( {
												url : 'sr.ered?reqCode=deleteSource',

												success : function(response) { // 回调函数有1个参数
															var resultArray = Ext.util.JSON.decode(response.responseText);
															store.reload();
															Ext.Msg.alert('提示', resultArray.msg);
															menuTree.root.reload();
														},
												failure : function(response) {
													var resultArray = Ext.util.JSON
															.decode(response.responseText);
													Ext.Msg.alert('提示',
															resultArray.msg);
												},
												params : {
													source_id : strChecked,
													type : pType,
													menuid : pMenuid
												}
											});
								}
							});
		}
		/**
		 * 删除菜单
		 */
		function deleteStation(pType, pMenuid) {
			var rows = grid.getSelectionModel().getSelections();
			if (Ext.isEmpty(rows)) {
				Ext.Msg.alert('提示', '请先选中要删除的换热站!');
				return;
			}
			var fields = '';
			var strChecked = '';
			for ( var i = 0; i < rows.length; i++) {
				if (rows[i].get('house_count') >0) {
					fields = fields + rows[i].get('stat_name') + '<br>';
				}else{
					if(strChecked!="")
					strChecked = strChecked + ",'"+ rows[i].get('stat_id') + "'";
					else
					strChecked = "'"+rows[i].get('stat_id')+"'";
				}
			}
			if (fields != '') {
				Ext.Msg
						.alert(
								'提示',
								'<b>您选中的换热站中</b><br>' + fields + '<font color=red>下有房间不能删除!</font>');
				return;
			}
			Ext.Msg
					.confirm(
							'请确认',
							'您确定要删除选中的换热站吗?',
							function(btn, text) {
								if (btn == 'yes') {
									if (runMode == '0') {
										Ext.Msg
												.alert('提示',
														'系统正处于演示模式下运行,您的操作被取消!该模式下只能进行查询操作!');
										return;
									}
									showWaitMsg();
									Ext.Ajax
											.request( {
												url : 'st.ered?reqCode=deleteStation',

												success : function(response) { // 回调函数有1个参数
															var resultArray = Ext.util.JSON.decode(response.responseText);
															store.reload();
															Ext.Msg.alert('提示', resultArray.msg);
															menuTree.root.reload();
														},
												failure : function(response) {
													var resultArray = Ext.util.JSON
															.decode(response.responseText);
													Ext.Msg.alert('提示',
															resultArray.msg);
												},
												params : {
													stat_id : strChecked,
													type : pType,
													menuid : pMenuid
												}
											});
								}
							});
		}
		/**
		 * 修改热源初始化
		 */
		function editSource() {
			var record = grid.getSelectionModel().getSelected();

			if (Ext.isEmpty(record)) {
				Ext.Msg.alert('提示', '请先选择您要修改的热源');
				return;
			}
			addSourceFormPanel.getForm().loadRecord(record);
			addSourceWindow.show();
			addSourceWindow
					.setTitle('<span style="font-weight:normal">修改热源</span>');
			Ext.getCmp('windowmode').setValue('edit');
			Ext.getCmp('btnReset').hide();
		}

		/**
		 * 新建热源
		 */
		function addSource() {
			// clearForm(addSourceFormPanel.getForm());
			var flag = Ext.getCmp('windowmode').getValue();
			if (typeof (flag) != 'undefined') {
				addSourceFormPanel.form.getEl().dom.reset();
			} else {
				clearForm(addSourceFormPanel.getForm());
			}
			addSourceWindow.show();
			addSourceWindow
					.setTitle('<span style="font-weight:normal">新建热源</span>');
			Ext.getCmp('windowmode').setValue('add');
			Ext.getCmp('btnReset').show();
		}
		/**
		 * 新建换热站
		 */
		function addStat() {
			// clearForm(addSourceFormPanel.getForm());
			var flag = Ext.getCmp('statmode').getValue();
			if (typeof (flag) != 'undefined') {
				addStatFormPanel.form.getEl().dom.reset();
			} else {
				clearForm(addStatFormPanel.getForm());
			}
			if(current_source_id!="")
			addStatFormPanel.getForm().findField('source_id').setValue(current_source_id);
			addStatWindow.show();
			addStatWindow
					.setTitle('<span style="font-weight:normal">新建换热站</span>');
			Ext.getCmp('statmode').setValue('add');
			Ext.getCmp('btnReset').show();
		}
		/**
		 * 修改换热站初始化
		 */
		function editStat() {
			var record = grid.getSelectionModel().getSelected();
			if (Ext.isEmpty(record)) {
				Ext.Msg.alert('提示', '请先选择您要修改的换热站');
				return;
			}
			//record = grid.getSelectionModel().getSelected();
			//alert(record);
			addStatFormPanel.getForm().loadRecord(record);
			addStatWindow.show();
			addStatWindow
					.setTitle('<span style="font-weight:normal">修改换热站</span>');
			Ext.getCmp('statmode').setValue('edit');
			Ext.getCmp('btnReset').hide();
		}


		/**
		 * 更新
		 */
		function update() {
			var parentid = Ext.getCmp('parentid').getValue();
			var parentid_old = Ext.getCmp('parentid_old').getValue();
			addSourceFormPanel.form.submit( {
				url : './resource.ered?reqCode=updateMenuItem',
				waitTitle : '提示',
				method : 'POST',
				waitMsg : '正在处理数据,请稍候...',
				success : function(form, action) {
					addSourceWindow.hide();
					store.reload();
					refreshNode(parentid);
					if (parentid != parentid_old) {
						refreshNode(parentid_old);
					}
					form.reset();
					Ext.MessageBox.alert('提示', action.result.msg);
				},
				failure : function(form, action) {
					var msg = action.result.msg;
					Ext.MessageBox.alert('提示', '菜单数据修改失败:<br>' + msg);
				}
			});
		}
	//显示热源列表
	menuTree.fireEvent('click',menuTree.root);
	});
