package com.bootdo.contract.service;

import com.bootdo.common.domain.DictDO;
import com.bootdo.common.domain.MainDO;
import com.bootdo.contract.domain.ContractDO;
import com.bootdo.contract.domain.ContractHardwareDetailDO;
import com.bootdo.contract.domain.ContractSoftwareDetailDo;
import com.bootdo.contract.domain.TravelDO;
import com.bootdo.payment.domain.ContractApprovalDO;
import com.bootdo.sales.domain.BusinessDO;

import java.io.File;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;

/**
 * 合同信息表
 * 
 * @author sw
 * @email 1992lcg@163.com
 * @date 2017-11-29 14:50:54
 */
public interface ContractService {

	List<MainDO> getRecipient(Map<String, Object> map);

	List<MainDO> getPrincipal(Map<String, Object> map);

	List<MainDO> getLog(Map<String, Object> map);

	List<MainDO> getUndoLog(Map<String, Object> map);

	ContractDO get(String contractId);

	List<MainDO> getDataList(Map<String, Object> map);

	List<MainDO> getFinanceDataList(Map<String, Object> map);

	List<ContractDO> list(Map<String, Object> map);

	ContractDO view(String contractId);

	int count(Map<String, Object> map);

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

	int remove(String contractId);

	int batchRemove(String[] contractIds);

	int updateContractAttachment(ContractDO contract);

	List<DictDO> listDic();

	int formUpdate(ContractDO contract);

	Map<String, Object> dataImport(File file, long userid);
	
	Map<String, Object> hardwareDetail(File file, long userid);

	Map<String, Object> SoftwareDetail(File file, long userid);
	
	List<ContractDO> getQuery(Map<String, Object> params);

	public void export(String[] titles, ServletOutputStream out, List<ContractDO> list);
}
