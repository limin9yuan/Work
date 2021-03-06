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

import com.bootdo.sales.domain.CompetitorDO;
import com.bootdo.sales.domain.CustomerChildCompanyDo;
import com.bootdo.sales.service.CompetitorService;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.FileDO;
import com.bootdo.common.service.FileService;
import com.bootdo.common.utils.FileType;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;

/**
 * 竞争对手信息表
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-12-11 14:31:23
 */
 
@Controller
@RequestMapping("/sales/competitor")
public class CompetitorController extends BaseController{
	@Autowired
	private CompetitorService competitorService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	private FileService sysFileService;
	@GetMapping()
	@RequiresPermissions("sales:competitor:competitor")
	String Competitor(){
	    return "sales/companyCustomer/competitor";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sales:competitor:competitor")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<CompetitorDO> competitorList = competitorService.list(query);
		int total = competitorService.count(query);
		PageUtils pageUtils = new PageUtils(competitorList, total);
		return pageUtils;
	}
	
	@GetMapping("/add/{customerId}")
	@RequiresPermissions("sales:competitor:add")
	String add(@PathVariable("customerId") String customerId,Model model){
		model.addAttribute("customerId", customerId);
	    return "sales/companyCustomer/addCompe";
	}

	@GetMapping("/edit/{complaintId}")
	@RequiresPermissions("sales:competitor:edit")
	String edit(@PathVariable("complaintId") String complaintId,Model model){
		CompetitorDO competitor = competitorService.get(complaintId);
		model.addAttribute("competitor", competitor);
	    return "sales/companyCustomer/editCompe";
	}
	//ajax修改绑定数据
			@RequestMapping("/edit_ajax/{complaintId}")
			@ResponseBody
			Map<String, Object> edit_ajax(@PathVariable("complaintId") String complaintId) {
				CompetitorDO competitor = competitorService.get(complaintId);
				Map<String, Object> returnData = new HashMap<String, Object>();
				returnData.put("competitor", competitor);
				return returnData;
			}
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sales:competitor:add")
	public R save( CompetitorDO competitor){
		competitor.setComplaintOperator(Long.toString(getUserId()));
		if(competitorService.save(competitor)>0){
			return R.ok();
		}
		return R.error();
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sales:competitor:edit")
	public R update( CompetitorDO competitor){
		competitorService.update(competitor);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("sales:competitor:batchRemove")
	public R remove( String complaintId){
		if(competitorService.remove(complaintId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("sales:competitor:batchRemove")
	public R remove(@RequestParam("ids[]") String[] complaintIds){
		competitorService.batchRemove(complaintIds);
		return R.ok();
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
		fileName = FileUtil.renameToUUID(fileName);
		FileDO sysFile = new FileDO(FileType.fileType(fileName), "/files/" + fileName, new Date(),fileName);
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
		competitorService.dataImport(datafile, userid);
		return null;
	}
	
}
