package egovframework.seoul.mapper;

import egovframework.rte.psl.dataaccess.mapper.Mapper;

import java.util.Map;

@Mapper("DemoMapper")
public interface DemoMapper {

    String getShelterInfo(Map<String, Object> params);

    String getSdGeomData();
}
