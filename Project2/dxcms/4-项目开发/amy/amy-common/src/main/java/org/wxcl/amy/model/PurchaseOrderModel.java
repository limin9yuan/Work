package org.wxcl.amy.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

/**
 * @Auther: cxd
 * @Date: 2018/8/22 14:11
 * @Description: 采购订单
 */
public class PurchaseOrderModel {
    //主键
    private UUID id;
    //订单类型id（订单、发货通知单、到货通知单）
    private UUID typeId;
    //订单类型名称
    private String typeName;
    //审批状态id
    private UUID statusId;
    //审批状态名称
    private String statusName;
    //编制机构id
    private UUID authorCorpId;
    //编制机构名称
    private String authorCorpName;
    //编制部门id
    private UUID authorDeptId;
    //编制部门名称
    private String authorDeptName;
    //编制人id
    private UUID authorUserId;
    //编制人名称
    private String authorUserName;
    //执行机构id
    private UUID performCorpId;
    //执行机构名称
    private String performCorpName;
    //执行人id
    private UUID performUserId;
    //执行人
    private String performUserName;
    //单据编号
    private String code;
    //关联单据编号
    private String relatedCode;
    //单据名称
    private String name;
    //供应商id
    private UUID companyId;
    //供应商名称
    private String companyName;
    //发货单位id
    private UUID deliverCompanyId;
    //发货单位名称
    private String deliverCompanyName;
    //合同id
    private UUID contractId;
    //合同编号
    private String contractNo;
    //税率
    private double taxRate;
    //业务日期
    private Date businessDate;
    //总金额
    private BigDecimal totalMoney;
    //到货地址
    private String arriveAddress;
    //支付方式
    private String paymentType;
    //是否变更
    private Boolean isChanged;
    //是否已提交
    private Boolean isSubmit;
    //是否开始审批
    private Boolean IsApproveBegin;
    //是否审批完成
    private String isApproveFinish;
    //终止
    private Boolean isStoped;
    //是否在用
    private Boolean isActived;
    //是否已上传
    private Boolean isPushed;
    //生成日期
    private Date createDate;
    //生成人Id
    private UUID createUserId;
    //生成人
    private String createUserName;
    //备注
    private String remark;
    //打印人id
    private UUID printUserId;
    //打印人
    private String printUserName;
    //打印日期
    private Date printDate;
    //打印次数
    private Integer printTimes;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getTypeId() {
        return typeId;
    }

