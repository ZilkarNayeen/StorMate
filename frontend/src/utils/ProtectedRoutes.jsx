import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Outlet, useNavigate } from "react-router";

const ProtectedRoutes = ({ requireRole }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If no user, redirect to login
    if (!user) {
      navigate("/login");
    } 
    // If user role not allowed, redirect to unauthorized
    else if (requireRole && !requireRole.includes(user.role)) {
      navigate("/unauthorized");
    }
  }, [user, requireRole, navigate]);

  // Render only if user exists and role is allowed
  if (!user) return null;
  if (requireRole && !requireRole.includes(user.role)) return null;

  return <Outlet />;
};

export default ProtectedRoutes;
