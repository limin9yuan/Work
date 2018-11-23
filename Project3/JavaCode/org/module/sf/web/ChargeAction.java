package org.module.sf.web;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.module.sys.util.idgenerator.IDHelper;
import org.eredlab.g4.ccl.datastructure.Dto;
import org.eredlab.g4.ccl.datastructure.impl.BaseDto;
import org.eredlab.g4.ccl.json.JsonHelper;
import org.eredlab.g4.ccl.util.G4Utils;
import org.eredlab.g4.ccl.util.GlobalConstants;
import org.eredlab.g4.rif.web.BaseAction;
import org.eredlab.g4.rif.web.CommonActionForm;
import org.module.sf.service.ChargeService;

public class ChargeAction extends BaseAction{
	private ChargeService chargeService = (ChargeService) super.getService("ChargeService");

	/**
	 * 查询批量应收数据
	 *
	 * @param
	 * @return
	 */
	public ActionForward queryMultiChargePlan(ActionMapping mapping, ActionForm form, HttpServletRequest request,
															HttpServletResponse response) throws Exception {

		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = new ArrayList();
		list = g4Reader.queryForPage("queryMultiChargePlan", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject("queryMultiChargePlanForPageCount", dto);
		super.setSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO", dto);
		String jsonString = encodeList2PageJson(list, countInteger, GlobalConstants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 汇总批量应收数据
	 *
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward sumMultiChargePlan(ActionMapping mapping, ActionForm form, HttpServletRequest request,
														 HttpServletResponse response) throws Exception {
		Dto dto = (BaseDto)super.getSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO");
		Dto sumDto = new BaseDto();
		sumDto = (BaseDto)g4Reader.queryForObject("sumMultiChargePlan", dto);
		sumDto.put("success", new Boolean(true));
		String jsonString = JsonHelper.encodeObject2Json(sumDto);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}

	/**
	 * 批量收费
	 *
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward multiCharge(ActionMapping mapping, ActionForm form, HttpServletRequest request,
												HttpServletResponse response) throws Exception {

		CommonActionForm cForm = (CommonActionForm) form;
		Dto inDto = cForm.getParamAsDto(request);
		inDto.put("start", 0);
		inDto.put("end", 100000);
//		inDto.put("p_item_code")
		List list = new ArrayList();
		list = g4Reader.queryForPage("queryMultiChargePlan", inDto);
		Dto outDto = new BaseDto();
		String uID = getSessionContainer(request).getUserInfo().getUserid();
		String cID = super.getSessionContainer(request).getUserInfo().getCustomId();
		for (int i = 0; i < list.size(); i++) {
			BaseDto baseDto = (BaseDto) list.get(i);
			BaseDto chargeDto = new BaseDto();
			chargeDto.put("operator", uID);
			chargeDto.put("cid", cID);
			chargeDto.put("b_id", IDHelper.getB_ID());
			chargeDto.put("p_id", baseDto.getAsString("p_id"));
			chargeDto.put("house_code", baseDto.getAsString("house_code"));
			chargeDto.put("address", baseDto.getAsString("address"));
			chargeDto.put("work_unit", baseDto.getAsString("work_unit"));
			chargeDto.put("telphone", baseDto.getAsString("telphone"));
			chargeDto.put("invoice_number", baseDto.getAsString("invoice_number"));
			chargeDto.put("invoice_code", baseDto.getAsString("invoice_code"));

			chargeDto.put("price", baseDto.getAsBigDecimal("price"));
			chargeDto.put("charge_area", baseDto.getAsBigDecimal("charge_area"));
			chargeDto.put("pay_mode", baseDto.getAsString("pay_mode"));
			chargeDto.put("payman", baseDto.getAsString("payman"));
			chargeDto.put("paydate", baseDto.getAsString("paydate"));
			chargeDto.put("real_charge", baseDto.getAsBigDecimal("not_money"));
			chargeDto.put("delzero", baseDto.getAsBigDecimal("delzero"));

			chargeDto.put("billman", baseDto.getAsString("billman"));
			chargeDto.put("billdate", baseDto.getAsString("billdate"));
			chargeDto.put("begin_prepay", baseDto.getAsBigDecimal("begin_prepay"));
			chargeDto.put("end_prepay", baseDto.getAsBigDecimal("end_prepay"));
			chargeDto.put("use_prepay", baseDto.getAsBigDecimal("use_prepay"));
			chargeDto.put("add_prepay", baseDto.getAsBigDecimal("add_prepay"));

			chargeDto.put("latefee_enddate", baseDto.getAsString("latefee_enddate"));
			chargeDto.put("latefee_realaccount", baseDto.getAsBigDecimal("latefee_realaccount"));
			chargeDto.put("latefee_charge", baseDto.getAsBigDecimal("not_money_latefee"));
			chargeDto.put("minus_reason", baseDto.getAsString("minus_reason"));
			chargeDto.put("remark", baseDto.getAsString("remark"));
			outDto = chargeService.charge(chargeDto);


		}
		outDto.put("success", new Boolean(true));
		outDto.put("msg", "收费成功！");
		write(JsonHelper.encodeObject2Json(outDto), response);
		return mapping.findForward(null);
	}

	/**
	 * 表格演示六页面初始化
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward chargeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		//super.removeSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO");
		return mapping.findForward("chargeView");
	}

	public ActionForward multiChargeInit(ActionMapping mapping, ActionForm form, HttpServletRequest request,
											  HttpServletResponse response) throws Exception {
		//super.removeSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO");
		return mapping.findForward("multiChargeView");
	}

	/**
	 * 查询应收数据
	 * 
	 * @param
	 * @return
	 */
	public ActionForward queryArrearsList(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List list = new ArrayList();
		list = g4Reader.queryForPage("queryArrearsList", dto);
		Integer countInteger = (Integer) g4Reader.queryForObject("queryArrearsListForPageCount", dto);
		super.setSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO", dto);
		String jsonString = encodeList2PageJson(list, countInteger, GlobalConstants.FORMAT_Date);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	
	/**
	 * 汇总应收数据
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward sumArrearsList(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		Dto dto = (BaseDto)super.getSessionAttribute(request, "GRIDACTION_QUERYBALANCEINFO_DTO");
		Dto sumDto = new BaseDto();
		sumDto = (BaseDto)g4Reader.queryForObject("sumArrearsList", dto);
		sumDto.put("success", new Boolean(true));
		String jsonString = JsonHelper.encodeObject2Json(sumDto);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	

	
	/**

	 * 加载房间信息
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadHouseInfo(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm cForm = (CommonActionForm) form;
		Dto inDto = cForm.getParamAsDto(request);
		Dto outDto = new BaseDto();
		Dto dto = (BaseDto) g4Reader.queryForObject("chargeHouseInfo", inDto);
		if (G4Utils.isEmpty(dto)) {
			outDto.put("msg", "没有查询到数据");
		} else {
			outDto.putAll(dto);
			outDto.put("msg", "ok");
		}
		write(JsonHelper.encodeDto2FormLoadJson(outDto, GlobalConstants.FORMAT_Date), response);
		return mapping.findForward(null);
	}
	/**
	 * 取得票据号
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadInvoiceCode(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm cForm = (CommonActionForm) form;

		Dto inDto = cForm.getParamAsDto(request);
		inDto.put("operator", getSessionContainer(request).getUserInfo().getUserid());
		inDto.put("cid", super.getSessionContainer(request).getUserInfo().getCustomId());
		Dto outDto = new BaseDto();
		Dto dto = (BaseDto) g4Reader.queryForObject("getInvoiceCode", inDto);
		if (!G4Utils.isEmpty(dto)) {
			outDto.putAll(dto);
		} 
		write(JsonHelper.encodeDto2FormLoadJson(outDto, GlobalConstants.FORMAT_Date), response);
		return mapping.findForward(null);
	}
	/**
	 * 收费
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward charge(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		Dto inDto = cForm.getParamAsDto(request);
		inDto.put("operator", getSessionContainer(request).getUserInfo().getUserid());
		inDto.put("cid", super.getSessionContainer(request).getUserInfo().getCustomId());			
		inDto.put("b_id", IDHelper.getB_ID());
	    Dto outDto = chargeService.charge(inDto);
	    outDto.put("success", new Boolean(true));
		outDto.put("msg", "收费成功！");
		write(JsonHelper.encodeObject2Json(outDto), response);
		return mapping.findForward(null);
	}
	/**
	 * 加载收费项目列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getItems(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("getItems", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 加载收费项目列表
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward getCashier(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto dto = aForm.getParamAsDto(request);
		List areaList = g4Reader.queryForList("getCashier", dto);
		String jsonString = JsonHelper.encodeObject2Json(areaList);
		super.write(jsonString, response);
		return mapping.findForward(null);
	}
	/**
	 * 查询收费
	 * 
	 * @param
	 * @return
	 */
	public ActionForward queryHouse(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		CommonActionForm aForm = (CommonActionForm) form;
		Dto inDto = aForm.getParamAsDto(request);
		List houseList = g4Reader.queryForPage("queryHouseForPage", inDto);
		Integer totalCount = (Integer) g4Reader.queryForObject("queryHouseForPageCount", inDto);
		String jsonStrList = JsonHelper.encodeList2PageJson(houseList, totalCount, null);
		write(jsonStrList, response);
		return mapping.findForward(null);
	}
	/**
	 * 取得票据号
	 * 
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward loadInvoiceCodeTest(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		CommonActionForm cForm = (CommonActionForm) form;

		Dto inDto = cForm.getParamAsDto(request);
		inDto.put("operator", getSessionContainer(request).getUserInfo().getUserid());
		inDto.put("cid", super.getSessionContainer(request).getUserInfo().getCustomId());
		Dto outDto = new BaseDto();
		Dto dto = (BaseDto) g4Reader.queryForObject("getInvoiceCodeTest", inDto);
		if (!G4Utils.isEmpty(dto)) {
			outDto.putAll(dto);
		} 
		write(JsonHelper.encodeDto2FormLoadJson(outDto, GlobalConstants.FORMAT_Date), response);
		return mapping.findForward(null);
	}

	/**
	 * 数字大写
	 *
	 * @param mapping
	 * @param form
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	public ActionForward capitalNumber(ActionMapping mapping, ActionForm form, HttpServletRequest request,
										 HttpServletResponse response) throws Exception {
		CommonActionForm cForm = (CommonActionForm) form;
		Dto inDto = cForm.getParamAsDto(request);
		String real_charge = inDto.getAsString("real_charge");
		String capitalNumber = new org.eredlab.g4.rif.util.CommonUtils().getNumberBig(real_charge);
		Dto outDto = new BaseDto();
		outDto.put("success", new Boolean(true));
		outDto.put("capitalNumber", capitalNumber);
		write(JsonHelper.encodeObject2Json(outDto), response);
		return mapping.findForward(null);
	}
}


