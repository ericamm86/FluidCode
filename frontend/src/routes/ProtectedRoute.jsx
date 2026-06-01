import { Navigate } from "react-router-dom";
import { useAuth } from "../services/auth-context";

export default function ProtectedRoute({ children }) {
  const { signed } = useAuth();

  if (!signed) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
