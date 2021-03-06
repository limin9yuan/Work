package com.bootdo.common.service;

import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.domain.MainDO;
import com.bootdo.contract.domain.ContractDO;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Mingyuan Li on 2018/4/13.
 * Package name: com.bootdo.common.service.
 * Project name: bootdo.
 */

public interface MainCopyPersonService {

    List<MainCopyPersonDO> list(Map<String, Object> map);

    int save(MainCopyPersonDO mainCopyPerson);

    int count(Map<String, Object> map);

    int updateMainAndCopyPerson(MainCopyPersonDO mainCopyPerson);

    int remove(Map<String, Object> map);

    List<MainCopyPersonDO> getMainAndCopyPerson(Map<String, Object> map);
}
