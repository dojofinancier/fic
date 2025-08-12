import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { User, LogOut, LayoutDashboard, ShoppingCart } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-[#10ac69] shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="http://dojofinancier.ca/wp-content/uploads/2025/06/LOGO-White-300.webp" 
              alt="Le Dojo Financier" 
              className="h-8 w-auto"
            />
          </Link>

          <nav className="flex items-center space-x-4">
            {user ? (
              <>
                {user.hasAccess && (
                  <Link to="/dashboard" className="hidden sm:block">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      Tableau de bord
                    </Button>
                  </Link>
                )}
                {user.isAdmin && (
                  <Link to="/admin" className="hidden sm:block">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                      Admin
                    </Button>
                  </Link>
                )}
                <Link to="/cart" className="relative">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    <ShoppingCart className="h-5 w-5" />
                    {items.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {items.length}
                      </span>
                    )}
                  </Button>
                </Link>
                {user.hasAccess && (
                  <Link to="/dashboard" className="sm:hidden">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                      <LayoutDashboard className="h-5 w-5" />
                    </Button>
                  </Link>
                )}
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-white" />
                  <span className="text-sm text-white hidden sm:inline">{user.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="ml-2 text-white hover:bg-white/10 p-2"
                  >
                    <LogOut className="h-4 w-4" />
                  </Button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hidden sm:block">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10">
                    Connexion
                  </Button>
                </Link>
                <Link to="/login" className="sm:hidden">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="sm" className="bg-white text-[#10ac69] hover:bg-gray-100">
                    Commencer
                  </Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
};