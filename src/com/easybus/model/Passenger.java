package com.easybus.model;

public class Passenger {
    private int passengerId;
    private String passengerName;
    private String passengerEmail;
    private String passengerPhoneNum;
    private String passengerPassword;

    public Passenger() {
    }

    public Passenger(int passengerId, String passengerName, String passengerEmail,
                     String passengerPhoneNum, String passengerPassword) {
        this.passengerId = passengerId;
        this.passengerName = passengerName;
        this.passengerEmail = passengerEmail;
        this.passengerPhoneNum = passengerPhoneNum;
        this.passengerPassword = passengerPassword;
    }

    public int getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(int passengerId) {
        this.passengerId = passengerId;
    }

    public String getPassengerName() {
        return passengerName;
    }

    public void setPassengerName(String passengerName) {
        this.passengerName = passengerName;
    }

    public String getPassengerEmail() {
        return passengerEmail;
    }

    public void setPassengerEmail(String passengerEmail) {
        this.passengerEmail = passengerEmail;
    }

    public String getPassengerPhoneNum() {
        return passengerPhoneNum;
    }

    public void setPassengerPhoneNum(String passengerPhoneNum) {
        this.passengerPhoneNum = passengerPhoneNum;
    }

    public String getPassengerPassword() {
        return passengerPassword;
    }

    public void setPassengerPassword(String passengerPassword) {
        this.passengerPassword = passengerPassword;
    }

    @Override
    public String toString() {
        return "Passenger [passengerId=" + passengerId
                + ", passengerName=" + passengerName
                + ", passengerEmail=" + passengerEmail
                + ", passengerPhoneNum=" + passengerPhoneNum + "]";
    }
}
