var addressResolve = function (options) {
  //检测用户传进来的参数是否合法
  if (!isValid(options))
    return this;
  //默认参数
  var defaluts = {
    proId: 'divProv',
    cityId: 'divCity',
    areaId: 'divArea',
    customerId: 'divCustomer',
  };
  var opts = $.extend({}, defaluts, options);//使用jQuery.extend 覆盖插件默认参数
  var addressInfo = this;
  this.provInfo = $("#" + opts.proId);//省份select对象
  this.cityInfo = $("#" + opts.cityId);//城市select对象
  this.areaInfo = $("#" + opts.areaId);//区县select对象
  this.customerInfo = $("#" + opts.customerId);//其他select对象
  /*省份初始化方法*/
  this.provInfoInit = function () {
    var proOpts = "";
    var url="/sales/province/listDic"
    $.ajax({
		url : url,
		success : function(data) {
			 $.each(data, function (index, item) {
				 proOpts += "<option value='" + item.value + "'>" + item.name + "</option>";
			 });
			 addressInfo.provInfo.append(proOpts);
		     addressInfo.provInfo.chosen(); //初始化chosen
		     addressInfo.cityInfo.chosen();//初始化chosen
		     addressInfo.areaInfo.chosen();//初始化chosen
		     addressInfo.customerInfo.chosen();//初始化chosen
		}
	});
   
    
  };
  /*城市选择绑定方法*/
  this.selectCity = function () {
	addressInfo.cityInfo.chosen("destroy"); 
    addressInfo.cityInfo.empty();
    addressInfo.cityInfo.append("<option value=''>市</option>");
    addressInfo.areaInfo.empty();
    addressInfo.areaInfo.append("<option value=''>区</option>");
    if (addressInfo.provInfo.val() == "省") { //选择无效时直接返回
      addressInfo.cityInfo.trigger("liszt:updated");
      addressInfo.areaInfo.trigger("liszt:updated");
      return;
    }
    var provId = addressInfo.provInfo.val();//获取选择的省份值
    var cityOpts = "";
    var url="/sales/province/listCityDic/"+provId
    $.ajax({
		url : url,
		data: { provinceId:provId },
		success : function(data) {
			$.each(data, function (index, item) {
		     // if (item.ProID == provId) {
		        cityOpts += "<option value='" + item.value + "'>" + item.name + "</option>";
		     // }
		    });
		    addressInfo.cityInfo.append(cityOpts);
			//console.log(addressInfo.cityInfo);
		    addressInfo.cityInfo.chosen(); //初始化chosen
		    addressInfo.cityInfo.trigger("liszt:updated");
		    addressInfo.areaInfo.trigger("liszt:updated");
		}
	});
  };
  /*区县选择绑定方法*/
  this.selectArea = function () {
    if (addressInfo.cityInfo.val() == "市") return;
    addressInfo.areaInfo.chosen("destroy"); 
    addressInfo.areaInfo.empty();
    addressInfo.areaInfo.append("<option value=''>区</option>");
    var cityId = addressInfo.cityInfo.val();//获取选择的城市值
    var areaOpts = "";
    var url="/sales/province/listAreaDic/"+cityId
    $.ajax({
		url : url,
		data: { cityId:cityId },
		success : function(data) {
			$.each(data, function (index, item) {
		      //if (item.CityID == cityId) {
		        areaOpts += "<option value='" + item.value + "'>" + item.name + "</option>";
		     // }
		    });
		    addressInfo.areaInfo.append(areaOpts);
		    addressInfo.areaInfo.chosen();
		    addressInfo.areaInfo.trigger("liszt:updated");
		}
	});
    
    
  };
  /*区县选择绑定方法*/
  this.selectCustomer = function () {
    if (addressInfo.customerInfo.val() == "请选择") return;
    addressInfo.customerInfo.chosen("destroy"); 
    addressInfo.customerInfo.empty();
    addressInfo.customerInfo.append("<option value=''>请选择</option>");
    var areaId = addressInfo.areaInfo.val();//获取选择的区值
    var areaOpts = "";
    var url="/sales/companyCustomer/listAllDicByArea/"+areaId
    $.ajax({
		url : url,
		data: { areaId:areaId },
		success : function(data) {
			$.each(data, function (index, item) {
		      //if (item.CityID == cityId) {
		        areaOpts += "<option value='" + item.value + "'>" + item.name + "</option>";
		     // }
		    });
		    addressInfo.customerInfo.append(areaOpts);
		    addressInfo.customerInfo.chosen();
		    addressInfo.customerInfo.trigger("liszt:updated");
		}
	});
    
    
  };
  /*对象初始化方法*/
  this.init = function () {
    addressInfo.provInfo.append("<option value=''>省</option>");
    addressInfo.cityInfo.append("<option value=''>市</option>");
    addressInfo.areaInfo.append("<option value=''>区</option>");
    addressInfo.customerInfo.append("<option value=''>请选择</option>");
    addressInfo.provInfoInit();
    addressInfo.provInfo.bind("change", addressInfo.selectCity);
    addressInfo.cityInfo.bind("change", addressInfo.selectArea);
    addressInfo.areaInfo.bind("change", addressInfo.selectCustomer);
  }
  //私有方法，检测参数是否合法
  function isValid(options) {
    return !options || (options && typeof options === "object") ? true : false;
  }
}