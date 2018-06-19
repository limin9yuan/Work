package com.bootdo.sales.controller;

import java.io.File;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.bootdo.sales.domain.CompanyCustomerDO;
import com.bootdo.sales.domain.RecordServiceDO;
import com.bootdo.sales.service.RecordServiceService;

//import javafx.scene.control.Alert;

import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.domain.FileDO;
import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.service.FileService;
import com.bootdo.common.service.MainCopyPersonService;
import com.bootdo.common.utils.FileType;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 客服记录信息表
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-11-28 09:25:19
 */
@Controller
@RequestMapping("/sales/recordService")
public class RecordServiceController extends BaseController {
	@Autowired
	private FileService sysFileService;
	@Autowired
	private RecordServiceService recordServiceService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;

	@GetMapping()
	@RequiresPermissions("sales:recordService:recordService")
	String RecordService() {
		return "sales/recordService/recordService";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sales:recordService:recordService")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		params.put("serviceRecorder", getUserId());
		params.put("Identification", (getIdentification()));
		params.put("userName", (getUsername()));
		if (params.get("deliveryContent") != null && params.get("deliveryContent") != "") {
			params.put("deliveryContent", "%" + params.get("deliveryContent") + "%");
		}
		if (params.get("timeMin") != null && params.get("timeMin") != "") {
			params.put("timeMin", params.get("timeMin") + " 00:00:00");
		}
		if (params.get("timeMax") != null && params.get("timeMax") != "") {
			params.put("timeMax", params.get("timeMax") + " 23:59:59");
		}
		if (params.get("saleEmployee") != null && params.get("saleEmployee") != "") {
			params.put("saleEmployee", "%" + params.get("saleEmployee") + "%");
		}
		if (params.get("saleManager") != null && params.get("saleManager") != "") {
			params.put("saleManager", "%" + params.get("saleManager") + "%");
		}
		if (params.get("customerPhoneNumber") != null && params.get("customerPhoneNumber") != "") {
			params.put("customerPhoneNumber", "%" + params.get("customerPhoneNumber") + "%");
		}
		if (params.get("serverName") != null && params.get("serverName") != "") {
			params.put("serverName", "%" + params.get("serverName") + "%");
		}
		Query query = new Query(params);
		List<RecordServiceDO> recordServiceList = recordServiceService.list(query);
		int total = recordServiceService.count(query);
		PageUtils pageUtils = new PageUtils(recordServiceList, total);
		return pageUtils;
	}

	@GetMapping("/add")
	@RequiresPermissions("sales:recordService:add")
	String add() {
		return "sales/recordService/add";
	}

	@GetMapping("/import")
	@RequiresPermissions("sales:recordService:dataImport")
	String importFile() {
		return "sales/recordService/import";
	}

