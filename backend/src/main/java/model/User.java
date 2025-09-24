package model;

public class User {
    private int id;
    private String fullname;
    private String document;
    private String email;
    private String role;
    private String login;
    private String password;
    private int profileId;

    public User() {
    }

    public User(int id, String fullname, String document, String email, String role,
            String login, String password, int profileId) {
        this.id = id;
        this.fullname = fullname;
        this.document = document;
        this.email = email;
        this.role = role;
        this.login = login;
        this.password = password;
        this.profileId = profileId;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getDocument() {
        return document;
    }

    public void setDocument(String document) {
        this.document = document;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getProfileId() {
        return profileId;
    }

    public void setProfileId(int profileId) {
        this.profileId = profileId;
    }
}
