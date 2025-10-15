'use client';

import { useEffect, useState } from 'react';
import { Session } from 'next-auth';
import { signOut, useSession } from 'next-auth/react';

/**
 * Custom hook to handle user session with role-based checks
 * @returns Object containing session data and helper methods
 */
export function useUserSession() {
  const { data: session, status } = useSession({
    required: false,
    onUnauthenticated() {
      // Handle unauthenticated state if needed
    },
  });
  
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      if (status === 'loading') {
        // Still loading session
        return;
      }
      
      if (status === 'authenticated' && session?.user) {
        setIsAdmin(session.user.role === 'ADMIN');
      } else {
        setIsAdmin(false);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error in useUserSession:', err);
      setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      setIsLoading(false);
    }
  }, [session, status]);

  const handleSignOut = async () => {
    try {
      await signOut({ 
        callbackUrl: '/',
        redirect: true
      });
    } catch (err) {
      console.error('Error during sign out:', err);
      throw err;
    }
  };

  return {
    session: session || null,
    isAdmin,
    isLoading,
    error,
    isAuthenticated: status === 'authenticated',
    handleSignOut,
  };
}

// Create a type for the hook's return value
export type UseUserSessionReturn = ReturnType<typeof useUserSession>;
