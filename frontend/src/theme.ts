import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#48258c",
      light: "#6c4a9f",
      dark: "#351c61",
      contrastText: "#fff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "white",
          width: "50%",
        },
      },
    },
  },
});

export default theme;
