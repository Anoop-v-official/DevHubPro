'use client';

import { signIn } from 'next-auth/react';
import { X, Github, Mail } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  console.log('AuthModal rendered, isOpen:', isOpen);

  if (!isOpen) return null;

  const handleGithubSignIn = () => {
    console.log('GitHub sign in clicked');
    signIn('github', { callbackUrl: '/' });
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
    signIn('google', { callbackUrl: '/' });
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Centering Container */}
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Modal */}
        <div
          className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in border border-gray-200 dark:border-gray-800 z-[101] my-8"
          onClick={(e) => e.stopPropagation()}
        >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
            <span className="text-3xl">🚀</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome to DevHub Pro
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to access all features
          </p>

          {/* Registration Coming Soon Notice */}
          <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm font-medium text-blue-900 dark:text-blue-100">
              📢 Registration Coming Soon!
            </p>
            <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
              Currently, sign-in is available by invitation only
            </p>
          </div>
        </div>

        {/* Sign In Options */}
        <div className="space-y-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full flex items-center justify-center gap-3 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-300 dark:border-gray-600 py-4 px-6 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <button
            onClick={handleGithubSignIn}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 px-6 rounded-xl font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
          >
            <Github className="w-5 h-5" />
            Continue with GitHub
          </button>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400 pt-4">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            What you'll get:
          </p>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Submit articles and error solutions
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Vote and bookmark content
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Build your developer reputation
            </li>
            <li className="flex items-center gap-2">
              <span className="text-green-500">✓</span>
              Save your preferences
            </li>
          </ul>
        </div>
        </div>
      </div>
    </div>
  );
}
