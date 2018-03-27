
$().ready(function() {

	layui.use('upload', function () {
        var upload = layui.upload;
        //执行实例
        var uploadInst = upload.render({
            elem: '#payouttest', //绑定元素
            url: '/contract/payout/importSubmit', //上传接口
            size: 1000,
            accept: 'file',
            done: function (r) {
            	//alert(r.fileName);
            	$("#payoutAttachment").val(r.fileName);
                //layer.msg(r.msg);
                //app.getData();
            },
            error: function (r) {
                layer.msg(r.msg);
            }
        });
    });
  
});
