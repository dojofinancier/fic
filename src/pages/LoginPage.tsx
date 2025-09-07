import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Card } from '../components/ui/Card';
import { GraduationCap, CheckCircle, Loader2 } from 'lucide-react';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [loginStep, setLoginStep] = useState('');
  const [error, setError] = useState('');

  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  // Function to wait for user state to be updated after login
  const waitForUserState = async (): Promise<void> => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const timeout = 10000; // 10 second timeout
      
      const checkUser = async () => {
        try {
          // First check if AuthContext user is available
          if (user && user.id) {
            console.log('LoginPage: User state updated via AuthContext, ready to navigate');
            resolve();
            return;
          }
          
          // Fallback: Check Supabase session directly
          const { data: { session } } = await supabase.auth.getSession();
          if (session?.user) {
            console.log('LoginPage: Session found, waiting for AuthContext to update...');
            // Give AuthContext a moment to process the session
            setTimeout(() => {
              if (user && user.id) {
                console.log('LoginPage: AuthContext updated, ready to navigate');
                resolve();
              } else {
                // If AuthContext still hasn't updated, proceed anyway
                console.log('LoginPage: Proceeding with session-based navigation');
                resolve();
              }
            }, 500);
            return;
          }
          
          if (Date.now() - startTime > timeout) {
            console.error('LoginPage: Timeout waiting for user state');
            reject(new Error('Timeout: La session prend trop de temps à se charger'));
            return;
          }
          
          // Check again in 200ms
          setTimeout(checkUser, 200);
        } catch (error) {
          console.error('LoginPage: Error checking user state:', error);
          reject(error);
        }
      };
      
      // Start checking after a small delay to allow auth state change to process
      setTimeout(checkUser, 100);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('LoginPage: Form submitted', { email });
    setLoading(true);
    setError('');
    setLoginStep('');

    try {
      // Step 1: Authentication
      setLoginStep('Authentification...');
      console.log('LoginPage: Attempting login...');
      await login(email, password);
      console.log('LoginPage: Login successful');
      
      // Step 2: Wait for user state to update
      setLoginStep('Préparation de votre session...');
      await waitForUserState();
      
      // Step 3: Navigate
      setLoginStep('Redirection...');
      console.log('LoginPage: Navigating to:', from);
      navigate(from, { replace: true });
      
    } catch (err) {
      console.error('LoginPage: Auth error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.');
    } finally {
      console.log('LoginPage: Setting loading to false');
      setLoading(false);
      setLoginStep('');
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
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Connexion en cours...</span>
                </div>
              ) : (
                'Se connecter'
              )}
            </Button>
            
            {loading && loginStep && (
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-[#10ac69]">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>{loginStep}</span>
                </div>
                <div className="mt-2 text-xs text-gray-500">
                  Veuillez patienter pendant que nous préparons votre session...
                </div>
              </div>
            )}
          </form>
        </Card>
      </div>
    </div>
  );
};