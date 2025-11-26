import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { auth } from '../config/firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  getAdditionalUserInfo
} from 'firebase/auth';
import Spinner from '../components/Spinner';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  isNewGoogleUser: boolean;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  updateUserName: (name: string) => Promise<void>;
  completeGoogleOnboarding: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isNewGoogleUser, setIsNewGoogleUser] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        // User is signed in
        const appUser: User = {
          id: firebaseUser.uid,
          name: firebaseUser.displayName || 'User',
          email: firebaseUser.email || '',
          photoURL: firebaseUser.photoURL,
        };
        setUser(appUser);
      } else {
        // User is signed out
        setUser(null);
      }
      setLoading(false); // Auth state determined
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    await signInWithEmailAndPassword(auth, email, pass);
  };

  const signup = async (name: string, email: string, pass: string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    if (userCredential.user) {
      await updateProfile(userCredential.user, {
        displayName: name,
      });
      setUser({
        id: userCredential.user.uid,
        name: name,
        email: email,
        photoURL: null,
      });
    }
  };
  
  const updateUserName = async (name: string) => {
    if (auth.currentUser) {
        await updateProfile(auth.currentUser, {
            displayName: name,
        });
        // The onAuthStateChanged listener will automatically pick up the change
        // but we can update state immediately for better UX
        setUser(prev => prev ? { ...prev, name } : null);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const additionalInfo = getAdditionalUserInfo(result);
    // If it's a new user and they don't have a display name set somehow
    if (additionalInfo?.isNewUser && !result.user.displayName) {
        setIsNewGoogleUser(true);
    }
  };
  
  const completeGoogleOnboarding = () => {
    setIsNewGoogleUser(false);
  };

  const value = { user, isAuthenticated: !!user, loading, isNewGoogleUser, login, signup, logout, loginWithGoogle, updateUserName, completeGoogleOnboarding };

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <div className="flex items-center justify-center min-h-screen animate-gradient-bg">
          <Spinner />
        </div>
      ) : children}
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
