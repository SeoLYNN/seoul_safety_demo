package egovframework.seoul.service.impl;

import egovframework.seoul.mapper.DemoMapper;
import egovframework.seoul.service.DemoService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Map;

@Service("DemoService")
public class DemoServiceImpl implements DemoService {

    @Resource(name = "DemoMapper")
    DemoMapper demoMapper;

    @Override
    public String getShelterInfo(Map<String, Object> params) {
        return demoMapper.getShelterInfo(params);
    }

    @Override
    public String getSdGeomData() {
        return demoMapper.getSdGeomData();
    }


}
