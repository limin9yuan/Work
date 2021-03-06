package com.bootdo.inner.service.impl;

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

import com.bootdo.common.domain.DictDO;
import com.bootdo.inner.dao.InnerOrgEmployeeDao;
import com.bootdo.inner.domain.InnerOrgEmployeeDO;
import com.bootdo.inner.service.InnerOrgEmployeeService;
import com.bootdo.sales.domain.RecordServiceDO;

@Service
public class InnerOrgEmployeeServiceImpl implements InnerOrgEmployeeService {
	@Autowired
	private InnerOrgEmployeeDao innerOrgEmployeeDao;
	@Override
	public String  getname(String employeeId) {
		InnerOrgEmployeeDO innername= innerOrgEmployeeDao.get(employeeId);
		String ret=innername.getEmployeeName();
		return ret;
	}
	@Override
	public InnerOrgEmployeeDO get(String employeeId) {
		return innerOrgEmployeeDao.get(employeeId);
	}

	@Override
	public List<InnerOrgEmployeeDO> list(Map<String, Object> map) {
		return innerOrgEmployeeDao.list(map);
	}

	@Override
	public int count(Map<String, Object> map) {
		return innerOrgEmployeeDao.count(map);
	}

	@Override
	public int save(InnerOrgEmployeeDO innerOrgEmployee) {
		innerOrgEmployeeDao.save(innerOrgEmployee);
		String employeeId = innerOrgEmployee.getEmployeeId();
		return Integer.parseInt(employeeId);
	}

	@Override
	public int update(InnerOrgEmployeeDO innerOrgEmployee) {
		return innerOrgEmployeeDao.update(innerOrgEmployee);
	}

	@Override
	public int remove(String employeeId) {
		return innerOrgEmployeeDao.remove(employeeId);
	}

	@Override
	public int batchRemove(String[] employeeIds) {
		return innerOrgEmployeeDao.batchRemove(employeeIds);
	}

