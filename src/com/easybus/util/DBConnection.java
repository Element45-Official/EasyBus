package com.easybus.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DBConnection {

    private static final String URL = "jdbc:mysql://localhost:3306/easybus_db";
    private static final String USER = "root";
    private static final String PASSWORD = ""; // Default XAMPP MySQL password

    public static Connection getConnection() throws SQLException {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            throw new SQLException("MySQL JDBC Driver not found on Build Path.", e);
        }
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
