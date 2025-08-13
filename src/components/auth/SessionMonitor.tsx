import React, { useEffect, useRef } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export const SessionMonitor: React.FC = () => {
  const { user, refreshUserProfile } = useAuth();
  const lastActivity = useRef<number>(Date.now());
  const sessionCheckInterval = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Track user activity
    const updateActivity = () => {
      lastActivity.current = Date.now();
    };

    // Add activity listeners
    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      document.addEventListener(event, updateActivity, true);
    });

    // Set up session health check
    sessionCheckInterval.current = setInterval(async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // If we have a session but no user profile, try to refresh
        if (session?.user && !user) {
          console.log('SessionMonitor: Session exists but no user profile, refreshing...');
          await refreshUserProfile();
        }
        
        // If we have a user but no session, clear the user
        if (!session?.user && user) {
          console.log('SessionMonitor: No session but user exists, clearing...');
          // This will trigger the auth state change handler
        }
      } catch (error) {
        console.warn('SessionMonitor: Error checking session health:', error);
      }
    }, 30000); // Check every 30 seconds

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

