package com.bootdo.sales.service;

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.domain.RecordDO;
import com.bootdo.sales.domain.RecordServiceDO;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * 客服记录信息表
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-11-28 09:25:19
 */
public interface RecordServiceService {

	RecordServiceDO get(String serviceId);

	List<RecordServiceDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(RecordServiceDO recordService);

	int saveDownloadTemplate(RecordServiceDO recordService);

	int update(RecordServiceDO recordService);

	int remove(String serviceId);

	int batchRemove(String[] serviceIds);

	int updateRecordServiceAttachment(RecordServiceDO recordService);

	List<DictDO> listDic();

	List<DictDO> listDicxmbh();

	Map<String, Object> dataImport(File file, long userid);
}
