package egovframework.seoul.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class MainController {

    @RequestMapping(value="/Main.do")
    public String mainPage () throws Exception {
        System.out.println("====== MAIN ======");
        return "Main_v2";
    }

}
