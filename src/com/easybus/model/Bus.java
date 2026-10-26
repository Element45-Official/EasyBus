package com.easybus.model;

public class Bus {
    private int busId;
    private String busNumber;
    private int totalSeat;

    public Bus() {
    }

    public Bus(int busId, String busNumber, int totalSeat) {
        this.busId = busId;
        this.busNumber = busNumber;
        this.totalSeat = totalSeat;
    }

    public int getBusId() {
        return busId;
    }

    public void setBusId(int busId) {
        this.busId = busId;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public int getTotalSeat() {
        return totalSeat;
    }

    public void setTotalSeat(int totalSeat) {
        this.totalSeat = totalSeat;
    }

    @Override
    public String toString() {
        return "Bus [busId=" + busId
                + ", busNumber=" + busNumber
                + ", totalSeat=" + totalSeat + "]";
    }
}
