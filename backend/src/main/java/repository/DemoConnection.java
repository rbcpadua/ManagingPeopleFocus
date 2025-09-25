package repository;

import java.sql.Connection;
import java.sql.SQLException;

public class DemoConnection {
    public static void main(String[] args) {
        try (Connection conn = DatabaseConnection.getConnection()) {
            if (conn != null) {
                System.out.println("✅ Conexão bem-sucedida!");
            } else {
                System.out.println("❌ Falha na conexão.");
            }
        } catch (SQLException e) {
            System.out.println("Erro ao conectar: " + e.getMessage());
        }
    }
}
