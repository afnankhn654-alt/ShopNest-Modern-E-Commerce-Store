import React, { useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import * as ReactRouterDOM from 'react-router-dom';
import { SunIcon, MoonIcon, Squares2X2Icon, Bars3Icon, HeartIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

const { useNavigate, Link } = ReactRouterDOM as any;

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, setTheme, layout, setLayout } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0">
                      <img className="h-24 w-24 rounded-full" src={`https://i.pravatar.cc/150?u=${user.email}`} alt="User avatar" />
                  </div>
                  <div>
                      <h1 className="text-3xl font-bold text-center sm:text-left">{user.name}</h1>
                      <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">{user.email}</p>
                  </div>
              </div>
              
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <Link to="/wishlist" className="flex justify-between items-center p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                      <div className="flex items-center space-x-3">
                          <HeartIcon className="h-6 w-6 text-primary-500"/>
                          <span className="text-lg font-medium">My Wishlist</span>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </Link>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <h2 className="text-2xl font-bold mb-4">Personalization</h2>
                  <div className="space-y-6">
                      {/* Theme Preference */}
                      <div>
                          <h3 className="text-lg font-medium">Theme</h3>
                          <div className="mt-2 flex space-x-2">
                              <button
                                  onClick={() => setTheme('light')}
                                  className={`flex items-center space-x-2 px-4 py-2 rounded-md border-2 ${theme === 'light' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                              >
                                  <SunIcon className="h-5 w-5"/>
                                  <span>Light</span>
                              </button>
                              <button
                                  onClick={() => setTheme('dark')}
                                  className={`flex items-center space-x-2 px-4 py-2 rounded-md border-2 ${theme === 'dark' ? 'border-primary-500 bg-primary-900/50' : 'border-gray-300 dark:border-gray-600'}`}
                              >
                                  <MoonIcon className="h-5 w-5"/>
                                  <span>Dark</span>
                              </button>
                          </div>
                      </div>
                      {/* Layout Preference */}
                      <div>
                          <h3 className="text-lg font-medium">Product View</h3>
                          <div className="mt-2 flex space-x-2">
                              <button
                                  onClick={() => setLayout('grid')}
                                  className={`flex items-center space-x-2 px-4 py-2 rounded-md border-2 ${layout === 'grid' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' : 'border-gray-300 dark:border-gray-600'}`}
                              >
                                  <Squares2X2Icon className="h-5 w-5"/>
                                  <span>Grid</span>
                              </button>
                              <button
                                  onClick={() => setLayout('list')}
                                  className={`flex items-center space-x-2 px-4 py-2 rounded-md border-2 ${layout === 'list' ? 'border-primary-500 bg-primary-900/50' : 'border-gray-300 dark:border-gray-600'}`}
                              >
                                  <Bars3Icon className="h-5 w-5"/>
                                  <span>List</span>
                              </button>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <button
                      onClick={logout}
                      className="w-full sm:w-auto bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
                  >
                      Logout
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProfilePage;