package egovframework.cmm;

public class EgovLoginConfig {
    boolean lock = false;
    int lockCount = 0;

    public int getLockCount() { return lockCount; }
    public boolean isLock() { return lock; }
    public void setLock(boolean lock) { this.lock = lock; }
    public void setLockCount(int lockCount) { this.lockCount = lockCount; }
}
