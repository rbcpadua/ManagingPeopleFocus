import type { JSX } from "react";
import logo from "../../assets/logo-letter.png";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link, useNavigate } from "react-router-dom";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FolderIcon from "@mui/icons-material/Folder";
import PersonIcon from "@mui/icons-material/Person";
import GroupIcon from "@mui/icons-material/Group";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const menuItems = [
  {
    text: "Início",
    icon: <HomeIcon />,
    path: "/",
    allowedRoles: ["Admin", "Manager", "Analist"],
  },
  {
    text: "Projetos",
    icon: <FolderIcon />,
    path: "/projetos",
    allowedRoles: ["Admin", "Manager", "Analist"],
  },
  {
    text: "Perfil",
    icon: <PersonIcon />,
    path: "/perfil",
    allowedRoles: ["Admin"],
  },
  {
    text: "Usuários",
    icon: <GroupIcon />,
    path: "/usuarios",
    allowedRoles: ["Admin", "Manager"],
  },
];

const hasPermission = (userRole: string, allowedRoles: string[]) => {
  return allowedRoles.includes(userRole);
};

const Sidebar = (): JSX.Element => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
  };

  if (!user) {
    return <></>;
  }

  const filteredMenuItems = menuItems.filter((item) =>
    hasPermission(user.role, item.allowedRoles)
  );

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" width={"250px"} height={"250px"} />
      <Divider />
      <List>
        {filteredMenuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton component={Link} to={item.path}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <Box sx={{ marginTop: "auto", padding: 2 }}>
        <div className="userProfile">
          <AccountCircleIcon />
          <Typography>Olá, {user.fullname} !</Typography>
        </div>
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItemButton>
        </ListItem>
      </Box>

      <footer>
        <p>© 2025 Managing People Focus</p>
      </footer>
    </div>
  );
};
export default Sidebar;
