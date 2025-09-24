package app;

import controller.ProfileController;
import controller.ProjectController;
import controller.UserController;
import io.javalin.Javalin;
import model.Profile;
import model.Project;
import model.User;

import java.util.List;

public class ApiServer {

    public static void main(String[] args) {
        Javalin app = Javalin.create().start(7000);

        ProfileController profileController = new ProfileController();
        UserController userController = new UserController();
        ProjectController projectController = new ProjectController();

        app.get("/api/profiles", ctx -> {
            List<Profile> profiles = profileController.findAll();
            ctx.json(profiles);
        });

        app.post("/api/profiles", ctx -> {
            Profile newProfile = ctx.bodyAsClass(Profile.class);
            profileController.create(newProfile);
            ctx.status(201).result("Perfil criado com sucesso!");
        });

        app.put("/api/profiles/{id}", ctx -> {
            int id = Integer.parseInt(ctx.pathParam("id"));
            Profile profileToUpdate = ctx.bodyAsClass(Profile.class);
            profileToUpdate.setId(id);
            profileController.update(profileToUpdate);
            ctx.status(200).result("Perfil atualizado com sucesso!");
        });

        app.get("/api/users", ctx -> {
            List<User> users = userController.findAll();
            ctx.json(users);
        });

        app.post("/api/users", ctx -> {
            User newUser = ctx.bodyAsClass(User.class);
            userController.create(newUser);
            ctx.status(201).result("Usuário criado com sucesso!");
        });

        app.put("/api/users/{id}", ctx -> {
            int id = Integer.parseInt(ctx.pathParam("id"));
            User userToUpdate = ctx.bodyAsClass(User.class);
            userToUpdate.setId(id);
            userController.update(userToUpdate);
            ctx.status(200).result("Usuário atualizado com sucesso!");
        });

        app.get("/api/projects", ctx -> {
            List<Project> projects = projectController.findAll();
            ctx.json(projects);
        });

        app.post("/api/projects", ctx -> {
            Project newProject = ctx.bodyAsClass(Project.class);
            projectController.create(newProject);
            ctx.status(201).result("Projeto criado com sucesso!");
        });

        app.put("/api/projects/{id}", ctx -> {
            int id = Integer.parseInt(ctx.pathParam("id"));
            Project projectToUpdate = ctx.bodyAsClass(Project.class);
            projectToUpdate.setId(id);
            projectController.update(projectToUpdate);
            ctx.status(200).result("Projeto atualizado com sucesso!");
        });
    }
}