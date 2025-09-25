import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Projects from "../pages/Projects";
import Profiles from "../pages/Profiles";
import Users from "../pages/Users";
import NotFound from "../pages/NotFound";
import LoginPage from "../pages/LoginPage";
import Unauthorized from "../pages/Unauthorized";
import ProtectedRoute from "../components/ProtectRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/401" element={<Unauthorized />} />

      <Route
        path="/"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Manager", "Analist"]}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/projetos"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Manager", "Analist"]}>
            <Projects />
          </ProtectedRoute>
        }
      />
      <Route
        path="/perfil"
        element={
          <ProtectedRoute allowedRoles={["Admin"]}>
            <Profiles />
          </ProtectedRoute>
        }
      />
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute allowedRoles={["Admin", "Manager"]}>
            <Users />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
