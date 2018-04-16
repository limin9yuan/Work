package com.bootdo.sales.dao;

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.domain.SalesProjectDO;
import com.bootdo.sales.domain.SalesProjectDTO;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.ibatis.annotations.Mapper;
import org.springframework.web.multipart.MultipartFile;

/**
 * 售前项目信息表
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-16 11:25:36
 */
@Mapper
public interface SalesProjectDao {

	SalesProjectDO get(String projectId);
	
	List<SalesProjectDO> list(Map<String,Object> map);
	
	int count(Map<String,Object> map);
	
	int save(SalesProjectDO salesProject);
	
	int update(SalesProjectDO salesProject);
	
	int remove(String Project_ID);
	
	int batchRemove(String[] projectIds);
	
	//List<DictDO> businessList();
	//List<DictDO> listEmployee();

	
	int countDTO(Map<String, Object> map);

	List<SalesProjectDTO> listDTO(Map<String, Object> map);

	List<DictDO> listAllDic();
	
	List<DictDO> listDic();
	
	String getMaxProjectId();


}