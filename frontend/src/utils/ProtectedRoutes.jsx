import { useEffect } from "react"; // Added useEffect
import { useAuth } from "../context/AuthContext";
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
    }, [user, requireRole, navigate]); // Added dependencies to the hook

    return user && (requireRole.includes(user.role)) ? <Outlet /> : null;
};

export default ProtectedRoutes;