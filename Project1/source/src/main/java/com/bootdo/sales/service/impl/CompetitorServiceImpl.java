package com.bootdo.sales.service.impl;

import org.apache.poi.hssf.usermodel.HSSFDateUtil;
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

import com.bootdo.common.domain.DictDO;
import com.bootdo.sales.dao.CompetitorDao;
import com.bootdo.sales.domain.CompetitorDO;
import com.bootdo.sales.service.CompetitorService;



@Service
public class CompetitorServiceImpl implements CompetitorService {
	@Autowired
	private CompetitorDao competitorDao;
	
	@Override
	public CompetitorDO get(String complaintId){
		return competitorDao.get(complaintId);
	}
	
	@Override
	public List<CompetitorDO> list(Map<String, Object> map){
		return competitorDao.list(map);
	}
	
	@Override
	public int count(Map<String, Object> map){
		return competitorDao.count(map);
	}
	
	@Override
	public int save(CompetitorDO competitor){
		return competitorDao.save(competitor);
	}
	
	@Override
	public int update(CompetitorDO competitor){
		return competitorDao.update(competitor);
	}
	
	@Override
	public int remove(String complaintId){
		return competitorDao.remove(complaintId);
	}
	
	@Override
	public int batchRemove(String[] complaintIds){
		return competitorDao.batchRemove(complaintIds);
	}

	@Override
	public List<DictDO> listDic() {
		return competitorDao.listDic();
	}

	@Override
	public List<DictDO> listDicxmbh() {
		return competitorDao.listDicxmbh();
	}
	/**
	 * 数据导入
	 */
	@Override
	public Map<String, Object> dataImport(File file, long userid) {
		Workbook wookbook=null;
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
				CompetitorDO competitorDO = new CompetitorDO(); // 工厂信息表

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
							competitorDO.setComplaintId(cellvalue);
						} else if (j == 1) {
							competitorDO.setCustomerId(cellvalue);
						} else if (j == 2) {
							competitorDO.setComplaintProjectType(cellvalue);
						} else if (j == 3) {
							competitorDO.setComplaintProductCategory(cellvalue);
						} else if (j == 4) {
							competitorDO.setComplaintProductName(cellvalue);
						} else if (j == 5) {
							competitorDO.setComplaintProductPrice(new BigDecimal(cellvalue));
						} else if (j == 6) {
							competitorDO.setComplaintProductDescription(cellvalue);
						} else if (j == 7) {
							competitorDO.setComplaintCompanyName(cellvalue);
						} else if (j == 8) {
							competitorDO.setComplaintAttachment(cellvalue);
						} else if (j == 9) {
							competitorDO.setComplaintRemarks(cellvalue);
						} 
					} // --->遍历列
					competitorDO.setComplaintId(String.valueOf(i));
					competitorDO.setComplaintOperator(Long.toString(userid));
					competitorDO.setComplaintCreateTime(new Date());
					rtn = competitorDao.save(competitorDO);
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
	
}