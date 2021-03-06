package com.bootdo.sales.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 业务信息表
 * 
 * @author lyp
 * @email 1992lcg@163.com
 * @date 2017-11-21 17:28:12
 */
public class BusinessDO implements Serializable {
	private static final long serialVersionUID = 1L;

	// 业务编号
	private String businessId;
	// 客户编号
	private String customerId;
	// 联系人编号
	private String contactId;
	// 业务名称
	private String businessName;
	// 业务类型
	private String businessCategory;
	// 业务状态
	private String businessStatus;
	// 销售负责人
	private String businessSales;
	// 销售负责人姓名
	private String businessSalesName;
	// 旧业务编号
	private String businessOldId;
	// 业务描述
	private String businessDescription;
	// 备注
	private String businessRemarks;
	// 业务修改人(操作人)
	private String businessOperator;
	// 业务修改时间
	private Date businessOperateTime;
	// 业务创建人id
	private String businessCreator;
	// 业务创建时间
	private Date businessCreateTime;
	// 客户名称
	private String customerName;
	// 业务创建人名称
	private String businessCreatorName;
	// 联系人名称
	private String contactName;
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
	 * 销售负责人姓名
	 */
	public String getBusinessSalesName() {
		return businessSalesName;
	}

	public void setBusinessSalesName(String businessSalesName) {
		this.businessSalesName = businessSalesName;
	}

	/**
	 * 设置：业务编号
	 */
	public void setBusinessId(String businessId) {
		this.businessId = businessId;
	}

	/**
	 * 获取：业务编号
	 */
	public String getBusinessId() {
		return businessId;
	}

	/**
	 * 设置：企业客户编号
	 */
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}

	/**
	 * 获取：企业客户编号
	 */
	public String getCustomerId() {
		return customerId;
	}

	/**
	 * 设置：联系人编号
	 */
	public void setContactId(String contactId) {
		this.contactId = contactId;
	}

	/**
	 * 获取：联系人编号
	 */
	public String getContactId() {
		return contactId;
	}

	/**
	 * 设置：业务名称
	 */
	public void setBusinessName(String businessName) {
		this.businessName = businessName;
	}

	/**
	 * 获取：业务名称
	 */
	public String getBusinessName() {
		return businessName;
	}

	/**
	 * 设置：业务类型
	 */
	public void setBusinessCategory(String businessCategory) {
		this.businessCategory = businessCategory;
	}

	/**
	 * 获取：业务类型
	 */
	public String getBusinessCategory() {
		return businessCategory;
	}

	/**
	 * 设置：业务状态
	 */
	public void setBusinessStatus(String businessStatus) {
		this.businessStatus = businessStatus;
	}

	/**
	 * 获取：业务状态
	 */
	public String getBusinessStatus() {
		return businessStatus;
	}

	/**
	 * 设置：销售负责人
	 */
	public void setBusinessSales(String businessSales) {
		this.businessSales = businessSales;
	}

	/**
	 * 获取：销售负责人
	 */
	public String getBusinessSales() {
		return businessSales;
	}

	/**
	 * 设置：旧业务编号
	 */
	public void setBusinessOldId(String businessOldId) {
		this.businessOldId = businessOldId;
	}

	/**
	 * 获取：旧业务编号
	 */
	public String getBusinessOldId() {
		return businessOldId;
	}

	/**
	 * 设置：业务描述
	 */
	public void setBusinessDescription(String businessDescription) {
		this.businessDescription = businessDescription;
	}

	/**
	 * 获取：业务描述
	 */
	public String getBusinessDescription() {
		return businessDescription;
	}

	/**
	 * 设置：备注
	 */
	public void setBusinessRemarks(String businessRemarks) {
		this.businessRemarks = businessRemarks;
	}

	/**
	 * 获取：备注
	 */
	public String getBusinessRemarks() {
		return businessRemarks;
	}

	/**
	 * 设置：业务修改人(操作人)
	 */
	public void setBusinessOperator(String businessOperator) {
		this.businessOperator = businessOperator;
	}

	/**
	 * 获取：业务修改人(操作人)
	 */
	public String getBusinessOperator() {
		return businessOperator;
	}

	/**
	 * 设置：业务修改时间
	 */
	public void setBusinessOperateTime(Date businessOperateTime) {
		this.businessOperateTime = businessOperateTime;
	}

	/**
	 * 获取：业务修改时间
	 */
	public Date getBusinessOperateTime() {
		return businessOperateTime;
	}

	public String getBusinessCreator() {
		return businessCreator;
	}

	public void setBusinessCreator(String businessCreator) {
		this.businessCreator = businessCreator;
	}

	/**
	 * 客户名称
	 */
	public String getCustomerName() {
		return customerName;
	}

	/**
	 * 业务创建时间
	 */
	public Date getBusinessCreateTime() {
		return businessCreateTime;
	}

	public void setBusinessCreateTime(Date businessCreateTime) {
		this.businessCreateTime = businessCreateTime;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	/**
	 * 业务创建人名称
	 */
	public String getBusinessCreatorName() {
		return businessCreatorName;
	}

	public void setBusinessCreatorName(String businessCreatorName) {
		this.businessCreatorName = businessCreatorName;
	}

	/**
	 * 联系人名称
	 */
	public String getContactName() {
		return contactName;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}
}
