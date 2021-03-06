package com.bootdo.contract.dao;

import com.bootdo.common.domain.DictDO;
import com.bootdo.common.domain.MainDO;
import com.bootdo.contract.domain.ContractDO;
import com.bootdo.contract.domain.ContractHardwareDetailDO;
import com.bootdo.contract.domain.ContractSoftwareDetailDo;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 合同信息表
 * @author sw
 * @email 1992lcg@163.com
 * @date 2017-11-29 14:50:54
 */
@Mapper
public interface ContractDao {

    List<MainDO> getRecipient(Map<String,Object> map);

    List<MainDO> getPrincipal(Map<String,Object> map);

    List<MainDO> getLog(Map<String,Object> map);

    List<MainDO> getUndoLog(Map<String,Object> map);

    ContractDO get(String contractId);

	List<MainDO> getDataList(Map<String,Object> map);

	List<MainDO> getFinanceDataList(Map<String,Object> map);

	ContractDO view(String contractId);

	List<ContractDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(ContractDO contract);
	
	int saveDownloadTemplate(ContractDO contract);
	/**
	 * 软件明细表
	 * @param contractSoftwareDetail
	 * @return
	 */
	int saveContractSoftwareDetail(ContractSoftwareDetailDo contractSoftwareDetail);
	/**
	 * 硬件明细表
	 * @param contractHardwareDetail
	 * @return
	 */
	int saveContractHardwareDetail(ContractHardwareDetailDO contractHardwareDetail);
	
	int update(ContractDO contract);
	
	int updateContractAttachment(ContractDO contract);
	
	int remove(String Contract_ID);
	
	
	int batchRemove(String[] contractIds);
	
	List<DictDO> listDic();
}
