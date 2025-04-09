package egovframework.cmm.filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.List;

public class LoginCheckFilter implements Filter {

	private List<String> excludedUrls;

	@Override
	public void destroy() {
		System.out.println("LoginCheckFilter is destroyed!!");
	}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp, FilterChain chain) throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) req;
		HttpServletResponse response = (HttpServletResponse) resp;

		HttpSession session = request.getSession();

		Enumeration e = session.getAttributeNames();
		while(e.hasMoreElements()) {
			String name = e.nextElement().toString();
			String value = String.valueOf(session.getAttribute(name));
		}

		boolean isRedirect = false;
		String servletPath = request.getServletPath();
		System.out.println("Servlet Path = " + servletPath);
		if(excludedUrls.contains(servletPath)) {
			isRedirect = false;
		} else {
			isRedirect = true;
		}

		String resultCode = session.getAttribute("resultCode") == null ? "" : session.getAttribute("resultCode").toString();
		boolean sessionLogin = session.getAttribute("loginVO") == null ? false : true;
		String resultMessage = session.getAttribute("resultMessage") == null ? "로그인 정보가 없습니다.\\n로그인을 하시면 다양한 서비스를 이용하실 수 있습니다." : session.getAttribute("resultMessage").toString();

		boolean isErrorPage = session.getAttribute("isErrorPage") == null ? false : (Boolean)session.getAttribute("isErrorPage");

		String contextPath = request.getContextPath();
		if(isRedirect) {
			if(isErrorPage == true || !resultCode.equals("000000") || !sessionLogin) {
				response.setContentType("text/html; charset=UTF-8");
				PrintWriter out = response.getWriter();
				out.print("<script>alert('"+resultMessage+"'); location.href='" + contextPath + "/Main.do?url=" + servletPath.substring(1, servletPath.length()-3) +"';</script>");
			} else {
				chain.doFilter(req, resp);
			}
		} else {
			chain.doFilter(req, resp);
		}

	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
		String excludePattern = filterConfig.getInitParameter("excludedUrls");
		excludedUrls = Arrays.asList(excludePattern.split(","));
	}

}