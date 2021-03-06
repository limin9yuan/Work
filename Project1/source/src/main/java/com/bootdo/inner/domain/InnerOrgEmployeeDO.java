package com.bootdo.inner.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;



/**
 * 内部组织机构_员工表
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2017-11-22 13:27:13
 */
public class InnerOrgEmployeeDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//员工工号
	private String employeeId;
	//部门编号
	private String deptId;
	//岗位编号
	private String jobId;
	//内部账号ID
	private String innerUserId;
	//用户角色ID
	private String userRoleId;
	//用户角色Name
	private String userRoleName;
	//模块ID
	private String moduleId;
	//员工姓名
	private String employeeName;
	//部门
	private String employeeDept;
	//所属中心
	private String employeeCenter;
	//入职时间
	private String employeeJoinDate;
	//时薪
	private BigDecimal employeeSalaryHour;
	//员工状态
	private Integer employeeStatus;
	//电话
	private String employeePhoneNumber;
	//电话小号
	private String employeeInnerPhoneNumber;
	//QQ
	private String employeeQq;
	//备注
	private String employeeRemarks;
	//操作人
	private Long employeeOperator;
	//操作时间
	private Date employeeOperateTime;
	//操作人姓名
	private String  employeeOperatorName;
	//级别
	private String  employeeLevel;
	//主送人id
	private String mainPersonId;
	//抄送人id
	private String copyPersonId;

	public String getMainPersonId() {
		return mainPersonId;
	}

	public void setMainPersonId(String mainPersonId) {
		this.mainPersonId = mainPersonId;
	}

	public String getCopyPersonId() {
		return copyPersonId;
	}

	public void setCopyPersonId(String copyPersonId) {
		this.copyPersonId = copyPersonId;
	}

	/**
	 * 用户角色Name
	 */
	public String getUserRoleName() {
		return userRoleName;
	}
	public void setUserRoleName(String userRoleName) {
		this.userRoleName = userRoleName;
	}
	/**
	 * 设置：员工工号
	 */
	public void setEmployeeId(String employeeId) {
		this.employeeId = employeeId;
	}
	/**
	 * 获取：员工工号
	 */
	public String getEmployeeId() {
		return employeeId;
	}
	/**
	 * 设置：部门编号
	 */
	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}
	/**
	 * 获取：部门编号
	 */
	public String getDeptId() {
		return deptId;
	}
	/**
	 * 设置：岗位编号
	 */
	public void setJobId(String jobId) {
		this.jobId = jobId;
	}
	/**
	 * 获取：岗位编号
	 */
	public String getJobId() {
		return jobId;
	}
	/**
	 * 设置：内部账号ID
	 */
	public void setInnerUserId(String innerUserId) {
		this.innerUserId = innerUserId;
	}
	/**
	 * 获取：内部账号ID
	 */
	public String getInnerUserId() {
		return innerUserId;
	}
	/**
	 * 设置：用户角色ID
	 */
	public void setUserRoleId(String userRoleId) {
		this.userRoleId = userRoleId;
	}
	/**
	 * 获取：用户角色ID
	 */
	public String getUserRoleId() {
		return userRoleId;
	}
	/**
	 * 设置：模块ID
	 */
	public void setModuleId(String moduleId) {
		this.moduleId = moduleId;
	}
	/**
	 * 获取：模块ID
	 */
	public String getModuleId() {
		return moduleId;
	}
	/**
	 * 设置：员工姓名
	 */
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	/**
	 * 获取：员工姓名
	 */
	public String getEmployeeName() {
		return employeeName;
	}
	/**
	 * 设置：部门
	 */
	public void setEmployeeDept(String employeeDept) {
		this.employeeDept = employeeDept;
	}
	/**
	 * 获取：部门
	 */
	public String getEmployeeDept() {
		return employeeDept;
	}
	/**
	 * 设置：所属中心
	 */
	public void setEmployeeCenter(String employeeCenter) {
		this.employeeCenter = employeeCenter;
	}
	/**
	 * 获取：所属中心
	 */
	public String getEmployeeCenter() {
		return employeeCenter;
	}
	/**
	 * 设置：入职时间
	 */
	public void setEmployeeJoinDate(String employeeJoinDate) {
		this.employeeJoinDate = employeeJoinDate;
	}
	/**
	 * 获取：入职时间
	 */
	public String getEmployeeJoinDate() {
		return employeeJoinDate;
	}
	/**
	 * 设置：时薪
	 */
	public void setEmployeeSalaryHour(BigDecimal employeeSalaryHour) {
		this.employeeSalaryHour = employeeSalaryHour;
	}
	/**
	 * 获取：时薪
	 */
	public BigDecimal getEmployeeSalaryHour() {
		return employeeSalaryHour;
	}
	/**
	 * 设置：员工状态
	 */
	public void setEmployeeStatus(Integer employeeStatus) {
		this.employeeStatus = employeeStatus;
	}
	/**
	 * 获取：员工状态
	 */
	public Integer getEmployeeStatus() {
		return employeeStatus;
	}
	/**
	 * 设置：电话
	 */
	public void setEmployeePhoneNumber(String employeePhoneNumber) {
		this.employeePhoneNumber = employeePhoneNumber;
	}
	/**
	 * 获取：电话
	 */
	public String getEmployeePhoneNumber() {
		return employeePhoneNumber;
	}
	/**
	 * 设置：电话小号
	 */
	public void setEmployeeInnerPhoneNumber(String employeeInnerPhoneNumber) {
		this.employeeInnerPhoneNumber = employeeInnerPhoneNumber;
	}
	/**
	 * 获取：电话小号
	 */
	public String getEmployeeInnerPhoneNumber() {
		return employeeInnerPhoneNumber;
	}
	/**
	 * 设置：QQ
	 */
	public void setEmployeeQq(String employeeQq) {
		this.employeeQq = employeeQq;
	}
	/**
	 * 获取：QQ
	 */
	public String getEmployeeQq() {
		return employeeQq;
	}
	/**
	 * 设置：备注
	 */
	public void setEmployeeRemarks(String employeeRemarks) {
		this.employeeRemarks = employeeRemarks;
	}
	/**
	 * 获取：备注
	 */
	public String getEmployeeRemarks() {
		return employeeRemarks;
	}
	/**
	 * 设置：操作人
	 */
	public void setEmployeeOperator(Long employeeOperator) {
		this.employeeOperator = employeeOperator;
	}
	/**
	 * 获取：操作人
	 */
	public Long getEmployeeOperator() {
		return employeeOperator;
	}
	/**
	 * 设置：操作时间
	 */
	public void setEmployeeOperateTime(Date employeeOperateTime) {
		this.employeeOperateTime = employeeOperateTime;
	}
	/**
	 * 获取：操作时间
	 */
	public Date getEmployeeOperateTime() {
		return employeeOperateTime;
	}
	
	/**
	 * 操作人姓名
	 */
	public String getEmployeeOperatorName() {
		return employeeOperatorName;
	}
	public void setEmployeeOperatorName(String employeeOperatorName) {
		this.employeeOperatorName = employeeOperatorName;
	}
	public String getEmployeeLevel() {
		return employeeLevel;
	}
	public void setEmployeeLevel(String employeeLevel) {
		this.employeeLevel = employeeLevel;
	}
	
}
