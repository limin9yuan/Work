package com.bootdo.timesheet.controller;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.*;

import com.bootdo.activiti.service.ActTaskService;
import com.bootdo.common.utils.ShiroUtils;
import com.bootdo.activiti.utils.ActivitiUtils;
import com.bootdo.approval.domain.AssignmentDO;
import com.bootdo.common.domain.DictDO;
import com.bootdo.inner.domain.InnerOrgEmployeeDO;
import com.bootdo.inner.service.InnerOrgEmployeeService;
import com.bootdo.project.domain.ProjectDO;
import com.bootdo.timesheet.domain.TimesheetDO;
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
import com.bootdo.project.service.ProjectService;
import com.bootdo.timesheet.service.TimesheetService;
import com.bootdo.approval.service.AssignmentService;
import com.bootdo.common.controller.BaseController;
import com.bootdo.activiti.service.impl.ActTaskServiceImpl;

import java.util.Calendar;

import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import org.activiti.engine.task.Task;
import org.activiti.engine.TaskService;
import org.springframework.web.servlet.ModelAndView;

/**
 * 工时信息表
 * 
 * @author chgleepublic class TimesheetController {

 * @email 1992lcg@163.com
 * @date 2018-03-14 17:52:48
 */
 
@Controller
@RequestMapping("/timesheet/timesheet")
public class TimesheetController extends BaseController {
	@Autowired
	private TimesheetService timesheetService;
	@Autowired
	private AssignmentService assignmentService;
	@Autowired
	private InnerOrgEmployeeService innerOrgEmployeeService;
	@Autowired
	private ProjectService projectService;
	@Autowired
	TaskService taskService;

	@Autowired
	ActTaskService actTaskService;
	@Autowired
	ActivitiUtils activitiUtils;


	/**
	 * ********************** 审批流程相关  *********************************
	 */
	//申请页面
	@GetMapping("/form")
	@RequiresPermissions("timesheet:timesheet:add")
	String form(){
		return "timesheet/timesheet/add";
	}



	//审批处理页面
	@GetMapping("/form/{taskId}")
	@RequiresPermissions("timesheet:timesheet:add")
	String formTask(@PathVariable("taskId") String taskId,Model model){
		//取得流程表单数据
		TimesheetDO timesheet = timesheetService.view(activitiUtils.getBusinessKeyByTaskId(taskId));
		if(timesheet!=null){
			model.addAttribute("timesheet", timesheet);
		}
		return "timesheet/timesheet/viewTimeSheet";
	}


	//审批处理保存
	@ResponseBody
	@RequestMapping("/form/update")
	@RequiresPermissions("timesheet:timesheet:edit")
	public R formUpdate( TimesheetDO timesheet){

		timesheetService.formUpdate(timesheet);//审批流程保存
		return R.ok();
	}
	//审批处理保存
	@ResponseBody
	@RequestMapping("/form/updateAll")
	@RequiresPermissions("timesheet:timesheet:edit")
	public R formUpdateAll( TimesheetDO timesheet){
		String taskIds=timesheet.getTaskId();
		String timeSheetIds=timesheet.getTimesheetId();
		String processInstanceIds=timesheet.getProcessInstanceId();
		String TaskActions=timesheet.getTaskAction();
		String[] taskIdArray=taskIds.split(",");
		String[] timeSheetIdArray=timeSheetIds.split(",");
		String[] processInstanceIdArray=processInstanceIds.split(",");

		for(int i=0;i<taskIdArray.length;i++){
			TimesheetDO timesheetNew = new  TimesheetDO();
			timesheetNew.setTimesheetId(timeSheetIdArray[i]);
			timesheetNew.setTaskId(taskIdArray[i]);
			timesheetNew.setProcessInstanceId(processInstanceIdArray[i]);
			timesheetNew.setTaskAction(TaskActions);
			timesheetService.formUpdate(timesheetNew);
		}

		return R.ok();
	}






	@GetMapping()
	@RequiresPermissions("timesheet:timesheet:timesheet")
	String Timesheet(Model model){
		SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");//日期方法

		Calendar cal = Calendar.getInstance();
		String date8=simdf.format(cal.getTime());


		cal.set(cal.DAY_OF_WEEK, cal.MONDAY);
		String date11 = simdf.format(cal.getTime());
		java.sql.Date date1=java.sql.Date.valueOf(date11);


		Date date=new Date();
		cal.add(cal.DATE,+1);
		date=cal.getTime();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String date2 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date3 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date4 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date5 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date6 = formatter.format(date);

		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date7 = formatter.format(date);



		model.addAttribute("Date1", date1);
		model.addAttribute("Date2", date2);
		model.addAttribute("Date3", date3);
		model.addAttribute("Date4", date4);
		model.addAttribute("Date5", date5);
		model.addAttribute("Date6", date6);
		model.addAttribute("Date7", date7);
		model.addAttribute("Date8", date8);






		return "timesheet/timesheet/timesheet";
	}


