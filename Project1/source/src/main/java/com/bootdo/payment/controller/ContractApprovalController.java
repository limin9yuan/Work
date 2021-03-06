package com.bootdo.payment.controller;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.File;
import java.lang.reflect.Array;
import java.util.*;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.zip.ZipOutputStream;

import javax.servlet.http.HttpServletResponse;

import com.bootdo.activiti.service.ActTaskService;
import com.bootdo.common.utils.*;
import com.bootdo.contract.domain.ContractDO;
import org.activiti.engine.task.Task;
import org.activiti.engine.TaskService;
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

import com.bootdo.payment.domain.ContractApprovalDO;
import com.bootdo.payment.service.ContractApprovalService;
import com.bootdo.sales.domain.CompanyCustomerDO;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.domain.FileDO;
import com.bootdo.common.service.FileService;
import org.springframework.web.servlet.ModelAndView;

/**
 * 合同审批 
 * 
 * @小平
 * @email 1992lcg@163.com
 * @date 2018-1-29
 */

@Controller
@RequestMapping("/payment/contractApproval")
public class ContractApprovalController extends BaseController {
	@Autowired
	private ContractApprovalService contractApprovalService;
	@Autowired
	private FileService sysFileService;
	@Autowired
	private BootdoConfig bootdoConfig;
	@Autowired
	private TaskService taskService;
	@Autowired
	private ActTaskService actTaskService;

	@GetMapping()
	@RequiresPermissions("payment:contractApproval:contractApproval")
	String Contract() {
		return "payment/contractApproval/contractApproval";
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("payment:contractApproval:contractApproval")
	public PageUtils list(@RequestParam Map<String, Object> params) {
		// 查询列表数据
		params.put("contractOperator", (getUserId()));
		params.put("Identification", (getIdentification()));
		if (params.get("contractName") != null && !"".equals(params.get("contractName"))) {
			params.put("contractName", "%" + (String) params.get("contractName") + "%");
		}

		Query query = new Query(params);
		List<ContractApprovalDO> contractApprovalList = (List<ContractApprovalDO>) contractApprovalService.list(query);
		Task task = null;
		for (ContractApprovalDO contractApproval : contractApprovalList){
			if (contractApproval.getContractApprovalStatus().equals("0")){
				task = taskService.createTaskQuery().processDefinitionKey("contract").taskAssignee(ShiroUtils.getUser()
						.getUsername()).processInstanceBusinessKey(String.valueOf(contractApproval.getContractId())).singleResult();
				if (task != null){
					contractApproval.setTaskId(task.getId());
					contractApproval.setPdId(task.getProcessDefinitionId());
				}
			}
			if (contractApproval.getContractApprovalStatus().equals("2")){
				task = taskService.createTaskQuery().processDefinitionKey("contract").taskAssignee(ShiroUtils.getUser()
						.getUsername()).processInstanceBusinessKey(String.valueOf(contractApproval.getContractId())).singleResult();
				if (task != null){
					contractApproval.setTaskId(task.getId());
					contractApproval.setPdId(task.getProcessDefinitionId());
				}
			}
		}
		int total = contractApprovalService.count(query);
		PageUtils pageUtils = new PageUtils(contractApprovalList, total);
		return pageUtils;
	}
	@ResponseBody
	@GetMapping("/listApproval")
	@RequiresPermissions("payment:contractApproval:contractApproval")
	public PageUtils listApproval(@RequestParam Map<String, Object> params) {
		PageUtils pageUtils=null;

		if (params.get("contractIds") != null && !"".equals(params.get("contractIds"))) {
			Object ob=params.get("contractIds");
			String contractIds = String.valueOf(ob).replace(" ", "");

			params.put("contractIds", "," +contractIds + ",");
		}
		// 查询列表数据
		Query query = new Query(params);
		List<ContractApprovalDO> contractApprovalList = contractApprovalService.list(query);
		int total = contractApprovalService.count(query);
		pageUtils = new PageUtils(contractApprovalList, total);
		return pageUtils;

	}

	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = contractApprovalService.listDic();
		return dictList;
	}
	
