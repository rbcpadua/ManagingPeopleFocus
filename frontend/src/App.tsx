import { type JSX } from "react";
import "./index.css";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./routes";

const Layout = () => {
  const location = useLocation();
  const hideSidebar =
    location.pathname === "/login" || location.pathname === "/401";

  return (
    <div className="appContainer">
      {!hideSidebar && <Sidebar />}
      <AppRoutes />
    </div>
  );
};

const App = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
