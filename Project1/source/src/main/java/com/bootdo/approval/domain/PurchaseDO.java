package com.bootdo.approval.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;



/**
 * 采购申请表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-11-30 14:40:43
 */
public class PurchaseDO implements Serializable {
	private static final long serialVersionUID = 1L;


	//采购申请编号
	private String purchaseId;
	//明细表id
	private String  detailid;
	//项目编号
	private String projectId;
	//申购部门
	private String purchaseDept;
	//申购人
	private String purchasePerson;
	//申购时间
	private String purchaseDate;
	//物品名称
	private String purchaseName;
	//品牌
	private String purchaseBrand;
	//型号
	private String purchaseMode;
	//规格/配置
	private String purchaseConfig;
	//单位
	private String purchaseUnit;
	//数量
	private Integer purchaseNumber;
	//单价
	private BigDecimal purchaseUnitPrice;
	//总价
	private BigDecimal purchaseTotalPrice;
	//要求交货时间
	private String purchaseDeliveryTime;
	//交货地点
	private String purchaseDeliveryPlace;
	//收货人
	private String purchaseConsignee;
	//联系电话
	private String purchasePhoneNumber;
	//备注
	private String purchaseRemarks;
	//审批状态
	private String purchaseApprovalStatus;
	//操作人
	private Long purchaseOperator;
	//修改时间
	private Date purchaseOperateTime;
	//创建人
	private Long purchaseCreator;
	//创建时间
	private Date purchaseCreateTime;
	
	//申购人名称
	private String purchasePersonName;
	//项目名称
	private String projectName;
	
	//申请人员名称
	private String purchaseOperatorName;
	//主送人id
	private String mainPersonId;
	//抄送人id
	private String copyPersonId;
	
	//**********************流程相关属性****************************
	//流程任务ID
	private String taskId;
	//审批操作
	private String taskAction;
	//审批说明
	private String taskComment;
	//流程实例ID
	private String processInstanceId;
	//流程审批时间
	private Date purchaseApprovalTime;
//	审批总金额
	private String totalprice;
	public String getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(String totalprice) {
		this.totalprice = totalprice;
	}

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

	public Date getPurchaseApprovalTime() {
		return purchaseApprovalTime;
	}

	public void setPurchaseApprovalTime(Date purchaseApprovalTime) {
		this.purchaseApprovalTime = purchaseApprovalTime;
	}

	public String getTaskComment() {
        return taskComment;
    }

    public void setTaskComment(String taskComment) {
        this.taskComment = taskComment;
    }

    public String getProcessInstanceId() {
        return processInstanceId;
    }

    public void setProcessInstanceId(String processInstanceId) {
        this.processInstanceId = processInstanceId;
    }

    /**
	 * 设置：审批操作
	 */
	public void setTaskAction(String taskAction) {
		this.taskAction = taskAction;
	}
	/**
	 * 获取：审批操作
	 */
	public String getTaskAction() {
		return taskAction;
	}
	
	/**
	 * 设置：流程任务ID
	 */
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	/**
	 * 获取：流程任务ID
	 */
	public String getTaskId() {
		return taskId;
	}	

