import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box className="pageContainer notFoundPage" textAlign="center">
      <Typography variant="h1" gutterBottom>
        404
      </Typography>
      <Typography variant="h4" gutterBottom>
        Página Não Encontrada
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        A página que você está procurando não existe.
      </Typography>
      <Button variant="contained" component={Link} to="/">
        Voltar para a Página Inicial
      </Button>
    </Box>
  );
};

export default NotFound;