	@GetMapping("/approvetimesheet")
	@RequiresPermissions("timesheet:timesheet:approvetimesheet")
	String approvetimesheet(Model model){
		SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");//日期方法

		Calendar cal = Calendar.getInstance();
		String date8=simdf.format(cal.getTime());


		cal.set(cal.DAY_OF_WEEK, cal.MONDAY);
		String date11 = simdf.format(cal.getTime());
		java.sql.Date date1=java.sql.Date.valueOf(date11);


		Date date=new Date();
		cal.add(cal.DATE,+1);
		date=cal.getTime();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
		String date2 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date3 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date4 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date5 = formatter.format(date);


		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date6 = formatter.format(date);

		cal.add(cal.DATE,+1);
		date=cal.getTime();
		String date7 = formatter.format(date);



		model.addAttribute("Date1", date1);
		model.addAttribute("Date2", date2);
		model.addAttribute("Date3", date3);
		model.addAttribute("Date4", date4);
		model.addAttribute("Date5", date5);
		model.addAttribute("Date6", date6);
		model.addAttribute("Date7", date7);
		model.addAttribute("Date8", date8);






		return "timesheet/timesheet/approvetimesheet";
	}



	@GetMapping("/count")
	@RequiresPermissions("timesheet:timesheet:count")
	String count(Model model){
		return "timesheet/timesheet/count";
	}

	@ResponseBody
	@GetMapping("/listcount")
	@RequiresPermissions("timesheet:timesheet:count")
	public PageUtils listcount(@RequestParam Map<String, Object> params){

//		查询列表数据
		params.put("uerId",getUserId());
		Query query = new Query(params);
		List<TimesheetDO> timesheetList = timesheetService.listcount(query);
		int total = timesheetService.listcountnum(query);
		PageUtils pageUtils = new PageUtils(timesheetList, total);
		return pageUtils;
	}

	@ResponseBody
	@GetMapping("/list")
	@RequiresPermissions("timesheet:timesheet:timesheet")
	public PageUtils list(@RequestParam Map<String, Object> params){

		if (params.get("timeMin") != null && !"".equals(params.get("timeMin"))) {
           Date da1=new Date();

			String d1=(String)(params.get("timeMin"));

			da1 = java.sql.Date.valueOf(d1);

			SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar cal = Calendar.getInstance();
			cal.setTime(da1);




			cal.add(cal.DATE, +1);
			Date date = new Date();
			date = cal.getTime();
			String date2 = simdf.format(date);
			java.sql.Date dat2 = java.sql.Date.valueOf(date2);



			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date3 = simdf.format(date);
			java.sql.Date dat3 = java.sql.Date.valueOf(date3);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date4 = simdf.format(date);
			java.sql.Date dat4 = java.sql.Date.valueOf(date4);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date5 = simdf.format(date);
			java.sql.Date dat5 = java.sql.Date.valueOf(date5);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date6 = simdf.format(date);
			java.sql.Date dat6 = java.sql.Date.valueOf(date6);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date7 = simdf.format(date);
			java.sql.Date dat7 = java.sql.Date.valueOf(date7);


            params.put("istask",params.get("istask"));
			params.put("date1", da1);
			params.put("date2", dat2);
			params.put("date3", dat3);
			params.put("date4", dat4);
			params.put("date5", dat5);
			params.put("date6", dat6);
			params.put("date7", dat7);




		}
        else {

			SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");

			Calendar cal = Calendar.getInstance();

			String date8 = simdf.format(cal.getTime());
			java.sql.Date dat8 = java.sql.Date.valueOf(date8);
			cal.set(cal.DAY_OF_WEEK, cal.MONDAY);
			String date11 = simdf.format(cal.getTime());
			java.sql.Date date1 = java.sql.Date.valueOf(date11);


			Date date = new Date();
			cal.add(cal.DATE, +1);
			date = cal.getTime();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String date2 = formatter.format(date);
			java.sql.Date dat2 = java.sql.Date.valueOf(date2);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date3 = formatter.format(date);
			java.sql.Date dat3 = java.sql.Date.valueOf(date3);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date4 = formatter.format(date);
			java.sql.Date dat4 = java.sql.Date.valueOf(date4);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date5 = formatter.format(date);
			java.sql.Date dat5 = java.sql.Date.valueOf(date5);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date6 = formatter.format(date);
			java.sql.Date dat6 = java.sql.Date.valueOf(date6);

			Date date13 = new Date();
			cal.add(cal.DATE, +1);
			date13 = cal.getTime();


			params.put("date1", date1);
			params.put("date2", dat2);
			params.put("date3", dat3);
			params.put("date4", dat4);
			params.put("date5", dat5);
			params.put("date6", dat6);

			params.put("date7", date13);
			params.put("date8", dat8);
		}





//
//		查询列表数据
		params.put("uerId",getUserId());
        Query query = new Query(params);
		List<TimesheetDO> timesheetList = timesheetService.list(query);
		int total = timesheetService.count(query);
		PageUtils pageUtils = new PageUtils(timesheetList, total);
		return pageUtils;
	}

