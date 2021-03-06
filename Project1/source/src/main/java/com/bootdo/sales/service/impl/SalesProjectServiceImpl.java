package com.bootdo.sales.service.impl;

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
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;
import org.springframework.web.multipart.MultipartFile;

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

import com.bootdo.common.dao.DictDao;
import com.bootdo.common.domain.DictDO;
import com.bootdo.common.utils.DateUtils;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.inner.domain.InnerOrgEmployeeDO;
import com.bootdo.oa.domain.NotifyDO;
import com.bootdo.oa.domain.NotifyDTO;
import com.bootdo.oa.domain.NotifyRecordDO;
import com.bootdo.sales.dao.SalesProjectDao;
import com.bootdo.sales.domain.RecordServiceDO;
import com.bootdo.sales.domain.SalesProjectDO;
import com.bootdo.sales.domain.SalesProjectDTO;
import com.bootdo.sales.service.SalesProjectService;
import com.bootdo.system.dao.UserDao;



@Service
public class SalesProjectServiceImpl implements SalesProjectService {
	@Autowired
	private SalesProjectDao salesProjectDao;
	@Autowired
	private UserDao userDao;
	@Autowired
	private SalesProjectService salesProjectService;
	@Autowired
	private DictDao dictDao;

	@Override
	public int countAllProject(Map<String, Object> map){
		return salesProjectDao.countAllProject(map);
	}

	@Override
	public List<SalesProjectDO> listAllProject(Map<String, Object> map){
		return salesProjectDao.listAllProject(map);
	}
	
	@Override
	public SalesProjectDO get(String projectId){
		return salesProjectDao.get(projectId);
	}

	@Override
	public String getProjectId(SalesProjectDO salesProject){
		return salesProjectDao.getProjectId(salesProject);
	}
	
	@Override
	public List<SalesProjectDO> list(Map<String, Object> map){
		return salesProjectDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return salesProjectDao.count(map);
	}
	@Transactional(rollbackFor = Exception.class)
	@Override
	public int save(SalesProjectDO salesProject){

		return salesProjectDao.save(salesProject);
	}
	
	@Override
	public int update(SalesProjectDO salesProject){
		return salesProjectDao.update(salesProject);
	}
	
	@Override
	public int remove(String projectId){
		return salesProjectDao.remove(projectId);
	}
	
	@Override
	public int batchRemove(String[] projectIds){
		return salesProjectDao.batchRemove(projectIds);
	}
	
	@Override
	public PageUtils selfList(Map<String, Object> map) {
		List<SalesProjectDTO> rows = salesProjectDao.listDTO(map); 
		for (SalesProjectDTO salesProjectDTO : rows) {
			salesProjectDTO.setBefore(DateUtils.getTimeBefore(salesProjectDTO.getProjectCreateTime()));
			salesProjectDTO.setSender(userDao.get(salesProjectDTO.getProjectCreator()).getName());
		}
		PageUtils page = new PageUtils(rows, salesProjectDao.countDTO(map));
		return page;
	}
	@Override
	public List<DictDO> listAllDic() {
		return salesProjectDao.listAllDic();
	}
	
	
	@Override
	public List<DictDO> listDic() {
		return salesProjectDao.listDic();
	}

