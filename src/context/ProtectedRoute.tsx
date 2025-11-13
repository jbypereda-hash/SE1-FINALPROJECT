import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "member";
  children: JSX.Element;
}

const ProtectedRoute = ({ requiredRole, children }: ProtectedRouteProps) => {
  const { user, role, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    // not logged in
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    // role mismatch
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
