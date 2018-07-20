
$().ready(function() {

	layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#companyCustomertest', //绑定元素
            url: '/sales/companyCustomer/importSubmit', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
//            	alert(r.fileName);
            	$("#companyCustomerAttachment").val(r.fileName);
            	parent.layer.msg(r.msg);
                freshParenWindow();
            },
            error: function (r) {
            	parent.layer.msg(r.msg);
            }
        });
    });

});
