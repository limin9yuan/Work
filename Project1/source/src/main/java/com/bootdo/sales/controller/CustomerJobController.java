package com.bootdo.sales.controller;

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

import com.bootdo.sales.domain.CustomerChildCompanyDo;
import com.bootdo.sales.domain.CustomerJobDO;
import com.bootdo.sales.service.CustomerJobService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 客户组织机构_岗位
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-12-12 14:07:19
 */

@Controller
@RequestMapping("/sales/customerJob")
public class CustomerJobController extends BaseController{
	@Autowired
	private CustomerJobService customerJobService;

	@GetMapping()
	@RequiresPermissions("sales:customerJob:customerJob")
	String CustomerJob() {
		return "sales/companyCustomer/customerJob";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sales:customerJob:customerJob")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		Query query = new Query(params);
		List<CustomerJobDO> customerJobList = customerJobService.list(query);
		int total = customerJobService.count(query);
		PageUtils pageUtils = new PageUtils(customerJobList, total);
		return pageUtils;
	}

	@GetMapping("/add/{customerId}")
	@RequiresPermissions("sales:customerJob:add")
	String add(@PathVariable("customerId") String customerId,Model model) {
		model.addAttribute("customerId", customerId);
		return "sales/companyCustomer/addjobcon";
	}

	@GetMapping("/edit/{customerJobId}")
	@RequiresPermissions("sales:customerJob:edit")
	String edit(@PathVariable("customerJobId") String customerJobId, Model model) {
		CustomerJobDO customerJob = customerJobService.get(customerJobId);
		model.addAttribute("customerJob", customerJob);
		return "sales/companyCustomer/editjobcon";
	}

	// ajax修改绑定数据
	@RequestMapping("/edit_ajax/{customerJobId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("customerJobId") String customerJobId) {
		CustomerJobDO CustomerJob = customerJobService.get(customerJobId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("CustomerJob", CustomerJob);
		return returnData;
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sales:customerJob:add")
	public R save(CustomerJobDO customerJob) {
		customerJob.setCustomerJobOperator(Long.toString(getUserId()));//操作人
		if (customerJobService.save(customerJob) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sales:customerJob:edit")
	public R update(CustomerJobDO customerJob) {
		customerJobService.update(customerJob);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("sales:customerJob:batchRemove")
	public R remove(String customerJobId) {
		if (customerJobService.remove(customerJobId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("sales:customerJob:batchRemove")
	public R remove(@RequestParam("ids[]") String[] customerJobIds) {
		customerJobService.batchRemove(customerJobIds);
		return R.ok();
	}

	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listDic() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = customerJobService.listDic();
		return dictList;
	}
}
