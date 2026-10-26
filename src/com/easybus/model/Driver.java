package com.easybus.model;

public class Driver {
    private int driverId;
    private String driverName;
    private String driverLicenseNum;
    private String driverPhoneNum;

    public Driver() {
    }

    public Driver(int driverId, String driverName, String driverLicenseNum, String driverPhoneNum) {
        this.driverId = driverId;
        this.driverName = driverName;
        this.driverLicenseNum = driverLicenseNum;
        this.driverPhoneNum = driverPhoneNum;
    }

    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }

    public String getDriverName() {
        return driverName;
    }

    public void setDriverName(String driverName) {
        this.driverName = driverName;
    }

    public String getDriverLicenseNum() {
        return driverLicenseNum;
    }

    public void setDriverLicenseNum(String driverLicenseNum) {
        this.driverLicenseNum = driverLicenseNum;
    }

    public String getDriverPhoneNum() {
        return driverPhoneNum;
    }

    public void setDriverPhoneNum(String driverPhoneNum) {
        this.driverPhoneNum = driverPhoneNum;
    }

    @Override
    public String toString() {
        return "Driver [driverId=" + driverId
                + ", driverName=" + driverName
                + ", driverLicenseNum=" + driverLicenseNum
                + ", driverPhoneNum=" + driverPhoneNum + "]";
    }
}
