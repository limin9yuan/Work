package com.bootdo.common.domain;

import java.util.Date;

/**
 * Created by Mingyuan Li on 2018/4/13.
 * Package name: com.bootdo.common.domain.
 * Project name: bootdo.
 */
public class MainCopyPersonDO {
    //主键
    private int Id;
    //客户ID
    private String tId;
    //员工ID
    private String employeeId;
    //是否主送
    private int mainPerson;
    //操作人
    private Long operator;
    //操作时间
    private Date operateTime;
    //主送人抄送人
    private String person;
    //表名
    private String tableName;

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }

    public String getTId() {
        return tId;
    }

    public void setTId(String tId) {
        this.tId = tId;
    }

    public String getPerson() {
        return person;
    }

    public void setPerson(String person) {
        this.person = person;
    }

    public int getId() {
        return Id;
    }

    public String getEmployeeId() {
        return employeeId;
    }

    public int getMainPerson() {
        return mainPerson;
    }

    public Long getOperator() {
        return operator;
    }

    public Date getOperateTime() {
        return operateTime;
    }

    public void setId(int id) {
        Id = id;
    }

    public void setEmployeeId(String employeeId) {
        this.employeeId = employeeId;
    }

    public void setMainPerson(int mainPerson) {
        this.mainPerson = mainPerson;
    }

    public void setOperator(Long operator) {
        this.operator = operator;
    }

    public void setOperateTime(Date operateTime) {
        this.operateTime = operateTime;
    }
}
