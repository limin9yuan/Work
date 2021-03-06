package com.bootdo.approval.controller;

import java.math.BigDecimal;
import java.util.*;

import com.bootdo.activiti.service.ActTaskService;
import com.bootdo.approval.domain.PurchaseDetailDO;
import com.bootdo.approval.service.PurchaseDetailService;
import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.service.MainCopyPersonService;
import com.bootdo.contract.domain.PayoutDO;
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

import com.bootdo.activiti.domain.SalaryDO;
import com.bootdo.activiti.service.impl.ActTaskServiceImpl;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.approval.domain.PurchaseDO;

import com.bootdo.approval.service.PurchaseService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.contract.domain.TravelDO;
import com.bootdo.project.domain.ProjectDO;

/**
 * 采购申请表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-30 14:40:43
 */
 
@Controller
@RequestMapping("/approval/purchase")
public class PurchaseController extends BaseController {
	@Autowired
	private PurchaseService purchaseService;

	@Autowired
	private ActivitiUtils activitiUtils;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;
	@Autowired
	private PurchaseDetailService purchaseDetailService;
	@Autowired
	private ActTaskService actTaskService;

	@GetMapping()
	@RequiresPermissions("approval:purchase:purchase")
	String Purchase(){
	    return "approval/purchase/purchase";
	}
	//Detail表里的显示增加修改
	@ResponseBody
	@GetMapping("/listDetail")
	@RequiresPermissions("approval:purchase:purchase")
	public PageUtils listDetail(@RequestParam Map<String, Object> params){


		//查询列表数据
		Query query = new Query(params);
		List<PurchaseDetailDO> purchaseDetailList = purchaseDetailService.list(query);
		int total = purchaseDetailService.count(query);
		PageUtils pageUtils = new PageUtils(purchaseDetailList, total);
		return pageUtils;
	}
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/saveDetail")
	@RequiresPermissions("approval:purchase:add")
	public R saveDetail( PurchaseDetailDO purchaseDetail){

		if(purchaseService.saveDetail(purchaseDetail)>0){

			R r = R.ok();
			r.put("purchaseId", purchaseDetail.getPurchaseId());
			return r;
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/updateDetail")
	@RequiresPermissions("approval:purchase:edit")
	public R updateDetail( PurchaseDetailDO purchaseDetail){

		purchaseDetailService.update(purchaseDetail);
		return R.ok();
	}



	/**
	 * 删除
	 */
	@PostMapping( "/removeDetail")
	@ResponseBody
	@RequiresPermissions("approval:purchase:remove")
	public R removeDetail( Integer purchaseId){

		if(purchaseDetailService.remove(purchaseId)>0){

			return R.ok();
		}
		return R.error();
	}








	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("approval:purchase:purchase")
	public PageUtils list(@RequestParam Map<String, Object> params){
		params.put("userId", getUserId());
		params.put("userName", getUsername());
		params.put("tableName", "approval_purchase");
		params.put("projectId", params.get("projectId"));
		//查询列表数据
		if (params.get("purchaseOperator") != null && !"".equals(params.get("purchaseOperator"))) {
			params.put("purchaseOperator", "%" + (String) params.get("purchaseOperator") + "%");
		}
        Query query = new Query(params);
		List<PurchaseDO> purchaseList = purchaseService.list(query);
		int total = purchaseService.count(query);
		PageUtils pageUtils = new PageUtils(purchaseList, total);
		return pageUtils;
	}
	
	@GetMapping("/exaiminePurchase")
	@RequiresPermissions("approval:purchase:purchase")
	String exaiminePurchase(){
	    return "approval/purchase/examinePurchase";
	}
	//审批后金额列表
	@ResponseBody
	@GetMapping("/listPurchaseApprovalStatus")
	@RequiresPermissions("approval:purchase:purchase")
	public PageUtils listPurchaseApprovalStatus(@RequestParam Map<String, Object> params){
		params.put("userId", getUserId());
		params.put("userName", getUsername());
		params.put("tableName", "approval_purchase");
		//查询列表数据
		if (params.get("purchaseOperator") != null && !"".equals(params.get("purchaseOperator"))) {
			params.put("purchaseOperator", "%" + (String) params.get("purchaseOperator") + "%");
		}
        Query query = new Query(params);
		List<PurchaseDO> purchaseList = purchaseService.listPurchaseApprovalStatus(query);
		int total = purchaseService.countPurchaseApprovalStatus(query);
		PageUtils pageUtils = new PageUtils(purchaseList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("approval:purchase:add")
	String add(){
//		purchaseDetailService.removeapprovalid(0);
	    return "approval/purchase/add";
	}
	@RequestMapping("/edit_ajax/{purchaseId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("purchaseId") String purchaseId) {
		PurchaseDO purchase = purchaseService.get(purchaseId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("purchase", purchase);
		return returnData;
	}
	//从这往前面edit页的table传数据 显示
	@RequestMapping("/edit_table/{purchaseId}")
	@ResponseBody
	Map<String, Object> edit_table(@PathVariable("purchaseId") int purchaseId) {

        int counttable=purchaseDetailService.counttable(purchaseId);
		Map<String, Object> returnData = new HashMap<String, Object>();


		List<PurchaseDetailDO>  purchasedetail=purchaseDetailService.get(Integer.valueOf(purchaseId));

		returnData.put("purchasedetail",purchasedetail);
        returnData.put("tableadd",counttable);

		return returnData;
	}



	@GetMapping("/edit/{purchaseId}")
	@RequiresPermissions("approval:purchase:edit")
	String edit(@PathVariable("purchaseId") String purchaseId,Model model){

		model.addAttribute("purchaseId", purchaseId);
	    return "approval/purchase/edit";
	}

	@GetMapping("/view/{purchaseId}")
	@RequiresPermissions("approval:purchase:edit")
	String view(@PathVariable("purchaseId") String purchaseId,Model model){
		//PurchaseDO purchase = purchaseService.get(purchaseId);
		model.addAttribute("purchaseId", purchaseId);
		return "approval/purchase/view";
	}
	@ResponseBody
	@PostMapping("/savetable")
	@RequiresPermissions("approval:purchase:add")
	public R savetable( PurchaseDO purchase){

		return R.ok();
	}
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("approval:purchase:add")
	public R save( PurchaseDO purchase){
		purchase.setPurchaseOperator(getUserId());

		int purchaseIds = purchaseService.save(purchase);
        //吧详细表数据的字符串加id的sava


		String[] tableadd= purchase.getDetailid().split(",");
 int ceshi=tableadd.length;
	if(tableadd.length>7) {
		for (int i = tableadd.length - 1; i >= 0; i = i - 8) {
			PurchaseDetailDO purchasedetail = new PurchaseDetailDO();
         if(tableadd[i]!="") {
			 purchasedetail.setPurchaseName(tableadd[i]);
		 }
			if(tableadd[i - 1]!="") {
				purchasedetail.setPurchaseConfig(tableadd[i - 1]);
			}

			if(tableadd[i - 2]!="") {
				purchasedetail.setPurchaseBrand(tableadd[i - 2]);
			}
			if(tableadd[i - 3]!="") {
				purchasedetail.setPurchaseMode(tableadd[i - 3]);
			}
			if(tableadd[i - 4]!="") {
				purchasedetail.setPurchaseUnit(tableadd[i - 4]);
			}
			if(tableadd[i - 5]!="") {

				purchasedetail.setPurchaseNumber(tableadd[i - 5]);
			}
			if(tableadd[i - 6]!="") {

				purchasedetail.setPurchaseUnitPrice(tableadd[i - 6]);
			}
			if(tableadd[i - 7]!="") {

				purchasedetail.setPurchaseTotalPrice(tableadd[i - 7]);
			}
			purchasedetail.setApprovalpurchaseId(String.valueOf(purchaseIds));
			purchaseDetailService.save(purchasedetail);
		}
	}



		if (purchaseIds > 0) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = purchase.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");
				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(purchase.getPurchaseId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_purchase");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = purchase.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(purchase.getPurchaseId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_purchase");
					mainCopyPersonService.save(mcp);
				}
			}
			R r = R.ok();
			r.put("purchaseId", purchaseIds);



			return r;
		}
		return R.error();
	}



	@ResponseBody
	@RequestMapping("/updatetable")
	@RequiresPermissions("approval:purchase:edit")
	public R updatetable(final Long[] tableadd){

		return R.ok();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("approval:purchase:edit")
	public R update( PurchaseDO purchase){


		purchase.setPurchaseOperator(getUserId());
		String purchaseIds = purchase.getPurchaseId();
        //先删除之前的信息
		purchaseDetailService.remove(Integer.valueOf(purchaseIds));
		//在都整体详细表数据的字符串加id的sava
		String[] tableadd= purchase.getDetailid().split(",");
		for(int i=tableadd.length-1;i>=0;i=i-8)
		{
			PurchaseDetailDO purchasedetail=new PurchaseDetailDO();
			purchasedetail.setPurchaseName(tableadd[i]);
			purchasedetail.setPurchaseConfig(tableadd[i-1]);
			purchasedetail.setPurchaseBrand(tableadd[i-2]);
			purchasedetail.setPurchaseMode(tableadd[i-3]);
			purchasedetail.setPurchaseUnit(tableadd[i-4]);

			purchasedetail.setPurchaseNumber(tableadd[i-5]);

			purchasedetail.setPurchaseUnitPrice(tableadd[i-6]);

			purchasedetail.setPurchaseTotalPrice(tableadd[i-7]);
			purchasedetail.setApprovalpurchaseId(String.valueOf(purchaseIds));
			purchaseDetailService.save(purchasedetail);
		}

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset",1);
		params.put("limit",2);
		params.put("tId",purchaseIds);
		params.put("tableName","approval_purchase");
		purchaseService.update(purchase);
		mainCopyPersonService.remove(params);
		if (!purchaseIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = purchase.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");

				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(purchaseIds);
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_purchase");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = purchase.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(purchaseIds);
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_purchase");
					mainCopyPersonService.save(mcp);

				}
			}

		}
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("approval:purchase:remove")
	public R remove( String purchaseId){
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset",1);
		params.put("limit",2);
		params.put("tId",purchaseId);
		params.put("tableName","approval_purchase");
		PurchaseDO purchase = purchaseService.get(purchaseId);
		if (purchase != null && purchase.getProcessInstanceId()!= null){
			if (purchase.getPurchaseApprovalStatus().equals("2")){
				return R.error("流程正在审批，不允许删除");
			}
			if (purchase.getPurchaseApprovalStatus().equals("1")) {
				return R.error("流程已经审批完成，不允许删除");
			}
			actTaskService.deleteProcess(purchase.getProcessInstanceId());
		}
		if(purchaseService.remove(purchaseId)>0){
			mainCopyPersonService.remove(params);
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("approval:purchase:batchRemove")
	public R remove(@RequestParam("ids[]") String[] purchaseIds){
		List<String> list = new ArrayList<String>();
		//级联删除流程相关
		for(int i=0;i<purchaseIds.length;i++){
			PurchaseDO purchase= purchaseService.get(purchaseIds[i]);
			if(purchase!=null&&purchase.getProcessInstanceId()!=null){
				if(purchase.getPurchaseApprovalStatus().equals("2")){
					continue;
					//return R.error("流程正在审批，不允许删除");
				}else if(purchase.getPurchaseApprovalStatus().equals("1")){
					//return R.error("流程已经审批完成，不允许删除");
					continue;
				}
				actTaskService.deleteProcess(purchase.getProcessInstanceId());
				list.add(purchaseIds[i]);
			}
		}

		purchaseService.batchRemove(list.toArray(new String[1]));
		if(list.size()<purchaseIds.length){
			return R.ok("有部分流程正在审批或审批完成，不允许删除");
		}else{
			return R.ok();
		}
	}
	/**
	 * ********************** 审批流程相关  *********************************
	 */
	//申请页面
	@GetMapping("/form")
	@RequiresPermissions("approval:purchase:add")
	String form(){
	    return "approval/purchase/add";
	}
	//审批处理页面
	@GetMapping("/form/{taskId}")
	@RequiresPermissions("approval:purchase:add")
	String formTask(@PathVariable("taskId") String taskId,Model model){
		//取得流程表单数据
		PurchaseDO purchase = purchaseService.view(activitiUtils.getBusinessKeyByTaskId(taskId));
		if(purchase!=null){
			model.addAttribute("purchase", purchase);
			//model.addAttribute("taskId",taskId);
		}
	    return "approval/purchase/viewPurchase";
	}
	
	
	 //审批处理保存
	@ResponseBody
	@RequestMapping("/form/update")
	@RequiresPermissions("approval:purchase:edit")
	public R formUpdate( PurchaseDO purchase){
		
		purchaseService.formUpdate(purchase);
		return R.ok();
	}
}
