package org.wxcl.amy.model;

import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;

/**
 * @Auther: cxd
 * @Date: 2018/8/22 14:11
 * @Description: 采购订单明细
 */
public class PurchaseOrderDetailModel {
    //主键
    private UUID id;
    //采购订单id
    private UUID purchaseOrderId;
    //货源计划明细id
    private UUID allocationPlanDetailId;
    //物资id
    private UUID materialId;
    //物资编码
    private String materilaCode;
    //物资名称
    private String materialName;
    //单位名称
    private String materialUnitName;
    //规格
    private String specification;
    //材质
    private String texture;
    //物资字码
    private String materialSubArray;
    //数量
    private Double qty;
    //价格
    private BigDecimal price;
    //需求日期
    private Date requireDate;
    //到货日期
    private Date arriveDate;
    //需求计划编号列表
    private String requirePlanNoList;
    //生成日期
    private Date createDate;
    //是否在用
    private Boolean isActived;
    //描述
    private String description;
    //备注
    private String remark;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public UUID getPurchaseOrderId() {
        return purchaseOrderId;
    }

    public void setPurchaseOrderId(UUID purchaseOrderId) {
        this.purchaseOrderId = purchaseOrderId;
    }

    public UUID getAllocationPlanDetailId() {
        return allocationPlanDetailId;
    }

    public void setAllocationPlanDetailId(UUID allocationPlanDetailId) {
        this.allocationPlanDetailId = allocationPlanDetailId;
    }

    public UUID getMaterialId() {
        return materialId;
    }

    public void setMaterialId(UUID materialId) {
        this.materialId = materialId;
    }

    public String getMaterilaCode() {
        return materilaCode;
    }

    public void setMaterilaCode(String materilaCode) {
        this.materilaCode = materilaCode;
    }

    public String getMaterialName() {
        return materialName;
    }

    public void setMaterialName(String materialName) {
        this.materialName = materialName;
    }

    public String getMaterialUnitName() {
        return materialUnitName;
    }

    public void setMaterialUnitName(String materialUnitName) {
        this.materialUnitName = materialUnitName;
    }

    public String getSpecification() {
        return specification;
    }

    public void setSpecification(String specification) {
        this.specification = specification;
    }

    public String getTexture() {
        return texture;
    }

    public void setTexture(String texture) {
        this.texture = texture;
    }

    public String getMaterialSubArray() {
        return materialSubArray;
    }

    public void setMaterialSubArray(String materialSubArray) {
        this.materialSubArray = materialSubArray;
    }

    public Double getQty() {
        return qty;
    }

    public void setQty(Double qty) {
        this.qty = qty;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Date getRequireDate() {
        return requireDate;
    }

    public void setRequireDate(Date requireDate) {
        this.requireDate = requireDate;
    }

    public Date getArriveDate() {
        return arriveDate;
    }

    public void setArriveDate(Date arriveDate) {
        this.arriveDate = arriveDate;
    }

    public String getRequirePlanNoList() {
        return requirePlanNoList;
    }

    public void setRequirePlanNoList(String requirePlanNoList) {
        this.requirePlanNoList = requirePlanNoList;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }

    public Boolean getActived() {
        return isActived;
    }

    public void setActived(Boolean actived) {
        isActived = actived;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
}
