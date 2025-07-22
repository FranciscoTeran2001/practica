import React, { type JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface PrivateRouteProps {
  children: JSX.Element;
  allowedRoles?: string[]; // roles permitidos para esta ruta
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, allowedRoles }) => {
  const { isAuthenticated, roles } = useAuth();
console.log("isAuthenticated:", isAuthenticated);
console.log("roles:", roles);
console.log("allowedRoles:", allowedRoles);

  if (isAuthenticated === null) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  if (allowedRoles && roles && !roles.some(role => allowedRoles.includes(role))) {
    // Usuario autenticado pero no tiene permiso
    return <Navigate to="/login" replace />;
  }

  

  return children;
};

export default PrivateRoute;
