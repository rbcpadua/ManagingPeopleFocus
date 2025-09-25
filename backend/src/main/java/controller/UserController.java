package controller;

import repository.DatabaseConnection;
import model.User;
import utils.PasswordHasher;
import java.util.ArrayList;
import java.util.List;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class UserController {

    public void create(User user) {
        String sql = "INSERT INTO users (fullname, document, email, role, login, password, profile_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getFullname());
            stmt.setString(2, user.getDocument());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getRole());
            stmt.setString(5, user.getLogin());
            String hashedPassword = PasswordHasher.hashPassword(user.getPassword());
            stmt.setString(6, hashedPassword);
            stmt.setInt(7, user.getProfileId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void update(User user) throws SQLException {
        String sql = "UPDATE users SET fullname = ?, document = ?, email = ?, role = ?, login = ?, profile_id = ? WHERE id = ?";
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            sql = "UPDATE users SET fullname = ?, document = ?, email = ?, role = ?, login = ?, password = ?, profile_id = ? WHERE id = ?";
        }

        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, user.getFullname());
            stmt.setString(2, user.getDocument());
            stmt.setString(3, user.getEmail());
            stmt.setString(4, user.getRole());
            stmt.setString(5, user.getLogin());

            int paramIndex = 6;
            if (user.getPassword() != null && !user.getPassword().isEmpty()) {
                String hashedPassword = PasswordHasher.hashPassword(user.getPassword());
                stmt.setString(paramIndex++, hashedPassword);
            }
            stmt.setInt(paramIndex++, user.getProfileId());
            stmt.setInt(paramIndex++, user.getId());

            stmt.executeUpdate();
        }
    }

    public List<User> findAll() {
        List<User> users = new ArrayList<>();
        String sql = "SELECT * FROM users";
        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                users.add(new User(
                        rs.getInt("id"),
                        rs.getString("fullname"),
                        rs.getString("document"),
                        rs.getString("email"),
                        rs.getString("role"),
                        rs.getString("login"),
                        null,
                        rs.getInt("profile_id")));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return users;
    }

    public User findByLoginAndPassword(String login, String password) {
        String sql = "SELECT * FROM users WHERE login = ?";
        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, login);

            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    String storedHashedPassword = rs.getString("password");

                    if (PasswordHasher.verifyPassword(password, storedHashedPassword)) {
                        return new User(
                                rs.getInt("id"),
                                rs.getString("fullname"),
                                rs.getString("document"),
                                rs.getString("email"),
                                rs.getString("role"),
                                rs.getString("login"),
                                null,
                                rs.getInt("profile_id"));
                    }
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}