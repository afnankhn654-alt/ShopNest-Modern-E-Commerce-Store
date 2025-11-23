
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, pass: string) => {
    // Mock login
    console.log('Logging in with:', email, pass);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: 'user-123', name: 'John Doe', email };
    setUser(mockUser);
  };

  const signup = async (name: string, email: string, pass: string) => {
    // Mock signup
    console.log('Signing up with:', name, email, pass);
    await new Promise(resolve => setTimeout(resolve, 500));
    const mockUser: User = { id: 'user-123', name, email };
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  const value = { user, isAuthenticated: !!user, login, signup, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
