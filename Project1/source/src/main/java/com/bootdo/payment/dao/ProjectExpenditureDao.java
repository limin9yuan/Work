package com.bootdo.payment.dao;

import com.bootdo.common.domain.DictDO;
import com.bootdo.payment.domain.ContractApprovalDO;
import com.bootdo.payment.domain.ProjectExpenditureDO;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

/**
 * 项目收支
 * 
 * @小平
 * @email 1992lcg@163.com
 * @date 2018-2-1
 */

@Mapper
public interface ProjectExpenditureDao {

	ProjectExpenditureDO get(String projectId);

	ProjectExpenditureDO sumExpenses(String projectId);

	ProjectExpenditureDO sumPurchase(String projectId);

	ProjectExpenditureDO sumReceive(String projectId);

	ProjectExpenditureDO sumLaborCost(String projectId);

	List<ProjectExpenditureDO> list(Map<String, Object> map);

	List<ProjectExpenditureDO> listLaborCost(Map<String, Object> map);

	List<ProjectExpenditureDO> listPurchase(Map<String, Object> map);

	List<ProjectExpenditureDO> listReceive(Map<String, Object> map);

	List<ProjectExpenditureDO> listTotalIncome(Map<String, Object> map);

	int count(Map<String, Object> map);

	int countLaborCost(Map<String, Object> map);

	int countExpenses(Map<String, Object> map);

	int countPurchase(Map<String, Object> map);

	int countReceive(Map<String, Object> map);

	int countTotalIncome(Map<String, Object> map);

	List<ProjectExpenditureDO> listExpenses(Map<String, Object> map);

	int save(ProjectExpenditureDO projectExpenditure);

	int update(ProjectExpenditureDO projectExpenditure);

	int remove(String projectId);

	int batchRemove(String[] projectIds);

	List<DictDO> listDic();

	List<DictDO> listDicManager();
}
