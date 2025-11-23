
import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import * as ReactRouterDOM from 'react-router-dom';
import { SunIcon, MoonIcon, Squares2X2Icon, Bars3Icon, HeartIcon, ChevronRightIcon, PaintBrushIcon, CursorArrowRaysIcon, CheckIcon } from '@heroicons/react/24/outline';

const { useNavigate, Link } = ReactRouterDOM as any;

const PREDEFINED_THEMES = [
    { name: 'Blue', color: '#3b82f6' },
    { name: 'Purple', color: '#8b5cf6' },
    { name: 'Green', color: '#10b981' },
    { name: 'Red', color: '#ef4444' },
    { name: 'Orange', color: '#f97316' },
    { name: 'Pink', color: '#ec4899' },
];

const CURSOR_STYLES = [
    { id: 'default', name: 'System Default', icon: 'Cursor' },
    { id: 'retro', name: 'Retro Pixel', icon: '👾' },
    { id: 'neon', name: 'Neon Glow', icon: '⚡' },
    { id: 'minimal', name: 'Minimal Crosshair', icon: '✛' },
];

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { theme, setTheme, layout, setLayout, primaryColor, setPrimaryColor, cursorStyle, setCursorStyle } = useTheme();
  const navigate = useNavigate();
  const [customColor, setCustomColor] = useState(primaryColor);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomColor(e.target.value);
      setPrimaryColor(e.target.value);
  };

  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="flex-shrink-0 relative">
                      <img className="h-24 w-24 rounded-full border-4 border-primary-100 dark:border-primary-900" src={`https://i.pravatar.cc/150?u=${user.email}`} alt="User avatar" />
                      <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div>
                      <h1 className="text-3xl font-bold text-center sm:text-left text-gray-900 dark:text-white">{user.name}</h1>
                      <p className="text-gray-500 dark:text-gray-400 text-center sm:text-left">{user.email}</p>
                      <div className="mt-2 flex flex-wrap gap-2 justify-center sm:justify-start">
                          <span className="px-2 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-medium">Member</span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">PC User</span>
                      </div>
                  </div>
              </div>
              
              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <Link to="/wishlist" className="flex justify-between items-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border border-gray-100 dark:border-gray-700">
                      <div className="flex items-center space-x-4">
                          <div className="p-2 bg-white dark:bg-gray-800 rounded-full shadow-sm">
                             <HeartIcon className="h-6 w-6 text-primary-500"/>
                          </div>
                          <span className="text-lg font-medium text-gray-900 dark:text-white">My Wishlist</span>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                  </Link>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
                  <div className="flex items-center gap-2 mb-6">
                      <PaintBrushIcon className="h-6 w-6 text-primary-500" />
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personalization</h2>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Theme Mode */}
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                             Appearance
                          </h3>
                          <div className="flex gap-2">
                              <button
                                  onClick={() => setTheme('light')}
                                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${theme === 'light' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
                              >
                                  <SunIcon className="h-5 w-5"/>
                                  <span>Light</span>
                              </button>
                              <button
                                  onClick={() => setTheme('dark')}
                                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${theme === 'dark' ? 'border-primary-500 bg-primary-900/50 text-primary-300' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
                              >
                                  <MoonIcon className="h-5 w-5"/>
                                  <span>Dark</span>
                              </button>
                          </div>
                      </div>

                      {/* Layout Preference */}
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                          <h3 className="text-lg font-bold mb-4">Product View</h3>
                          <div className="flex gap-2">
                              <button
                                  onClick={() => setLayout('grid')}
                                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${layout === 'grid' ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
                              >
                                  <Squares2X2Icon className="h-5 w-5"/>
                                  <span>Grid</span>
                              </button>
                              <button
                                  onClick={() => setLayout('list')}
                                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 transition-all ${layout === 'list' ? 'border-primary-500 bg-primary-900/50 text-primary-300' : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'}`}
                              >
                                  <Bars3Icon className="h-5 w-5"/>
                                  <span>List</span>
                              </button>
                          </div>
                      </div>
                      
                      {/* Color Theme */}
                      <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                           <h3 className="text-lg font-bold mb-4">Color Theme</h3>
                           <div className="flex flex-wrap gap-4 items-center">
                               {PREDEFINED_THEMES.map((t) => (
                                   <button
                                       key={t.name}
                                       onClick={() => setPrimaryColor(t.color)}
                                       className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-transform hover:scale-110 ${primaryColor === t.color ? 'border-gray-900 dark:border-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : 'border-transparent'}`}
                                       style={{ backgroundColor: t.color }}
                                       title={t.name}
                                   >
                                       {primaryColor === t.color && <CheckIcon className="h-6 w-6 text-white drop-shadow-md" />}
                                   </button>
                               ))}
                               
                               <div className="relative group">
                                   <input 
                                     type="color" 
                                     value={customColor}
                                     onChange={handleCustomColorChange}
                                     className="w-12 h-12 rounded-full p-0 border-0 overflow-hidden cursor-pointer"
                                     title="Custom Color"
                                   />
                                   <div className="absolute inset-0 rounded-full border-2 border-gray-300 dark:border-gray-600 pointer-events-none group-hover:border-gray-400"></div>
                               </div>
                               <span className="text-sm text-gray-500 ml-2">Choose your vibe</span>
                           </div>
                      </div>

                      {/* Cursor Style */}
                      <div className="md:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
                           <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                               <CursorArrowRaysIcon className="h-5 w-5" /> Cursor Style
                           </h3>
                           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                               {CURSOR_STYLES.map((style) => (
                                   <button
                                       key={style.id}
                                       onClick={() => setCursorStyle(style.id)}
                                       className={`flex flex-col items-center justify-center p-4 rounded-lg border-2 transition-all ${cursorStyle === style.id ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700'}`}
                                   >
                                       <span className="text-2xl mb-2">{style.icon}</span>
                                       <span className="text-sm font-medium">{style.name}</span>
                                   </button>
                               ))}
                           </div>
                      </div>
                  </div>
              </div>

              <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-end">
                  <button
                      onClick={logout}
                      className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/30"
                  >
                      Sign Out
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProfilePage;
