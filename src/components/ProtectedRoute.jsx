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
    // Redirect to login, but save the intended location
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    // Route role-based fallback logic
    // If they are unauthorized, send them to their own dashboard
    if (role === 'admin') return <Navigate to="/admin" replace />;
    if (role === 'hr') return <Navigate to="/hr" replace />;
    return <Navigate to="/dashboard" replace />;
  }

  // They are authenticated and have the right role
  return <Outlet />;
}
