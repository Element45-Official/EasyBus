package com.easybus.model;

public class Seat {
    private int seatId;
    private String seatNumber;
    private String seatStatus;
    private int busId;

    public Seat() {
    }

    public Seat(int seatId, String seatNumber, String seatStatus, int busId) {
        this.seatId = seatId;
        this.seatNumber = seatNumber;
        this.seatStatus = seatStatus;
        this.busId = busId;
    }

    public int getSeatId() {
        return seatId;
    }

    public void setSeatId(int seatId) {
        this.seatId = seatId;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public String getSeatStatus() {
        return seatStatus;
    }

    public void setSeatStatus(String seatStatus) {
        this.seatStatus = seatStatus;
    }

    public int getBusId() {
        return busId;
    }

    public void setBusId(int busId) {
        this.busId = busId;
    }

    @Override
    public String toString() {
        return "Seat [seatId=" + seatId
                + ", seatNumber=" + seatNumber
                + ", seatStatus=" + seatStatus
                + ", busId=" + busId + "]";
    }
}
