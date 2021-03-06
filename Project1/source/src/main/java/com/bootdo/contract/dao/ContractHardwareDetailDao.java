package com.bootdo.contract.dao;

import java.util.List;
import java.util.Map;

import com.bootdo.contract.domain.ContractHardwareDetailDO;

/**
 * 硬件明细表
 * 
 * @author Administrator
 *
 */
public interface ContractHardwareDetailDao {

	ContractHardwareDetailDO get(String hardwareDetailId);

	List<ContractHardwareDetailDO> list(Map<String, Object> map);

	List<ContractHardwareDetailDO> listY(Map<String, Object> map);

	int count(Map<String, Object> map);

	int countY(Map<String, Object> map);

	int save(ContractHardwareDetailDO contractHardwareDetailDO);

	int update(ContractHardwareDetailDO contractHardwareDetailDO);

	int remove(String Hardware_Detail_Id);

	int batchRemove(String[] hardwareDetailId);
}
