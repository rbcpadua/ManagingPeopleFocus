import { useContext, useState, type FormEvent } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import { AuthContext } from "../../contexts/AuthContext";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setUser } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:7000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ login, password }),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const data = await response.json();

      setUser({
        id: data.id,
        fullname: data.fullname,
        role: data.role,
        document: data.document,
      });

      localStorage.setItem("token", data.token);

      navigate("/");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro ao autenticar");
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper
        elevation={6}
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <LockOpenIcon color="primary" sx={{ fontSize: 60 }} />
        <Typography component="h1" variant="h5" sx={{ mt: 1, mb: 3 }}>
          Entrar
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Login"
            name="login"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            loadingIndicator="Entrando..."
          >
            Entrar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;
