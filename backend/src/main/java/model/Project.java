package model;

import java.time.LocalDate;

public class Project {
    private int id;
    private String name;
    private String description;
    private LocalDate createdAt;
    private LocalDate endDate;
    private String status;
    private int createdBy;
    private int userId;

    public Project() {}

    public Project(int id, String name, String description, LocalDate createdAt,
                   LocalDate endDate, String status, int createdBy, int userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.endDate = endDate;
        this.status = status;
        this.createdBy = createdBy;
        this.userId = userId;
    }

    // Getters e Setters
    public int getId() { return id; }
    public void setId(int id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public LocalDate getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDate createdAt) { this.createdAt = createdAt; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public int getCreatedBy() { return createdBy; }
    public void setCreatedBy(int createdBy) { this.createdBy = createdBy; }

    public int getUserId() { return userId; }
    public void setUserId(int userId) { this.userId = userId; }
}
