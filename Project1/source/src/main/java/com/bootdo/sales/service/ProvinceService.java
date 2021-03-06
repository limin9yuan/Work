package com.bootdo.sales.service;

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.domain.ProvinceDO;

import java.util.List;
import java.util.Map;

/**
 * 
 * 
 * @author smile
 * @email 1992lcg@163.com
 * @date 2017-11-23 20:15:31
 */
public interface ProvinceService {
	
	//省列表
	List<DictDO> listDic();
	//市列表
	List<DictDO> listCityDic(String provinceId);
	//区列表
	List<DictDO> listAreaDic(String cityId);

//	ProvinceDO getProvince (String provinceId);
//
//	ProvinceDO getCity (String cityId);
//
//	ProvinceDO getArea (String areaId);

}
