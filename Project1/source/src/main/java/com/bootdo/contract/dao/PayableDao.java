package com.bootdo.contract.dao;

import com.bootdo.contract.domain.PayableDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 付款计划表
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-12-15 16:02:12
 */
@Mapper
public interface PayableDao {

	PayableDO get(String payableId);
	
	List<PayableDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(PayableDO payable);
	
	int update(PayableDO payable);
	
	int remove(String payableId);
	
	int batchRemove(String[] payableIds);
}
