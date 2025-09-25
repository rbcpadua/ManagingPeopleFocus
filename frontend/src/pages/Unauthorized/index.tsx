import { Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Unauthorized = () => {
  return (
    <div className="pageContainer unauthorizedPage">
      <Typography variant="h2" gutterBottom>
        401 - Não autorizado
      </Typography>
      <Typography variant="body1" gutterBottom>
        Você não tem permissão para acessar esta página.
      </Typography>
      <Button variant="contained" component={Link} to="/login">
        Ir para Login
      </Button>
    </div>
  );
};

export default Unauthorized;
