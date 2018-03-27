/*==============================================================*/
/* DBMS name:      MySQL 5.0                                    */
/* Created on:     2017/11/2 18:33:06                           */
/*==============================================================*/


drop table if exists Accounts_Payable;

drop table if exists Accounts_Receivable;

drop table if exists Approval_Assignment;

drop table if exists Approval_Expenses_Normal;

drop table if exists Approval_Expenses__Travel;

drop table if exists Approval_Payout;

drop table if exists Approval_Purchase;

drop table if exists Approval_Travel;

drop table if exists Budget_Expenses;

drop table if exists Budget_Labor;

drop table if exists Budget_Purchase;

drop table if exists Contract;

drop table if exists Contract_Additional_Records;

drop table if exists Contract_Delivery;

drop table if exists Delivery_Plan;

drop table if exists Function_Module;

drop table if exists Inner_Org_Dept;

drop table if exists Inner_Org_Employee;

drop table if exists Inner_Org_Job;

drop table if exists Inner_User;

drop table if exists Invoice;

drop table if exists Payment_Paid;

drop table if exists Payment_Received;

drop table if exists Project_Budget;

drop table if exists Purchase;

drop table if exists Sales_Bug_Category;

drop table if exists Sales_Business;

drop table if exists Sales_Company_Customer;

drop table if exists Sales_Competitor;

drop table if exists Sales_Customer_Child_Company;

drop table if exists Sales_Customer_Contact;

drop table if exists Sales_Customer_Dept;

drop table if exists Sales_Customer__Job;

drop table if exists Sales_Module_Category;

drop table if exists Sales_Online_FeedBack;

drop table if exists Sales_Product_Category;

drop table if exists Sales_Project;

drop table if exists Sales_Project_Consultation;

drop table if exists Sales_Record;

drop table if exists Sales_Record_Complaint;

drop table if exists Sales_Record_Service;

drop table if exists Sales_Requirement_Category;

drop table if exists TimeSheet;

drop table if exists Travel_Schedule;

drop table if exists User_Role;
drop table if exists Inner_Org_Dept;

/*==============================================================*/
/* Table: Accounts_Payable                                      */
/*==============================================================*/
create table Accounts_Payable
(
   Payable_ID           varchar(50) not null,
   Contract_ID          varchar(50),
   Payable_Date         datetime not null,
   Payable_Price        numeric(16,2) not null,
   Payable_Remarks      varchar(500),
   Payable_Operator     varchar(6) not null,
   Payable_Operate_Time timestamp not null,
   primary key (Payable_ID)
);

alter table Accounts_Payable comment '付款计划表';

alter table Accounts_Payable modify column Payable_ID varchar(50) comment '付款计划ID';

alter table Accounts_Payable modify column Contract_ID varchar(50) comment '合同编号';

alter table Accounts_Payable modify column Payable_Date datetime comment '付款计划时间';

alter table Accounts_Payable modify column Payable_Price numeric(16,2) comment '付款计划金额';

alter table Accounts_Payable modify column Payable_Remarks varchar(500) comment '备注';

alter table Accounts_Payable modify column Payable_Operator varchar(6) comment '操作人';

alter table Accounts_Payable modify column Payable_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Accounts_Receivable                                   */
/*==============================================================*/
create table Accounts_Receivable
(
   Receivable_ID        varchar(50) not null,
   Contract_ID          varchar(50),
   Receivable_Date      datetime not null,
   Receivable_Price     numeric(16,2) not null,
   Receivable_Owner     varchar(6) not null,
   Receivable_Remarks   varchar(500),
   Receivable_Operator  varchar(6) not null,
   Receivable_Operate_Time timestamp not null,
   primary key (Receivable_ID)
);

alter table Accounts_Receivable comment '收款计划表';

alter table Accounts_Receivable modify column Receivable_ID varchar(50) comment '收款计划ID';

alter table Accounts_Receivable modify column Contract_ID varchar(50) comment '合同编号';

alter table Accounts_Receivable modify column Receivable_Date datetime comment '收款计划时间';

alter table Accounts_Receivable modify column Receivable_Price numeric(16,2) comment '收款计划金额';

alter table Accounts_Receivable modify column Receivable_Owner varchar(6) comment '收款负责人';

alter table Accounts_Receivable modify column Receivable_Remarks varchar(500) comment '备注';

alter table Accounts_Receivable modify column Receivable_Operator varchar(6) comment '操作人';

alter table Accounts_Receivable modify column Receivable_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Approval_Assignment                                   */
/*==============================================================*/
create table Approval_Assignment
(
   Assignment_ID        varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Business_ID          varchar(50) not null,
   Project_ID           varchar(50),
   Assignment_Project_Cagegory varchar(20),
   Assignment_PM        varchar(6),
   Assignment_Task_Name varchar(50) not null,
   Assignment_Begin_Time datetime not null,
   Assignment_End_Time  datetime not null,
   Assignment_Dept      varchar(20) not null,
   Assignment_Principal varchar(6) not null,
   Assignment_Recipient_Dept varchar(20) not null,
   Assignment_Recipient varchar(6) not null,
   Assignment_Task_Description varchar(1000) not null,
   Assignment_Task_Performance varchar(200) not null,
   Assignment_Task_Finish_Time datetime not null,
   Assignment_Remarks   varchar(200),
   Assignment_Approval_Status int(1) not null,
   Assignment_Operator  varchar(6) not null,
   Assignment_Operate_Time timestamp not null,
   primary key (Assignment_ID)
);

alter table Approval_Assignment comment '任务委托表';

alter table Approval_Assignment modify column Assignment_ID varchar(50) comment '任务委托编号';

alter table Approval_Assignment modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Approval_Assignment modify column Business_ID varchar(50) comment '业务编号';

alter table Approval_Assignment modify column Project_ID varchar(50) comment '项目编号';

alter table Approval_Assignment modify column Assignment_Project_Cagegory varchar(20) comment '项目类别';

alter table Approval_Assignment modify column Assignment_PM varchar(6) comment '项目经理';

alter table Approval_Assignment modify column Assignment_Task_Name varchar(50) comment '任务名称';

alter table Approval_Assignment modify column Assignment_Begin_Time datetime comment '任务委托时间';

alter table Approval_Assignment modify column Assignment_End_Time datetime comment '要求完成时间';

alter table Approval_Assignment modify column Assignment_Dept varchar(20) comment '委托部门';

alter table Approval_Assignment modify column Assignment_Principal varchar(6) comment '委托人';

alter table Approval_Assignment modify column Assignment_Recipient_Dept varchar(20) comment '承接部门';

alter table Approval_Assignment modify column Assignment_Recipient varchar(6) comment '承接人';

alter table Approval_Assignment modify column Assignment_Task_Description varchar(1000) comment '委托任务描述';

alter table Approval_Assignment modify column Assignment_Task_Performance varchar(200) comment '任务完成情况';

alter table Approval_Assignment modify column Assignment_Task_Finish_Time datetime comment '任务完成时间';

alter table Approval_Assignment modify column Assignment_Remarks varchar(200) comment '备注';

alter table Approval_Assignment modify column Assignment_Approval_Status int(1) comment '审批状态';

alter table Approval_Assignment modify column Assignment_Operator varchar(6) comment '操作人';

alter table Approval_Assignment modify column Assignment_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Approval_Expenses_Normal                              */
/*==============================================================*/
create table Approval_Expenses_Normal
(
   Expenses_Normal      varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Business_ID          varchar(50) not null,
   Project_ID           varchar(50),
   Expenses_Normal_Name varchar(6) not null,
   Expenses_Normal_Reason varchar(500) not null,
   Expenses_Normal_Price numeric(9,1) not null,
   Expenses_Normal_Result varchar(10) not null,
   Expenses_Normal_RelatedID varchar(50),
   Expenses_Normal_Rmarks varchar(200),
   Expenses_Normal_Status int(1) not null,
   Expenses_Normal_Operator varchar(6) not null,
   Expenses_Normal_Opt_Time timestamp not null,
   primary key (Expenses_Normal)
);

alter table Approval_Expenses_Normal comment '普通报销申请信息表';

alter table Approval_Expenses_Normal modify column Expenses_Normal varchar(50) comment '报销申请编号';

alter table Approval_Expenses_Normal modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Approval_Expenses_Normal modify column Business_ID varchar(50) comment '业务编号';

alter table Approval_Expenses_Normal modify column Project_ID varchar(50) comment '项目编号';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Name varchar(6) comment '申请人姓名';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Reason varchar(500) comment '支付原因';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Price numeric(9,1) comment '报销金额';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Result varchar(10) comment '审票结果';

alter table Approval_Expenses_Normal modify column Expenses_Normal_RelatedID varchar(50) comment '关联请款申请编号';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Rmarks varchar(200) comment '备注';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Status int(1) comment '审批状态';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Operator varchar(6) comment '操作人';

alter table Approval_Expenses_Normal modify column Expenses_Normal_Opt_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Approval_Expenses__Travel                             */
/*==============================================================*/
create table Approval_Expenses__Travel
(
   Expenses_Travel_ID   varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Business_ID          varchar(50) not null,
   Project_ID           varchar(50),
   Expenses_Travel_Name varchar(6) not null,
   Expenses_Travel_Task varchar(1000) not null,
   Expenses_Travel_Allowance numeric(10,2) not null,
   Expenses_Travel_Type varchar(10),
   Expenses_Travel_Price numeric(10,2),
   Expenses_Travel_TID  varchar(50),
   Expenses_Travel_PayID varchar(50),
   Expenses_Travel_Pay_Price numeric(10,2),
   Expenses_Travel_Pay_Mode varchar(10) not null,
   Expenses_Travel_Bank varchar(50),
   Expenses_Travel_Card_Num varchar(25),
   Expenses_Travel_Remarks varchar(200),
   Expenses_Travel_Status int(1) not null,
   Expenses_Travel_Operator varchar(6) not null,
   Expenses_Travel_Opt_Time timestamp not null,
   primary key (Expenses_Travel_ID)
);

alter table Approval_Expenses__Travel comment '差旅报销申请表';

alter table Approval_Expenses__Travel modify column Expenses_Travel_ID varchar(50) comment '报销申请编号';

alter table Approval_Expenses__Travel modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Approval_Expenses__Travel modify column Business_ID varchar(50) comment '业务编号';

alter table Approval_Expenses__Travel modify column Project_ID varchar(50) comment '项目编号';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Name varchar(6) comment '申请人姓名';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Task varchar(1000) comment '出差任务';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Allowance numeric(10,2) comment '出差补助';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Type varchar(10) comment '其他费用类型';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Price numeric(10,2) comment '其他费用金额';

alter table Approval_Expenses__Travel modify column Expenses_Travel_TID varchar(50) comment '关联出差申请编号';

alter table Approval_Expenses__Travel modify column Expenses_Travel_PayID varchar(50) comment '关联请款申请编号';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Pay_Price numeric(10,2) comment '预借金额';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Pay_Mode varchar(10) comment '结算方式';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Bank varchar(50) comment '收款人银行';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Card_Num varchar(25) comment '卡号';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Remarks varchar(200) comment '备注';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Status int(1) comment '审批状态';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Operator varchar(6) comment '操作人';

alter table Approval_Expenses__Travel modify column Expenses_Travel_Opt_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Approval_Payout                                       */
/*==============================================================*/
create table Approval_Payout
(
   Payout_ID            varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Business_ID          varchar(50) not null,
   Project_ID           varchar(50),
   Payout_Person        varchar(6) not null,
   Payout_Useage        varchar(500) not null,
   Payout_Price         numeric(9,1) not null,
   Payout_Means         varchar(10) not null,
   Payout_Beneficiary_Bank varchar(50),
   Payout_Card_Number   varchar(25),
   Payout_Related_Contract_ID varchar(50),
   Payout_Result        varchar(6),
   Payout_Remarks       varchar(200),
   Payout_Approval_Status int(1) not null,
   Payout_Operator      varchar(6) not null,
   Payout_Operate_Time  timestamp not null,
   primary key (Payout_ID)
);

alter table Approval_Payout comment '请款申请表';

alter table Approval_Payout modify column Payout_ID varchar(50) comment '请款申请编号';

alter table Approval_Payout modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Approval_Payout modify column Business_ID varchar(50) comment '业务编号';

alter table Approval_Payout modify column Project_ID varchar(50) comment '项目编号';

alter table Approval_Payout modify column Payout_Person varchar(6) comment '申请人姓名';

alter table Approval_Payout modify column Payout_Useage varchar(500) comment '请款用途';

alter table Approval_Payout modify column Payout_Price numeric(9,1) comment '请款金额';

alter table Approval_Payout modify column Payout_Means varchar(10) comment '结算方式';

alter table Approval_Payout modify column Payout_Beneficiary_Bank varchar(50) comment '收款人银行';

alter table Approval_Payout modify column Payout_Card_Number varchar(25) comment '银行卡号';

alter table Approval_Payout modify column Payout_Related_Contract_ID varchar(50) comment '关联出差申请编号';

alter table Approval_Payout modify column Payout_Result varchar(6) comment '实际请款结果';

alter table Approval_Payout modify column Payout_Remarks varchar(200) comment '备注';

alter table Approval_Payout modify column Payout_Approval_Status int(1) comment '审批状态';

alter table Approval_Payout modify column Payout_Operator varchar(6) comment '操作人';

alter table Approval_Payout modify column Payout_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Approval_Purchase                                     */
/*==============================================================*/
create table Approval_Purchase
(
   Purchase_ID          varchar(50) not null,
   Project_ID           varchar(50) not null,
   Purchase_Dept        varchar(20) not null,
   Purchase_Person      varchar(6) not null,
   Purchase_Date        datetime not null,
   Purchase_Name        varchar(50) not null,
   Purchase_Brand       varchar(50) not null,
   Purchase_Mode        varchar(50),
   Purchase_Config      varchar(200),
   Purchase_Unit        varchar(10) not null,
   Purchase_Number      int(10) not null,
   Purchase_Unit_Price  numeric(10,2) not null,
   Purchase_Total_Price numeric(10,2) not null,
   Purchase_Delivery_Time datetime not null,
   Purchase_Delivery_Place varchar(50) not null,
   Purchase_Consignee   varchar(6) not null,
   Purchase_Phone_Number varchar(20) not null,
   Purchase_Remarks     varchar(200),
   Purchase_Approval_Status int(1) not null,
   Purchase_Operator    varchar(6) not null,
   Purchase_Operate_Time timestamp not null,
   primary key (Purchase_ID)
);

alter table Approval_Purchase comment '采购申请表';

alter table Approval_Purchase modify column Purchase_ID varchar(50) comment '采购申请编号';

alter table Approval_Purchase modify column Project_ID varchar(50) comment '项目编号';

alter table Approval_Purchase modify column Purchase_Dept varchar(20) comment '申购部门';

alter table Approval_Purchase modify column Purchase_Person varchar(6) comment '申购人';

alter table Approval_Purchase modify column Purchase_Date datetime comment '申购时间';

alter table Approval_Purchase modify column Purchase_Name varchar(50) comment '物品名称';

alter table Approval_Purchase modify column Purchase_Brand varchar(50) comment '品牌';

alter table Approval_Purchase modify column Purchase_Mode varchar(50) comment '型号';

alter table Approval_Purchase modify column Purchase_Config varchar(200) comment '规格/配置';

alter table Approval_Purchase modify column Purchase_Unit varchar(10) comment '单位';

alter table Approval_Purchase modify column Purchase_Number int(10) comment '数量';

alter table Approval_Purchase modify column Purchase_Unit_Price numeric(10,2) comment '单价';

alter table Approval_Purchase modify column Purchase_Total_Price numeric(10,2) comment '总价';

alter table Approval_Purchase modify column Purchase_Delivery_Time datetime comment '要求交货时间';

alter table Approval_Purchase modify column Purchase_Delivery_Place varchar(50) comment '交货地点';

alter table Approval_Purchase modify column Purchase_Consignee varchar(6) comment '收货人';

alter table Approval_Purchase modify column Purchase_Phone_Number varchar(20) comment '联系电话';

alter table Approval_Purchase modify column Purchase_Remarks varchar(200) comment '备注';

alter table Approval_Purchase modify column Purchase_Approval_Status int(1) comment '审批状态';

alter table Approval_Purchase modify column Purchase_Operator varchar(6) comment '操作人';

alter table Approval_Purchase modify column Purchase_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Approval_Travel                                       */
/*==============================================================*/
create table Approval_Travel
(
   Travel_ID            varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Project_ID           varchar(50),
   Business_ID          varchar(50) not null,
   Travel_Name          varchar(6) not null,
   Travel_Place_Issue   varchar(20) not null,
   Travel_Place_Ended   varchar(20) not null,
   Travel_Partner       varchar(6),
   Travel_Departure_Date datetime not null,
   Travel_Return_Date   datetime not null,
   Travel_Plan_Cost_Type varchar(20) not null,
   Travel_Visit_Mode    varchar(20) not null,
   Travel_Plan_Task     varchar(1000) not null,
   Travel_Actual_Performance varchar(10),
   Travel_Uncompleted_Cause varchar(1000),
   Travel_Task_Confirm  varchar(10),
   Travel_Approval_Status int(1) not null,
   Travel_Operator      varchar(6) not null,
   Travel_Operate_Time  timestamp not null,
   primary key (Travel_ID)
);

alter table Approval_Travel comment '出差申请表';

alter table Approval_Travel modify column Travel_ID varchar(50) comment '出差申请编号';

alter table Approval_Travel modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Approval_Travel modify column Project_ID varchar(50) comment '项目编号';

alter table Approval_Travel modify column Business_ID varchar(50) comment '业务编号';

alter table Approval_Travel modify column Travel_Name varchar(6) comment '出差人姓名';

alter table Approval_Travel modify column Travel_Place_Issue varchar(20) comment '出发地';

alter table Approval_Travel modify column Travel_Place_Ended varchar(20) comment '目的地';

alter table Approval_Travel modify column Travel_Partner varchar(6) comment '同行人';

alter table Approval_Travel modify column Travel_Departure_Date datetime comment '拟出差时间';

alter table Approval_Travel modify column Travel_Return_Date datetime comment '拟返程时间';

alter table Approval_Travel modify column Travel_Plan_Cost_Type varchar(20) comment '预计费用类别';

alter table Approval_Travel modify column Travel_Visit_Mode varchar(20) comment '预计交通方式';

alter table Approval_Travel modify column Travel_Plan_Task varchar(1000) comment '计划任务信息';

alter table Approval_Travel modify column Travel_Actual_Performance varchar(10) comment '实际完成结果';

alter table Approval_Travel modify column Travel_Uncompleted_Cause varchar(1000) comment '未完成原因';

alter table Approval_Travel modify column Travel_Task_Confirm varchar(10) comment '出差任务确认';

alter table Approval_Travel modify column Travel_Approval_Status int(1) comment '审批状态';

alter table Approval_Travel modify column Travel_Operator varchar(6) comment '创建人';

alter table Approval_Travel modify column Travel_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Budget_Expenses                                       */
/*==============================================================*/
create table Budget_Expenses
(
   Expenses_ID          varchar(50) not null,
   Budget_ID            varchar(50),
   Expenses_Type        varchar(20) not null,
   Expenses_Plan_Price  numeric(10,2) not null,
   Expenses_Plan_Description varchar(200),
   Expenses_Customer_Rate numeric(5,2) not null,
   Expenses_Project_Rate numeric(5,2) not null,
   Expenses_Remarks     varchar(200),
   Expenses_Operator    varchar(6) not null,
   Expenses_Operate_TIme timestamp not null,
   primary key (Expenses_ID)
);

alter table Budget_Expenses comment '项目报销预算表';

alter table Budget_Expenses modify column Expenses_ID varchar(50) comment '项目报销预算编号';

alter table Budget_Expenses modify column Budget_ID varchar(50) comment '项目预算编号';

alter table Budget_Expenses modify column Expenses_Type varchar(20) comment '报销类型';

alter table Budget_Expenses modify column Expenses_Plan_Price numeric(10,2) comment '报销金额预估';

alter table Budget_Expenses modify column Expenses_Plan_Description varchar(200) comment '预估说明';

alter table Budget_Expenses modify column Expenses_Customer_Rate numeric(5,2) comment '客户承担';

alter table Budget_Expenses modify column Expenses_Project_Rate numeric(5,2) comment '项目组承担';

alter table Budget_Expenses modify column Expenses_Remarks varchar(200) comment '备注';

alter table Budget_Expenses modify column Expenses_Operator varchar(6) comment '操作人';

alter table Budget_Expenses modify column Expenses_Operate_TIme timestamp comment '操作时间';

/*==============================================================*/
/* Table: Budget_Labor                                          */
/*==============================================================*/
create table Budget_Labor
(
   Labor_ID             varchar(50) not null,
   Budget_ID            varchar(50),
   Employee_ID          varchar(50) not null,
   Labor_Begin_Time     datetime not null,
   Labor_End_Time       datetime not null,
   Labor_Total_Day_Num  int(4) not null,
   Labor_Rate           numeric(5,2) not null,
   Labor_Total_Hour_Num int(10) not null,
   Labor_Total_Cost     numeric(12,2) not null,
   Labor_Remarks        varchar(200),
   Labor_Operator       varchar(6) not null,
   Labor_Operate_TIme   timestamp not null,
   primary key (Labor_ID)
);

alter table Budget_Labor comment '项目人力安排表';

alter table Budget_Labor modify column Labor_ID varchar(50) comment '项目人力安排编号';

alter table Budget_Labor modify column Budget_ID varchar(50) comment '项目预算编号';

alter table Budget_Labor modify column Employee_ID varchar(50) comment '员工编号';

alter table Budget_Labor modify column Labor_Begin_Time datetime comment '投入开始时间';

alter table Budget_Labor modify column Labor_End_Time datetime comment '投入结束时间';

alter table Budget_Labor modify column Labor_Total_Day_Num int(4) comment '合计天数';

alter table Budget_Labor modify column Labor_Rate numeric(5,2) comment '投入百分比';

alter table Budget_Labor modify column Labor_Total_Hour_Num int(10) comment '合计工时数';

alter table Budget_Labor modify column Labor_Total_Cost numeric(12,2) comment '人工成本合计';

alter table Budget_Labor modify column Labor_Remarks varchar(200) comment '备注';

alter table Budget_Labor modify column Labor_Operator varchar(6) comment '操作人';

alter table Budget_Labor modify column Labor_Operate_TIme timestamp comment '操作时间';

/*==============================================================*/
/* Table: Budget_Purchase                                       */
/*==============================================================*/
create table Budget_Purchase
(
   Budget_ID            varchar(50),
   Purchase_ID          varchar(50) not null,
   Purchase_Type        varchar(20) not null,
   Purchase_Price       numeric(10,2) not null,
   Purchase_Description varchar(200),
   Purchase_Customer_Rate numeric(5,2) not null,
   Purchase_Project_Rate numeric(5,2) not null,
   Purchase_Remarks     varchar(200),
   Purchase_Operator    varchar(6) not null,
   Purchase_OPerate_Time timestamp not null,
   primary key (Purchase_ID)
);

alter table Budget_Purchase comment '项目采购预算表';

alter table Budget_Purchase modify column Budget_ID varchar(50) comment '项目预算编号';

alter table Budget_Purchase modify column Purchase_ID varchar(50) comment '项目采购预算编号';

alter table Budget_Purchase modify column Purchase_Type varchar(20) comment '采购类型';

alter table Budget_Purchase modify column Purchase_Price numeric(10,2) comment '采购金额预估';

alter table Budget_Purchase modify column Purchase_Description varchar(200) comment '预估说明';

alter table Budget_Purchase modify column Purchase_Customer_Rate numeric(5,2) comment '客户承担';

alter table Budget_Purchase modify column Purchase_Project_Rate numeric(5,2) comment '项目组承担';

alter table Budget_Purchase modify column Purchase_Remarks varchar(200) comment '备注';

alter table Budget_Purchase modify column Purchase_Operator varchar(6) comment '操作人';

alter table Budget_Purchase modify column Purchase_OPerate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Contract                                              */
/*==============================================================*/
create table Contract
(
   Contract_ID          varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Business_ID          varchar(50) not null,
   Contract_Name        varchar(50) not null,
   Contract_Applicant_Name varchar(6) not null,
   Contract_Build_Company varchar(50) not null,
   Contract_Type        varchar(20) not null,
   Contract_Category    varchar(20) not null,
   Contract_Total_Price numeric(16,2) not null,
   Contract_Dept        varchar(20) not null,
   Contract_Applicant   varchar(6) not null,
   Contract_Draft_Person varchar(6) not null,
   Contract_Sales       varchar(6) not null,
   Contract_Commit_Time datetime not null,
   Contract_Related_ID  varchar(50),
   Contract_Invoice_Type varchar(20) not null,
   Contract_Invoice_Time datetime,
   Contract_Hardware_List longblob,
   Contract_Software_List longblob,
   Contract_Project_Management varchar(6) not null,
   Contract_Remarks     varchar(200),
   Contract_Attachment  longblob,
   Contract_Approval_Status int(1) not null,
   Contract_Operator    varchar(50) not null,
   Contract_Operate_Time timestamp not null,
   primary key (Contract_ID)
);

alter table Contract comment '合同信息表';

alter table Contract modify column Contract_ID varchar(50) comment '合同编号';

alter table Contract modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Contract modify column Business_ID varchar(50) comment '业务编号';

alter table Contract modify column Contract_Name varchar(50) comment '合同名称';

alter table Contract modify column Contract_Applicant_Name varchar(6) comment '申请人姓名';

alter table Contract modify column Contract_Build_Company varchar(50) comment '建设单位';

alter table Contract modify column Contract_Type varchar(20) comment '合同类型';

alter table Contract modify column Contract_Category varchar(20) comment '合同种类';

alter table Contract modify column Contract_Total_Price numeric(16,2) comment '合同总金额';

alter table Contract modify column Contract_Dept varchar(20) comment '合同发起部门';

alter table Contract modify column Contract_Applicant varchar(6) comment '业务发起人';

alter table Contract modify column Contract_Draft_Person varchar(6) comment '合同拟定人';

alter table Contract modify column Contract_Sales varchar(6) comment '销售负责人';

alter table Contract modify column Contract_Commit_Time datetime comment '提交评审时间';

alter table Contract modify column Contract_Related_ID varchar(50) comment '关联合同编号';

alter table Contract modify column Contract_Invoice_Type varchar(20) comment '发票类型';

alter table Contract modify column Contract_Invoice_Time datetime comment '预计开具发票时间';

alter table Contract modify column Contract_Hardware_List longblob comment '硬件设备明细表';

alter table Contract modify column Contract_Software_List longblob comment '软件功能列表';

alter table Contract modify column Contract_Project_Management varchar(6) comment '项目经理';

alter table Contract modify column Contract_Remarks varchar(200) comment '合同信息备注';

alter table Contract modify column Contract_Attachment longblob comment '附件';

alter table Contract modify column Contract_Approval_Status int(1) comment '审批状态';

alter table Contract modify column Contract_Operator varchar(50) comment '操作人';

alter table Contract modify column Contract_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Contract_Additional_Records                           */
/*==============================================================*/
create table Contract_Additional_Records
(
   Record_ID            varchar(50) not null,
   Contract_ID          varchar(50),
   Record_Name          varchar(6) not null,
   Record_Bulid_Company varchar(50) not null,
   Record_Total_Price   numeric(16,2) not null,
   Record_Description   varchar(1000) not null,
   Record_Reason        varchar(1000) not null,
   Record_Sales         varchar(6) not null,
   Record_Attachment    longblob not null,
   Record_Related_Contract_ID varchar(50),
   Record_Hardware_Equipment_List longblob,
   Record_Software_Function_List longblob,
   Record_Remarks       varchar(200),
   Record_Approval_Status int(1) not null,
   Record_Operator      varchar(6) not null,
   Record_Commit_Time   timestamp not null,
   primary key (Record_ID)
);

alter table Contract_Additional_Records comment '合同增补记录';

alter table Contract_Additional_Records modify column Record_ID varchar(50) comment '合同增补记录编号';

alter table Contract_Additional_Records modify column Contract_ID varchar(50) comment '合同编号';

alter table Contract_Additional_Records modify column Record_Name varchar(6) comment '申请人姓名';

alter table Contract_Additional_Records modify column Record_Bulid_Company varchar(50) comment '建设单位';

alter table Contract_Additional_Records modify column Record_Total_Price numeric(16,2) comment '增补总金额';

alter table Contract_Additional_Records modify column Record_Description varchar(1000) comment '增补内容描述';

alter table Contract_Additional_Records modify column Record_Reason varchar(1000) comment '增补原因';

alter table Contract_Additional_Records modify column Record_Sales varchar(6) comment '销售负责人';

alter table Contract_Additional_Records modify column Record_Attachment longblob comment '正文附件';

alter table Contract_Additional_Records modify column Record_Related_Contract_ID varchar(50) comment '关联合同编号';

alter table Contract_Additional_Records modify column Record_Hardware_Equipment_List longblob comment '硬件设备明细表';

alter table Contract_Additional_Records modify column Record_Software_Function_List longblob comment '软件功能列表';

alter table Contract_Additional_Records modify column Record_Remarks varchar(200) comment '备注';

alter table Contract_Additional_Records modify column Record_Approval_Status int(1) comment '审批状态';

alter table Contract_Additional_Records modify column Record_Operator varchar(6) comment '创建人';

alter table Contract_Additional_Records modify column Record_Commit_Time timestamp comment '提交评审时间';

/*==============================================================*/
/* Table: Contract_Delivery                                     */
/*==============================================================*/
create table Contract_Delivery
(
   Delivery_ID          varchar(50) not null,
   Contract_ID          varchar(50),
   Delivery_Person_Name varchar(6) not null,
   Delivery_Date        datetime not null,
   Delivery_Content     varchar(1000) not null,
   Delivery_Status      varchar(10) not null,
   Delivery_Attachment  longblob,
   Delivery_Rmarks      varchar(200),
   Delivery_Operator    varchar(6) not null,
   Delivery_Operate_Time timestamp not null,
   primary key (Delivery_ID)
);

alter table Contract_Delivery comment '合同交付信息表';

alter table Contract_Delivery modify column Delivery_ID varchar(50) comment '合同交付信息ID';

alter table Contract_Delivery modify column Contract_ID varchar(50) comment '合同编号';

alter table Contract_Delivery modify column Delivery_Person_Name varchar(6) comment '交付人';

alter table Contract_Delivery modify column Delivery_Date datetime comment '交付时间';

alter table Contract_Delivery modify column Delivery_Content varchar(1000) comment '交付内容';

alter table Contract_Delivery modify column Delivery_Status varchar(10) comment '合同状态';

alter table Contract_Delivery modify column Delivery_Attachment longblob comment '附件';

alter table Contract_Delivery modify column Delivery_Rmarks varchar(200) comment '备注';

alter table Contract_Delivery modify column Delivery_Operator varchar(6) comment '操作人';

alter table Contract_Delivery modify column Delivery_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Delivery_Plan                                         */
/*==============================================================*/
create table Delivery_Plan
(
   Plan_ID              varchar(50) not null,
   Contract_ID          varchar(50),
   Plan_Delivery_Date   datetime not null,
   Plan_Delivery_Content varchar(1000) not null,
   Plan_Attachment      longblob,
   Plan_Remarks         varchar(500),
   Plan_Operator        varchar(6) not null,
   Plan_Operate_Time    timestamp not null,
   primary key (Plan_ID)
);

alter table Delivery_Plan comment '交付计划表';

alter table Delivery_Plan modify column Plan_ID varchar(50) comment '交付计划ID';

alter table Delivery_Plan modify column Contract_ID varchar(50) comment '合同编号';

alter table Delivery_Plan modify column Plan_Delivery_Date datetime comment '计划交付时间';

alter table Delivery_Plan modify column Plan_Delivery_Content varchar(1000) comment '计划交付内容';

alter table Delivery_Plan modify column Plan_Attachment longblob comment '附件';

alter table Delivery_Plan modify column Plan_Remarks varchar(500) comment '备注';

alter table Delivery_Plan modify column Plan_Operator varchar(6) comment '操作人';

alter table Delivery_Plan modify column Plan_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Function_Module                                       */
/*==============================================================*/
create table Function_Module
(
   Module_ID            varchar(50) not null,
   Module_Name          varchar(50) not null,
   Module_Page          varchar(50) not null,
   Module_Operator      varchar(6) not null,
   Module_Operate_Time  timestamp not null,
   primary key (Module_ID)
);

alter table Function_Module comment '功能模块表';

alter table Function_Module modify column Module_ID varchar(50) comment '模块ID';

alter table Function_Module modify column Module_Name varchar(50) comment '模块名称';

alter table Function_Module modify column Module_Page varchar(50) comment '对应页面';

alter table Function_Module modify column Module_Operator varchar(6) comment '操作人';

alter table Function_Module modify column Module_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Inner_Org_Dept                                        */
/*==============================================================*/
create table Inner_Org_Dept
(
   Dept_ID              varchar(16) not null,
   Dept_Name            varchar(100) not null,
   Dept_Description     varchar(200),
   Dept_Create_Date     datetime not null,
   Dept_Parent          varchar(100),
   Dept_Remarks         varchar(200),
   Dept_Operator        varchar(6),
   Dept_Operate_Time    timestamp,
   primary key (Dept_ID)
);

alter table Inner_Org_Dept comment '内部组织机构_部门';

alter table Inner_Org_Dept modify column Dept_ID varchar(16) comment '部门编号';

