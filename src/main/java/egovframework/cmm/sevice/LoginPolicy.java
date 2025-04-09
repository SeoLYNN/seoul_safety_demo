package egovframework.cmm.sevice;

import java.io.Serializable;

public class LoginPolicy implements Serializable {

    private static final long serialVersionUID = 1L;

    private int userNo;
    private String pwd;
    private String name;
    private String userId;
    private String email;
    private String auth;
    private String joinDt;
    private String userIp;
    private String nowIp;
    private String lockAt;
    private String lockLastPnttm;
    private String errNotm;

    public String getErrNotm() {
        return errNotm;
    }

    public void setErrNotm(String errNotm) {
        this.errNotm = errNotm;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuth() {
        return auth;
    }

    public void setAuth(String auth) {
        this.auth = auth;
    }

    public String getJoinDt() {
        return joinDt;
    }

    public void setJoinDt(String joinDt) {
        this.joinDt = joinDt;
    }

    public String getUserIp() {
        return userIp;
    }

    public void setUserIp(String userIp) {
        this.userIp = userIp;
    }

    public String getNowIp() {
        return nowIp;
    }

    public void setNowIp(String nowIp) {
        this.nowIp = nowIp;
    }

    public String getLockAt() {
        return lockAt;
    }

    public void setLockAt(String lockAt) {
        this.lockAt = lockAt;
    }

    public String getLockLastPnttm() {
        return lockLastPnttm;
    }

    public void setLockLastPnttm(String lockLastPnttm) {
        this.lockLastPnttm = lockLastPnttm;
    }
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public int getUserNo() {
        return userNo;
    }

    public void setUserNo(int userNo) {
        this.userNo = userNo;
    }
}