	// edit数据绑定
	@RequestMapping("/edit_ajax/{serviceId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("serviceId") String serviceId) {
		RecordServiceDO service = recordServiceService.get(serviceId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("service", service);
		return returnData;
	}

	@GetMapping("/edit/{serviceId}")
	@RequiresPermissions("sales:recordService:edit")
	String edit(@PathVariable("serviceId") String serviceId, Model model) {
		model.addAttribute("serviceId", serviceId);
		return "sales/recordService/edit";
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sales:recordService:add")
	public R save(RecordServiceDO recordService) {
		recordService.setServiceRecorder(getUserId());
		int serviceIds = recordServiceService.save(recordService);
		if (serviceIds > 0) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = recordService.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");
				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(recordService.getServiceId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_record_service");
					mainCopyPersonService.save(mcp);

				}
			}
			String copyPersonId = recordService.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(recordService.getServiceId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_record_service");
					mainCopyPersonService.save(mcp);
				}

			}
			R r = R.ok();
			r.put("serviceId", serviceIds);
			return r;
		}
		return R.error();
	}

	/**
	 * 查看信息
	 */
	@GetMapping("/examine/{serviceId}")
	@RequiresPermissions("sales:recordService:recordService")
	String examine(@PathVariable("serviceId") String serviceId, Model model) {
		model.addAttribute("serviceId", serviceId);
		return "/sales/recordService/examineRecordService";
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sales:recordService:edit")
	public R update(RecordServiceDO recordService) {
		String serviceIds = recordService.getServiceId();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset", 1);
		params.put("limit", 2);
		params.put("tId", serviceIds);
		params.put("tableName", "sales_record_service");
		recordService.setServiceRecorder(getUserId());
		recordServiceService.update(recordService);
		mainCopyPersonService.remove(params);
		if (!serviceIds.equals("")) {
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = recordService.getMainPersonId();
			if (!"".equals(mainPersonId)) {
				String mainPersonIdArray[] = mainPersonId.split(",");

				for (int i = 0; i < mainPersonIdArray.length; i++) {
					mcp.setTId(recordService.getServiceId());
					mcp.setMainPerson(1);
					mcp.setEmployeeId(mainPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_record_service");
					mainCopyPersonService.save(mcp);

				}
			}

			String copyPersonId = recordService.getCopyPersonId();
			if (!"".equals(copyPersonId)) {
				String copyPersonIdArray[] = copyPersonId.split(",");
				int result = 0;
				for (int i = 0; i < copyPersonIdArray.length; i++) {
					mcp.setTId(recordService.getServiceId());
					mcp.setMainPerson(0);
					mcp.setEmployeeId(copyPersonIdArray[i]);
					mcp.setOperator(getUserId());
					mcp.setTableName("sales_record_service");
					mainCopyPersonService.save(mcp);

				}
			}

		}
		return R.ok();
	}
	/**
	 * 执行删除文件的时候同时删除Customer_Attachment字段下的附件ID
	 */
//	@ResponseBody
//	@RequestMapping("/updateRecordAttachment")
//	@RequiresPermissions("sales:recordService:edit")
//	public R updateRecordAttachment(RecordServiceDO recordService) {
//		recordServiceService.updateRecordAttachment(recordService);
//		return R.ok();
//	}
	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("sales:recordService:remove")
	public R remove(String serviceId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("offset", 1);
		params.put("limit", 2);
		params.put("tId", serviceId);
		params.put("tableName", "sales_record_service");
		if (recordServiceService.remove(serviceId) > 0) {
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
	@RequiresPermissions("sales:recordService:batchRemove")
	public R remove(@RequestParam("ids[]") String[] serviceIds) {
		recordServiceService.batchRemove(serviceIds);
		return R.ok();
	}

	/**
	 * 查询列表数据
	 */
	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = recordServiceService.listDic();
		return dictList;
	}

	@ResponseBody
	@GetMapping("/listDicxmbh")
	public List<DictDO> listByType1() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = recordServiceService.listDicxmbh();
		return dictList;
	}

	// 根据ID查看附件列表
	@ResponseBody
	@GetMapping("/listRecordAttachment")
	@RequiresPermissions("common:sysFile:sysFile")
	public PageUtils listRecordAttachment(@RequestParam("recordId") String recordId, @RequestParam Map<String, Object> params) {
		// String aa=request.getParameter("customerId");
		params.put("recordId", recordId);
		System.out.println(recordId);
		// 查询列表数据
		Query query = new Query(params);
		List<FileDO> sysFileList = sysFileService.listRecordAttachment(query);
		int total = sysFileService.countRecordAttachment(query);
		PageUtils pageUtils = new PageUtils(sysFileList, total);
		return pageUtils;
	}

	/**
	 * 上传文件
	 * 
	 * @param file
	 * @param request
	 * @return
	 */
	@ResponseBody
	@PostMapping("/upload")
	R upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		// fileName = FileUtil.renameToUUID(fileName);
		FileDO sysFile = new FileDO(FileType.fileType(fileName), "/files/" + fileName, new Date(),fileName);
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
		} catch (Exception e) {
			return R.error();
		}
		int ids = sysFileService.save(sysFile);
		System.out.println(ids);
		if (ids > 0) {
			R r = R.ok();
			r.put("recordAttachment", ids);
			r.put("fileName", sysFile.getUrl());
			return r;
//			return R.ok().put("fileName", sysFile.getUrl());
		}
		return R.error();
	}

	/**
	 * 导入文件
	 */
	@ResponseBody
	@PostMapping("/dataImport")
	R upload2(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		// fileName = FileUtil.renameToUUID(fileName);
		File datafile = null;
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
			datafile = new File(bootdoConfig.getUploadPath() + fileName);
		} catch (Exception e) {
			return R.error();
		}
		long userid = getUserId(); // log数据保存 用户id
		recordServiceService.dataImport(datafile, userid);
		return null;
	}
}
