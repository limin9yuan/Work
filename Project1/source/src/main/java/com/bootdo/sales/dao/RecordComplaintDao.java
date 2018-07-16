package com.bootdo.sales.dao;

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.domain.RecordComplaintDO;
import com.bootdo.sales.domain.RecordDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 客户投诉信息表
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-11-28 18:06:03
 */
@Mapper
public interface RecordComplaintDao {

	RecordComplaintDO get(String complaintId);
	
	List<RecordComplaintDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(RecordComplaintDO recordComplaint);
	
	int saveDownloadTemplate(RecordComplaintDO recordComplaint);
	
	int update(RecordComplaintDO recordComplaint);
	
	int remove(String Complaint_ID);
	
	int updateComplaintAttachment(RecordComplaintDO recordComplaint);
	
	int batchRemove(String[] complaintIds);
	
	List<DictDO> listDic();
	
	List<DictDO> listDicxmbh();
}
