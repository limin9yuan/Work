package com.bootdo.payment.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bootdo.common.service.MainCopyPersonService;
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

import com.bootdo.payment.domain.InvoiceDO;
import com.bootdo.payment.domain.PaidDO;
import com.bootdo.payment.domain.PurchaseManagementDO;
import com.bootdo.payment.service.PaidService;
import com.bootdo.payment.service.PurchaseManagementService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.contract.domain.ContractDO;
import com.bootdo.contract.service.ContractService;

/**
 * 付款信息表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-12-05 10:14:55
 */
 
@Controller
@RequestMapping("/payment/paid")
public class PaidController extends BaseController {
	@Autowired
	private PaidService paidService;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;
	@GetMapping()
	@RequiresPermissions("payment:paid:paid")
	String Paid(){
	    return "payment/paid/paid";
	}
	
	@GetMapping("/purchaseType")
    String purchaseType(){
        return "payment/paid/purchaseType";
    }
	
	@GetMapping("/contractType")
    String contractType(){
        return "payment/paid/contractType";
    }
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("payment:paid:paid")
	public PageUtils list(@RequestParam Map<String, Object> params){
		params.put("userId", getUserId());
		params.put("userName", getUsername());
		params.put("tableName", "payment_paid");
		//查询列表数据
		params.put("Identification", (getIdentification()));
		params.put("paidOperator", (getUserId()));
				if (params.get("projectOwner") != null && !"".equals(params.get("projectOwner"))) {
					params.put("projectOwner", "%" + (String) params.get("projectOwner") + "%");
				}	
        Query query = new Query(params); 
		List<PaidDO> paidList = paidService.list(query);
		int total = paidService.count(query);
		PageUtils pageUtils = new PageUtils(paidList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("payment:paid:add")
	String add(){
	    return "payment/paid/add";
	}
	@RequestMapping("/edit_ajax/{paidId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("paidId")String paidId) {
		PaidDO paid = paidService.get(paidId);
		Map<String, Object> returnData = new HashMap<String, Object>();

		if(paid.getPaidmentType()==1){//合同
			paid.setPurchaseId(paid.getContractId());
		}
		returnData.put("paid", paid);
		return returnData;
	}
	@GetMapping("/edit/{paidId}")
	@RequiresPermissions("payment:paid:edit")
	String edit(@PathVariable("paidId") String paidId,Model model){
		//PaidDO paid = paidService.get(paidId);
		model.addAttribute("paidId", paidId);
	    return "payment/paid/edit";
	}

	@GetMapping("/view/{paidId}")
	@RequiresPermissions("payment:paid:view")
	String view(@PathVariable("paidId") String paidId,Model model){
		//PaidDO paid = paidService.get(paidId);
		model.addAttribute("paidId", paidId);
		return "payment/paid/view";
	}
	
	/**
	 * 保存
	 * @param paidmentType 
	 * @param purchaseId 
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("payment:paid:add")
	public R save( PaidDO paid, String paidmentType, String purchaseId){
		//Map<String, Object> params = new HashMap<>(16);
		//params.put("paidmentType",10);
		//params.put("purchaseId",10);
		//Integer.parseInt(paidmentType); 
		if(paid.getPaidmentType()==0){
			paid.setPurchaseId(purchaseId); 
			paid.setContractId(""); 
		}
		else if(paid.getPaidmentType()==1){
			paid.setContractId(purchaseId);
			paid.setPurchaseId("");			
		}
		paid.setPaidOperator(getUserId());
		int paidIds = paidService.save(paid);
		if (paidIds > 0) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = paid.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");
				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(paid.getPaidId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("payment_paid");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = paid.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(paid.getPaidId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("payment_paid");
					mainCopyPersonService.save(mcp);
				}


			}
			R r = R.ok();
			r.put("paidId", paidIds);
			return r;
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("payment:paid:edit")
	public R update( PaidDO paid, String paidmentType, String purchaseId){
		if(paid.getPaidmentType()==0){
			paid.setPurchaseId(purchaseId); 
			paid.setContractId(""); 
		}
		else if(paid.getPaidmentType()==1){
			paid.setContractId(purchaseId);
			paid.setPurchaseId("");			
		}
		paid.setPaidOperator(getUserId());
		String paidIds = paid.getPaidId();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset",1);
		params.put("limit",2);
		params.put("tId",paidIds);
		params.put("tableName","payment_paid");
		paidService.update(paid);
		mainCopyPersonService.remove(params);
		if (!paidIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = paid.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");

				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(paidIds);
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("payment_paid");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = paid.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(paidIds);
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("payment_paid");
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
	@RequiresPermissions("payment:paid:remove")
	public R remove( String paidId){
		if(paidService.remove(paidId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("payment:paid:batchRemove")
	public R remove(@RequestParam("ids[]") String[] paidIds){
		paidService.batchRemove(paidIds);
		return R.ok();
	}
}
