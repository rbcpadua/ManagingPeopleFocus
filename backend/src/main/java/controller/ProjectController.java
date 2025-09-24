package controller;

import repository.DatabaseConnection;
import model.Project;
import model.User;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProjectController {

    public void create(Project project) {
        String sql = "INSERT INTO projects (name, description, created_at, end_date, status, created_by, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, project.getName());
            stmt.setString(2, project.getDescription());
            stmt.setDate(3, java.sql.Date.valueOf(project.getCreatedAt()));
            stmt.setDate(4, java.sql.Date.valueOf(project.getEndDate()));
            stmt.setString(5, project.getStatus());
            stmt.setInt(6, project.getCreatedBy());
            stmt.setInt(7, project.getUserId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public void update(Project project) {
        String sql = "UPDATE projects SET name = ?, description = ?, created_at = ?, end_date = ?, status = ?, created_by = ?, user_id = ? WHERE id = ?";
        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, project.getName());
            stmt.setString(2, project.getDescription());
            stmt.setDate(3, java.sql.Date.valueOf(project.getCreatedAt()));
            stmt.setDate(4, java.sql.Date.valueOf(project.getEndDate()));
            stmt.setString(5, project.getStatus());
            stmt.setInt(6, project.getCreatedBy());
            stmt.setInt(7, project.getUserId());
            stmt.setInt(8, project.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Project> findAll() {
        List<Project> projects = new ArrayList<>();
        String sql = "SELECT p.*, u1.fullname AS created_by_name, u2.fullname AS user_name " +
                "FROM projects p " +
                "JOIN users u1 ON p.created_by = u1.id " +
                "JOIN users u2 ON p.user_id = u2.id";
        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
        User createdBy = new User(rs.getInt("created_by"), rs.getString("created_by_name"), "", "", "", "", "", 0);
        User user = new User(rs.getInt("user_id"), rs.getString("user_name"), "", "", "", "", "", 0);

        projects.add(new Project(
            rs.getInt("id"),
            rs.getString("name"),
            rs.getString("description"),
            rs.getDate("created_at").toLocalDate(),
            rs.getDate("end_date").toLocalDate(),
            rs.getString("status"),
            createdBy.getId(),
            user.getId()));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return projects;
    }
}