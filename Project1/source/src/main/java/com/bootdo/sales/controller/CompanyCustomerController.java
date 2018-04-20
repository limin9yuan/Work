package com.bootdo.sales.controller;

import java.io.File;
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

import com.bootdo.sales.domain.CompanyCustomerDO;
import com.bootdo.sales.service.CompanyCustomerService;
import com.bootdo.common.config.BootdoConfig;
import com.bootdo.common.controller.BaseController;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.domain.FileDO;
import com.bootdo.common.service.FileService;
import com.bootdo.common.utils.FileType;
import com.bootdo.common.utils.FileUtil;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;


/**
 * 企业客户信息表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-16 11:25:16
 */
 
@Controller
@RequestMapping("/sales/companyCustomer")
public class CompanyCustomerController  extends BaseController {
	@Autowired
	private CompanyCustomerService companyCustomerService;
	@Autowired
	private MainCopyPersonService mainCopyPersonService;
	@Autowired
	private FileService sysFileService;   
	@Autowired
	private BootdoConfig bootdoConfig;
	
	@GetMapping()
	@RequiresPermissions("sales:companyCustomer:companyCustomer")
	String CompanyCustomer(){
	    return "sales/companyCustomer/companyCustomer";
	}
	
	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("sales:companyCustomer:companyCustomer")
	public PageUtils list(@RequestParam Map<String, Object> params){
		//查询列表数据
        Query query = new Query(params);
		List<CompanyCustomerDO> companyCustomerList = companyCustomerService.list(query);
		int total = companyCustomerService.count(query);
		PageUtils pageUtils = new PageUtils(companyCustomerList, total);
		return pageUtils;
	}
	//ajax修改绑定数据
	@RequestMapping("/edit_ajax/{customerId}")
	@ResponseBody
	Map<String, Object> edit_ajax(@PathVariable("customerId") String customerId) {
		CompanyCustomerDO companyCustomer = companyCustomerService.get(customerId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("companyCustomer", companyCustomer);
		return returnData;
	}
	
	
	@GetMapping("/add")
	@RequiresPermissions("sales:companyCustomer:add")
	String add(){
	    return "sales/companyCustomer/add";
	}









	@GetMapping("/import")
	@RequiresPermissions("sales:companyCustomer:import")
	String importFile() {
		return "sales/companyCustomer/import";
	}
	//@GetMapping("/export")
	//@RequiresPermissions("sales:companyCustomer:export")
	//String exportFile() {
		//return "sales/companyCustomer/import";
	//}
	@GetMapping("/edit/{customerId}")
	@RequiresPermissions("sales:companyCustomer:edit")
	String edit(@PathVariable("customerId") String customerId,Model model){
//		CompanyCustomerDO companyCustomer = companyCustomerService.get(customerId);
		model.addAttribute("customerId", customerId);
	    return "sales/companyCustomer/edit";
	}
	
//	/**
//	 * 查看联系人信息
//	 */
//	@GetMapping("/examine/{customerId}")
//	@RequiresPermissions("sales:companyCustomer:examine")
//	String examine(@PathVariable("customerId") String customerId, Model model) {
//		model.addAttribute("customerId", customerId);
//		
//		return "sales/companyCustomer/examineContact";
//	}
//	
	/**
	 * 保存
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("sales:companyCustomer:add")
	public R save( CompanyCustomerDO companyCustomer){
		companyCustomer.setCustomerOperator(Long.toString(getUserId()));
		int  customerIds=companyCustomerService.save(companyCustomer);
		if(customerIds>0){
			MainCopyPersonDO mcp = new MainCopyPersonDO();
			String mainPersonId = companyCustomer.getMainPersonId();
			String mainPersonIdArray[] = mainPersonId.split(",");
			String copyPersonId = companyCustomer.getCopyPersonId();
			String copyPersonIdArray[] = copyPersonId.split(",");
			int result=0;
			for(int i=0;i<mainPersonIdArray.length;i++){
				mcp.setCustomerId(Integer.parseInt(companyCustomer.getCustomerId()));
				mcp.setMainPerson(1);
				mcp.setEmployeeId(Integer.parseInt(mainPersonIdArray[i]));
				mcp.setOperator(getUserId());
				result=mainCopyPersonService.save(mcp);

			}
			for (int i=0;i<copyPersonIdArray.length;i++){
				mcp.setCustomerId(Integer.parseInt(companyCustomer.getCustomerId()));
				mcp.setMainPerson(0);
				mcp.setEmployeeId(Integer.parseInt(copyPersonIdArray[i]));
				mcp.setOperator(getUserId());
				result=mainCopyPersonService.save(mcp);
			}
			if(result>0  || customerIds>0){
				R r = R.ok();
				r.put("customerId", customerIds);
				return r;
			}
		}
		return R.error();
	}
//	/**
//	 * 保存
//	 */
//	@ResponseBody
//	@PostMapping("/save")
//	@RequiresPermissions("sales:companyCustomer:add")
//	public R save( CompanyCustomerDO companyCustomer){
//		companyCustomer.setCustomerOperator(Long.toString(getUserId()));
//		if(companyCustomerService.save(companyCustomer)>0){
//			MainCopyPersonDO mcp = new MainCopyPersonDO();
//			String mainPersonId = companyCustomer.getMainPersonId();
//			String mainPersonIdArray[] = mainPersonId.split(",");
//			String copyPersonId = companyCustomer.getCopyPersonId();
//			String copyPersonIdArray[] = copyPersonId.split(",");
//			int result=0;
//			for(int i=0;i<mainPersonIdArray.length;i++){
//				mcp.setCustomerId(companyCustomer.getCustomerId());
//				mcp.setMainPerson(1);
//				mcp.setEmployeeId(Integer.parseInt(mainPersonIdArray[i]));
//				mcp.setOperator(getUserId());
//				result=mainCopyPersonService.save(mcp);
//
//			}
//			for (int i=0;i<copyPersonIdArray.length;i++){
//				mcp.setCustomerId(companyCustomer.getCopyPersonId());
//				mcp.setMainPerson(0);
//				mcp.setEmployeeId(Integer.parseInt(copyPersonIdArray[i]));
//				mcp.setOperator(getUserId());
//				result=mainCopyPersonService.save(mcp);
//			}
//			if(result>0){
//				return R.ok();
//			}
//
//			int  customerIds=companyCustomerService.save(companyCustomer);
//			if(customerIds>0){
//				R r = R.ok();
//				r.put("customerId", customerIds);
//				return r;
//			}
//
//			return R.error();
//		}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/update")
	@RequiresPermissions("sales:companyCustomer:edit")
	public R update( CompanyCustomerDO companyCustomer){
		companyCustomerService.update(companyCustomer);
		return R.ok();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("sales:companyCustomer:batchRemove")
	public R remove( String customerId){
		if(companyCustomerService.remove(customerId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping( "/batchRemove")
	@ResponseBody
	@RequiresPermissions("sales:companyCustomer:batchRemove")
	public R remove(@RequestParam("ids[]") String[] customerIds){
		companyCustomerService.batchRemove(customerIds);
		return R.ok();
	}
	
	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listDic() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = companyCustomerService.listDic();
		return dictList;
	}

	
	@ResponseBody
	@GetMapping("/listAllDicByArea")
	public List<DictDO> listAllDicByArea(@PathVariable("areaId") String areaId) {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = companyCustomerService.listAllDicByArea(areaId);
		return dictList;
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
	@ResponseBody
	@PostMapping("/importSubmit")
	@RequiresPermissions("sales:companyCustomer:import")
	R  Import (@RequestParam("file") MultipartFile file, HttpServletRequest request) {
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
			companyCustomerService.Import(datafile, userid);
		
		return null;
	}
	/**
	 * 导出
	 */
	@RequestMapping(value = "/export")
	public  @ResponseBody void export(@RequestParam(value = "administrative", required = false) String administrative,
			@RequestParam(value = "province", required = false) String province,
			@RequestParam(value = "city", required = false) String city,
			@RequestParam(value = "area", required = false) String area,
			@RequestParam(value = "customerName", required = false) String customerName,
			@RequestParam(value = "customerId", required = false) String customerId,
			@RequestParam(value = "customerSales", required = false) String customerSales,
			@RequestParam(value = "customerLevel", required = false) String customerLevel, HttpServletResponse response,
			HttpServletRequest request) throws ParseException {
		
		// String administrative1=request.getParameter(administrative);
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date data;
		Date date;
		String endtime = null;
		String starttime = null;

		Map<String, Object> params = new HashMap<String, Object>();
		params.put("province", province);
		params.put("city", city);
		params.put("area", area);
		params.put("customerName", (customerName!=null && !"".equals(customerName))?"%"+customerName+"%":customerName );
		params.put("customerId", (customerId!=null && !"".equals(customerId))?customerId+"%":customerId);
		params.put("customerSales", customerSales);
		params.put("customerLevel", customerLevel);
		List<CompanyCustomerDO> list = companyCustomerService.getQuery(params);
		if(list.size()>0) {
			System.out.println("---------------------list.size------------------->" + list.size());
			response.setContentType("application/binary;charset=UTF-8");
			try {
				ServletOutputStream out = response.getOutputStream();
				String fileName = new String((new SimpleDateFormat("yyyyMMddHHmmss")).format(new Date()).getBytes(),"UTF-8");
				response.setHeader("Content-disposition", "attachment; filename=" + fileName + ".xls");
				String[] titles = { "企业客户编号","省份","城市","区县","企业名称","助记简称","客户所有者","销售负责人","产品需求","需求简要描述","需求调研附件","客户类别","企业性质","客户状态","客户级别","销售阶段","客户内部阶段","来源","行业","人员规模","信用等级","客户潜力","员工数量","上级单位","公司简介","拜访交通方式","旧客户编号","子公司名称","热点客户","热度","热点客户分类","预期成交金额","热点说明","开票名称","纳税人税号","开户行","账号","联系情况","企业办公地址","电话号码","传真","邮箱","官网地址","邮编","企业负责人","职务","收费收缴率","企业占全市热化率","投诉率","供热面积","热力站数量","蒸汽面积","热水面积","自有热源","外购热源","热耗","水耗","电耗","未来一年新增规划","未来两年新增规划","未来三年新增规划","备注","创建人","创建时间"
};
				companyCustomerService.export(titles, out, list);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	}



