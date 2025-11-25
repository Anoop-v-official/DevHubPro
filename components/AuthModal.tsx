'use client';

import { signIn } from 'next-auth/react';
import { X, Github } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  if (!isOpen) return null;

  const handleGithubSignIn = () => {
    signIn('github', { callbackUrl: '/' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-md w-full p-8 animate-slide-up border border-gray-200 dark:border-gray-800">
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
        </div>

        {/* Sign In Options */}
        <div className="space-y-4">
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
  );
}
