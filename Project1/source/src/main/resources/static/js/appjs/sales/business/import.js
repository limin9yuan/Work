$().ready(function() {
	layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#fileTest1', //绑定元素
            url: '/sales/business/dataImport', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
            	//alert(r.fileName);
            	$("#businessFile").val(r.fileName);
                parent.layer.msg(r.msg);
                closeParenWindow();
                //app.getData();
            },
            error: function (r) {
            	 parent.layer.msg(r.msg);
            }
        });
    });
});

