package com.bootdo.contract.service;

import com.bootdo.common.domain.DictDO;
import com.bootdo.contract.domain.PayoutDO;

import java.io.File;
import java.util.List;
import java.util.Map;

/**
 * 请款申请表
 * 
 * @author sw
 * @email 1992lcg@163.com
 * @date 2017-11-30 16:36:08
 */
public interface PayoutService {
	
	PayoutDO get(String payoutId);
	
	List<PayoutDO> list(Map<String, Object> map);
	
	int count(Map<String, Object> map);
	
	int save(PayoutDO payout);
	
	int update(PayoutDO payout);
	
	int remove(String payoutId);
	
	int batchRemove(String[] payoutIds);
	List<DictDO> listDic();
	Map<String, Object> Import(File file,long userid) ;
}
