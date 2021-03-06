package com.bootdo.sales.dao;

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.domain.RecordDO;
import com.bootdo.sales.domain.RecordServiceDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 客服记录信息表	
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-11-28 09:25:19
 */
@Mapper
public interface RecordServiceDao {

	RecordServiceDO get(String serviceId);
	
	List<RecordServiceDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(RecordServiceDO recordService);
	
	int saveDownloadTemplate (RecordServiceDO recordService);
	
	int update(RecordServiceDO recordService);
	int updateRecordServiceAttachment(RecordServiceDO recordService);
	
	int remove(String Service_ID);
	
	int batchRemove(String[] serviceIds);
	
	List<DictDO> listDic();
	
	List<DictDO> listDicxmbh();
}
