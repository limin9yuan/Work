package com.bootdo.contract.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bootdo.activiti.config.ActivitiConstant;
import com.bootdo.activiti.service.impl.ActTaskServiceImpl;
import com.bootdo.common.domain.DictDO;
import com.bootdo.contract.dao.TravelDao;
import com.bootdo.contract.domain.TravelDO;
import com.bootdo.contract.service.TravelService;



@Service
public class TravelServiceImpl implements TravelService {
	@Autowired
	private TravelDao travelDao;
	@Autowired
	private ActTaskServiceImpl actTaskService;
	
	@Override
	public TravelDO get(String travelId){
		return travelDao.get(travelId);
	}
	
	@Override
	public List<TravelDO> list(Map<String, Object> map){
		return travelDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return travelDao.count(map);
	}
	
	@Override
	public int save(TravelDO travel){
		int ret=travelDao.save(travel);
		/*
		此处获取自增长主键ID，此ID作为流程的businessId
		需注意在SQL语句XML配置文件save中需增加：useGeneratedKeys="true" keyProperty="travelId" 用来获取数据库自增长ID
		<insert id="save" parameterType="com.bootdo.contract.domain.TravelDO" useGeneratedKeys="true" keyProperty="travelId">
		*/
		String travelId=travel.getTravelId();
		//添加保存时发起审批流程
		actTaskService.startProcess(ActivitiConstant.ACTIVITI_CONTRACT_TRAVEL[0],
				ActivitiConstant.ACTIVITI_CONTRACT_TRAVEL[1],travelId,travel.getTravelName(),new HashMap<String,Object>());
		
		return ret;
	}
	
	@Override
	public int update(TravelDO travel){
		
		
		return travelDao.update(travel);
	}
	
	@Override
	public int remove(String travelId){
		return travelDao.remove(travelId);
	}
	
	@Override
	public int batchRemove(String[] travelIds){
		return travelDao.batchRemove(travelIds);
	}
	
	@Override	
	public List<DictDO> listDic(){
		return travelDao.listDic();
	}
	/**
	 * ******************* 审批流程相关 *************************
	 */
	//审批处理保存
	@Override
	public int formUpdate(TravelDO travel){
		//流程审批处理
		Map<String,Object> vars = new HashMap<>(16);
		vars.put("taskAction",  travel.getTaskAction() );
		actTaskService.complete(travel.getTaskId(),vars);
		
		return travelDao.update(travel);
	}
}
