package com.bootdo.sales.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.service.MainCopyPersonService;
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
import org.springframework.web.multipart.MultipartFile;

import com.bootdo.sales.domain.SalesProjectDO;
import com.bootdo.sales.service.SalesProjectService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.service.FileService;

/**
 * 售前项目信息表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-16 11:25:36
 */

@Controller
@RequestMapping("/sales/salesProject")
public class SalesProjectController extends BaseController {
	@Autowired
	private FileService sysFileService;
	@Autowired
	private SalesProjectService salesProjectService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;

	@GetMapping()
	@RequiresPermissions("sales:salesProject:salesProject")
	String SalesProject() {
		return "sales/salesProject/salesProject";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sales:salesProject:salesProject")
	public PageUtils list(@RequestParam Map<String, Object> params,HttpServletRequest request) {
		// 查询列表数据
		params.put("projectOperator", (Long.toString(getUserId())));
		params.put("Identification", (getIdentification()));
		params.put("userName", (getUsername()));

		// 排序方式
		String orders = request.getParameter("sortOrder");
		params.put("order", orders);
		// 排序字段
		String sortnames = request.getParameter("sortName");
		params.put("sort", sortnames);

		Query query = new Query(params);
		List<SalesProjectDO> salesProjectList = salesProjectService.list(query);
		int total = salesProjectService.count(query);
		PageUtils pageUtils = new PageUtils(salesProjectList, total);
		return pageUtils;
	}

	@ResponseBody
	@GetMapping("/listAllProject")
	@RequiresPermissions("sales:salesProject:salesProject")
	public PageUtils listAllProject(@RequestParam Map<String, Object> params,HttpServletRequest request) {

		Query query = new Query(params);
		List<SalesProjectDO> salesProjectList = salesProjectService.listAllProject(query);
		int total = salesProjectService.countAllProject(query);
		PageUtils pageUtils = new PageUtils(salesProjectList, total);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("sales:salesProject:add")
	String add() {
		return "sales/salesProject/add";
	}

	@GetMapping("/import")
	@RequiresPermissions("sales:salesProject:uploadExcel")
	String importFile() {
		return "sales/salesProject/import";
	}

	@RequestMapping("/edit_ajax/{projectId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("projectId") String projectId) {
		SalesProjectDO salesProject = salesProjectService.get(projectId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("salesProject", salesProject);
		return returnData;
	}

	@GetMapping("/edit/{projectId}")
	@RequiresPermissions("sales:salesProject:edit")
	String edit(@PathVariable("projectId") String projectId, Model model) {
		// SalesProjectDO salesProject = salesProjectService.get(projectId);
		model.addAttribute("projectId", projectId);
		return "sales/salesProject/edit";
	}

	/**
	 * 查看
	 */
	@GetMapping("/see/{projectId}")
	@RequiresPermissions("sales:salesProject:see")
	String see(@PathVariable("projectId") String projectId, Model model) {
		model.addAttribute("projectId", projectId);
		return "sales/salesProject/see";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sales:salesProject:add")
	public R save(SalesProjectDO salesProject) {
		salesProject.setProjectCreator(getUserId());
		salesProject.setProjectOperator(Long.toString(getUserId()));
		String projectIds = salesProjectService.getProjectId(salesProject);
		salesProject.setProjectId(projectIds);
		salesProjectService.save(salesProject);

		if (!projectIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = salesProject.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");
				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(projectIds);
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("pre_sales_project");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = salesProject.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(projectIds);
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("pre_sales_project");
					mainCopyPersonService.save(mcp);
				}
			}
			R r = R.ok();
			r.put("projectId", projectIds);
			return r;
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sales:salesProject:edit")
	public R update(SalesProjectDO salesProject) {
		salesProject.setProjectOperator(Long.toString(getUserId()));
		String projectIds = salesProject.getProjectId();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset", 1);
		params.put("limit", 2);
		params.put("tId", projectIds);
		params.put("tableName", "pre_sales_project");
		salesProjectService.update(salesProject);
		mainCopyPersonService.remove(params);
		if (!projectIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = salesProject.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");

				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(salesProject.getProjectId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("pre_sales_project");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = salesProject.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				int result = 0;
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(salesProject.getProjectId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("pre_sales_project");
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
	@RequiresPermissions("sales:salesProject:remove")
	public R remove(String projectId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset", 1);
		params.put("limit", 2);
		params.put("tId", projectId);
		params.put("tableName", "pre_sales_project");
		if (salesProjectService.remove(projectId) > 0) {
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
	@RequiresPermissions("sales:salesProject:batchRemove")
	public R remove(@RequestParam("ids[]") String[] projectIds) {
		salesProjectService.batchRemove(projectIds);
		return R.ok();
	}

	@ResponseBody
	@GetMapping("/listAllDic")
	public List<DictDO> listAllByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = salesProjectService.listAllDic();
		return dictList;
	}

	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = salesProjectService.listDic();
		return dictList;
	}

	/**
	 * Excel导入
	 * 
	 * @param file
	 * @param request
	 * @return
	 */
	@ResponseBody
	@PostMapping("/uploadExcel")
	R uploadExcel(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		fileName = FileUtil.renameToUUID(fileName);
		File datafile = null;
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
			datafile = new File(bootdoConfig.getUploadPath() + fileName);

			// log数据保存
			long userid = getUserId(); // 用户id
			
			Map<String, Object> errorMsgs=salesProjectService.uploadExcel(datafile, userid);
			if ("success".equals(errorMsgs.get("result"))) {
				return R.ok();
			} else {
				return R.error();
			}
		} catch (Exception e) {
			return R.error();
		}
	}

	/**
	 * 导出
	 */
	@RequestMapping(value = "/export")
	public @ResponseBody void export(@RequestParam(value = "province", required = false) String province,
			@RequestParam(value = "city", required = false) String city,
			@RequestParam(value = "area", required = false) String area,
			@RequestParam(value = "projectId", required = false) String export_projectId,
			@RequestParam(value = "projectSales", required = false) String export_projectSales,
			HttpServletResponse response, HttpServletRequest request) throws ParseException {

		// String administrative1=request.getParameter(administrative);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		/*
		 * Date data; Date date; String endtime = null; String starttime = null; if
		 * (startTime != null && startTime != "") { try { Calendar calendar = new
		 * GregorianCalendar(); date = sdf.parse(String.valueOf(startTime));
		 * calendar.setTime(date); calendar.add(calendar.DATE, -1); date =
		 * calendar.getTime(); starttime = sdf.format(date); } catch (ParseException e)
		 * { e.printStackTrace(); } } if (endTime != null && endTime != "") { try {
		 * Calendar calendar = new GregorianCalendar(); data =
		 * sdf.parse(String.valueOf(endTime)); calendar.setTime(data);
		 * calendar.add(calendar.DATE, 1); data = calendar.getTime(); endtime =
		 * sdf.format(data); } catch (ParseException e) { e.printStackTrace(); } }
		 */

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("province", province);
		params.put("city", city);
		params.put("area", area);
		params.put("projectId", export_projectId);
		params.put("projectSales", export_projectSales);
		List<SalesProjectDO> list = salesProjectService.getQuery(params);
		if (list.size() > 0) {
			System.out.println("---------------------list.size------------------->" + list.size());
			response.setContentType("application/binary;charset=UTF-8");
			try {
				ServletOutputStream out = response.getOutputStream();
				String fileName = new String((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()).getBytes(),
						"UTF-8");
				response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
				String[] titles = { "售前项目编号", "企业客户编号", "项目名称", "销售负责人", "项目开始时间", "项目结束时间", "售前经理", "项目类型", "项目阶段",
						"项目描述", "旧项目编号", "备注", "操作人", "操作时间", "创建人", "创建时间", "业务编号" };
				salesProjectService.export(titles, out, list);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	// 模板下载
	@ResponseBody
	@RequestMapping("/downloadTemplate")
	public void download(HttpServletResponse response, HttpServletRequest request) {
		try {

			// File files = new
			// File(".\\src\\main\\resources\\downloadTemplate\\企业客户导入摸板.xls");
			// System.out.println("getAbsolutePath:"+files.getAbsolutePath());
			// //getAbsolutePath()会将.认为是一个以.命名的文件
			// System.out.println("getCanonicalPath:"+files.getCanonicalPath());//getCanonicalPath()得到的是一个规范路径没有.
			//

			File file = new File("./src/main/resources/downloadTemplate/售前项目导入模板.xls");
			// 取得文件名。
			String filename = file.getName();

			// 以流的形式下载文件。
			InputStream fis = new BufferedInputStream(new FileInputStream(file.getCanonicalPath()));
			byte[] buffer = new byte[fis.available()];
			fis.read(buffer);
			fis.close();
			// 清空response
			response.reset();
			// 设置response的Header
			// 设置文件名
			response.addHeader("Content-Disposition",
					"attachment;filename=" + new String(filename.getBytes(), "ISO-8859-1"));
			// 设置文件打下
			response.addHeader("Content-Length", "" + file.length());
			OutputStream toClient = new BufferedOutputStream(response.getOutputStream());
			response.setContentType("application/octet-stream");
			toClient.write(buffer);
			toClient.flush();
			toClient.close();
		} catch (IOException ex) {
			ex.printStackTrace();
		}
	}
}
