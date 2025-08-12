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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#10ac69]"></div>
      </div>
    );
  }

  // Pas connecté - rediriger vers pricing
  if (!user) {
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  // Admin requis mais utilisateur pas admin
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

  // Accès payant requis mais utilisateur n'a pas payé
  if (requiresAccess && !user.hasAccess) {
    return <Navigate to="/pricing" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};