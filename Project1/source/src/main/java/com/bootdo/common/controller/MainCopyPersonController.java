package com.bootdo.common.controller;

import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.domain.MainDO;
import com.bootdo.common.service.MainCopyPersonService;
import com.bootdo.common.utils.PageUtils;
import com.bootdo.common.utils.Query;
import com.bootdo.common.utils.R;
import com.bootdo.contract.domain.ContractDO;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by Mingyuan Li on 2018/4/13.
 * Package name: com.bootdo.common.controller.
 * Project name: bootdo.
 */

@RequestMapping("/common/MainCopyPerson")
@Controller
public class MainCopyPersonController extends BaseController {

    @Autowired
    private MainCopyPersonService mainCopyPersonService;

    @ResponseBody
    @GetMapping("/list")
    public PageUtils list(@RequestParam Map<String, Object> params) {
        // 查询列表数据
        Query query = new Query(params);
        List<MainCopyPersonDO> taskScheduleJobList = mainCopyPersonService.list(query);
        int total = mainCopyPersonService.count(query);
        PageUtils pageUtils = new PageUtils(taskScheduleJobList, total);
        return pageUtils;
    }

    /**
     * 主送人和抄送人相关************************************************
     */
    @GetMapping("/mainPerson")
    String mainPerson(){
        return "common/mainCopyPerson/mainPerson";
    }

    @GetMapping("/copyPerson")
    String copyPerson(){
        return "common/mainCopyPerson/copyPerson";
    }


    /**
     * 保存
     */
    @ResponseBody
    @PostMapping("/save")
    public R save(MainCopyPersonDO mainCopyPerson) {
        mainCopyPerson.setOperator(getUserId());
        if (mainCopyPersonService.save(mainCopyPerson) > 0) {
            return R.ok();
        }
        return R.error();
    }
    /**
     * 修改
     */
    @ResponseBody
    @RequestMapping("/update")
    @RequiresPermissions("sales:companyCustomer:edit")
    public R updateMainAndCopyPerson(MainCopyPersonDO mainCopyPerson) {
        mainCopyPerson.setOperator(getUserId());
        mainCopyPersonService.updateMainAndCopyPerson(mainCopyPerson);
        return R.ok();
    }

    @RequestMapping("/getMainAndCopyPerson_ajax/{tId}/{tableName}")
    @ResponseBody
    Map<String, Object> getMainAndCopyPerson_ajax(@PathVariable("tId") String tId,@PathVariable("tableName") String tableName) {
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("offset",1);
        params.put("limit",2);
        params.put("tId", tId);
        params.put("tableName", tableName);
        Query queryGetMainAndCopyPerson = new Query(params);
        List<MainCopyPersonDO> getMainAndCopyPerson = mainCopyPersonService.getMainAndCopyPerson(queryGetMainAndCopyPerson);
        Map<String, Object> returnData = new HashMap<>();
        returnData.put("mainAndCopyPerson", getMainAndCopyPerson);
        return returnData;
    }
}
