package com.bootdo.sales.service;

import com.bootdo.common.domain.DictDO;
import com.bootdo.inner.domain.InnerOrgEmployeeDO;
import com.bootdo.sales.domain.BusinessDO;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;

/**
 * 业务信息表
 * 
 * @author lyp
 * @email 1992lcg@163.com
 * @date 2017-11-21 17:28:12
 */
public interface BusinessService {
	
	BusinessDO get(String businessId);
	
	List<BusinessDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(BusinessDO business);
	
	int update(BusinessDO business);
	
	int remove(String businessId);
	
	int batchRemove(String[] businessIds);
	
	String getMaxBusinessId();

	List<DictDO> listDic();
	
	List<DictDO> listDicSale();
	
	Map<String, Object> dataImport(File file,long userid) ;
	
	List<BusinessDO> getQuery(Map<String, Object> params);
	
	public void export(String[] titles, ServletOutputStream out, List<BusinessDO> list);

	
}