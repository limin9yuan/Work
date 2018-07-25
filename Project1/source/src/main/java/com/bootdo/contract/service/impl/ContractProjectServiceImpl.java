package com.bootdo.contract.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

import com.bootdo.contract.dao.ContractProjectDao;
import com.bootdo.contract.domain.ContractProjectDO;
import com.bootdo.contract.service.ContractProjectService;



@Service
public class ContractProjectServiceImpl implements ContractProjectService {
	@Autowired
	private ContractProjectDao contractProjectDao;
	
	@Override
	public ContractProjectDO get(Integer contractProjectId){
		return contractProjectDao.get(contractProjectId);
	}
	
	@Override
	public List<ContractProjectDO> list(Map<String, Object> map){
		return contractProjectDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return contractProjectDao.count(map);
	}
	
	@Override
	public int save(ContractProjectDO project){
		return contractProjectDao.save(project);
	}
	
	@Override
	public int update(ContractProjectDO project){
		return contractProjectDao.update(project);
	}
	
	@Override
	public int remove(Integer contractProjectId){
		return contractProjectDao.remove(contractProjectId);
	}
	
	@Override
	public int batchRemove(Integer[] contractProjectIds){
		return contractProjectDao.batchRemove(contractProjectIds);
	}
	
}