    public void setTypeId(UUID typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public UUID getStatusId() {
        return statusId;
    }

    public void setStatusId(UUID statusId) {
        this.statusId = statusId;
    }

    public String getStatusName() {
        return statusName;
    }

    public void setStatusName(String statusName) {
        this.statusName = statusName;
    }

    public UUID getAuthorCorpId() {
        return authorCorpId;
    }

    public void setAuthorCorpId(UUID authorCorpId) {
        this.authorCorpId = authorCorpId;
    }

    public String getAuthorCorpName() {
        return authorCorpName;
    }

    public void setAuthorCorpName(String authorCorpName) {
        this.authorCorpName = authorCorpName;
    }

    public UUID getAuthorDeptId() {
        return authorDeptId;
    }

    public void setAuthorDeptId(UUID authorDeptId) {
        this.authorDeptId = authorDeptId;
    }

    public String getAuthorDeptName() {
        return authorDeptName;
    }

    public void setAuthorDeptName(String authorDeptName) {
        this.authorDeptName = authorDeptName;
    }

    public UUID getAuthorUserId() {
        return authorUserId;
    }

    public void setAuthorUserId(UUID authorUserId) {
        this.authorUserId = authorUserId;
    }

    public String getAuthorUserName() {
        return authorUserName;
    }

    public void setAuthorUserName(String authorUserName) {
        this.authorUserName = authorUserName;
    }

    public UUID getPerformCorpId() {
        return performCorpId;
    }

    public void setPerformCorpId(UUID performCorpId) {
        this.performCorpId = performCorpId;
    }

    public String getPerformCorpName() {
        return performCorpName;
    }

    public void setPerformCorpName(String performCorpName) {
        this.performCorpName = performCorpName;
    }

    public UUID getPerformUserId() {
        return performUserId;
    }

    public void setPerformUserId(UUID performUserId) {
        this.performUserId = performUserId;
    }

    public String getPerformUserName() {
        return performUserName;
    }

    public void setPerformUserName(String performUserName) {
        this.performUserName = performUserName;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getRelatedCode() {
        return relatedCode;
    }

    public void setRelatedCode(String relatedCode) {
        this.relatedCode = relatedCode;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public UUID getCompanyId() {
        return companyId;
    }

    public void setCompanyId(UUID companyId) {
        this.companyId = companyId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public UUID getDeliverCompanyId() {
        return deliverCompanyId;
    }

    public void setDeliverCompanyId(UUID deliverCompanyId) {
        this.deliverCompanyId = deliverCompanyId;
    }

    public String getDeliverCompanyName() {
        return deliverCompanyName;
    }

    public void setDeliverCompanyName(String deliverCompanyName) {
        this.deliverCompanyName = deliverCompanyName;
    }

    public UUID getContractId() {
        return contractId;
    }

    public void setContractId(UUID contractId) {
        this.contractId = contractId;
    }

    public String getContractNo() {
        return contractNo;
    }

    public void setContractNo(String contractNo) {
        this.contractNo = contractNo;
    }

    public double getTaxRate() {
        return taxRate;
    }

    public void setTaxRate(double taxRate) {
        this.taxRate = taxRate;
    }

    public Date getBusinessDate() {
        return businessDate;
    }

    public void setBusinessDate(Date businessDate) {
        this.businessDate = businessDate;
    }

    public BigDecimal getTotalMoney() {
        return totalMoney;
    }

    public void setTotalMoney(BigDecimal totalMoney) {
        this.totalMoney = totalMoney;
    }

    public String getArriveAddress() {
        return arriveAddress;
    }

    public void setArriveAddress(String arriveAddress) {
        this.arriveAddress = arriveAddress;
    }

    public String getPaymentType() {
        return paymentType;
    }

    public void setPaymentType(String paymentType) {
        this.paymentType = paymentType;
    }

    public Boolean getChanged() {
        return isChanged;
    }

    public void setChanged(Boolean changed) {
        isChanged = changed;
    }

    public Boolean getSubmit() {
        return isSubmit;
    }

    public void setSubmit(Boolean submit) {
        isSubmit = submit;
    }

    public Boolean getApproveBegin() {
        return IsApproveBegin;
    }

    public void setApproveBegin(Boolean approveBegin) {
        IsApproveBegin = approveBegin;
    }

    public String getIsApproveFinish() {
        return isApproveFinish;
    }

    public void setIsApproveFinish(String isApproveFinish) {
        this.isApproveFinish = isApproveFinish;
    }

    public Boolean getStoped() {
        return isStoped;
    }

    public void setStoped(Boolean stoped) {
        isStoped = stoped;
    }

    public Boolean getActived() {
        return isActived;
    }

    public void setActived(Boolean actived) {
        isActived = actived;
    }

    public Boolean getPushed() {
        return isPushed;
    }

    public void setPushed(Boolean pushed) {
        isPushed = pushed;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public UUID getCreateUserId() {
        return createUserId;
    }

    public void setCreateUserId(UUID createUserId) {
        this.createUserId = createUserId;
    }

    public String getCreateUserName() {
        return createUserName;
    }

    public void setCreateUserName(String createUserName) {
        this.createUserName = createUserName;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public UUID getPrintUserId() {
        return printUserId;
    }

    public void setPrintUserId(UUID printUserId) {
        this.printUserId = printUserId;
    }

    public String getPrintUserName() {
        return printUserName;
    }

    public void setPrintUserName(String printUserName) {
        this.printUserName = printUserName;
    }

    public Date getPrintDate() {
        return printDate;
    }

    public void setPrintDate(Date printDate) {
        this.printDate = printDate;
    }

    public Integer getPrintTimes() {
        return printTimes;
    }

    public void setPrintTimes(Integer printTimes) {
        this.printTimes = printTimes;
    }
}
