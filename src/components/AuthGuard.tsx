
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: Array<'user' | 'host' | 'admin'>;
}

const AuthGuard = ({ children, allowedRoles }: AuthGuardProps) => {
  const { session, loading, isAuthenticated } = useAuth();
  const location = useLocation();

  // Wait for authentication to finish loading
  if (loading) {
    // You could render a loading spinner here
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>;
  }

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    // Redirect to login page with return URL
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If specific roles are required, check if user has permission
  if (allowedRoles && session?.user) {
    const hasPermission = allowedRoles.includes(session.user.role);
    
    if (!hasPermission) {
      // Redirect to unauthorized page or home
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has the required permissions
  return <>{children}</>;
};

export default AuthGuard;
