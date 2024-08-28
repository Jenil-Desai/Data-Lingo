import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";

interface ProtectedRouteProps {
  children: JSX.Element;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();
  if (!auth) {
    return <Navigate to="/login" replace />;
  }
  if (!auth.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};
