package com.bootdo.project.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.bootdo.project.domain.ModuleCategoryDO;
import com.bootdo.project.domain.ProjectDO;
import com.bootdo.project.service.ModuleCategoryService;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 模块分类信息表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-29 11:15:05
 */
 
@Controller
@RequestMapping("/project/moduleCategory")
public class ModuleCategoryController {
	@Autowired
	private ModuleCategoryService moduleCategoryService;
	
	@GetMapping()
	@RequiresPermissions("project:moduleCategory:moduleCategory")
	String ModuleCategory(){
	    return "project/moduleCategory/moduleCategory";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("project:moduleCategory:moduleCategory")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<ModuleCategoryDO> moduleCategoryList = moduleCategoryService.list(query);
		int total = moduleCategoryService.count(query);
		PageUtils pageUtils = new PageUtils(moduleCategoryList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("project:moduleCategory:add")
	String add(){
	    return "project/moduleCategory/add";
	}
	@RequestMapping("/edit_ajax/{moduleId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("moduleId") String moduleId) {
		ModuleCategoryDO moduleCategory = moduleCategoryService.get(moduleId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("moduleCategory", moduleCategory);
		return returnData;
	}
	@GetMapping("/edit/{moduleId}")
	@RequiresPermissions("project:moduleCategory:edit")
	String edit(@PathVariable("moduleId") String moduleId,Model model){
		//ModuleCategoryDO moduleCategory = moduleCategoryService.get(moduleId);
		model.addAttribute("moduleId", moduleId);
	    return "project/moduleCategory/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("project:moduleCategory:add")
	public R save( ModuleCategoryDO moduleCategory){
		if(moduleCategoryService.save(moduleCategory)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("project:moduleCategory:edit")
	public R update( ModuleCategoryDO moduleCategory){
		moduleCategoryService.update(moduleCategory);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("project:moduleCategory:remove")
	public R remove( String moduleId){
		if(moduleCategoryService.remove(moduleId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("project:moduleCategory:batchRemove")
	public R remove(@RequestParam("ids[]") String[] moduleIds){
		moduleCategoryService.batchRemove(moduleIds);
		return R.ok();
	}
	
	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = moduleCategoryService.listDic();
		return dictList;
	}
	
}
