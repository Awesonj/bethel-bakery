import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function RequireStaff({ children }) {
  const { isStaff, loading } = useAuth();

  if (loading) {
    return <p style={{ textAlign: "center", padding: "3rem" }}>Loading...</p>;
  }

  if (!isStaff) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
