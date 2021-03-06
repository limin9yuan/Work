package com.bootdo.contract.service;

import com.bootdo.common.domain.DictDO;
import com.bootdo.contract.domain.AdditionalRecordsDO;
import com.bootdo.sales.domain.SalesProjectDO;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;

/**
 * 合同增补记录
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2018-01-04 13:10:31
 */
public interface AdditionalRecordsService {

	AdditionalRecordsDO view(String recordId);

	AdditionalRecordsDO get(String recordId);
	
	List<AdditionalRecordsDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);
	
	int save(AdditionalRecordsDO additionalRecords);
	
	int saveDownloadTemplate(AdditionalRecordsDO additionalRecords);
	
	int update(AdditionalRecordsDO additionalRecords);
	
	int updateRecordAttachment(AdditionalRecordsDO additionalRecords);
	
	int remove(String recordId);
	
	int batchRemove(String[] recordIds);

	List<DictDO> listDic();
	
	Map<String, Object> uploadExcel(File file,long userid) ;
	
    List<AdditionalRecordsDO> getQuery(Map<String, Object> params);
	
	public void export(String[] titles, ServletOutputStream out, List<AdditionalRecordsDO> list);

	int formUpdate(AdditionalRecordsDO additionalRecords); 


}
