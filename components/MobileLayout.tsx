import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { 
  HomeIcon, 
  HeartIcon, 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid, 
  HeartIcon as HeartIconSolid, 
  ShoppingCartIcon as ShoppingCartIconSolid, 
  UserIcon as UserIconSolid 
} from '@heroicons/react/24/solid';

const { NavLink, Link, useNavigate } = ReactRouterDOM as any;

interface MobileLayoutProps {
  children: React.ReactNode;
}

const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home", icon: HomeIcon, solidIcon: HomeIconSolid, count: 0 },
    { path: "/search", label: "Search", icon: MagnifyingGlassIcon, solidIcon: MagnifyingGlassIcon, count: 0 },
    { path: "/cart", label: "Bag", icon: ShoppingCartIcon, solidIcon: ShoppingCartIconSolid, count: cartCount },
    { path: "/wishlist", label: "Saved", icon: HeartIcon, solidIcon: HeartIconSolid, count: wishlistCount },
    { path: isAuthenticated ? "/profile" : "/auth", label: "Me", icon: UserIcon, solidIcon: UserIconSolid, count: 0 },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900 font-mobile-body text-gray-800 dark:text-gray-100 selection:bg-primary-200">
      
      {/* Unified Top Header - Resembles Desktop Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-gray-800 px-4 h-14 flex items-center justify-between transition-all duration-300">
          {/* Logo - Matches Desktop */}
          <Link to="/" className="flex items-center gap-1">
              <span className="text-xl font-bold text-primary-600 dark:text-primary-400 tracking-tight">ShopNest</span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-3">
              <Link to="/search" className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <MagnifyingGlassIcon className="h-6 w-6" />
              </Link>
              <Link to="/cart" className="relative p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full">
                  <ShoppingCartIcon className="h-6 w-6" />
                  {cartCount > 0 && (
                      <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white border-2 border-white dark:border-gray-900">
                          {cartCount}
                      </span>
                  )}
              </Link>
          </div>
      </div>

      {/* Main Content Area - Added padding top for fixed header */}
      <main className="flex-grow pt-14 pb-24 relative overflow-x-hidden">
        {children}
      </main>

      {/* Creative Floating Bottom Navigation */}
      <nav className="fixed bottom-6 left-4 right-4 z-50">
        <div className="bg-gray-900/90 dark:bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl shadow-primary-900/20 border border-white/10 dark:border-gray-200 p-2 flex justify-between items-center">
          {navItems.map((item, idx) => (
             <NavLink
                key={item.label}
                to={item.path}
                className={({ isActive }: any) => `
                    relative flex flex-col items-center justify-center w-full h-14 rounded-xl transition-all duration-300
                    ${isActive 
                        ? 'bg-gray-800 dark:bg-gray-100 text-white dark:text-gray-900 transform -translate-y-2 shadow-lg scale-110' 
                        : 'text-gray-400 dark:text-gray-500 hover:text-gray-200 dark:hover:text-gray-700'
                    }
                `}
             >
                {({ isActive }: any) => (
                    <>
                        {isActive ? <item.solidIcon className="h-6 w-6" /> : <item.icon className="h-6 w-6" />}
                        {isActive && <span className="text-[10px] font-bold mt-1 font-mobile-display">{item.label}</span>}
                        
                        {/* Notification Dot */}
                        {item.count > 0 && (
                            <span className="absolute top-2 right-2 flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span>
                            </span>
                        )}
                    </>
                )}
             </NavLink>
          ))}
        </div>
      </nav>

    </div>
  );
};

export default MobileLayout;