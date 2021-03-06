package com.bootdo.system.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.stereotype.Service;

import com.bootdo.common.domain.DictDO;
import com.bootdo.common.domain.Tree;
import com.bootdo.system.domain.DeptDO;
import com.bootdo.system.domain.UserDO;

@Service
public interface UserService {
	
	UserDO get(Long id);

	UserDO getErrorCount(String userName);

	List<UserDO> list(Map<String, Object> map);

	int count(Map<String, Object> map);

	int save(UserDO user);

	int update(UserDO user);

	int updateErrorCount(UserDO user);

	int resetErrorCount(UserDO user);

	int remove(Long userId);

	int batchremove(Long[] userIds);

	boolean exit(Map<String, Object> params);

	Set<String> listRoles(Long userId);

	int resetPwd(UserDO user);

	Tree<DeptDO> getTree();
	
	Tree<DeptDO> getTreeAccount();

	public List<DictDO> listDic();
	
	UserDO getByUsername(String username);
	
	List<UserDO> listUserByRoleId(Long role_id);

}