	@ResponseBody
	@GetMapping("/approvelist")
	@RequiresPermissions("timesheet:timesheet:approvetimesheet")
	public PageUtils approvelist(@RequestParam Map<String, Object> params){
  //时间查询
		if (params.get("timeMin") != null && !"".equals(params.get("timeMin"))) {
			Date da1=new Date();

			String d1=(String)(params.get("timeMin"));

			da1 = java.sql.Date.valueOf(d1);

			SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");
			Calendar cal = Calendar.getInstance();
			cal.setTime(da1);




			cal.add(cal.DATE, +1);
			Date date = new Date();
			date = cal.getTime();
			String date2 = simdf.format(date);
			java.sql.Date dat2 = java.sql.Date.valueOf(date2);



			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date3 = simdf.format(date);
			java.sql.Date dat3 = java.sql.Date.valueOf(date3);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date4 = simdf.format(date);
			java.sql.Date dat4 = java.sql.Date.valueOf(date4);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date5 = simdf.format(date);
			java.sql.Date dat5 = java.sql.Date.valueOf(date5);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date6 = simdf.format(date);
			java.sql.Date dat6 = java.sql.Date.valueOf(date6);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date7 = simdf.format(date);
			java.sql.Date dat7 = java.sql.Date.valueOf(date7);


			params.put("istask",params.get("istask"));
			params.put("date1", da1);
			params.put("date2", dat2);
			params.put("date3", dat3);
			params.put("date4", dat4);
			params.put("date5", dat5);
			params.put("date6", dat6);
			params.put("date7", dat7);




		}
		else {

			SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");

			Calendar cal = Calendar.getInstance();

			String date8 = simdf.format(cal.getTime());
			java.sql.Date dat8 = java.sql.Date.valueOf(date8);
			cal.set(cal.DAY_OF_WEEK, cal.MONDAY);
			String date11 = simdf.format(cal.getTime());
			java.sql.Date date1 = java.sql.Date.valueOf(date11);


			Date date = new Date();
			cal.add(cal.DATE, +1);
			date = cal.getTime();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String date2 = formatter.format(date);
			java.sql.Date dat2 = java.sql.Date.valueOf(date2);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date3 = formatter.format(date);
			java.sql.Date dat3 = java.sql.Date.valueOf(date3);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date4 = formatter.format(date);
			java.sql.Date dat4 = java.sql.Date.valueOf(date4);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date5 = formatter.format(date);
			java.sql.Date dat5 = java.sql.Date.valueOf(date5);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date6 = formatter.format(date);
			java.sql.Date dat6 = java.sql.Date.valueOf(date6);



			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date13 = formatter.format(date);
			java.sql.Date dat13 = java.sql.Date.valueOf(date13);

			params.put("date1", date1);
			params.put("date2", dat2);
			params.put("date3", dat3);
			params.put("date4", dat4);
			params.put("date5", dat5);
			params.put("date6", dat6);

			params.put("date7", dat13);
			params.put("date8", dat8);
		}





//
//		查询列表数据
		params.put("uerId",getUserId());
		Query query = new Query(params);
		List<TimesheetDO> timesheetList = timesheetService.approvelist(query);

		Task task =null;
		for(TimesheetDO timesheet : timesheetList){

			if(timesheet.getTimeSheetApprovalStatusDate1()==0){
				task = taskService.createTaskQuery().processDefinitionKey("timeSheet").taskAssignee(ShiroUtils.getUser().getUsername()).processInstanceBusinessKey(timesheet.getIdDate1()).singleResult();//admin
				if(task!=null){
					timesheet.setTaskIdDate1(task.getId());
					timesheet.setPdIdDate1(task.getProcessDefinitionId());
				}
			}
			if(timesheet.getTimeSheetApprovalStatusDate2()==0){
				task = taskService.createTaskQuery().processDefinitionKey("timeSheet").taskAssignee(ShiroUtils.getUser().getUsername()).processInstanceBusinessKey(timesheet.getIdDate2()).singleResult();//admin
				if(task!=null){
					timesheet.setTaskIdDate2(task.getId());
					timesheet.setPdIdDate2(task.getProcessDefinitionId());
				}
			}

			if(timesheet.getTimeSheetApprovalStatusDate3()==0){
				task = taskService.createTaskQuery().processDefinitionKey("timeSheet").taskAssignee(ShiroUtils.getUser().getUsername()).processInstanceBusinessKey(timesheet.getIdDate3()).singleResult();//admin
				if(task!=null){
					timesheet.setTaskIdDate3(task.getId());
					timesheet.setPdIdDate3(task.getProcessDefinitionId());
				}
			}

			if(timesheet.getTimeSheetApprovalStatusDate4()==0){
				task = taskService.createTaskQuery().processDefinitionKey("timeSheet").taskAssignee(ShiroUtils.getUser().getUsername()).processInstanceBusinessKey(timesheet.getIdDate4()).singleResult();//admin
				if(task!=null){
					timesheet.setTaskIdDate4(task.getId());
					timesheet.setPdIdDate4(task.getProcessDefinitionId());
				}
			}

			if(timesheet.getTimeSheetApprovalStatusDate5()==0){
				task = taskService.createTaskQuery().processDefinitionKey("timeSheet").taskAssignee(ShiroUtils.getUser().getUsername()).processInstanceBusinessKey(timesheet.getIdDate5()).singleResult();//admin
				if(task!=null){
					timesheet.setTaskIdDate5(task.getId());
					timesheet.setPdIdDate5(task.getProcessDefinitionId());
				}
			}

			if(timesheet.getTimeSheetApprovalStatusDate6()==0){
				task = taskService.createTaskQuery().processDefinitionKey("timeSheet").taskAssignee(ShiroUtils.getUser().getUsername()).processInstanceBusinessKey(timesheet.getIdDate6()).singleResult();//admin
				if(task!=null){
					timesheet.setTaskIdDate6(task.getId());
					timesheet.setPdIdDate6(task.getProcessDefinitionId());
				}
			}

			if(timesheet.getTimeSheetApprovalStatusDate7()==0){
				task = taskService.createTaskQuery().processDefinitionKey("timeSheet").taskAssignee(ShiroUtils.getUser().getUsername()).processInstanceBusinessKey(timesheet.getIdDate7()).singleResult();//admin
				if(task!=null){
					timesheet.setTaskIdDate7(task.getId());
					timesheet.setPdIdDate7(task.getProcessDefinitionId());
				}
			}





		}


		int total = timesheetService.approvelistnum(query);
		PageUtils pageUtils = new PageUtils(timesheetList, total);
		return pageUtils;
	}

//填报页时间查询
	@GetMapping("/getlist/{timeMin}")
	@ResponseBody
	Map<String, Object> getlist(@PathVariable("timeMin") String timeMin) {

		Date da1 = new Date();



//		if (timeMin != null && !"".equals(timeMin) &&  !"undefined".equals(timeMin)) {
		if (timeMin != null &&   !"undefined".equals(timeMin)) {


			da1 = java.sql.Date.valueOf(timeMin);


			SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");
			String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
			Calendar cal = Calendar.getInstance();
			cal.setTime(da1);
			int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week1 = weekDays[w];

			cal.add(cal.DATE, +1);
			Date date = new Date();
			date = cal.getTime();
			String date2 = simdf.format(date);
			java.sql.Date dat2 = java.sql.Date.valueOf(date2);
			cal.setTime(dat2);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week2 = weekDays[w];
			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date3 = simdf.format(date);
			java.sql.Date dat3 = java.sql.Date.valueOf(date3);
			cal.setTime(dat3);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week3 = weekDays[w];
			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date4 = simdf.format(date);
			java.sql.Date dat4 = java.sql.Date.valueOf(date4);

			cal.setTime(dat4);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week4 = weekDays[w];

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date5 = simdf.format(date);
			java.sql.Date dat5 = java.sql.Date.valueOf(date5);

			cal.setTime(dat5);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week5 = weekDays[w];

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date6 = simdf.format(date);
			java.sql.Date dat6 = java.sql.Date.valueOf(date6);

			cal.setTime(dat6);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week6 = weekDays[w];

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date7 = simdf.format(date);
			java.sql.Date dat7 = java.sql.Date.valueOf(date7);

			cal.setTime(dat7);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week7 = weekDays[w];


			Map<String, Object> returnData = new HashMap<String, Object>();

			returnData.put("date11", da1 + week1);
			returnData.put("dat2", dat2 + week2);
			returnData.put("dat3", dat3 + week3);
			returnData.put("dat4", dat4 + week4);
			returnData.put("dat5", dat5 + week5);
			returnData.put("dat6", dat6 + week6);
			returnData.put("dat7", dat7 + week7);

			returnData.put("pd1", da1);
			returnData.put("pd2", dat2);
			returnData.put("pd3", dat3);
			returnData.put("pd4", dat4);
			returnData.put("pd5", dat5);
			returnData.put("pd6", dat6);
			returnData.put("pd7", dat7);

			return returnData;
		}
		else
		{

			SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");

			Calendar cal = Calendar.getInstance();

			String date8 = simdf.format(cal.getTime());
			java.sql.Date dat8 = java.sql.Date.valueOf(date8);
			cal.set(cal.DAY_OF_WEEK, cal.MONDAY);
			String date11 = simdf.format(cal.getTime());
			java.sql.Date date1 = java.sql.Date.valueOf(date11);


			Date date = new Date();
			cal.add(cal.DATE, +1);
			date = cal.getTime();
			SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
			String date2 = formatter.format(date);
			java.sql.Date dat2 = java.sql.Date.valueOf(date2);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date3 = formatter.format(date);
			java.sql.Date dat3 = java.sql.Date.valueOf(date3);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date4 = formatter.format(date);
			java.sql.Date dat4 = java.sql.Date.valueOf(date4);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date5 = formatter.format(date);
			java.sql.Date dat5 = java.sql.Date.valueOf(date5);

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date6 = formatter.format(date);
			java.sql.Date dat6 = java.sql.Date.valueOf(date6);

			Date date13 = new Date();
			cal.add(cal.DATE, +1);
			date13 = cal.getTime();
			Map<String, Object> returnData = new HashMap<String, Object>();
			returnData.put("pd1", date1);
			returnData.put("pd2", dat2);
			returnData.put("pd3", dat3);
			returnData.put("pd4", dat4);
			returnData.put("pd5", dat5);
			returnData.put("pd6", dat6);
			returnData.put("pd7", date13);


			return returnData;
		}

	}

