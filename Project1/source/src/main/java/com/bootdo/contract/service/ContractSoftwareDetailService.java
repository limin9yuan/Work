package com.bootdo.contract.service;

import java.util.List;
import java.util.Map;

import com.bootdo.contract.domain.ContractSoftwareDetailDo;

/**
 * 软件功能
 * 
 * @author Administrator
 *
 */
public interface ContractSoftwareDetailService {

	ContractSoftwareDetailDo get(String softwareDetailId);

	List<ContractSoftwareDetailDo> list(Map<String, Object> map);

	List<ContractSoftwareDetailDo> listR(Map<String, Object> map);

	int count(Map<String, Object> map);

	int countR(Map<String, Object> map);

	int save(ContractSoftwareDetailDo contractSoftwareDetailDo);

	int update(ContractSoftwareDetailDo contractSoftwareDetailDo);

	int remove(String softwareDetailId);

	int batchRemove(String[] softwareDetailId);
}
