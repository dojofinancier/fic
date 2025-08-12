import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User as SupabaseUser } from '@supabase/supabase-js';

console.log('AuthContext: Module loaded');

interface User {
  id: string;
  email: string;
  name: string;
  hasAccess: boolean;
  isAdmin: boolean;
  accessExpiresAt?: Date;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  
  console.log('AuthProvider: Component initialized');

  useEffect(() => {
    console.log('AuthProvider: useEffect triggered');
    // Vérifier la session existante
    const getSession = async () => {
      console.log('AuthProvider: Getting session...');
      const { data: { session } } = await supabase.auth.getSession();
      console.log('AuthProvider: Session data:', session);
      if (session?.user) {
        console.log('AuthProvider: User found in session, fetching profile...');
        await fetchUserProfile(session.user);
      } else {
        console.log('AuthProvider: No user in session');
      }
      setLoading(false);
      console.log('AuthProvider: Loading set to false');
    };

    getSession();

    // Écouter les changements d'authentification
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider: Auth state changed:', event, session);
      if (session?.user) {
        console.log('AuthProvider: User in auth state change, fetching profile...');
        await fetchUserProfile(session.user);
      } else {
        console.log('AuthProvider: No user in auth state change');
        setUser(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    console.log('AuthProvider: Fetching user profile for:', supabaseUser.id);
    const timeoutMs = 12000; // Allow more time to avoid transient timeouts
    const runOnce = async (): Promise<User | null> => {
      console.log('AuthProvider: Querying users table...');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
      try {
        const { data, error } = await supabase
          .from('users')
          .select('id,email,name,has_access,is_admin,access_expires_at')
          .eq('id', supabaseUser.id)
          .maybeSingle({ head: false, count: 'exact' });
        clearTimeout(timeoutId);
        if (error) throw error;
        if (!data) return null;
        const profile: User = {
          id: data.id,
          email: data.email,
          name: data.name,
          hasAccess: data.has_access,
          isAdmin: data.is_admin || false,
          accessExpiresAt: data.access_expires_at ? new Date(data.access_expires_at) : undefined,
        };
        // Cache last successful profile to localStorage
        try { localStorage.setItem('df_user_profile', JSON.stringify(profile)); } catch {}
        return profile;
      } catch (err) {
        clearTimeout(timeoutId);
        console.error('AuthProvider: Error querying users table:', err);
        return null;
      }
    };

    try {
      // Try up to two attempts before fallback (handles cold starts)
      let profile = await runOnce();
      if (!profile) {
        await new Promise(r => setTimeout(r, 800));
        profile = await runOnce();
      }

      if (profile) {
        console.log('AuthProvider: Setting user from database:', profile);
        setUser(profile);
        return;
      }

      // If not found, create it
      console.log('AuthProvider: User profile not found, creating new profile...');
        // Profil pas trouvé, le créer
      const newUserData = {
        id: supabaseUser.id,
        email: supabaseUser.email!,
        name: supabaseUser.user_metadata?.name || supabaseUser.email!.split('@')[0],
        has_access: false,
        is_admin: false
      };

      console.log('AuthProvider: Inserting new user profile:', newUserData);
      const { data: insertedUser, error: insertError } = await supabase
        .from('users')
        .upsert(newUserData)
        .select()
        .single();

      console.log('AuthProvider: Insert result:', { insertedUser, insertError });
      if (insertError) throw insertError;

      if (insertedUser) {
        const profileCreated: User = {
          id: insertedUser.id,
          email: insertedUser.email,
          name: insertedUser.name,
          hasAccess: insertedUser.has_access,
          isAdmin: insertedUser.is_admin || false,
          accessExpiresAt: insertedUser.access_expires_at ? new Date(insertedUser.access_expires_at) : undefined
        };
        try { localStorage.setItem('df_user_profile', JSON.stringify(profileCreated)); } catch {}
        console.log('AuthProvider: Setting newly created user:', profileCreated);
        setUser(profileCreated);
        return;
      }
      console.log('AuthProvider: Profile fetch completed successfully');
    } catch (error) {
      console.error('Erreur lors de la récupération du profil:', error);

      // En cas d'erreur/timeout, si un profil est en cache, l'utiliser
      try {
        const cached = localStorage.getItem('df_user_profile');
        if (cached) {
          const parsed = JSON.parse(cached) as User;
          console.log('AuthProvider: Using cached user profile');
          setUser(parsed);
          return;
        }
      } catch {}
      // Sinon, ne pas invalider la session: conserver l'état actuel si déjà défini
      if (!user) {
        console.log('AuthProvider: Using minimal fallback profile due to error/timeout');
        setUser({
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name || supabaseUser.email!.split('@')[0],
          hasAccess: false,
          isAdmin: false
        });
      }
    }
  };

  const login = async (email: string, password: string) => {
    console.log('AuthProvider: Login attempt for:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    console.log('AuthProvider: Login result:', { error });

    if (error) {
      console.error('AuthProvider: Login error:', error);
      throw new Error(error.message);
    }
    
    console.log('AuthProvider: Login successful');
  };

  const register = async (email: string, password: string, name: string) => {
    console.log('AuthProvider: Register attempt for:', email, 'with name:', name);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        },
        emailRedirectTo: undefined // Éviter les redirections automatiques
      }
    });

    console.log('AuthProvider: Register result:', { data, error });

    if (error) {
      console.error('Registration error:', error);
      throw new Error(error.message);
    }

    console.log('Registration successful, user should be automatically signed in');
    // L'utilisateur est automatiquement connecté après inscription avec Supabase
    // Le onAuthStateChange va se déclencher automatiquement
  };

  const refreshUserProfile = async () => {
    console.log('AuthProvider: Refreshing user profile...');
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      await fetchUserProfile(session.user);
    }
  };

  const logout = async () => {
    console.log('AuthProvider: Logout attempt');
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('AuthProvider: Logout error:', error);
      throw new Error(error.message);
    }
    console.log('AuthProvider: Logout successful');
    setUser(null);
  };

  console.log('AuthProvider: Current state - user:', user, 'loading:', loading);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};