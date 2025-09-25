// Exemplo de ProtectedRoute.tsx
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute = ({ children, allowedRoles }: ProtectedRouteProps) => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/401" replace />;
  }

  return children;
};

export default ProtectedRoute;