	/**
	 * 数据导入功能
	 */
	@Override
	public Map<String, Object> uploadExcel(File file, long userid) {
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
				SalesProjectDO salesProjectDO = new SalesProjectDO(); // 售前项目信息表

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
					//String agentCode = null;
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
//						if (j == 0) {
//							salesProjectDO.setProjectId(cellvalue);
//						} else 
							if (j == 0) {
							salesProjectDO.setProjectBusiness(cellvalue);
						}else if (j == 1) {
							salesProjectDO.setCustomerId(cellvalue);
						}else if (j == 2) {
							salesProjectDO.setProjectName(cellvalue);
						}else if (j == 3) {
							salesProjectDO.setProjectSales(cellvalue);
						}else if (j == 4) {
							salesProjectDO.setProjectBeginDate(cellvalue);
						}else if (j == 5) {
							salesProjectDO.setProjectEndDate(cellvalue);
						}else if (j == 6) {
							salesProjectDO.setProjectManager(cellvalue);
						}else if (j == 7) {
							salesProjectDO.setProjectGategory(cellvalue);
						}else if (j == 8) {
							salesProjectDO.setProjectPhase(cellvalue);
						}else if (j == 9) {
							salesProjectDO.setProjectDescription(cellvalue);
						}else if (j == 10) {
							salesProjectDO.setProjectOldId(cellvalue);
						}else if (j == 11) {
							salesProjectDO.setProjectRemarks(cellvalue);
						}
					} // --->遍历列
					String businessIds = salesProjectService.getProjectId(salesProjectDO);
					salesProjectDO.setProjectId(businessIds);
					salesProjectDO.setProjectCreator(userid); 
					salesProjectDO.setProjectOperator(Long.toString(userid)); 
					salesProjectDO.setProjectCreateTime(new Date());
					salesProjectDO.setProjectOperateTime(new Date());
					salesProjectDO.setprojectBusinesName(salesProjectDO.getProjectBusiness());
					salesProjectDO.setProjectSalesName(salesProjectDO.getProjectSales());
					salesProjectDO.setProjectManagerName(salesProjectDO.getProjectManager());
					rtn = salesProjectDao.saveTemplate(salesProjectDO);
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
	public void export(String[] titles, ServletOutputStream out, List<SalesProjectDO> list) {
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
					SalesProjectDO report = list.get(i);
					/** 第六步，创建单元格，并设置值 **/
					// 序号
					//hssfRow.createCell(0).setCellValue(i + 1);
					// 售前项目编号
					String projectId = "";
					if (report.getProjectId() != null) {
						projectId = report.getProjectId();
					}
					hssfRow.createCell(0).setCellValue(projectId);
					// 企业客户编号
					String customerId = "";
					if (report.getCustomerId() != null) {
						customerId = report.getCustomerId();
					}
					hssfRow.createCell(1).setCellValue(customerId);
					// 项目名称
					String projectName = "";
					if (report.getProjectName() != null) {
						projectName = report.getProjectName();
					}
					hssfRow.createCell(2).setCellValue(projectName);
					// 销售负责人
					String projectSalesName = "";
					if (report.getProjectSalesName() != null) {
						projectSalesName = report.getProjectSalesName();
					}
					hssfRow.createCell(3).setCellValue(projectSalesName);
					// 项目开始时间
					String projectBeginDate = "";
					if (report.getProjectBeginDate() != null) {
						//projectBeginDate = sdf.format(report.getProjectBeginDate());
						projectBeginDate = report.getProjectBeginDate();
					}
					hssfRow.createCell(4).setCellValue(projectBeginDate);
					// 项目结束时间
					String projectEndDate = "";
					if (report.getProjectEndDate() != null) {
						//projectEndDate = sdf.format(report.getProjectEndDate());
						projectEndDate = report.getProjectEndDate();
					}
					hssfRow.createCell(5).setCellValue(projectEndDate);
					// 售前经理
					String projectManagerName = "";
					if (report.getProjectManagerName() != null) {
						projectManagerName = report.getProjectManagerName();
					}
					hssfRow.createCell(6).setCellValue(projectManagerName);
					// 项目类型
					String projectGategory = "";
					if (report.getProjectGategory() != null) {
						projectGategory = report.getProjectGategory();
					}
					hssfRow.createCell(7).setCellValue(projectGategory);
					// 项目阶段
					String projectPhase = "";
					if (report.getProjectPhase() != null) {
						projectPhase = report.getProjectPhase();
					}
					hssfRow.createCell(8).setCellValue(projectPhase);
					// 项目描述
					String projectDescription = "";
					if (report.getProjectDescription() != null) {
						projectDescription = report.getProjectDescription();
					}
					hssfRow.createCell(9).setCellValue(projectDescription);
					// 旧项目编号
					String projectOldId = "";
					if (report.getProjectOldId() != null) {
						projectOldId = report.getProjectOldId();
					}
					hssfRow.createCell(10).setCellValue(projectOldId);
					// 备注
					String projectRemarks = "";
					if (report.getProjectRemarks() != null) {
						projectRemarks = report.getProjectRemarks();
					}
					hssfRow.createCell(11).setCellValue(projectRemarks);
					// 操作人
					String Project_Operator_Name = "";
					if (report.getProjectOperatorName() != null) {
						Project_Operator_Name = report.getProjectOperatorName();
					}
					hssfRow.createCell(12).setCellValue(Project_Operator_Name);
					// 操作时间
					String projectOperateTime = "";
					if (report.getProjectOperateTime() != null) {
						projectOperateTime = sdf.format(report.getProjectOperateTime());
					}
					hssfRow.createCell(13).setCellValue(projectOperateTime);
					// 创建人
					String projectCreatorName = "";
					if (report.getProjectCreatorName() != null) {
						projectCreatorName = report.getProjectCreatorName();
					}
					hssfRow.createCell(14).setCellValue(projectCreatorName);
					// 创建时间
					String projectCreateTime = "";
					if (report.getProjectCreateTime() != null) {
						projectCreateTime = sdf.format(report.getProjectCreateTime());
					}
					hssfRow.createCell(15).setCellValue(projectCreateTime);					
					// 业务编号
					String projectBusiness = "";
					if (report.getProjectBusiness() != null) {
						projectBusiness = report.getProjectBusiness();
					}
					hssfRow.createCell(16).setCellValue(projectBusiness);
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
	public List<SalesProjectDO> getQuery(Map<String, Object> params) {
		List<SalesProjectDO> returnData=salesProjectDao.list(params);
		return returnData;
		
		/*for (int i = 0; i < returnDate.size(); i++) {
		}*/
	}

	@Override
	public int saveTemplate(SalesProjectDO salesProject) {
		// TODO Auto-generated method stub
		return salesProjectDao.saveTemplate(salesProject);
	}
}
