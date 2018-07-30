package com.bootdo.budget.controller;

import java.math.BigDecimal;
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

import com.bootdo.budget.domain.BudgetDO;
import com.bootdo.budget.domain.BudgetPurchaseDO;
import com.bootdo.budget.domain.ExpensesDO;
import com.bootdo.budget.domain.LaborDO;
import com.bootdo.budget.service.BudgetPurchaseService;
import com.bootdo.budget.service.BudgetService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 项目采购预算表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-12-11 14:43:33
 */
 
@Controller
@RequestMapping("/budget/budgetPurchase")
public class BudgetPurchaseController extends BaseController {
	@Autowired
	private BudgetPurchaseService budgetPurchaseService;
	@Autowired
	private BudgetService budgetService;
	
	@GetMapping()
	@RequiresPermissions("budget:budget:budget")
	String Purchase(){
	    //return "budget/budgetPurchase/budgetPurchase";
		return "budget/budget/budgetPurchase";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("budget:budget:budget")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<BudgetPurchaseDO> purchaseList = budgetPurchaseService.list(query);
		int total = budgetPurchaseService.count(query);
		PageUtils pageUtils = new PageUtils(purchaseList, total);
		return pageUtils;
	}
	
	//@GetMapping("/add")
	@GetMapping("/add/{budgetId}")
	@RequiresPermissions("budget:budget:add")
	String add(@PathVariable("budgetId") String budgetId,Model model) {
	    //return "budget/purchase/add";
		model.addAttribute("budgetId", budgetId);
		return "budget/budget/purchaseAdd";
	}
	@RequestMapping("/edit_ajax/{purchaseId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("purchaseId") String purchaseId) {
		BudgetPurchaseDO purchase = budgetPurchaseService.get(purchaseId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("purchase", purchase);
		return returnData;
	}
	@GetMapping("/edit/{purchaseId}")
	@RequiresPermissions("budget:budget:edit")
	String edit(@PathVariable("purchaseId") String purchaseId,Model model){
		//BudgetPurchaseDO purchase = budgetPurchaseService.get(purchaseId);
		model.addAttribute("purchaseId", purchaseId);
	    //return "budget/purchase/edit";
		return "budget/budget/purchaseEdit";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("budget:budget:add")
	public R save( BudgetPurchaseDO purchase){
		purchase.setPurchaseOperator(getUserId());
		if(budgetPurchaseService.save(purchase)>0){
			BudgetDO budget= budgetService.get(purchase.getBudgetId());
			String budgetId= budget.getBudgetId();
			budgetService.updateBudgetPurchaseCost(budgetId);
			if("软件项目技术开发类".equals(budget.getBudgetType().toString())){
				budgetService.updateSoftware(budgetId);	
			}
			if("老项目".equals(budget.getBudgetType().toString())){
				budgetService.updateOldProject(budgetId);	
			}
			if("硬件类".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目软件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目硬件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			BudgetDO budget2= budgetService.get(budgetId);
			BigDecimal budgetTotalCost =budget2.getBudgetTotalCost();
			BigDecimal budgetCost =budget2.getBudgetCost();
			//budgetTotalCost.compareTo(budgetCost); //大于 时，返回 1 小于 时返回 -1  等于 时，返回 0
			if (budgetTotalCost!= null && budgetCost!=null){
				if(budgetTotalCost.compareTo(budgetCost)==1){
					budget2.setBudgetConformance("是");
				}
				if(budgetTotalCost.compareTo(budgetCost)==-1){
					budget2.setBudgetConformance("否");
				}
			}else {
				budget2.setBudgetConformance("是");
			}

			budgetService.update(budget2);
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("budget:budget:edit")
	public R update( BudgetPurchaseDO purchase,String purchaseId){
		purchase.setPurchaseOperator(getUserId());
		//budgetPurchaseService.update(purchase);
		BudgetPurchaseDO purchase2= budgetPurchaseService.get(purchaseId);
		BudgetDO budget= budgetService.get(purchase2.getBudgetId());
		String budgetId=budget.getBudgetId();
		if(budgetPurchaseService.update(purchase)>0){
			budgetService.updateBudgetPurchaseCost(budgetId);
			if("软件项目技术开发类".equals(budget.getBudgetType().toString())){
				budgetService.updateSoftware(budgetId);	
			}
			if("老项目".equals(budget.getBudgetType().toString())){
				budgetService.updateOldProject(budgetId);	
			}
			if("硬件类".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目软件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目硬件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			BudgetDO budget2= budgetService.get(budgetId);
			BigDecimal budgetTotalCost =budget2.getBudgetTotalCost();
			BigDecimal budgetCost =budget2.getBudgetCost();
			//budgetTotalCost.compareTo(budgetCost); //大于 时，返回 1 小于 时返回 -1  等于 时，返回 0
			System.out.println(budgetTotalCost);
			System.out.println(budgetCost);
			System.out.println(budgetTotalCost.compareTo(budgetCost));
			if(budgetTotalCost.compareTo(budgetCost)==1){
				budget2.setBudgetConformance("是");
			}
			if(budgetTotalCost.compareTo(budgetCost)==-1){
				budget2.setBudgetConformance("否");
			}
			budgetService.update(budget2);
			return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("budget:budget:remove")
	public R remove( String purchaseId){

		BudgetPurchaseDO purchase2= budgetPurchaseService.get(purchaseId);
		BudgetDO budget= budgetService.get(purchase2.getBudgetId());
		String budgetId=budget.getBudgetId();
		System.out.println(budgetId);
		if(budgetPurchaseService.remove(purchaseId)>0){
			budgetService.updateBudgetPurchaseCost(budgetId);
			if("软件项目技术开发类".equals(budget.getBudgetType().toString())){
				budgetService.updateSoftware(budgetId);	
			}
			if("老项目".equals(budget.getBudgetType().toString())){
				budgetService.updateOldProject(budgetId);	
			}
			if("硬件类".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目软件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目硬件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			BudgetDO budget2= budgetService.get(budgetId);
			BigDecimal budgetTotalCost =budget2.getBudgetTotalCost();
			BigDecimal budgetCost =budget2.getBudgetCost();
			//budgetTotalCost.compareTo(budgetCost); //大于 时，返回 1 小于 时返回 -1  等于 时，返回 0
			System.out.println(budgetTotalCost);
			System.out.println(budgetCost);
			System.out.println(budgetTotalCost.compareTo(budgetCost));
			if(budgetTotalCost.compareTo(budgetCost)==1){
				budget2.setBudgetConformance("是");
			}
			if(budgetTotalCost.compareTo(budgetCost)==-1){
				budget2.setBudgetConformance("否");
			}
			budgetService.update(budget2);
			return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("budget:budget:batchRemove")
	public R remove(@RequestParam("ids[]") String[] purchaseIds){
		//budgetPurchaseService.batchRemove(purchaseIds);
		BudgetPurchaseDO purchase2=budgetPurchaseService.get(purchaseIds[0]);
		BudgetDO budget= budgetService.get(purchase2.getBudgetId()); 
		String budgetId=budget.getBudgetId();
		System.out.println(budgetId);
		if(budgetPurchaseService.batchRemove(purchaseIds)>0){
			budgetService.updateBudgetPurchaseCost(budgetId);
			if("软件项目技术开发类".equals(budget.getBudgetType().toString())){
				budgetService.updateSoftware(budgetId);	
			}
			if("老项目".equals(budget.getBudgetType().toString())){
				budgetService.updateOldProject(budgetId);	
			}
			if("硬件类".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目软件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBudgetPurchaseCost(budgetId);
				budgetService.updateBlender(budgetId);	
			}
			if("软硬件混合项目硬件为主".equals(budget.getBudgetType().toString())){
				budgetService.updateBlender(budgetId);	
			}
			BudgetDO budget2= budgetService.get(budgetId);
			BigDecimal budgetTotalCost =budget2.getBudgetTotalCost();
			BigDecimal budgetCost =budget2.getBudgetCost();
			//budgetTotalCost.compareTo(budgetCost); //大于 时，返回 1 小于 时返回 -1  等于 时，返回 0
			System.out.println(budgetTotalCost);
			System.out.println(budgetCost);
			System.out.println(budgetTotalCost.compareTo(budgetCost));
			if(budgetTotalCost.compareTo(budgetCost)==1){
				budget2.setBudgetConformance("是");
			}
			if(budgetTotalCost.compareTo(budgetCost)==-1){
				budget2.setBudgetConformance("否");
			}
			budgetService.update(budget2);
		return R.ok();
		}
		return R.error();
	}
	
}
