package com.bootdo.sales.domain;

import java.io.Serializable;
import java.util.Date;



/**
 * 客户在线反馈信息表
 * 
 * @author sjr
 * @email 1992lcg@163.com
 * @date 2017-12-27 11:51:50
 */
public class OnlineFeedbackDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//客户反馈内容编号
	private String feedbackId;
	//反馈内容分类
	private Integer feedbackCategory;
	//姓名
	private String feedbackName;
	//手机
	private String feedbackPhoneNumber;
	//邮箱
	private String feedbackMailbox;
	//公司名称
	private String feedbackCompanyName;
	//使用产品
	private String feedbackProduct;
	//问题描述
	private String feedbackDescription;
	//在线反馈时间
	private Date feedbackTime;
	//附件
	private String feedbackAttachment;
	//反馈处理状态
	private String feedbackExcuteStatus;
	//反馈处理状态描述
	private String feedbackExcuteDescription;
	//反馈处理时间
	private Date feedbackExcuteTime;

	/**
	 * 设置：客户反馈内容编号
	 */
	public void setFeedbackId(String feedbackId) {
		this.feedbackId = feedbackId;
	}
	/**
	 * 获取：客户反馈内容编号
	 */
	public String getFeedbackId() {
		return feedbackId;
	}
	/**
	 * 设置：反馈内容分类
	 */
	public void setFeedbackCategory(Integer feedbackCategory) {
		this.feedbackCategory = feedbackCategory;
	}
	/**
	 * 获取：反馈内容分类
	 */
	public Integer getFeedbackCategory() {
		return feedbackCategory;
	}
	/**
	 * 设置：姓名
	 */
	public void setFeedbackName(String feedbackName) {
		this.feedbackName = feedbackName;
	}
	/**
	 * 获取：姓名
	 */
	public String getFeedbackName() {
		return feedbackName;
	}
	/**
	 * 设置：手机
	 */
	public void setFeedbackPhoneNumber(String feedbackPhoneNumber) {
		this.feedbackPhoneNumber = feedbackPhoneNumber;
	}
	/**
	 * 获取：手机
	 */
	public String getFeedbackPhoneNumber() {
		return feedbackPhoneNumber;
	}
	/**
	 * 设置：邮箱
	 */
	public void setFeedbackMailbox(String feedbackMailbox) {
		this.feedbackMailbox = feedbackMailbox;
	}
	/**
	 * 获取：邮箱
	 */
	public String getFeedbackMailbox() {
		return feedbackMailbox;
	}
	/**
	 * 设置：公司名称
	 */
	public void setFeedbackCompanyName(String feedbackCompanyName) {
		this.feedbackCompanyName = feedbackCompanyName;
	}
	/**
	 * 获取：公司名称
	 */
	public String getFeedbackCompanyName() {
		return feedbackCompanyName;
	}
	/**
	 * 设置：使用产品
	 */
	public void setFeedbackProduct(String feedbackProduct) {
		this.feedbackProduct = feedbackProduct;
	}
	/**
	 * 获取：使用产品
	 */
	public String getFeedbackProduct() {
		return feedbackProduct;
	}
	/**
	 * 设置：问题描述
	 */
	public void setFeedbackDescription(String feedbackDescription) {
		this.feedbackDescription = feedbackDescription;
	}
	/**
	 * 获取：问题描述
	 */
	public String getFeedbackDescription() {
		return feedbackDescription;
	}
	/**
	 * 设置：在线反馈时间
	 */
	public void setFeedbackTime(Date feedbackTime) {
		this.feedbackTime = feedbackTime;
	}
	/**
	 * 获取：在线反馈时间
	 */
	public Date getFeedbackTime() {
		return feedbackTime;
	}
	/**
	 * 设置：附件
	 */
	public void setFeedbackAttachment(String feedbackAttachment) {
		this.feedbackAttachment = feedbackAttachment;
	}
	/**
	 * 获取：附件
	 */
	public String getFeedbackAttachment() {
		return feedbackAttachment;
	}
	/**
	 * 设置：反馈处理状态
	 */
	public void setFeedbackExcuteStatus(String feedbackExcuteStatus) {
		this.feedbackExcuteStatus = feedbackExcuteStatus;
	}
	/**
	 * 获取：反馈处理状态
	 */
	public String getFeedbackExcuteStatus() {
		return feedbackExcuteStatus;
	}
	/**
	 * 设置：反馈处理状态描述
	 */
	public void setFeedbackExcuteDescription(String feedbackExcuteDescription) {
		this.feedbackExcuteDescription = feedbackExcuteDescription;
	}
	/**
	 * 获取：反馈处理状态描述
	 */
	public String getFeedbackExcuteDescription() {
		return feedbackExcuteDescription;
	}
	/**
	 * 设置：反馈处理时间
	 */
	public void setFeedbackExcuteTime(Date feedbackExcuteTime) {
		this.feedbackExcuteTime = feedbackExcuteTime;
	}
	/**
	 * 获取：反馈处理时间
	 */
	public Date getFeedbackExcuteTime() {
		return feedbackExcuteTime;
	}
}