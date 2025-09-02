import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { GraduationCap } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LoginPage: Form submitted', { email });
    setLoading(true);
    setError('');

    try {
      console.log('LoginPage: Attempting login...');
      await login(email, password);
      console.log('LoginPage: Login successful, navigating to:', from);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Auth error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      console.log('LoginPage: Setting loading to false');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold text-[#3b3b3b]">
          Connectez-vous à votre compte
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Vous n'avez pas de compte ?{' '}
          <Link
            to="/pricing"
            className="font-medium text-[#10ac69] hover:text-[#0e9558]"
          >
            Achetez l'accès complet
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <form onSubmit={handleSubmit} className="space-y-6">
            <Input
              label="Adresse courriel"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Entrez votre courriel"
            />
            
            <Input
              label="Mot de passe"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez votre mot de passe"
            />

            {error && (
              <div className="text-red-600 text-sm text-center">{error}</div>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading}
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </Button>
            
            {loading && (
              <div className="text-center text-sm text-gray-500">
                <div className="animate-pulse">Préparation de votre session...</div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};