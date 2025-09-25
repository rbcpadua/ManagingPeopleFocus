package controller;

import repository.DatabaseConnection;
import model.Project;
import model.User;

import java.sql.*;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class ProjectController {

    public void create(Project project) {
        String sql = "INSERT INTO projects (name, description, created_at, end_date, status, created_by, user_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = DatabaseConnection.getConnection();
                PreparedStatement stmt = conn.prepareStatement(sql)) {

            Timestamp createdAt = Timestamp.from(Instant.parse(project.getCreatedAt()));

            Timestamp endDate = null;
            if (project.getEndDate() != null && !project.getEndDate().isEmpty()) {
                endDate = Timestamp.from(Instant.parse(project.getEndDate()));
            }

            stmt.setString(1, project.getName());
            stmt.setString(2, project.getDescription());
            stmt.setTimestamp(3, createdAt);
            stmt.setTimestamp(4, endDate);
            stmt.setString(5, project.getStatus());
            stmt.setInt(6, project.getUserId());
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

            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss.SS");
            LocalDateTime localCreatedAt = LocalDateTime.parse(project.getCreatedAt(), formatter);
            Timestamp createdAt = Timestamp.valueOf(localCreatedAt);

            Timestamp endDate = null;

            if (Objects.equals(project.getStatus(), "concluido") || Objects.equals(project.getStatus(), "cancelado")) {
                endDate = new Timestamp(System.currentTimeMillis());
            } else if (project.getEndDate() != null && !project.getEndDate().isEmpty()) {
                LocalDateTime localEndDate = LocalDateTime.parse(project.getEndDate(), formatter);
                endDate = Timestamp.valueOf(localEndDate);
            }

            stmt.setString(1, project.getName());
            stmt.setString(2, project.getDescription());
            stmt.setTimestamp(3, createdAt);
            stmt.setTimestamp(4, endDate);
            stmt.setString(5, project.getStatus());
            stmt.setString(6, project.getCreatedBy());
            stmt.setInt(7, project.getUserId());
            stmt.setInt(8, project.getId());
            stmt.executeUpdate();
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    public List<Project> findAll() {
        List<Project> projects = new ArrayList<>();
        String sql = "SELECT p.*, u.fullname AS user_name FROM projects p JOIN users u ON p.user_id = u.id";

        try (Connection conn = DatabaseConnection.getConnection();
                Statement stmt = conn.createStatement();
                ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                String createdByName = rs.getString("user_name");

                User user = new User(rs.getInt("user_id"), createdByName, "", "", "", "", "", 0);

                projects.add(new Project(
                        rs.getInt("id"),
                        rs.getString("name"),
                        rs.getString("description"),
                        rs.getString("created_at"),
                        rs.getString("end_date"),
                        rs.getString("status"),
                        createdByName, // Usamos o nome do usuário como o criador
                        user.getId()));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return projects;
    }
}