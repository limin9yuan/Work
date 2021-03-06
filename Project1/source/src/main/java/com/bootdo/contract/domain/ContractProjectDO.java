package com.bootdo.contract.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 合同项目表
 * 
 * @author chglee
 * @email 1992lcg@163.com
 * @date 2018-07-25 13:58:59
 */
public class ContractProjectDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键
	private Integer contractProjectId;
	//合同id
	private String contractId;
	//项目id
	private String projectId;
	//
	private String projectName;

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	/**
	 * 设置：主键
	 */
	public void setContractProjectId(Integer contractProjectId) {
		this.contractProjectId = contractProjectId;
	}
	/**
	 * 获取：主键
	 */
	public Integer getContractProjectId() {
		return contractProjectId;
	}
	/**
	 * 设置：合同id
	 */
	public void setContractId(String contractId) {
		this.contractId = contractId;
	}
	/**
	 * 获取：合同id
	 */
	public String getContractId() {
		return contractId;
	}
	/**
	 * 设置：项目id
	 */
	public void setProjectId(String projectId) {
		this.projectId = projectId;
	}
	/**
	 * 获取：项目id
	 */
	public String getProjectId() {
		return projectId;
	}
}
