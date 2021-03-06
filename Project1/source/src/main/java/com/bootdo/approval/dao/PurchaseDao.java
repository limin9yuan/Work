package com.bootdo.approval.dao;

import com.bootdo.approval.domain.PurchaseDO;

import java.util.List;
import java.util.Map;

import com.bootdo.approval.domain.PurchaseDetailDO;
import org.apache.ibatis.annotations.Mapper;

/**
 * 采购申请表
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-30 14:40:43
 */
@Mapper
public interface PurchaseDao {

	PurchaseDO view(String purchaseId);

	PurchaseDO get(String purchaseId);
	
	List<PurchaseDO> purchaseApprovalStatus(Map<String, Object> map);
	
	List<PurchaseDO> listPurchaseApprovalStatus(Map<String, Object> map);
	
	List<PurchaseDO> list(Map<String,Object> map);
	List<PurchaseDetailDO> listDetail(Map<String,Object> map);

	int countPurchaseApprovalStatus(Map<String, Object> map);
	
	int count(Map<String,Object> map);

	int save(PurchaseDO purchase);

	int update(PurchaseDO purchase);
	int saveDetail(PurchaseDetailDO purchaseDetail);

	int updateDetail(PurchaseDetailDO purchaseDetail);
	
	int remove(String Purchase_ID);
	
	int batchRemove(String[] purchaseIds);
}
