package com.bootdo.contract.service.impl;

import com.bootdo.activiti.config.ActivitiConstant;
import com.bootdo.activiti.service.ActTaskService;
import com.bootdo.activiti.service.impl.ActTaskServiceImpl;
import com.bootdo.common.domain.MainDO;
import com.bootdo.common.utils.R;
import com.bootdo.contract.domain.TravelDO;

import org.apache.poi.hssf.usermodel.HSSFCell;
import org.apache.poi.hssf.usermodel.HSSFCellStyle;
import org.apache.poi.hssf.usermodel.HSSFDateUtil;
import org.apache.poi.hssf.usermodel.HSSFRow;
import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.DateUtil;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.apache.poi.ss.util.NumberToTextConverter;
import org.apache.poi.xssf.usermodel.XSSFCell;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;

import com.bootdo.common.domain.DictDO;
import com.bootdo.contract.dao.ContractDao;
import com.bootdo.contract.domain.ContractDO;
import com.bootdo.contract.domain.ContractHardwareDetailDO;
import com.bootdo.contract.domain.ContractSoftwareDetailDo;
import com.bootdo.contract.service.ContractService;
import com.bootdo.sales.domain.BusinessDO;
import com.bootdo.sales.domain.RecordServiceDO;

@Service
public class ContractServiceImpl implements ContractService {
	@Autowired
	private ContractDao contractDao;
	@Autowired
	private ActTaskServiceImpl actTaskService;
	@Autowired  
	private HttpServletRequest request; 
	@Override
	public List<MainDO> getRecipient(Map<String, Object> map) {
		return contractDao.getRecipient(map);
	}

	@Override
	public List<MainDO> getPrincipal(Map<String, Object> map) {
		return contractDao.getPrincipal(map);
	}

	@Override
	public List<MainDO> getLog(Map<String, Object> map) {
		return contractDao.getLog(map);
	}

	@Override
	public List<MainDO> getUndoLog(Map<String, Object> map) {
		return contractDao.getUndoLog(map);
	}

	@Override
	public ContractDO get(String contractId) {
		return contractDao.get(contractId);
	}

	@Override
	public ContractDO view(String contractId) {
		return contractDao.view(contractId);
	}

	@Override
	public List<MainDO> getDataList(Map<String, Object> map) {
		return contractDao.getDataList(map);
	}

	@Override
	public List<MainDO> getFinanceDataList(Map<String, Object> map) {
		return contractDao.getFinanceDataList(map);
	}

	@Override
	public List<ContractDO> list(Map<String, Object> map) {
		return contractDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return contractDao.count(map);
	}

	@Override
	public int save(ContractDO contract) {

		int ret = contractDao.save(contract);

		String contractId = contract.getContractId();
		// 流程标题，每个业务根据自己特点，体现主要信息
		String title = "";
		title = contract.getContractId() + "-" + contract.getContractName();
		// 添加保存时发起审批流程
		String PROCESS_INSTANCE_ID = actTaskService.startProcess(ActivitiConstant.ACTIVIYI_CONTRACT[0],
				ActivitiConstant.ACTIVIYI_CONTRACT[1], contractId, title, new HashMap<String, Object>());
		// 更新流程实例ID到业务表
		contract.setProcessInstanceId(PROCESS_INSTANCE_ID);
		contractDao.update(contract);

		return Integer.parseInt(contractId);
	}

	/**
	 * ******************* 审批流程相关 *************************
	 */
	// 审批处理保存
	@Override
	public int formUpdate(ContractDO contract) {
		// 流程审批处理
		Map<String, Object> vars = new HashMap<>(16);
		vars.put("taskAction", contract.getTaskAction());
		actTaskService.complete(contract.getTaskId(), contract.getProcessInstanceId(), contract.getTaskComment(), "",
				vars);
		// 判断流程是否结束
		if (actTaskService.isProcessInstanceFinish(contract.getProcessInstanceId())) {
			contract.setContractApprovalStatus("1");
			contract.setContractApprovalTime(new Date());
		} else {
			contract.setContractApprovalStatus("2");
		}

		return contractDao.update(contract);
	}

	@Override
	public int update(ContractDO contract) {
		return contractDao.update(contract);
	}

