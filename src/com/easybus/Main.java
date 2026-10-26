package com.easybus;

import java.sql.Connection;
import java.sql.SQLException;

import com.easybus.model.Booking;
import com.easybus.model.Bus;
import com.easybus.model.Driver;
import com.easybus.model.Passenger;
import com.easybus.model.Route;
import com.easybus.model.Seat;
import com.easybus.model.Trip;
import com.easybus.util.DBConnection;

public class Main {

    public static void main(String[] args) {
        System.out.println("=== EasyBus ERD Entity Models ===");

        Passenger passenger = new Passenger(1, "Ali bin Abu", "ali@example.com", "011-12345678", "pass123");
        Driver driver = new Driver(1, "Ahmad", "LIC-1001", "012-3456789");
        Bus bus = new Bus(1, "ABC1234", 40);
        Seat seat = new Seat(1, "1A", "Available", bus.getBusId());
        Route route = new Route(1, "Kuala Lumpur", "Johor Bahru", "4 Hours");
        Trip trip = new Trip(1, "08:00:00", "12:00:00", 35.00, "2026-06-01",
                bus.getBusId(), route.getRouteId(), driver.getDriverId());
        Booking booking = new Booking(1, "2026-05-25", "Confirmed", 35.00,
                passenger.getPassengerId(), trip.getTripId());

        System.out.println(passenger);
        System.out.println(driver);
        System.out.println(bus);
        System.out.println(seat);
        System.out.println(route);
        System.out.println(trip);
        System.out.println(booking);

        System.out.println("\n=== MySQL / XAMPP Connection Check ===");
        try (Connection conn = DBConnection.getConnection()) {
            System.out.println("Connected to database: " + conn.getCatalog());
        } catch (SQLException e) {
            System.out.println("Database not connected yet: " + e.getMessage());
        }
    }
}