	//填报页时间查询
	@GetMapping("/getlist1/{timeMin}")
	@ResponseBody
	Map<String, Object> getlist1(@PathVariable("timeMin") Date timeMin) {
		SimpleDateFormat sdf2 = new SimpleDateFormat("yyyy-MM-dd");
		Calendar call = Calendar.getInstance();
		Date dateday=new Date();//取时间
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		call.setTime( java.sql.Date.valueOf(sdf.format(dateday)));






		int a = call.get(Calendar.DAY_OF_WEEK) - 1; // 得到今天是周几
		// 周几,如果是周日 变为7
		// System.out.println(a);
		if (a == 0) {
			a = 7;
		}
		// 当前时间减去 几天得到周一的时间
		long resDateTime = java.sql.Date.valueOf(sdf.format(dateday)).getTime() - (a * 86400000);
		// 再加上1天的时间
		resDateTime += 86400000;
		// System.out.println(resDateTime);
		Date resDate = new Date(resDateTime);
		Date da1 = new Date();






			da1 = java.sql.Date.valueOf( sdf2.format(resDate));


			SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");
			String[] weekDays = {"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"};
			Calendar cal = Calendar.getInstance();
			cal.setTime(da1);
			int w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week1 = weekDays[w];

			cal.add(cal.DATE, +1);
			Date date = new Date();
			date = cal.getTime();
			String date2 = simdf.format(date);
			java.sql.Date dat2 = java.sql.Date.valueOf(date2);
			cal.setTime(dat2);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week2 = weekDays[w];
			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date3 = simdf.format(date);
			java.sql.Date dat3 = java.sql.Date.valueOf(date3);
			cal.setTime(dat3);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week3 = weekDays[w];
			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date4 = simdf.format(date);
			java.sql.Date dat4 = java.sql.Date.valueOf(date4);

			cal.setTime(dat4);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week4 = weekDays[w];

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date5 = simdf.format(date);
			java.sql.Date dat5 = java.sql.Date.valueOf(date5);

			cal.setTime(dat5);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week5 = weekDays[w];

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date6 = simdf.format(date);
			java.sql.Date dat6 = java.sql.Date.valueOf(date6);

			cal.setTime(dat6);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week6 = weekDays[w];

			cal.add(cal.DATE, +1);
			date = cal.getTime();
			String date7 = simdf.format(date);
			java.sql.Date dat7 = java.sql.Date.valueOf(date7);

			cal.setTime(dat7);
			w = cal.get(Calendar.DAY_OF_WEEK) - 1;
			if (w < 0)
				w = 0;
			String week7 = weekDays[w];


			Map<String, Object> returnData = new HashMap<String, Object>();

			returnData.put("date11", da1 + week1);
			returnData.put("dat2", dat2 + week2);
			returnData.put("dat3", dat3 + week3);
			returnData.put("dat4", dat4 + week4);
			returnData.put("dat5", dat5 + week5);
			returnData.put("dat6", dat6 + week6);
			returnData.put("dat7", dat7 + week7);

			returnData.put("pd1", da1);
			returnData.put("pd2", dat2);
			returnData.put("pd3", dat3);
			returnData.put("pd4", dat4);
			returnData.put("pd5", dat5);
			returnData.put("pd6", dat6);
			returnData.put("pd7", dat7);

			return returnData;



	}
	@GetMapping("/add")
	@RequiresPermissions("timesheet:timesheet:add")
	String add(){
	    return "timesheet/timesheet/add";
	}