alter table Inner_Org_Dept modify column Dept_Name varchar(100) comment '部门名称';

alter table Inner_Org_Dept modify column Dept_Description varchar(200) comment '部门描述';

alter table Inner_Org_Dept modify column Dept_Create_Date datetime comment '创建时间';

alter table Inner_Org_Dept modify column Dept_Parent varchar(100) comment '上级部门';

alter table Inner_Org_Dept modify column Dept_Remarks varchar(200) comment '备注';

alter table Inner_Org_Dept modify column Dept_Operator varchar(6) comment '操作人';

alter table Inner_Org_Dept modify column Dept_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Inner_Org_Employee                                    */
/*==============================================================*/
create table Inner_Org_Employee
(
   Employee_ID          varchar(16) not null,
   Dept_ID              varchar(16),
   Job_ID               varchar(16),
   Inner_User_ID        varchar(16),
   User_Role_ID         varchar(8),
   Module_ID            varchar(32),
   Employee_Name        varchar(6) not null,
   Employee_Dept        varchar(100) not null,
   Employee_Center      varchar(100),
   Employee_Join_Date   datetime not null,
   Employee_Salary_Hour numeric(6,2) not null,
   Employee_Status      int(1) not null,
   Employee_Phone_Number varchar(50) not null,
   Employee_Inner_Phone_Number varchar(4),
   Employee_QQ          varchar(50) not null,
   Employee_Remarks     varchar(200),
   Employee_Operator    varchar(6),
   Employee_Operate_Time timestamp,
   primary key (Employee_ID)
);

alter table Inner_Org_Employee comment '内部组织机构_员工表';

alter table Inner_Org_Employee modify column Employee_ID varchar(16) comment '员工工号';

alter table Inner_Org_Employee modify column Dept_ID varchar(16) comment '部门编号';

alter table Inner_Org_Employee modify column Job_ID varchar(16) comment '岗位编号';

alter table Inner_Org_Employee modify column Inner_User_ID varchar(16) comment '内部账号ID';

alter table Inner_Org_Employee modify column User_Role_ID varchar(8) comment '用户角色ID';

alter table Inner_Org_Employee modify column Module_ID varchar(32) comment '模块ID';

alter table Inner_Org_Employee modify column Employee_Name varchar(6) comment '员工姓名';

alter table Inner_Org_Employee modify column Employee_Dept varchar(100) comment '部门';

alter table Inner_Org_Employee modify column Employee_Center varchar(100) comment '所属中心';

alter table Inner_Org_Employee modify column Employee_Join_Date datetime comment '入职时间';

alter table Inner_Org_Employee modify column Employee_Salary_Hour numeric(6,2) comment '时薪';

alter table Inner_Org_Employee modify column Employee_Status int(1) comment '员工状态';

alter table Inner_Org_Employee modify column Employee_Phone_Number varchar(50) comment '电话';

alter table Inner_Org_Employee modify column Employee_Inner_Phone_Number varchar(4) comment '电话小号';

alter table Inner_Org_Employee modify column Employee_QQ varchar(50) comment 'QQ';

alter table Inner_Org_Employee modify column Employee_Remarks varchar(200) comment '备注';

alter table Inner_Org_Employee modify column Employee_Operator varchar(6) comment '操作人';

alter table Inner_Org_Employee modify column Employee_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Inner_Org_Job                                         */
/*==============================================================*/
create table Inner_Org_Job
(
   Job_ID               varchar(16) not null,
   Dept_ID              varchar(16),
   Job_Name             varchar(50) not null,
   Job_Dept             varchar(100),
   Job_Rank             varchar(50) not null,
   Job_Rank_Description varchar(200),
   Job_Descrription     varchar(200),
   Job_Remarks          varchar(200),
   Job_Operator         varchar(6),
   Job_Operate_Time     timestamp,
   primary key (Job_ID)
);

alter table Inner_Org_Job comment '内部组织机构_岗位';

alter table Inner_Org_Job modify column Job_ID varchar(16) comment '岗位编号';

alter table Inner_Org_Job modify column Dept_ID varchar(16) comment '部门编号';

alter table Inner_Org_Job modify column Job_Name varchar(50) comment '岗位名称';

alter table Inner_Org_Job modify column Job_Dept varchar(100) comment '所属部门';

alter table Inner_Org_Job modify column Job_Rank varchar(50) comment '级别名称';

alter table Inner_Org_Job modify column Job_Rank_Description varchar(200) comment '级别描述';

alter table Inner_Org_Job modify column Job_Descrription varchar(200) comment '岗位描述';

alter table Inner_Org_Job modify column Job_Remarks varchar(200) comment '备注';

alter table Inner_Org_Job modify column Job_Operator varchar(6) comment '操作人';

alter table Inner_Org_Job modify column Job_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Inner_User                                            */
/*==============================================================*/
create table Inner_User
(
   Inner_User_ID        varchar(16) not null,
   Inner_User_Account   varchar(16) not null,
   Inner_User_Pwd       varchar(16) not null,
   Inner_User_Log_Status int(1) not null,
   Inner_User_Log_DATE  datetime not null,
   Inner_User_log_IP    varchar(16) not null,
   Inner_User_Operator  varchar(6) not null,
   Inner_User_Operate_Time timestamp not null,
   primary key (Inner_User_ID)
);

alter table Inner_User comment '内部账号';

alter table Inner_User modify column Inner_User_ID varchar(16) comment '内部账号ID';

alter table Inner_User modify column Inner_User_Account varchar(16) comment '内部账号';

alter table Inner_User modify column Inner_User_Pwd varchar(16) comment '内部账号密码';

alter table Inner_User modify column Inner_User_Log_Status int(1) comment '登录状态';

alter table Inner_User modify column Inner_User_Log_DATE datetime comment '上次登录时间';

alter table Inner_User modify column Inner_User_log_IP varchar(16) comment '上次登录IP';

alter table Inner_User modify column Inner_User_Operator varchar(6) comment '操作人';

alter table Inner_User modify column Inner_User_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Invoice                                               */
/*==============================================================*/
create table Invoice
(
   Invoice_ID           varchar(50) not null,
   Contract_ID          varchar(50) not null,
   Business_ID          varchar(50) not null,
   Invoice_Number       varchar(50) not null,
   Invoice_Price        numeric(20,4) not null,
   Invoice_Type         varchar(20) not null,
   Invoice_Content      varchar(100),
   Invoice_Date         datetime not null,
   Invoice_Person       varchar(6) not null,
   Invoice_Receiver_Time datetime not null,
   Invoice_Receiver     varchar(6) not null,
   Invoice_Attachment   longblob,
   Invoice_Contract_Status varchar(20),
   Invoice_Remarks      varchar(200),
   Invoice_Operator     varchar(6) not null,
   Invoice_Operate_Time timestamp not null,
   primary key (Invoice_ID)
);

alter table Invoice comment '开票信息表';

alter table Invoice modify column Invoice_ID varchar(50) comment '发票序号';

alter table Invoice modify column Contract_ID varchar(50) comment '合同编号';

alter table Invoice modify column Business_ID varchar(50) comment '业务编号';

alter table Invoice modify column Invoice_Number varchar(50) comment '发票号码';

alter table Invoice modify column Invoice_Price numeric(20,4) comment '发票金额';

alter table Invoice modify column Invoice_Type varchar(20) comment '发票类型';

alter table Invoice modify column Invoice_Content varchar(100) comment '发票内容';

alter table Invoice modify column Invoice_Date datetime comment '开票日期';

alter table Invoice modify column Invoice_Person varchar(6) comment '开票人';

alter table Invoice modify column Invoice_Receiver_Time datetime comment '领取日期';

alter table Invoice modify column Invoice_Receiver varchar(6) comment '发票领取人';

alter table Invoice modify column Invoice_Attachment longblob comment '附件';

alter table Invoice modify column Invoice_Contract_Status varchar(20) comment '合同状态';

alter table Invoice modify column Invoice_Remarks varchar(200) comment '备注';

alter table Invoice modify column Invoice_Operator varchar(6) comment '操作人';

alter table Invoice modify column Invoice_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Payment_Paid                                          */
/*==============================================================*/
create table Payment_Paid
(
   Paid_ID              varchar(50) not null,
   Contract_ID          varchar(50),
   Purchase_ID          varchar(50),
   Contract__D          varchar(50) not null,
   Paid_Time            datetime not null,
   Paid_Price           numeric(10,2) not null,
   Paid_Account_Number  varchar(25) not null,
   Paid_Type            varchar(20) not null,
   Paid_Status          varchar(10),
   Paid_Remarks         varchar(200),
   Paid_Operator        varchar(6) not null,
   Paid_Operate_Time    timestamp not null,
   primary key (Paid_ID)
);

alter table Payment_Paid comment '付款信息表';

alter table Payment_Paid modify column Paid_ID varchar(50) comment '付款信息编号';

alter table Payment_Paid modify column Contract_ID varchar(50) comment '合同编号2';

alter table Payment_Paid modify column Purchase_ID varchar(50) comment '采购编号';

alter table Payment_Paid modify column Contract__D varchar(50) comment '合同编号';

alter table Payment_Paid modify column Paid_Time datetime comment '付款时间';

alter table Payment_Paid modify column Paid_Price numeric(10,2) comment '付款金额';

alter table Payment_Paid modify column Paid_Account_Number varchar(25) comment '付款账号';

alter table Payment_Paid modify column Paid_Type varchar(20) comment '款项类型';

alter table Payment_Paid modify column Paid_Status varchar(10) comment '合同状态';

alter table Payment_Paid modify column Paid_Remarks varchar(200) comment '备注';

alter table Payment_Paid modify column Paid_Operator varchar(6) comment '操作人';

alter table Payment_Paid modify column Paid_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Payment_Received                                      */
/*==============================================================*/
create table Payment_Received
(
   Received_ID          varchar(50) not null,
   Contract_ID          varchar(50) not null,
   Business_ID          varchar(50),
   Received_Time        datetime not null,
   Received_Price       numeric(10,2) not null,
   Received_Card_Number varchar(25) not null,
   Received_Type        varchar(20) not null,
   Received_Contract_Status varchar(10),
   Received_Remarks     varchar(200),
   Received_Operator    varchar(6) not null,
   Received_Operate_Time timestamp not null,
   primary key (Received_ID)
);

alter table Payment_Received comment '回款信息表';

alter table Payment_Received modify column Received_ID varchar(50) comment '回款信息编号';

alter table Payment_Received modify column Contract_ID varchar(50) comment '合同编号';

alter table Payment_Received modify column Business_ID varchar(50) comment '业务编号';

alter table Payment_Received modify column Received_Time datetime comment '回款时间';

alter table Payment_Received modify column Received_Price numeric(10,2) comment '回款金额';

alter table Payment_Received modify column Received_Card_Number varchar(25) comment '回款账号';

alter table Payment_Received modify column Received_Type varchar(20) comment '款项类型';

alter table Payment_Received modify column Received_Contract_Status varchar(10) comment '合同状态';

alter table Payment_Received modify column Received_Remarks varchar(200) comment '备注';

alter table Payment_Received modify column Received_Operator varchar(6) comment '操作人';

alter table Payment_Received modify column Received_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Project_Budget                                        */
/*==============================================================*/
create table Project_Budget
(
   Budget_ID            varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Business_ID          varchar(50) not null,
   Project_ID           varchar(50) not null,
   Budget_Profit_Rate   numeric(5,2) not null,
   Budget_Account_Receivable numeric(20,4) not null,
   Budget_Total_Cost    numeric(20,4) not null,
   Budget_Conformance   varchar(1) not null,
   Budget_Service_Revenue numeric(20,4) not null,
   Budget_Tax           numeric(20,4) not null,
   Budget_Service_Revenue_Net numeric(20,4),
   Budget_Purchase_Cost numeric(20,4) not null,
   Budget_Labor_Cost    numeric(20,4) not null,
   Budget_Travel_Cost   numeric(20,4) not null,
   Budget_Cost          numeric(20,4) not null,
   Budget_Profit        numeric(20,4) not null,
   Budget_Operator      varchar(6) not null,
   Budget_Operate_Time  timestamp not null,
   primary key (Budget_ID)
);

alter table Project_Budget comment '项目预算表';

alter table Project_Budget modify column Budget_ID varchar(50) comment '项目预算编号';

alter table Project_Budget modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Project_Budget modify column Business_ID varchar(50) comment '业务编号';

alter table Project_Budget modify column Project_ID varchar(50) comment '项目编号';

alter table Project_Budget modify column Budget_Profit_Rate numeric(5,2) comment '项目计划利润率';

alter table Project_Budget modify column Budget_Account_Receivable numeric(20,4) comment '应收账款总额';

alter table Project_Budget modify column Budget_Total_Cost numeric(20,4) comment '计划成本总额';

alter table Project_Budget modify column Budget_Conformance varchar(1) comment '计划是否合规';

alter table Project_Budget modify column Budget_Service_Revenue numeric(20,4) comment '服务收入';

alter table Project_Budget modify column Budget_Tax numeric(20,4) comment '税金';

alter table Project_Budget modify column Budget_Service_Revenue_Net numeric(20,4) comment '服务净收入';

alter table Project_Budget modify column Budget_Purchase_Cost numeric(20,4) comment '采购成本';

alter table Project_Budget modify column Budget_Labor_Cost numeric(20,4) comment '人工成本';

alter table Project_Budget modify column Budget_Travel_Cost numeric(20,4) comment '差旅成本';

alter table Project_Budget modify column Budget_Cost numeric(20,4) comment '费用和支持（含税）';

alter table Project_Budget modify column Budget_Profit numeric(20,4) comment '利润';

alter table Project_Budget modify column Budget_Operator varchar(6) comment '操作人';

alter table Project_Budget modify column Budget_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Purchase                                              */
/*==============================================================*/
create table Purchase
(
   Purchase_ID          varchar(50) not null,
   Project_ID           varchar(50) not null,
   Approval_Purchase_ID varchar(50),
   Purchase_Person      varchar(6) not null,
   Purchase_TIme        datetime not null,
   Purchase_Delivery_Time datetime not null,
   Purchase_Delivery_Place varchar(50) not null,
   Purchase_Consignee   varchar(6) not null,
   Purchase_Phone_Number varchar(20) not null,
   Purchase_Name        varchar(50) not null,
   Purchase_Brand       varchar(30) not null,
   Purchase_Mode        varchar(30) not null,
   Purchase_Config      varchar(200),
   Purchase_Unit        varchar(20) not null,
   Purchase_Unit_Price  numeric(10,2) not null,
   Purchase_Number      int(10) not null,
   Purchase_Total_Price numeric(10,2) not null,
   Purchase_Order_Status varchar(10) not null,
   Purchase_Paid        numeric(10,2) not null,
   Purchase_Not_Paid    numeric(10,2) not null,
   Purchase_Fulfilment_Status varchar(10) not null,
   Purchase_Remarks     varchar(200),
   Purchase_Operator    varchar(6) not null,
   Purchase_Operate_Time timestamp not null,
   primary key (Purchase_ID)
);

alter table Purchase comment '采购信息表';

alter table Purchase modify column Purchase_ID varchar(50) comment '采购编号';

alter table Purchase modify column Project_ID varchar(50) comment '项目编号';

alter table Purchase modify column Approval_Purchase_ID varchar(50) comment '采购申请编号';

alter table Purchase modify column Purchase_Person varchar(6) comment '采购人';

alter table Purchase modify column Purchase_TIme datetime comment '采购时间';

alter table Purchase modify column Purchase_Delivery_Time datetime comment '交货时间';

alter table Purchase modify column Purchase_Delivery_Place varchar(50) comment '交货地点';

alter table Purchase modify column Purchase_Consignee varchar(6) comment '收货人';

alter table Purchase modify column Purchase_Phone_Number varchar(20) comment '联系电话';

alter table Purchase modify column Purchase_Name varchar(50) comment '物品名称';

alter table Purchase modify column Purchase_Brand varchar(30) comment '品牌';

alter table Purchase modify column Purchase_Mode varchar(30) comment '型号';

alter table Purchase modify column Purchase_Config varchar(200) comment '规格/配置';

alter table Purchase modify column Purchase_Unit varchar(20) comment '单位';

alter table Purchase modify column Purchase_Unit_Price numeric(10,2) comment '单价';

alter table Purchase modify column Purchase_Number int(10) comment '数量';

alter table Purchase modify column Purchase_Total_Price numeric(10,2) comment '总计';

alter table Purchase modify column Purchase_Order_Status varchar(10) comment '订货情况';

alter table Purchase modify column Purchase_Paid numeric(10,2) comment '已付款';

alter table Purchase modify column Purchase_Not_Paid numeric(10,2) comment '未付款';

alter table Purchase modify column Purchase_Fulfilment_Status varchar(10) comment '发货情况';

alter table Purchase modify column Purchase_Remarks varchar(200) comment '备注';

alter table Purchase modify column Purchase_Operator varchar(6) comment '操作人';

alter table Purchase modify column Purchase_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Sales_Bug_Category                                    */
/*==============================================================*/
create table Sales_Bug_Category
(
   BUG_ID               varchar(50) not null,
   Complaint_ID         varchar(50),
   Service_ID           varchar(50),
   Product_ID           varchar(50),
   Module_ID            varchar(50) not null,
   Feedback_ID          varchar(50),
   Bug_Remarks          varchar(200),
   Bug_Recorder         varchar(6) not null,
   Bug_Record_Time      timestamp not null,
   primary key (BUG_ID)
);

alter table Sales_Bug_Category comment 'BUG分类信息表';

alter table Sales_Bug_Category modify column BUG_ID varchar(50) comment 'BUG编号';

alter table Sales_Bug_Category modify column Complaint_ID varchar(50) comment '客户投诉记录编号';

alter table Sales_Bug_Category modify column Service_ID varchar(50) comment '客服记录编号';

alter table Sales_Bug_Category modify column Product_ID varchar(50) comment '产品编号';

alter table Sales_Bug_Category modify column Module_ID varchar(50) comment '模块编号';

alter table Sales_Bug_Category modify column Feedback_ID varchar(50) comment '客户反馈内容编号';

alter table Sales_Bug_Category modify column Bug_Remarks varchar(200) comment '备注';

alter table Sales_Bug_Category modify column Bug_Recorder varchar(6) comment '分类记录人';

alter table Sales_Bug_Category modify column Bug_Record_Time timestamp comment '记录时间';

/*==============================================================*/
/* Table: Sales_Business                                        */
/*==============================================================*/
create table Sales_Business
(
   Business_ID          varchar(50) not null,
   Customer_ID          varchar(50) not null,
   Contact_ID           varchar(50),
   Business_Name        varchar(50) not null,
   Business_Category    varchar(20) not null,
   Business_Status      varchar(20) not null,
   Business_Sales       varchar(6) not null,
   Business_Old_ID      varchar(50),
   Business_Description varchar(1000) not null,
   Business_Remarks     varchar(200),
   Business_Operator    varchar(6) not null,
   Business_Operate_Time timestamp not null,
   primary key (Business_ID)
);

alter table Sales_Business comment '业务信息表';

alter table Sales_Business modify column Business_ID varchar(50) comment '业务编号';

alter table Sales_Business modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Sales_Business modify column Contact_ID varchar(50) comment '联系人编号';

alter table Sales_Business modify column Business_Name varchar(50) comment '业务名称';

alter table Sales_Business modify column Business_Category varchar(20) comment '业务类型';

alter table Sales_Business modify column Business_Status varchar(20) comment '业务状态';

alter table Sales_Business modify column Business_Sales varchar(6) comment '销售负责人';

alter table Sales_Business modify column Business_Old_ID varchar(50) comment '旧业务编号';

alter table Sales_Business modify column Business_Description varchar(1000) comment '业务描述';

alter table Sales_Business modify column Business_Remarks varchar(200) comment '备注';

alter table Sales_Business modify column Business_Operator varchar(6) comment '业务创建人';

alter table Sales_Business modify column Business_Operate_Time timestamp comment '业务创建时间';

/*==============================================================*/
/* Table: Sales_Company_Customer                                */
/*==============================================================*/
create table Sales_Company_Customer
(
   Customer_ID          varchar(50) not null,
   Customer_Province    varchar(25) not null,
   Customer_City        varchar(25) not null,
   Customer_County      varchar(25) not null,
   Customer_Name        varchar(100),
   Customer_Simple_Name varchar(50),
   Customer_Owner       varchar(6) not null,
   Customer_Sales       varchar(6) not null,
   Customer_Product     varchar(50),
   Customer_Req_Des     varchar(200),
   Customer_Attachment  longblob,
   Customer_Category    varchar(25) not null,
   Customer_Character   varchar(25) not null,
   Customer_Status      varchar(20) not null,
   Customer_Level       int(1) not null,
   Customer_Sale_Phase  varchar(20) not null,
   Customer_Inner_Phase varchar(20) not null,
   Customer_Source      varchar(20) not null,
   Customer_Industry    varchar(50),
   Customer_Staff_Size  int(8),
   Customer_Credit_Rank int(1),
   Customer_Potential   varchar(20),
   Customer_Emp_Number  int(8),
   Customer_Parent      varchar(50),
   Customer_Introduction varchar(500),
   Customer_Visit_Mode  varchar(20),
   Customer_Old_ID      varchar(50),
   Customer_Child_Company varchar(50),
   Customer_Hot         int(1) not null,
   Customer_Hot_Rank    varchar(20),
   Customer_Hot_Classif varchar(20),
   Customer_Volume      numeric(16,4),
   Customer_Hot_Desc    varchar(200),
   Customer_Invoice_Name varchar(50),
   Customer_Tax_Number  varchar(20),
   Customer_Bank        varchar(50),
   Customer_Account_Num varchar(30),
   Customer_Contact_Sta varchar(20) not null,
   Customer_Address     varchar(100),
   Customer_Phone_Num   varchar(20) not null,
   Customer_Fax         varchar(20),
   Customer_MailBox     varchar(50),
   Customer_URL         varchar(50),
   Customer_Postcode    varchar(10),
   Customer_Leader      varchar(6),
   Customer_Job_Title   varchar(20),
   Customer_Payment_Rate numeric(6,4),
   Customer_Heating_Share numeric(6,4),
   Customer_Complaint_Rate numeric(6,4),
   Customer_Heating_Area numeric(16,2),
   Customer_Heating_Source_Number int(10),
   Customer_Steam_Area  numeric(16,2),
   Customer_Hot_Water_Area numeric(16,2),
   Customer_Own_Heating_Source int(10),
   Customer_Out_Heating_Source int(10),
   Customer_Heat_Loss   numeric(10,2),
   Customer_Water_Loss  numeric(10,2),
   Customer_Electrick_Loss numeric(10,2),
   Customer_Plan_One_Year varchar(500),
   Customer_Plan_Tow_Year varchar(500),
   Customer_Plan_Three_Year varchar(500),
   Customer_Remarks     varchar(500),
   Customer_Operator    varchar(6) not null,
   Customer_Operate_Time timestamp not null,
   primary key (Customer_ID)
);

alter table Sales_Company_Customer comment '企业客户信息表';

alter table Sales_Company_Customer modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Sales_Company_Customer modify column Customer_Province varchar(25) comment '省份';

alter table Sales_Company_Customer modify column Customer_City varchar(25) comment '城市';

alter table Sales_Company_Customer modify column Customer_County varchar(25) comment '区县';

alter table Sales_Company_Customer modify column Customer_Name varchar(100) comment '企业名称';

alter table Sales_Company_Customer modify column Customer_Simple_Name varchar(50) comment '助记简称';

alter table Sales_Company_Customer modify column Customer_Owner varchar(6) comment '客户所有者';

alter table Sales_Company_Customer modify column Customer_Sales varchar(6) comment '销售负责人';

alter table Sales_Company_Customer modify column Customer_Product varchar(50) comment '产品需求';

alter table Sales_Company_Customer modify column Customer_Req_Des varchar(200) comment '需求简要描述';

alter table Sales_Company_Customer modify column Customer_Attachment longblob comment '需求调研附件';

alter table Sales_Company_Customer modify column Customer_Category varchar(25) comment '客户类别';

alter table Sales_Company_Customer modify column Customer_Character varchar(25) comment '企业性质';

alter table Sales_Company_Customer modify column Customer_Status varchar(20) comment '客户状态';

alter table Sales_Company_Customer modify column Customer_Level int(1) comment '客户级别';

alter table Sales_Company_Customer modify column Customer_Sale_Phase varchar(20) comment '销售阶段';

alter table Sales_Company_Customer modify column Customer_Inner_Phase varchar(20) comment '客户内部阶段';

alter table Sales_Company_Customer modify column Customer_Source varchar(20) comment '来源';

alter table Sales_Company_Customer modify column Customer_Industry varchar(50) comment '行业';

alter table Sales_Company_Customer modify column Customer_Staff_Size int(8) comment '人员规模';

alter table Sales_Company_Customer modify column Customer_Credit_Rank int(1) comment '信用等级';

alter table Sales_Company_Customer modify column Customer_Potential varchar(20) comment '客户潜力';

alter table Sales_Company_Customer modify column Customer_Emp_Number int(8) comment '员工数量';

alter table Sales_Company_Customer modify column Customer_Parent varchar(50) comment '上级单位';

alter table Sales_Company_Customer modify column Customer_Introduction varchar(500) comment '公司简介';

alter table Sales_Company_Customer modify column Customer_Visit_Mode varchar(20) comment '拜访交通方式';

alter table Sales_Company_Customer modify column Customer_Old_ID varchar(50) comment '旧客户编号';

alter table Sales_Company_Customer modify column Customer_Child_Company varchar(50) comment '子公司名称';

alter table Sales_Company_Customer modify column Customer_Hot int(1) comment '热点客户';

alter table Sales_Company_Customer modify column Customer_Hot_Rank varchar(20) comment '热度';

alter table Sales_Company_Customer modify column Customer_Hot_Classif varchar(20) comment '热点客户分类';

alter table Sales_Company_Customer modify column Customer_Volume numeric(16,4) comment '预期成交金额';

alter table Sales_Company_Customer modify column Customer_Hot_Desc varchar(200) comment '热点说明';

alter table Sales_Company_Customer modify column Customer_Invoice_Name varchar(50) comment '开票名称';

alter table Sales_Company_Customer modify column Customer_Tax_Number varchar(20) comment '纳税人税号';

alter table Sales_Company_Customer modify column Customer_Bank varchar(50) comment '开户行';

alter table Sales_Company_Customer modify column Customer_Account_Num varchar(30) comment '账号';

alter table Sales_Company_Customer modify column Customer_Contact_Sta varchar(20) comment '联系情况';

alter table Sales_Company_Customer modify column Customer_Address varchar(100) comment '企业办公地址';

alter table Sales_Company_Customer modify column Customer_Phone_Num varchar(20) comment '电话号码';

alter table Sales_Company_Customer modify column Customer_Fax varchar(20) comment '传真';

alter table Sales_Company_Customer modify column Customer_MailBox varchar(50) comment '邮箱';

alter table Sales_Company_Customer modify column Customer_URL varchar(50) comment '官网地址';

alter table Sales_Company_Customer modify column Customer_Postcode varchar(10) comment '邮编';

alter table Sales_Company_Customer modify column Customer_Leader varchar(6) comment '企业负责人';

alter table Sales_Company_Customer modify column Customer_Job_Title varchar(20) comment '职务';

alter table Sales_Company_Customer modify column Customer_Payment_Rate numeric(6,4) comment '收费收缴率';

alter table Sales_Company_Customer modify column Customer_Heating_Share numeric(6,4) comment '企业占全市热化率';

alter table Sales_Company_Customer modify column Customer_Complaint_Rate numeric(6,4) comment '投诉率';

alter table Sales_Company_Customer modify column Customer_Heating_Area numeric(16,2) comment '供热面积';

alter table Sales_Company_Customer modify column Customer_Heating_Source_Number int(10) comment '热力站数量';

alter table Sales_Company_Customer modify column Customer_Steam_Area numeric(16,2) comment '蒸汽面积';

alter table Sales_Company_Customer modify column Customer_Hot_Water_Area numeric(16,2) comment '热水面积';

alter table Sales_Company_Customer modify column Customer_Own_Heating_Source int(10) comment '自有热源';

alter table Sales_Company_Customer modify column Customer_Out_Heating_Source int(10) comment '外购热源';

alter table Sales_Company_Customer modify column Customer_Heat_Loss numeric(10,2) comment '热耗';

alter table Sales_Company_Customer modify column Customer_Water_Loss numeric(10,2) comment '水耗';

alter table Sales_Company_Customer modify column Customer_Electrick_Loss numeric(10,2) comment '电耗';

alter table Sales_Company_Customer modify column Customer_Plan_One_Year varchar(500) comment '未来一年新增规划';

alter table Sales_Company_Customer modify column Customer_Plan_Tow_Year varchar(500) comment '未来两年新增规划';

alter table Sales_Company_Customer modify column Customer_Plan_Three_Year varchar(500) comment '未来三年新增规划';

alter table Sales_Company_Customer modify column Customer_Remarks varchar(500) comment '备注';

alter table Sales_Company_Customer modify column Customer_Operator varchar(6) comment '创建人';

alter table Sales_Company_Customer modify column Customer_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Competitor                                      */
/*==============================================================*/
create table Sales_Competitor
(
   Complaint_ID         varchar(50) not null,
   Customer_ID          varchar(50),
   Complaint_Project_Type varchar(20) not null,
   Complaint_Product_Category varchar(20) not null,
   Complaint_Product_Name varchar(50) not null,
   Complaint_Product_Price numeric(16,2),
   Complaint_Product_Description varchar(1000),
   Complaint_Company_Name varchar(50) not null,
   Complaint_Attachment longblob,
   Complaint_Remarks    varchar(200),
   Complaint_Operator   varchar(6) not null,
   Complaint_Operate_Time timestamp not null,
   primary key (Complaint_ID)
);

alter table Sales_Competitor comment '竞争对手信息表';

alter table Sales_Competitor modify column Complaint_ID varchar(50) comment '竞争对手ID';

alter table Sales_Competitor modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Sales_Competitor modify column Complaint_Project_Type varchar(20) comment '项目类型';

alter table Sales_Competitor modify column Complaint_Product_Category varchar(20) comment '产品分类';

alter table Sales_Competitor modify column Complaint_Product_Name varchar(50) comment '产品名称';

alter table Sales_Competitor modify column Complaint_Product_Price numeric(16,2) comment '产品价格';

alter table Sales_Competitor modify column Complaint_Product_Description varchar(1000) comment '产品描述';

alter table Sales_Competitor modify column Complaint_Company_Name varchar(50) comment '公司名称';

alter table Sales_Competitor modify column Complaint_Attachment longblob comment '附件';

alter table Sales_Competitor modify column Complaint_Remarks varchar(200) comment '备注';

alter table Sales_Competitor modify column Complaint_Operator varchar(6) comment '操作人';

alter table Sales_Competitor modify column Complaint_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Sales_Customer_Child_Company                          */
/*==============================================================*/
create table Sales_Customer_Child_Company
(
   Child_Company_ID     varchar(50) not null,
   Customer__ID         varchar(50),
   Child_Company_Name   varchar(50) not null,
   Child_Company_Remarks varchar(200),
   Child_Company_Operator varchar(6) not null,
   Child_Company_Operate_Time timestamp not null,
   primary key (Child_Company_ID)
);

alter table Sales_Customer_Child_Company comment '客户组织机构_子公司';

alter table Sales_Customer_Child_Company modify column Child_Company_ID varchar(50) comment '子公司编号';

alter table Sales_Customer_Child_Company modify column Customer__ID varchar(50) comment '企业客户编号';

alter table Sales_Customer_Child_Company modify column Child_Company_Name varchar(50) comment '子公司名称';

alter table Sales_Customer_Child_Company modify column Child_Company_Remarks varchar(200) comment '备注';

alter table Sales_Customer_Child_Company modify column Child_Company_Operator varchar(6) comment '创建人';

alter table Sales_Customer_Child_Company modify column Child_Company_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Customer_Contact                                */
/*==============================================================*/
create table Sales_Customer_Contact
(
   Contact_ID           varchar(50) not null,
   Contact_Name         varchar(6) not null,
   Contact_Sex          int(1) not null,
   Contact_Salutation   varchar(20),
   Contact_Title        varchar(50) not null,
   Contact_Responsibility varchar(100),
   Contact_Role         varchar(50),
   Customer_ID          varchar(50) not null,
   Contact_Dept         varchar(50),
   Contact_Job          varchar(50),
   Contact_Marital_Status int(1),
   Contact_Age          int(2),
   Contact_Family_Status varchar(50),
   Contact_Graduate_Institutions varchar(30),
   Contact_Skill        varchar(50),
   Contact_Years_Working int(2),
   Contact_Experience   int(2),
   Contact_Previous_Company varchar(50),
   Contact_Superiors    varchar(6),
   Contact_Status       varchar(20) not null,
   Contact_Introduction varchar(20) not null,
   Contact_Owner        varchar(6) not null,
   Contact_Sales        varchar(6) not null,
   Contact_Phone_Number varchar(20) not null,
   Contact_Mailbox      varchar(50),
   Contact_Work_Phone_Number varchar(20),
   Contact_Family_Phone_Number varchar(20),
   Contact_Fax          varchar(20),
   Contact_Family_Address varchar(100),
   Contact_Weixin       varchar(20),
   Contact_QQ           varchar(20),
   Contact_Special_Day_Category varchar(20),
   Contact_Special_Day  datetime,
   Contact_Interest     varchar(50),
   Contact_Remarks      varchar(200),
   Contact_Operator     varchar(6) not null,
   Contact_Operate_Time timestamp not null,
   primary key (Contact_ID)
);

