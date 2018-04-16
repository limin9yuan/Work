package com.bootdo.common.service.impl;

import com.bootdo.common.dao.MainCopyPersonDao;
import com.bootdo.common.domain.MainCopyPersonDO;
import com.bootdo.common.service.MainCopyPersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * Created by Mingyuan Li on 2018/4/13.
 * Package name: com.bootdo.common.service.impl.
 * Project name: bootdo.
 */
@Service
public class MainCopyPersonServiceImpl implements MainCopyPersonService {
    @Autowired
    private MainCopyPersonDao mainCopyPerson;

    @Override
    public List<MainCopyPersonDO> list(Map<String, Object> map) {
        return mainCopyPerson.list(map);
    }

    @Override
    public int save(MainCopyPersonDO mainCopyPerson) {
        return this.mainCopyPerson.save(mainCopyPerson);
    }

    @Override
    public int count(Map<String, Object> map) {
        return mainCopyPerson.count(map);
    }
}