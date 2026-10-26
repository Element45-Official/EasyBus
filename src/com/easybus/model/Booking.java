package com.easybus.model;

public class Booking {
    private int bookingId;
    private String bookingDate;
    private String bookingStatus;
    private double bookingTotalAmount;
    private int passengerId;
    private int tripId;

    public Booking() {
    }

    public Booking(int bookingId, String bookingDate, String bookingStatus,
                   double bookingTotalAmount, int passengerId, int tripId) {
        this.bookingId = bookingId;
        this.bookingDate = bookingDate;
        this.bookingStatus = bookingStatus;
        this.bookingTotalAmount = bookingTotalAmount;
        this.passengerId = passengerId;
        this.tripId = tripId;
    }

    public int getBookingId() {
        return bookingId;
    }

    public void setBookingId(int bookingId) {
        this.bookingId = bookingId;
    }

    public String getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(String bookingDate) {
        this.bookingDate = bookingDate;
    }

    public String getBookingStatus() {
        return bookingStatus;
    }

    public void setBookingStatus(String bookingStatus) {
        this.bookingStatus = bookingStatus;
    }

    public double getBookingTotalAmount() {
        return bookingTotalAmount;
    }

    public void setBookingTotalAmount(double bookingTotalAmount) {
        this.bookingTotalAmount = bookingTotalAmount;
    }

    public int getPassengerId() {
        return passengerId;
    }

    public void setPassengerId(int passengerId) {
        this.passengerId = passengerId;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    @Override
    public String toString() {
        return "Booking [bookingId=" + bookingId
                + ", bookingDate=" + bookingDate
                + ", bookingStatus=" + bookingStatus
                + ", bookingTotalAmount=RM" + String.format("%.2f", bookingTotalAmount)
                + ", passengerId=" + passengerId
                + ", tripId=" + tripId + "]";
    }
}
