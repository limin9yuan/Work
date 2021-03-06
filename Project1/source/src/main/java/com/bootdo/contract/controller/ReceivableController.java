package com.bootdo.contract.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bootdo.contract.domain.PayableDO;
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

import com.bootdo.contract.domain.ReceivableDO;
import com.bootdo.contract.service.ReceivableService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 收款计划表
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-12-18 10:17:38
 */
 
@Controller
@RequestMapping("/contract/receivable")
public class ReceivableController  extends BaseController{
	@Autowired
	private ReceivableService receivableService;
	
	@GetMapping()
	@RequiresPermissions("contract:contract:contract")
	String Receivable(){
	    return "contract/contract/receivable";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("contract:contract:contract")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<ReceivableDO> receivableList = receivableService.list(query);
		int total = receivableService.count(query);
		PageUtils pageUtils = new PageUtils(receivableList, total);
		return pageUtils;
	}
	
	
	@ResponseBody
	@GetMapping("/getContractId")
	public PageUtils getContractId(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<ReceivableDO> receivableList = receivableService.getContractId(query);
		int total = receivableService.count(query);
		PageUtils pageUtils = new PageUtils(receivableList, total);
		return pageUtils;
	}
	
	
	@GetMapping("/add")
	@RequiresPermissions("contract:contract:add")
	String add(){
	    return "contract/contract/addReceivable";
	}

	@GetMapping("/edit/{receivableId}")
	@RequiresPermissions("contract:contract:edit")
	String edit(@PathVariable("receivableId") String receivableId,Model model){
		ReceivableDO receivable = receivableService.get(receivableId);
		model.addAttribute("receivable", receivable);
	    return "contract/contract/editReceivable";
	}
	@RequestMapping("/edit_ajax/{receivableId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("receivableId") String receivableId) {
		ReceivableDO receivable = receivableService.get(receivableId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("receivable", receivable);
		return returnData;
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("contract:contract:add")
	public R save( ReceivableDO receivable){
		receivable.setReceivableId(getUserId());
		if(receivableService.save(receivable)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("contract:contract:edit")
	public R update( ReceivableDO receivable){
		receivable.setReceivableOperator(Long.toString(getUserId()));
		receivableService.update(receivable);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("contract:contract:remove")
	public R remove( String receivableId){
		if(receivableService.remove(receivableId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("contract:contract:batchRemove")
	public R remove(@RequestParam("ids[]") String[] receivableIds){
		receivableService.batchRemove(receivableIds);
		return R.ok();
	}
	
}
