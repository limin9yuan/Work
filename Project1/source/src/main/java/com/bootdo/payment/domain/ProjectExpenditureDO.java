package com.bootdo.payment.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

/**
 * 项目收支
 * 
 * @小平
 * @email 1992lcg@163.com
 * @date 2018-2-1
 */

public class ProjectExpenditureDO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 项目编号
	private Long projectId;
	// 企业客户编号
	private String customerId;
	// 项目集合编号
	private String collectionId;
	// 项目名称
	private String projectName;
	// 销售负责人
	private String projectSales;
	// 项目开始时间
	private Date projectBeginDate;
	// 项目结束时间
	private Date projectEndDate;
	// 主管
	private String projectOwner;
	// 研发经理
	private String projectManager;
	// 研发开始时间
	private Date projectDevelopmentBeginDate;
	// 研发结束时间
	private Date projectDevelopmentEndDate;
	// 项目类型
	private String projectGategory;
	// 项目阶段
	private String projectPhase;
	// 项目描述
	private String projectDescription;
	// 旧项目编号
	private String projectOldId;
	// 备注
	private String projectRemarks;
	// 创建人
	private String projectOperator;
	// 创建时间
	private Date projectOperateTime;
	// 部门名称
	private String deptName;
	// 客户名称
	private String customerName;
	// 创建人名称
	private String projectOperatorName;
	// 项目计划利润率
	private BigDecimal budgetProfitRate;
	// 参与中心
	private String responsibleCenter;
	// 业务名称
	private String businessId;
	/*************人工成本**************/
	//
	private String employeeID;
	//
	private String timeSheetName;
	//
	private String employeeLevel;
	//
	private String employeeSalaryHour;
	//
	private String startDate;
	//
	private String endDate;
	//
	private String totalDay;
	//
	private String workPercent;
	//
	private String totalWorkTime;
	//
	private String laborCost;
	//
	private String sumLaborCost;
	/**************报销详情**********************/
	//
	private String tableName;
	//
	private Date approvalTime;
	//
	private String applyName;
	//
	private String applyMoney;
	//
	private String sumExpenses;
	/**************采购详情*****************************/
	//
	private String Id;
	//
	private String pName;
	//
	private String pTime;
	//
	private String pPerson;
	//
	private String pTotalPrice;
	//
	private String sumPurchase;
	/***************回款详情***********************************/
	//
	private String rTime;
	//
	private String rPrice;
	//
	private String rType;
	//
	private String receivablePrice;
	//
	private String sumReceive;
	/*********************收支情况汇总************************************/
	//
	private String profit;
	//
	private String totalExpenses;
	//
	private String predictProfitRate;
	//
	private String actualProfitRate;

	public String getSumLaborCost() {
		return sumLaborCost;
	}

	public void setSumLaborCost(String sumLaborCost) {
		this.sumLaborCost = sumLaborCost;
	}

	public String getSumReceive() {
		return sumReceive;
	}

	public void setSumReceive(String sumReceive) {
		this.sumReceive = sumReceive;
	}

	public String getSumPurchase() {
		return sumPurchase;
	}

	public void setSumPurchase(String sumPurchase) {
		this.sumPurchase = sumPurchase;
	}

	public String getSumExpenses() {
		return sumExpenses;
	}

	public void setSumExpenses(String sumExpenses) {
		this.sumExpenses = sumExpenses;
	}

	public String getId() {
		return Id;
	}

	public void setId(String id) {
		Id = id;
	}

	public String getProfit() {
		return profit;
	}

	public void setProfit(String profit) {
		this.profit = profit;
	}

	public String getTotalExpenses() {
		return totalExpenses;
	}

	public void setTotalExpenses(String totalExpenses) {
		this.totalExpenses = totalExpenses;
	}

	public String getPredictProfitRate() {
		return predictProfitRate;
	}

	public void setPredictProfitRate(String predictProfitRate) {
		this.predictProfitRate = predictProfitRate;
	}

	public String getActualProfitRate() {
		return actualProfitRate;
	}

	public void setActualProfitRate(String actualProfitRate) {
		this.actualProfitRate = actualProfitRate;
	}

	public String getrTime() {
		return rTime;
	}

	public void setrTime(String rTime) {
		this.rTime = rTime;
	}

	public String getrPrice() {
		return rPrice;
	}

	public void setrPrice(String rPrice) {
		this.rPrice = rPrice;
	}

	public String getrType() {
		return rType;
	}

	public void setrType(String rType) {
		this.rType = rType;
	}

	public String getReceivablePrice() {
		return receivablePrice;
	}

	public void setReceivablePrice(String receivablePrice) {
		this.receivablePrice = receivablePrice;
	}

	public String getpName() {
		return pName;
	}

	public void setpName(String pName) {
		this.pName = pName;
	}

	public String getpTime() {
		return pTime;
	}

	public void setpTime(String pTime) {
		this.pTime = pTime;
	}

	public String getpPerson() {
		return pPerson;
	}

	public void setpPerson(String pPerson) {
		this.pPerson = pPerson;
	}

	public String getpTotalPrice() {
		return pTotalPrice;
	}

	public void setpTotalPrice(String pTotalPrice) {
		this.pTotalPrice = pTotalPrice;
	}

	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}

	public Date getApprovalTime() {
		return approvalTime;
	}

	public void setApprovalTime(Date approvalTime) {
		this.approvalTime = approvalTime;
	}

	public String getApplyName() {
		return applyName;
	}

	public void setApplyName(String applyName) {
		this.applyName = applyName;
	}

	public String getApplyMoney() {
		return applyMoney;
	}

	public void setApplyMoney(String applyMoney) {
		this.applyMoney = applyMoney;
	}

	public String getLaborCost() {
		return laborCost;
	}

	public void setLaborCost(String laborCost) {
		this.laborCost = laborCost;
	}

	public String getTotalWorkTime() {
		return totalWorkTime;
	}

	public void setTotalWorkTime(String totalWorkTime) {
		this.totalWorkTime = totalWorkTime;
	}

	public String getWorkPercent() {
		return workPercent;
	}

	public void setWorkPercent(String workPercent) {
		this.workPercent = workPercent;
	}

	public String getTotalDay() {
		return totalDay;
	}

	public void setTotalDay(String totalDay) {
		this.totalDay = totalDay;
	}

	public String getEndDate() {
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getStartDate() {
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEmployeeSalaryHour() {
		return employeeSalaryHour;
	}

	public void setEmployeeSalaryHour(String employeeSalaryHour) {
		this.employeeSalaryHour = employeeSalaryHour;
	}

	public String getEmployeeLevel() {
		return employeeLevel;
	}

	public void setEmployeeLevel(String employeeLevel) {
		this.employeeLevel = employeeLevel;
	}

	public String getTimeSheetName() {
		return timeSheetName;
	}

	public void setTimeSheetName(String timeSheetName) {
		this.timeSheetName = timeSheetName;
	}

	public String getEmployeeID() {
		return employeeID;
	}

	public void setEmployeeID(String employeeID) {
		this.employeeID = employeeID;
	}

	public String getBusinessId() {
		return businessId;
	}

	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public Long getProjectId() {
		return projectId;
	}

	public void setProjectId(Long projectId) {
		this.projectId = projectId;
	}

	public String getCustomerId() {
		return customerId;
	}

	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	public String getCollectionId() {
		return collectionId;
	}

	public void setCollectionId(String collectionId) {
		this.collectionId = collectionId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getProjectSales() {
		return projectSales;
	}

	public void setProjectSales(String projectSales) {
		this.projectSales = projectSales;
	}

	public Date getProjectBeginDate() {
		return projectBeginDate;
	}

	public void setProjectBeginDate(Date projectBeginDate) {
		this.projectBeginDate = projectBeginDate;
	}

	public Date getProjectEndDate() {
		return projectEndDate;
	}

	public void setProjectEndDate(Date projectEndDate) {
		this.projectEndDate = projectEndDate;
	}

	public String getProjectOwner() {
		return projectOwner;
	}

	public void setProjectOwner(String projectOwner) {
		this.projectOwner = projectOwner;
	}

	public String getProjectManager() {
		return projectManager;
	}

	public void setProjectManager(String projectManager) {
		this.projectManager = projectManager;
	}

	public Date getProjectDevelopmentBeginDate() {
		return projectDevelopmentBeginDate;
	}

	public void setProjectDevelopmentBeginDate(Date projectDevelopmentBeginDate) {
		this.projectDevelopmentBeginDate = projectDevelopmentBeginDate;
	}

	public Date getProjectDevelopmentEndDate() {
		return projectDevelopmentEndDate;
	}

	public void setProjectDevelopmentEndDate(Date projectDevelopmentEndDate) {
		this.projectDevelopmentEndDate = projectDevelopmentEndDate;
	}

	public String getProjectGategory() {
		return projectGategory;
	}

	public void setProjectGategory(String projectGategory) {
		this.projectGategory = projectGategory;
	}

	public String getProjectPhase() {
		return projectPhase;
	}

	public void setProjectPhase(String projectPhase) {
		this.projectPhase = projectPhase;
	}

	public String getProjectDescription() {
		return projectDescription;
	}

	public void setProjectDescription(String projectDescription) {
		this.projectDescription = projectDescription;
	}

	public String getProjectOldId() {
		return projectOldId;
	}

	public void setProjectOldId(String projectOldId) {
		this.projectOldId = projectOldId;
	}

	public String getProjectRemarks() {
		return projectRemarks;
	}

	public void setProjectRemarks(String projectRemarks) {
		this.projectRemarks = projectRemarks;
	}

	public String getProjectOperator() {
		return projectOperator;
	}

	public void setProjectOperator(String projectOperator) {
		this.projectOperator = projectOperator;
	}

	public Date getProjectOperateTime() {
		return projectOperateTime;
	}

	public void setProjectOperateTime(Date projectOperateTime) {
		this.projectOperateTime = projectOperateTime;
	}

	public String getProjectOperatorName() {
		return projectOperatorName;
	}

	public void setProjectOperatorName(String projectOperatorName) {
		this.projectOperatorName = projectOperatorName;
	}

	public BigDecimal getBudgetProfitRate() {
		return budgetProfitRate;
	}

	public void setBudgetProfitRate(BigDecimal budgetProfitRate) {
		this.budgetProfitRate = budgetProfitRate;
	}

	public String getResponsibleCenter() {
		return responsibleCenter;
	}

	public void setResponsibleCenter(String responsibleCenter) {
		this.responsibleCenter = responsibleCenter;
	}

}
