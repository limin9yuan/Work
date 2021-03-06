package com.bootdo.contract.controller;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bootdo.activiti.service.ActTaskService;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.contract.domain.TravelDO;
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

import com.bootdo.contract.domain.PayoutDO;
import com.bootdo.contract.service.PayoutService;
import com.bootdo.sales.domain.RecordServiceDO;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.service.MainCopyPersonService;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 请款申请表
 * 
 * @author sw
 * @email 1992lcg@163.com
 * @date 2017-11-30 16:36:08
 */

@Controller
@RequestMapping("/contract/payout")
public class PayoutController extends BaseController {
	@Autowired
	private PayoutService payoutService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	ActivitiUtils activitiUtils;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;
	@Autowired
	private ActTaskService actTaskService;

	/**
	 * ********************** 审批流程相关 *********************************
	 */
	// 申请页面
	@GetMapping("/form")
	@RequiresPermissions("contract:payout:add")
	String form() {
		return "contract/payout/add";
	}

	// 审批处理页面
	@GetMapping("/form/{taskId}")
	@RequiresPermissions("contract:payout:add")
	String formTask(@PathVariable("taskId") String taskId, Model model) {
		// 取得流程表单数据
		PayoutDO payout = payoutService.view(activitiUtils.getBusinessKeyByTaskId(taskId));
		if (payout != null) {
			model.addAttribute("payout", payout);
			// model.addAttribute("taskId",taskId);
		}
		return "contract/payout/viewPayout";
	}

	// 审批处理保存
	@ResponseBody
	@RequestMapping("/form/update")
	@RequiresPermissions("contract:payout:edit")
	public R formUpdate(PayoutDO payout) {

		payoutService.formUpdate(payout);
		return R.ok();
	}

	@GetMapping()
	@RequiresPermissions("contract:payout:payout")
	String Payout() {
		return "contract/payout/payout";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("contract:payout:payout")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		params.put("payoutOperator", (getUserId()));
		params.put("userName", (getUsername()));
		params.put("Identification", (getIdentification()));
		if (params.get("payoutPerson") != null && params.get("payoutPerson") != "") {
			params.put("payoutPerson", "%" + params.get("payoutPerson") + "%");
		}
		Query query = new Query(params);
		List<PayoutDO> payoutList = payoutService.list(query);
		int total = payoutService.count(query);
		PageUtils pageUtils = new PageUtils(payoutList, total);
		return pageUtils;
	}

	@GetMapping("/relateTravel")
	String relateTravel(){
		return "/contract/payout/relateTravel";
	}

	@GetMapping("/add")
	@RequiresPermissions("contract:payout:add")
	String add() {
		return "contract/payout/add";
	}

	@GetMapping("/import")
	@RequiresPermissions("contract:payout:import")
	String importFile() {
		return "contract/payout/import";
	}

	@GetMapping("/edit/{payoutId}")
	@RequiresPermissions("contract:payout:edit")
	String edit(@PathVariable("payoutId") String payoutId, Model model) {
		PayoutDO payout = payoutService.get(payoutId);
		model.addAttribute("payout", payout);
		return "contract/payout/edit";
	}

	// edit数据绑定
	@RequestMapping("/edit_ajax/{payoutId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("payoutId") String payoutId) {
		PayoutDO payout = payoutService.get(payoutId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("payout", payout);
		return returnData;
	}

	/**
	 * 查看信息
	 */
	@GetMapping("/examine/{payoutId}")
	@RequiresPermissions("sales:customerContact:customerContact")
	String examine(@PathVariable("payoutId") String payoutId, Model model) {
		model.addAttribute("payoutId", payoutId);
		return "contract/payout/examinePayout";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("contract:payout:add")
	public R save(PayoutDO payout) {
		payout.setPayoutOperator(Long.toString(getUserId()));
		int payoutIds = payoutService.save(payout);
		if (payoutIds > 0) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = payout.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");
				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(payout.getPayoutId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_payout");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = payout.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(payout.getPayoutId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_payout");
					mainCopyPersonService.save(mcp);
				}

			}
			R r = R.ok();
			r.put("payoutId", payoutIds);
			return r;
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("contract:payout:edit")
	public R update(PayoutDO payout) {
		String payoutIds=payout.getPayoutId();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset",1);
		params.put("limit",2);
		params.put("tId",payoutIds);
		params.put("tableName","approval_payout");
		payoutService.update(payout);
		mainCopyPersonService.remove(params);
		if (!payoutIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = payout.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");

				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(payout.getPayoutId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_payout");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = payout.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				int result = 0;
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(payout.getPayoutId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("approval_payout");
					mainCopyPersonService.save(mcp);

				}
			}

		}
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("contract:payout:batchRemove")
	public R remove(String payoutId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset",1);
		params.put("limit",2);
		params.put("tId",payoutId);
		params.put("tableName","approval_payout");
		PayoutDO payout = payoutService.get(payoutId);
		if (payout != null && payout.getProcessInstanceId()!= null){
			if (payout.getPayoutApprovalStatus().equals("2")){
				return R.error("流程正在审批，不允许删除");
			}
			if (payout.getPayoutApprovalStatus().equals("1")) {
				return R.error("流程已经审批完成，不允许删除");
			}
			actTaskService.deleteProcess(payout.getProcessInstanceId());
		}
		if (payoutService.remove(payoutId) > 0) {
			mainCopyPersonService.remove(params);
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("contract:payout:batchRemove")
	public R remove(@RequestParam("ids[]") String[] payoutIds) {
		List<String> list = new ArrayList<String>();
		//级联删除流程相关
		for(int i=0;i<payoutIds.length;i++){
			PayoutDO payout= payoutService.get(payoutIds[i]);
			if(payout!=null&&payout.getProcessInstanceId()!=null){
				if(payout.getPayoutApprovalStatus().equals("2")){
					continue;
					//return R.error("流程正在审批，不允许删除");
				}else if(payout.getPayoutApprovalStatus().equals("1")){
					//return R.error("流程已经审批完成，不允许删除");
					continue;
				}
				actTaskService.deleteProcess(payout.getProcessInstanceId());
				list.add(payoutIds[i]);
			}
		}

		payoutService.batchRemove(list.toArray(new String[1]));
		if(list.size()<payoutIds.length){
			return R.ok("有部分流程正在审批或审批完成，不允许删除");
		}else{
			return R.ok();
		}
	}

	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listDic() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = payoutService.listDic();
		return dictList;
	}

	@ResponseBody
	@PostMapping("/importSubmit")
	@RequiresPermissions("contract:payout:import")
	R Import(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		fileName = FileUtil.renameToUUID(fileName);
		File datafile = null;
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
			datafile = new File(bootdoConfig.getUploadPath() + fileName);
		} catch (Exception e) {
			return R.error();
		}
		// log数据保存
		long userid = getUserId(); // 用户id
		payoutService.Import(datafile, userid);

		return null;
	}
}
