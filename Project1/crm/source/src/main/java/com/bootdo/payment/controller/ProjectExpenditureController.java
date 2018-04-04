
package com.bootdo.payment.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.bootdo.payment.domain.ProjectExpenditureDO;
import com.bootdo.payment.service.ProjectExpenditureService;

//import javafx.scene.control.Alert;

import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.service.FileService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 项目收支 
 
 * @小平
 * @email 1992lcg@163.com
 * @date 2018-2-1
 */

@Controller
@RequestMapping("/payment/projectExpenditure")
public class ProjectExpenditureController extends BaseController {
	@Autowired
	private ProjectExpenditureService projectExpenditureService;

	@GetMapping()
	@RequiresPermissions("payment:projectExpenditure:projectExpenditure")
	String Contract() {
		return "payment/projectExpenditure/projectExpenditure";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("payment:projectExpenditure:projectExpenditure")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		if (params.get("projectManager") != null && !"".equals(params.get("projectManager"))) {
			params.put("projectManager", "%" + params.get("projectManager") + "%");
		}
		Query query = new Query(params);
		List<ProjectExpenditureDO> projectExpenditureList = projectExpenditureService.list(query);
		int total = projectExpenditureService.count(query);
		PageUtils pageUtils = new PageUtils(projectExpenditureList, total);
		return pageUtils;
	}
	
	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = projectExpenditureService.listDic();
		return dictList;
	}
	
	@ResponseBody
	@GetMapping("/listDicManager")
	public List<DictDO> listByType1() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = projectExpenditureService.listDicManager();
		return dictList;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("payment:projectExpenditure:add")
	String add() {
		return "payment/projectExpenditure/add";
	}

	@GetMapping("/import")
	@RequiresPermissions("payment:projectExpenditure:dataImport")
	String importFile() {
		return "payment/projectExpenditure/import";
	}

	@GetMapping("/edit/{projectId}")
	@RequiresPermissions("payment:projectExpenditure:edit")
	String edit(@PathVariable("projectId") String projectId, Model model) {
		ProjectExpenditureDO payment = projectExpenditureService.get(projectId);
		model.addAttribute("payment", payment);
		return "payment/projectExpenditure/edit";
	}

    @RequestMapping("/detailed_information_ajax/{projectId}")
	@RequiresPermissions("payment:projectExpenditure:detailed_information")
    @ResponseBody
	Map<String, Object> detailed_information_ajax(@PathVariable("projectId") String projectId) {
		ProjectExpenditureDO project = projectExpenditureService.get(projectId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("project", project);
        return returnData;
	}

	// 超链接
	@GetMapping("/detailed_information/{projectId}")
	@RequiresPermissions("payment:projectExpenditure:detailed_information")
	String detailed_information(@PathVariable("projectId") String projectId, Model model) {
		model.addAttribute("projectId", projectId);
		return "payment/projectExpenditure/detailed_information";
	}
	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("payment:projectExpenditure:add")
	public R save(ProjectExpenditureDO projectExpenditure) {
		projectExpenditure.setProjectId(getUserId());
		if (projectExpenditureService.save(projectExpenditure) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("payment:projectExpenditure:edit")
	public R update(ProjectExpenditureDO projectExpenditure) {
		projectExpenditure.setProjectId(getUserId());
		projectExpenditureService.update(projectExpenditure);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("payment:projectExpenditure:remove")
	public R remove(String projectId) {
		if (projectExpenditureService.remove(projectId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("payment:projectExpenditure:batchRemove")
	public R remove(@RequestParam("ids[]") String[] projectIds) {
		projectExpenditureService.batchRemove(projectIds);
		return R.ok();
	}

	/**
	 * Export Microsoft Excel file.
	 */
	@RequestMapping(value = "/export")
	public @ResponseBody void export(
			@RequestParam(value = "projectManager", required = false) String projectExpenditure_projectManager,
			@RequestParam(value = "projectSales", required = false) String projectExpenditure_projectSales,
			@RequestParam(value = "projectId", required = false) String projectExpenditure_projectId,
			HttpServletResponse response, HttpServletRequest request) throws ParseException {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("projectManager", (projectExpenditure_projectManager !=null && projectExpenditure_projectManager !="")?"%"+projectExpenditure_projectManager+"%" : projectExpenditure_projectManager);
		params.put("projectSales", projectExpenditure_projectSales);
		params.put("projectId", projectExpenditure_projectId);
		List<ProjectExpenditureDO> list = projectExpenditureService.getQuery(params);
		if (list.size() > 0) {
			System.out.println("---------------------list.size------------------->" + list.size());
			response.setContentType("application/binary;charset=UTF-8");
			try {
				ServletOutputStream out = response.getOutputStream();
				String fileName = new String((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()).getBytes(),"UTF-8");
				response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
				String[] titles = { "项目编号", "企业客户编号", "项目集合编号", "项目名称", "销售负责人", "项目开始时间", "项目结束时间", "负责人", "研发经理", "研发开始时间","研发结束时间", "项目类型", "项目阶段", "项目描述", "旧项目编号", "备注", "创建人", "创建时间"};
				projectExpenditureService.export(titles, out, list);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
