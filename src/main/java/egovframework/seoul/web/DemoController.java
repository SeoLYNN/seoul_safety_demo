package egovframework.seoul.web;

import egovframework.seoul.service.DemoService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.Map;

@Controller
public class DemoController {

    @Resource(name = "DemoService")
    DemoService demoService;

    @RequestMapping(value = "search.do")
    @ResponseBody
    public Map<String, Object> getShelterInfo(@RequestParam Map<String, Object> params) {
        System.out.println("====== SEARCH ======");

        System.out.println(params);
        System.out.println(params.get("lat"));
        System.out.println(params.get("lng"));

        Map<String, Object> result = new HashMap<>();
        result.put("result", demoService.getShelterInfo(params));

        return result;
    }

    @RequestMapping(value = "serchSdGeom.do")
    @ResponseBody
    public Map<String, Object> getSdGeomData() {
        System.out.println("====== serchSdGeom ======");

        Map<String, Object> result = new HashMap<>();
        result.put("result", demoService.getSdGeomData());

        return result;
    }

//    @RequestMapping(value = "search.do")
//    @ResponseBody
//    public Map<String, Object> PpltnMainTableList(@RequestParam Map<String, Object> param) {
//        return param;
//    }

}
