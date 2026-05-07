import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ allowedRoles }) {
  const { isAuthenticated, isLoading, role } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-neutral">
        <div className="text-center flex flex-col items-center">
          <Loader2 className="w-10 h-10 animate-spin text-brand-green mb-4" />
          <p className="text-brand-gray font-medium">Verifying session...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    if (role === 'hr') {
      return <Navigate to="/hr" replace />;
    }
    if (role === 'student') {
      return <Navigate to="/student" replace />;
    }
    if (role === 'admin') {
      return <Navigate to="/coming-soon" replace />;
    }
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