	@Override
	public int remove(String contractId) {
		return contractDao.remove(contractId);
	}

	@Override
	public int batchRemove(String[] contractIds) {
		return contractDao.batchRemove(contractIds);
	}

	@Override
	public List<DictDO> listDic() {
		return contractDao.listDic();
	}

	/**
	 * 数据导入功能
	 */
	@Override
	public Map<String, Object> dataImport(File file, long userid) {
		Workbook wookbook = null;
		List<String> errorMsgs = null;
		Map<String, Object> result = null;
		int rtn = 0;
		try {
			result = new HashMap<String, Object>();
			errorMsgs = new ArrayList<String>();
			FileInputStream is = new FileInputStream(file); // 文件流
			wookbook = WorkbookFactory.create(is); // 这种方式 Excel 2003/2007/2010 都是可以处理的
			// 在Excel文档中，第一张工作表的缺省索引是0
			// 其语句为：HSSFSheet sheet = wookbook.getSheetAt(0);
			Sheet sheet = wookbook.getSheetAt(0);// wookbook.getSheet("Sheet1");
			// 获取到Excel文件中的所有行数
			int rows = sheet.getPhysicalNumberOfRows();
			// Excel文件中的第一行（标题行）
			int cellCount = 0;
			// 遍历行
			my: for (int i = 0; i < rows; i++) {
				// 读取左上端单元格(跳过第一行标题行)
				Row row = sheet.getRow(i);
				ContractDO contractDO = new ContractDO(); // 合同表
				// 行不为空
				if (row != null) {
					if (i == 0) {
						// 获取到Excel文件中的第一行（标题行）
						Row rowCount = sheet.getRow(i);
						// 获取到Excel文件中的所有的列
						cellCount = rowCount.getPhysicalNumberOfCells();
						continue;
					}
					// 获取到Excel文件中的所有的列
					// int cells = row.getPhysicalNumberOfCells();
					String cellvalue = "";
					// String contact = "";
					// String agentCode = null;
					// String companyName = null;
					// 遍历列
					for (int j = 0; j < cellCount; j++) {
						cellvalue = ""; // 清空之前之前取到的列的值
						// 获取到列的值
						Cell cell = row.getCell(j);
						// String value = "";
						if (cell != null) {
							switch (cell.getCellType()) {
							case XSSFCell.CELL_TYPE_FORMULA:
								break;
							case XSSFCell.CELL_TYPE_NUMERIC: {
								short format = cell.getCellStyle().getDataFormat();
								if (format == 14 || format == 31 || format == 57 || format == 58) { // excel中的时间格式
									SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
									double value = cell.getNumericCellValue();
									Date date = DateUtil.getJavaDate(value);
									cellvalue = sdf.format(date);
								}
								// 判断当前的cell是否为Date
								else if (HSSFDateUtil.isCellDateFormatted(cell)) { // 先注释日期类型的转换，在实际测试中发现HSSFDateUtil.isCellDateFormatted(cell)只识别2014/02/02这种格式。
									// 如果是Date类型则，取得该Cell的Date值 // 对2014-02-02格式识别不出是日期格式
									Date date = cell.getDateCellValue();
									DateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
									cellvalue = formater.format(date);
								} else { // 如果是纯数字
									// 取得当前Cell的数值
									cellvalue = NumberToTextConverter.toText(cell.getNumericCellValue());
								}
								break;
							}
							case XSSFCell.CELL_TYPE_STRING:
								cellvalue = cell.getStringCellValue();
								break;
							default:
								break;
							}
						}
						if (j == 0) {
							contractDO.setCustomerId(cellvalue);
						} else if (j == 1) {
							contractDO.setBusinessId(cellvalue);
						} else if (j == 2) {
							contractDO.setContractName(cellvalue);
						} else if (j == 3) {
							contractDO.setContractApplicantName(cellvalue);
						} else if (j == 4) {
							contractDO.setContractBuildCompany(cellvalue);
						} else if (j == 5) {
							contractDO.setContractType(cellvalue);
						} else if (j == 6) {
							contractDO.setContractCategory(cellvalue);
						} else if (j == 7) {
							contractDO.setContractDept(cellvalue);
						} else if (j == 8) {
							contractDO.setContractApplicant(cellvalue);
						} else if (j == 9) {
							contractDO.setContractDraftPerson(cellvalue);
						} else if (j == 10) {
							contractDO.setContractSales(cellvalue);
						} else if (j == 11) {
							contractDO.setContractRelatedId(cellvalue);
						} else if (j == 12) {
							contractDO.setContractInvoiceType(cellvalue);
						} else if (j == 13) {
							contractDO.setContractInvoiceTime(cellvalue);
						} else if (j == 14) {
							System.out.println(cellvalue);
							contractDO.setContractTotalPrice(new BigDecimal(cellvalue));
						} else if (j == 15) {
							contractDO.setContractProjectManagement(cellvalue);
						} else if (j == 16) {
							contractDO.setContractRemarks(cellvalue);
						} else if (j == 17) {
							contractDO.setContractApprovalStatus(cellvalue);
						} else if (j == 18) {
							contractDO.setProjectId(cellvalue);
						} else if (j == 19) {
							contractDO.setContractCommitTime(cellvalue);
						}
					} // --->遍历列
					// contractDO.setContractId(cellvalue);
					contractDO.setContractOperator(Long.toString(userid));
					// contractDO.setContractOperateTime(new Date());
					rtn = contractDao.saveDownloadTemplate(contractDO);
				}
			}
		} catch (Exception e) {
			errorMsgs.add(e.getMessage());
			e.printStackTrace();
		} finally {
			wookbook.cloneSheet(0); // 关闭sheet页
			try {
				wookbook.close(); // 关闭Excel文件
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (CollectionUtils.isEmpty(errorMsgs)) { // errorMsgs.size() == 0

			if (rtn > 0) {
				result.put("result", "success");
			} else {
				result.put("result", "false");
			}
		} else {
			result.put("result", "error");
			result.put("msg", errorMsgs);
		}
		return result;
	}

	/**
	 * 导出Excel写入文件方法
	 */
	public void export(String[] titles, ServletOutputStream out, List<ContractDO> list) {
		try {
			// 第一步，创建一个workbook，对应一个Excel文件
			HSSFWorkbook workbook = new HSSFWorkbook();
			// 第二步，在webbook中添加一个sheet,对应Excel文件中的sheet
			HSSFSheet hssfSheet = workbook.createSheet("sheet1");
			// 第三步，在sheet中添加表头第0行,注意老版本poi对Excel的行数列数有限制short
			HSSFRow hssfRow = hssfSheet.createRow(0);
			// 第四步，创建单元格，并设置值表头 设置表头居中
			HSSFCellStyle hssfCellStyle = workbook.createCellStyle();
			// 居中样式
			hssfCellStyle.setAlignment(HSSFCellStyle.ALIGN_CENTER);
			HSSFCell hssfCell = null;
			for (int i = 0; i < titles.length; i++) {
				hssfCell = hssfRow.createCell(i);// 列索引从0开始
				hssfCell.setCellValue(titles[i]);// 列名1
				hssfCell.setCellStyle(hssfCellStyle);// 列居中显示
			}
			// 第五步，写入实体数据
			if (list != null && !list.isEmpty()) {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
				for (int i = 0; i < list.size(); i++) {
					hssfRow = hssfSheet.createRow(i + 1);
					ContractDO report = list.get(i);
					/** 第六步，创建单元格，并设置值 **/
					// 序号
					hssfRow.createCell(0).setCellValue(i + 1);
					// 合同编号
					String contractId = "";
					if (report.getContractId() != null) {
						String getContractId = report.getContractId();
						contractId = sdf.format(getContractId);
					}
					hssfRow.createCell(0).setCellValue(contractId);
					// 企业客户编号
					String CustomerId = "";
					if (report.getCustomerId() != null) {
						CustomerId = report.getCustomerId();
					}
					hssfRow.createCell(1).setCellValue(CustomerId);
					// 业务编号
					String BusinessId = "";
					if (report.getBusinessId() != null) {
						BusinessId = report.getBusinessId();
					}
					hssfRow.createCell(2).setCellValue(BusinessId);
					// 合同名称
					String ContractName = "";
					if (report.getContractName() != null) {
						ContractName = report.getContractName();
					}
					hssfRow.createCell(3).setCellValue(ContractName);
					// 申请人姓名
					String ContractApplicantName = "";
					if (report.getContractApplicantName() != null) {
						ContractApplicantName = report.getContractApplicantName();
					}
					hssfRow.createCell(4).setCellValue(ContractApplicantName);
					// 建设单位
					String ContractBuildCompany = "";
					if (report.getContractBuildCompany() != null) {
						ContractBuildCompany = report.getContractBuildCompany();
					}
					hssfRow.createCell(5).setCellValue(ContractBuildCompany);
					// 合同类型
					String ContractType = "";
					if (report.getContractType() != null) {
						ContractType = report.getContractType();
					}
					hssfRow.createCell(7).setCellValue(ContractType);
					// 合同种类
					String ContractCategory = "";
					if (report.getContractCategory() != null) {
						ContractCategory = report.getContractCategory();
					}
					hssfRow.createCell(8).setCellValue(ContractCategory);
					// 合同总金额
					String ContractTotalPrice = "";
					if (report.getContractTotalPrice() != null) {
						BigDecimal getContractTotalPrice = report.getContractTotalPrice();
						ContractTotalPrice = sdf.format(getContractTotalPrice);
					}
					hssfRow.createCell(9).setCellValue(ContractTotalPrice);
					// 合同发起部门
					String ContractDept = "";
					if (report.getContractDept() != null) {
						ContractDept = report.getContractDept();
					}
					hssfRow.createCell(10).setCellValue(ContractDept);
					// 业务发起人
					String ContractApplicant = "";
					if (report.getContractApplicant() != null) {
						ContractApplicant = report.getContractApplicant();
					}
					hssfRow.createCell(11).setCellValue(ContractApplicant);
					// 合同拟定人
					String ContractDraftPerson = "";
					if (report.getContractDraftPerson() != null) {
						ContractDraftPerson = report.getContractDraftPerson();
					}
					hssfRow.createCell(12).setCellValue(ContractDraftPerson);
					// 销售负责人
					String ContractSales = "";
					if (report.getContractSales() != null) {
						ContractSales = report.getContractSales();
					}
					hssfRow.createCell(13).setCellValue(ContractSales);
					// 提交评审时间
					String ContractCommitTime = "";
					if (report.getContractCommitTime() != null) {
						String getContractCommitTime = report.getContractCommitTime();
						ContractCommitTime = sdf.format(getContractCommitTime);
					}
					hssfRow.createCell(14).setCellValue(ContractCommitTime);
					// 关联合同编号
					String ContractRelatedId = "";
					if (report.getContractRelatedId() != null) {
						ContractRelatedId = report.getContractRelatedId();
					}
					hssfRow.createCell(15).setCellValue(ContractRelatedId);
					// 发票类型
					String ContractInvoiceType = "";
					if (report.getContractInvoiceType() != null) {
						ContractInvoiceType = report.getContractInvoiceType();
					}
					hssfRow.createCell(16).setCellValue(ContractInvoiceType);
					// 预计开具发票时间
					String ContractInvoiceTime = "";
					if (report.getContractInvoiceTime() != null) {
						String getContractInvoiceTime1 = report.getContractInvoiceTime();
						ContractInvoiceTime = sdf.format(getContractInvoiceTime1);
					}
					hssfRow.createCell(17).setCellValue(ContractInvoiceTime);
					// 硬件设备明细表
					String getContractHardwareList = "";
					if (report.getContractHardwareList() != null) {
						getContractHardwareList = report.getContractHardwareList();
					}
					hssfRow.createCell(18).setCellValue(getContractHardwareList);
					// 软件功能列表
					String ContractSoftwareList = "";
					if (report.getContractSoftwareList() != null) {
						ContractSoftwareList = report.getContractSoftwareList();
					}
					hssfRow.createCell(19).setCellValue(ContractSoftwareList);
					// 项目经理
					String ContractProjectManagement = "";
					if (report.getContractProjectManagement() != null) {
						ContractProjectManagement = report.getContractProjectManagement();
					}
					hssfRow.createCell(20).setCellValue(ContractProjectManagement);
					// 合同信息备注
					String ContractRemarks = "";
					if (report.getContractRemarks() != null) {
						ContractRemarks = report.getContractRemarks();
					}
					hssfRow.createCell(21).setCellValue(ContractRemarks);
					// 审批状态
					String ContractApprovalStatus = "";
					if (report.getContractApprovalStatus() != null) {
						String getContractApprovalStatus = report.getContractApprovalStatus();
						ContractApprovalStatus = sdf.format(getContractApprovalStatus);
					}
					hssfRow.createCell(22).setCellValue(ContractApprovalStatus);
					// 操作人
					String ContractOperator = "";
					if (report.getContractOperator() != null) {
						ContractOperator = report.getContractOperator();
					}
					hssfRow.createCell(23).setCellValue(ContractOperator);
					// 操作时间
					String getContractOperateTime = "";
					if (report.getContractOperateTime() != null) {
						Date getContractOperateTime1 = report.getContractOperateTime();
						getContractOperateTime = sdf.format(getContractOperateTime1);
					}
					hssfRow.createCell(24).setCellValue(getContractOperateTime);
					// 项目编号
					String ProjectId = "";
					if (report.getProjectId() != null) {
						ProjectId = report.getProjectId();
					}
					hssfRow.createCell(25).setCellValue(ProjectId);
				}
			}
			// 第七步，将文件输出到客户端浏览器
			try {
				workbook.write(out);
				out.flush();
				out.close();

			} catch (Exception e) {
				e.printStackTrace();
			}
		} catch (Exception e) {
			e.printStackTrace();
			try {
				throw new Exception("日报信息导出失败！");
			} catch (Exception e1) {
				e1.printStackTrace();
			}
		}
	}

	/**
	 * 导出excel
	 */
	public List<ContractDO> getQuery(Map<String, Object> params) {
		List<ContractDO> returnData = contractDao.list(params);
		return returnData;
	}

	@Override
	public int updateContractAttachment(ContractDO contract) {
		// TODO Auto-generated method stub
		return contractDao.updateContractAttachment(contract);
	}

	@Override
	public int saveDownloadTemplate(ContractDO contract) {
		// TODO Auto-generated method stub
		return contractDao.saveDownloadTemplate(contract);
	}

	@Override
	public Map<String, Object> hardwareDetail(File file, long userid) {
		Workbook wookbook = null;
		List<String> errorMsgs = null;
		Map<String, Object> result = null;
		int rtn = 0;
		try {
			result = new HashMap<String, Object>();
			errorMsgs = new ArrayList<String>();
			FileInputStream is = new FileInputStream(file); // 文件流
			wookbook = WorkbookFactory.create(is); // 这种方式 Excel 2003/2007/2010 都是可以处理的
			// 在Excel文档中，第一张工作表的缺省索引是0
			// 其语句为：HSSFSheet sheet = wookbook.getSheetAt(0);
			Sheet sheet = wookbook.getSheetAt(0);// wookbook.getSheet("Sheet1");
			// 获取到Excel文件中的所有行数
			int rows = sheet.getPhysicalNumberOfRows();
			// Excel文件中的第一行（标题行）
			int cellCount = 0;
			// 遍历行
			my: for (int i = 0; i < rows; i++) {
				// 读取左上端单元格(跳过第一行标题行)
				Row row = sheet.getRow(i);
				ContractHardwareDetailDO contractHardwareDetailDO = new ContractHardwareDetailDO(); // 合同表
				ContractDO contractDO = new ContractDO();
				// 行不为空
				if (row != null) {
					if (i == 0) {
						// 获取到Excel文件中的第一行（标题行）
						Row rowCount = sheet.getRow(i);
						// 获取到Excel文件中的所有的列
						cellCount = rowCount.getPhysicalNumberOfCells();
						continue;
					}
					// 获取到Excel文件中的所有的列
					// int cells = row.getPhysicalNumberOfCells();
					String cellvalue = "";
					// String contact = "";
					// String agentCode = null;
					// String companyName = null;
					// 遍历列
					for (int j = 0; j < cellCount; j++) {
						cellvalue = ""; // 清空之前之前取到的列的值
						// 获取到列的值
						Cell cell = row.getCell(j);
						// String value = "";
						if (cell != null) {
							switch (cell.getCellType()) {
							case XSSFCell.CELL_TYPE_FORMULA:
								break;
							case XSSFCell.CELL_TYPE_NUMERIC: {
								short format = cell.getCellStyle().getDataFormat();
								if (format == 14 || format == 31 || format == 57 || format == 58) { // excel中的时间格式
									SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
									double value = cell.getNumericCellValue();
									Date date = DateUtil.getJavaDate(value);
									cellvalue = sdf.format(date);
								}
								// 判断当前的cell是否为Date
								else if (HSSFDateUtil.isCellDateFormatted(cell)) { // 先注释日期类型的转换，在实际测试中发现HSSFDateUtil.isCellDateFormatted(cell)只识别2014/02/02这种格式。
									// 如果是Date类型则，取得该Cell的Date值 // 对2014-02-02格式识别不出是日期格式
									Date date = cell.getDateCellValue();
									DateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
									cellvalue = formater.format(date);
								} else { // 如果是纯数字
									// 取得当前Cell的数值
									cellvalue = NumberToTextConverter.toText(cell.getNumericCellValue());
								}
								break;
							}
							case XSSFCell.CELL_TYPE_STRING:
								cellvalue = cell.getStringCellValue();
								break;
							default:
								break;
							}
						}
						if (j == 0) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractHardwareDetailDO.setHardwareDetailName(cellvalue);
							}
							
						} else if (j == 1) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {

							}
							contractHardwareDetailDO.setHardwareDetailBrand(cellvalue);
						} else if (j == 2) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractHardwareDetailDO.setHardwareDetailSpecification(cellvalue);
							}
							
						} else if (j == 3) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractHardwareDetailDO.setHardwareDetailUnit(cellvalue);
							}
							
						} else if (j == 4) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractHardwareDetailDO.setHardwareDetailNumber(cellvalue);
							}
							
						} else if (j == 5) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractHardwareDetailDO.setHardwareDetailUnitPrice(new BigDecimal(cellvalue));
							}
							
						} else if (j == 6) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractHardwareDetailDO.setHardwareDetailTotalPrice(new BigDecimal(cellvalue));
							}
							
						}
					} // --->遍历列
