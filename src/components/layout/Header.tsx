import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { Button } from '../ui/Button';
import { User, LogOut, LayoutDashboard, ShoppingCart } from 'lucide-react';

interface HeaderProps {
  variant?: 'default' | 'dark';
}

export const Header: React.FC<HeaderProps> = ({ variant = 'default' }) => {
  const { user, logout } = useAuth();
  const { items } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const bgColor = variant === 'dark' ? 'bg-[#063D3A]' : 'bg-[#10ac69]';
  
  return (
    <header className={`${bgColor} shadow-sm sticky top-0 z-50`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/logo_white.png" 
              alt="Le Dojo Financier" 
              className="h-12 sm:h-[51px] w-auto object-contain max-w-[150px] sm:max-w-[200px]"
              style={{ 
                imageRendering: 'auto'
              }}
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
                  <Button variant="ghost" size="lg" className="text-white hover:bg-white/10">
                    Mon compte
                  </Button>
                </Link>
                <Link to="/login" className="sm:hidden">
                  <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 p-2">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="secondary" size="lg" className="bg-white text-[#10ac69] hover:bg-gray-100 rounded-md px-4 py-1 text-base font-semibold">
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