alter table Sales_Customer_Contact comment '联系人信息表';

alter table Sales_Customer_Contact modify column Contact_ID varchar(50) comment '联系人编号';

alter table Sales_Customer_Contact modify column Contact_Name varchar(6) comment '姓名';

alter table Sales_Customer_Contact modify column Contact_Sex int(1) comment '性别';

alter table Sales_Customer_Contact modify column Contact_Salutation varchar(20) comment '称谓';

alter table Sales_Customer_Contact modify column Contact_Title varchar(50) comment '职务';

alter table Sales_Customer_Contact modify column Contact_Responsibility varchar(100) comment '负责业务';

alter table Sales_Customer_Contact modify column Contact_Role varchar(50) comment '角色';

alter table Sales_Customer_Contact modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Sales_Customer_Contact modify column Contact_Dept varchar(50) comment '部门';

alter table Sales_Customer_Contact modify column Contact_Job varchar(50) comment '岗位';

alter table Sales_Customer_Contact modify column Contact_Marital_Status int(1) comment '婚否';

alter table Sales_Customer_Contact modify column Contact_Age int(2) comment '年龄';

alter table Sales_Customer_Contact modify column Contact_Family_Status varchar(50) comment '家庭情况';

alter table Sales_Customer_Contact modify column Contact_Graduate_Institutions varchar(30) comment '毕业院校';

alter table Sales_Customer_Contact modify column Contact_Skill varchar(50) comment '专业技能';

alter table Sales_Customer_Contact modify column Contact_Years_Working int(2) comment '工作年限';

alter table Sales_Customer_Contact modify column Contact_Experience int(2) comment '工作经验';

alter table Sales_Customer_Contact modify column Contact_Previous_Company varchar(50) comment '曾供职单位';

alter table Sales_Customer_Contact modify column Contact_Superiors varchar(6) comment '上级领导';

alter table Sales_Customer_Contact modify column Contact_Status varchar(20) comment '联系人状态';

alter table Sales_Customer_Contact modify column Contact_Introduction varchar(20) comment '联系情况';

alter table Sales_Customer_Contact modify column Contact_Owner varchar(6) comment '客户所有者';

alter table Sales_Customer_Contact modify column Contact_Sales varchar(6) comment '销售负责人';

alter table Sales_Customer_Contact modify column Contact_Phone_Number varchar(20) comment '手机';

alter table Sales_Customer_Contact modify column Contact_Mailbox varchar(50) comment '邮箱';

alter table Sales_Customer_Contact modify column Contact_Work_Phone_Number varchar(20) comment '工作电话';

alter table Sales_Customer_Contact modify column Contact_Family_Phone_Number varchar(20) comment '家庭电话';

alter table Sales_Customer_Contact modify column Contact_Fax varchar(20) comment '传真';

alter table Sales_Customer_Contact modify column Contact_Family_Address varchar(100) comment '家庭住址';

alter table Sales_Customer_Contact modify column Contact_Weixin varchar(20) comment '微信';

alter table Sales_Customer_Contact modify column Contact_QQ varchar(20) comment 'QQ';

alter table Sales_Customer_Contact modify column Contact_Special_Day_Category varchar(20) comment '纪念日类别';

alter table Sales_Customer_Contact modify column Contact_Special_Day datetime comment '纪念日';

alter table Sales_Customer_Contact modify column Contact_Interest varchar(50) comment '爱好';

alter table Sales_Customer_Contact modify column Contact_Remarks varchar(200) comment '备注';

alter table Sales_Customer_Contact modify column Contact_Operator varchar(6) comment '创建人';

alter table Sales_Customer_Contact modify column Contact_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Customer_Dept                                   */
/*==============================================================*/
create table Sales_Customer_Dept
(
   Customer_Dept_ID     varchar(50) not null,
   Child_Company_ID     varchar(50),
   Customer_Dept_Name   varchar(50) not null,
   Customer_Dept_Description varchar(200),
   Customer_Dept_Parent_Dept varchar(50),
   Customer_Dept_Remarks varchar(200),
   Customer_Dept_Operator varchar(6) not null,
   Customer_Dept_Operate_Time timestamp not null,
   primary key (Customer_Dept_ID)
);

alter table Sales_Customer_Dept comment '客户组织机构_部门';

alter table Sales_Customer_Dept modify column Customer_Dept_ID varchar(50) comment '部门编号';

alter table Sales_Customer_Dept modify column Child_Company_ID varchar(50) comment '子公司编号';

alter table Sales_Customer_Dept modify column Customer_Dept_Name varchar(50) comment '部门名称';

alter table Sales_Customer_Dept modify column Customer_Dept_Description varchar(200) comment '部门描述';

alter table Sales_Customer_Dept modify column Customer_Dept_Parent_Dept varchar(50) comment '上级部门';

alter table Sales_Customer_Dept modify column Customer_Dept_Remarks varchar(200) comment '备注';

alter table Sales_Customer_Dept modify column Customer_Dept_Operator varchar(6) comment '创建人';

alter table Sales_Customer_Dept modify column Customer_Dept_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Customer__Job                                   */
/*==============================================================*/
create table Sales_Customer__Job
(
   Customer_Job_ID      varchar(50) not null,
   Customer_Dept_ID     varchar(50),
   Customer_Job_name    varchar(50) not null,
   Customer_Job_Description varchar(200),
   Customer_Job_Remarks varchar(200),
   Customer_Job_Operator varchar(6) not null,
   Customer_Job_Operate_Time timestamp not null,
   primary key (Customer_Job_ID)
);

alter table Sales_Customer__Job comment '客户组织机构_岗位';

alter table Sales_Customer__Job modify column Customer_Job_ID varchar(50) comment '岗位编号';

alter table Sales_Customer__Job modify column Customer_Dept_ID varchar(50) comment '部门编号';

alter table Sales_Customer__Job modify column Customer_Job_name varchar(50) comment '岗位名称';

alter table Sales_Customer__Job modify column Customer_Job_Description varchar(200) comment '岗位描述';

alter table Sales_Customer__Job modify column Customer_Job_Remarks varchar(200) comment '备注';

alter table Sales_Customer__Job modify column Customer_Job_Operator varchar(6) comment '创建人';

alter table Sales_Customer__Job modify column Customer_Job_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Module_Category                                 */
/*==============================================================*/
create table Sales_Module_Category
(
   Module_ID            varchar(50) not null,
   Product_ID           varchar(50) not null,
   Module_Name          varchar(50) not null,
   Module_Description   varchar(1000) not null,
   Module_Attachment    longblob,
   Module_Remark        varchar(200),
   Module_Recorder      varchar(6) not null,
   Module_Record_Time   timestamp not null,
   primary key (Module_ID)
);

alter table Sales_Module_Category comment '模块分类信息表';

alter table Sales_Module_Category modify column Module_ID varchar(50) comment '模块编号';

alter table Sales_Module_Category modify column Product_ID varchar(50) comment '产品编号';

alter table Sales_Module_Category modify column Module_Name varchar(50) comment '模块名称';

alter table Sales_Module_Category modify column Module_Description varchar(1000) comment '模块描述';

alter table Sales_Module_Category modify column Module_Attachment longblob comment '附件';

alter table Sales_Module_Category modify column Module_Remark varchar(200) comment '备注';

alter table Sales_Module_Category modify column Module_Recorder varchar(6) comment '创建人';

alter table Sales_Module_Category modify column Module_Record_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Online_FeedBack                                 */
/*==============================================================*/
create table Sales_Online_FeedBack
(
   FeedBack_ID          varchar(50) not null,
   FeedBack_Category    int(1) not null,
   FeedBack_Name        varchar(50) not null,
   FeedBack_Phone_Number varchar(20),
   FeedBack_Mailbox     varchar(50),
   FeedBack_Company_Name varchar(50),
   FeedBack_Product     varchar(50),
   FeedBack_Description varchar(1000) not null,
   FeedBack_Time        datetime not null,
   FeedBack_Attachment  longblob,
   FeedBack_Excute_Status varchar(25),
   FeedBack_Excute_Description varchar(1000),
   FeedBack_Excute_Time timestamp,
   primary key (FeedBack_ID)
);

alter table Sales_Online_FeedBack comment '客户在线反馈信息表';

alter table Sales_Online_FeedBack modify column FeedBack_ID varchar(50) comment '客户反馈内容编号';

alter table Sales_Online_FeedBack modify column FeedBack_Category int(1) comment '反馈内容分类';

alter table Sales_Online_FeedBack modify column FeedBack_Name varchar(50) comment '姓名';

alter table Sales_Online_FeedBack modify column FeedBack_Phone_Number varchar(20) comment '手机';

alter table Sales_Online_FeedBack modify column FeedBack_Mailbox varchar(50) comment '邮箱';

alter table Sales_Online_FeedBack modify column FeedBack_Company_Name varchar(50) comment '公司名称';

alter table Sales_Online_FeedBack modify column FeedBack_Product varchar(50) comment '使用产品';

alter table Sales_Online_FeedBack modify column FeedBack_Description varchar(1000) comment '问题描述';

alter table Sales_Online_FeedBack modify column FeedBack_Time datetime comment '在线反馈时间';

alter table Sales_Online_FeedBack modify column FeedBack_Attachment longblob comment '附件';

alter table Sales_Online_FeedBack modify column FeedBack_Excute_Status varchar(25) comment '反馈处理状态';

alter table Sales_Online_FeedBack modify column FeedBack_Excute_Description varchar(1000) comment '反馈处理状态描述';

alter table Sales_Online_FeedBack modify column FeedBack_Excute_Time timestamp comment '反馈处理时间';

/*==============================================================*/
/* Table: Sales_Product_Category                                */
/*==============================================================*/
create table Sales_Product_Category
(
   Product_ID           varchar(50) not null,
   Product_Name         varchar(50) not null,
   Product_Description  varchar(1000) not null,
   Product_Attachment   longblob,
   Product_Remars       varchar(200),
   Product_Recorder     varchar(6) not null,
   Product_Record_Time  timestamp not null,
   primary key (Product_ID)
);

alter table Sales_Product_Category comment '产品分类信息表';

alter table Sales_Product_Category modify column Product_ID varchar(50) comment '产品编号';

alter table Sales_Product_Category modify column Product_Name varchar(50) comment '产品名称';

alter table Sales_Product_Category modify column Product_Description varchar(1000) comment '产品描述';

alter table Sales_Product_Category modify column Product_Attachment longblob comment '附件';

alter table Sales_Product_Category modify column Product_Remars varchar(200) comment '备注';

alter table Sales_Product_Category modify column Product_Recorder varchar(6) comment '创建人';

alter table Sales_Product_Category modify column Product_Record_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Project                                         */
/*==============================================================*/
create table Sales_Project
(
   Project_ID           varchar(50) not null,
   Customer_ID          varchar(50),
   Contract_ID          varchar(50) not null,
   Bussiness_ID         varchar(50) not null,
   Project_Name         varchar(50) not null,
   Project_Sales        varchar(6) not null,
   Project_Begin_Date   datetime not null,
   Project_End_Date     datetime not null,
   Project_Manager      varchar(50) not null,
   Project_Development_Begin_Date datetime not null,
   Project_Development_End_Date datetime not null,
   Project_Gategory     varchar(20) not null,
   Project_Phase        varchar(20) not null,
   Project_Description  varchar(1000) not null,
   Project_Old_ID       varchar(50),
   Project_Remarks      varchar(500),
   Project_Operator     varchar(50) not null,
   Project_Operate_Time timestamp not null,
   primary key (Project_ID)
);

alter table Sales_Project comment '项目信息表';

alter table Sales_Project modify column Project_ID varchar(50) comment '项目编号';

alter table Sales_Project modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Sales_Project modify column Contract_ID varchar(50) comment '合同编号';

alter table Sales_Project modify column Bussiness_ID varchar(50) comment '业务编号';

alter table Sales_Project modify column Project_Name varchar(50) comment '项目名称';

alter table Sales_Project modify column Project_Sales varchar(6) comment '销售负责人';

alter table Sales_Project modify column Project_Begin_Date datetime comment '项目开始时间';

alter table Sales_Project modify column Project_End_Date datetime comment '项目结束时间';

alter table Sales_Project modify column Project_Manager varchar(50) comment '研发经理';

alter table Sales_Project modify column Project_Development_Begin_Date datetime comment '研发开始时间';

alter table Sales_Project modify column Project_Development_End_Date datetime comment '研发结束时间';

alter table Sales_Project modify column Project_Gategory varchar(20) comment '项目类型';

alter table Sales_Project modify column Project_Phase varchar(20) comment '项目阶段';

alter table Sales_Project modify column Project_Description varchar(1000) comment '项目描述';

alter table Sales_Project modify column Project_Old_ID varchar(50) comment '旧项目编号';

alter table Sales_Project modify column Project_Remarks varchar(500) comment '备注';

alter table Sales_Project modify column Project_Operator varchar(50) comment '创建人';

alter table Sales_Project modify column Project_Operate_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Project_Consultation                            */
/*==============================================================*/
create table Sales_Project_Consultation
(
   Consultation_ID      varchar(50) not null,
   Consultation_Name    varchar(6) not null,
   Consultation_Phone_Number varchar(20),
   Consultation_Mailbox varchar(50),
   Consultation_Company_Name varchar(50) not null,
   Consultation_Job     varchar(20),
   Consultation_Provence varchar(20) not null,
   Consultation_City    varchar(20) not null,
   Consultation_County  varchar(20) not null,
   Consultation_Industry varchar(50) not null,
   Consultation_Product varchar(50) not null,
   Consultation_Project_Introduct varchar(1000) not null,
   Consultation_Project_Scale varchar(50) not null,
   Consultation_Attachment longblob,
   Consultation——Rmarks varchar(200),
   Consultation_Time    datetime not null,
   Consultation_Excute_Status varchar(25),
   Consultation_Excute_Descriptio varchar(1000),
   Consultation_Excute_Time timestamp,
   primary key (Consultation_ID)
);

alter table Sales_Project_Consultation comment '客户项目咨询信息表';

alter table Sales_Project_Consultation modify column Consultation_ID varchar(50) comment '项目咨询编号';

alter table Sales_Project_Consultation modify column Consultation_Name varchar(6) comment '姓名';

alter table Sales_Project_Consultation modify column Consultation_Phone_Number varchar(20) comment '手机';

alter table Sales_Project_Consultation modify column Consultation_Mailbox varchar(50) comment '邮箱';

alter table Sales_Project_Consultation modify column Consultation_Company_Name varchar(50) comment '公司名称';

alter table Sales_Project_Consultation modify column Consultation_Job varchar(20) comment '职位';

alter table Sales_Project_Consultation modify column Consultation_Provence varchar(20) comment '省份';

alter table Sales_Project_Consultation modify column Consultation_City varchar(20) comment '城市';

alter table Sales_Project_Consultation modify column Consultation_County varchar(20) comment '区县';

alter table Sales_Project_Consultation modify column Consultation_Industry varchar(50) comment '所在行业';

alter table Sales_Project_Consultation modify column Consultation_Product varchar(50) comment '感兴趣产品';

alter table Sales_Project_Consultation modify column Consultation_Project_Introduct varchar(1000) comment '项目概述';

alter table Sales_Project_Consultation modify column Consultation_Project_Scale varchar(50) comment '项目规模';

alter table Sales_Project_Consultation modify column Consultation_Attachment longblob comment '附件';

alter table Sales_Project_Consultation modify column Consultation——Rmarks varchar(200) comment '备注';

alter table Sales_Project_Consultation modify column Consultation_Time datetime comment '咨询时间';

alter table Sales_Project_Consultation modify column Consultation_Excute_Status varchar(25) comment '咨询处理状态';

alter table Sales_Project_Consultation modify column Consultation_Excute_Descriptio varchar(1000) comment '咨询处理状态描述';

alter table Sales_Project_Consultation modify column Consultation_Excute_Time timestamp comment '咨询处理时间';

/*==============================================================*/
/* Table: Sales_Record                                          */
/*==============================================================*/
create table Sales_Record
(
   Record_ID            varchar(50) not null,
   Customer_ID          varchar(50),
   Business_ID          varchar(50),
   Project_ID           varchar(50),
   Record_Name          varchar(50) not null,
   Record_Phase         varchar(20) not null,
   Record_Sale_Opportunity varchar(200) not null,
   Record_Expense_Category varchar(20),
   Record_Expense_Actual numeric(10,2),
   Record_Executor      varchar(6) not null,
   Record_Begin_Date    datetime not null,
   Record_End_Date      datetime not null,
   Record_Execute_Status varchar(10) not null,
   Record_Attachment    longblob,
   Record_Remarks       varchar(200) not null,
   Record_Operator      varchar(6) not null,
   Record_Operate_Time  timestamp,
   primary key (Record_ID)
);

alter table Sales_Record comment '行动记录信息表';

alter table Sales_Record modify column Record_ID varchar(50) comment '行动记录编号';

alter table Sales_Record modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Sales_Record modify column Business_ID varchar(50) comment '业务编号';

alter table Sales_Record modify column Project_ID varchar(50) comment '项目编号';

alter table Sales_Record modify column Record_Name varchar(50) comment '行动主题';

alter table Sales_Record modify column Record_Phase varchar(20) comment '阶段';

alter table Sales_Record modify column Record_Sale_Opportunity varchar(200) comment '销售机会';

alter table Sales_Record modify column Record_Expense_Category varchar(20) comment '费用类型';

alter table Sales_Record modify column Record_Expense_Actual numeric(10,2) comment '实际费用';

alter table Sales_Record modify column Record_Executor varchar(6) comment '执行人';

alter table Sales_Record modify column Record_Begin_Date datetime comment '实际执行开始时间';

alter table Sales_Record modify column Record_End_Date datetime comment '实际执行结束时间';

alter table Sales_Record modify column Record_Execute_Status varchar(10) comment '执行状态';

alter table Sales_Record modify column Record_Attachment longblob comment '附件';

alter table Sales_Record modify column Record_Remarks varchar(200) comment '备注';

alter table Sales_Record modify column Record_Operator varchar(6) comment '行动创建人';

alter table Sales_Record modify column Record_Operate_Time timestamp comment '行动创建时间';

/*==============================================================*/
/* Table: Sales_Record_Complaint                                */
/*==============================================================*/
create table Sales_Record_Complaint
(
   Complaint_ID         varchar(50) not null,
   Project_ID           varchar(50) not null,
   Customer_ID          varchar(50),
   Complaint_Product    varchar(50) not null,
   Complaint_Name       varchar(6) not null,
   Complaint_Date       datetime not null,
   Complaint_Company    varchar(50),
   Complaint_Feedback_Type varchar(10) not null,
   Complaint_Problem    varchar(500) not null,
   Complaint_Attachment longblob,
   Complaint_Attachment_Customer varchar(200),
   Complaint_Problem_Remarks varchar(200),
   Complaint_After_Sale_Type varchar(10),
   Complaint_Problem_Description varchar(500),
   Complaint_Operator   varchar(6),
   Complaint_Executor   varchar(500),
   Complaint_Result     varchar(10),
   Complaint_After_Sale_Remarks varchar(200),
   Complaint_Phone_Number varchar(20),
   Complaint_Mailbox    varchar(50),
   Complaint_Recorder   varchar(6) not null,
   Complaint_Record_Time timestamp not null,
   primary key (Complaint_ID)
);

alter table Sales_Record_Complaint comment '客户投诉信息表';

alter table Sales_Record_Complaint modify column Complaint_ID varchar(50) comment '客户投诉记录编号';

alter table Sales_Record_Complaint modify column Project_ID varchar(50) comment '项目编号';

alter table Sales_Record_Complaint modify column Customer_ID varchar(50) comment '企业客户编号';

alter table Sales_Record_Complaint modify column Complaint_Product varchar(50) comment '使用产品';

alter table Sales_Record_Complaint modify column Complaint_Name varchar(6) comment '投诉人姓名';

alter table Sales_Record_Complaint modify column Complaint_Date datetime comment '投诉时间';

alter table Sales_Record_Complaint modify column Complaint_Company varchar(50) comment '所在单位';

alter table Sales_Record_Complaint modify column Complaint_Feedback_Type varchar(10) comment '投诉方式';

alter table Sales_Record_Complaint modify column Complaint_Problem varchar(500) comment '投诉内容';

alter table Sales_Record_Complaint modify column Complaint_Attachment longblob comment '附件';

alter table Sales_Record_Complaint modify column Complaint_Attachment_Customer varchar(200) comment '客服发送资料';

alter table Sales_Record_Complaint modify column Complaint_Problem_Remarks varchar(200) comment '问题描述备注';

alter table Sales_Record_Complaint modify column Complaint_After_Sale_Type varchar(10) comment '售后服务类型';

alter table Sales_Record_Complaint modify column Complaint_Problem_Description varchar(500) comment '问题描述';

alter table Sales_Record_Complaint modify column Complaint_Operator varchar(6) comment '处理人';

alter table Sales_Record_Complaint modify column Complaint_Executor varchar(500) comment '处理过程';

alter table Sales_Record_Complaint modify column Complaint_Result varchar(10) comment '处理结果';

alter table Sales_Record_Complaint modify column Complaint_After_Sale_Remarks varchar(200) comment '售后备注';

alter table Sales_Record_Complaint modify column Complaint_Phone_Number varchar(20) comment '客户电话';

alter table Sales_Record_Complaint modify column Complaint_Mailbox varchar(50) comment '客户邮箱';

alter table Sales_Record_Complaint modify column Complaint_Recorder varchar(6) comment '投诉记录人';

alter table Sales_Record_Complaint modify column Complaint_Record_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Record_Service                                  */
/*==============================================================*/
create table Sales_Record_Service
(
   Service_ID           varchar(50) not null,
   Project_ID           varchar(50),
   Custormer_ID         varchar(50),
   Service_Product      varchar(50) not null,
   Service_Name         varchar(6) not null,
   Service_Problem_Time datetime not null,
   Service_Dept         varchar(50) not null,
   Service_Feedback_Type varchar(10) not null,
   Service_Feedback_Info varchar(500),
   Service_Attachment   longblob,
   Service_Attachment_To_Customer varchar(200),
   Service_Problem_Remarks varchar(200),
   Service_Type         varchar(10),
   Service_Problem_Deascription varchar(500),
   Service_Operator     varchar(6),
   Service_Procedure    varchar(500),
   Service_Result       varchar(10),
   Service_After_Sale_Remarks varchar(200),
   Service_Phone_Number varchar(20),
   Service_Mailbox      varchar(50),
   Service_Recorder     varchar(6) not null,
   Service_Record_Time  timestamp not null,
   primary key (Service_ID)
);

alter table Sales_Record_Service comment '客服记录信息表';

alter table Sales_Record_Service modify column Service_ID varchar(50) comment '客服记录编号';

alter table Sales_Record_Service modify column Project_ID varchar(50) comment '项目编号';

alter table Sales_Record_Service modify column Custormer_ID varchar(50) comment '企业客户编号';

alter table Sales_Record_Service modify column Service_Product varchar(50) comment '使用产品';

alter table Sales_Record_Service modify column Service_Name varchar(6) comment '反馈人姓名';

alter table Sales_Record_Service modify column Service_Problem_Time datetime comment '问题出现时间';

alter table Sales_Record_Service modify column Service_Dept varchar(50) comment '所在单位';

alter table Sales_Record_Service modify column Service_Feedback_Type varchar(10) comment '反馈方式';

alter table Sales_Record_Service modify column Service_Feedback_Info varchar(500) comment '反馈内容';

alter table Sales_Record_Service modify column Service_Attachment longblob comment '附件';

alter table Sales_Record_Service modify column Service_Attachment_To_Customer varchar(200) comment '客服发送资料';

alter table Sales_Record_Service modify column Service_Problem_Remarks varchar(200) comment '问题描述备注';

alter table Sales_Record_Service modify column Service_Type varchar(10) comment '售后服务类型';

alter table Sales_Record_Service modify column Service_Problem_Deascription varchar(500) comment '问题描述';

alter table Sales_Record_Service modify column Service_Operator varchar(6) comment '处理人';

alter table Sales_Record_Service modify column Service_Procedure varchar(500) comment '处理过程';

alter table Sales_Record_Service modify column Service_Result varchar(10) comment '处理结果';

alter table Sales_Record_Service modify column Service_After_Sale_Remarks varchar(200) comment '售后备注';

alter table Sales_Record_Service modify column Service_Phone_Number varchar(20) comment '客户电话';

alter table Sales_Record_Service modify column Service_Mailbox varchar(50) comment '客户邮箱';

alter table Sales_Record_Service modify column Service_Recorder varchar(6) comment '客服记录人';

alter table Sales_Record_Service modify column Service_Record_Time timestamp comment '创建时间';

/*==============================================================*/
/* Table: Sales_Requirement_Category                            */
/*==============================================================*/
create table Sales_Requirement_Category
(
   Requirement_ID       varchar(50) not null,
   Complaint_ID         varchar(50),
   Service_ID           varchar(50),
   Product_ID           varchar(50),
   Module_ID            varchar(50),
   Feedback_ID          varchar(50),
   Consultation_ID      varchar(50),
   Requirement_Description varchar(1000),
   Requirement_Remarks  varchar(6),
   Requirement_Recorder varchar(50) not null,
   Requirement_Record_Time timestamp not null,
   primary key (Requirement_ID)
);

alter table Sales_Requirement_Category comment '需求分类信息表';

alter table Sales_Requirement_Category modify column Requirement_ID varchar(50) comment '需求编号';

alter table Sales_Requirement_Category modify column Complaint_ID varchar(50) comment '客户投诉记录编号';

alter table Sales_Requirement_Category modify column Service_ID varchar(50) comment '客服记录编号';

alter table Sales_Requirement_Category modify column Product_ID varchar(50) comment '产品编号';

alter table Sales_Requirement_Category modify column Module_ID varchar(50) comment '模块编号';

alter table Sales_Requirement_Category modify column Feedback_ID varchar(50) comment '客户反馈内容编号';

alter table Sales_Requirement_Category modify column Consultation_ID varchar(50) comment '项目咨询编号';

alter table Sales_Requirement_Category modify column Requirement_Description varchar(1000) comment '新需求描述';

alter table Sales_Requirement_Category modify column Requirement_Remarks varchar(6) comment '备注';

alter table Sales_Requirement_Category modify column Requirement_Recorder varchar(50) comment '分类记录人';

alter table Sales_Requirement_Category modify column Requirement_Record_Time timestamp comment '记录时间';

/*==============================================================*/
/* Table: TimeSheet                                             */
/*==============================================================*/
create table TimeSheet
(
   TimeSheet_ID         varchar(50) not null,
   Project_ID           varchar(50) not null,
   Employee_ID          varchar(16),
   TimeSheet_Name       varchar(6) not null,
   TimeSheet_Project_Cagegory varchar(10) not null,
   TimeSheet_Date       datetime not null,
   TimeSheet_PM         varchar(6) not null,
   TimeSheet_Normal     numeric(3,1) not null,
   TimeSheet_Overtime   numeric(3,1),
   TimeSheet_Approved   numeric(3,1),
   TimeSheet_Planned    int(1) not null,
   TimeSheet_Plan       varchar(1000),
   TimeSheet_Content    varchar(1000) not null,
   TimeSheet_Problem    varchar(1000),
   TimeSheet_Assignment_ID varchar(50),
   TimeSheet_Approval_Status int(1),
   TimeSheet_Operate_Time timestamp not null,
   primary key (TimeSheet_ID)
);

alter table TimeSheet comment '工时信息表';

alter table TimeSheet modify column TimeSheet_ID varchar(50) comment '工时信息编号';

alter table TimeSheet modify column Project_ID varchar(50) comment '项目编号';

alter table TimeSheet modify column Employee_ID varchar(16) comment '员工工号';

alter table TimeSheet modify column TimeSheet_Name varchar(6) comment '员工姓名';

alter table TimeSheet modify column TimeSheet_Project_Cagegory varchar(10) comment '项目类别';

alter table TimeSheet modify column TimeSheet_Date datetime comment '日期';

alter table TimeSheet modify column TimeSheet_PM varchar(6) comment '项目经理';

alter table TimeSheet modify column TimeSheet_Normal numeric(3,1) comment '正常工时';

alter table TimeSheet modify column TimeSheet_Overtime numeric(3,1) comment '加班工时';

alter table TimeSheet modify column TimeSheet_Approved numeric(3,1) comment '审核通过加班工时';

alter table TimeSheet modify column TimeSheet_Planned int(1) comment '是否计划';

alter table TimeSheet modify column TimeSheet_Plan varchar(1000) comment '计划任务';

alter table TimeSheet modify column TimeSheet_Content varchar(1000) comment '工作内容';

alter table TimeSheet modify column TimeSheet_Problem varchar(1000) comment '出现问题';

alter table TimeSheet modify column TimeSheet_Assignment_ID varchar(50) comment '关联工作委托编号';

alter table TimeSheet modify column TimeSheet_Approval_Status int(1) comment '审批状态';

alter table TimeSheet modify column TimeSheet_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: Travel_Schedule                                       */
/*==============================================================*/
create table Travel_Schedule
(
   Schedule_ID          varchar(50) not null,
   Travel_Expenses_ID   varchar(50) not null,
   Schedule_Place_Issue varchar(20) not null,
   Schedule_Issue_Time  datetime not null,
   Schedule_Place_Ended varchar(20) not null,
   Schedule_Ended_Time  datetime not null,
   Schedule_Cost_Type   varchar(10) not null,
   Schedule_Cost_Price  numeric(10,2) not null,
   Schedule_Cost_Local_Price numeric(10,2),
   Schedule_Operator    varchar(506) not null,
   Schedule_Operate_Time timestamp not null,
   primary key (Schedule_ID)
);

alter table Travel_Schedule comment '出差报销行程表';

alter table Travel_Schedule modify column Schedule_ID varchar(50) comment '差旅报销行程ID';

alter table Travel_Schedule modify column Travel_Expenses_ID varchar(50) comment '报销申请编号';

alter table Travel_Schedule modify column Schedule_Place_Issue varchar(20) comment '出发地';

alter table Travel_Schedule modify column Schedule_Issue_Time datetime comment '出发时间';

alter table Travel_Schedule modify column Schedule_Place_Ended varchar(20) comment '到达地';

alter table Travel_Schedule modify column Schedule_Ended_Time datetime comment '到达时间';

alter table Travel_Schedule modify column Schedule_Cost_Type varchar(10) comment '交通费用类型';

alter table Travel_Schedule modify column Schedule_Cost_Price numeric(10,2) comment '费用金额';

alter table Travel_Schedule modify column Schedule_Cost_Local_Price numeric(10,2) comment '市内交通费';

alter table Travel_Schedule modify column Schedule_Operator varchar(506) comment '操作人';

alter table Travel_Schedule modify column Schedule_Operate_Time timestamp comment '操作时间';

/*==============================================================*/
/* Table: User_Role                                             */
/*==============================================================*/
create table User_Role
(
   User_Role_ID         varchar(10) not null,
   User_Role_Name       varchar(25) not null,
   User_Role_Status     int(1) not null,
   User_Role_Operator   varchar(6) not null,
   User_Role_Operate_Time timestamp not null,
   primary key (User_Role_ID)
);

alter table User_Role comment '用户角色表';

alter table User_Role modify column User_Role_ID varchar(10) comment '用户角色ID';

alter table User_Role modify column User_Role_Name varchar(25) comment '角色名称';

alter table User_Role modify column User_Role_Status int(1) comment '角色状态';

alter table User_Role modify column User_Role_Operator varchar(6) comment '操作人';

alter table User_Role modify column User_Role_Operate_Time timestamp comment '操作时间';

alter table Accounts_Payable add constraint FK_Reference_30 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Accounts_Receivable add constraint FK_Reference_29 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Budget_Expenses add constraint FK_Reference_40 foreign key (Budget_ID)
      references Project_Budget (Budget_ID) on delete restrict on update restrict;

alter table Budget_Labor add constraint FK_Reference_39 foreign key (Budget_ID)
      references Project_Budget (Budget_ID) on delete restrict on update restrict;

alter table Budget_Purchase add constraint FK_Reference_41 foreign key (Budget_ID)
      references Project_Budget (Budget_ID) on delete restrict on update restrict;

alter table Contract add constraint FK_Reference_32 foreign key (Customer_ID)
      references Sales_Company_Customer (Customer_ID) on delete restrict on update restrict;

alter table Contract add constraint FK_Reference_34 foreign key (Business_ID)
      references Sales_Business (Business_ID) on delete restrict on update restrict;

alter table Contract_Additional_Records add constraint FK_Reference_36 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Contract_Delivery add constraint FK_Reference_37 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Delivery_Plan add constraint FK_Reference_31 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Inner_Org_Employee add constraint FK_Reference_2 foreign key (Dept_ID)
      references Inner_Org_Dept (Dept_ID) on delete restrict on update restrict;

alter table Inner_Org_Employee add constraint FK_Reference_3 foreign key (Job_ID)
      references Inner_Org_Job (Job_ID) on delete restrict on update restrict;

alter table Inner_Org_Employee add constraint FK_Reference_4 foreign key (Inner_User_ID)
      references Inner_User (Inner_User_ID) on delete restrict on update restrict;