//					String contractId = request.getParameter("contractId");
//					contractHardwareDetailDO.setContractId(contractId);
					contractHardwareDetailDO.setHardwareDetailOperator(Long.toString(userid));
					rtn = contractDao.saveContractHardwareDetail(contractHardwareDetailDO);
					//得到硬件明细表的id
					
					Long hardwareDetailId =contractHardwareDetailDO.getHardwareDetailId();
					result.put("hardwareDetailId", hardwareDetailId);
				}
			}
		} catch (Exception e) {
			errorMsgs.add(e.getMessage());
			e.printStackTrace();
		} finally {
			wookbook.cloneSheet(0); // 关闭sheet页
			try {
				wookbook.close(); // 关闭Excel文件
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (CollectionUtils.isEmpty(errorMsgs)) { // errorMsgs.size() == 0

			if (rtn > 0) {
				result.put("result", "success");
			} else {
				result.put("result", "false");
			}
		} else {
			result.put("result", "error");
			result.put("msg", errorMsgs);
		}
		return result;
	}

	@Override
	public int saveContractSoftwareDetail(ContractSoftwareDetailDo contractSoftwareDetail) {
		// TODO Auto-generated method stub
		return contractDao.saveContractSoftwareDetail(contractSoftwareDetail);
	}

	@Override
	public int saveContractHardwareDetail(ContractHardwareDetailDO contractHardwareDetail) {
		// TODO Auto-generated method stub
		return contractDao.saveContractHardwareDetail(contractHardwareDetail);
	}

	@Override
	public Map<String, Object> SoftwareDetail(File file, long userid) {
		Workbook wookbook = null;
		List<String> errorMsgs = null;
		Map<String, Object> result = null;
		int rtn = 0;
		try {
			result = new HashMap<String, Object>();
			errorMsgs = new ArrayList<String>();
			FileInputStream is = new FileInputStream(file); // 文件流
			wookbook = WorkbookFactory.create(is); // 这种方式 Excel 2003/2007/2010 都是可以处理的
			// 在Excel文档中，第一张工作表的缺省索引是0
			// 其语句为：HSSFSheet sheet = wookbook.getSheetAt(0);
			Sheet sheet = wookbook.getSheetAt(0);// wookbook.getSheet("Sheet1");
			// 获取到Excel文件中的所有行数
			int rows = sheet.getPhysicalNumberOfRows();
			// Excel文件中的第一行（标题行）
			int cellCount = 0;
			// 遍历行
			my: for (int i = 0; i < rows; i++) {
				// 读取左上端单元格(跳过第一行标题行)
				Row row = sheet.getRow(i);
				ContractSoftwareDetailDo contractSoftwareDetailDo = new ContractSoftwareDetailDo(); // 合同表
				// 行不为空
				if (row != null) {
					if (i == 0) {
						// 获取到Excel文件中的第一行（标题行）
						Row rowCount = sheet.getRow(i);
						// 获取到Excel文件中的所有的列
						cellCount = rowCount.getPhysicalNumberOfCells();
						continue;
					}
					// 获取到Excel文件中的所有的列
					// int cells = row.getPhysicalNumberOfCells();
					String cellvalue = "";
					// String contact = "";
					// String agentCode = null;
					// String companyName = null;
					// 遍历列
					for (int j = 0; j < cellCount; j++) {
						cellvalue = ""; // 清空之前之前取到的列的值
						// 获取到列的值
						Cell cell = row.getCell(j);
						// String value = "";
						if (cell != null) {
							switch (cell.getCellType()) {
							case XSSFCell.CELL_TYPE_FORMULA:
								break;
							case XSSFCell.CELL_TYPE_NUMERIC: {
								short format = cell.getCellStyle().getDataFormat();
								if (format == 14 || format == 31 || format == 57 || format == 58) { // excel中的时间格式
									SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
									double value = cell.getNumericCellValue();
									Date date = DateUtil.getJavaDate(value);
									cellvalue = sdf.format(date);
								}
								// 判断当前的cell是否为Date
								else if (HSSFDateUtil.isCellDateFormatted(cell)) { // 先注释日期类型的转换，在实际测试中发现HSSFDateUtil.isCellDateFormatted(cell)只识别2014/02/02这种格式。
									// 如果是Date类型则，取得该Cell的Date值 // 对2014-02-02格式识别不出是日期格式
									Date date = cell.getDateCellValue();
									DateFormat formater = new SimpleDateFormat("yyyy-MM-dd");
									cellvalue = formater.format(date);
								} else { // 如果是纯数字
									// 取得当前Cell的数值
									cellvalue = NumberToTextConverter.toText(cell.getNumericCellValue());
								}
								break;
							}
							case XSSFCell.CELL_TYPE_STRING:
								cellvalue = cell.getStringCellValue();
								break;
							default:
								break;
							}
						}
						if (j == 0) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractSoftwareDetailDo.setSoftwareDetailSystem(cellvalue);
							}
						} else if (j == 1) {
							if (cellvalue == null || cellvalue == "") {
								continue;
							} else {
								contractSoftwareDetailDo.setSoftwareDetailModel(cellvalue);
							}
						}
					} // --->遍历列
//					String contractId = request.getParameter("contractId");
//					System.out.println(contractId);
//					 contractSoftwareDetailDo.setContractId(contractId);
					contractSoftwareDetailDo.setSoftwareDetailOperator(Long.toString(userid));
					rtn = contractDao.saveContractSoftwareDetail(contractSoftwareDetailDo);
					
					Long softwareDetailId =contractSoftwareDetailDo.getSoftwareDetailId();
					System.out.println(softwareDetailId);
					result.put("softwareDetailId", softwareDetailId);
				}
			}
		} catch (Exception e) {
			errorMsgs.add(e.getMessage());
			e.printStackTrace();
		} finally {
			wookbook.cloneSheet(0); // 关闭sheet页
			try {
				wookbook.close(); // 关闭Excel文件
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		if (CollectionUtils.isEmpty(errorMsgs)) { // errorMsgs.size() == 0

			if (rtn > 0) {
				result.put("result", "success");
			} else {
				result.put("result", "false");
			}
		} else {
			result.put("result", "error");
			result.put("msg", errorMsgs);
		}
		return result;
	}
}
