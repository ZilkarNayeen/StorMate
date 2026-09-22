import { useEffect } from "react";
import { useAuth } from "../context/AuthContext.jsx"; // include .jsx
import { Outlet, useNavigate } from "react-router";

const ProtectedRoutes = ({ requireRole }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (requireRole && !requireRole.includes(user.role)) {
      navigate("/unauthorized");
    }
  }, [user, requireRole, navigate]);

  if (!user) return null;
  if (requireRole && !requireRole.includes(user.role)) return null;

  return <Outlet />;
};

export default ProtectedRoutes;
