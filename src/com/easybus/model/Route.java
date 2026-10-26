package com.easybus.model;

public class Route {
    private int routeId;
    private String departureCity;
    private String arrivalCity;
    private String estimateTime;

    public Route() {
    }

    public Route(int routeId, String departureCity, String arrivalCity, String estimateTime) {
        this.routeId = routeId;
        this.departureCity = departureCity;
        this.arrivalCity = arrivalCity;
        this.estimateTime = estimateTime;
    }

    public int getRouteId() {
        return routeId;
    }

    public void setRouteId(int routeId) {
        this.routeId = routeId;
    }

    public String getDepartureCity() {
        return departureCity;
    }

    public void setDepartureCity(String departureCity) {
        this.departureCity = departureCity;
    }

    public String getArrivalCity() {
        return arrivalCity;
    }

    public void setArrivalCity(String arrivalCity) {
        this.arrivalCity = arrivalCity;
    }

    public String getEstimateTime() {
        return estimateTime;
    }

    public void setEstimateTime(String estimateTime) {
        this.estimateTime = estimateTime;
    }

    @Override
    public String toString() {
        return "Route [routeId=" + routeId
                + ", departureCity=" + departureCity
                + ", arrivalCity=" + arrivalCity
                + ", estimateTime=" + estimateTime + "]";
    }
}