alter table Inner_Org_Employee add constraint FK_Reference_5 foreign key (User_Role_ID)
      references User_Role (User_Role_ID) on delete restrict on update restrict;

alter table Inner_Org_Employee add constraint FK_Reference_7 foreign key (Module_ID)
      references Function_Module (Module_ID) on delete restrict on update restrict;

alter table Inner_Org_Job add constraint FK_Reference_6 foreign key (Dept_ID)
      references Inner_Org_Dept (Dept_ID) on delete restrict on update restrict;

alter table Payment_Paid add constraint FK_Reference_44 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Payment_Paid add constraint FK_Reference_45 foreign key (Purchase_ID)
      references Purchase (Purchase_ID) on delete restrict on update restrict;

alter table Payment_Received add constraint FK_Reference_42 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Payment_Received add constraint FK_Reference_43 foreign key (Business_ID)
      references Sales_Business (Business_ID) on delete restrict on update restrict;

alter table Purchase add constraint FK_Reference_46 foreign key (Project_ID)
      references Sales_Project (Project_ID) on delete restrict on update restrict;

alter table Sales_Bug_Category add constraint FK_Reference_18 foreign key (Complaint_ID)
      references Sales_Record_Complaint (Complaint_ID) on delete restrict on update restrict;

alter table Sales_Bug_Category add constraint FK_Reference_19 foreign key (Service_ID)
      references Sales_Record_Service (Service_ID) on delete restrict on update restrict;

alter table Sales_Bug_Category add constraint FK_Reference_22 foreign key (Product_ID)
      references Sales_Product_Category (Product_ID) on delete restrict on update restrict;

alter table Sales_Bug_Category add constraint FK_Reference_25 foreign key (Module_ID)
      references Sales_Module_Category (Module_ID) on delete restrict on update restrict;

alter table Sales_Bug_Category add constraint FK_Reference_26 foreign key (Feedback_ID)
      references Sales_Online_FeedBack (FeedBack_ID) on delete restrict on update restrict;

alter table Sales_Business add constraint FK_Reference_12 foreign key (Customer_ID)
      references Sales_Company_Customer (Customer_ID) on delete restrict on update restrict;

alter table Sales_Competitor add constraint FK_Reference_35 foreign key (Customer_ID)
      references Sales_Company_Customer (Customer_ID) on delete restrict on update restrict;

alter table Sales_Customer_Child_Company add constraint FK_Reference_8 foreign key (Customer__ID)
      references Sales_Company_Customer (Customer_ID) on delete restrict on update restrict;

alter table Sales_Customer_Contact add constraint FK_Reference_11 foreign key (Customer_ID)
      references Sales_Company_Customer (Customer_ID) on delete restrict on update restrict;

alter table Sales_Customer_Dept add constraint FK_Reference_9 foreign key (Child_Company_ID)
      references Sales_Customer_Child_Company (Child_Company_ID) on delete restrict on update restrict;

alter table Sales_Customer__Job add constraint FK_Reference_10 foreign key (Customer_Dept_ID)
      references Sales_Customer_Dept (Customer_Dept_ID) on delete restrict on update restrict;

alter table Sales_Project add constraint FK_Reference_13 foreign key (Customer_ID)
      references Sales_Company_Customer (Customer_ID) on delete restrict on update restrict;

alter table Sales_Project add constraint FK_Reference_14 foreign key (Bussiness_ID)
      references Sales_Business (Business_ID) on delete restrict on update restrict;

alter table Sales_Project add constraint FK_Reference_33 foreign key (Contract_ID)
      references Contract (Contract_ID) on delete restrict on update restrict;

alter table Sales_Record add constraint FK_Reference_15 foreign key (Customer_ID)
      references Sales_Company_Customer (Customer_ID) on delete restrict on update restrict;

alter table Sales_Record_Complaint add constraint FK_Reference_17 foreign key (Project_ID)
      references Sales_Project (Project_ID) on delete restrict on update restrict;

alter table Sales_Record_Service add constraint FK_Reference_16 foreign key (Project_ID)
      references Sales_Project (Project_ID) on delete restrict on update restrict;

alter table Sales_Requirement_Category add constraint FK_Reference_20 foreign key (Service_ID)
      references Sales_Record_Service (Service_ID) on delete restrict on update restrict;

alter table Sales_Requirement_Category add constraint FK_Reference_21 foreign key (Complaint_ID)
      references Sales_Record_Complaint (Complaint_ID) on delete restrict on update restrict;

alter table Sales_Requirement_Category add constraint FK_Reference_23 foreign key (Product_ID)
      references Sales_Product_Category (Product_ID) on delete restrict on update restrict;

alter table Sales_Requirement_Category add constraint FK_Reference_24 foreign key (Module_ID)
      references Sales_Module_Category (Module_ID) on delete restrict on update restrict;

alter table Sales_Requirement_Category add constraint FK_Reference_27 foreign key (Feedback_ID)
      references Sales_Online_FeedBack (FeedBack_ID) on delete restrict on update restrict;

alter table Sales_Requirement_Category add constraint FK_Reference_28 foreign key (Consultation_ID)
      references Sales_Project_Consultation (Consultation_ID) on delete restrict on update restrict;

alter table TimeSheet add constraint FK_Reference_47 foreign key (Project_ID)
      references Sales_Project (Project_ID) on delete restrict on update restrict;

alter table TimeSheet add constraint FK_Reference_48 foreign key (Employee_ID)
      references Inner_Org_Employee (Employee_ID) on delete restrict on update restrict;

alter table Travel_Schedule add constraint FK_Reference_38 foreign key (Travel_Expenses_ID)
      references Approval_Expenses__Travel (Expenses_Travel_ID) on delete restrict on update restrict;

-- ---------------------------------------------------------bootdo start------------------------------------------------------

/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50717
Source Host           : localhost:3306
Source Database       : bootdo

Target Server Type    : MYSQL
Target Server Version : 50717
File Encoding         : 65001

