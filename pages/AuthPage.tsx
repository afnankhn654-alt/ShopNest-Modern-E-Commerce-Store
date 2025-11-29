import React, { useState, FormEvent, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import * as ReactRouterDOM from 'react-router-dom';
import { LockClosedIcon, UserCircleIcon, ShoppingBagIcon, SparklesIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

const { useNavigate } = ReactRouterDOM as any;

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.592,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

const CreativeVisuals: React.FC = () => (
    <div className="hidden lg:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-gray-900 via-primary-900 to-purple-900 dark:from-gray-900 dark:via-primary-950 dark:to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20"></div>

        <div className="w-64 h-64 perspective-1000">
            <div className="w-full h-full preserve-3d animate-cube-rotate">
                {[
                    'translateZ(128px)',
                    'rotateY(90deg) translateZ(128px)',
                    'rotateY(180deg) translateZ(128px)',
                    'rotateY(-90deg) translateZ(128px)',
                    'rotateX(90deg) translateZ(128px)',
                    'rotateX(-90deg) translateZ(128px)'
                ].map((transform, i) => (
                    <div 
                        key={i} 
                        className="absolute w-64 h-64 border-2 border-primary-400/50 bg-primary-500/10 backdrop-blur-sm"
                        style={{ transform }}
                    ></div>
                ))}
            </div>
        </div>
        
        <h2 className="text-3xl font-bold text-white mt-12 mb-4 text-center">Your Gateway to a Smarter Store</h2>
        <p className="text-primary-200/70 text-center max-w-sm">Secure, personalized, and seamless access to a world of products tailored for you.</p>

        {[
          { icon: LockClosedIcon, className: 'top-24 left-16' },
          { icon: UserCircleIcon, className: 'top-1/2 left-8', delay: '1.5s' },
          { icon: ShoppingBagIcon, className: 'bottom-24 right-16', delay: '0.5s' },
          { icon: SparklesIcon, className: 'top-20 right-20', delay: '1s' }
        ].map((item, i) => (
            <item.icon 
                key={i}
                className={`absolute h-8 w-8 text-primary-300/50 animate-float ${item.className}`} 
                style={{ animationDelay: item.delay || '0s', animationDuration: '6s' }} 
            />
        ))}
    </div>
);


const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup, loginWithGoogle, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleEmailSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
    } catch (err: any) {
      let errorMessage = 'Authentication failed. Please check your credentials.';
      if (err.code) {
        switch (err.code) {
          case 'auth/email-already-in-use':
            errorMessage = 'This email is already registered. Please login.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Please enter a valid email address.';
            break;
          case 'auth/weak-password':
            errorMessage = 'Password should be at least 6 characters.';
            break;
          case 'auth/user-not-found':
          case 'auth/wrong-password':
          case 'auth/invalid-credential':
            errorMessage = 'Invalid email or password.';
            break;
          default:
            console.error('Firebase Auth Error:', err);
        }
      }
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithGoogle();
    } catch (err: any) {
      console.error("Google Sign-In Error:", err);
      let errorMessage = 'Failed to sign in with Google. Please try again.';
      if(err.code === 'auth/popup-closed-by-user') {
          errorMessage = 'Sign-in window was closed. Please try again.';
      }
      setError(errorMessage);
      setLoading(false);
    }
  };

  const formContent = (
      <div key={isLogin ? 'login' : 'signup'} className="animate-fade-in">
          <h2 className="text-3xl font-bold text-center mb-2 text-gray-900 dark:text-white">{isLogin ? 'Welcome Back!' : 'Create an Account'}</h2>
          <p className="text-center text-gray-500 dark:text-gray-400 mb-6">{isLogin ? 'Sign in to access your world.' : 'Join us and start your journey.'}</p>
          
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700/50 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 transition-colors group"
          >
            <GoogleIcon />
            <span className="group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">Continue with Google</span>
          </button>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
            <span className="mx-4 text-gray-400 text-xs uppercase">OR</span>
            <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            {!isLogin && (
              <div className="animate-slide-in-down">
                <label htmlFor="name" className="sr-only">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  placeholder="Your Name"
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Email Address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password"className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-2 border-gray-200 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 transition-colors"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
              >
                {showPassword ? <EyeSlashIcon className="h-5 w-5"/> : <EyeIcon className="h-5 w-5"/>}
              </button>
            </div>
            {error && <p className="text-red-500 text-sm text-center pt-2">{error}</p>}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:bg-primary-300 disabled:cursor-not-allowed transition-transform hover:scale-105"
              >
                {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
              </button>
            </div>
          </form>

          <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="font-medium text-primary-600 hover:text-primary-500 hover:underline">
              {isLogin ? 'Sign up now' : 'Log in'}
            </button>
          </p>
      </div>
  );

  return (
    <div className="flex-grow flex items-center justify-center min-h-[80vh] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm lg:max-w-5xl mx-auto lg:grid lg:grid-cols-2 rounded-2xl shadow-2xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
        
        <CreativeVisuals />

        <div className="w-full glass-panel p-8 sm:p-12 flex items-center justify-center">
            <div className="w-full max-w-md">
              {formContent}
            </div>
        </div>

      </div>
    </div>
  );
};

export default AuthPage;