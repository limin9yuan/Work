package com.bootdo.timesheet.service.impl;


import com.bootdo.activiti.service.impl.ActTaskServiceImpl;
import com.bootdo.common.domain.DictDO;
import com.bootdo.activiti.config.ActivitiConstant;
import com.bootdo.contract.dao.ContractDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.bootdo.project.domain.ProjectDO;
import com.bootdo.timesheet.dao.TimesheetDao;
import com.bootdo.timesheet.domain.TimesheetDO;
import com.bootdo.timesheet.service.TimesheetService;


@Service
public class TimesheetServiceImpl implements TimesheetService {
    @Autowired
    private TimesheetDao timesheetDao;

    @Autowired
    private ActTaskServiceImpl actTaskService;

    @Override
    public TimesheetDO view(String timesheetId) {
        return timesheetDao.view(timesheetId);
    }

    @Override
    public TimesheetDO get(String timesheetId) {
        return timesheetDao.get(timesheetId);
    }

    @Override
    public List<TimesheetDO> list(Map<String, Object> map) {
        return timesheetDao.list(map);
    }
    public List<TimesheetDO> listcount(Map<String, Object> map) {
        return timesheetDao.listcount(map);
    }

    @Override
    public List<TimesheetDO> approvelist(Map<String, Object> map) {
        return timesheetDao.approvelist(map);
    }

    @Override
    public int count(Map<String, Object> map) {
        return timesheetDao.count(map);
    }
    public int listcountnum(Map<String, Object> map) {
        return timesheetDao.listcountnum(map);
    }
    public int approvelistnum(Map<String, Object> map) {
        return timesheetDao.approvelistnum(map);
    }
    //添加不在任务工时表里的数据
    @Override
    public int save(TimesheetDO timeSheet) {
        int ret = timesheetDao.save(timeSheet);

        String timeSheetId = timeSheet.getTimesheetId();
        //流程标题，每个业务根据自己特点，体现主要信息
        String title = "";
        title = timeSheet.getTimesheetId() + "-" + timeSheet.getTimesheetId();
        //添加保存时发起审批流程
        String PROCESS_INSTANCE_ID = actTaskService.startProcess(ActivitiConstant.ACTIVITI_TIMESHEET[0],
                ActivitiConstant.ACTIVITI_TIMESHEET[1], timeSheetId, title, new HashMap<String, Object>());
        //更新流程实例ID到业务表
        timeSheet.setProcessInstanceId(PROCESS_INSTANCE_ID);
        timesheetDao.update(timeSheet);


        return ret;
    }
    public int savetimesheet(TimesheetDO timeSheet) {
        int ret = timesheetDao.savetimesheet(timeSheet);

        String timeSheetId = timeSheet.getTimesheetId();
        //流程标题，每个业务根据自己特点，体现主要信息
        String title = "";
        title = timeSheet.getTimesheetId() + "-" + timeSheet.getTimesheetId();
        //添加保存时发起审批流程
        String PROCESS_INSTANCE_ID = actTaskService.startProcess(ActivitiConstant.ACTIVITI_TIMESHEET[0],
                ActivitiConstant.ACTIVITI_TIMESHEET[1], timeSheetId, title, new HashMap<String, Object>());
        //更新流程实例ID到业务表
        timeSheet.setProcessInstanceId(PROCESS_INSTANCE_ID);
        timesheetDao.update(timeSheet);


        return ret;
    }




    @Override
    public int update(TimesheetDO timesheet) {

        return timesheetDao.update(timesheet);
    }

    //获取自增长主键的值
    @Override
    public String getnewtimesheetId(TimesheetDO timesheet) {
        int ret = timesheetDao.save(timesheet);
        String timesheetId = timesheet.getTimesheetId();

        return timesheetId;
    }

    @Override
    public int remove(String timesheetId) {
        return timesheetDao.remove(timesheetId);
    }

    @Override
    public int batchRemove(String[] timesheetIds) {
        return timesheetDao.batchRemove(timesheetIds);
    }

    public ProjectDO getProjectId(String projectId) {
        return timesheetDao.getProjectId(projectId);
    }

    public List<DictDO> listDic() {
        return timesheetDao.listDic();
    }

    /**
     * ******************* 审批流程相关 *************************
     */
    //审批处理保存
    @Override
    public int formUpdate(TimesheetDO timesheet) {
        //流程审批处理
        Map<String, Object> vars = new HashMap<>(16);
        vars.put("taskAction", timesheet.getTaskAction());
        actTaskService.complete(timesheet.getTaskId(), timesheet.getProcessInstanceId(), timesheet.getTaskComment(), "", vars);
        //判断流程是否结束
        if (actTaskService.isProcessInstanceFinish(timesheet.getProcessInstanceId())) {
            timesheet.setTimesheetApprovalStatus("1");
        } else {
            timesheet.setTimesheetApprovalStatus("2");
        }
        return timesheetDao.update(timesheet);
    }


}
