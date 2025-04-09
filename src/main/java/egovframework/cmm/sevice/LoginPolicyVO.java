
package egovframework.cmm.sevice;

import java.util.List;

public class LoginPolicyVO extends LoginPolicy {

	private static final long serialVersionUID = 1L;

	List<LoginPolicyVO> loginPolicyList;

	String [] delYn;
	

	public List<LoginPolicyVO> getLoginPolicyList() {
		return loginPolicyList;
	}

	public void setLoginPolicyList(List<LoginPolicyVO> loginPolicyList) {
		this.loginPolicyList = loginPolicyList;
	}

	public String[] getDelYn() {
		return delYn;
	}

	public void setDelYn(String[] delYn) {
		this.delYn = delYn;
	}
	
	
}
