package com.dx.service.file.service.api;

import com.dx.client.model.contract.ContractHtmlBean;
import com.dx.service.file.config.FileFeignConfig;
import com.dx.service.file.fallback.ContractFileServiceFallbackFactory;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.wxcl.amy.utils.common.ResultMsg;

import java.util.List;

/**
 * @Auther: DX01
 * @Date: 2018/9/4 10:13
 * @Description:
 */
@FeignClient(name="FILESERVICE.DX.COM",
        configuration = FileFeignConfig.class,
        fallbackFactory = ContractFileServiceFallbackFactory.class
)
public interface IContractFileService {
    //保存
    @RequestMapping("/file/contractFileService/save")
    @ResponseBody
    public ResultMsg save(@RequestBody ContractHtmlBean contractHtmlBean);

    //获取合同html
    //返回数据类型ContractHtmlBean
    @RequestMapping("/file/contractFileService/getHtml")
    @ResponseBody
    public ResultMsg getHtml(@RequestParam("contractId") String contractId);

    //获取合同附件
    //返回数据类型List<ContractEnclosureBean>
    @RequestMapping("/file/contractFileService/getEnclosures")
    @ResponseBody
    public ResultMsg getEnclosures(@RequestParam("contractId") String contractId);
}
