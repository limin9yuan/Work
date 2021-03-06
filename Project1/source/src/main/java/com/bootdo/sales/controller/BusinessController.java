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
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletResponse;

import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.service.MainCopyPersonService;
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
import org.springframework.web.multipart.MultipartFile;

import com.bootdo.sales.domain.BusinessDO;
import com.bootdo.sales.service.BusinessService;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 业务信息表
 * 
 * @author xp
 * @email 1992lcg@163.com
 * @date 2017-11-21 17:28:12
 */

@Controller
@RequestMapping("/sales/business")
public class BusinessController extends BaseController {
	@Autowired
	private BusinessService businessService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;

	@GetMapping()
	@RequiresPermissions("sales:business:business")
	String Business() {
		return "sales/business/business";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sales:business:business")
	public PageUtils list(@RequestParam Map<String, Object> params, HttpServletRequest request) {
		// 查询列表数据
		params.put("businessOperator", (Long.toString(getUserId())));
		params.put("userName", (getUsername()));
		params.put("Identification", (getIdentification()));

		// 排序方式
		String orders = request.getParameter("sortOrder");
		params.put("order", orders);
		// 排序字段
		String sortnames = request.getParameter("sortName");
		params.put("sort", sortnames);

		Query query = new Query(params);
		List<BusinessDO> businessList = businessService.list(query);
		int total = businessService.count(query);
		PageUtils pageUtils = new PageUtils(businessList, total);
		return pageUtils;
	}

	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = businessService.listDic();
		return dictList;
	}

	@ResponseBody
	@GetMapping("/listDicSale")
	public List<DictDO> listByType1() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = businessService.listDic();
		return dictList;
	}

	@GetMapping("/add")
	@RequiresPermissions("sales:business:add")
	String add() {
		return "sales/business/add";
	}

	@GetMapping("/import")
	@RequiresPermissions("sales:business:dataImport")
	String importFile() {
		return "sales/business/import";
	}

	@RequestMapping("/edit_ajax/{businessId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("businessId") String businessId) {
		BusinessDO business = businessService.get(businessId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("business", business);
		return returnData;
	}

	@GetMapping("/edit/{businessId}")
	@RequiresPermissions("sales:business:edit")
	String edit(@PathVariable("businessId") String businessId, Model model) {
		model.addAttribute("businessId", businessId);
		return "sales/business/edit";
	}

	/**
	 * 查看业务信息
	 */
	@GetMapping("/examineB/{customerId}")
	@RequiresPermissions("sales:business:business")
	String examineB(@PathVariable("customerId") String customerId, Model model) {
		model.addAttribute("customerId", customerId);

		return "sales/companyCustomer/examineBusiness";
	}

	/**
	 * 查看
	 */
	@GetMapping("/examine/{businessId}")
	@RequiresPermissions("sales:business:examine")
	String examine(@PathVariable("businessId") String businessId, Model model) {
		model.addAttribute("businessId", businessId);
		return "sales/business/examine";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sales:business:add")
	public R save(BusinessDO business) {
		business.setBusinessOperator(Long.toString(getUserId()));
		String businessIds = businessService.getBusinessId(business);
		System.out.println(businessIds);
		business.setBusinessId(businessIds);
		businessService.save(business);
		if (!businessIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = business.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");
				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(businessIds);
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_business");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = business.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(businessIds);
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_business");
					mainCopyPersonService.save(mcp);
				}
			}
			R r = R.ok();
			r.put("businessId", businessIds);
			return r;
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sales:business:edit")
	public R update(BusinessDO business) {
		String businessIds = business.getBusinessId();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset", 1);
		params.put("limit", 2);
		params.put("tId", businessIds);
		params.put("tableName", "sales_business");
		businessService.update(business);
		mainCopyPersonService.remove(params);
		if (!businessIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = business.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");

				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(business.getBusinessId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_business");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = business.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				int result = 0;
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(business.getBusinessId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_business");
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
	@RequiresPermissions("sales:business:remove")
	public R remove(String businessId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset", 1);
		params.put("limit", 2);
		params.put("tId", businessId);
		params.put("tableName", "sales_business");
		if (businessService.remove(businessId) > 0) {
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
	@RequiresPermissions("sales:business:batchRemove")
	public R remove(@RequestParam("ids[]") String[] businessIds) {
		businessService.batchRemove(businessIds);
		return R.ok();
	}

	/**
	 * Import Microsoft Excel file. 导入模板
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

			long userid = getUserId(); // log数据保存 用户id
			
			Map<String, Object> errorMsgs=businessService.dataImport(datafile, userid);
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
	 * Export Microsoft Excel file.
	 */
	@RequestMapping(value = "/export")
	public @ResponseBody void export(
			@RequestParam(value = "businessName", required = false) String Business_businessName,
			@RequestParam(value = "businessSales", required = false) String Business_businessSales,
			HttpServletResponse response, HttpServletRequest request) throws ParseException {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("businessName", Business_businessName);
		params.put("businessSales", Business_businessSales);
		List<BusinessDO> list = businessService.getQuery(params);
		if (list.size() > 0) {
			System.out.println("---------------------list.size------------------->" + list.size());
			response.setContentType("application/binary;charset=UTF-8");
			try {
				ServletOutputStream out = response.getOutputStream();
				String fileName = new String((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()).getBytes(),
						"UTF-8");
				response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
				String[] titles = { "业务编号", "企业客户编号", "联系人编号", "业务名称", "业务类型", "业务状态", "销售负责人姓名", "旧业务编号", "业务描述", "备注",
						"业务修改人", "业务修改时间", "业务创建人", "业务创建人时间" };
				businessService.export(titles, out, list);
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

			File file = new File("./src/main/resources/downloadTemplate/业务管理导入模板.xls");
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
