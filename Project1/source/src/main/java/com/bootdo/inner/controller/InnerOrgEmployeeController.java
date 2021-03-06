package com.bootdo.inner.controller;

import java.io.File;
import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.service.MainCopyPersonService;
import org.apache.catalina.servlet4preview.http.HttpServletRequest;
import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.multipart.MultipartFile;

import com.bootdo.inner.dao.InnerOrgEmployeeDao;
import com.bootdo.inner.domain.InnerOrgEmployeeDO;
import com.bootdo.inner.domain.OrgJobDO;
import com.bootdo.inner.service.InnerOrgEmployeeService;
import com.bootdo.sales.domain.BusinessDO;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 内部组织机构_员工表
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-11-22 13:27:13
 */

@Controller
@RequestMapping("/inner/innerOrgEmployee")
public class InnerOrgEmployeeController extends BaseController {
	@Autowired
	private InnerOrgEmployeeService innerOrgEmployeeService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;

	@GetMapping()
	@RequiresPermissions("inner:innerOrgEmployee:innerOrgEmployee")
	String InnerOrgEmployee() {
		return "inner/innerOrgEmployee/innerOrgEmployee";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("inner:innerOrgEmployee:innerOrgEmployee")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		if (params.get("employeeName") != null && !"".equals(params.get("employeeName"))) {
			params.put("employeeName", "%" + (String) params.get("employeeName") + "%");
		}
		if (params.get("employeeDept") != null && !"".equals(params.get("employeeDept"))) {
			params.put("employeeDept", "%" + (String) params.get("employeeDept") + "%");
		}
		if (params.get("employeeOperatorName") != null && !"".equals(params.get("employeeOperatorName"))) {
			params.put("employeeOperatorName", "%" + (String) params.get("employeeOperatorName") + "%");
		}
		Query query = new Query(params);
		List<InnerOrgEmployeeDO> innerOrgEmployeeList = innerOrgEmployeeService.list(query);
		int total = innerOrgEmployeeService.count(query);
		PageUtils pageUtils = new PageUtils(innerOrgEmployeeList, total);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("inner:innerOrgEmployee:add")
	String add() {
		return "inner/innerOrgEmployee/add";
	}

	// 弹出啦啦啦~
	@GetMapping("/import")
	@RequiresPermissions("inner:innerOrgEmployee:dataImport")
	String importFile() {
		return "inner/innerOrgEmployee/import";
	}
	
	@RequestMapping("/edit_ajax/{employeeId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("employeeId") String employeeId) {
		InnerOrgEmployeeDO employee = innerOrgEmployeeService.get(employeeId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("employee", employee);
		return returnData;
	}
	
	@GetMapping("/edit/{employeeId}")
	@RequiresPermissions("inner:innerOrgEmployee:edit")
	String edit(@PathVariable("employeeId") String employeeId, Model model) {
		model.addAttribute("employeeId", employeeId);
		return "inner/innerOrgEmployee/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("inner:innerOrgEmployee:add")
	public R save(InnerOrgEmployeeDO innerOrgEmployee) {
		innerOrgEmployee.setEmployeeOperator(getUserId());
		String employeeId = innerOrgEmployee.getEmployeeId();
		InnerOrgEmployeeDO employee = innerOrgEmployeeService.get(employeeId);
		if (employee != null){
			return R.error("员工工号已存在");
		}
		int employeeIds = innerOrgEmployeeService.save(innerOrgEmployee);
		if (employeeIds > 0) {
			R r = R.ok();
			r.put("employeeId", employeeIds);
			return r;
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("inner:innerOrgEmployee:edit")
	public R update(InnerOrgEmployeeDO innerOrgEmployee) {
		innerOrgEmployee.setEmployeeOperator(getUserId());
		innerOrgEmployeeService.update(innerOrgEmployee);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("inner:innerOrgEmployee:remove")
	public R remove(String employeeId) {
		if (innerOrgEmployeeService.remove(employeeId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("inner:innerOrgEmployee:batchRemove")
	public R remove(@RequestParam("ids[]") String[] employeeIds) {
		innerOrgEmployeeService.batchRemove(employeeIds);
		return R.ok();
	}

	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = innerOrgEmployeeService.listDic();
		return dictList;
	}

	/**
	 * 导入文件
	 */
	@ResponseBody
	@PostMapping("/dataImport")
	R upload2(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		fileName = FileUtil.renameToUUID(fileName);
		File datafile = null;
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
			datafile = new File(bootdoConfig.getUploadPath() + fileName);
		} catch (Exception e) {
			return R.error();
		}
		long userid = getUserId(); // log数据保存 用户id
		innerOrgEmployeeService.dataImport(datafile, userid);
		return null;
	}
		
	/**
	 * export file
	 * 小平之作
	 * 优雅不要污~
	 */
	@RequestMapping(value = "/export")
	public @ResponseBody void export(
			@RequestParam(value = "employeeId", required = false) String InnerOrgEmployee_employeeId,
			@RequestParam(value = "employeeName", required = false) String InnerOrgEmployee_employeeName,
			@RequestParam(value = "employeeDept", required = false) String InnerOrgEmployee_employeeDept,
			@RequestParam(value = "employeeOperatorName", required = false) String InnerOrgEmployee_employeeOperatorName,
			HttpServletResponse response, HttpServletRequest employeeOperator) throws ParseException {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("employeeId", InnerOrgEmployee_employeeId);
		params.put("employeeName", (InnerOrgEmployee_employeeName != null && !"".equals(InnerOrgEmployee_employeeName))?"%"+InnerOrgEmployee_employeeName+"%" : InnerOrgEmployee_employeeName);
		params.put("employeeDept", (InnerOrgEmployee_employeeDept != null && !"".equals(InnerOrgEmployee_employeeDept))?"%"+InnerOrgEmployee_employeeDept+"%" : InnerOrgEmployee_employeeDept);
		params.put("employeeOperatorName", (InnerOrgEmployee_employeeOperatorName != null && !"".equals(InnerOrgEmployee_employeeOperatorName))?"%"+InnerOrgEmployee_employeeOperatorName+"%" : InnerOrgEmployee_employeeOperatorName);
		List<InnerOrgEmployeeDO> list = innerOrgEmployeeService.getQuery(params);
		if (list.size() > 0) {
			System.out.println("---------------------list.size------------------->" + list.size());
			response.setContentType("application/binary;charset=UTF-8");
			try {
				ServletOutputStream out = response.getOutputStream();
				String fileName = new String((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()).getBytes(),"UTF-8");
				response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
				String[] titles = { "员工工号", "部门编号", "岗位编号", "内部账号ID", "用户级别", "模块ID", "员工姓名", "部门", "所属中心", "入职时间","时薪", "员工状态", "电话", "电话小号", "QQ", "备注", "操作人姓名", "操作时间" };
				innerOrgEmployeeService.export(titles, out, list);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
}
