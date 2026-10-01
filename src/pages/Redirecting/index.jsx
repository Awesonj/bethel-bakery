import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Redirecting() {
  const { user, isStaff, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      navigate("/login");
      return;
    }

    if (isStaff) {
      navigate("/staff/sell");
    } else {
      navigate("/menu");
    }
  }, [user, isStaff, loading, navigate]);

  return <p style={{ textAlign: "center", padding: "3rem" }}>Loading...</p>;
}