Date: 2017-10-24 14:33:44
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `blog_content`
-- ----------------------------
DROP TABLE IF EXISTS `blog_content`;
CREATE TABLE `blog_content` (
  `cid` bigint(20) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `slug` varchar(255) DEFAULT NULL,
  `created` bigint(20) DEFAULT NULL COMMENT '创建人id',
  `modified` bigint(20) DEFAULT NULL COMMENT '最近修改人id',
  `content` text COMMENT '内容',
  `type` varchar(16) DEFAULT NULL COMMENT '类型',
  `tags` varchar(200) DEFAULT NULL COMMENT '标签',
  `categories` varchar(200) DEFAULT NULL COMMENT '分类',
  `hits` int(5) DEFAULT NULL,
  `comments_num` int(5) DEFAULT '0' COMMENT '评论数量',
  `allow_comment` int(1) DEFAULT '0' COMMENT '开启评论',
  `allow_ping` int(1) DEFAULT '0' COMMENT '允许ping',
  `allow_feed` int(1) DEFAULT '0' COMMENT '允许反馈',
  `status` int(1) DEFAULT NULL COMMENT '状态',
  `author` varchar(100) DEFAULT NULL COMMENT '作者',
  `gtm_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gtm_modified` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8 COMMENT='文章内容';

-- ----------------------------
-- Records of blog_content
-- ----------------------------
INSERT INTO `blog_content` VALUES ('75', '基于 Springboot 和 Mybatis 的后台管理系统 BootDo', null, null, null, '<h3 style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif;\">项目介绍</h3><ul style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 0px 30px; list-style-position: initial; list-style-image: initial; color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif; font-size: 16px;\"><li><p>面向学习型的开源框架，简洁高效，减少过渡封装，展现技术本质</p></li><li><p>Springboot作为基础框架，使用mybatis作为持久层框架</p></li><li><p>使用官方推荐的thymeleaf做为模板引擎，shiro作为安全框架,主流技术，“一网打尽”</p></li><li><p>基于注解的sql写法，零XML，极简配置，一键前后台代码生成</p></li></ul><p style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif; font-size: 16px;\"><span style=\"font-weight: bolder;\">演示地址</span>&nbsp;<a href=\"http://47.93.239.129/\" style=\"outline: 0px; color: rgb(68, 102, 187);\">http://47.93.239.129</a></p><h3 style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif;\">功能简介</h3><p style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif; font-size: 16px;\">1. 用户管理<br>2. 角色管理<br>3. 部门管理<br>4. 菜单管理<br>5. 系统日志<br>6. 代码生成<br>7. 内容管理</p><h3 style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif;\">所用框架</h3><p style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif; font-size: 16px;\"><span style=\"font-weight: bolder;\">前端</span><br>1. Bootstrap<br>2. jQuery<br>3. bootstrap-table<br>4. layer<br>5. jsTree&nbsp;<br>6. summernote<br>7. jquery-validate<br>8. jquery-treegrid</p><p style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif; font-size: 16px;\"><span style=\"font-weight: bolder;\">后端</span><br>1. SpringBoot&nbsp;<br>2. MyBatis<br>3. Thymeleaf<br>4. Shiro<br>5. druid</p><p style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif; font-size: 16px;\"><span style=\"font-weight: bolder;\">项目截图</span></p><p style=\"color: rgb(17, 17, 17); font-family: &quot;PingFang SC&quot;, &quot;Helvetica Neue&quot;, &quot;Microsoft YaHei UI&quot;, &quot;Microsoft YaHei&quot;, &quot;Noto Sans CJK SC&quot;, Sathu, EucrosiaUPC, sans-serif; font-size: 16px;\"><img height=\"400\" src=\"https://static.oschina.net/uploads/space/2017/0912/182421_5LaN_3244087.png\" width=\"650\" style=\"border-width: initial; border-style: none; outline: 0px; width: 882px; max-width: -webkit-fit-content; height: auto;\"></p>', 'article', null, null, null, null, '0', '0', '1', '1', 'bootdo', '2017-09-22 14:44:44', '2017-09-22 14:44:44');
INSERT INTO `blog_content` VALUES ('100', 'springboot thymeleaf和shiro 整合——按钮可见性', null, null, null, '<p style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin-bottom: 16px; color: rgb(61, 70, 77); font-family: &quot;Pingfang SC&quot;, STHeiti, &quot;Lantinghei SC&quot;, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; font-size: 16px; background-color: rgb(248, 248, 248);\">添加依赖</p><pre class=\"hljs xml\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; padding: 2px; background: rgb(63, 63, 63); color: rgb(220, 220, 220); border-radius: 3px; line-height: 1.4; word-wrap: normal; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace;\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">&lt;<span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">dependency</span>&gt;</span><code class=\"hljs xml\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; display: block; overflow-x: auto; padding: 10px; background: rgb(63, 63, 63); color: rgb(220, 220, 220); border-radius: 4px; font-size: 13px; line-height: 1.4; word-wrap: normal; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace;\"> \r\n   <span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&lt;</span><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">groupId</span></span></span><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&gt;</span></span>com.github.theborakompanioni<span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&lt;/</span><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">groupId</span></span></span><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&gt;</span></span>\r\n    <span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&lt;</span><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">artifactId</span></span></span><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&gt;</span></span>thymeleaf-extras-shiro<span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&lt;/</span><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">artifactId</span></span></span><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&gt;</span></span>\r\n    <span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&lt;</span><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">version</span></span></span><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&gt;</span></span></code>1.2.1<code class=\"hljs xml\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; display: block; overflow-x: auto; padding: 10px; background: rgb(63, 63, 63); color: rgb(220, 220, 220); border-radius: 4px; font-size: 13px; line-height: 1.4; word-wrap: normal; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace;\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&lt;/</span><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">version</span></span></span><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&gt;</span></span> \r\n<span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&lt;/</span><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\"><span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">dependency</span></span></span><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">&gt;</span></span></code></pre><p style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin-bottom: 16px; color: rgb(61, 70, 77); font-family: &quot;Pingfang SC&quot;, STHeiti, &quot;Lantinghei SC&quot;, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; font-size: 16px; background-color: rgb(248, 248, 248);\">&nbsp;</p><p style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin-bottom: 16px; color: rgb(61, 70, 77); font-family: &quot;Pingfang SC&quot;, STHeiti, &quot;Lantinghei SC&quot;, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; font-size: 16px; background-color: rgb(248, 248, 248);\">在shiro的configuration中配置</p><pre class=\"hljs java\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; padding: 2px; background: rgb(63, 63, 63); color: rgb(220, 220, 220); border-radius: 3px; line-height: 1.4; word-wrap: normal; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace;\"><span class=\"hljs-meta\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(127, 159, 127);\">@Bean</span>\r\n    <span class=\"hljs-function\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\"><span class=\"hljs-keyword\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">public</span> ShiroDialect <span class=\"hljs-title\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">shiroDialect</span><span class=\"hljs-params\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">()</span> </span>{\r\n        <span class=\"hljs-keyword\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">return</span> <span class=\"hljs-keyword\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">new</span> ShiroDialect();\r\n    }</pre><p style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin-bottom: 16px; color: rgb(61, 70, 77); font-family: &quot;Pingfang SC&quot;, STHeiti, &quot;Lantinghei SC&quot;, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; font-size: 16px; background-color: rgb(248, 248, 248);\">&nbsp;</p><p style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin-bottom: 16px; color: rgb(61, 70, 77); font-family: &quot;Pingfang SC&quot;, STHeiti, &quot;Lantinghei SC&quot;, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; font-size: 16px; background-color: rgb(248, 248, 248);\">在html中加入xmlns</p><pre class=\"hljs xml\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; padding: 2px; background: rgb(63, 63, 63); color: rgb(220, 220, 220); border-radius: 3px; line-height: 1.4; word-wrap: normal; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace;\"><span class=\"hljs-tag\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">&lt;<span class=\"hljs-name\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(239, 239, 143);\">html</span> <span class=\"hljs-attr\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">lang</span>=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"zh_CN\"</span> <span class=\"hljs-attr\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">xmlns:th</span>=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"http://www.thymeleaf.org\"</span>\r\n      <span class=\"hljs-attr\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\">xmlns:shiro</span>=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"http://www.pollix.at/thymeleaf/shiro\"</span>&gt;</span></pre><p style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; margin-bottom: 16px; color: rgb(61, 70, 77); font-family: &quot;Pingfang SC&quot;, STHeiti, &quot;Lantinghei SC&quot;, &quot;Open Sans&quot;, Arial, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, SimSun, sans-serif; font-size: 16px; background-color: rgb(248, 248, 248);\">例子</p><pre class=\"hljs scala\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; padding: 2px; background: rgb(63, 63, 63); color: rgb(220, 220, 220); border-radius: 3px; line-height: 1.4; word-wrap: normal; font-family: Menlo, Monaco, Consolas, &quot;Courier New&quot;, monospace;\">&lt;button shiro:hasPermission=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"sys:user:add\"</span> <span class=\"hljs-class\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\"><span class=\"hljs-keyword\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">type</span></span>=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"button\"</span> <span class=\"hljs-class\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\"><span class=\"hljs-keyword\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">class</span></span>=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"btn &nbsp;btn-primary\"</span> onclick=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"add()\"</span>&gt;\r\n&nbsp;&nbsp; &lt;i <span class=\"hljs-class\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent;\"><span class=\"hljs-keyword\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(227, 206, 171);\">class</span></span>=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"fa fa-plus\"</span> aria-hidden=<span class=\"hljs-string\" style=\"box-sizing: inherit; -webkit-tap-highlight-color: transparent; color: rgb(204, 147, 147);\">\"true\"</span>&gt;&lt;/i&gt;添加\r\n&lt;/button&gt;</pre>', 'article', null, null, null, null, '1', null, '0', '1', 'bootdo', '2017-09-22 13:24:30', '2017-09-22 13:24:30');
INSERT INTO `blog_content` VALUES ('108', 'spring boot ehcache整合', null, null, null, '<h3 id=\"pomxml配置-引入依赖包\" style=\"font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; color: rgb(63, 63, 63); margin: 0.8em 0px; font-size: 1.7em; padding: 0px;\">pom.xml配置 引入依赖包</h3><pre class=\"prettyprint\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; font-size: 14px; white-space: nowrap; padding: 5px 5px 5px 60px; margin-bottom: 1.1em; line-height: 1.45; background-color: rgba(128, 128, 128, 0.05); border-color: rgba(128, 128, 128, 0.075); border-radius: 0px; position: relative; overflow-y: hidden;\"><code class=\"hljs xml has-numbering\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; white-space: pre; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; display: block; word-wrap: normal;\"><span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">dependency</span>&gt;</span>\r\n    <span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">groupId</span>&gt;</span>org.springframework.boot<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">groupId</span>&gt;</span>\r\n    <span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">artifactId</span>&gt;</span>spring-boot-starter-cache<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">artifactId</span>&gt;</span>\r\n<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">dependency</span>&gt;</span>\r\n<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">dependency</span>&gt;</span>\r\n    <span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">groupId</span>&gt;</span>net.sf.ehcache<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">groupId</span>&gt;</span>\r\n    <span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">artifactId</span>&gt;</span>ehcache<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">artifactId</span>&gt;</span>\r\n<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">dependency</span>&gt;</span></code><ul class=\"pre-numbering\" style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 6px 0px 40px; list-style: none; position: absolute; width: 50px; background-color: rgb(238, 238, 238); top: 0px; left: 0px; border-right: 1px solid rgb(221, 221, 221); text-align: right;\"><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">1</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">2</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">3</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">4</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">5</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">6</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">7</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">8</li></ul></pre><h3 id=\"编写配置类设置缓存机制\" style=\"font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; color: rgb(63, 63, 63); margin: 0.8em 0px; font-size: 1.7em; padding: 0px;\">编写配置类,设置缓存机制</h3><pre class=\"prettyprint\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; font-size: 14px; white-space: nowrap; padding: 5px 5px 5px 60px; margin-bottom: 1.1em; line-height: 1.45; background-color: rgba(128, 128, 128, 0.05); border-color: rgba(128, 128, 128, 0.075); border-radius: 0px; position: relative; overflow-y: hidden;\"><code class=\"hljs java has-numbering\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; white-space: pre; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; display: block; word-wrap: normal;\"><span class=\"hljs-annotation\" style=\"margin: 0px; padding: 0px; color: rgb(155, 133, 157);\">@Configuration</span>\r\n<span class=\"hljs-annotation\" style=\"margin: 0px; padding: 0px; color: rgb(155, 133, 157);\">@EnableCaching</span>\r\n<span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">public</span> <span class=\"hljs-class\" style=\"margin: 0px; padding: 0px;\"><span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">class</span> <span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">CacheConfiguration</span> {</span>\r\n\r\n    <span class=\"hljs-annotation\" style=\"margin: 0px; padding: 0px; color: rgb(155, 133, 157);\">@Bean</span>\r\n    <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">public</span> EhCacheCacheManager <span class=\"hljs-title\" style=\"margin: 0px; padding: 0px;\">ehCacheCacheManager</span>(EhCacheManagerFactoryBean bean) {\r\n        <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">return</span> <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">new</span> EhCacheCacheManager(bean.getObject());\r\n    }\r\n\r\n    <span class=\"hljs-annotation\" style=\"margin: 0px; padding: 0px; color: rgb(155, 133, 157);\">@Bean</span>\r\n    <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">public</span> EhCacheManagerFactoryBean <span class=\"hljs-title\" style=\"margin: 0px; padding: 0px;\">ehCacheManagerFactoryBean</span>() {\r\n        EhCacheManagerFactoryBean cacheManagerFactoryBean = <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">new</span> EhCacheManagerFactoryBean();\r\n        cacheManagerFactoryBean.setConfigLocation(<span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">new</span> ClassPathResource(<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"config/ehcache.xml\"</span>));\r\n        cacheManagerFactoryBean.setShared(<span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">true</span>);\r\n        <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">return</span> cacheManagerFactoryBean;\r\n    }\r\n}</code><ul class=\"pre-numbering\" style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 6px 0px 40px; list-style: none; position: absolute; width: 50px; background-color: rgb(238, 238, 238); top: 0px; left: 0px; border-right: 1px solid rgb(221, 221, 221); text-align: right;\"><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">1</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">2</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">3</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">4</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">5</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">6</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">7</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">8</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">9</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">10</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">11</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">12</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">13</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">14</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">15</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">16</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">17</li></ul></pre><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(63, 63, 63); font-family: &quot;microsoft yahei&quot;; font-size: 15px;\">ehcache.xml配置:</p><pre class=\"prettyprint\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; font-size: 14px; white-space: nowrap; padding: 5px 5px 5px 60px; margin-bottom: 1.1em; line-height: 1.45; background-color: rgba(128, 128, 128, 0.05); border-color: rgba(128, 128, 128, 0.075); border-radius: 0px; position: relative; overflow-y: hidden;\"><code class=\"hljs xml has-numbering\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; white-space: pre; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; display: block; word-wrap: normal;\"><span class=\"hljs-pi\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;?xml version=\"1.0\" encoding=\"UTF-8\"?&gt;</span>\r\n<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">ehcache</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">xmlns:xsi</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"http://www.w3.org/2001/XMLSchema-instance\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">xsi:noNamespaceSchemaLocation</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"http://ehcache.org/ehcache.xsd\"</span>\r\n    <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">updateCheck</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"false\"</span>&gt;</span>\r\n    <span class=\"hljs-comment\" style=\"margin: 0px; padding: 0px; color: rgb(136, 0, 0);\">&lt;!-- diskStore：为缓存路径，ehcache分为内存和磁盘两级，此属性定义磁盘的缓存位置。\r\n    参数解释如下： user.home – 用户主目录 \r\n    user.dir – 用户当前工作目录 \r\n    java.io.tmpdir – 默认临时文件路径 --&gt;</span>\r\n    <span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">diskStore</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">path</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"java.io.tmpdir/Tmp_EhCache\"</span> /&gt;</span>\r\n    <span class=\"hljs-comment\" style=\"margin: 0px; padding: 0px; color: rgb(136, 0, 0);\">&lt;!-- defaultCache：默认缓存策略，当ehcache找不到定义的缓存时，则使用这个缓存策略。只能定义一个。 --&gt;</span>\r\n    <span class=\"hljs-comment\" style=\"margin: 0px; padding: 0px; color: rgb(136, 0, 0);\">&lt;!-- name:缓存名称。 \r\n        maxElementsInMemory:缓存最大数目\r\n        maxElementsOnDisk：硬盘最大缓存个数。 \r\n        eternal:对象是否永久有效，一但设置了，timeout将不起作用。 \r\n        overflowToDisk:是否保存到磁盘，当系统当机时 \r\n        timeToIdleSeconds:设置对象在失效前的允许闲置时间（单位：秒）。仅当eternal=false对象不是永久有效时使 用，可选属性，默认值是0，也就是可闲置时间无穷大。\r\n        timeToLiveSeconds:设置对象在失效前允许存活时间（单位：秒）。最大时间介于创建时间和失效时间之间。仅 当eternal=false对象不是永久有效时使用，默认是0.，也就是对象存活时间无穷大。 \r\n        diskPersistent：是否缓存虚拟机重启期数据Whether the disk store persists between restarts \r\n        of the Virtual Machine. The default value is false. \r\n        diskSpoolBufferSizeMB：这个参数设置DiskStore（磁盘缓存）的缓存区大小。默认是30MB。每个Cache都应该 有自己的一个缓冲区。 \r\n        diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔，默认是120秒。 \r\n        memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内 存。默认策略是LRU（最近最少使用）。\r\n        你可以设置为FIFO（先进先出）或是LFU（较少使用）。 \r\n        clearOnFlush：内存数量最大时是否清除。\r\n        memoryStoreEvictionPolicy:可选策略有：LRU（最近最少使用，默认策略）、FIFO（先进先出）、LFU（最少 访问次数）。 \r\n         FIFO，first in first out，这个是大家最熟的，先进先出。\r\n         LFU， Less Frequently Used，就是上面例子中使用的策略，直白一点就是讲一直以来最少被使用的。如上面 所讲，缓存的元素有一个hit属性，hit值最小的将会被清出缓存。 \r\n         LRU，Least Recently Used，最近最少使用的，缓存的元素有一个时间戳，当缓存容量满了，而又需要腾出地 方来缓存新的元素的时候，\r\n         那么现有缓存元素中时间戳离当前时间最远的元素将被清出缓存。 --&gt;</span>\r\n    <span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">defaultCache</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">eternal</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"false\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">maxElementsInMemory</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"1000\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">overflowToDisk</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"false\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">diskPersistent</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"false\"</span>\r\n        <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">timeToIdleSeconds</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"0\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">timeToLiveSeconds</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"600\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">memoryStoreEvictionPolicy</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"LRU\"</span> /&gt;</span>\r\n    <span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">cache</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">name</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"snailAuthCache\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">eternal</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"false\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">maxElementsInMemory</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"10000\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">overflowToDisk</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"false\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">diskPersistent</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"false\"</span>\r\n        <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">timeToIdleSeconds</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"0\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">timeToLiveSeconds</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"0\"</span> <span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">memoryStoreEvictionPolicy</span>=<span class=\"hljs-value\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"LFU\"</span> /&gt;</span>\r\n<span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">ehcache</span>&gt;</span></code><ul class=\"pre-numbering\" style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 6px 0px 40px; list-style: none; position: absolute; width: 50px; background-color: rgb(238, 238, 238); top: 0px; left: 0px; border-right: 1px solid rgb(221, 221, 221); text-align: right;\"><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">1</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">2</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">3</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">4</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">5</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">6</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">7</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">8</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">9</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">10</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">11</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">12</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">13</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">14</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">15</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">16</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">17</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">18</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">19</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">20</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">21</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">22</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">23</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">24</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">25</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">26</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">27</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">28</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">29</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">30</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">31</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">32</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">33</li></ul><div class=\"save_code tracking-ad\" data-mod=\"popu_249\" style=\"margin: 0px; padding: 0px; position: absolute; height: 60px; right: 30px; top: 5px; color: rgb(255, 255, 255); cursor: pointer; z-index: 2;\"><a style=\"color: rgb(202, 12, 22); margin: 0px; padding: 0px; outline: none;\"><img src=\"http://static.blog.csdn.net/images/save_snippets.png\" style=\"outline: none; max-width: 100%;\"></a></div></pre><h3 id=\"测试\" style=\"font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; color: rgb(63, 63, 63); margin: 0.8em 0px; font-size: 1.7em; padding: 0px;\"><br></h3>', 'article', null, null, null, null, '1', null, '0', '1', 'bootdo', '2017-09-22 17:48:29', '2017-09-22 17:48:29');
INSERT INTO `blog_content` VALUES ('109', 'spring-boot整合ehcache实现缓存机制', null, null, null, '<p><br></p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　EhCache 是一个纯Java的进程内缓存框架，具有快速、精干等特点，是Hibernate中默认的CacheProvider。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　ehcache提供了多种缓存策略，主要分为内存和磁盘两级，所以无需担心容量问题。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　spring-boot是一个快速的集成框架，其设计目的是用来简化新Spring应用的初始搭建以及开发过程。该框架使用了特定的方式来进行配置，从而使开发人员不再需要定义样板化的配置。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　由于spring-boot无需任何样板化的配置文件，所以spring-boot集成一些其他框架时会有略微的不同。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　1.spring-boot是一个通过maven管理的jar包的框架，集成ehcache需要的依赖如下</p><div class=\"cnblogs_code\" style=\"background-color: rgb(245, 245, 245); border: 1px solid rgb(204, 204, 204); padding: 5px; overflow: auto; margin: 5px 0px; color: rgb(0, 0, 0); font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div><pre style=\"margin-bottom: 0px; line-height: 1.42857; font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>org.springframework<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n     <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-context-support<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n         <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>net.sf.ehcache<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n      <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>ehcache<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n          <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>2.8.3<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>        </pre><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div></div><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　　　具体pom.xml文件如下</p><div class=\"cnblogs_code\" style=\"background-color: rgb(245, 245, 245); border: 1px solid rgb(204, 204, 204); padding: 5px; overflow: auto; margin: 5px 0px; color: rgb(0, 0, 0); font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div><pre style=\"margin-bottom: 0px; line-height: 1.42857; font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;?</span><span style=\"color: rgb(255, 0, 255); line-height: 1.5 !important;\">xml version=\"1.0\" encoding=\"UTF-8\"</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">?&gt;</span>\r\n<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">project </span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">xmlns</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"http://maven.apache.org/POM/4.0.0\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> xmlns:xsi</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"http://www.w3.org/2001/XMLSchema-instance\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">\r\n    xsi:schemaLocation</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"http://maven.apache.org/POM/4.0.0 http://maven.apache.org/xsd/maven-4.0.0.xsd\"</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">modelVersion</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>4.0.0<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">modelVersion</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>com.lclc.boot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>boot-cache<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>0.0.1-SNAPSHOT<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">&lt;!--</span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\"> Inherit defaults from Spring Boot </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">--&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">parent</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>org.springframework.boot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-boot-starter-parent<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>1.1.3.RELEASE<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">parent</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependencies</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>org.springframework.boot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-boot-starter-web<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>org.springframework.boot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-boot-starter-data-jpa<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>org.springframework.boot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-boot-starter-thymeleaf<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        \r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>mysql<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>mysql-connector-java<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>com.google.guava<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>guava<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>17.0<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        \r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>org.springframework<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-context-support<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>net.sf.ehcache<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>ehcache<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>2.8.3<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">version</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependency</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependencies</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependencyManagement</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependencies</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependencies</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">dependencyManagement</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">build</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">plugins</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">plugin</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n                <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>org.springframework.boot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">groupId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n                <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-boot-maven-plugin<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">artifactId</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">plugin</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">plugins</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">build</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">repositories</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">repository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-snapshots<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>http://repo.spring.io/snapshot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">snapshots</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n                <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">enabled</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>true<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">enabled</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">snapshots</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">repository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">repository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-milestones<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>http://repo.spring.io/milestone<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">repository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">repositories</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">pluginRepositories</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">pluginRepository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-snapshots<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>http://repo.spring.io/snapshot<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">pluginRepository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">pluginRepository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>spring-milestones<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">id</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>http://repo.spring.io/milestone<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">url</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n        <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">pluginRepository</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">pluginRepositories</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n\r\n<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">project</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span></pre><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div></div><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp;　　2.使用ehcache，我们需要一个ehcache.xml来定义一些cache的属性。</p><div class=\"cnblogs_code\" style=\"background-color: rgb(245, 245, 245); border: 1px solid rgb(204, 204, 204); padding: 5px; overflow: auto; margin: 5px 0px; color: rgb(0, 0, 0); font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div><pre style=\"margin-bottom: 0px; line-height: 1.42857; font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;?</span><span style=\"color: rgb(255, 0, 255); line-height: 1.5 !important;\">xml version=\"1.0\" encoding=\"UTF-8\"</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">?&gt;</span>\r\n<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">ehcache </span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">xmlns:xsi</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"http://www.w3.org/2001/XMLSchema-instance\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> xsi:noNamespaceSchemaLocation</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"http://ehcache.org/ehcache.xsd\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">\r\n  updateCheck</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"false\"</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span>\r\n          <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">diskStore </span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">path</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"java.io.tmpdir/Tmp_EhCache\"</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">/&gt;</span>\r\n           <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">defaultCache </span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">eternal</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"false\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> maxElementsInMemory</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"1000\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> overflowToDisk</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"false\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> diskPersistent</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"false\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">\r\n    timeToIdleSeconds</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"0\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> timeToLiveSeconds</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"600\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> memoryStoreEvictionPolicy</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"LRU\"</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">/&gt;</span>\r\n\r\n            <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">cache </span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">name</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"demo\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> eternal</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"false\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> maxElementsInMemory</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"100\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> overflowToDisk</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"false\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> diskPersistent</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"false\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\">\r\n    timeToIdleSeconds</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"0\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> timeToLiveSeconds</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"300\"</span><span style=\"color: rgb(255, 0, 0); line-height: 1.5 !important;\"> memoryStoreEvictionPolicy</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">=\"LRU\"</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">/&gt;</span>\r\n\r\n<span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&lt;/</span><span style=\"color: rgb(128, 0, 0); line-height: 1.5 !important;\">ehcache</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">&gt;</span></pre><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div></div><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp;　　解释下这个xml文件中的标签。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　(1).<span style=\"color: rgb(128, 0, 0);\">diskStore：</span>&nbsp;为缓存路径，ehcache分为内存和磁盘两级，此属性定义磁盘的缓存位置。参数解释如下：　　　　<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　　　　user.home – 用户主目录<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 　　　 　user.dir&nbsp; – 用户当前工作目录<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;　　　　&nbsp; java.io.tmpdir – 默认临时文件路径</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　(2).<span style=\"color: rgb(128, 0, 0);\">defaultCache：<span style=\"color: rgb(0, 0, 0);\">默认缓存策略，当ehcache找不到定义的缓存时，则使用这个缓存策略。只能定义一个。</span></span></p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\"><span style=\"color: rgb(128, 0, 0);\"><span style=\"color: rgb(0, 0, 0);\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; (3).<span style=\"color: rgb(128, 0, 0);\">cache</span>：自定缓存策略，为自定义的缓存策略。参数解释如下：</span></span></p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\"><span style=\"color: rgb(128, 0, 0);\"><span style=\"color: rgb(0, 0, 0);\">　　　 cache元素的属性：&nbsp; &nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; name：缓存名称&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxElementsInMemory：内存中最大缓存对象数&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; maxElementsOnDisk：硬盘中最大缓存对象数，若是0表示无穷大&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; eternal：true表示对象永不过期，此时会忽略timeToIdleSeconds和timeToLiveSeconds属性，默认为false &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; overflowToDisk：true表示当内存缓存的对象数目达到了maxElementsInMemory界限后，会把溢出的对象写到硬盘缓存中。注意：如果缓存的对象要写入到硬盘中的话，则该对象必须实现了Serializable接口才行。&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; diskSpoolBufferSizeMB：磁盘缓存区大小，默认为30MB。每个Cache都应该有自己的一个缓存区。&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; diskPersistent：是否缓存虚拟机重启期数据&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; diskExpiryThreadIntervalSeconds：磁盘失效线程运行时间间隔，默认为120秒&nbsp; &nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; timeToIdleSeconds： 设定允许对象处于空闲状态的最长时间，以秒为单位。当对象自从最近一次被访问后，如果处于空闲状态的时间超过了timeToIdleSeconds属性值，这个对象就会过期，EHCache将把它从缓存中清空。只有当eternal属性为false，该属性才有效。如果该属性值为0，则表示对象可以无限期地处于空闲状态&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; timeToLiveSeconds：设定对象允许存在于缓存中的最长时间，以秒为单位。当对象自从被存放到缓存中后，如果处于缓存中的时间超过了 timeToLiveSeconds属性值，这个对象就会过期，EHCache将把它从缓存中清除。只有当eternal属性为false，该属性才有效。如果该属性值为0，则表示对象可以无限期地存在于缓存中。timeToLiveSeconds必须大于timeToIdleSeconds属性，才有意义&nbsp; &nbsp;&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; memoryStoreEvictionPolicy：当达到maxElementsInMemory限制时，Ehcache将会根据指定的策略去清理内存。可选策略有：LRU（最近最少使用，默认策略）、FIFO（先进先出）、LFU（最少访问次数）。&nbsp;&nbsp;</span></span></p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp;</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\"><span style=\"color: rgb(128, 0, 0);\"><span style=\"color: rgb(0, 0, 0);\">　　3.将ehcache的管理器暴露给spring的上下文容器，</span></span></p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\"><span style=\"color: rgb(128, 0, 0);\"><span style=\"color: rgb(0, 0, 0);\">　　</span></span></p><div class=\"cnblogs_code\" style=\"background-color: rgb(245, 245, 245); border: 1px solid rgb(204, 204, 204); padding: 5px; overflow: auto; margin: 5px 0px; color: rgb(0, 0, 0); font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div><pre style=\"margin-bottom: 0px; line-height: 1.42857; font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">@Configuration\r\n</span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">//</span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\"> 标注启动了缓存</span>\r\n<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">@EnableCaching\r\n</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">class</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> CacheConfiguration {\r\n\r\n    </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">/*</span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">\r\n     * ehcache 主要的管理器\r\n     </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">*/</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">\r\n    @Bean(name </span>= \"appEhCacheCacheManager\"<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">)\r\n    </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> EhCacheCacheManager ehCacheCacheManager(EhCacheManagerFactoryBean bean){\r\n        </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">return</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">new</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> EhCacheCacheManager (bean.getObject ());\r\n    }\r\n\r\n    </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">/*</span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">\r\n     * 据shared与否的设置,Spring分别通过CacheManager.create()或new CacheManager()方式来创建一个ehcache基地.\r\n     </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">*/</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">\r\n    @Bean\r\n    </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> EhCacheManagerFactoryBean ehCacheManagerFactoryBean(){\r\n        EhCacheManagerFactoryBean cacheManagerFactoryBean </span>= <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">new</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> EhCacheManagerFactoryBean ();\r\n        cacheManagerFactoryBean.setConfigLocation (</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">new</span> ClassPathResource (\"conf/ehcache-app.xml\"<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">));\r\n        cacheManagerFactoryBean.setShared (</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">true</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">);\r\n        </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">return</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> cacheManagerFactoryBean;\r\n    }\r\n}</span></pre><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div></div><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp;</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp;&nbsp; 　　　　<span style=\"color: rgb(0, 0, 0);\">@Configuration</span>：为spring-boot注解，主要标注此为配置类，优先扫描。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp; 　　　　<span style=\"color: rgb(0, 0, 0);\">@Bean</span>：向spring容器中加入bean。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　至此所有的配置都做好了，通过spring-boot进行集成框架就是这么简单。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　4.使用ehcache</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　　　使用ehcache主要通过spring的缓存机制，上面我们将spring的缓存机制使用了ehcache进行实现，所以使用方面就完全使用spring缓存机制就行了。<br>　　　　具体牵扯到几个注解：</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　　　@Cacheable：负责将方法的返回值加入到缓存中，参数3<br>　　　　@CacheEvict：负责清除缓存，参数4</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　　　　参数解释：</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　　　value：缓存位置名称，不能为空，如果使用EHCache，就是ehcache.xml中声明的cache的name<br>　　　　key：缓存的key，默认为空，既表示使用方法的参数类型及参数值作为key，支持SpEL<br>　　　　condition：触发条件，只有满足条件的情况才会加入缓存，默认为空，既表示全部都加入缓存，支持SpEL</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　　　allEntries：CacheEvict参数，true表示清除value中的全部缓存，默认为false</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　不多说，直接上代码：</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　</p><div class=\"cnblogs_code\" style=\"background-color: rgb(245, 245, 245); border: 1px solid rgb(204, 204, 204); padding: 5px; overflow: auto; margin: 5px 0px; color: rgb(0, 0, 0); font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div><pre style=\"margin-bottom: 0px; line-height: 1.42857; font-family: &quot;Courier New&quot; !important; font-size: 12px !important;\"><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">@Service\r\n</span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">class</span> CacheDemoServiceImpl <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">implements</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> CacheDemoService {\r\n\r\n    </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">/**</span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">\r\n     * 缓存的key\r\n     </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">*/</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">static</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">final</span> String THING_ALL_KEY   = \"\\\"thing_all\\\"\"<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">;\r\n    </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">/**</span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">\r\n     * value属性表示使用哪个缓存策略，缓存策略在ehcache.xml\r\n     </span><span style=\"color: rgb(0, 128, 0); line-height: 1.5 !important;\">*/</span>\r\n    <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">static</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">final</span> String DEMO_CACHE_NAME = \"demo\"<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">;\r\n   \r\n    @CacheEvict(value </span>= DEMO_CACHE_NAME,key =<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> THING_ALL_KEY)\r\n    @Override\r\n    </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">void</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> create(Thing thing){\r\n        Long id </span>=<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> getNextId ();\r\n        thing.setId (id);\r\n        data.put (id, thing);\r\n    } \r\n      \r\n     @Cacheable(value </span>=<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> DEMO_CACHE_NAME,key = \"#thing.getId()+\'thing\'\")\r\n    @Override\r\n    </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> Thing findById(Long id){\r\n        System.err.println (</span>\"没有走缓存！\" +<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> id);\r\n        </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">return</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> data.get (id);\r\n    }\r\n\r\n      @Cacheable(value </span>= DEMO_CACHE_NAME,key =<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> THING_ALL_KEY)\r\n    @Override\r\n    </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span> List&lt;Thing&gt;<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> findAll(){\r\n        </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">return</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> Lists.newArrayList (data.values ());\r\n    }\r\n   \r\n   </span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">\r\n      @Override\r\n    @CachePut(value </span>= DEMO_CACHE_NAME,key = \"#thing.getId()+\'thing\'\"<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\">)\r\n    @CacheEvict(value </span>= DEMO_CACHE_NAME,key =<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> THING_ALL_KEY)\r\n    </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> Thing update(Thing thing){\r\n        System.out.println (thing);\r\n        data.put (thing.getId (), thing);\r\n        </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">return</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> thing;\r\n    }\r\n\r\n    @CacheEvict(value </span>=<span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> DEMO_CACHE_NAME)\r\n    @Override\r\n    </span><span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">public</span> <span style=\"color: rgb(0, 0, 255); line-height: 1.5 !important;\">void</span><span style=\"color: rgb(0, 0, 0); line-height: 1.5 !important;\"> delete(Long id){\r\n        data.remove (id);\r\n    }\r\n   \r\n}</span></pre><div class=\"cnblogs_code_toolbar\" style=\"margin-top: 5px;\"><span class=\"cnblogs_code_copy\" style=\"padding-right: 5px; line-height: 1.5 !important;\"><a title=\"复制代码\" style=\"color: rgb(86, 182, 233); background-color: rgb(245, 245, 245) !important; border: none !important;\"><img src=\"http://common.cnblogs.com/images/copycode.gif\" alt=\"复制代码\" style=\"max-width: 900px; border-width: initial !important; border-style: none !important;\"></a></span></div></div><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp;</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">　　　　5.只需要通过注解在service层方法上打注解便可以使用缓存，在find**上存入缓存，在delete**,update**上清除缓存。</p><p style=\"margin-top: 10px; margin-right: auto; margin-left: auto; color: rgb(35, 35, 35); font-family: Verdana, Arial, helvetica, sans-seriff; font-size: 14px;\">&nbsp;</p>', 'article', null, null, null, null, '1', null, '0', '1', 'bootdo', '2017-09-24 11:15:18', '2017-09-24 11:15:18');
INSERT INTO `blog_content` VALUES ('110', 'spring boot 图片上传后的图片读取路径在win与linux环境配置的差别', null, null, null, '<ol><li><p style=\"margin-bottom: 0px; padding: 0px; color: rgb(69, 69, 69); font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; font-size: 16px;\">win</p><p style=\"margin-bottom: 0px; padding: 0px; color: rgb(69, 69, 69); font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; font-size: 16px;\"></p><div class=\"dp-highlighter bg_java\" style=\"padding: 1px 0px 0px; font-family: Consolas, &quot;Courier New&quot;, Courier, mono, serif; font-size: 12px; background-color: rgb(231, 229, 220); width: 849.412px; overflow-x: auto; overflow-y: hidden; position: relative; color: rgb(69, 69, 69); margin: 18px 0px !important;\"><div class=\"bar\" style=\"margin: 0px; padding: 0px 0px 0px 45px;\"><div class=\"tools\" style=\"margin: 0px; padding: 3px 8px 10px 10px; font-stretch: normal; font-size: 9px; line-height: normal; font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; color: silver; background-color: rgb(248, 248, 248); border-left: 3px solid rgb(108, 226, 108); border-right: 1px solid rgb(231, 229, 220);\"><b>[java]</b>&nbsp;<a href=\"http://blog.csdn.net/qq1115094858/article/details/51873698#\" class=\"ViewSource\" title=\"view plain\" style=\"background-image: url(&quot;images/default/ico_plain.gif&quot;); background-position: left top; background-repeat: no-repeat; color: rgb(202, 12, 22); margin: 0px 10px 0px 0px; padding: 1px; outline: none; border: none; font-size: 9px; display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">view plain</a><span class=\"tracking-ad\" data-mod=\"popu_168\" style=\"margin: 0px; padding: 0px;\">&nbsp;<a href=\"http://blog.csdn.net/qq1115094858/article/details/51873698#\" class=\"CopyToClipboard\" title=\"copy\" style=\"background-image: url(&quot;images/default/ico_copy.gif&quot;); background-position: left top; background-repeat: no-repeat; color: rgb(202, 12, 22); margin: 0px 10px 0px 0px; padding: 1px; outline: none; border: none; font-size: 9px; display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">copy</a><div style=\"margin: 0px; padding: 0px; position: absolute; left: 294px; top: 296px; width: 16px; height: 16px; z-index: 99;\"></div></span><span class=\"tracking-ad\" data-mod=\"popu_169\" style=\"margin: 0px; padding: 0px;\"></span></div></div><ol start=\"1\" class=\"dp-j\" style=\"padding: 0px; list-style-position: initial; list-style-image: initial; border-top: none; border-right: 1px solid rgb(231, 229, 220); border-bottom: none; border-left: none; border-image: initial; background-color: rgb(255, 255, 255); color: rgb(92, 92, 92); margin-right: 0px !important; margin-bottom: 1px !important; margin-left: 45px !important;\"><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Component</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">class</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;WebConfigurer&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">extends</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;WebMvcConfigurerAdapter&nbsp;{&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Override</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">public</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">void</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;addResourceHandlers(ResourceHandlerRegistry&nbsp;registry)&nbsp;{&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;registry.addResourceHandler(<span class=\"string\" style=\"margin: 0px; padding: 0px; border: none; color: blue; background-color: inherit;\">\"/files/**\"</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">).addResourceLocations(</span><span class=\"string\" style=\"margin: 0px; padding: 0px; border: none; color: blue; background-color: inherit;\">\"file:///E:/var/spring/uploaded_files/\"</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">);&nbsp;&nbsp;</span></span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;</span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">}&nbsp;&nbsp;</span></li></ol></div><span style=\"color: rgb(69, 69, 69); font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; font-size: 16px;\">linux</span><br style=\"color: rgb(69, 69, 69); font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; font-size: 16px;\"><div class=\"dp-highlighter bg_java\" style=\"padding: 1px 0px 0px; font-family: Consolas, &quot;Courier New&quot;, Courier, mono, serif; font-size: 12px; background-color: rgb(231, 229, 220); width: 849.412px; overflow-x: auto; overflow-y: hidden; position: relative; color: rgb(69, 69, 69); margin: 18px 0px !important;\"><div class=\"bar\" style=\"margin: 0px; padding: 0px 0px 0px 45px;\"><div class=\"tools\" style=\"margin: 0px; padding: 3px 8px 10px 10px; font-stretch: normal; font-size: 9px; line-height: normal; font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; color: silver; background-color: rgb(248, 248, 248); border-left: 3px solid rgb(108, 226, 108); border-right: 1px solid rgb(231, 229, 220);\"><b>[java]</b>&nbsp;<a href=\"http://blog.csdn.net/qq1115094858/article/details/51873698#\" class=\"ViewSource\" title=\"view plain\" style=\"background-image: url(&quot;images/default/ico_plain.gif&quot;); background-position: left top; background-repeat: no-repeat; color: rgb(202, 12, 22); margin: 0px 10px 0px 0px; padding: 1px; outline: none; border: none; font-size: 9px; display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">view plain</a><span class=\"tracking-ad\" data-mod=\"popu_168\" style=\"margin: 0px; padding: 0px;\">&nbsp;<a href=\"http://blog.csdn.net/qq1115094858/article/details/51873698#\" class=\"CopyToClipboard\" title=\"copy\" style=\"background-image: url(&quot;images/default/ico_copy.gif&quot;); background-position: left top; background-repeat: no-repeat; color: rgb(202, 12, 22); margin: 0px 10px 0px 0px; padding: 1px; outline: none; border: none; font-size: 9px; display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">copy</a><div style=\"margin: 0px; padding: 0px; position: absolute; left: 294px; top: 528px; width: 16px; height: 16px; z-index: 99;\"></div></span><span class=\"tracking-ad\" data-mod=\"popu_169\" style=\"margin: 0px; padding: 0px;\"></span></div></div><ol start=\"1\" class=\"dp-j\" style=\"padding: 0px; list-style-position: initial; list-style-image: initial; border-top: none; border-right: 1px solid rgb(231, 229, 220); border-bottom: none; border-left: none; border-image: initial; background-color: rgb(255, 255, 255); color: rgb(92, 92, 92); margin-right: 0px !important; margin-bottom: 1px !important; margin-left: 45px !important;\"><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Component</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">class</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;WebConfigurer&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">extends</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;WebMvcConfigurerAdapter&nbsp;{&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Override</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">public</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; font-weight: bold; border: none; color: rgb(0, 102, 153); background-color: inherit;\">void</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;addResourceHandlers(ResourceHandlerRegistry&nbsp;registry)&nbsp;{&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;registry.addResourceHandler(<span class=\"string\" style=\"margin: 0px; padding: 0px; border: none; color: blue; background-color: inherit;\">\"/files/**\"</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">).addResourceLocations(</span><span class=\"string\" style=\"margin: 0px; padding: 0px; border: none; color: blue; background-color: inherit;\">\"file:///var/spring/uploaded_files\"</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">);&nbsp;&nbsp;</span></span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; color: inherit; line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;</span></li><li class=\"\" style=\"margin-left: 40px; list-style: decimal; border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin-top: 0px !important; margin-right: 0px !important; margin-bottom: 0px !important; padding: 0px 3px 0px 10px !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">}&nbsp;&nbsp;</span></li><li></li></ol></div></li></ol>', 'article', null, null, null, null, '1', null, '1', '1', 'bootdo', '2017-09-24 09:15:35', '2017-09-24 09:15:35');
INSERT INTO `blog_content` VALUES ('111', 'Springmvc提交日期类型参数', null, null, null, '<ol style=\"color: rgb(63, 63, 63); font-family: &quot;microsoft yahei&quot;; font-size: 15px;\"><li><p style=\"margin-bottom: 1.1em; padding: 0px;\">背景介绍&nbsp;<br>在springmvc框架中，前台传入到后台的form会经过springmvc自动封装到pojo类中，后台接受的时候可以在参数内直接接受这个java类。</p></li><li><p style=\"margin-bottom: 1.1em; padding: 0px;\">传参&nbsp;<br>通常情况下，前台的表单的类型诸如int,string等，都会根据pojo中字段的类型自动转换。所以为我们省去了不少麻烦，但很可惜其中不包括日期类型。</p></li><li><p style=\"margin-bottom: 1.1em; padding: 0px;\">原因&nbsp;<br>因为日期的格式多种多样，spring自身不适合对其进行封装。好在spring给出了便捷的方法给我们自己转换数据类型。</p></li><li><p style=\"margin-bottom: 1.1em; padding: 0px;\">具体实现</p></li></ol><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(63, 63, 63); font-family: &quot;microsoft yahei&quot;; font-size: 15px;\">在controller层中，加入以下代码段</p><pre class=\"prettyprint\" name=\"code\" style=\"white-space: nowrap; position: relative; overflow-y: hidden; margin-bottom: 1.1em; font-family: &quot;Source Code Pro&quot;, monospace; padding: 5px 5px 5px 60px; font-size: 14px; line-height: 1.45; background-color: rgba(128, 128, 128, 0.05); border-width: 0px; border-color: rgb(136, 136, 136); border-radius: 0px;\"><code class=\"hljs java has-numbering\" style=\"display: block; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: &quot;Source Code Pro&quot;, monospace; white-space: pre; word-wrap: normal;\"><span class=\"hljs-annotation\" style=\"color: rgb(155, 133, 157);\">@InitBinder</span>\r\n<span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">public</span> <span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">void</span> <span class=\"hljs-title\">initBinder</span>(WebDataBinder binder) {\r\n    SimpleDateFormat dateFormat = <span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">new</span> SimpleDateFormat(<span class=\"hljs-string\" style=\"color: rgb(0, 136, 0);\">\"yyyy-MM-dd\"</span>);\r\n    dateFormat.setLenient(<span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">false</span>);\r\n    binder.registerCustomEditor(Date.class, <span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">new</span> CustomDateEditor(dateFormat, <span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">true</span>));<span class=\"hljs-comment\" style=\"color: rgb(136, 0, 0);\">//true:允许输入空值，false:不能为空值</span>\r\n}</code><ul class=\"pre-numbering\" style=\"position: absolute; width: 50px; background-color: rgb(238, 238, 238); top: 0px; left: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 6px 0px 40px; border-right: 1px solid rgb(221, 221, 221); list-style: none; text-align: right;\"><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">1</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">2</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">3</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">4</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">5</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">6</li></ul></pre><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(63, 63, 63); font-family: &quot;microsoft yahei&quot;; font-size: 15px;\">可以解决这个问题。但是这个时候Date类型的参数是null的话，还是会报错。采用另外一种方式则更好，为null也不会报错，就是把请求参数封装为一个vo类，在对应的类属性上加上注解，这样</p><pre class=\"prettyprint\" name=\"code\" style=\"white-space: nowrap; position: relative; overflow-y: hidden; margin-bottom: 1.1em; font-family: &quot;Source Code Pro&quot;, monospace; padding: 5px 5px 5px 60px; font-size: 14px; line-height: 1.45; background-color: rgba(128, 128, 128, 0.05); border-width: 0px; border-color: rgb(136, 136, 136); border-radius: 0px;\"><code class=\"hljs java has-numbering\" style=\"display: block; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; font-family: &quot;Source Code Pro&quot;, monospace; white-space: pre; word-wrap: normal;\"><span class=\"hljs-annotation\" style=\"color: rgb(155, 133, 157);\">@DateTimeFormat</span>(iso = ISO.DATE_TIME, pattern = <span class=\"hljs-string\" style=\"color: rgb(0, 136, 0);\">\"w:yyyy\"</span>)\r\n<span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">private</span> Date startTime;\r\n或者\r\n<span class=\"hljs-annotation\" style=\"color: rgb(155, 133, 157);\">@DateTimeFormat</span>(pattern=<span class=\"hljs-string\" style=\"color: rgb(0, 136, 0);\">\"yyyy-MM-dd HH:mm:ss\"</span>)\r\n<span class=\"hljs-keyword\" style=\"color: rgb(0, 0, 136);\">private</span> Date lastLoginDate;</code><ul class=\"pre-numbering\" style=\"position: absolute; width: 50px; background-color: rgb(238, 238, 238); top: 0px; left: 0px; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 6px 0px 40px; border-right: 1px solid rgb(221, 221, 221); list-style: none; text-align: right;\"><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">1</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">2</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">3</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">4</li><li style=\"padding: 0px 5px; list-style: none; margin-left: 0px;\">5</li></ul></pre><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(63, 63, 63); font-family: &quot;microsoft yahei&quot;; font-size: 15px;\">另外如果使用验证框架，方法参数这样写(@Valid XxxParam param, BindingResult binding) ，就能直接通过BindingResult得到验证结果了。</p>', 'article', null, null, null, null, '1', null, '1', '1', 'bootdo', '2017-09-25 21:34:51', '2017-09-25 21:34:51');
INSERT INTO `blog_content` VALUES ('112', ' SpringBoot 在启动时运行代码', null, null, null, '<p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\">在Spring boot项目的实际开发中，我们有时需要项目服务启动时加载一些数据或预先完成某些动作。为了解决这样的问题，Spring&nbsp;boot 为我们提供了一个方法：通过实现接口 CommandLineRunner 来实现这样的需求。</p><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\">实现方式：只需要一个类即可，无需其他配置。&nbsp;</p><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\">实现步骤：</p><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\">1.创建实现接口 CommandLineRunner 的类 MyStartupRunnerTest</p><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\"></p><div class=\"dp-highlighter bg_java\" style=\"font-family: Consolas, &quot;Courier New&quot;, Courier, mono, serif; font-size: 12px; background-color: rgb(231, 229, 220); width: 936.531px; overflow-x: auto; overflow-y: hidden; padding-top: 1px; position: relative; border-color: rgb(204, 204, 204); color: rgb(85, 85, 85); margin: 18px 0px !important;\"><div class=\"bar\" style=\"padding-left: 45px;\"><div class=\"tools\" style=\"padding: 3px 8px 10px 10px; font-stretch: normal; font-size: 9px; line-height: normal; font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; color: silver; background-color: rgb(248, 248, 248); border-left: 3px solid rgb(108, 226, 108); border-right: 1px solid rgb(231, 229, 220);\"><strong>[java]</strong>&nbsp;<a target=\"_blank\" href=\"http://blog.csdn.net/mimica247706624/article/details/58596490#\" class=\"ViewSource\" title=\"view plain\" style=\"background-image: url(&quot;images/default/ico_plain.gif&quot;); background-position: left top; background-repeat: no-repeat; border: none; padding: 1px; margin: 0px 10px 0px 0px; font-size: 9px; color: rgb(160, 160, 160); display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">view plain</a>&nbsp;<a target=\"_blank\" href=\"http://blog.csdn.net/mimica247706624/article/details/58596490#\" class=\"CopyToClipboard\" title=\"copy\" style=\"background-image: url(&quot;images/default/ico_copy.gif&quot;); background-position: left top; background-repeat: no-repeat; border: none; padding: 1px; margin: 0px 10px 0px 0px; font-size: 9px; color: rgb(160, 160, 160); display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">copy</a><div style=\"position: absolute; left: 559px; top: 655px; width: 18px; height: 18px; z-index: 99;\"></div><div style=\"position: absolute; left: 721px; top: 723px; width: 18px; height: 18px; z-index: 99;\"></div></div></div><ol start=\"1\" class=\"dp-j\" style=\"padding: 0px; border: none; list-style-position: initial; list-style-image: initial; background-color: rgb(255, 255, 255); color: rgb(92, 92, 92); margin-right: 0px !important; margin-bottom: 1px !important; margin-left: 45px !important;\"><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">package</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;com.energy;&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">import</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;org.springframework.boot.CommandLineRunner;&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">import</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;org.springframework.core.annotation.Order;&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">import</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;org.springframework.stereotype.Component;&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"comment\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;\">/**</span>&nbsp;</span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"comment\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;\">&nbsp;*&nbsp;Created&nbsp;by&nbsp;CavanLiu&nbsp;on&nbsp;2017/2/28&nbsp;0028.</span>&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"comment\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;\">&nbsp;*/</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Component</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Order</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">(value=</span><span class=\"number\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(192, 0, 0); background-color: inherit;\">1</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">)</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">public</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">class</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;MyStartupRunnerTest&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">implements</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;CommandLineRunner&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">{&nbsp;&nbsp;</span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Override</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">public</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">void</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;run(String...&nbsp;args)&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">throws</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;Exception&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span class=\"string\" style=\"margin: 0px; padding: 0px; border: none; color: blue; background-color: inherit;\">\"&gt;&gt;&gt;&gt;This&nbsp;is&nbsp;MyStartupRunnerTest&nbsp;Order=1.&nbsp;Only&nbsp;testing&nbsp;CommandLineRunner...&lt;&lt;&lt;&lt;\"</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">);&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">}&nbsp;&nbsp;</span></li></ol></div><p style=\"margin-bottom: 0px; padding: 0px; color: rgb(85, 85, 85); font-family: Arial; font-size: 14px;\"></p><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\">2.创建实现接口CommandLineRunner 的类 MyStartupRunnerTest2</p><div class=\"dp-highlighter bg_java\" style=\"font-family: Consolas, &quot;Courier New&quot;, Courier, mono, serif; font-size: 12px; background-color: rgb(231, 229, 220); width: 936.531px; overflow-x: auto; overflow-y: hidden; padding-top: 1px; position: relative; border-color: rgb(204, 204, 204); color: rgb(85, 85, 85); margin: 18px 0px !important;\"><div class=\"bar\" style=\"padding-left: 45px;\"><div class=\"tools\" style=\"padding: 3px 8px 10px 10px; font-stretch: normal; font-size: 9px; line-height: normal; font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; color: silver; background-color: rgb(248, 248, 248); border-left: 3px solid rgb(108, 226, 108); border-right: 1px solid rgb(231, 229, 220);\"><strong>[java]</strong>&nbsp;<a target=\"_blank\" href=\"http://blog.csdn.net/mimica247706624/article/details/58596490#\" class=\"ViewSource\" title=\"view plain\" style=\"background-image: url(&quot;images/default/ico_plain.gif&quot;); background-position: left top; background-repeat: no-repeat; border: none; padding: 1px; margin: 0px 10px 0px 0px; font-size: 9px; color: rgb(160, 160, 160); display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">view plain</a>&nbsp;<a target=\"_blank\" href=\"http://blog.csdn.net/mimica247706624/article/details/58596490#\" class=\"CopyToClipboard\" title=\"copy\" style=\"background-image: url(&quot;images/default/ico_copy.gif&quot;); background-position: left top; background-repeat: no-repeat; border: none; padding: 1px; margin: 0px 10px 0px 0px; font-size: 9px; color: rgb(160, 160, 160); display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">copy</a><div style=\"position: absolute; left: 559px; top: 1094px; width: 18px; height: 18px; z-index: 99;\"></div><div style=\"position: absolute; left: 721px; top: 1160px; width: 18px; height: 18px; z-index: 99;\"></div></div></div><ol start=\"1\" class=\"dp-j\" style=\"padding: 0px; border: none; list-style-position: initial; list-style-image: initial; background-color: rgb(255, 255, 255); color: rgb(92, 92, 92); margin-right: 0px !important; margin-bottom: 1px !important; margin-left: 45px !important;\"><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">package</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;com.energy;&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">import</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;org.springframework.boot.CommandLineRunner;&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">import</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;org.springframework.core.annotation.Order;&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">import</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;org.springframework.stereotype.Component;&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"comment\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;\">/**</span>&nbsp;</span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"comment\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;\">&nbsp;*&nbsp;Created&nbsp;by&nbsp;CavanLiu&nbsp;on&nbsp;2017/2/28&nbsp;0028.</span>&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"comment\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 130, 0); background-color: inherit;\">&nbsp;*/</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Component</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Order</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">(value=</span><span class=\"number\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(192, 0, 0); background-color: inherit;\">2</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">)</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">public</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">class</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;MyStartupRunnerTest2&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">implements</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;CommandLineRunner&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">{&nbsp;&nbsp;</span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"annotation\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(100, 100, 100); background-color: inherit;\">@Override</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;&nbsp;</span></span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;<span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">public</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">void</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;run(String...&nbsp;args)&nbsp;</span><span class=\"keyword\" style=\"margin: 0px; padding: 0px; border: none; color: rgb(0, 102, 153); background-color: inherit; font-weight: bold;\">throws</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&nbsp;Exception&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;{&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;System.out.println(<span class=\"string\" style=\"margin: 0px; padding: 0px; border: none; color: blue; background-color: inherit;\">\"&gt;&gt;&gt;&gt;This&nbsp;is&nbsp;MyStartupRunnerTest&nbsp;Order=2.&nbsp;Only&nbsp;testing&nbsp;CommandLineRunner...&lt;&lt;&lt;&lt;\"</span><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">);&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&nbsp;&nbsp;&nbsp;&nbsp;}&nbsp;&nbsp;</span></li><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">}&nbsp;&nbsp;</span></li></ol></div><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\">3.启动Spring boot后查看控制台输出信息，如下所示：</p><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\"></p><div class=\"dp-highlighter bg_plain\" style=\"font-family: Consolas, &quot;Courier New&quot;, Courier, mono, serif; font-size: 12px; background-color: rgb(231, 229, 220); width: 936.531px; overflow-x: auto; overflow-y: hidden; padding-top: 1px; position: relative; border-color: rgb(204, 204, 204); color: rgb(85, 85, 85); margin: 18px 0px !important;\"><div class=\"bar\" style=\"padding-left: 45px;\"><div class=\"tools\" style=\"padding: 3px 8px 10px 10px; font-stretch: normal; font-size: 9px; line-height: normal; font-family: Verdana, Geneva, Arial, Helvetica, sans-serif; color: silver; background-color: rgb(248, 248, 248); border-left: 3px solid rgb(108, 226, 108); border-right: 1px solid rgb(231, 229, 220);\"><strong>[plain]</strong>&nbsp;<a target=\"_blank\" href=\"http://blog.csdn.net/mimica247706624/article/details/58596490#\" class=\"ViewSource\" title=\"view plain\" style=\"background-image: url(&quot;images/default/ico_plain.gif&quot;); background-position: left top; background-repeat: no-repeat; border: none; padding: 1px; margin: 0px 10px 0px 0px; font-size: 9px; color: rgb(160, 160, 160); display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">view plain</a>&nbsp;<a target=\"_blank\" href=\"http://blog.csdn.net/mimica247706624/article/details/58596490#\" class=\"CopyToClipboard\" title=\"copy\" style=\"background-image: url(&quot;images/default/ico_copy.gif&quot;); background-position: left top; background-repeat: no-repeat; border: none; padding: 1px; margin: 0px 10px 0px 0px; font-size: 9px; color: rgb(160, 160, 160); display: inline-block; width: 16px; height: 16px; text-indent: -2000px;\">copy</a><div style=\"position: absolute; left: 563px; top: 1532px; width: 18px; height: 18px; z-index: 99;\"></div><div style=\"position: absolute; left: 725px; top: 1597px; width: 18px; height: 18px; z-index: 99;\"></div></div></div><ol start=\"1\" style=\"padding: 0px; border: none; list-style-position: initial; list-style-image: initial; background-color: rgb(255, 255, 255); color: rgb(92, 92, 92); margin-right: 0px !important; margin-bottom: 1px !important; margin-left: 45px !important;\"><li class=\"alt\" style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; color: inherit; line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\"><span style=\"margin: 0px; padding: 0px; border: none; background-color: inherit;\">&gt;&gt;&gt;&gt;This&nbsp;is&nbsp;MyStartupRunnerTest&nbsp;Order=1.&nbsp;Only&nbsp;testing&nbsp;CommandLineRunner...&lt;&lt;&lt;&lt;&nbsp;&nbsp;</span></span></li><li style=\"border-top: none; border-right: none; border-bottom: none; border-left: 3px solid rgb(108, 226, 108); border-image: initial; list-style-type: decimal-leading-zero; list-style-image: initial; background-color: rgb(248, 248, 248); line-height: 18px; margin: 0px !important; padding: 0px 3px 0px 10px !important; list-style-position: outside !important;\"><span style=\"margin: 0px; padding: 0px; border: none; color: black; background-color: inherit;\">&gt;&gt;&gt;&gt;This&nbsp;is&nbsp;MyStartupRunnerTest2&nbsp;Order=2.&nbsp;Only&nbsp;testing&nbsp;CommandLineRunner...&lt;&lt;&lt;&lt;&nbsp;&nbsp;</span></li></ol></div><p style=\"margin-bottom: 0px; padding: 0px; color: rgb(85, 85, 85); font-family: Arial; font-size: 14px;\"></p><p style=\"margin-bottom: 1.1em; padding: 0px; color: rgb(85, 85, 85); font-family: &quot;microsoft yahei&quot;; font-size: 14px;\">4.Application启动类代码略。</p><p><span style=\"color: rgb(85, 85, 85); font-family: Arial; font-size: 14px;\">说明：CommandLineRunner接口的运行顺序是依据@Order注解的value由小到大执行，即value值越小优先级越高。</span><br></p>', 'article', null, null, null, null, '1', null, '1', '1', 'bootdo', '2017-09-26 15:18:15', '2017-09-26 15:18:15');
INSERT INTO `blog_content` VALUES ('115', 'communication', null, null, null, '<h2 style=\"color: rgb(103, 106, 108);\"><span style=\"font-family: Times; font-size: 17.5px; font-weight: bold;\"><a href=\"https://jq.qq.com/?_wv=1027&amp;k=5EfMNFL\" target=\"_blank\" style=\"color: rgb(42, 100, 150); text-decoration-line: underline; outline: 0px;\">qq群 669039323</a></span></h2>', null, null, 'communication', null, null, '1', null, '0', '1', 'bootdo', '2017-09-30 14:43:30', '2017-09-30 14:43:30');
INSERT INTO `blog_content` VALUES ('116', 'ablout', null, null, null, '<h1 style=\"box-sizing: inherit; font-size: 28px; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); min-height: 1rem; -webkit-font-smoothing: antialiased; cursor: text; position: relative; margin-top: 0px !important;\">BootDo 面向学习型的开源框架</h1><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"平台简介\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E5%B9%B3%E5%8F%B0%E7%AE%80%E4%BB%8B\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>平台简介</h2><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">BootDo是高效率，低封装，面向学习型，面向微服的<strong style=\"box-sizing: inherit;\">开源</strong>Java EE开发框架。</p><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">BootDo是在SpringBoot基础上搭建的一个Java基础开发平台，MyBatis为数据访问层，ApacheShiro为权限授权层，Ehcahe对常用数据进行缓存。</p><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">BootDo主要定位于后台管理系统学习交流，已内置后台管理系统的基础功能和高效的<strong style=\"box-sizing: inherit;\">代码生成</strong>工具， 包括：系统权限组件、数据权限组件、数据字典组件、核心工具组件、视图操作组件、工作流组件、代码生成等。 前端界面风格采用了结构简单、性能优良、页面美观大气的Twitter Bootstrap页面展示框架。 采用分层设计、双重验证、提交数据安全编码、密码加密、访问验证、数据权限验证。 使用Maven做项目管理，提高项目的易开发性、扩展性。</p><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">BootDo目前包括以下四大模块，系统管理（SYS）模块、 内容管理（CMS）模块、在线办公（OA）模块、代码生成（GEN）模块。&nbsp;<strong style=\"box-sizing: inherit;\">系统管理模块</strong>&nbsp;，包括企业组织架构（用户管理、机构管理、区域管理）、 菜单管理、角色权限管理、字典管理等功能；&nbsp;<strong style=\"box-sizing: inherit;\">内容管理模块</strong>&nbsp;，包括内容管理（文章、链接），栏目管理、站点管理、 公共留言、文件管理、前端网站展示等功能；&nbsp;<strong style=\"box-sizing: inherit;\">在线办公模块</strong>&nbsp;，提供简单的请假流程实例；<strong style=\"box-sizing: inherit;\">代码生成模块</strong>&nbsp;，完成重复的工作。</p><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">BootDo 提供了常用工具进行封装，包括日志工具、缓存工具、服务器端验证、数据字典、当前组织机构数据 （用户、机构、区域）以及其它常用小工具等。另外还提供一个强大的在线&nbsp;<strong style=\"box-sizing: inherit;\">代码生成</strong>&nbsp;工具。</p><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"内置功能\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E5%86%85%E7%BD%AE%E5%8A%9F%E8%83%BD\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>内置功能</h2><ol class=\"task-list\" style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 24px; padding-left: 30px; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\"><li style=\"box-sizing: inherit; list-style-type: decimal;\">用户管理：用户是系统操作者，该功能主要完成系统用户配置。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">机构管理：配置系统组织机构（公司、部门、小组），树结构展现，可随意调整上下级。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">区域管理：系统城市区域模型，如：国家、省市、地市、区县的维护。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">菜单管理：配置系统菜单，操作权限，按钮权限标识等。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">角色管理：角色菜单权限分配、设置角色按机构进行数据范围权限划分。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">字典管理：对系统中经常使用的一些较为固定的数据进行维护，如：是否、男女、类别、级别等。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">操作日志：系统正常操作日志记录和查询；系统异常信息日志记录和查询。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">连接池监视：监视当期系统数据库连接池状态，可进行分析SQL找出系统性能瓶颈。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">工作流引擎：实现业务工单流转、在线流程设计器。</li></ol><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"技术选型\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E6%8A%80%E6%9C%AF%E9%80%89%E5%9E%8B\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>技术选型</h2><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">1、后端</p><ul class=\"task-list\" style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 24px; padding-left: 30px; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\"><li style=\"box-sizing: inherit; list-style-type: initial;\">核心框架：Spring Boot</li><li style=\"box-sizing: inherit; list-style-type: initial;\">安全框架：Apache Shiro</li><li style=\"box-sizing: inherit; list-style-type: initial;\">模板引擎：Thymeleaf</li><li style=\"box-sizing: inherit; list-style-type: initial;\">持久层框架：MyBatis</li><li style=\"box-sizing: inherit; list-style-type: initial;\">数据库连接池：Alibaba Druid</li><li style=\"box-sizing: inherit; list-style-type: initial;\">缓存框架：Ehcache 、Redis</li><li style=\"box-sizing: inherit; list-style-type: initial;\">日志管理：SLF4J</li><li style=\"box-sizing: inherit; list-style-type: initial;\">工具类：Apache Commons、Jackson 、Xstream 1.4、Dozer 5.3、POI 3.9</li></ul><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">2、前端</p><ul class=\"task-list\" style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 24px; padding-left: 30px; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\"><li style=\"box-sizing: inherit; list-style-type: initial;\">JS框架：jQuery</li><li style=\"box-sizing: inherit; list-style-type: initial;\">客户端验证：JQuery Validation</li><li style=\"box-sizing: inherit; list-style-type: initial;\">富文本在线编辑：summernote</li><li style=\"box-sizing: inherit; list-style-type: initial;\">在线文件管理：CKFinder</li><li style=\"box-sizing: inherit; list-style-type: initial;\">数据表格：bootstrapTable</li><li style=\"box-sizing: inherit; list-style-type: initial;\">弹出层：layer</li><li style=\"box-sizing: inherit; list-style-type: initial;\">树结构控件：jsTree</li></ul><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">4、平台</p><ul class=\"task-list\" style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 24px; padding-left: 30px; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\"><li style=\"box-sizing: inherit; list-style-type: initial;\">服务器中间件：SpringBoot内置</li><li style=\"box-sizing: inherit; list-style-type: initial;\">数据库支持：目前仅提供MySql数据库的支持，但不限于数据库，平台留有其它数据库支持接口， 你可以很方便的更改为其它数据库，如：SqlServer 2008、MySql 5.5、H2等</li><li style=\"box-sizing: inherit; list-style-type: initial;\">开发环境：Java、Eclipse Java EE 、Maven 、Git</li></ul><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"安全考虑\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E5%AE%89%E5%85%A8%E8%80%83%E8%99%91\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>安全考虑</h2><ol class=\"task-list\" style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 24px; padding-left: 30px; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\"><li style=\"box-sizing: inherit; list-style-type: decimal;\">开发语言：系统采用Java 语言开发，具有卓越的通用性、高效性、平台移植性和安全性。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">分层设计：（数据库层，数据访问层，业务逻辑层，展示层）层次清楚，低耦合，各层必须通过接口才能接入并进行参数校验（如：在展示层不可直接操作数据库），保证数据操作的安全。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">双重验证：用户表单提交双验证：包括服务器端验证及客户端验证，防止用户通过浏览器恶意修改（如不可写文本域、隐藏变量篡改、上传非法文件等），跳过客户端验证操作数据库。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">安全编码：用户表单提交所有数据，在服务器端都进行安全编码，防止用户提交非法脚本及SQL注入获取敏感数据等，确保数据安全。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">密码加密：登录用户密码进行SHA1散列加密，此加密方法是不可逆的。保证密文泄露后的安全问题。</li><li style=\"box-sizing: inherit; list-style-type: decimal;\">强制访问：系统对所有管理端链接都进行用户身份权限验证，防止用户直接填写url进行访问。</li></ol><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"演示地址\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E6%BC%94%E7%A4%BA%E5%9C%B0%E5%9D%80\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>演示地址</h2><h6 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; color: rgb(119, 119, 119); margin-top: 20px; font-size: 14px; -webkit-font-smoothing: antialiased; cursor: text; position: relative;\"><a id=\"布嘟开源wwwbootdocom\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E5%B8%83%E5%98%9F%E5%BC%80%E6%BA%90wwwbootdocom\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>布嘟开源<a href=\"http://www.bootdo.com./blog\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word;\">www.bootdo.com</a></h6><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"交流反馈\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E4%BA%A4%E6%B5%81%E5%8F%8D%E9%A6%88\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>交流反馈</h2><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"qq群-669039323\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#qq%E7%BE%A4-669039323\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>QQ群 669039323</h2><h2 style=\"box-sizing: inherit; font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-weight: bold; line-height: 1.33em; color: rgb(0, 0, 0); margin-top: 20px; font-size: 24px; padding-bottom: 0.3em; -webkit-font-smoothing: antialiased; cursor: text; position: relative; border-bottom: 1px solid rgb(204, 204, 204);\"><a id=\"版权声明\" class=\"anchor\" href=\"https://gitee.com/lcg0124/bootdo#%E7%89%88%E6%9D%83%E5%A3%B0%E6%98%8E\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word; display: block; padding-left: 30px; margin-left: -20px; position: absolute; top: 0px; left: 0px; bottom: 0px; outline: none;\"></a>版权声明</h2><p style=\"box-sizing: inherit; margin-bottom: 15px; line-height: 25px; word-break: break-word; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px;\">本软件使用&nbsp;<a href=\"http://www.apache.org/licenses/LICENSE-2.0\" style=\"box-sizing: inherit; color: rgb(9, 94, 171); word-wrap: break-word;\">Apache License 2.0</a>&nbsp;协议，请严格遵照协议内容</p><ul class=\"task-list\" style=\"box-sizing: inherit; line-height: 24px; padding-left: 30px; color: rgb(64, 72, 91); font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;, Helvetica, Arial, &quot;Apple Color Emoji&quot;, &quot;Segoe UI Emoji&quot;, &quot;Segoe UI Symbol&quot;, &quot;Liberation Sans&quot;, &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, &quot;Hiragino Sans GB&quot;, &quot;Wenquanyi Micro Hei&quot;, &quot;WenQuanYi Zen Hei&quot;, &quot;ST Heiti&quot;, SimHei, &quot;WenQuanYi Zen Hei Sharp&quot;, sans-serif; font-size: 15px; margin-bottom: 0px !important;\"><li class=\"task-list-item\" style=\"box-sizing: inherit; list-style-type: initial;\"><input type=\"checkbox\" class=\"task-list-item-checkbox\" checked=\"\" disabled=\"\" style=\"margin-top: 0px; cursor: default; transition: border 0.2s linear, box-shadow 0.2s linear; box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px inset; vertical-align: middle;\">&nbsp;注：已上内容为整体规化，部分功能还在实现中</li></ul>', null, null, 'about', null, null, '1', null, '0', '1', 'bootdo', '2017-09-30 14:43:09', '2017-09-30 14:43:09');
INSERT INTO `blog_content` VALUES ('117', '页面加载速度优化建议', null, null, null, '<p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">1、合并Js文件和CSS</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">将JS代码和CSS样式分别合并到一个共享的文件，这样不仅能简化代码，而且在执行JS文件的时候，如果JS文件比较多，就需要进行多次“Get”请求，延长加载速度，将JS文件合并在一起后，自然就减少了Get请求次数，提高了加载速度。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">2、Sprites图片技术</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">Spriting是一种网页图片应用处理方式，它是将一个页面涉及到的所有零星图片都包含到一张大图中去，然后利用CSS技术展现出来。这样一来，当访问该页面时，载入的图片就不会像以前那样一幅一幅地慢慢显示出来了，可以减少了整个网页的图片大小，并且利用CSSSprites能很好地减少网页的http请求，从而大大的提高页面的性能。CSSSprites在国内很多人叫css精灵，很早就有了，在很多大型网站都有用到，特别是一些所有页面都存在的图标用得比较多，很好的提升加载速度。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">3、压缩文本和图片</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">压缩技术如gzip可以有效减少页面加载的时间。包括HTML，XML，JSON(JavaScript对象符号)，JavaScript和CSS等，压缩率都可以在大小70%左右。文本压缩用得比较多，一般直接在空间开启就行，而图片的压缩就比较随意，很多都是直接上传，其实还有很大的压缩空间。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">4、延迟显示可见区域外的内容</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">为了确保用户可以更快地看见可见区域的网页可以延迟加载或展现可见区域外的内容，为了避免页面变形，可以使用占位符标签制定正确的高度和宽度。比如WP的jQueryImage LazyLoad插件就可以在用户停留在第一屏的时候，不加载任何第一屏以下的图片信息，只有当用户把鼠标往下滚动的时候，这些图片才开始加载。这样很明显提升可见区域的加载速度，提高用户体验。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">5、确保功能图片优先加载</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">网站主要考虑可用性的重要性，一个功能按钮要提前加载出来，用户进入下载页，一个只需要8s时间的下载花了5s在等待、寻找下载按钮图片，谁能忍受?</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">6、重新布置Call-to-Action按钮</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">其实这个和上面一条是差不多的，都是从用户体验速度着手，跳过了网页的整体加载速度。速度没变，只是让一些行为按钮提前，Call-to-Action按钮一般习惯设计在页面底部，这样的习惯对于用户来说并不总是好的，购买用户需要等到最下面加载出来才能点击下一步操作。可以调整CTA按钮的位置或使用滑动的图片按钮。很多大型购物网站的加入购物车就是这种类型。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">7、图片格式优化</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">不恰当的图像格式是一种极为常见的减慢加载速度的罪魁祸首。正确的图片格式可以让图片缩小数倍，如果保存为最佳格式。可以节省大量带宽，减少处理时间时间，大大加快页面加载速度，这是一种很常见的做法。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">8、使用 Progressive JPEGs</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">ProgressiveJPEGs图片是JPEG格式的一个特殊变种，名为“高级JPEG”。在创建高级JPEG文件时，数据是这样安排的：在装入图像时，开始只显示一个模糊的图像，随着数据的装入，图像逐步变得清晰。它相当于交织的GIF格式的图片。高级JPEG主要是考虑到使用调制解调器的慢速网络而设计的，快速网络的使用者通常不会体会到它和正常JPEG格式图片的区别。对于网速比较慢的用户，这无疑有很好的体验。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">9、精简代码</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">这个可以说是最直接的一个方法，也是用得比较多的，对网页代码进行瘦身，删除不必要的沉冗代码，比如不必要的空格、换行符、注释等，包括JS代码中的无用代码也需要清除。其中对于注释代码的清除可能有些人存在误区，甚至有的在里面堆砌关键词。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">10、延迟加载和执行非必要脚本</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">网页中有很多脚本是在页面完全加载完前都不需要执行的，可以延迟加载和执行非必要脚本。这些脚本可以在onload事件之后执行，避免对网页上重要内容的呈现造成影响。这些脚本可能是你自己网页的甲苯，往往更多的是一些第三方脚本，这样的有很多，比如评论、广告、智能推荐、百度云图、分享等等，这些完全可以等主体内容加载完后再执行。</p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\"><span style=\"font-weight: 700;\">11、使用AJAX</span></p><p style=\"margin-bottom: 24px; color: rgb(14, 14, 14); font-family: Arial, &quot;Hiragino Sans GB&quot;, 冬青黑, &quot;Microsoft YaHei&quot;, 微软雅黑, SimSun, 宋体, Helvetica, Tahoma, &quot;Arial sans-serif&quot;; font-size: 16px; text-align: justify;\">AJAX即“Asynchronous Javascript +XML“，是指一种创建交互式网页应用的网页开发技术。通过在后台与服务器进行少量数据交换，AJAX可以使网页实现异步更新。这意味着可以在不重新加载整个网页的情况下，对网页的某部分进行更新。传统的网页(不使用AJAX)如果需要更新内容，必须重载整个网页面。</p>', null, null, '', null, null, '1', null, '0', '1', 'bootdo', '2017-09-30 16:13:35', '2017-09-30 16:13:35');
INSERT INTO `blog_content` VALUES ('118', 'elementUI select组件使用详解', null, null, null, '<article style=\"padding: 20px 0px; border-top: 1px solid rgb(228, 235, 244); border-left: 1px solid rgb(228, 235, 244); border-right: 1px solid rgb(228, 235, 244); color: rgb(51, 51, 51); font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun; font-size: 16px;\"><div id=\"article_content\" class=\"article_content csdn-tracking-statistics\" data-mod=\"popu_307\" data-dsm=\"post\" style=\"margin: 0px 0px 50px; padding: 20px 30px 0px; color: rgb(69, 69, 69); overflow: hidden;\"><div class=\"markdown_views\" style=\"margin: 0px; padding: 0px; font-family: &quot;microsoft yahei&quot;; font-size: 15px; color: rgb(63, 63, 63);\"><h1 id=\"elementui-select组件使用详解\" style=\"margin-top: 0.8em; margin-bottom: 0.8em; font-size: 2.6em; font-family: inherit; padding: 0px;\">elementUI select组件使用详解</h1><ul style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 0px; list-style-position: initial; list-style-image: initial;\"><li style=\"margin: 0px 0px 0px 40px; padding: 0px; list-style: disc;\"><strong>动态生成option选项</strong></li><li style=\"margin: 0px 0px 0px 40px; padding: 0px; list-style: disc;\"><strong>option选项绑定对应的文本值和value值</strong></li><li style=\"margin: 0px 0px 0px 40px; padding: 0px; list-style: disc;\"><strong>作为表单项目，新增、编辑功能</strong></li><li style=\"margin: 0px 0px 0px 40px; padding: 0px; list-style: disc;\"><strong>对选项改变后触发相关事件</strong></li></ul><pre class=\"prettyprint\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; font-size: 14px; white-space: nowrap; padding: 5px 5px 5px 60px; margin-bottom: 1.1em; line-height: 1.45; background-color: rgba(128, 128, 128, 0.05); border-color: rgba(128, 128, 128, 0.075); border-radius: 0px; position: relative; overflow-y: hidden;\"><code class=\"hljs lasso has-numbering\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; white-space: pre; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; display: block; word-wrap: normal;\"><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>div id<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"app\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n    <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-form</span> :model<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"form\"</span>  ref<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"form\"</span> label<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-width</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"100px\"</span> class<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"demo-ruleForm\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n        <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-form</span><span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-item</span> label<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"姓名选择\"</span> prop<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"typeId\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n            <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-select</span> v<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-model</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"form.typeId\"</span> placeholder<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"请选择\"</span> @change<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"change\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n                <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-option</span> v<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-for</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"item in items\"</span> :label<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"item.name\"</span> :value<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"item.id\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-option</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n            <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-select</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n        <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-form</span><span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-item</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n        <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-form</span><span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-item</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n            <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-button</span> <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">type</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"primary\"</span> @click<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"add()\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>新增<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-button</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n            <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-button</span> <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">type</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"primary\"</span> @click<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"edit()\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>编辑<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-button</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n            <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-button</span> @click<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">=</span><span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"cancel()\"</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>取消<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-button</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n        <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-form</span><span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-item</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n    <span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/el<span class=\"hljs-attribute\" style=\"margin: 0px; padding: 0px;\">-form</span><span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span>\r\n<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&lt;</span>/div<span class=\"hljs-subst\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 0);\">&gt;</span></code><ul class=\"pre-numbering\" style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 6px 0px 40px; list-style: none; position: absolute; width: 50px; background-color: rgb(238, 238, 238); top: 0px; left: 0px; border-right: 1px solid rgb(221, 221, 221); text-align: right;\"><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">1</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">2</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">3</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">4</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">5</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">6</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">7</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">8</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">9</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">10</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">11</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">12</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">13</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">14</li></ul></pre><pre class=\"prettyprint\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; font-size: 14px; white-space: nowrap; padding: 5px 5px 5px 60px; margin-bottom: 1.1em; line-height: 1.45; background-color: rgba(128, 128, 128, 0.05); border-color: rgba(128, 128, 128, 0.075); border-radius: 0px; position: relative; overflow-y: hidden;\"><code class=\"hljs xml has-numbering\" style=\"font-family: &quot;Source Code Pro&quot;, monospace; white-space: pre; background-image: initial; background-position: initial; background-size: initial; background-repeat: initial; background-attachment: initial; background-origin: initial; background-clip: initial; display: block; word-wrap: normal;\"><span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">script</span>&gt;</span><span class=\"javascript\" style=\"margin: 0px; padding: 0px;\">\r\n    <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">var</span> vm = <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">new</span> Vue({\r\n        el:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"#app\"</span>,\r\n        mounted(){\r\n            <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">this</span>.getData();\r\n        },\r\n        data:{\r\n            form:{\r\n                typeId:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\'\'</span>\r\n            },\r\n            items:[],\r\n            datas:[{name:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"senbo\"</span>,id:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\'1\'</span>},{name:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"muse\"</span>,id:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\'2\'</span>},{name:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"bobo\"</span>,id:<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\'3\'</span>}]\r\n        },\r\n        methods:{\r\n            getData:<span class=\"hljs-function\" style=\"margin: 0px; padding: 0px;\"><span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">function</span><span class=\"hljs-params\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">()</span>{</span>\r\n                <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">this</span>.items = <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">this</span>.datas; \r\n\r\n            },\r\n            add:<span class=\"hljs-function\" style=\"margin: 0px; padding: 0px;\"><span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">function</span><span class=\"hljs-params\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">()</span>{</span>\r\n                <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">this</span>.form.typeId = <span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"\"</span>;\r\n            },\r\n            cancel(){\r\n                 <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">this</span>.form.typeId = <span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"\"</span>;   \r\n            },\r\n            change:<span class=\"hljs-function\" style=\"margin: 0px; padding: 0px;\"><span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">function</span><span class=\"hljs-params\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">()</span>{</span>\r\n                console.log(<span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">this</span>.form.typeId)\r\n            },\r\n            edit:<span class=\"hljs-function\" style=\"margin: 0px; padding: 0px;\"><span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">function</span><span class=\"hljs-params\" style=\"margin: 0px; padding: 0px; color: rgb(102, 0, 102);\">()</span>{</span>\r\n                <span class=\"hljs-keyword\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">this</span>.form.typeId =<span class=\"hljs-string\" style=\"margin: 0px; padding: 0px; color: rgb(0, 136, 0);\">\"1\"</span>;\r\n            }\r\n        }\r\n    })\r\n</span><span class=\"hljs-tag\" style=\"margin: 0px; padding: 0px; color: rgb(0, 102, 102);\">&lt;/<span class=\"hljs-title\" style=\"margin: 0px; padding: 0px; color: rgb(0, 0, 136);\">script</span>&gt;</span></code><ul class=\"pre-numbering\" style=\"margin-right: 0px; margin-bottom: 0px; margin-left: 0px; padding: 6px 0px 40px; list-style: none; position: absolute; width: 50px; background-color: rgb(238, 238, 238); top: 0px; left: 0px; border-right: 1px solid rgb(221, 221, 221); text-align: right;\"><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">1</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">2</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">3</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">4</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">5</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">6</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">7</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">8</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">9</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">10</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">11</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">12</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">13</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">14</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">15</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">16</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">17</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">18</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">19</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">20</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">21</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">22</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">23</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">24</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">25</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">26</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">27</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">28</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">29</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">30</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">31</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">32</li><li style=\"margin: 0px; padding: 0px 5px; list-style: none; color: rgb(153, 153, 153);\">33</li></ul></pre></div></div></article><div class=\"article_copyright\" style=\"margin: 0px 0px -20px; padding: 0px 20px 30px; border-bottom: 1px solid rgb(228, 235, 244); border-left: 1px solid rgb(228, 235, 244); border-right: 1px solid rgb(228, 235, 244); font-size: 14px; color: rgb(120, 128, 135); clear: both; overflow: hidden; font-family: &quot;PingFang SC&quot;, &quot;Microsoft YaHei&quot;, SimHei, Arial, SimSun;\">转自http://blog.csdn.net/museions/article/details/77824361</div>', 'article', null, '', null, null, '1', null, '0', '1', 'bootdo', '2017-10-12 10:41:07', '2017-10-12 10:41:07');
INSERT INTO `blog_content` VALUES ('119', 'Java程序员秋招面经大合集（BAT美团网易小米华为中兴等）', null, null, null, '<h1 class=\"title\" style=\"font-size: 34px; margin-top: 20px; margin-bottom: 0px; font-family: -apple-system, &quot;SF UI Display&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; font-weight: 700; line-height: 1.3; color: rgb(51, 51, 51); word-break: break-word !important;\">Java程序员秋招面经大合集（BAT美团网易小米华为中兴等）</h1><div data-note-content=\"\" class=\"show-content\" style=\"color: rgb(47, 47, 47); font-size: 16px; line-height: 1.7; font-family: -apple-system, &quot;SF UI Text&quot;, Arial, &quot;PingFang SC&quot;, &quot;Hiragino Sans GB&quot;, &quot;Microsoft YaHei&quot;, &quot;WenQuanYi Micro Hei&quot;, sans-serif; word-break: break-word !important;\"><blockquote style=\"padding-top: 20px; padding-bottom: 20px; margin-bottom: 25px; font-size: 16px; border-left-width: 6px; border-left-color: rgb(180, 180, 180); background-color: rgb(247, 247, 247); line-height: 30px; word-break: break-word !important;\"><ul style=\"padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">Cvte提前批</li><li style=\"line-height: 30px; margin-bottom: 10px;\">阿里内推</li><li style=\"line-height: 30px; margin-bottom: 10px;\">便利蜂内推</li><li style=\"line-height: 30px; margin-bottom: 10px;\">小米内推</li><li style=\"line-height: 30px; margin-bottom: 10px;\">金山wps内推</li><li style=\"line-height: 30px; margin-bottom: 10px;\">多益网络</li><li style=\"line-height: 30px; margin-bottom: 10px;\">拼多多学霸批</li><li style=\"line-height: 30px; margin-bottom: 10px;\">搜狗校招</li><li style=\"line-height: 30px; margin-bottom: 10px;\">涂鸦移动</li><li style=\"line-height: 30px; margin-bottom: 10px;\">中国电信it研发中心</li><li style=\"line-height: 30px; margin-bottom: 10px;\">中兴</li><li style=\"line-height: 30px; margin-bottom: 10px;\">华为</li><li style=\"line-height: 30px; margin-bottom: 10px;\">苏宁内推</li><li style=\"line-height: 30px; margin-bottom: 10px;\">美团内推</li><li style=\"line-height: 30px; margin-bottom: 10px;\">百度</li><li style=\"line-height: 30px; margin-bottom: 10px;\">腾讯</li><li style=\"line-height: 30px; margin-bottom: 10px;\">招商银行信用卡</li><li style=\"line-height: 30px; margin-bottom: 10px;\">招银网络科技</li><li style=\"line-height: 30px; margin-bottom: 10px;\">网易</li><li style=\"line-height: 30px; margin-bottom: 0px;\">Vivo</li></ul></blockquote><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">Cvte提前批</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">介绍你的项目</li><li style=\"line-height: 30px; margin-bottom: 10px;\">加密解密了解么？几种算法，讲一下你了解的</li><li style=\"line-height: 30px; margin-bottom: 10px;\">多线程了解么？什么是线程安全？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">说一个你最熟悉的设计模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲一下你项目中用到了哪些设计模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java的hashmap的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap的线程安全性，什么是线程安全的？如何实现线程安全</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（视频）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">介绍项目</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Mysql的数据库引擎，区别特点</li><li style=\"line-height: 30px; margin-bottom: 10px;\">设计模式了解？讲一下最熟悉的</li><li style=\"line-height: 30px; margin-bottom: 10px;\">写一个单例模式，答主写的是双检查锁单例，问了为什么用Volatile，synchronize移到方法最外面会怎么样？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">单例模式在你项目里哪些应用？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据连接池</li><li style=\"line-height: 30px; margin-bottom: 10px;\">对高负载有了解么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你意向的技术方向是哪块？（答主回答的高并发，然后面试官说他是做高负载的）</li><li style=\"line-height: 30px; margin-bottom: 10px;\">对高并发有了解么？</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">阿里内推</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">听说你有博客，博客里大概有什么内容？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍，最复杂的表</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap为什么大小是2的幂次</li><li style=\"line-height: 30px; margin-bottom: 10px;\">介绍一下红黑树</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Arraylist的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">场景题：设计判断论文抄袭的系统</li><li style=\"line-height: 30px; margin-bottom: 10px;\">堆排序的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">抽象工厂和工厂方法模式的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">工厂模式的思想</li><li style=\"line-height: 30px; margin-bottom: 10px;\">object类你知道的方法</li><li style=\"line-height: 30px; margin-bottom: 10px;\">哪里用到了工厂模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Forward和redirect的区别</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（视频）</h2><p style=\"margin-bottom: 25px; word-break: break-word !important;\">1， 自我介绍<br>2， 项目介绍<br>3， 项目架构<br>4， 项目难点<br>5， Synchronize关键字为什么jdk1.5后效率提高了<br>6， 线程池的使用时的注意事项<br>7， Spring中autowire和resourse关键字的区别<br>8， Hashmap的原理<br>9， Hashmap的大小为什么指定为2的幂次<br>10， 讲一下线程状态转移图<br>11， 消息队列了解么<br>12， 分布式了解么</p><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">便利蜂内推</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">volatile和synchronized</li><li style=\"line-height: 30px; margin-bottom: 10px;\">来个算法题：一个无序数组，其中一个数字出现的次数大于其他数字之和，求这个数字 （主元素）</li><li style=\"line-height: 30px; margin-bottom: 10px;\">答完再来一个：一个数组，有正有负，不改变顺序的情况下，求和最大的最长子序列</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目用到什么数据库？隔离级别？每个隔离级别各做了什么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库的索引？mysql不同引擎索引的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">垃圾回收算法的过程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你了解的垃圾收集器？ Cms收集器的过程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎样进入老年代？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">平时用到了什么设计模式？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲一下你最熟的两个设计模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">用过什么系统？shell写过脚本吗？</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">小米内推</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">看你最近博客写的是redis，介绍redis和mysql的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的应用场景</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap中jdk1.8之后做了哪些优化</li><li style=\"line-height: 30px; margin-bottom: 10px;\">垃圾回收的过程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Jvm的参数设置</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目中的优化</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">金山wps内推</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">对Java的面向对象的理解</li><li style=\"line-height: 30px; margin-bottom: 10px;\">对java多线程的理解</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库的索引</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库的隔离级别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">设计模式的理解</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲几个设计模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">对算法有什么了解？答主先回答了动态规划，解释了一下dp的思想</li><li style=\"line-height: 30px; margin-bottom: 10px;\">快排的思想讲一下</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Tcp怎么保证可靠传输（中间穿插了好多小问题）</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Tcp的拥塞控制</li><li style=\"line-height: 30px; margin-bottom: 10px;\">让你设计一个即时聊天的系统</li><li style=\"line-height: 30px; margin-bottom: 10px;\">支付宝转账，是如何实现，几个小时通知转账成功的（面试官想让回答长连接，答主一直没get到点）</li><li style=\"line-height: 30px; margin-bottom: 10px;\">解释一下长连接</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">多益网络</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（视频）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">对面向对象的理解</li><li style=\"line-height: 30px; margin-bottom: 10px;\">介绍多态</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java新建线程有哪几种方式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">线程池的作用</li><li style=\"line-height: 30px; margin-bottom: 10px;\">看过框架源码么</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">拼多多学霸批</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场面）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法：一棵二叉排序树，给定一个数，找到与给定数差值最小的数</li><li style=\"line-height: 30px; margin-bottom: 10px;\">场景题：设计一个系统，解决抢购时所需要的大量的短链接的功能，如何保证高并发，如何设计短链接</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（现场面）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">代码量多少</li><li style=\"line-height: 30px; margin-bottom: 10px;\">给了一张纸，各种名词，会的写出来</li><li style=\"line-height: 30px; margin-bottom: 10px;\">然后给它解释那些会的</li><li style=\"line-height: 30px; margin-bottom: 10px;\">设计题：设计一个系统，记录qq用户前一天的登录状态，提供16g内存和2tb的硬盘，要做到查询指定qq号的前一天的登录状态，快速查询O(1)复杂度</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">搜狗校招</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）：</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法：两个排序的数组A和B分别含有m和n个数，找到两个排序数组的中位数，答主用的二分，时间复杂度为O(log (m+n))。结果面试官不满意，让用归并的思想做，时间复杂度其实更高了</li><li style=\"line-height: 30px; margin-bottom: 10px;\">介绍网络编程</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">涂鸦移动</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库的索引原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">索引使用的注意事项</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库的引擎</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java垃圾回收机制</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java的finalize，finally，final三个关键字的区别和应用场景</li><li style=\"line-height: 30px; margin-bottom: 10px;\">String类可以被继承么<br>手撕算法：假设你是一个专业的窃贼，准备沿着一条街打劫房屋。每个房子都存放着特定金额的钱。你面临的唯一约束条件是：相邻的房子装着相互联系的防盗系统，且 当相邻的两个房子同一天被打劫时，该系统会自动报警。<br>给定一个非负整数列表，表示每个房子中存放的钱， 算一算，如果今晚去打劫，你最多可以得到多少钱 在不触动报警装置的情况下。</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">对游戏的了解</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">算法题：给一个整数数组，找到两个数使得他们的和等于一个给定的数 target。</li><li style=\"line-height: 30px; margin-bottom: 10px;\">红黑树</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的应用</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">中国电信it研发中心</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目里用的什么服务器</li><li style=\"line-height: 30px; margin-bottom: 10px;\">自己写一个tomcat服务器，你会怎么写</li><li style=\"line-height: 30px; margin-bottom: 10px;\">分布式服务器会出现哪些问题</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么解决session一致性缓存的问题</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的优势和特点</li><li style=\"line-height: 30px; margin-bottom: 10px;\">一千万用户并发抢购，怎么设计</li><li style=\"line-height: 30px; margin-bottom: 10px;\">如果成功的用户有10万，redis存不下怎么处理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你项目中的难点</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">介绍spring中的熟悉的注解</li><li style=\"line-height: 30px; margin-bottom: 10px;\">让你实现autowire注解的功能你会如何实现</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis和mysql的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的持久化有哪些方式，具体原理</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">中兴</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">专业面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你了解的设计模式，讲两个</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java collection类，集合，讲两个你了解的，说实现原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java线程池的作用</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你觉得你在你实验室处于什么水平</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">综合面试（现场）</h2><p style=\"margin-bottom: 25px; word-break: break-word !important;\">说好的综合面试纯聊天呢？<br>1． 自我介绍<br>2． 项目介绍<br>3． 说一下你知道的设计模式<br>4． 画一个策略模式的uml图<br>5． Java多线程的理解<br>6． 内存屏障是什么<br>7． 数据库索引<br>8． 项目中的优化<br>9． 然后开始聊人生<br>10． 你的缺点，你最不喜欢什么样的人，你的家庭等等</p><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">华为</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目架构</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目一个完整的执行流程（由于我是搞java的，而面试官是搞c的，所以全程尬聊）</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目优化</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么管理项目进度</li><li style=\"line-height: 30px; margin-bottom: 10px;\">平常的爱好</li><li style=\"line-height: 30px; margin-bottom: 10px;\">感觉面试官也不是搞java的，所以又是一阵尬聊</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">苏宁内推</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">面过哪些公司了</li><li style=\"line-height: 30px; margin-bottom: 10px;\">有哪些offer了</li><li style=\"line-height: 30px; margin-bottom: 10px;\">聊到多益，于是开始聊最近微博上很火的多益老板</li><li style=\"line-height: 30px; margin-bottom: 10px;\">得出结论，我和面试官都觉得多益老板三观有问题，但做游戏就是要偏执的人</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你博客主要哪方面的</li><li style=\"line-height: 30px; margin-bottom: 10px;\">多线程并发包了解么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲一下countDownLatch</li></ol><p style=\"margin-bottom: 25px; word-break: break-word !important;\">苏宁聊了20分钟八卦就面完了，一轮技术面</p><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">美团内推</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（电话）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">了解redis源码么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">了解redis集群么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">hashmap容量为什么是2的幂次</li><li style=\"line-height: 30px; margin-bottom: 10px;\">hashset的源码</li><li style=\"line-height: 30px; margin-bottom: 10px;\">object类你知道的方法</li><li style=\"line-height: 30px; margin-bottom: 10px;\">hashcode和equals</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你重写过hashcode和equals么，要注意什么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">假设现在一个学生类，有学号和姓名，我现在hashcode方法重写的时候，只将学号参与计算，会出现什么情况？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">往set里面put一个学生对象，然后将这个学生对象的学号改了，再put进去，可以放进set么？并讲出为什么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的持久化？有哪些方式，原理是什么？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲一下稳定的排序算法和不稳定的排序算法</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲一下快速排序的思想</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲一下数据的acid</li><li style=\"line-height: 30px; margin-bottom: 10px;\">什么是一致性</li><li style=\"line-height: 30px; margin-bottom: 10px;\">什么是隔离性</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Mysql的隔离级别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">每个隔离级别是如何解决</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Mysql要加上nextkey锁，语句该怎么写</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java的内存模型，垃圾回收</li><li style=\"line-height: 30px; margin-bottom: 10px;\">线程池的参数</li><li style=\"line-height: 30px; margin-bottom: 10px;\">每个参数解释一遍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">然后面试官设置了每个参数，给了是个线程，让描述出完整的线程池执行的流程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Nio和IO有什么区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Nio和aio的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Spring的aop怎么实现</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Spring的aop有哪些实现方式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">动态代理的实现方式和区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Linux了解么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么查看系统负载</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Cpu load的参数如果为4，描述一下现在系统处于什么情况</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Linux，查找磁盘上最大的文件的命令</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Linux，如何查看系统日志文件</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法：leeetcode原题 22，Generate Parentheses，给定 n 对括号，请写一个函数以将其生成新的括号组合，并返回所有组合结果。</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">三面（现场）</h2><p style=\"margin-bottom: 25px; word-break: break-word !important;\">三面没怎么问技术，问了很多技术管理方面的问题</p><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么管理项目成员</li><li style=\"line-height: 30px; margin-bottom: 10px;\">当意见不一致时，如何沟通并说服开发成员，并举个例子</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么保证项目的进度</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库的索引原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">非聚簇索引和聚簇索引</li><li style=\"line-height: 30px; margin-bottom: 10px;\">索引的使用注意事项</li><li style=\"line-height: 30px; margin-bottom: 10px;\">联合索引</li><li style=\"line-height: 30px; margin-bottom: 10px;\">从底层解释最左匹配原则</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Mysql对联合索引有优化么？会自动调整顺序么？哪个版本开始优化？</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的应用</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的持久化的方式和原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">技术选型，一个新技术和一个稳定的旧技术，你会怎么选择，选择的考虑有哪些</li><li style=\"line-height: 30px; margin-bottom: 10px;\">说你印象最深的美团点评技术团队的三篇博客</li><li style=\"line-height: 30px; margin-bottom: 10px;\">最近在学什么新技术</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你是怎么去接触一门新技术的</li><li style=\"line-height: 30px; margin-bottom: 10px;\">会看哪些书</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么选择要看的书</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">百度</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java中的多态</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Object类下的方法</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Finalize的作用和使用场景</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashcode和equals</li><li style=\"line-height: 30px; margin-bottom: 10px;\">为什么要同时重写hashcode和equals</li><li style=\"line-height: 30px; margin-bottom: 10px;\">不同时重写会出现哪些问题</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hashmap如何变线程安全，每种方式的优缺点</li><li style=\"line-height: 30px; margin-bottom: 10px;\">垃圾回收机制</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Jvm的参数你知道的说一下</li><li style=\"line-height: 30px; margin-bottom: 10px;\">设计模式了解的说一下啊</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕一个单例模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">快速排序的思想讲一下</li><li style=\"line-height: 30px; margin-bottom: 10px;\">给个数组，模拟快排的过程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手写快排</li><li style=\"line-height: 30px; margin-bottom: 10px;\">设计题，一个图书馆管理系统，数据库怎么设计，需求自己定</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis的特点</li><li style=\"line-height: 30px; margin-bottom: 10px;\">分布式事务了解么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">反爬虫的机制，有哪些方式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法：反转单链表</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法：实现类似微博子结构的数据结构，输入一系列父子关系，输出一个类似微博评论的父子结构图</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手写java多线程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手写java的soeket编程，服务端和客户端</li><li style=\"line-height: 30px; margin-bottom: 10px;\">进程间的通信方式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法： 爬楼梯，写出状态转移方程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">智力题：时针分针什么时候重合</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">三面（现场）</h2><p style=\"margin-bottom: 25px; word-break: break-word !important;\">由于三面面试官不懂java，我不熟c加加，所以全程尬聊</p><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法：给定一个数字三角形，找到从顶部到底部的最小路径和。每一步可以移动到下面一行的相邻数字上。</li><li style=\"line-height: 30px; margin-bottom: 10px;\"></li><li style=\"line-height: 30px; margin-bottom: 10px;\">然后继续在这个问题上扩展</li><li style=\"line-height: 30px; margin-bottom: 10px;\">求出最短那条的路径</li><li style=\"line-height: 30px; margin-bottom: 10px;\">递归求出所有的路径</li><li style=\"line-height: 30px; margin-bottom: 10px;\">设计模式讲一下熟悉的</li><li style=\"line-height: 30px; margin-bottom: 10px;\">会不会滥用设计模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">多线程条件变量为什么要在while体里</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你遇到什么挫折</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">腾讯</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hibernate的作用，你的理解</li><li style=\"line-height: 30px; margin-bottom: 10px;\">多线程的理解，如何保证线程安全</li><li style=\"line-height: 30px; margin-bottom: 10px;\">mysql数据库的引擎和区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">场景题：千万用户抢购，如何处理高并发，并且有一个链接，指向前一天抢购成功的用户，如何设计这个系统和数据库</li><li style=\"line-height: 30px; margin-bottom: 10px;\">如果后台处理抢购请求的服务器，每次最多承受200的负载，系统该怎么设计</li><li style=\"line-height: 30px; margin-bottom: 10px;\">手撕算法：最小公倍数和最大公约数</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目里一个完整请求的流程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目的优化</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hibernate和mybatis的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">为什么用ssh框架</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Mysql的容灾备份</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Redis和memcache 的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">为什么选择redis</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Java的full gc</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Full gc会导致什么问题</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">招商银行信用卡</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">分布式事务</li><li style=\"line-height: 30px; margin-bottom: 10px;\">设计模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">访问者模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">装饰者模式</li><li style=\"line-height: 30px; margin-bottom: 10px;\">有哪些offer</li><li style=\"line-height: 30px; margin-bottom: 10px;\">为什么还来我们这</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">招银网络科技</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">写一个两个有序链表合并成一个有序链表</li><li style=\"line-height: 30px; margin-bottom: 10px;\">死锁是什么呢</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么解决死锁</li><li style=\"line-height: 30px; margin-bottom: 10px;\">http请求流程</li><li style=\"line-height: 30px; margin-bottom: 10px;\">为什么负载均衡</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么实现负载均衡</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库挂了怎么办？除了热备份还有什么方法</li><li style=\"line-height: 30px; margin-bottom: 10px;\">讲讲你对spring的理解，不要把ioc和aop背给我听</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">算法：找出两个数组相等的数，不能用其他数据结构</li><li style=\"line-height: 30px; margin-bottom: 10px;\">算法：给定一个数字，一个数组，找出数组中相加等于这两个数的和，不能用数据结构</li><li style=\"line-height: 30px; margin-bottom: 10px;\">算法：如何判断一个树是不是另一颗树的子树</li><li style=\"line-height: 30px; margin-bottom: 10px;\">如何解决并发访问的错误</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">网易</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面（现场）</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">I++操作怎么保证线程安全</li><li style=\"line-height: 30px; margin-bottom: 10px;\">场景题：设计一个下单系统，下单成功后可以给用户发优惠券</li><li style=\"line-height: 30px; margin-bottom: 10px;\">接上面场景题：服务器挂了，优惠券还没发怎么办</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库挂了怎么怎么办</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么保证一致性</li><li style=\"line-height: 30px; margin-bottom: 10px;\">分布式事务知道么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">介绍分布式事务</li><li style=\"line-height: 30px; margin-bottom: 10px;\">你的职业规划</li></ol><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">二面</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Nio的原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Channel和buffer</li><li style=\"line-height: 30px; margin-bottom: 10px;\">directBuffer和buffer的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">nio和aio的区别</li><li style=\"line-height: 30px; margin-bottom: 10px;\">锁的实现原理</li><li style=\"line-height: 30px; margin-bottom: 10px;\">怎么解决缓存和主存的一致性问题</li><li style=\"line-height: 30px; margin-bottom: 10px;\">缓存还没更新到主存，服务器挂了怎么办</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库挂了怎么办</li></ol><h1 style=\"font-size: 26px; margin-top: 0px; margin-bottom: 15px; font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); text-rendering: optimizeLegibility;\">Vivo</h1><h2 style=\"font-family: inherit; font-weight: 700; line-height: 1.7; color: rgb(47, 47, 47); margin: 0px 0px 15px; font-size: 24px; text-rendering: optimizeLegibility;\">一面</h2><ol style=\"margin-bottom: 20px; padding: 0px; margin-left: 22px; word-break: break-word !important;\"><li style=\"line-height: 30px; margin-bottom: 10px;\">自我介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">项目介绍</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Hibernate的batch有数量限制么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Jquery用过么</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Extjs的优缺点</li><li style=\"line-height: 30px; margin-bottom: 10px;\">有没有扩展过extjs</li><li style=\"line-height: 30px; margin-bottom: 10px;\">读写锁</li><li style=\"line-height: 30px; margin-bottom: 10px;\">什么时候用读锁</li><li style=\"line-height: 30px; margin-bottom: 10px;\">什么时候用写锁</li><li style=\"line-height: 30px; margin-bottom: 10px;\">Cas的原理，使用场景</li><li style=\"line-height: 30px; margin-bottom: 10px;\">数据库的瓶颈</li></ol><div><br></div><div><br></div><div>转自<a href=\"http://www.jianshu.com//p/72712546648b\" target=\"_blank\">http://www.jianshu.com//p/72712546648b</a></div></div>', 'article', null, '', null, null, '1', null, '0', '1', 'Bootdo', '2017-10-13 13:45:20', '2017-10-13 13:45:20');

-- ----------------------------
-- Table structure for `oa_notify`
-- ----------------------------
DROP TABLE IF EXISTS `oa_notify`;
CREATE TABLE `oa_notify` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `type` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '类型',
  `title` varchar(200) COLLATE utf8_bin DEFAULT NULL COMMENT '标题',
  `content` varchar(2000) COLLATE utf8_bin DEFAULT NULL COMMENT '内容',
  `files` varchar(2000) COLLATE utf8_bin DEFAULT NULL COMMENT '附件',
  `status` char(1) COLLATE utf8_bin DEFAULT NULL COMMENT '状态',
  `create_by` bigint(20) DEFAULT NULL COMMENT '创建者',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) COLLATE utf8_bin DEFAULT NULL COMMENT '更新者',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `remarks` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) COLLATE utf8_bin DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `oa_notify_del_flag` (`del_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=44 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='通知通告';

-- ----------------------------
-- Records of oa_notify
-- ----------------------------
INSERT INTO `oa_notify` VALUES ('41', '3', '十九大召开了', '十九大召开了，竟然没邀请我', '', '1', '1', null, null, '2017-10-10 17:21:11', '', null);
INSERT INTO `oa_notify` VALUES ('42', '3', '苹果发布新手机了', '有全面屏的iphoneX', '', '1', '1', null, null, '2017-10-10 18:51:14', '', null);
INSERT INTO `oa_notify` VALUES ('43', '3', '十九大要消灭贫困人口', '我还只有两三年的活头了', '', '1', '1', null, null, '2017-10-11 09:56:35', '', null);

-- ----------------------------
-- Table structure for `oa_notify_record`
-- ----------------------------
DROP TABLE IF EXISTS `oa_notify_record`;
CREATE TABLE `oa_notify_record` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `notify_id` bigint(20) DEFAULT NULL COMMENT '通知通告ID',
  `user_id` bigint(20) DEFAULT NULL COMMENT '接受人',
  `is_read` tinyint(1) DEFAULT '0' COMMENT '阅读标记',
  `read_date` date DEFAULT NULL COMMENT '阅读时间',
  PRIMARY KEY (`id`),
  KEY `oa_notify_record_notify_id` (`notify_id`),
  KEY `oa_notify_record_user_id` (`user_id`),
  KEY `oa_notify_record_read_flag` (`is_read`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='通知通告发送记录';

-- ----------------------------
-- Records of oa_notify_record
-- ----------------------------
INSERT INTO `oa_notify_record` VALUES ('18', '41', '1', '0', null);
INSERT INTO `oa_notify_record` VALUES ('19', '42', '1', '0', null);
INSERT INTO `oa_notify_record` VALUES ('20', '43', '136', '0', null);
INSERT INTO `oa_notify_record` VALUES ('21', '43', '133', '0', null);
INSERT INTO `oa_notify_record` VALUES ('22', '43', '130', '0', null);
INSERT INTO `oa_notify_record` VALUES ('23', '43', '1', '0', null);

-- ----------------------------
-- Table structure for `sys_dept`
-- ----------------------------
DROP TABLE IF EXISTS `sys_dept`;
CREATE TABLE `sys_dept` (
  `dept_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL COMMENT '上级部门ID，一级部门为0',
  `name` varchar(50) DEFAULT NULL COMMENT '部门名称',
  `order_num` int(11) DEFAULT NULL COMMENT '排序',
  `del_flag` tinyint(4) DEFAULT '0' COMMENT '是否删除  -1：已删除  0：正常',
  PRIMARY KEY (`dept_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='部门管理';

-- ----------------------------
-- Records of sys_dept
-- ----------------------------
INSERT INTO `sys_dept` VALUES ('6', '0', '研发部', '1', '1');
INSERT INTO `sys_dept` VALUES ('7', '6', '研發一部', '1', '1');
INSERT INTO `sys_dept` VALUES ('8', '6', '研发二部', '2', '1');
INSERT INTO `sys_dept` VALUES ('9', '0', '销售部', '2', '1');
INSERT INTO `sys_dept` VALUES ('10', '9', '销售一部', '1', '1');
INSERT INTO `sys_dept` VALUES ('11', '0', '产品部', '3', '1');
INSERT INTO `sys_dept` VALUES ('12', '11', '产品一部', '1', '1');
INSERT INTO `sys_dept` VALUES ('13', '0', '测试部', '5', '1');
INSERT INTO `sys_dept` VALUES ('14', '13', '测试一部', '1', '1');
INSERT INTO `sys_dept` VALUES ('15', '13', '测试二部', '2', '1');

-- ----------------------------
-- Table structure for `sys_dict`
-- ----------------------------
DROP TABLE IF EXISTS `sys_dict`;
CREATE TABLE `sys_dict` (
  `id` bigint(64) NOT NULL AUTO_INCREMENT COMMENT '编号',
  `name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '标签名',
  `value` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '数据值',
  `type` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '类型',
  `description` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '描述',
  `sort` decimal(10,0) DEFAULT NULL COMMENT '排序（升序）',
  `parent_id` bigint(64) DEFAULT '0' COMMENT '父级编号',
  `create_by` int(64) DEFAULT NULL COMMENT '创建者',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `update_by` bigint(64) DEFAULT NULL COMMENT '更新者',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `remarks` varchar(255) COLLATE utf8_bin DEFAULT NULL COMMENT '备注信息',
  `del_flag` char(1) COLLATE utf8_bin DEFAULT '0' COMMENT '删除标记',
  PRIMARY KEY (`id`),
  KEY `sys_dict_value` (`value`),
  KEY `sys_dict_label` (`name`),
  KEY `sys_dict_del_flag` (`del_flag`)
) ENGINE=InnoDB AUTO_INCREMENT=121 DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='字典表';

-- ----------------------------
-- Records of sys_dict
-- ----------------------------
INSERT INTO `sys_dict` VALUES ('1', '正常', '0', 'del_flag', '删除标记', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('3', '显示', '1', 'show_hide', '显示/隐藏', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('4', '隐藏', '0', 'show_hide', '显示/隐藏', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('5', '是', '1', 'yes_no', '是/否', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('6', '否', '0', 'yes_no', '是/否', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('7', '红色', 'red', 'color', '颜色值', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('8', '绿色', 'green', 'color', '颜色值', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('9', '蓝色', 'blue', 'color', '颜色值', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('10', '黄色', 'yellow', 'color', '颜色值', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('11', '橙色', 'orange', 'color', '颜色值', '50', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('12', '默认主题', 'default', 'theme', '主题方案', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('13', '天蓝主题', 'cerulean', 'theme', '主题方案', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('14', '橙色主题', 'readable', 'theme', '主题方案', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('15', '红色主题', 'united', 'theme', '主题方案', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('16', 'Flat主题', 'flat', 'theme', '主题方案', '60', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('17', '国家', '1', 'sys_area_type', '区域类型', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('18', '省份、直辖市', '2', 'sys_area_type', '区域类型', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('19', '地市', '3', 'sys_area_type', '区域类型', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('20', '区县', '4', 'sys_area_type', '区域类型', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('21', '公司', '1', 'sys_office_type', '机构类型', '60', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('22', '部门', '2', 'sys_office_type', '机构类型', '70', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('23', '小组', '3', 'sys_office_type', '机构类型', '80', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('24', '其它', '4', 'sys_office_type', '机构类型', '90', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('25', '综合部', '1', 'sys_office_common', '快捷通用部门', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('26', '开发部', '2', 'sys_office_common', '快捷通用部门', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('27', '人力部', '3', 'sys_office_common', '快捷通用部门', '50', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('28', '一级', '1', 'sys_office_grade', '机构等级', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('29', '二级', '2', 'sys_office_grade', '机构等级', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('30', '三级', '3', 'sys_office_grade', '机构等级', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('31', '四级', '4', 'sys_office_grade', '机构等级', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('32', '所有数据', '1', 'sys_data_scope', '数据范围', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('33', '所在公司及以下数据', '2', 'sys_data_scope', '数据范围', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('34', '所在公司数据', '3', 'sys_data_scope', '数据范围', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('35', '所在部门及以下数据', '4', 'sys_data_scope', '数据范围', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('36', '所在部门数据', '5', 'sys_data_scope', '数据范围', '50', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('37', '仅本人数据', '8', 'sys_data_scope', '数据范围', '90', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('38', '按明细设置', '9', 'sys_data_scope', '数据范围', '100', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('39', '系统管理', '1', 'sys_user_type', '用户类型', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('40', '部门经理', '2', 'sys_user_type', '用户类型', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('41', '普通用户', '3', 'sys_user_type', '用户类型', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('42', '基础主题', 'basic', 'cms_theme', '站点主题', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('43', '蓝色主题', 'blue', 'cms_theme', '站点主题', '20', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('44', '红色主题', 'red', 'cms_theme', '站点主题', '30', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('45', '文章模型', 'article', 'cms_module', '栏目模型', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('46', '图片模型', 'picture', 'cms_module', '栏目模型', '20', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('47', '下载模型', 'download', 'cms_module', '栏目模型', '30', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('48', '链接模型', 'link', 'cms_module', '栏目模型', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('49', '专题模型', 'special', 'cms_module', '栏目模型', '50', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('50', '默认展现方式', '0', 'cms_show_modes', '展现方式', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('51', '首栏目内容列表', '1', 'cms_show_modes', '展现方式', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('52', '栏目第一条内容', '2', 'cms_show_modes', '展现方式', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('53', '发布', '0', 'cms_del_flag', '内容状态', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('54', '删除', '1', 'cms_del_flag', '内容状态', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('55', '审核', '2', 'cms_del_flag', '内容状态', '15', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('56', '首页焦点图', '1', 'cms_posid', '推荐位', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('57', '栏目页文章推荐', '2', 'cms_posid', '推荐位', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('58', '咨询', '1', 'cms_guestbook', '留言板分类', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('59', '建议', '2', 'cms_guestbook', '留言板分类', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('60', '投诉', '3', 'cms_guestbook', '留言板分类', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('61', '其它', '4', 'cms_guestbook', '留言板分类', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('62', '公休', '1', 'oa_leave_type', '请假类型', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('63', '病假', '2', 'oa_leave_type', '请假类型', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('64', '事假', '3', 'oa_leave_type', '请假类型', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('65', '调休', '4', 'oa_leave_type', '请假类型', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('66', '婚假', '5', 'oa_leave_type', '请假类型', '60', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('67', '接入日志', '1', 'sys_log_type', '日志类型', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('68', '异常日志', '2', 'sys_log_type', '日志类型', '40', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('69', '请假流程', 'leave', 'act_type', '流程类型', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('70', '审批测试流程', 'test_audit', 'act_type', '流程类型', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('71', '分类1', '1', 'act_category', '流程分类', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('72', '分类2', '2', 'act_category', '流程分类', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('73', '增删改查', 'crud', 'gen_category', '代码生成分类', '10', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('74', '增删改查（包含从表）', 'crud_many', 'gen_category', '代码生成分类', '20', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('75', '树结构', 'tree', 'gen_category', '代码生成分类', '30', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('76', '=', '=', 'gen_query_type', '查询方式', '10', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('77', '!=', '!=', 'gen_query_type', '查询方式', '20', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('78', '&gt;', '&gt;', 'gen_query_type', '查询方式', '30', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('79', '&lt;', '&lt;', 'gen_query_type', '查询方式', '40', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('80', 'Between', 'between', 'gen_query_type', '查询方式', '50', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('81', 'Like', 'like', 'gen_query_type', '查询方式', '60', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('82', 'Left Like', 'left_like', 'gen_query_type', '查询方式', '70', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('83', 'Right Like', 'right_like', 'gen_query_type', '查询方式', '80', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('84', '文本框', 'input', 'gen_show_type', '字段生成方案', '10', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('85', '文本域', 'textarea', 'gen_show_type', '字段生成方案', '20', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('86', '下拉框', 'select', 'gen_show_type', '字段生成方案', '30', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('87', '复选框', 'checkbox', 'gen_show_type', '字段生成方案', '40', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('88', '单选框', 'radiobox', 'gen_show_type', '字段生成方案', '50', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('89', '日期选择', 'dateselect', 'gen_show_type', '字段生成方案', '60', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('90', '人员选择', 'userselect', 'gen_show_type', '字段生成方案', '70', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('91', '部门选择', 'officeselect', 'gen_show_type', '字段生成方案', '80', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('92', '区域选择', 'areaselect', 'gen_show_type', '字段生成方案', '90', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('93', 'String', 'String', 'gen_java_type', 'Java类型', '10', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('94', 'Long', 'Long', 'gen_java_type', 'Java类型', '20', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('95', '仅持久层', 'dao', 'gen_category', '代码生成分类\0\0', '40', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('96', '男', '1', 'sex', '性别', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('97', '女', '2', 'sex', '性别', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('98', 'Integer', 'Integer', 'gen_java_type', 'Java类型', '30', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('99', 'Double', 'Double', 'gen_java_type', 'Java类型', '40', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('100', 'Date', 'java.util.Date', 'gen_java_type', 'Java类型', '50', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('104', 'Custom', 'Custom', 'gen_java_type', 'Java类型', '90', '0', '1', null, '1', null, null, '1');
INSERT INTO `sys_dict` VALUES ('105', '会议通告', '1', 'oa_notify_type', '通知通告类型', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('106', '奖惩通告', '2', 'oa_notify_type', '通知通告类型', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('107', '活动通告', '3', 'oa_notify_type', '通知通告类型', '30', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('108', '草稿', '0', 'oa_notify_status', '通知通告状态', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('109', '发布', '1', 'oa_notify_status', '通知通告状态', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('110', '未读', '0', 'oa_notify_read', '通知通告状态', '10', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('111', '已读', '1', 'oa_notify_read', '通知通告状态', '20', '0', '1', null, '1', null, null, '0');
INSERT INTO `sys_dict` VALUES ('112', '草稿', '0', 'oa_notify_status', '通知通告状态', '10', '0', '1', null, '1', null, '', '0');
INSERT INTO `sys_dict` VALUES ('113', '删除', '0', 'del_flag', '删除标记', null, null, null, null, null, null, '', '');
INSERT INTO `sys_dict` VALUES ('118', '关于', 'about', 'blog_type', '博客类型', null, null, null, null, null, null, '全url是:/blog/open/page/about', '');
INSERT INTO `sys_dict` VALUES ('119', '交流', 'communication', 'blog_type', '博客类型', null, null, null, null, null, null, '', '');
INSERT INTO `sys_dict` VALUES ('120', '文章', 'article', 'blog_type', '博客类型', null, null, null, null, null, null, '', '');

-- ----------------------------
-- Table structure for `sys_file`
-- ----------------------------
DROP TABLE IF EXISTS `sys_file`;
CREATE TABLE `sys_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `type` int(11) DEFAULT NULL COMMENT '文件类型',
  `url` varchar(200) DEFAULT NULL COMMENT 'URL地址',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=134 DEFAULT CHARSET=utf8 COMMENT='文件上传';

-- ----------------------------
-- Records of sys_file
-- ----------------------------
INSERT INTO `sys_file` VALUES ('110', '0', '/files/d64a62e3-6821-48f1-bac6-a1b9945f4afb.jpg', '2017-10-14 16:20:17');
INSERT INTO `sys_file` VALUES ('111', '0', '/files/aa2c3dc6-495f-48cc-8e12-446eceb2535e.jpg', '2017-10-14 16:20:21');
INSERT INTO `sys_file` VALUES ('114', '0', '/files/84c29777-11bc-44b9-818d-859f2d04d417.jpg', '2017-10-20 09:27:18');
INSERT INTO `sys_file` VALUES ('116', '0', '/files/7e38b411-1c72-413a-b9e7-2a367f111856.jpg', '2017-10-20 11:53:42');
INSERT INTO `sys_file` VALUES ('117', '0', '/files/40073f7e-82ec-43f2-b9d3-fd9068916d4b.jpg', '2017-10-20 11:53:47');
INSERT INTO `sys_file` VALUES ('118', '0', '/files/a973499e-3ec7-4d43-8a52-b6f6517c77e3.jpg', '2017-10-20 11:53:52');
INSERT INTO `sys_file` VALUES ('125', '0', '/files/e2901e59-2e65-45a0-9fd8-284c88133cdd.jpg', '2017-10-20 11:54:20');
INSERT INTO `sys_file` VALUES ('126', '0', '/files/1ca91ae9-799e-4b7b-a72e-680825688677.jpg', '2017-10-20 11:54:24');
INSERT INTO `sys_file` VALUES ('127', '0', '/files/1a42a630-5186-44c1-8378-5f974652d7c8.jpg', '2017-10-20 13:20:49');
INSERT INTO `sys_file` VALUES ('128', '0', '/files/f4f730a9-6bd6-41de-aa05-a0ba3eac59ae.jpg', '2017-10-20 13:21:54');
INSERT INTO `sys_file` VALUES ('131', '0', '/files/4f5f32fd-f5ed-48c5-90ac-f71c9d7ebc24.jpg', '2017-10-20 13:50:00');

-- ----------------------------
-- Table structure for `sys_log`
-- ----------------------------
DROP TABLE IF EXISTS `sys_log`;
CREATE TABLE `sys_log` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户id',
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `operation` varchar(50) DEFAULT NULL COMMENT '用户操作',
  `time` int(11) DEFAULT NULL COMMENT '响应时间',
  `method` varchar(200) DEFAULT NULL COMMENT '请求方法',
  `params` varchar(5000) DEFAULT NULL COMMENT '请求参数',
  `ip` varchar(64) DEFAULT NULL COMMENT 'IP地址',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7034 DEFAULT CHARSET=utf8 COMMENT='系统日志';

-- ----------------------------
-- Records of sys_log
-- ----------------------------

-- ----------------------------
-- Table structure for `sys_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sys_menu`;
CREATE TABLE `sys_menu` (
  `menu_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parent_id` bigint(20) DEFAULT NULL COMMENT '父菜单ID，一级菜单为0',
  `name` varchar(50) DEFAULT NULL COMMENT '菜单名称',
  `url` varchar(200) DEFAULT NULL COMMENT '菜单URL',
  `perms` varchar(500) DEFAULT NULL COMMENT '授权(多个用逗号分隔，如：user:list,user:create)',
  `type` int(11) DEFAULT NULL COMMENT '类型   0：目录   1：菜单   2：按钮',
  `icon` varchar(50) DEFAULT NULL COMMENT '菜单图标',
  `order_num` int(11) DEFAULT NULL COMMENT '排序',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`menu_id`)
) ENGINE=InnoDB AUTO_INCREMENT=93 DEFAULT CHARSET=utf8 COMMENT='菜单管理';

-- ----------------------------
-- Records of sys_menu
-- ----------------------------
INSERT INTO `sys_menu` VALUES ('1', '0', '基础管理', '', '', '0', 'fa fa-bars', '0', '2017-08-09 22:49:47', null);
INSERT INTO `sys_menu` VALUES ('2', '3', '系统菜单', 'sys/menu/', 'sys:menu:menu', '1', 'fa fa-th-list', '2', '2017-08-09 22:55:15', null);
INSERT INTO `sys_menu` VALUES ('3', '0', '系统管理', null, null, '0', 'fa fa-desktop', '1', '2017-08-09 23:06:55', '2017-08-14 14:13:43');
INSERT INTO `sys_menu` VALUES ('6', '3', '用户管理', 'sys/user/', 'sys:user:user', '1', 'fa fa-user', '0', '2017-08-10 14:12:11', null);
INSERT INTO `sys_menu` VALUES ('7', '3', '角色管理', 'sys/role', 'sys:role:role', '1', 'fa fa-paw', '1', '2017-08-10 14:13:19', null);
INSERT INTO `sys_menu` VALUES ('12', '6', '新增', '', 'sys:user:add', '2', '', '0', '2017-08-14 10:51:35', null);
INSERT INTO `sys_menu` VALUES ('13', '6', '编辑', '', 'sys:user:edit', '2', '', '0', '2017-08-14 10:52:06', null);
INSERT INTO `sys_menu` VALUES ('14', '6', '删除', null, 'sys:user:remove', '2', null, '0', '2017-08-14 10:52:24', null);
INSERT INTO `sys_menu` VALUES ('15', '7', '新增', '', 'sys:role:add', '2', '', '0', '2017-08-14 10:56:37', null);
INSERT INTO `sys_menu` VALUES ('20', '2', '新增', '', 'sys:menu:add', '2', '', '0', '2017-08-14 10:59:32', null);
INSERT INTO `sys_menu` VALUES ('21', '2', '编辑', '', 'sys:menu:edit', '2', '', '0', '2017-08-14 10:59:56', null);
INSERT INTO `sys_menu` VALUES ('22', '2', '删除', '', 'sys:menu:remove', '2', '', '0', '2017-08-14 11:00:26', null);
INSERT INTO `sys_menu` VALUES ('24', '6', '批量删除', '', 'sys:user:batchRemove', '2', '', '0', '2017-08-14 17:27:18', null);
INSERT INTO `sys_menu` VALUES ('25', '6', '停用', null, 'sys:user:disable', '2', null, '0', '2017-08-14 17:27:43', null);
INSERT INTO `sys_menu` VALUES ('26', '6', '重置密码', '', 'sys:user:resetPwd', '2', '', '0', '2017-08-14 17:28:34', null);
INSERT INTO `sys_menu` VALUES ('27', '91', '系统日志', 'common/log', 'common:log', '1', 'fa fa-warning', '0', '2017-08-14 22:11:53', null);
INSERT INTO `sys_menu` VALUES ('28', '27', '刷新', null, 'sys:log:list', '2', null, '0', '2017-08-14 22:30:22', null);
INSERT INTO `sys_menu` VALUES ('29', '27', '删除', null, 'sys:log:remove', '2', null, '0', '2017-08-14 22:30:43', null);
INSERT INTO `sys_menu` VALUES ('30', '27', '清空', null, 'sys:log:clear', '2', null, '0', '2017-08-14 22:31:02', null);
INSERT INTO `sys_menu` VALUES ('48', '77', '代码生成', 'common/generator', 'common:generator', '1', 'fa fa-code', '3', null, null);
INSERT INTO `sys_menu` VALUES ('49', '0', '博客管理', '', '', '0', 'fa fa-rss', '6', null, null);
INSERT INTO `sys_menu` VALUES ('50', '49', '文章列表', 'blog/bContent', 'blog:bContent:bContent', '1', 'fa fa-file-image-o', '1', null, null);
INSERT INTO `sys_menu` VALUES ('51', '50', '新增', '', 'blog:bContent:add', '2', '', null, null, null);
INSERT INTO `sys_menu` VALUES ('55', '7', '编辑', '', 'sys:role:edit', '2', '', null, null, null);
INSERT INTO `sys_menu` VALUES ('56', '7', '删除', '', 'sys:role:remove', '2', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('57', '91', '运行监控', '/druid/index.html', '', '1', 'fa fa-caret-square-o-right', '1', null, null);
INSERT INTO `sys_menu` VALUES ('58', '50', '编辑', '', 'blog:bContent:edit', '2', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('59', '50', '删除', '', 'blog:bContent:remove', '2', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('60', '50', '批量删除', '', 'blog:bContent:batchRemove', '2', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('61', '2', '批量删除', '', 'sys:menu:batchRemove', '2', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('62', '7', '批量删除', '', 'sys:role:batchRemove', '2', null, null, null, null);
INSERT INTO `sys_menu` VALUES ('68', '49', '发布文章', '/blog/bContent/add', 'blog:bContent:add', '1', 'fa fa-edit', '0', null, null);
INSERT INTO `sys_menu` VALUES ('71', '1', '文件管理', '/common/sysFile', 'common:sysFile:sysFile', '1', 'fa fa-folder-open', '2', null, null);
INSERT INTO `sys_menu` VALUES ('72', '77', '计划任务', 'common/job', 'common:taskScheduleJob', '1', 'fa fa-hourglass-1', '4', null, null);
INSERT INTO `sys_menu` VALUES ('73', '3', '部门管理', '/system/sysDept', 'system:sysDept:sysDept', '1', 'fa fa-users', '3', null, null);
INSERT INTO `sys_menu` VALUES ('74', '73', '增加', '/system/sysDept/add', 'system:sysDept:add', '2', null, '1', null, null);
INSERT INTO `sys_menu` VALUES ('75', '73', '刪除', 'system/sysDept/remove', 'system:sysDept:remove', '2', null, '2', null, null);
INSERT INTO `sys_menu` VALUES ('76', '73', '编辑', '/system/sysDept/edit', 'system:sysDept:edit', '2', null, '3', null, null);
INSERT INTO `sys_menu` VALUES ('77', '0', '系统工具', '', '', '0', 'fa fa-gear', '4', null, null);
INSERT INTO `sys_menu` VALUES ('78', '1', '数据字典', '/common/sysDict', 'common:sysDict:sysDict', '1', 'fa fa-book', '1', null, null);
INSERT INTO `sys_menu` VALUES ('79', '78', '增加', '/common/sysDict/add', 'common:sysDict:add', '2', null, '2', null, null);
INSERT INTO `sys_menu` VALUES ('80', '78', '编辑', '/common/sysDict/edit', 'common:sysDict:edit', '2', null, '2', null, null);
INSERT INTO `sys_menu` VALUES ('81', '78', '删除', '/common/sysDict/remove', 'common:sysDict:remove', '2', '', '3', null, null);
INSERT INTO `sys_menu` VALUES ('83', '78', '批量删除', '/common/sysDict/batchRemove', 'common:sysDict:batchRemove', '2', '', '4', null, null);
INSERT INTO `sys_menu` VALUES ('84', '0', '办公管理', '', '', '0', 'fa fa-laptop', '5', null, null);
INSERT INTO `sys_menu` VALUES ('85', '84', '通知公告', 'oa/notify', 'oa:notify:notify', '1', 'fa fa-pencil-square', null, null, null);
INSERT INTO `sys_menu` VALUES ('86', '85', '新增', 'oa/notify/add', 'oa:notify:add', '2', 'fa fa-plus', '1', null, null);
INSERT INTO `sys_menu` VALUES ('87', '85', '编辑', 'oa/notify/edit', 'oa:notify:edit', '2', 'fa fa-pencil-square-o', '2', null, null);
INSERT INTO `sys_menu` VALUES ('88', '85', '删除', 'oa/notify/remove', 'oa:notify:remove', '2', 'fa fa-minus', null, null, null);
INSERT INTO `sys_menu` VALUES ('89', '85', '批量删除', 'oa/notify/batchRemove', 'oa:notify:batchRemove', '2', '', null, null, null);
INSERT INTO `sys_menu` VALUES ('90', '84', '我的通知', 'oa/notify/selfNotify', '', '1', 'fa fa-envelope-square', null, null, null);
INSERT INTO `sys_menu` VALUES ('91', '0', '系统监控', '', '', '0', 'fa fa-video-camera', '5', null, null);
INSERT INTO `sys_menu` VALUES ('92', '91', '在线用户', 'sys/online', '', '1', 'fa fa-user', null, null, null);

-- ----------------------------
-- Table structure for `sys_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role`;
CREATE TABLE `sys_role` (
  `role_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_name` varchar(100) DEFAULT NULL COMMENT '角色名称',
  `role_sign` varchar(100) DEFAULT NULL COMMENT '角色标识',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `user_id_create` bigint(255) DEFAULT NULL COMMENT '创建用户id',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=57 DEFAULT CHARSET=utf8 COMMENT='角色';

-- ----------------------------
-- Records of sys_role
-- ----------------------------
INSERT INTO `sys_role` VALUES ('1', '超级用户角色', 'admin', '拥有最高权限', '2', '2017-08-12 00:43:52', '2017-08-12 19:14:59');
INSERT INTO `sys_role` VALUES ('48', '钻石会员', null, '消费1w块', null, null, null);
INSERT INTO `sys_role` VALUES ('49', '白金会员', null, '消费5000以上', null, null, null);
INSERT INTO `sys_role` VALUES ('52', '白银会员', null, '消费两千以上', null, null, null);
INSERT INTO `sys_role` VALUES ('56', '普通用户', null, '普通用户', null, null, null);

-- ----------------------------
-- Table structure for `sys_role_menu`
-- ----------------------------
DROP TABLE IF EXISTS `sys_role_menu`;
CREATE TABLE `sys_role_menu` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色ID',
  `menu_id` bigint(20) DEFAULT NULL COMMENT '菜单ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2557 DEFAULT CHARSET=utf8 COMMENT='角色与菜单对应关系';

-- ----------------------------
-- Records of sys_role_menu
-- ----------------------------
INSERT INTO `sys_role_menu` VALUES ('367', '44', '1');
INSERT INTO `sys_role_menu` VALUES ('368', '44', '32');
INSERT INTO `sys_role_menu` VALUES ('369', '44', '33');
INSERT INTO `sys_role_menu` VALUES ('370', '44', '34');
INSERT INTO `sys_role_menu` VALUES ('371', '44', '35');
INSERT INTO `sys_role_menu` VALUES ('372', '44', '28');
INSERT INTO `sys_role_menu` VALUES ('373', '44', '29');
INSERT INTO `sys_role_menu` VALUES ('374', '44', '30');
INSERT INTO `sys_role_menu` VALUES ('375', '44', '38');
INSERT INTO `sys_role_menu` VALUES ('376', '44', '4');
INSERT INTO `sys_role_menu` VALUES ('377', '44', '27');
INSERT INTO `sys_role_menu` VALUES ('378', '45', '38');
INSERT INTO `sys_role_menu` VALUES ('379', '46', '3');
INSERT INTO `sys_role_menu` VALUES ('380', '46', '20');
INSERT INTO `sys_role_menu` VALUES ('381', '46', '21');
INSERT INTO `sys_role_menu` VALUES ('382', '46', '22');
INSERT INTO `sys_role_menu` VALUES ('383', '46', '23');
INSERT INTO `sys_role_menu` VALUES ('384', '46', '11');
INSERT INTO `sys_role_menu` VALUES ('385', '46', '12');
INSERT INTO `sys_role_menu` VALUES ('386', '46', '13');
INSERT INTO `sys_role_menu` VALUES ('387', '46', '14');
INSERT INTO `sys_role_menu` VALUES ('388', '46', '24');
INSERT INTO `sys_role_menu` VALUES ('389', '46', '25');
INSERT INTO `sys_role_menu` VALUES ('390', '46', '26');
INSERT INTO `sys_role_menu` VALUES ('391', '46', '15');
INSERT INTO `sys_role_menu` VALUES ('392', '46', '2');
INSERT INTO `sys_role_menu` VALUES ('393', '46', '6');
INSERT INTO `sys_role_menu` VALUES ('394', '46', '7');
INSERT INTO `sys_role_menu` VALUES ('598', '50', '38');
INSERT INTO `sys_role_menu` VALUES ('632', '38', '42');
INSERT INTO `sys_role_menu` VALUES ('737', '51', '38');
INSERT INTO `sys_role_menu` VALUES ('738', '51', '39');
INSERT INTO `sys_role_menu` VALUES ('739', '51', '40');
INSERT INTO `sys_role_menu` VALUES ('740', '51', '41');
INSERT INTO `sys_role_menu` VALUES ('741', '51', '4');
INSERT INTO `sys_role_menu` VALUES ('742', '51', '32');
INSERT INTO `sys_role_menu` VALUES ('743', '51', '33');
INSERT INTO `sys_role_menu` VALUES ('744', '51', '34');
INSERT INTO `sys_role_menu` VALUES ('745', '51', '35');
INSERT INTO `sys_role_menu` VALUES ('746', '51', '27');
INSERT INTO `sys_role_menu` VALUES ('747', '51', '28');
INSERT INTO `sys_role_menu` VALUES ('748', '51', '29');
INSERT INTO `sys_role_menu` VALUES ('749', '51', '30');
INSERT INTO `sys_role_menu` VALUES ('750', '51', '1');
INSERT INTO `sys_role_menu` VALUES ('1064', '54', '53');
INSERT INTO `sys_role_menu` VALUES ('1095', '55', '2');
INSERT INTO `sys_role_menu` VALUES ('1096', '55', '6');
INSERT INTO `sys_role_menu` VALUES ('1097', '55', '7');
INSERT INTO `sys_role_menu` VALUES ('1098', '55', '3');
INSERT INTO `sys_role_menu` VALUES ('1099', '55', '50');
INSERT INTO `sys_role_menu` VALUES ('1100', '55', '49');
INSERT INTO `sys_role_menu` VALUES ('1101', '55', '1');
INSERT INTO `sys_role_menu` VALUES ('1856', '53', '28');
INSERT INTO `sys_role_menu` VALUES ('1857', '53', '29');
INSERT INTO `sys_role_menu` VALUES ('1858', '53', '30');
INSERT INTO `sys_role_menu` VALUES ('1859', '53', '27');
INSERT INTO `sys_role_menu` VALUES ('1860', '53', '57');
INSERT INTO `sys_role_menu` VALUES ('1861', '53', '71');
INSERT INTO `sys_role_menu` VALUES ('1862', '53', '48');
INSERT INTO `sys_role_menu` VALUES ('1863', '53', '72');
INSERT INTO `sys_role_menu` VALUES ('1864', '53', '1');
INSERT INTO `sys_role_menu` VALUES ('1865', '53', '7');
INSERT INTO `sys_role_menu` VALUES ('1866', '53', '55');
INSERT INTO `sys_role_menu` VALUES ('1867', '53', '56');
INSERT INTO `sys_role_menu` VALUES ('1868', '53', '62');
INSERT INTO `sys_role_menu` VALUES ('1869', '53', '15');
INSERT INTO `sys_role_menu` VALUES ('1870', '53', '2');
INSERT INTO `sys_role_menu` VALUES ('1871', '53', '61');
INSERT INTO `sys_role_menu` VALUES ('1872', '53', '20');
INSERT INTO `sys_role_menu` VALUES ('1873', '53', '21');
INSERT INTO `sys_role_menu` VALUES ('1874', '53', '22');
INSERT INTO `sys_role_menu` VALUES ('1875', '49', '12');
INSERT INTO `sys_role_menu` VALUES ('1876', '49', '13');
INSERT INTO `sys_role_menu` VALUES ('1877', '49', '14');
INSERT INTO `sys_role_menu` VALUES ('1878', '49', '24');
INSERT INTO `sys_role_menu` VALUES ('1879', '49', '25');
INSERT INTO `sys_role_menu` VALUES ('1880', '49', '26');
INSERT INTO `sys_role_menu` VALUES ('1881', '49', '61');
INSERT INTO `sys_role_menu` VALUES ('1882', '49', '20');
INSERT INTO `sys_role_menu` VALUES ('1883', '49', '21');
INSERT INTO `sys_role_menu` VALUES ('1884', '49', '22');
INSERT INTO `sys_role_menu` VALUES ('1885', '49', '74');
INSERT INTO `sys_role_menu` VALUES ('1886', '49', '75');
INSERT INTO `sys_role_menu` VALUES ('1887', '49', '76');
INSERT INTO `sys_role_menu` VALUES ('1888', '49', '6');
INSERT INTO `sys_role_menu` VALUES ('1889', '49', '2');
INSERT INTO `sys_role_menu` VALUES ('1890', '49', '73');
INSERT INTO `sys_role_menu` VALUES ('2072', '52', '77');
INSERT INTO `sys_role_menu` VALUES ('2073', '52', '49');
INSERT INTO `sys_role_menu` VALUES ('2074', '52', '3');
INSERT INTO `sys_role_menu` VALUES ('2075', '52', '72');
INSERT INTO `sys_role_menu` VALUES ('2076', '52', '48');
INSERT INTO `sys_role_menu` VALUES ('2084', '56', '68');
INSERT INTO `sys_role_menu` VALUES ('2085', '56', '60');
INSERT INTO `sys_role_menu` VALUES ('2086', '56', '59');
INSERT INTO `sys_role_menu` VALUES ('2087', '56', '58');
INSERT INTO `sys_role_menu` VALUES ('2088', '56', '51');
INSERT INTO `sys_role_menu` VALUES ('2089', '56', '50');
INSERT INTO `sys_role_menu` VALUES ('2090', '56', '49');
INSERT INTO `sys_role_menu` VALUES ('2243', '48', '72');
INSERT INTO `sys_role_menu` VALUES ('2247', '63', '-1');
INSERT INTO `sys_role_menu` VALUES ('2248', '63', '84');
INSERT INTO `sys_role_menu` VALUES ('2249', '63', '85');
INSERT INTO `sys_role_menu` VALUES ('2250', '63', '88');
INSERT INTO `sys_role_menu` VALUES ('2251', '63', '87');
INSERT INTO `sys_role_menu` VALUES ('2252', '64', '84');
INSERT INTO `sys_role_menu` VALUES ('2253', '64', '89');
INSERT INTO `sys_role_menu` VALUES ('2254', '64', '88');
INSERT INTO `sys_role_menu` VALUES ('2255', '64', '87');
INSERT INTO `sys_role_menu` VALUES ('2256', '64', '86');
INSERT INTO `sys_role_menu` VALUES ('2257', '64', '85');
INSERT INTO `sys_role_menu` VALUES ('2258', '65', '89');
INSERT INTO `sys_role_menu` VALUES ('2259', '65', '88');
INSERT INTO `sys_role_menu` VALUES ('2260', '65', '86');
INSERT INTO `sys_role_menu` VALUES ('2262', '67', '48');
INSERT INTO `sys_role_menu` VALUES ('2263', '68', '88');
INSERT INTO `sys_role_menu` VALUES ('2264', '68', '87');
INSERT INTO `sys_role_menu` VALUES ('2265', '69', '89');
INSERT INTO `sys_role_menu` VALUES ('2266', '69', '88');
INSERT INTO `sys_role_menu` VALUES ('2267', '69', '86');
INSERT INTO `sys_role_menu` VALUES ('2268', '69', '87');
INSERT INTO `sys_role_menu` VALUES ('2269', '69', '85');
INSERT INTO `sys_role_menu` VALUES ('2270', '69', '84');
INSERT INTO `sys_role_menu` VALUES ('2271', '70', '85');
INSERT INTO `sys_role_menu` VALUES ('2272', '70', '89');
INSERT INTO `sys_role_menu` VALUES ('2273', '70', '88');
INSERT INTO `sys_role_menu` VALUES ('2274', '70', '87');
INSERT INTO `sys_role_menu` VALUES ('2275', '70', '86');
INSERT INTO `sys_role_menu` VALUES ('2276', '70', '84');
INSERT INTO `sys_role_menu` VALUES ('2277', '71', '87');
INSERT INTO `sys_role_menu` VALUES ('2278', '72', '59');
INSERT INTO `sys_role_menu` VALUES ('2279', '73', '48');
INSERT INTO `sys_role_menu` VALUES ('2280', '74', '88');
INSERT INTO `sys_role_menu` VALUES ('2281', '74', '87');
INSERT INTO `sys_role_menu` VALUES ('2282', '75', '88');
INSERT INTO `sys_role_menu` VALUES ('2283', '75', '87');
INSERT INTO `sys_role_menu` VALUES ('2284', '76', '85');
INSERT INTO `sys_role_menu` VALUES ('2285', '76', '89');
INSERT INTO `sys_role_menu` VALUES ('2286', '76', '88');
INSERT INTO `sys_role_menu` VALUES ('2287', '76', '87');
INSERT INTO `sys_role_menu` VALUES ('2288', '76', '86');
INSERT INTO `sys_role_menu` VALUES ('2289', '76', '84');
INSERT INTO `sys_role_menu` VALUES ('2292', '78', '88');
INSERT INTO `sys_role_menu` VALUES ('2293', '78', '87');
INSERT INTO `sys_role_menu` VALUES ('2294', '78', null);
INSERT INTO `sys_role_menu` VALUES ('2295', '78', null);
INSERT INTO `sys_role_menu` VALUES ('2296', '78', null);
INSERT INTO `sys_role_menu` VALUES ('2308', '80', '87');
INSERT INTO `sys_role_menu` VALUES ('2309', '80', '86');
INSERT INTO `sys_role_menu` VALUES ('2310', '80', '-1');
INSERT INTO `sys_role_menu` VALUES ('2311', '80', '84');
INSERT INTO `sys_role_menu` VALUES ('2312', '80', '85');
INSERT INTO `sys_role_menu` VALUES ('2328', '79', '72');
INSERT INTO `sys_role_menu` VALUES ('2329', '79', '48');
INSERT INTO `sys_role_menu` VALUES ('2330', '79', '77');
INSERT INTO `sys_role_menu` VALUES ('2331', '79', '84');
INSERT INTO `sys_role_menu` VALUES ('2332', '79', '89');
INSERT INTO `sys_role_menu` VALUES ('2333', '79', '88');
INSERT INTO `sys_role_menu` VALUES ('2334', '79', '87');
INSERT INTO `sys_role_menu` VALUES ('2335', '79', '86');
INSERT INTO `sys_role_menu` VALUES ('2336', '79', '85');
INSERT INTO `sys_role_menu` VALUES ('2337', '79', '-1');
INSERT INTO `sys_role_menu` VALUES ('2338', '77', '89');
INSERT INTO `sys_role_menu` VALUES ('2339', '77', '88');
INSERT INTO `sys_role_menu` VALUES ('2340', '77', '87');
INSERT INTO `sys_role_menu` VALUES ('2341', '77', '86');
INSERT INTO `sys_role_menu` VALUES ('2342', '77', '85');
INSERT INTO `sys_role_menu` VALUES ('2343', '77', '84');
INSERT INTO `sys_role_menu` VALUES ('2344', '77', '72');
INSERT INTO `sys_role_menu` VALUES ('2345', '77', '-1');
INSERT INTO `sys_role_menu` VALUES ('2346', '77', '77');
INSERT INTO `sys_role_menu` VALUES ('2503', '1', '90');
INSERT INTO `sys_role_menu` VALUES ('2504', '1', '89');
INSERT INTO `sys_role_menu` VALUES ('2505', '1', '88');
INSERT INTO `sys_role_menu` VALUES ('2506', '1', '87');
INSERT INTO `sys_role_menu` VALUES ('2507', '1', '86');
INSERT INTO `sys_role_menu` VALUES ('2508', '1', '72');
INSERT INTO `sys_role_menu` VALUES ('2509', '1', '48');
INSERT INTO `sys_role_menu` VALUES ('2510', '1', '68');
INSERT INTO `sys_role_menu` VALUES ('2511', '1', '60');
INSERT INTO `sys_role_menu` VALUES ('2512', '1', '59');
INSERT INTO `sys_role_menu` VALUES ('2513', '1', '58');
INSERT INTO `sys_role_menu` VALUES ('2514', '1', '51');
INSERT INTO `sys_role_menu` VALUES ('2515', '1', '76');
INSERT INTO `sys_role_menu` VALUES ('2516', '1', '75');
INSERT INTO `sys_role_menu` VALUES ('2517', '1', '74');
INSERT INTO `sys_role_menu` VALUES ('2518', '1', '62');
INSERT INTO `sys_role_menu` VALUES ('2519', '1', '56');
INSERT INTO `sys_role_menu` VALUES ('2520', '1', '55');
INSERT INTO `sys_role_menu` VALUES ('2521', '1', '15');
INSERT INTO `sys_role_menu` VALUES ('2522', '1', '26');
INSERT INTO `sys_role_menu` VALUES ('2523', '1', '25');
INSERT INTO `sys_role_menu` VALUES ('2524', '1', '24');
INSERT INTO `sys_role_menu` VALUES ('2525', '1', '14');
INSERT INTO `sys_role_menu` VALUES ('2526', '1', '13');
INSERT INTO `sys_role_menu` VALUES ('2527', '1', '12');
INSERT INTO `sys_role_menu` VALUES ('2528', '1', '61');
INSERT INTO `sys_role_menu` VALUES ('2529', '1', '22');
INSERT INTO `sys_role_menu` VALUES ('2530', '1', '21');
INSERT INTO `sys_role_menu` VALUES ('2531', '1', '20');
INSERT INTO `sys_role_menu` VALUES ('2532', '1', '83');
INSERT INTO `sys_role_menu` VALUES ('2533', '1', '81');
INSERT INTO `sys_role_menu` VALUES ('2534', '1', '80');
INSERT INTO `sys_role_menu` VALUES ('2535', '1', '79');
INSERT INTO `sys_role_menu` VALUES ('2536', '1', '71');
INSERT INTO `sys_role_menu` VALUES ('2537', '1', '57');
INSERT INTO `sys_role_menu` VALUES ('2538', '1', '30');
INSERT INTO `sys_role_menu` VALUES ('2539', '1', '29');
INSERT INTO `sys_role_menu` VALUES ('2540', '1', '28');
INSERT INTO `sys_role_menu` VALUES ('2541', '1', '85');
INSERT INTO `sys_role_menu` VALUES ('2542', '1', '84');
INSERT INTO `sys_role_menu` VALUES ('2543', '1', '77');
INSERT INTO `sys_role_menu` VALUES ('2544', '1', '50');
INSERT INTO `sys_role_menu` VALUES ('2545', '1', '49');
INSERT INTO `sys_role_menu` VALUES ('2546', '1', '73');
INSERT INTO `sys_role_menu` VALUES ('2547', '1', '7');
INSERT INTO `sys_role_menu` VALUES ('2548', '1', '6');
INSERT INTO `sys_role_menu` VALUES ('2549', '1', '2');
INSERT INTO `sys_role_menu` VALUES ('2550', '1', '3');
INSERT INTO `sys_role_menu` VALUES ('2551', '1', '78');
INSERT INTO `sys_role_menu` VALUES ('2552', '1', '27');
INSERT INTO `sys_role_menu` VALUES ('2553', '1', '1');
INSERT INTO `sys_role_menu` VALUES ('2554', '1', '91');
INSERT INTO `sys_role_menu` VALUES ('2555', '1', '92');
INSERT INTO `sys_role_menu` VALUES ('2556', '1', '-1');

-- ----------------------------
-- Table structure for `sys_task`
-- ----------------------------
DROP TABLE IF EXISTS `sys_task`;
CREATE TABLE `sys_task` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `cron_expression` varchar(255) DEFAULT NULL COMMENT 'cron表达式',
  `method_name` varchar(255) DEFAULT NULL COMMENT '任务调用的方法名',
  `is_concurrent` varchar(255) DEFAULT NULL COMMENT '任务是否有状态',
  `description` varchar(255) DEFAULT NULL COMMENT '任务描述',
  `update_by` varchar(64) DEFAULT NULL COMMENT '更新者',
  `bean_class` varchar(255) DEFAULT NULL COMMENT '任务执行时调用哪个类的方法 包名+类名',
  `create_date` datetime DEFAULT NULL COMMENT '创建时间',
  `job_status` varchar(255) DEFAULT NULL COMMENT '任务状态',
  `job_group` varchar(255) DEFAULT NULL COMMENT '任务分组',
  `update_date` datetime DEFAULT NULL COMMENT '更新时间',
  `create_by` varchar(64) DEFAULT NULL COMMENT '创建者',
  `spring_bean` varchar(255) DEFAULT NULL COMMENT 'Spring bean',
  `job_name` varchar(255) DEFAULT NULL COMMENT '任务名',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_task
-- ----------------------------
INSERT INTO `sys_task` VALUES ('2', '0/10 * * * * ?', 'run1', '1', '', '4028ea815a3d2a8c015a3d2f8d2a0002', 'com.bootdo.common.task.WelcomeJob', '2017-05-19 18:30:56', '1', 'group1', '2017-05-19 18:31:07', null, '', 'welcomJob');

-- ----------------------------
-- Table structure for `sys_user`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user`;
CREATE TABLE `sys_user` (
  `user_id` bigint(20) NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL COMMENT '用户名',
  `name` varchar(100) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL COMMENT '密码',
  `dept_id` int(20) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL COMMENT '邮箱',
  `mobile` varchar(100) DEFAULT NULL COMMENT '手机号',
  `status` tinyint(255) DEFAULT NULL COMMENT '状态 0:禁用，1:正常',
  `user_id_create` bigint(255) DEFAULT NULL COMMENT '创建用户id',
  `gmt_create` datetime DEFAULT NULL COMMENT '创建时间',
  `gmt_modified` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=137 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of sys_user
-- ----------------------------
INSERT INTO `sys_user` VALUES ('1', 'admin', '超级管理员', '27bd386e70f280e24c2f4f2a549b82cf', '6', 'admin@example.com', '123456', '1', '1', '2017-08-15 21:40:39', '2017-08-15 21:41:00');
INSERT INTO `sys_user` VALUES ('2', 'test', '临时用户', '6cf3bb3deba2aadbd41ec9a22511084e', '6', 'test@bootdo.com', null, '1', '1', '2017-08-14 13:43:05', '2017-08-14 21:15:36');
INSERT INTO `sys_user` VALUES ('36', 'ldh', '刘德华', 'bfd9394475754fbe45866eba97738c36', '6', 'ldh@bootdo.com', null, '1', null, null, null);
INSERT INTO `sys_user` VALUES ('123', 'zxy', '张学友', '35174ba93f5fe7267f1fb3c1bf903781', '6', 'zxy@bootdo', null, '0', null, null, null);
INSERT INTO `sys_user` VALUES ('124', 'wyf', '吴亦凡', 'e179e6f687bbd57b9d7efc4746c8090a', '6', 'wyf@bootdo.com', null, '1', null, null, null);
INSERT INTO `sys_user` VALUES ('130', 'lh', '鹿晗', '7924710cd673f68967cde70e188bb097', '9', 'lh@bootdo.com', null, '1', null, null, null);
INSERT INTO `sys_user` VALUES ('131', 'lhc', '令狐冲', 'd515538e17ecb570ba40344b5618f5d4', '6', 'lhc@bootdo.com', null, '0', null, null, null);
INSERT INTO `sys_user` VALUES ('132', 'lyf', '刘亦菲', '7fdb1d9008f45950c1620ba0864e5fbd', '13', 'lyf@bootdo.com', null, '1', null, null, null);
INSERT INTO `sys_user` VALUES ('133', 'my', '马云', '40545c12927485fc6ebf65a146246aa0', '9', 'my@bootdo.com', null, '1', null, null, null);
INSERT INTO `sys_user` VALUES ('134', 'lyh', '李彦宏', 'dc26092b3244d9d432863f2738180e19', '8', 'lyh@bootdo.com', null, '1', null, null, null);
INSERT INTO `sys_user` VALUES ('135', 'wjl', '王健林', '3967697dfced162cf6a34080259b83aa', '6', 'wjl@bootod.com', null, '1', null, null, null);
INSERT INTO `sys_user` VALUES ('136', 'gdg', '郭德纲', '3bb1bda86bc02bf6478cd91e42135d2f', '9', 'gdg@bootdo.com', null, '1', null, null, null);

-- ----------------------------
-- Table structure for `sys_user_role`
-- ----------------------------
DROP TABLE IF EXISTS `sys_user_role`;
CREATE TABLE `sys_user_role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) DEFAULT NULL COMMENT '用户ID',
  `role_id` bigint(20) DEFAULT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=125 DEFAULT CHARSET=utf8 COMMENT='用户与角色对应关系';

-- ----------------------------
-- Records of sys_user_role
-- ----------------------------
INSERT INTO `sys_user_role` VALUES ('73', '30', '48');
INSERT INTO `sys_user_role` VALUES ('74', '30', '49');
INSERT INTO `sys_user_role` VALUES ('75', '30', '50');
INSERT INTO `sys_user_role` VALUES ('76', '31', '48');
INSERT INTO `sys_user_role` VALUES ('77', '31', '49');
INSERT INTO `sys_user_role` VALUES ('78', '31', '52');
INSERT INTO `sys_user_role` VALUES ('79', '32', '48');
INSERT INTO `sys_user_role` VALUES ('80', '32', '49');
INSERT INTO `sys_user_role` VALUES ('81', '32', '50');
INSERT INTO `sys_user_role` VALUES ('82', '32', '51');
INSERT INTO `sys_user_role` VALUES ('83', '32', '52');
INSERT INTO `sys_user_role` VALUES ('84', '33', '38');
INSERT INTO `sys_user_role` VALUES ('85', '33', '49');
INSERT INTO `sys_user_role` VALUES ('86', '33', '52');
INSERT INTO `sys_user_role` VALUES ('87', '34', '50');
INSERT INTO `sys_user_role` VALUES ('88', '34', '51');
INSERT INTO `sys_user_role` VALUES ('89', '34', '52');
INSERT INTO `sys_user_role` VALUES ('97', '36', '48');
INSERT INTO `sys_user_role` VALUES ('106', '124', '1');
INSERT INTO `sys_user_role` VALUES ('110', '1', '1');
INSERT INTO `sys_user_role` VALUES ('111', '2', '1');
INSERT INTO `sys_user_role` VALUES ('113', '131', '48');
INSERT INTO `sys_user_role` VALUES ('117', '135', '1');
INSERT INTO `sys_user_role` VALUES ('120', '134', '1');
INSERT INTO `sys_user_role` VALUES ('121', '134', '48');
INSERT INTO `sys_user_role` VALUES ('122', '133', '1');
INSERT INTO `sys_user_role` VALUES ('123', '130', '1');
INSERT INTO `sys_user_role` VALUES ('124', null, '48');

