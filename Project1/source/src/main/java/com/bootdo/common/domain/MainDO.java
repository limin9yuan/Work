package com.bootdo.common.domain;

import java.io.Serializable;

/**
 * Created by Mingyuan Li on 2018/4/25.
 * Package name: com.bootdo.common.domain.
 * Project name: source.
 */
public class MainDO implements Serializable {
    private static final long serialVersionUID = 1L;

    private String January;

    private String February;

    private String March;

    private String April;

    private String May;

    private String June;

    private String July;

    private String August;

    private String September;

    private String October;

    private String November;

    private String December;

    private String name;

    private String total;

    //流程被委托人
    private int recipient;
    //流程委托人
    private int principal;
    //已填报的工作日志
    private int log;
    //待填报的工作日志
    private int undoLog;

    public int getLog() {
        return log;
    }

    public void setLog(int log) {
        this.log = log;
    }

    public int getUndoLog() {
        return undoLog;
    }

    public void setUndoLog(int undoLog) {
        this.undoLog = undoLog;
    }

    public int getRecipient() {
        return recipient;
    }

    public void setRecipient(int recipient) {
        this.recipient = recipient;
    }

    public int getPrincipal() {
        return principal;
    }

    public void setPrincipal(int principal) {
        this.principal = principal;
    }

    public String getTotal() {
        return total;
    }

    public void setTotal(String total) {
        this.total = total;
    }

    public String getJanuary() {
        return January;
    }

    public void setJanuary(String january) {
        January = january;
    }

    public String getFebruary() {
        return February;
    }

    public void setFebruary(String february) {
        February = february;
    }

    public String getMarch() {
        return March;
    }

    public void setMarch(String march) {
        March = march;
    }

    public String getApril() {
        return April;
    }

    public void setApril(String april) {
        April = april;
    }

    public String getMay() {
        return May;
    }

    public void setMay(String may) {
        May = may;
    }

    public String getJune() {
        return June;
    }

    public void setJune(String june) {
        June = june;
    }

    public String getJuly() {
        return July;
    }

    public void setJuly(String july) {
        July = july;
    }

    public String getAugust() {
        return August;
    }

    public void setAugust(String august) {
        August = august;
    }

    public String getSeptember() {
        return September;
    }

    public void setSeptember(String september) {
        September = september;
    }

    public String getOctober() {
        return October;
    }

    public void setOctober(String october) {
        October = october;
    }

    public String getNovember() {
        return November;
    }

    public void setNovember(String november) {
        November = november;
    }

    public String getDecember() {
        return December;
    }

    public void setDecember(String december) {
        December = december;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
