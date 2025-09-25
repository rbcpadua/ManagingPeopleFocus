package model;

public class Project {
    private int id;
    private String name;
    private String description;
    private String createdAt;
    private String endDate;
    private String status;
    private String createdBy;
    private int userId;

    public Project() {
    }

    public Project(int id, String name, String description, String createdAt,
            String endDate, String status, String createdBy, int userId) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.createdAt = createdAt;
        this.endDate = endDate;
        this.status = status;
        this.createdBy = createdBy;
        this.userId = userId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(String createdAt) {
        this.createdAt = createdAt;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(String createdBy) {
        this.createdBy = createdBy;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }
}
