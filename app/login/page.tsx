'use client';

import { useState } from 'react';
import { signIn, getSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'react-hot-toast';

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
};

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password');
      return;
    }

    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password. Please try again.');
        return;
      }

      const session = await getSession();
      
      if (!session) {
        setError('Failed to create a session. Please try again.');
        return;
      }

      toast.success('Successfully signed in!');

      if (session.user?.role === 'ADMIN') {
        router.push(callbackUrl.startsWith('/admin') ? callbackUrl : '/admin');
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          className="text-center"
        >
          <Link
            href="/"
            className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300 mb-4"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to home
          </Link>
          <h2 className="mt-2 text-3xl font-extrabold text-slate-900 dark:text-white">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Or{' '}
            <Link href="/trial" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              start your free trial
            </Link>
          </p>
        </motion.div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.1 }}
          className="mt-8 bg-white dark:bg-slate-800 py-8 px-4 shadow rounded-lg sm:px-10"
        >
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 mb-4 rounded">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Email address
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isLoading}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-white"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  disabled={isLoading}
                  className="appearance-none block w-full pl-10 px-3 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm dark:bg-slate-800 dark:text-white"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-slate-300 dark:border-slate-700 rounded dark:bg-slate-800"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link href="/forgot-password" className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <Lock className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" />
                </span>
                {isLoading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-300 dark:border-slate-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                  Don't have an account?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/trial"
                className="w-full flex items-center justify-center px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-md shadow-sm text-sm font-medium text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
              >
                Start your free trial
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial="initial"
          animate="animate"
          variants={fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <p className="text-xs text-slate-500 dark:text-slate-400">
            By signing in, you agree to our{' '}
            <Link href="/terms" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300">
              Privacy Policy
            </Link>.
          </p>
        </motion.div>
      </div>
    </div>
  );
}