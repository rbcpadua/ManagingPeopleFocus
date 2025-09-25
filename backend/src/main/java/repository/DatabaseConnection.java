package repository;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class DatabaseConnection {

    private static final String URL = "jdbc:postgresql://dpg-d388d8h5pdvs738colrg-a.oregon-postgres.render.com:5432/managingpeoplefocus";
    private static final String USER = "managingpeoplefocus_user";
    private static final String PASSWORD = "3Wmy8mVqxvnCgLdw9elOYMOdEwnfPCkU";

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}
