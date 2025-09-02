import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
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
  const isInitialized = useRef(false);
  const profileFetchInProgress = useRef(false);
  
  console.log('AuthProvider: Component initialized');

  // Simplified profile fetching without complex retry logic
  const fetchUserProfile = async (supabaseUser: SupabaseUser): Promise<User | null> => {
    if (profileFetchInProgress.current) {
      console.log('AuthProvider: Profile fetch already in progress, skipping');
      return null;
    }

    profileFetchInProgress.current = true;
    console.log('AuthProvider: Fetching user profile for:', supabaseUser.id);

    try {
      // Simple query with 5 second timeout
      const { data, error } = await Promise.race([
        supabase
          .from('users')
          .select('id,email,name,has_access,is_admin,access_expires_at')
          .eq('id', supabaseUser.id)
          .maybeSingle(),
        new Promise<{ data: null; error: { message: string } }>((resolve) => 
          setTimeout(() => resolve({ data: null, error: { message: 'Query timeout' } }), 5000)
        )
      ]);

      if (error) {
        console.error('AuthProvider: Error querying users table:', error);
        return null;
      }

      if (!data) {
        console.log('AuthProvider: No user profile found, creating new one...');
        // Create new user profile
        const newUserData = {
          id: supabaseUser.id,
          email: supabaseUser.email!,
          name: supabaseUser.user_metadata?.name || supabaseUser.email!.split('@')[0],
          has_access: false,
          is_admin: false
        };

        const { data: insertedUser, error: insertError } = await supabase
          .from('users')
          .upsert(newUserData)
          .select()
          .single();

        if (insertError) {
          console.error('AuthProvider: Error creating user profile:', insertError);
          return null;
        }

        if (insertedUser) {
          return {
            id: insertedUser.id,
            email: insertedUser.email,
            name: insertedUser.name,
            hasAccess: insertedUser.has_access,
            isAdmin: insertedUser.is_admin || false,
            accessExpiresAt: insertedUser.access_expires_at ? new Date(insertedUser.access_expires_at) : undefined
          };
        }
        return null;
      }

      // Return existing user profile
      return {
        id: data.id,
        email: data.email,
        name: data.name,
        hasAccess: data.has_access,
        isAdmin: data.is_admin || false,
        accessExpiresAt: data.access_expires_at ? new Date(data.access_expires_at) : undefined,
      };

    } catch (error) {
      console.error('AuthProvider: Unexpected error in fetchUserProfile:', error);
      return null;
    } finally {
      profileFetchInProgress.current = false;
    }
  };

  // Initialize authentication state
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    console.log('AuthProvider: Initializing authentication state');

    const initializeAuth = async () => {
      try {
        // Get current session
        const { data: { session } } = await supabase.auth.getSession();
        console.log('AuthProvider: Current session:', session ? 'exists' : 'none');

        if (session?.user) {
          const profile = await fetchUserProfile(session.user);
          if (profile) {
            console.log('AuthProvider: Setting user from session:', profile);
            setUser(profile);
          }
        }
      } catch (error) {
        console.error('AuthProvider: Error during initialization:', error);
      } finally {
        // Only set loading to false after we've attempted to restore the session
        // This prevents premature redirects in ProtectedRoute
        setTimeout(() => setLoading(false), 100);
      }
    };

    initializeAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider: Auth state changed:', event, session ? 'with user' : 'no user');

      if (event === 'SIGNED_IN' && session?.user) {
        console.log('AuthProvider: SIGNED_IN event detected, fetching profile...');
        const profile = await fetchUserProfile(session.user);
        if (profile) {
          console.log('AuthProvider: Profile loaded successfully, setting user:', profile);
          console.log('AuthProvider: User hasAccess:', profile.hasAccess);
          setUser(profile);
        } else {
          console.error('AuthProvider: Failed to load user profile after SIGNED_IN');
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('AuthProvider: User signed out');
        setUser(null);
      }
      
      // Don't set loading to false here to avoid race conditions
      // Only set it during initialization
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    console.log('AuthProvider: Login attempt for:', email);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      console.error('AuthProvider: Login error:', error);
      throw new Error(error.message);
    }
    
    console.log('AuthProvider: Login successful, waiting for profile to load...');
    
    // Wait for the user profile to be loaded via onAuthStateChange
    return new Promise<void>((resolve, reject) => {
      let attempts = 0;
      const maxAttempts = 30; // 3 seconds max wait
      
      const checkForUser = setInterval(async () => {
        attempts++;
        console.log(`AuthProvider: Checking for user profile... Attempt ${attempts}/${maxAttempts}`);
        
        // Check the actual Supabase session instead of React state
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          console.log('AuthProvider: Session found, fetching profile...');
          
          try {
            const profile = await fetchUserProfile(session.user);
            if (profile) {
              console.log('AuthProvider: Profile loaded successfully:', profile);
              setUser(profile);
              clearInterval(checkForUser);
              resolve();
              return;
            }
          } catch (err) {
            console.error('AuthProvider: Profile fetch failed:', err);
          }
        }
        
        if (attempts >= maxAttempts) {
          console.error('AuthProvider: Timeout waiting for user profile');
          clearInterval(checkForUser);
          reject(new Error('Timeout waiting for user profile to load'));
        }
      }, 100);
    });
  };

  const register = async (email: string, password: string, name: string) => {
    console.log('AuthProvider: Register attempt for:', email, 'with name:', name);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name
        }
      }
    });

    if (error) {
      console.error('AuthProvider: Registration error:', error);
      throw new Error(error.message);
    }

    console.log('AuthProvider: Registration successful');
  };

  const refreshUserProfile = async () => {
    console.log('AuthProvider: Refreshing user profile...');
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      const profile = await fetchUserProfile(session.user);
      if (profile) {
        setUser(profile);
      }
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

  console.log('AuthProvider: Current state - user:', user ? 'exists' : 'null', 'loading:', loading);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};