import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export const SessionMonitor: React.FC = () => {
  const { user, refreshUserProfile } = useAuth();
  const lastActivity = useRef<number>(Date.now());
  const sessionCheckInterval = useRef<NodeJS.Timeout | null>(null);
  const isRefreshing = useRef(false);

  useEffect(() => {
    // Immediate session check on mount (before 60-second interval)
    const checkSessionImmediately = async () => {
      try {
        console.log('📡 SessionMonitor: Running immediate session check on mount...');
        const { data: { session } } = await supabase.auth.getSession();
        
        // If we have a session but no user profile, try to refresh immediately
        if (session?.user && !user && !isRefreshing.current) {
          console.log('📡 SessionMonitor: Immediate check - Session exists but no user profile, refreshing...');
          console.log('📡 SessionMonitor: Immediate check - Session user ID:', session.user.id);
          console.log('📡 SessionMonitor: Immediate check - Current user state:', user ? 'exists' : 'null');
          isRefreshing.current = true;
          try {
            await refreshUserProfile();
            console.log('📡 SessionMonitor: Immediate check - Profile refresh completed');
          } finally {
            isRefreshing.current = false;
            console.log('📡 SessionMonitor: Immediate check - Refresh flag cleared');
          }
        } else if (session?.user && user) {
          console.log('📡 SessionMonitor: Immediate check - Session and user profile both exist');
        } else {
          console.log('📡 SessionMonitor: Immediate check - No session found');
        }
      } catch (error) {
        console.warn('📡 SessionMonitor: Immediate check - Error:', error);
      }
    };

    // Run immediate check
    checkSessionImmediately();

    // Track user activity
    const updateActivity = () => {
      lastActivity.current = Date.now();
    };

    // Add activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Set up session health check (60-second interval for ongoing monitoring)
    sessionCheckInterval.current = setInterval(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // If we have a session but no user profile, try to refresh
        if (session?.user && !user && !isRefreshing.current) {
          console.log('📡 SessionMonitor: Session exists but no user profile, refreshing...');
          console.log('📡 SessionMonitor: Session user ID:', session.user.id);
          console.log('📡 SessionMonitor: Current user state:', user ? 'exists' : 'null');
          isRefreshing.current = true;
          try {
            await refreshUserProfile();
            console.log('📡 SessionMonitor: Profile refresh completed');
          } finally {
            isRefreshing.current = false;
            console.log('📡 SessionMonitor: Refresh flag cleared');
          }
        }
        
        // Check for token expiration
        if (session?.user && user) {
          if (session.expires_at && new Date(session.expires_at) < new Date()) {
            console.log('📡 SessionMonitor: Token expired, attempting refresh...');
            try {
              const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession();
              
              if (refreshError) {
                console.log('📡 SessionMonitor: Token refresh failed, user will need to log in again');
                // Don't clear user state here - let the user continue until they try to use the app
              } else {
                console.log('📡 SessionMonitor: Token refreshed successfully');
              }
            } catch (error) {
              console.log('📡 SessionMonitor: Token refresh error:', error);
            }
          }
        }
        
        // Only clear user if we're certain there's no session
        // This prevents clearing user state during temporary network issues
        if (!session?.user && user) {
          console.log('SessionMonitor: No session but user exists, checking again in 5 seconds...');
          // Wait 5 seconds before clearing to avoid clearing during temporary issues
          setTimeout(async () => {
            const { data: { session: retrySession } } = await supabase.auth.getSession();
            if (!retrySession?.user) {
              console.log('SessionMonitor: Confirmed no session, clearing user...');
              // This will trigger the auth state change handler
            }
          }, 5000);
        }
      } catch (error) {
        console.warn('SessionMonitor: Error checking session health:', error);
      }
    }, 60000); // Check every 60 seconds

    return () => {
      events.forEach(event => {
        document.removeEventListener(event, updateActivity, true);
      });
      if (sessionCheckInterval.current) {
        clearInterval(sessionCheckInterval.current);
      }
    };
  }, [user, refreshUserProfile]);

  // This component doesn't render anything
  return null;
};

