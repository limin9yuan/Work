package com.bootdo.contract.domain;

import java.io.Serializable;
import java.util.Date;

/**
 * 软件明细表
 * @author Administrator
 *
 */
public class ContractSoftwareDetailDo implements Serializable{
	private static final long serialVersionUID = 1L;
	
	//软件明细ID
	private Long softwareDetailId;
	//系统			
	private String softwareDetailSystem;
	//模块
	private String softwareDetailModel;
	//创建时间
	private Date softwareDetailCreationTime;
	//操作人
	private String softwareDetailOperator;
	
	
	public String getSoftwareDetailOperator() {
		return softwareDetailOperator;
	}
	public void setSoftwareDetailOperator(String softwareDetailOperator) {
		this.softwareDetailOperator = softwareDetailOperator;
	}
	/**
	 * 软件明细ID
	 * @return
	 */
	public Long getSoftwareDetailId() {
		return softwareDetailId;
	}
	/**
	 * 软件明细ID
	 * @return
	 */
	public void setSoftwareDetailId(Long softwareDetailId) {
		this.softwareDetailId = softwareDetailId;
	}
	/**
	 * 系统
	 * @return
	 */
	public String getSoftwareDetailSystem() {
		return softwareDetailSystem;
	}
	/**
	 * 系统
	 * @return
	 */
	public void setSoftwareDetailSystem(String softwareDetailSystem) {
		this.softwareDetailSystem = softwareDetailSystem;
	}
	/**
	 * 模块
	 * @return
	 */
	public String getSoftwareDetailModel() {
		return softwareDetailModel;
	}
	/**
	 * 模块
	 * @return
	 */
	public void setSoftwareDetailModel(String softwareDetailModel) {
		this.softwareDetailModel = softwareDetailModel;
	}
	/**
	 * 创建时间
	 * @return
	 */
	public Date getSoftwareDetailCreationTime() {
		return softwareDetailCreationTime;
	}
	/**
	 * 创建时间
	 * @return
	 */
	public void setSoftwareDetailCreationTime(Date softwareDetailCreationTime) {
		this.softwareDetailCreationTime = softwareDetailCreationTime;
	}
	
	
}
