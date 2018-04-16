package com.bootdo.sales.dao;

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.domain.CustomerContactDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 联系人信息表
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-11-02 18:57:25
 */
@Mapper
public interface CustomerContactDao {

	CustomerContactDO get(String contactId);
	
	List<CustomerContactDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(CustomerContactDO customerContact);
	
	int update(CustomerContactDO customerContact);
	
	int remove(String Contact_ID);
	
	int batchRemove(String[] contactIds);
	
	List<DictDO> listDic();
}