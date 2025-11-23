import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme, ThemeMode, CustomThemeColors } from '../contexts/ThemeContext';
import { useDeviceDetection } from '../hooks/useDeviceDetection';
import * as ReactRouterDOM from 'react-router-dom';
import { 
    SunIcon, MoonIcon, Squares2X2Icon, Bars3Icon, HeartIcon, 
    ChevronRightIcon, PaintBrushIcon, CursorArrowRaysIcon, 
    CheckIcon, EyeIcon, SwatchIcon, SparklesIcon,
    ComputerDesktopIcon
} from '@heroicons/react/24/outline';

const { useNavigate, Link } = ReactRouterDOM as any;

const PREDEFINED_PALETTES = [
    { name: 'Classic Blue', primary: '#3b82f6', accent: '#60a5fa' },
    { name: 'Royal Purple', primary: '#8b5cf6', accent: '#a78bfa' },
    { name: 'Emerald', primary: '#10b981', accent: '#34d399' },
    { name: 'Rose', primary: '#ef4444', accent: '#f87171' },
    { name: 'Sunset', primary: '#f97316', accent: '#fb923c' },
    { name: 'Bubblegum', primary: '#ec4899', accent: '#f472b6' },
];

const CURSOR_STYLES = [
    { id: 'default', name: 'Default', icon: 'Cursor' },
    { id: 'modern', name: 'Modern', icon: '⚫' },
    { id: 'retro', name: 'Retro', icon: '👾' },
    { id: 'neon', name: 'Neon', icon: '⚡' },
    { id: 'minimal', name: 'Minimal', icon: '✛' },
    { id: 'fantasy', name: 'Fantasy', icon: '⚔️' },
    { id: 'scifi', name: 'Sci-Fi', icon: '🛸' },
    { id: 'nature', name: 'Nature', icon: '🌿' },
    { id: 'mac', name: 'macOS Black', icon: '' },
];

