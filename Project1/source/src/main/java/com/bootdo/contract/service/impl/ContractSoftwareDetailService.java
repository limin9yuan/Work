package com.bootdo.contract.service.impl;

import java.util.List;
import java.util.Map;

import com.bootdo.contract.domain.ContractSoftwareDetailDo;

/**
 * 软件功能
 * @author Administrator
 *
 */
public interface ContractSoftwareDetailService {
	ContractSoftwareDetailDo get(String softwaresetailId);
	
	List<ContractSoftwareDetailDo> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(ContractSoftwareDetailDo contractSoftwareDetailDo);
	
	int update(ContractSoftwareDetailDo contractSoftwareDetailDo);
	
	int remove(String Software_Detail_Id);
	
	int batchRemove(String[] softwaresetailId);
}
