package utils;

import org.mindrot.jbcrypt.BCrypt;

public class PasswordHasher {

    // Gera o hash de uma senha
    public static String hashPassword(String password) {
        return BCrypt.hashpw(password, BCrypt.gensalt());
    }

    // Verifica se uma senha corresponde a um hash
    public static boolean checkPassword(String password, String hashedPassword) {
        return BCrypt.checkpw(password, hashedPassword);
    }
}