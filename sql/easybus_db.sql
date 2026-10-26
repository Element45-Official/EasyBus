-- EasyBus Database Schema (XAMPP / MySQL)
-- Strictly matches Section 5: DATABASE DESIGN (ERD on Page 19)

CREATE DATABASE IF NOT EXISTS easybus_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE easybus_db;

DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS trip;
DROP TABLE IF EXISTS seat;
DROP TABLE IF EXISTS route;
DROP TABLE IF EXISTS bus;
DROP TABLE IF EXISTS driver;
DROP TABLE IF EXISTS passenger;

-- 1. PASSENGER
CREATE TABLE passenger (
    Passenger_ID INT AUTO_INCREMENT PRIMARY KEY,
    Passenger_Name VARCHAR(100) NOT NULL,
    Passenger_Email VARCHAR(100) NOT NULL,
    Passenger_PhoneNum VARCHAR(20),
    Passenger_Password VARCHAR(100) NOT NULL
);

-- 2. DRIVER
CREATE TABLE driver (
    Driver_ID INT AUTO_INCREMENT PRIMARY KEY,
    Driver_Name VARCHAR(100) NOT NULL,
    Driver_LicenseNum VARCHAR(50),
    Driver_PhoneNum VARCHAR(20)
);

-- 3. BUS
CREATE TABLE bus (
    Bus_ID INT AUTO_INCREMENT PRIMARY KEY,
    Bus_Number VARCHAR(20) NOT NULL,
    Total_Seat INT NOT NULL
);

-- 4. SEAT
CREATE TABLE seat (
    Seat_ID INT AUTO_INCREMENT PRIMARY KEY,
    Seat_Number VARCHAR(10) NOT NULL,
    Seat_Status VARCHAR(20) NOT NULL,
    Bus_ID INT NOT NULL,
    CONSTRAINT fk_seat_bus FOREIGN KEY (Bus_ID) REFERENCES bus(Bus_ID) ON DELETE CASCADE
);

-- 5. ROUTE
CREATE TABLE route (
    Route_ID INT AUTO_INCREMENT PRIMARY KEY,
    Departure_City VARCHAR(100) NOT NULL,
    Arrival_City VARCHAR(100) NOT NULL,
    Estimate_Time VARCHAR(50)
);

-- 6. TRIP
CREATE TABLE trip (
    Trip_ID INT AUTO_INCREMENT PRIMARY KEY,
    Departure_Time TIME NOT NULL,
    Arrival_Time TIME,
    Fare DECIMAL(10, 2) NOT NULL,
    Date DATE NOT NULL,
    Bus_ID INT NOT NULL,
    Route_ID INT NOT NULL,
    Driver_ID INT NOT NULL,
    CONSTRAINT fk_trip_bus FOREIGN KEY (Bus_ID) REFERENCES bus(Bus_ID) ON DELETE CASCADE,
    CONSTRAINT fk_trip_route FOREIGN KEY (Route_ID) REFERENCES route(Route_ID) ON DELETE CASCADE,
    CONSTRAINT fk_trip_driver FOREIGN KEY (Driver_ID) REFERENCES driver(Driver_ID) ON DELETE CASCADE
);

-- 7. BOOKING
CREATE TABLE booking (
    Booking_ID INT AUTO_INCREMENT PRIMARY KEY,
    Booking_Date DATE NOT NULL,
    Booking_Status VARCHAR(20) NOT NULL,
    Booking_TotalAmount DECIMAL(10, 2) NOT NULL,
    Passenger_ID INT NOT NULL,
    Trip_ID INT NOT NULL,
    CONSTRAINT fk_booking_passenger FOREIGN KEY (Passenger_ID) REFERENCES passenger(Passenger_ID) ON DELETE CASCADE,
    CONSTRAINT fk_booking_trip FOREIGN KEY (Trip_ID) REFERENCES trip(Trip_ID) ON DELETE CASCADE
);

-- Sample Data from Storyboard
INSERT INTO passenger (Passenger_Name, Passenger_Email, Passenger_PhoneNum, Passenger_Password) VALUES
('Ali bin Abu', 'ali@example.com', '011-12345678', 'pass123');

INSERT INTO driver (Driver_Name, Driver_LicenseNum, Driver_PhoneNum) VALUES
('Ahmad', 'LIC-1001', '012-3456789'),
('Razak', 'LIC-1002', '013-9876543'),
('Lim', 'LIC-1003', '016-2233445');

INSERT INTO bus (Bus_Number, Total_Seat) VALUES
('ABC1234', 40),
('XYZ5678', 40),
('DEF9012', 40);

INSERT INTO seat (Seat_Number, Seat_Status, Bus_ID) VALUES
('1A', 'Available', 1),
('1B', 'Available', 1),
('1A', 'Booked', 2),
('1A', 'Available', 3);

INSERT INTO route (Departure_City, Arrival_City, Estimate_Time) VALUES
('Kuala Lumpur', 'Johor Bahru', '4 Hours'),
('Melaka', 'Johor Bahru', '3 Hours'),
('Kuala Lumpur', 'Penang', '5 Hours');

INSERT INTO trip (Departure_Time, Arrival_Time, Fare, Date, Bus_ID, Route_ID, Driver_ID) VALUES
('08:00:00', '12:00:00', 35.00, '2026-06-01', 1, 1, 1),
('14:30:00', '17:30:00', 18.00, '2026-06-02', 2, 2, 2),
('09:15:00', '14:15:00', 45.00, '2026-06-03', 3, 3, 3);

INSERT INTO booking (Booking_Date, Booking_Status, Booking_TotalAmount, Passenger_ID, Trip_ID) VALUES
('2026-05-25', 'Confirmed', 35.00, 1, 1);
