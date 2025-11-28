'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import AuthModal from './AuthModal';

interface AuthContextType {
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthContextProvider({ children }: { children: ReactNode }) {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const openAuthModal = () => {
    console.log('Opening auth modal...');
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    console.log('Closing auth modal...');
    setShowAuthModal(false);
  };

  return (
    <AuthContext.Provider value={{ openAuthModal, closeAuthModal }}>
      {children}
      <AuthModal isOpen={showAuthModal} onClose={closeAuthModal} />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthContextProvider');
  }
  return context;
}
