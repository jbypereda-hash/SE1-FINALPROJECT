import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import type { JSX } from "react";

interface ProtectedRouteProps {
  requiredRole?: ("admin" | "coach" | "member")[];
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

  // Not logged in → always redirect home
  if (!user) return <Navigate to="/" replace />;

  // If route requires specific role(s)
  if (requiredRole && !requiredRole.includes(role!)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
