package com.bootdo.sales.dao;

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.domain.BusinessDO;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 业务信息表
 * @author lyp
 * @email 1992lcg@163.com
 * @date 2017-11-21 17:28:12
 */
@Mapper
public interface BusinessDao {

	BusinessDO get(String businessId);

	String getBusinessId(BusinessDO businessId);

	List<BusinessDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(BusinessDO business);
	
	int update(BusinessDO business);
	
	int remove(String Business_ID);
	
	int batchRemove(String[] businessIds);
	
	String getMaxBusinessId();

	List<DictDO> listDic();
	
	List<DictDO> listDicSale();
	
}
