$().ready(function() {
	loadCrmData("/project/project/listDic","projectId");
	loadCrmData("/sales/companyCustomer/listDic","custormerId");
	loadDic("sales_record_service_Service_Feedback_Type","serviceFeedbackType");
	validateRule();
	datetimepicker();
// ————上一页 下一页
	$('#myTab a[href="#baseInfo"]').on('shown.bs.tab', function(e){
		 $('#lastBtn').attr("disabled",true);
		 $('#nextBtn').attr("disabled",false);
	 });
	$('#myTab a[href="#service"]').on('shown.bs.tab', function(e) {
		if ($("#serviceType option").length == 1) {
 		loadDic("sales_record_complaint_Complaint_After_Sale_Type","serviceType");
		}
		 $('#lastBtn').attr("disabled",false);
		 $('#nextBtn').attr("disabled",false);
	 });
	 $('#myTab a[href="#information"]').on('shown.bs.tab', function(e){
		 $('#lastBtn').attr("disabled",false);
		 $('#nextBtn').attr("disabled",true);
	 });
// ————上传
	layui.use('upload', function () {
		 var $ = layui.jquery;
	        var upload = layui.upload;
	      // 多文件列表示例
	  	  var demoListView = $('#demoList');
        //执行实例
        var uploadInst = upload.render({
            elem: '#test1', //绑定元素
            url: '/sales/recordService/upload', //上传接口
            size: 1000,
            accept: 'file',
            multiple: true,
            auto: false,			//不自动上传设置
            bindAction: '#uploadFile',	//“上传”按钮的ID
            choose:function(obj){
//******************************预览选择的文件并根据后缀名判断显示不同的图片********************************************  
            	var files = this.files = obj.pushFile(); // 将每次选择的文件追加到文件队列
        	      // 读取本地文件
        	      obj.preview(function(index, file, result){
        	        var tr = $(['<tr id="upload-'+ index +'">'
        	          ,'<td style="text-align: center;">'+file.name+'</td>'
        	          ,'<td style="text-align: center;">'+ (file.size/1014).toFixed(1) +'kb</td>'
        	          ,'<td style="text-align: center;">等待上传</td>'
        	          ,'<td style="text-align: center;">'
        	            ,'<button class="layui-btn layui-btn-mini demo-reload layui-hide">重传</button>'
        	            ,'<button class="layui-btn layui-btn-mini layui-btn-danger demo-delete">删除</button>'
        	          ,'</td>'
        	        ,'</tr>'].join(''));
        	        
        	        // 单个重传
        	        tr.find('.demo-reload').on('click', function(){
        	          obj.upload(index, file);
        	        });
        	        
        	        // 删除
        	        tr.find('.demo-delete').on('click', function(){
        	          delete files[index]; // 删除对应的文件
        	          tr.remove();
        	          uploadListIns.config.elem.next()[0].value = ''; // 清空 input
  																	// file
  																	// 值，以免删除后出现同名文件不可选
        	        });
        	        
        	        demoListView.append(tr);
        	      });
                },
            done: function (r) {
      					if (r.code == 0) {
      		 				if (r.serviceAttachment > 0) {
      		 					$('#ids').val(r.serviceAttachment);
      		 					$('#serviceAttachment').val(r.serviceAttachment+','+document.getElementById("serviceAttachment").value);
      		 				}
//      	            	$("#serviceAttachment").val(r.fileName);
//      		 				parent.layer.msg(r.msg);
      	                app.getData();
      	            }else {
      	 				parent.layer.alert(r.msg)
      	            }
      	            }
      	        });
      	    });
});
$.validator.setDefaults({
	submitHandler : function() {
		document.getElementById("uploadFile").click();
		setTimeout('save()', 500);//延迟执行save()方法2毫秒
//		save();
	}
});
function save() {
	$.ajax({
		cache : true,
		type : "POST",
		url : "/sales/recordService/save",
		data : $('#signupForm').serialize(),// 你的formid
		async : false,
		error : function(request) {
			parent.layer.alert("Connection error");
		},
		success : function(data) {
			if (data.code == 0) {
				if (data.serviceId > 0) {
 					$('#serviceIds').val(data.serviceId);
 				}
				parent.layer.msg("操作成功");
				closeParenWindow();
				
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
				serviceProblemTime : {
					required : true
				},
				serviceName : {
					required : true,
					rangelength:[1,6]
				},
				serviceDept : {
					required : true,
					rangelength:[1,50]
				},
				customerId : {
					required : true
				},
				projectId : {
					required : true
				},
				serviceProduct : {
					required : true,
					rangelength:[1,50]
				},
				serviceFeedbackType : {
					required : true,
					rangelength:[1,10]
				},
				serviceFeedbackInfo : {
					required : true,
					rangelength:[1,500]
				},
				serviceType : {
					required: true
				},
				serviceProblemDeascription : {
					required: true,
					rangelength:[1,500]
				},
				serviceProcedure : {
					required: true,
					rangelength:[1,500]
				},
				serviceResult : {
					required: true,
					rangelength:[1,10]
				},
				servicePhoneNumber : {
					required: true,
					isMobile:true
				},
				serviceProblemRemarks : {
					rangelength:[1,200]
				},
				serviceAfterSaleRemarks : {
					rangelength:[1,200]
				},
				serviceMailbox:{
					email:true
				}
			},
			messages : {
				serviceProblemTime : {
					required : icon + "问题出现时间不能为空"
				},
				serviceName : {
					required : icon + "反馈人姓名不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 6 之间的字符串"
				},
				serviceDept : {
					required : icon + "所在单位不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				customerId : {
					required : icon + "客户名称不能为空"
				},
				projectId : {
					required : icon + "项目名称不能为空"
				},
				serviceProduct : {
					required : icon + "使用产品不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 50 之间的字符串"
				},
				serviceFeedbackType : {
					required : icon + "反馈方式不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 10 之间的字符串"
				},
				serviceFeedbackInfo : {
					required : icon + "反馈内容不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 500 之间的字符串"
				},
				serviceType : {
					required : icon + "服务类型不能为空"
				},
				serviceProblemDeascription : {
					required : icon + "问题描述不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 500 之间的字符串"
				},
				serviceProcedure : {
					required : icon + "处理过程不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 500 之间的字符串"
				},
				serviceResult : {
					required : icon + "处理结果不能为空",
					rangelength: icon + "请输入一个长度介于 1 和 10 之间的字符串"
				},
				servicePhoneNumber : {
					required : icon + "电话不能为空",
					isMobile: icon + "请输入正确的手机号码！"
				},
				serviceProblemRemarks : {
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"
				},
				serviceAfterSaleRemarks : {
					rangelength: icon + "请输入一个长度介于 1 和 200 之间的字符串"
				},
				serviceMailbox:{
					email:icon+"请输入正确的邮箱！"
				}
			}
	})
}
function datetimepicker() {
	$('#serviceProblemTime').datetimepicker({
		format : 'YYYY-MM-DD',
		locale : moment.locale('zh-cn')
	});
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

	