import Typography from "@mui/material/Typography";
import work from "../../assets/people-working.png";

const HomePage = () => {
  return (
    <div className="homePage pageContainer">
      <Typography variant="h6">Bem vindo ao Managing People Focus👋</Typography>
      <img src={work} alt="Managing People Focus" />
      <Typography variant="body1">
        Nessa aplicação você poderá gerenciar projetos, perfis e usuários de
        forma eficiente e intuitiva.
      </Typography>
      <Typography variant="body1">
        Organize suas tarefas, acompanhe o progresso dos projetos e colabore com
        sua equipe em um só lugar.
      </Typography>
    </div>
  );
};
export default HomePage;
