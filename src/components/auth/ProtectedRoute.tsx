
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Card } from '../ui/Card';
import { AlertCircle } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiresAccess?: boolean;
  requiresAdmin?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiresAccess = true,
  requiresAdmin = false 
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  
  // Debug logging
  console.log('🔒 ProtectedRoute: Evaluating access for path:', location.pathname);
  console.log('🔒 ProtectedRoute: User state:', user);
  console.log('🔒 ProtectedRoute: Loading state:', loading);
  console.log('🔒 ProtectedRoute: Requires access:', requiresAccess);
  console.log('🔒 ProtectedRoute: User hasAccess:', user?.hasAccess);

  // Show loading spinner while authentication is being determined
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#10ac69] mx-auto mb-4"></div>
          <p className="text-gray-600">Vérification de l'authentification...</p>
        </div>
      </div>
    );
  }

  // Not logged in - redirect to pricing
  if (!user) {
    console.log('🔒 ProtectedRoute: No user found, redirecting to pricing');
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  // Admin required but user is not admin
  if (requiresAdmin && !user.isAdmin) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-red-500 mx-auto mb-6" />
            <h2 className="text-2xl font-bold text-[#3b3b3b] mb-4">
              Accès administrateur requis
            </h2>
            <p className="text-gray-600">
              Vous devez être administrateur pour accéder à cette page.
            </p>
          </Card>
        </div>
      </div>
    );
  }

  // Paid access required but user hasn't paid
  if (requiresAccess && !user.hasAccess) {
    console.log('🔒 ProtectedRoute: User found but no access, redirecting to pricing');
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  // All checks passed - render the protected content
  return <>{children}</>;
};