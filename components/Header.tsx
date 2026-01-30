import React, { useState, useMemo, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useLocation } from '../contexts/LocationContext';
import { SUPPORTED_REGIONS } from '../services/locationService';
import { getCategories } from '../data/products';
import { SunIcon, MoonIcon, UserCircleIcon, ShoppingCartIcon, Bars3Icon, XMarkIcon, MagnifyingGlassIcon, HeartIcon, ChevronDownIcon } from '@heroicons/react/24/outline';

const { Link, NavLink, useNavigate } = ReactRouterDOM as any;

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const { currentRegion, setRegion } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRegionMenuOpen, setIsRegionMenuOpen] = useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [regionSearchQuery, setRegionSearchQuery] = useState('');
  const navigate = useNavigate();

  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    setCategories(getCategories());
  }, []);

  const filteredRegions = useMemo(() => {
    if (!regionSearchQuery) return SUPPORTED_REGIONS;
    const lower = regionSearchQuery.toLowerCase();
    return SUPPORTED_REGIONS.filter(r => 
        r.name.toLowerCase().includes(lower) || 
        r.code.toLowerCase().includes(lower) ||
        r.currencyCode.toLowerCase().includes(lower)
    );
  }, [regionSearchQuery]);

  const navLinkClasses = "text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200";
  const activeNavLinkClasses = "text-primary-600 dark:text-primary-400 font-semibold";
  const iconButtonClasses = "p-2 rounded-full bg-primary-600 text-white hover:bg-primary-700 transition-colors";

  return (
    <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-sm sticky top-0 z-40">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 text-2xl font-bold text-primary-600 dark:text-primary-400">
              ShopNest
            </Link>
            <div className="hidden md:block ml-10">
              <div className="flex items-baseline space-x-4">
                <NavLink to="/" className={({ isActive }: any) => isActive ? activeNavLinkClasses : navLinkClasses}>Home</NavLink>
                
                {/* Categories Mega Menu */}
                <div className="relative" onMouseLeave={() => setIsMegaMenuOpen(false)}>
                    <button 
                        onMouseEnter={() => setIsMegaMenuOpen(true)}
                        onClick={() => setIsMegaMenuOpen(!isMegaMenuOpen)}
                        className={`${navLinkClasses} flex items-center gap-1 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md p-2 -my-2`}
                    >
                        Categories <ChevronDownIcon className={`h-4 w-4 transition-transform ${isMegaMenuOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isMegaMenuOpen && (
                        <div 
                            onMouseEnter={() => setIsMegaMenuOpen(true)}
                            className="absolute -left-8 top-full w-screen max-w-4xl mt-2 animate-fade-in"
                        >
                            <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-lg shadow-2xl rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-6">
                                    {categories.map(category => (
                                        <Link
                                            key={category}
                                            to={`/products/${category}`}
                                            onClick={() => setIsMegaMenuOpen(false)}
                                            className="block font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:pl-1 transition-all"
                                        >
                                            {category}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/search')}
              className={iconButtonClasses}
              aria-label="Search"
            >
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>
             
            {/* Region Selector */}
            <div className="relative">
                <button 
                  onClick={() => {
                      setIsRegionMenuOpen(!isRegionMenuOpen);
                      setRegionSearchQuery('');
                  }}
                  className={`${iconButtonClasses} flex items-center space-x-1`}
                  title={currentRegion.name}
                >
                    <span className="text-lg">{currentRegion.flag}</span>
                    <span className="text-sm font-medium hidden lg:inline">{currentRegion.currencyCode}</span>
                </button>
                {isRegionMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-50 flex flex-col max-h-96">
                        <div className="p-2 border-b border-gray-100 dark:border-gray-700 sticky top-0 bg-white dark:bg-gray-800 z-10">
                             <input
                                type="text"
                                placeholder="Search country..."
                                value={regionSearchQuery}
                                onChange={(e) => setRegionSearchQuery(e.target.value)}
                                className="w-full px-2 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary-500"
                                autoFocus
                             />
                        </div>
                        <div className="overflow-y-auto flex-1">
                            {filteredRegions.length > 0 ? (
                                filteredRegions.map(region => (
                                    <button
                                        key={region.code}
                                        onClick={() => {
                                            setRegion(region.code);
                                            setIsRegionMenuOpen(false);
                                        }}
                                        className={`flex items-center w-full px-4 py-2 text-sm text-left bg-transparent ${currentRegion.code === region.code ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600 font-bold' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        <span className="mr-3 text-lg">{region.flag}</span>
                                        <div className="flex flex-col">
                                            <span>{region.name}</span>
                                            <span className="text-xs text-gray-500">{region.currencyCode} ({region.currencySymbol})</span>
                                        </div>
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">No countries found</div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <button onClick={toggleTheme} className={iconButtonClasses}>
              {theme === 'light' ? <MoonIcon className="h-6 w-6" /> : <SunIcon className="h-6 w-6" />}
            </button>
            <Link to="/wishlist" className={`relative ${iconButtonClasses}`}>
              <HeartIcon className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 border-2 border-primary-600">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to={isAuthenticated ? "/profile" : "/auth"} className={iconButtonClasses}>
              <UserCircleIcon className="h-6 w-6" />
            </Link>
            <Link to="/cart" className={`relative ${iconButtonClasses}`}>
              <ShoppingCartIcon className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 block h-5 w-5 rounded-full bg-red-500 text-white text-xs flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 border-2 border-primary-600">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
          <div className="md:hidden flex items-center">
             <button 
                  onClick={() => setIsRegionMenuOpen(!isRegionMenuOpen)}
                  className="p-2 mr-2 rounded-full bg-primary-600 text-white"
                >
                    <span className="text-lg">{currentRegion.flag}</span>
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 rounded-md bg-primary-600 text-white">
              {isMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden pb-4">
             <div className="relative mb-4">
                <button 
                  onClick={() => { navigate('/search'); setIsMenuOpen(false); }}
                  className="w-full text-left bg-gray-100 dark:bg-gray-800 border border-transparent rounded-full py-2 pl-10 pr-4 text-sm text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  Search...
                </button>
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2"/>
             </div>
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className={({ isActive }: any) => isActive ? activeNavLinkClasses : navLinkClasses + ' bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md'} onClick={() => setIsMenuOpen(false)}>Home</NavLink>
              <NavLink to={isAuthenticated ? "/profile" : "/auth"} className={navLinkClasses + ' bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md'} onClick={() => setIsMenuOpen(false)}>Profile</NavLink>
              <NavLink to="/wishlist" className={navLinkClasses + ' bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md'} onClick={() => setIsMenuOpen(false)}>Wishlist ({wishlistCount})</NavLink>
              <NavLink to="/cart" className={navLinkClasses + ' bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 p-2 rounded-md'} onClick={() => setIsMenuOpen(false)}>Cart ({cartCount})</NavLink>
              <button onClick={toggleTheme} className="flex items-center space-x-2 text-left text-gray-600 dark:text-gray-300 p-2 rounded-md bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
                {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
                <span>Toggle Theme</span>
              </button>
            </div>
          </div>
        )}

         {isRegionMenuOpen && (
             <div className="absolute top-16 right-4 left-4 z-50 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 md:w-64 md:left-auto flex flex-col max-h-[80vh]">
                 <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase">Select Region</h3>
                    <button onClick={() => setIsRegionMenuOpen(false)} className="text-gray-400 hover:text-gray-500 bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-full"><XMarkIcon className="h-5 w-5"/></button>
                 </div>
                 <input
                    type="text"
                    placeholder="Search country..."
                    value={regionSearchQuery}
                    onChange={(e) => setRegionSearchQuery(e.target.value)}
                    className="w-full px-3 py-2 mb-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 focus:outline-none focus:border-primary-500"
                 />
                 <div className="space-y-1 overflow-y-auto">
                     {filteredRegions.map(region => (
                        <button
                            key={region.code}
                            onClick={() => {
                                setRegion(region.code);
                                setIsRegionMenuOpen(false);
                            }}
                            className={`flex items-center justify-between w-full p-2 rounded-md bg-transparent ${currentRegion.code === region.code ? 'bg-primary-50 dark:bg-primary-900/30 text-primary-600' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                        >
                            <span className="flex items-center space-x-3">
                                <span className="text-2xl">{region.flag}</span>
                                <span className="font-medium text-sm">{region.name}</span>
                            </span>
                            <span className="text-xs font-bold opacity-70">{region.currencyCode}</span>
                        </button>
                    ))}
                    {filteredRegions.length === 0 && (
                         <div className="text-center py-4 text-gray-500">No countries found</div>
                    )}
                 </div>
             </div>
         )}
      </nav>
    </header>
  );
};

export default Header;