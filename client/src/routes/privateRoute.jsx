import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, rolesAllowed }) => {
    const { token } = useSelector((state) => state.user);

    if (!token) {
        return <Navigate to="/auth" replace />;
    }

    try {
        const decoded = jwtDecode(token);
        if (rolesAllowed.includes(decoded.role)) {
            return children;
        } else {
            return <Navigate to="/404" replace />;
        }
    } catch (error) {
        alert("Invalid token:", error);
        return <Navigate to="/auth" replace />;
    }
};

export default PrivateRoute;
