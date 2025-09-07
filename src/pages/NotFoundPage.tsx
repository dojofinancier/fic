import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#10ac69] opacity-20">404</h1>
        </div>
        
        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-[#3b3b3b] mb-4">
            Page non trouvée
          </h2>
          <p className="text-gray-600 text-lg">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>
        
        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-[#10ac69] text-white font-medium rounded-lg hover:bg-[#0e9a5a] transition-colors duration-200"
          >
            <Home className="w-5 h-5 mr-2" />
            Retour à l'accueil
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center w-full px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Page précédente
          </button>
        </div>
        
        {/* Help Text */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            Si vous pensez qu'il s'agit d'une erreur,{' '}
            <Link to="/contact" className="text-[#10ac69] hover:underline">
              contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
