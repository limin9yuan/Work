package com.dx.client.model.contract;

import java.util.Date;
import java.util.UUID;

/**
 * @Auther: cxd
 * @Date: 2018/8/28
 * @Description:
 */
public class ContractDeliverBean {
    //主键
    private UUID id;
    //适用机构id
    private UUID deliverCompanyId;
    //适用机构名称
    private String deliverCompanyName;
    //创建时间
    private Date createDate;
    //是否在用
    private Boolean isActived;

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
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
}