	/**
	 * 设置：采购申请编号
	 */
	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}
	/**
	 * 获取：采购申请编号
	 */
	public String getPurchaseId() {
		return purchaseId;
	}
	/**
	 * 设置：项目编号
	 */
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	/**
	 * 获取：项目编号
	 */
	public String getProjectId() {
		return projectId;
	}
	/**
	 * 设置：申购部门
	 */
	public void setPurchaseDept(String purchaseDept) {
		this.purchaseDept = purchaseDept;
	}
	/**
	 * 获取：申购部门
	 */
	public String getPurchaseDept() {
		return purchaseDept;
	}
	/**
	 * 设置：申购人
	 */
	public void setPurchasePerson(String purchasePerson) {
		this.purchasePerson = purchasePerson;
	}
	/**
	 * 获取：申购人
	 */
	public String getPurchasePerson() {
		return purchasePerson;
	}
	/**
	 * 设置：申购时间
	 */
	public void setPurchaseDate(String purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	/**
	 * 获取：申购时间
	 */
	public String getPurchaseDate() {
		return purchaseDate;
	}
	/**
	 * 设置：物品名称
	 */
	public void setPurchaseName(String purchaseName) {
		this.purchaseName = purchaseName;
	}
	/**
	 * 获取：物品名称
	 */
	public String getPurchaseName() {
		return purchaseName;
	}
	/**
	 * 设置：品牌
	 */
	public void setPurchaseBrand(String purchaseBrand) {
		this.purchaseBrand = purchaseBrand;
	}
	/**
	 * 获取：品牌
	 */
	public String getPurchaseBrand() {
		return purchaseBrand;
	}
	/**
	 * 设置：型号
	 */
	public void setPurchaseMode(String purchaseMode) {
		this.purchaseMode = purchaseMode;
	}
	/**
	 * 获取：型号
	 */
	public String getPurchaseMode() {
		return purchaseMode;
	}
	/**
	 * 设置：规格/配置
	 */
	public void setPurchaseConfig(String purchaseConfig) {
		this.purchaseConfig = purchaseConfig;
	}
	/**
	 * 获取：规格/配置
	 */
	public String getPurchaseConfig() {
		return purchaseConfig;
	}
	/**
	 * 设置：单位
	 */
	public void setPurchaseUnit(String purchaseUnit) {
		this.purchaseUnit = purchaseUnit;
	}
	/**
	 * 获取：单位
	 */
	public String getPurchaseUnit() {
		return purchaseUnit;
	}
	/**
	 * 设置：数量
	 */
	public void setPurchaseNumber(Integer purchaseNumber) {
		this.purchaseNumber = purchaseNumber;
	}
	/**
	 * 获取：数量
	 */
	public Integer getPurchaseNumber() {
		return purchaseNumber;
	}
	/**
	 * 设置：单价
	 */
	public void setPurchaseUnitPrice(BigDecimal purchaseUnitPrice) {
		this.purchaseUnitPrice = purchaseUnitPrice;
	}
	/**
	 * 获取：单价
	 */
	public BigDecimal getPurchaseUnitPrice() {
		return purchaseUnitPrice;
	}
	/**
	 * 设置：总价
	 */
	public void setPurchaseTotalPrice(BigDecimal purchaseTotalPrice) {
		this.purchaseTotalPrice = purchaseTotalPrice;
	}
	/**
	 * 获取：总价
	 */
	public BigDecimal getPurchaseTotalPrice() {
		return purchaseTotalPrice;
	}
	/**
	 * 设置：要求交货时间
	 */
	public void setPurchaseDeliveryTime(String purchaseDeliveryTime) {
		this.purchaseDeliveryTime = purchaseDeliveryTime;
	}
	/**
	 * 获取：要求交货时间
	 */
	public String getPurchaseDeliveryTime() {
		return purchaseDeliveryTime;
	}
	/**
	 * 设置：交货地点
	 */
	public void setPurchaseDeliveryPlace(String purchaseDeliveryPlace) {
		this.purchaseDeliveryPlace = purchaseDeliveryPlace;
	}
	/**
	 * 获取：交货地点
	 */
	public String getPurchaseDeliveryPlace() {
		return purchaseDeliveryPlace;
	}
	/**
	 * 设置：收货人
	 */
	public void setPurchaseConsignee(String purchaseConsignee) {
		this.purchaseConsignee = purchaseConsignee;
	}
	/**
	 * 获取：收货人
	 */
	public String getPurchaseConsignee() {
		return purchaseConsignee;
	}
	/**
	 * 设置：联系电话
	 */
	public void setPurchasePhoneNumber(String purchasePhoneNumber) {
		this.purchasePhoneNumber = purchasePhoneNumber;
	}
	/**
	 * 获取：联系电话
	 */
	public String getPurchasePhoneNumber() {
		return purchasePhoneNumber;
	}
	/**
	 * 设置：备注
	 */
	public void setPurchaseRemarks(String purchaseRemarks) {
		this.purchaseRemarks = purchaseRemarks;
	}
	/**
	 * 获取：备注
	 */
	public String getPurchaseRemarks() {
		return purchaseRemarks;
	}
	/**
	 * 设置：审批状态
	 */
	public void setPurchaseApprovalStatus(String purchaseApprovalStatus) {
		this.purchaseApprovalStatus = purchaseApprovalStatus;
	}
	/**
	 * 获取：审批状态
	 */
	public String getPurchaseApprovalStatus() {
		return purchaseApprovalStatus;
	}
	/**
	 * 设置：操作人
	 */
	public void setPurchaseOperator(Long purchaseOperator) {
		this.purchaseOperator = purchaseOperator;
	}
	/**
	 * 获取：操作人
	 */
	public Long getPurchaseOperator() {
		return purchaseOperator;
	}
	/**
	 * 设置：修改时间
	 */
	public void setPurchaseOperateTime(Date purchaseOperateTime) {
		this.purchaseOperateTime = purchaseOperateTime;
	}
	/**
	 * 获取：修改时间
	 */
	public Date getPurchaseOperateTime() {
		return purchaseOperateTime;
	}
	/**
	 * 设置：创建人
	 */
	public void setPurchaseCreator(Long purchaseCreator) {
		this.purchaseCreator = purchaseCreator;
	}
	/**
	 * 获取：创建人
	 */
	public Long getPurchaseCreator() {
		return purchaseCreator;
	}
	/**
	 * 设置：创建时间
	 */
	public void setPurchaseCreateTime(Date purchaseCreateTime) {
		this.purchaseCreateTime = purchaseCreateTime;
	}
	/**
	 * 获取：创建时间
	 */
	public Date getPurchaseCreateTime() {
		return purchaseCreateTime;
	}
	/**
	 * 获取：申购人名称
	 */
	public String getPurchasePersonName() {
		return purchasePersonName;
	}
	/**
	 * 设置：申购人名称
	 */
	public void setPurchasePersonName(String purchasePersonName) {
		this.purchasePersonName = purchasePersonName;
	}
	/**
	 * 设置：项目名称
	 */
	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}
	/**
	 * 获取：项目名称
	 */
	public String getProjectName() {
		return projectName;
	}
	public String getPurchaseOperatorName() {
		return purchaseOperatorName;
	}
	public void setPurchaseOperatorName(String purchaseOperatorName) {
		this.purchaseOperatorName = purchaseOperatorName;
	}

	public String getDetailid() {
		return detailid;
	}

	public void setDetailid(String detailid) {
		this.detailid = detailid;
	}
}
