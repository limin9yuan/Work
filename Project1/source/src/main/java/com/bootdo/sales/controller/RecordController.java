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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.bootdo.sales.domain.RecordDO;
import com.bootdo.sales.domain.SalesProjectDO;
import com.bootdo.sales.service.RecordService;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.config.Constant;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.FileDO;
import com.bootdo.common.service.FileService;
import com.bootdo.common.utils.FileType;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 行动记录信息表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-24 17:21:10
 */
 
@Controller
@RequestMapping("/sales/record")
public class RecordController extends BaseController {
	@Autowired
	private RecordService recordService;
	@Autowired
	private FileService sysFileService;
	@Autowired
	private BootdoConfig bootdoConfig;
	
	@GetMapping()
	@RequiresPermissions("sales:record:record")
	String Record(){
	    return "sales/record/record";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sales:record:record")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
		if (params.get("recordExecutor") != null && !"".equals(params.get("recordExecutor"))) {
			params.put("recordExecutor", "%" + (String) params.get("recordExecutor") + "%");
		}
		if (params.get("projectId") != null && !"".equals(params.get("projectId"))) {
			params.put("projectId", "%" + (String) params.get("projectId") + "%");
		}		
        Query query = new Query(params);
		List<RecordDO> recordList = recordService.list(query);
		int total = recordService.count(query);
		PageUtils pageUtils = new PageUtils(recordList, total);
		return pageUtils;
	}
	
	@GetMapping("/add")
	@RequiresPermissions("sales:record:add")
	String add(){
	    return "sales/record/add";
	}
	
	@GetMapping("/import")
	@RequiresPermissions("sales:record:uploadExcel")
	String importFile() {
		return "sales/record/import";
	}
	@RequestMapping("/edit_ajax/{recordId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("recordId") String recordId) {
		RecordDO record = recordService.get(recordId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("record", record);
		return returnData;
	}
	@GetMapping("/edit/{recordId}")
	@RequiresPermissions("sales:record:edit")
	String edit(@PathVariable("recordId") String recordId,Model model){
		//RecordDO record = recordService.get(recordId);
		model.addAttribute("recordId", recordId);
	    return "sales/record/edit";
	}
	
	/**
	 * 查看
	 */
	@GetMapping("/see/{recordId}")
	@RequiresPermissions("sales:record:see")
	String see(@PathVariable("recordId") String recordId, Model model) {
		model.addAttribute("recordId", recordId);
		return "sales/record/see";
	}
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sales:record:add")
	public R save( RecordDO record){
		if (Constant.DEMO_ACCOUNT.equals(getUsername())) {
			return R.error(1, "演示系统不允许修改,完整体验请部署程序");
		}
		record.setRecordCreator(getUserId());
		record.setRecordOperator(getUserId());
		if(recordService.save(record)>0){
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sales:record:edit")
	public R update( RecordDO record){
		record.setRecordOperator(getUserId());
		recordService.update(record);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("sales:record:remove")
	public R remove( String recordId){
		if(recordService.remove(recordId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("sales:record:batchRemove")
	public R remove(@RequestParam("ids[]") String[] recordIds){
		recordService.batchRemove(recordIds);
		return R.ok();
	}
	/**
	 * 上传文件
	 * @param file
	 * @param request
	 * @return
	 */
	@ResponseBody
	@PostMapping("/upload")
	R upload(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		fileName = FileUtil.renameToUUID(fileName);
		FileDO sysFile = new FileDO(FileType.fileType(fileName), "/files/" + fileName, new Date());
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
		} catch (Exception e) {
			return R.error();
		}
		if (sysFileService.save(sysFile) > 0) {
			return R.ok().put("fileName", sysFile.getUrl());
		}
		return null;
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
	R  uploadExcel(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		fileName = FileUtil.renameToUUID(fileName);
		File datafile = null;
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
			datafile = new File( bootdoConfig.getUploadPath()+fileName);
		} catch (Exception e) {
			return R.error();
		}
			// log数据保存
			long userid = getUserId(); // 用户id
			recordService.uploadExcel(datafile, userid);
		
		return null;
	}
}