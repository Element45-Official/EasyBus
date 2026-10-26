package com.easybus.model;

public class Trip {
    private int tripId;
    private String departureTime;
    private String arrivalTime;
    private double fare;
    private String date;
    private int busId;
    private int routeId;
    private int driverId;

    public Trip() {
    }

    public Trip(int tripId, String departureTime, String arrivalTime, double fare,
                String date, int busId, int routeId, int driverId) {
        this.tripId = tripId;
        this.departureTime = departureTime;
        this.arrivalTime = arrivalTime;
        this.fare = fare;
        this.date = date;
        this.busId = busId;
        this.routeId = routeId;
        this.driverId = driverId;
    }

    public int getTripId() {
        return tripId;
    }

    public void setTripId(int tripId) {
        this.tripId = tripId;
    }

    public String getDepartureTime() {
        return departureTime;
    }

    public void setDepartureTime(String departureTime) {
        this.departureTime = departureTime;
    }

    public String getArrivalTime() {
        return arrivalTime;
    }

    public void setArrivalTime(String arrivalTime) {
        this.arrivalTime = arrivalTime;
    }

    public double getFare() {
        return fare;
    }

    public void setFare(double fare) {
        this.fare = fare;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public int getBusId() {
        return busId;
    }

    public void setBusId(int busId) {
        this.busId = busId;
    }

    public int getRouteId() {
        return routeId;
    }

    public void setRouteId(int routeId) {
        this.routeId = routeId;
    }

    public int getDriverId() {
        return driverId;
    }

    public void setDriverId(int driverId) {
        this.driverId = driverId;
    }

    @Override
    public String toString() {
        return "Trip [tripId=" + tripId
                + ", departureTime=" + departureTime
                + ", arrivalTime=" + arrivalTime
                + ", fare=RM" + String.format("%.2f", fare)
                + ", date=" + date
                + ", busId=" + busId
                + ", routeId=" + routeId
                + ", driverId=" + driverId + "]";
    }
}