	@Override
	public List<DictDO> listDic() {
		return innerOrgEmployeeDao.listDic();
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
				InnerOrgEmployeeDO innerOrgEmployeeDO = new InnerOrgEmployeeDO(); // 本表
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
					String contact = "";
					String agentCode = null;
					String companyName = null;
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
							innerOrgEmployeeDO.setDeptId(cellvalue);
						} else if (j == 1) {
							innerOrgEmployeeDO.setJobId(cellvalue);
						} else if (j == 2) {
							innerOrgEmployeeDO.setInnerUserId(cellvalue);
						} else if (j == 3) {
							innerOrgEmployeeDO.setUserRoleId(cellvalue);
						} else if (j == 4) {
							innerOrgEmployeeDO.setModuleId(cellvalue);
						} else if (j == 5) {
							innerOrgEmployeeDO.setEmployeeName(cellvalue);
						} else if (j == 6) {
							innerOrgEmployeeDO.setEmployeeDept(cellvalue);
						} else if (j == 7) {
							innerOrgEmployeeDO.setEmployeeCenter(cellvalue);
						} else if (j == 8) {
							innerOrgEmployeeDO.setEmployeeJoinDate(String.valueOf(new Date()));
						} else if (j == 9) {
							innerOrgEmployeeDO.setEmployeeSalaryHour(new BigDecimal(cellvalue));
						} else if (j == 10) {
							innerOrgEmployeeDO.setEmployeeStatus(Integer.valueOf(cellvalue));
						} else if (j == 11) {
							innerOrgEmployeeDO.setEmployeePhoneNumber(cellvalue);
						} else if (j == 12) {
							innerOrgEmployeeDO.setEmployeeInnerPhoneNumber(cellvalue);
						} else if (j == 13) {
							innerOrgEmployeeDO.setEmployeeQq(cellvalue);
						} else if (j == 14) {
							innerOrgEmployeeDO.setEmployeeRemarks(cellvalue);
						} else if (j == 15) {
							innerOrgEmployeeDO.setEmployeeOperatorName(cellvalue);
						}
					} // --->遍历列
					innerOrgEmployeeDO.setEmployeeId(String.valueOf(i));
					innerOrgEmployeeDO.setEmployeeOperateTime(new Date());
					rtn = innerOrgEmployeeDao.save(innerOrgEmployeeDO);
				}
			}
		} catch (Exception e) {
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
	public void export(String[] titles, ServletOutputStream out, List<InnerOrgEmployeeDO> list) {
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
					InnerOrgEmployeeDO report = list.get(i);
					/** 第六步，创建单元格，并设置值 **/
					// 序号
					hssfRow.createCell(0).setCellValue(i + 1);
					// 员工工号
					String EmployeeId = "";
					if (report.getEmployeeId() != null) {
						EmployeeId = report.getEmployeeId();
					}
					hssfRow.createCell(0).setCellValue(EmployeeId);
					// 部门编号
					String DeptId = "";
					if (report.getDeptId() != null) {
						DeptId = report.getDeptId();
					}
					hssfRow.createCell(1).setCellValue(DeptId);
					// 岗位编号
					String JobId = "";
					if (report.getJobId() != null) {
						JobId = report.getJobId();
					}
					hssfRow.createCell(2).setCellValue(JobId);
					// 内部账号ID
					String InnerUserId = "";
					if (report.getInnerUserId() != null) {
						InnerUserId = report.getInnerUserId();
					}
					hssfRow.createCell(3).setCellValue(InnerUserId);
					// 用户角色Nmae
					String userRoleName = "";
					if (report.getUserRoleName() != null) {
						userRoleName = report.getUserRoleName();
					}
					hssfRow.createCell(4).setCellValue(userRoleName);
					// 模块ID
					String ModuleId = "";
					if (report.getModuleId() != null) {
						ModuleId = report.getModuleId();
					}
					hssfRow.createCell(5).setCellValue(ModuleId);
					// 员工姓名
					String EmployeeName = "";
					if (report.getEmployeeName() != null) {
						EmployeeName = report.getEmployeeName();
					}
					hssfRow.createCell(6).setCellValue(EmployeeName);
					// 部门
					String EmployeeDept = "";
					if (report.getEmployeeDept() != null) {
						EmployeeDept = report.getEmployeeDept();
					}
					hssfRow.createCell(7).setCellValue(EmployeeDept);
					// 所属中心
					String EmployeeCenter = "";
					if (report.getEmployeeCenter() != null) {
						EmployeeCenter = report.getEmployeeCenter();
					}
					hssfRow.createCell(8).setCellValue(EmployeeCenter);
					// 入职时间
					String EmployeeJoinDate = "";
					if (report.getEmployeeJoinDate() != null) {
						EmployeeJoinDate = sdf.format(report.getEmployeeJoinDate());
					}
					hssfRow.createCell(9).setCellValue(EmployeeJoinDate);
					// 时薪
					String EmployeeSalaryHour = "";
					if (report.getEmployeeSalaryHour() != null) {
						BigDecimal EmployeeSalaryHour1 = report.getEmployeeSalaryHour();
						EmployeeSalaryHour = String.valueOf(EmployeeSalaryHour1);
					}
					hssfRow.createCell(10).setCellValue(EmployeeSalaryHour);
					// 员工状态
					String EmployeeStatus = "";
					if (report.getEmployeeStatus() != null) {
						Integer EmployeeStatus1 = report.getEmployeeStatus();
						EmployeeStatus = String.valueOf(EmployeeStatus1);
					}
					hssfRow.createCell(11).setCellValue(EmployeeStatus);
					// 电话
					String EmployeePhoneNumber = "";
					if (report.getEmployeePhoneNumber() != null) {
						EmployeePhoneNumber = String.valueOf(report.getEmployeePhoneNumber());
					}
					hssfRow.createCell(12).setCellValue(EmployeePhoneNumber);
					// 电话小号
					String EmployeeInnerPhoneNumber = "";
					if (report.getEmployeeInnerPhoneNumber() != null) {
						EmployeeInnerPhoneNumber = String.valueOf(report.getEmployeeInnerPhoneNumber());
					}
					hssfRow.createCell(13).setCellValue(EmployeeInnerPhoneNumber);
					// QQ
					String EmployeeQq = "";
					if (report.getEmployeeQq() != null) {
						EmployeeQq = String.valueOf(report.getEmployeeQq());
					}
					hssfRow.createCell(14).setCellValue(EmployeeQq);
					// 备注
					String EmployeeRemarks = "";
					if (report.getEmployeeRemarks() != null) {
						EmployeeRemarks = report.getEmployeeRemarks();
					}
					hssfRow.createCell(15).setCellValue(EmployeeRemarks);
					// 操作人姓名
					String EmployeeOperatorName = "";
					if (report.getEmployeeOperatorName() != null) {
						EmployeeOperatorName = report.getEmployeeOperatorName();
					}
					hssfRow.createCell(16).setCellValue(EmployeeOperatorName);
					// 操作时间
					String getEmployeeOperateTime = "";
					if (report.getEmployeeOperateTime() != null) {
						getEmployeeOperateTime = sdf.format(report.getEmployeeOperateTime());
					}
					hssfRow.createCell(17).setCellValue(getEmployeeOperateTime);
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
	public List<InnerOrgEmployeeDO> getQuery(Map<String, Object> params) {
		List<InnerOrgEmployeeDO> returnData=innerOrgEmployeeDao.list(params);
		return returnData;
	}
}
