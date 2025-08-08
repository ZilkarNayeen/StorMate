
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

const Root = () => {
  const { user, logout } = useAuth(); 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("pos-token");

    
    if (!user || !token) {
      logout(); 
      navigate("/login");
      return;
    }

    // Redirect based on role
    if (user.role === "admin") {
      navigate("/admin-dashboard");
    } else if (user.role === "customer") {
      navigate("/customer-dashboard");
    } else {
      logout();
      navigate("/login");
    }
  }, [user, navigate, logout]);

  return null;
};

export default Root;