const ProfilePage: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { 
      themeMode, setThemeMode, 
      layout, setLayout, 
      customColors, setCustomColors, 
      cursorStyle, setCursorStyle 
  } = useTheme();
  const { isDesktop } = useDeviceDetection();
  
  const navigate = useNavigate();

  // Local state for color pickers to avoid excessive re-renders during drag
  const [localCustomColors, setLocalCustomColors] = useState<CustomThemeColors>(customColors);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  // Sync local state when context changes (e.g. initial load)
  useEffect(() => {
    setLocalCustomColors(customColors);
  }, [customColors]);

  const handleColorChange = (key: keyof CustomThemeColors, value: string) => {
      const newColors = { ...localCustomColors, [key]: value };
      setLocalCustomColors(newColors);
      setCustomColors(newColors); // Real-time apply
      if (themeMode !== 'custom') {
          setThemeMode('custom'); // Auto-switch to custom mode if editing colors
      }
  };

  const handlePresetSelect = (primary: string, accent: string) => {
      const newColors = { ...localCustomColors, primary, accent };
      setLocalCustomColors(newColors);
      setCustomColors(newColors);
  };

  if (!user) {
    return null; 
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
              
              {/* User Header */}
              <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6 border-b border-gray-200 dark:border-gray-700 pb-8">
                  <div className="flex-shrink-0 relative group">
                      <img className="h-24 w-24 rounded-full border-4 border-primary-100 dark:border-primary-900 object-cover" src={`https://i.pravatar.cc/150?u=${user.email}`} alt="User avatar" />
                      <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 rounded-full border-2 border-white dark:border-gray-800"></div>
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{user.name}</h1>
                      <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
                      <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs rounded-full font-bold uppercase tracking-wide">Elite Member</span>
                          {isDesktop && <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-full font-medium">PC User</span>}
                      </div>
                  </div>
              </div>
              
              {/* Wishlist Link */}
              <div className="mt-6">
                  <Link to="/wishlist" className="flex justify-between items-center p-4 rounded-xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 hover:shadow-md transition-all border border-pink-100 dark:border-gray-600 group">
                      <div className="flex items-center space-x-4">
                          <div className="p-2 bg-white dark:bg-gray-900 rounded-full shadow-sm text-pink-500 group-hover:scale-110 transition-transform">
                             <HeartIcon className="h-6 w-6"/>
                          </div>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">My Wishlist</span>
                      </div>
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
                  </Link>
              </div>

              {/* PERSONALIZATION SECTION */}
              <div className="mt-12">
                  <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400">
                        <PaintBrushIcon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Personalization Settings</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Customize your ShopNest experience</p>
                      </div>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      
                      {/* 1. Theme Selection */}
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                             <SwatchIcon className="h-5 w-5 text-gray-400" /> Theme Mode
                          </h3>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                              {[
                                { id: 'light', label: 'Light', icon: SunIcon },
                                { id: 'dark', label: 'Dark', icon: MoonIcon },
                                { id: 'high-contrast', label: 'Contrast', icon: EyeIcon },
                                { id: 'custom', label: 'Custom', icon: PaintBrushIcon },
                              ].map((mode) => (
                                  <button
                                      key={mode.id}
                                      onClick={() => setThemeMode(mode.id as ThemeMode)}
                                      className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border-2 transition-all ${themeMode === mode.id ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-md text-primary-600' : 'border-transparent hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500'}`}
                                  >
                                      <mode.icon className="h-6 w-6"/>
                                      <span className="text-xs font-bold">{mode.label}</span>
                                  </button>
                              ))}
                          </div>

                          {/* Helper Text for High Contrast */}
                          {themeMode === 'high-contrast' && (
                              <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-xs rounded-lg flex items-start gap-2">
                                  <EyeIcon className="h-4 w-4 mt-0.5 flex-shrink-0" />
                                  <span>High Contrast mode maximizes legibility by using pure black backgrounds and high-visibility text colors.</span>
                              </div>
                          )}
                      </div>

                      {/* 2. Layout Preference */}
                      <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                          <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                             <ComputerDesktopIcon className="h-5 w-5 text-gray-400" /> View Layout
                          </h3>
                          <div className="flex gap-4">
                              <button
                                  onClick={() => setLayout('grid')}
                                  className={`flex-1 flex items-center justify-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${layout === 'grid' ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-sm text-primary-600' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                              >
                                  <Squares2X2Icon className="h-5 w-5"/>
                                  <span className="font-medium">Grid View</span>
                              </button>
                              <button
                                  onClick={() => setLayout('list')}
                                  className={`flex-1 flex items-center justify-center gap-3 px-4 py-4 rounded-xl border-2 transition-all ${layout === 'list' ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-sm text-primary-600' : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'}`}
                              >
                                  <Bars3Icon className="h-5 w-5"/>
                                  <span className="font-medium">List View</span>
                              </button>
                          </div>
                      </div>
                      
                      {/* 3. Detailed Color Customization */}
                      <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                           <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                                    <SparklesIcon className="h-5 w-5 text-gray-400" />
                                    Theme Colors
                                </h3>
                                {themeMode !== 'custom' && (
                                    <span className="text-xs text-gray-500 bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                                        Editing switches to Custom Mode
                                    </span>
                                )}
                           </div>
                           
                           {/* Quick Presets */}
                           <div className="flex flex-wrap gap-3 mb-6">
                               {PREDEFINED_PALETTES.map((t) => (
                                   <button
                                       key={t.name}
                                       onClick={() => handlePresetSelect(t.primary, t.accent)}
                                       className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-transform hover:scale-110 ${localCustomColors.primary === t.primary ? 'border-gray-900 dark:border-white ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-900' : 'border-transparent shadow-sm'}`}
                                       style={{ backgroundColor: t.primary }}
                                       title={t.name}
                                   >
                                       {localCustomColors.primary === t.primary && <CheckIcon className="h-5 w-5 text-white drop-shadow-md" />}
                                   </button>
                               ))}
                           </div>

                           {/* Detailed Pickers */}
                           <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Primary Color</label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <input 
                                            type="color" 
                                            value={localCustomColors.primary}
                                            onChange={(e) => handleColorChange('primary', e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                        />
                                        <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{localCustomColors.primary}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Accent Color</label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <input 
                                            type="color" 
                                            value={localCustomColors.accent}
                                            onChange={(e) => handleColorChange('accent', e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                        />
                                        <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{localCustomColors.accent}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Background</label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <input 
                                            type="color" 
                                            value={localCustomColors.background}
                                            onChange={(e) => handleColorChange('background', e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                        />
                                        <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{localCustomColors.background}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Card Background</label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <input 
                                            type="color" 
                                            value={localCustomColors.cardBackground}
                                            onChange={(e) => handleColorChange('cardBackground', e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                        />
                                        <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{localCustomColors.cardBackground}</span>
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Text Color</label>
                                    <div className="flex items-center gap-2 bg-white dark:bg-gray-800 p-2 rounded-lg border border-gray-200 dark:border-gray-600">
                                        <input 
                                            type="color" 
                                            value={localCustomColors.text}
                                            onChange={(e) => handleColorChange('text', e.target.value)}
                                            className="w-8 h-8 rounded cursor-pointer border-none p-0"
                                        />
                                        <span className="text-xs font-mono text-gray-600 dark:text-gray-300">{localCustomColors.text}</span>
                                    </div>
                                </div>
                           </div>
                      </div>

                      {/* 4. Cursor Selection (Desktop Only) */}
                      {isDesktop && (
                        <div className="lg:col-span-2 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                             <h3 className="text-lg font-bold mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
                                 <CursorArrowRaysIcon className="h-5 w-5 text-gray-400" /> Custom Cursor
                             </h3>
                             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
                                 {CURSOR_STYLES.map((style) => (
                                     <button
                                         key={style.id}
                                         onClick={() => setCursorStyle(style.id)}
                                         className={`relative flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all group overflow-hidden ${cursorStyle === style.id ? 'border-primary-500 bg-white dark:bg-gray-800 shadow-md' : 'border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-700 hover:bg-white dark:hover:bg-gray-800'}`}
                                     >
                                         <span className="text-2xl mb-2 transform group-hover:scale-110 transition-transform">{style.icon}</span>
                                         <span className="text-[10px] font-bold text-gray-600 dark:text-gray-300 text-center truncate w-full">{style.name}</span>
                                         {cursorStyle === style.id && (
                                             <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary-500 rounded-full"></div>
                                         )}
                                     </button>
                                 ))}
                             </div>
                             <p className="mt-4 text-xs text-gray-500 text-center">
                                 Selected cursor applies instantly across the application window.
                             </p>
                        </div>
                      )}
                  </div>
              </div>

              {/* Sign Out Action */}
              <div className="mt-12 border-t border-gray-200 dark:border-gray-700 pt-8 flex justify-end">
                  <button
                      onClick={logout}
                      className="w-full sm:w-auto bg-red-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-lg shadow-red-500/30 flex items-center justify-center gap-2"
                  >
                      <span>Sign Out</span>
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default ProfilePage;