	//修改工时信息如果没有就添加
	@GetMapping("/edit/{timesheetId}/{projectId}/{AssignmentId}")
	@RequiresPermissions("timesheet:timesheet:edit")
	String edit(@PathVariable("timesheetId") String timesheetId,@PathVariable("projectId") String projectId,@PathVariable("AssignmentId") String AssignmentId,Model model){
    //如果timesheetid=-1新增id并添加
		if(timesheetId.equals("-1"))
			{
				ProjectDO project=projectService.get(projectId);
				model.addAttribute("timesheetAssignmentId", AssignmentId);
				model.addAttribute("ProjectId", project.getProjectId());
				model.addAttribute("timesheetProjectCagegory", project.getProjectGategory());
				model.addAttribute("timesheetPm", project.getProjectOwner());
				return "timesheet/timesheet/addtimesheet";
		    }
			else
		{
			TimesheetDO timesheet = timesheetService.get(timesheetId);

			String ceshi=timesheet.getTimesheetContent();
			model.addAttribute("timesheet", timesheet);
			model.addAttribute("assignmentTaskName", timesheet.getTimesheetContent());
			return "timesheet/timesheet/edit";
		}

	}


	@GetMapping("/approve/{procDefId}/{taskId}")
	public ModelAndView approve(@PathVariable("procDefId") String procDefId, @PathVariable("taskId") String taskId, Model model) throws IOException {
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






	@ResponseBody
	@PostMapping("/approveall")
	Map approveall(String pdIdDate1,String taskIdDate1,String idDate1,
								  String pdIdDate2,String taskIdDate2,String idDate2,
								  String pdIdDate3,String taskIdDate3,String idDate3,
								  String pdIdDate4,String taskIdDate4,String idDate4,
								  String pdIdDate5,String taskIdDate5,String idDate5,
								  String pdIdDate6,String taskIdDate6,String idDate6,
								  String pdIdDate7,String taskIdDate7,String idDate7,
								  Model model) throws IOException {
	String timeSheetIds="";
	String taskIds="";
	String taskNames="";
	String processInstanceIds="";
	String processDefinitionIds="";
	//传参数判断是否为空
	if ( pdIdDate1 != null && !"".equals(pdIdDate1) && taskIdDate1 != null && !"".equals(taskIdDate1)) {

		Task task = taskService.createTaskQuery().taskId(taskIdDate1).singleResult();//根据任务id查询实例id
		if("".equals(taskIds)){
			taskIds=taskIdDate1;
		}else{
			taskIds=taskIds+","+taskIdDate1;
		}
		//model.addAttribute("processDefinitionId", task.getProcessDefinitionId());
		//model.addAttribute("executionId", task.getExecutionId());
		String tmpInstanceId = task.getProcessInstanceId();
		if("".equals(processInstanceIds)){
			processInstanceIds=tmpInstanceId;
		}else{
			processInstanceIds=processInstanceIds+","+tmpInstanceId;
		}
		if("".equals(timeSheetIds)){
			timeSheetIds=idDate1;
		}else{
			timeSheetIds=timeSheetIds+","+idDate1;
		}
		if("".equals(processDefinitionIds)){
			processDefinitionIds=pdIdDate1;
		}else{
			processDefinitionIds=processDefinitionIds+","+pdIdDate1;
		}
	}
	if ( pdIdDate2 != null && !"".equals(pdIdDate2) && taskIdDate2 != null && !"".equals(taskIdDate2)) {

		Task task = taskService.createTaskQuery().taskId(taskIdDate2).singleResult();//根据任务id查询实例id
		if("".equals(taskIds)){
			taskIds=taskIdDate2;
		}else{
			taskIds=taskIds+","+taskIdDate2;
		}
		String tmpInstanceId = task.getProcessInstanceId();
		if("".equals(processInstanceIds)){
			processInstanceIds=tmpInstanceId;
		}else{
			processInstanceIds=processInstanceIds+","+tmpInstanceId;
		}
		if("".equals(timeSheetIds)){
			timeSheetIds=idDate2;
		}else{
			timeSheetIds=timeSheetIds+","+idDate2;
		}
		if("".equals(processDefinitionIds)){
			processDefinitionIds=pdIdDate2;
		}else{
			processDefinitionIds=processDefinitionIds+","+pdIdDate2;
		}
	}
	if ( pdIdDate3 != null && !"".equals(pdIdDate3) && taskIdDate3 != null && !"".equals(taskIdDate3)) {

		Task task = taskService.createTaskQuery().taskId(taskIdDate3).singleResult();//根据任务id查询实例id
		if("".equals(taskIds)){
			taskIds=taskIdDate3;
		}else{
			taskIds=taskIds+","+taskIdDate3;
		}
		String tmpInstanceId = task.getProcessInstanceId();
		if("".equals(processInstanceIds)){
			processInstanceIds=tmpInstanceId;
		}else{
			processInstanceIds=processInstanceIds+","+tmpInstanceId;
		}
		if("".equals(timeSheetIds)){
			timeSheetIds=idDate3;
		}else{
			timeSheetIds=timeSheetIds+","+idDate3;
		}
		if("".equals(processDefinitionIds)){
			processDefinitionIds=pdIdDate3;
		}else{
			processDefinitionIds=processDefinitionIds+","+pdIdDate3;
		}
	}
	if ( pdIdDate4 != null && !"".equals(pdIdDate4) && taskIdDate4 != null && !"".equals(taskIdDate4)) {

		Task task = taskService.createTaskQuery().taskId(taskIdDate4).singleResult();//根据任务id查询实例id
		if("".equals(taskIds)){
			taskIds=taskIdDate4;
		}else{
			taskIds=taskIds+","+taskIdDate4;
		}
		String tmpInstanceId = task.getProcessInstanceId();
		if("".equals(processInstanceIds)){
			processInstanceIds=tmpInstanceId;
		}else{
			processInstanceIds=processInstanceIds+","+tmpInstanceId;
		}
		if("".equals(timeSheetIds)){
			timeSheetIds=idDate4;
		}else{
			timeSheetIds=timeSheetIds+","+idDate4;
		}
		if("".equals(processDefinitionIds)){
			processDefinitionIds=pdIdDate4;
		}else{
			processDefinitionIds=processDefinitionIds+","+pdIdDate4;
		}
	}
	if ( pdIdDate5 != null && !"".equals(pdIdDate5) && taskIdDate5 != null && !"".equals(taskIdDate5)) {

		Task task = taskService.createTaskQuery().taskId(taskIdDate5).singleResult();//根据任务id查询实例id
		if("".equals(taskIds)){
			taskIds=taskIdDate5;
		}else{
			taskIds=taskIds+","+taskIdDate5;
		}
		String tmpInstanceId = task.getProcessInstanceId();
		if("".equals(processInstanceIds)){
			processInstanceIds=tmpInstanceId;
		}else{
			processInstanceIds=processInstanceIds+","+tmpInstanceId;
		}
		if("".equals(timeSheetIds)){
			timeSheetIds=idDate5;
		}else{
			timeSheetIds=timeSheetIds+","+idDate5;
		}
		if("".equals(processDefinitionIds)){
			processDefinitionIds=pdIdDate5;
		}else{
			processDefinitionIds=processDefinitionIds+","+pdIdDate5;
		}
	}
	if ( pdIdDate6 != null && !"".equals(pdIdDate6) && taskIdDate6 != null && !"".equals(taskIdDate6)) {

		Task task = taskService.createTaskQuery().taskId(taskIdDate6).singleResult();//根据任务id查询实例id
		if("".equals(taskIds)){
			taskIds=taskIdDate6;
		}else{
			taskIds=taskIds+","+taskIdDate6;
		}
		String tmpInstanceId = task.getProcessInstanceId();
		if("".equals(processInstanceIds)){
			processInstanceIds=tmpInstanceId;
		}else{
			processInstanceIds=processInstanceIds+","+tmpInstanceId;
		}
		if("".equals(timeSheetIds)){
			timeSheetIds=idDate6;
		}else{
			timeSheetIds=timeSheetIds+","+idDate6;
		}
		if("".equals(processDefinitionIds)){
			processDefinitionIds=pdIdDate6;
		}else{
			processDefinitionIds=processDefinitionIds+","+pdIdDate6;
		}
	}
	if ( pdIdDate7 != null && !"".equals(pdIdDate7) && taskIdDate7 != null && !"".equals(taskIdDate7)) {

		Task task = taskService.createTaskQuery().taskId(taskIdDate7).singleResult();//根据任务id查询实例id
		if("".equals(taskIds)){
			taskIds=taskIdDate7;
		}else{
			taskIds=taskIds+","+taskIdDate7;
		}
		String tmpInstanceId = task.getProcessInstanceId();
		if("".equals(processInstanceIds)){
			processInstanceIds=tmpInstanceId;
		}else{
			processInstanceIds=processInstanceIds+","+tmpInstanceId;
		}
		if("".equals(timeSheetIds)){
			timeSheetIds=idDate7;
		}else{
			timeSheetIds=timeSheetIds+","+idDate7;
		}
		if("".equals(processDefinitionIds)){
			processDefinitionIds=pdIdDate7;
		}else{
			processDefinitionIds=processDefinitionIds+","+pdIdDate7;
		}
	}
	Map<String, Object> map = new HashMap<>(16);
	map.put("taskId", taskIds);
	map.put("timeSheetId", timeSheetIds);
	map.put("processInstanceId", processInstanceIds);
	map.put("processDefinitionId", processDefinitionIds);
	return map;

	}

	@GetMapping("/goToApprovePage/{processInstanceId}/{taskId}/{timeSheetId}")
	public ModelAndView goToApprovePage(@PathVariable("processInstanceId") String processInstanceId, @PathVariable("taskId") String taskId,@PathVariable("timeSheetId") String timeSheetId, Model model) throws IOException
	{
		model.addAttribute("taskId", taskId);

		model.addAttribute("processInstanceId", processInstanceId);
		model.addAttribute("timeSheetId", timeSheetId);
		return new ModelAndView("act/task/formTimeSheet");
	}


	@ResponseBody
	@GetMapping("/listDic")
	public List<DictDO> listByType() {
		// 查询列表数据
		Map<String, Object> map = new HashMap<>(16);
		map.put("type", "");
		List<DictDO> dictList = timesheetService.listDic();
		return dictList;
	}


	/**
	 * 填报不在任务表里的工时表里的工时信息同时添加进去任务表
	 */
	@ResponseBody
	@PostMapping("/save")
	@RequiresPermissions("timesheet:timesheet:add")
	public R save( TimesheetDO timesheet){
//添加当前用户
		timesheet.setEmployeeId(getUserId());
//添加当前用户姓名
		String inner = innerOrgEmployeeService.getname(Long.toString(getUserId()));
		timesheet.setTimesheetName(inner);
//添加当前天日期
		SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");//日期方法
		Calendar cal = Calendar.getInstance();
		Date date = new Date();
		date=cal.getTime();
      timesheet.setTimesheetDate(date);
      timesheet.setIsTask(1);
		//添加任务表
		String assignmentId = assignmentService.saveAssignmentInTimesheet(timesheet);

		//添加工时表
		timesheet.setTimesheetAssignmentId(assignmentId);
		if(timesheetService.save(timesheet)>0){
  timesheet.setTimesheetAssignmentId(Long.toString(getUserId()));
			return R.ok();
		}
		return R.error();
	}




	/**
	 *添加工时表的
	 */

	@ResponseBody
	@PostMapping("/addtimesheet")
	@RequiresPermissions("timesheet:timesheet:add")
	public R addtimesheet( TimesheetDO timesheet){
//添加当前用户
		timesheet.setEmployeeId(getUserId());
//添加当前用户姓名
		String inner = innerOrgEmployeeService.getname(Long.toString(getUserId()));
		timesheet.setTimesheetName(inner);
//添加当前天日期
		SimpleDateFormat simdf = new SimpleDateFormat("yyyy-MM-dd");//日期方法
		Calendar cal = Calendar.getInstance();
		Date date = new Date();
		date=cal.getTime();
		timesheet.setTimesheetDate(date);
//添加任务id
		if(timesheetService.save(timesheet)>0){

			return R.ok();
		}
		return R.error();
	}


	@GetMapping("/addtimesheet")
	@RequiresPermissions("timesheet:timesheet:add")
	String addtimesheet(){
		return "timesheet/timesheet/addtimesheet";
	}
	/**
	 * 修改
	 */
	@ResponseBody
	@RequestMapping("/edit")
	@RequiresPermissions("timesheet:timesheet:edit")
	public R update( TimesheetDO timesheet){
		timesheetService.update(timesheet);
		return R.ok();
	}

	/**
	 * 删除
	 */
	@PostMapping( "/remove")
	@ResponseBody
	@RequiresPermissions("timesheet:timesheet:remove")
	public R remove( String timesheetId){

		TimesheetDO timesheet = timesheetService.get(timesheetId);
		if (timesheet != null && timesheet.getProcessInstanceId()!= null){
			if (timesheet.getTimesheetApprovalStatus().equals("2")){
				return R.error("流程正在审批，不允许删除");
			}
			if (timesheet.getTimesheetApprovalStatus().equals("1")) {
				return R.error("流程已经审批完成，不允许删除");
			}
			actTaskService.deleteProcess(timesheet.getProcessInstanceId());
		}
		if(timesheetService.remove(timesheetId)>0){
		return R.ok();
		}
		return R.error();
	}
	
	/**
	 * 删除
	 */
	@PostMapping("/batchRemove")
	@ResponseBody
	@RequiresPermissions("timesheet:timesheet:batchRemove")
	public R remove(@RequestParam("ids[]") String[] timesheetIds){
		List<String> list = new ArrayList<String>();
		//级联删除流程相关
		for(int i=0;i<timesheetIds.length;i++){
			TimesheetDO timesheet= timesheetService.get(timesheetIds[i]);
			if(timesheet!=null&&timesheet.getProcessInstanceId()!=null){
				if(timesheet.getTimesheetApprovalStatus().equals("2")){
					continue;
					//return R.error("流程正在审批，不允许删除");
				}else if(timesheet.getTimesheetApprovalStatus().equals("1")){
					//return R.error("流程已经审批完成，不允许删除");
					continue;
				}
				actTaskService.deleteProcess(timesheet.getProcessInstanceId());
				list.add(timesheetIds[i]);
			}
		}

		timesheetService.batchRemove(list.toArray(new String[1]));
		if(list.size()<timesheetIds.length){
			return R.ok("有部分流程正在审批或审批完成，不允许删除");
		}else{
			return R.ok();
		}
	}
	@RequestMapping("/getProjectId/{projectId}")
	@ResponseBody
	Map<String, Object> getProjectId(@PathVariable("projectId") String projectId) {
		ProjectDO project = timesheetService.getProjectId(projectId);
		Map<String, Object> returnData = new HashMap<String, Object>();
		returnData.put("project",project);
		return returnData;
	}
}
