package com.bootdo.approval.controller;

import java.io.File;
import java.util.List;
import java.util.Map;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
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
import org.springframework.web.multipart.MultipartFile;

import com.bootdo.approval.domain.ExpensesNormalDO;
import com.bootdo.approval.service.ExpensesNormalService;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 普通报销申请信息表
 * 
 * @author sw
 * @email 1992lcg@163.com
 * @date 2017-11-28 17:41:01
 */
 
@Controller
@RequestMapping("/approval/expensesNormal")
public class ExpensesNormalController extends BaseController {
	@Autowired
	private ExpensesNormalService expensesNormalService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@GetMapping()
	@RequiresPermissions("approval:expensesNormal:expensesNormal")
	String ExpensesNormal(){
	    return "approval/expensesNormal/expensesNormal";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("approval:expensesNormal:expensesNormal")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<ExpensesNormalDO> expensesNormalList = expensesNormalService.list(query);
		int total = expensesNormalService.count(query);
		PageUtils pageUtils = new PageUtils(expensesNormalList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("approval:expensesNormal:add")
	String add(){
	    return "approval/expensesNormal/add";
	}
	@GetMapping("/import")
	@RequiresPermissions("approval:expensesNormal:import")
	String importFile() {
		return "approval/expensesNormal/import";
	}
	@GetMapping("/edit/{expensesNormal}")
	@RequiresPermissions("approval:expensesNormal:edit")
	String edit(@PathVariable("expensesNormal") String expensesNormal,Model model){
		ExpensesNormalDO expensesNormalDo = expensesNormalService.get(expensesNormal);
		model.addAttribute("expensesNormal", expensesNormalDo);
	    return "approval/expensesNormal/edit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("approval:expensesNormal:add")
	public R save( ExpensesNormalDO expensesNormal){
		if(expensesNormalService.save(expensesNormal)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("approval:expensesNormal:edit")
	public R update( ExpensesNormalDO expensesNormal){
		expensesNormalService.update(expensesNormal);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("approval:expensesNormal:batchRemove")
	public R remove( String expensesNormal){
		if(expensesNormalService.remove(expensesNormal)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("approval:expensesNormal:batchRemove")
	public R remove(@RequestParam("ids[]") String[] expensesNormals){
		expensesNormalService.batchRemove(expensesNormals);
		return R.ok();
	}
	@ResponseBody
	@PostMapping("/importSubmit")
	@RequiresPermissions("approval:expensesNormal:import")
	R  Import (@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		fileName = FileUtil.renameToUUID(fileName);
		File datafile = null;
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
			datafile = new File( bootdoConfig.getUploadPath()+fileName);
		} catch (Exception e) {
			return R.error();
		}
			// log数据保存
			long userid = getUserId(); // 用户id
			expensesNormalService.Import(datafile, userid);
		
		return null;
	}
}