	@GetMapping("/approval/{procDefIds[]}/{taskIds[]}/{contractIds[]}/{processInstanceIds[]}")
	@RequiresPermissions("payment:contractApproval:approval")
	ModelAndView add(@PathVariable("procDefIds[]") String[] procDefIds,
						  @PathVariable("taskIds[]") String[] taskIds,
						  @PathVariable("contractIds[]") String[] contractIds,
						  @PathVariable("processInstanceIds[]") String[] processInstanceIds ,Model model) {
		String formKey="";
		model.addAttribute("taskId", Arrays.toString(taskIds).replace("[","").replace("]",""));
		model.addAttribute("formSubmit", formKey+"/update");//流程审批处理保存
		model.addAttribute("processDefinitionId", Arrays.toString(procDefIds).replace("[","").replace("]",""));
		model.addAttribute("contractId", Arrays.toString(contractIds).replace("[","").replace("]",""));
		model.addAttribute("processInstanceId", Arrays.toString(processInstanceIds).replace("[","").replace("]",""));
		return new ModelAndView("act/task/formCommApprovalAll");

	}

	@GetMapping("/import")
	@RequiresPermissions("payment:contractApproval:dataImport")
	String importFile() {
		return "payment/contractApproval/import";
	}

	@GetMapping("/edit/{procDefId}/{taskId}")
	@RequiresPermissions("payment:contractApproval:edit")
	ModelAndView edit(@PathVariable("procDefId") String procDefId,@PathVariable("taskId") String taskId, Model model) {
		String formKey="";
		if ( procDefId != null && !"".equals(procDefId) && taskId != null && !"".equals(taskId))
		{
			formKey = actTaskService.getFormKey(procDefId, taskId);//获取流程表单
			model.addAttribute("taskId", taskId);
			model.addAttribute("formSrc", formKey+"/"+taskId);
			model.addAttribute("formSubmit", formKey+"/update");//流程审批处理保存
			Task task = taskService.createTaskQuery().taskId(taskId).singleResult();//根据任务id查询实例id
			model.addAttribute("taskName", task.getName());
			model.addAttribute("processDefinitionId", task.getProcessDefinitionId());
			model.addAttribute("executionId", task.getExecutionId());
			model.addAttribute("processInstanceId", task.getProcessInstanceId());
			return new ModelAndView("act/task/formComm");
		}
		return new ModelAndView("act/task/formComm");
	}

	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("payment:contractApproval:add")
	public R save(ContractApprovalDO contractApproval) {
		contractApproval.setContractOperator(String.valueOf(getUserId()));
		if (contractApprovalService.save(contractApproval) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("payment:contractApproval:edit")
	public R update(ContractApprovalDO contractApproval) {
		contractApproval.setContractOperator(String.valueOf(getUserId()));
		contractApprovalService.update(contractApproval);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping("/remove")
	@ResponseBody
	@RequiresPermissions("payment:contractApproval:remove")
	public R remove(String contractId) {
		if (contractApprovalService.remove(contractId) > 0) {
			return R.ok();
		}
		return R.error();
	}

	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("payment:contractApproval:batchRemove")
	public R remove(@RequestParam("ids[]") String[] contractIds) {
		contractApprovalService.batchRemove(contractIds);
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
		
//		String chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
//		chars.charAt((int)(Math.random() * 52))+
		String fileName = file.getOriginalFilename();
//		fileName = FileUtil.renameToUUID(fileName);
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
			r.put("contractAttachment", ids);
			r.put("fileName", sysFile.getUrl());
			return r;
//			return R.ok().put("fileName", sysFile.getUrl());
		}
		return R.error();
	}
	/**
	 * 执行删除文件的时候同时删除Customer_Attachment字段下的附件ID
	 */
	@ResponseBody
	@RequestMapping("/updateContractAttachment")
	@RequiresPermissions("payment:contractApproval:edit")
	public R updateContractAttachment(ContractApprovalDO contractApproval) {
		contractApprovalService.updateContractAttachment(contractApproval);
		return R.ok();
	}
	//根据ID查看附件列表
			@ResponseBody
			@GetMapping("/listId")
			@RequiresPermissions("common:sysFile:sysFile")
			public PageUtils listId(@RequestParam("contractId")String contractId,@RequestParam Map<String, Object> params) {
//				String aa=request.getParameter("customerId");
				params.put("contractId", contractId);
				// 查询列表数据
				Query query = new Query(params);
				List<FileDO> sysFileList = sysFileService.listContractAttachment(query);
				int total = sysFileService.listContractAttachmentCount(query);
				PageUtils pageUtils = new PageUtils(sysFileList, total);
				return pageUtils;
			}
 // 根据文件名称下载相关代码
 	@ResponseBody
 	@RequestMapping("/down")
 	public void download(HttpServletResponse response,@RequestParam("fileName") String fileName) {
 		try {
 			// path是指欲下载的文件的路径。
 			String path = "C:/var/uploaded_files/"+fileName;

 			File file = new File(path);
 			// 取得文件名。
 			String filename = file.getName();
 			
 			// 以流的形式下载文件。
 			InputStream fis = new BufferedInputStream(new FileInputStream(path));
 			byte[] buffer = new byte[fis.available()];
 			fis.read(buffer);
 			fis.close();
 			// 清空response
 			response.reset();
 			// 设置response的Header
 			// 设置文件名
 			
 			response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes(),"ISO-8859-1"));
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
 	
 	
 	
 	
 	  /**
     * 打包压缩下载文件
     */
    @RequestMapping(value = "/downLoadZipFile")
    @ResponseBody
    public void downLoadZipFile(HttpServletResponse response,@RequestParam("id")String id) throws IOException{
    	String[] ids=id.split(",");
        String zipName = "downLoadFile.zip";
        List<FileDO> fileList = sysFileService.downLoadListId(ids);//查询数据库中记录
        response.setContentType("APPLICATION/OCTET-STREAM");  
        response.setHeader("Content-Disposition","attachment; filename="+zipName);
        ZipOutputStream out = new ZipOutputStream(response.getOutputStream());
        try {
            for(Iterator<FileDO> it = fileList.iterator();it.hasNext();){
            	FileDO file = it.next();
                ZipUtils.doCompress("C:/var/uploaded_files/"+file.getFileName(), out);
                response.flushBuffer();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }finally{
            out.close();
        }
    }
 	
	/**
	 * 导入文件
	 */
	@ResponseBody
	@PostMapping("/dataImport")
	R dataImport(@RequestParam("file") MultipartFile file, HttpServletRequest request) {
		String fileName = file.getOriginalFilename();
		fileName = FileUtil.renameToUUID(fileName);
		File datafile = null;
		try {
			FileUtil.uploadFile(file.getBytes(), bootdoConfig.getUploadPath(), fileName);
			datafile = new File(bootdoConfig.getUploadPath() + fileName);
			long userid = getUserId(); // log数据保存 用户id
			
			
			Map<String, Object> errorMsgs=contractApprovalService.dataImport(datafile, userid);
			if ("success".equals(errorMsgs.get("result"))) {
				return R.ok();
			} else {
				return R.error();
			}
		} catch (Exception e) {
			return R.error();
		}
	}
	
	 //模板下载
    @ResponseBody
 	@RequestMapping("/downloadTemplate")
    public void download(HttpServletResponse response,HttpServletRequest request) {
 		try {
 			
// 			 File files = new File(".\\src\\main\\resources\\downloadTemplate\\企业客户导入摸板.xls");
// 			System.out.println("getAbsolutePath:"+files.getAbsolutePath());  //getAbsolutePath()会将.认为是一个以.命名的文件
// 			System.out.println("getCanonicalPath:"+files.getCanonicalPath());//getCanonicalPath()得到的是一个规范路径没有.
// 			

 			File file = new File("./src/main/resources/downloadTemplate/合同审批导入模板.xlsx");
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
 			response.addHeader("Content-Disposition", "attachment;filename=" + new String(filename.getBytes(),"ISO-8859-1"));
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
