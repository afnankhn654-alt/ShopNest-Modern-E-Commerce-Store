import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { HomeIcon, HeartIcon, ShoppingCartIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { HomeIcon as HomeIconSolid, HeartIcon as HeartIconSolid, ShoppingCartIcon as ShoppingCartIconSolid, UserCircleIcon as UserCircleIconSolid } from '@heroicons/react/24/solid';

const { NavLink } = ReactRouterDOM as any;

const BottomNavBar: React.FC = () => {
    const { cartCount } = useCart();
    const { wishlistCount } = useWishlist();
    const { isAuthenticated } = useAuth();

    const navLinkClasses = "flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 w-full pt-2 pb-1 transition-colors duration-200";
    const activeNavLinkClasses = "text-primary-600 dark:text-primary-400";

    const navItems = [
        { path: "/", label: "Home", icon: HomeIcon, solidIcon: HomeIconSolid, count: 0 },
        { path: "/wishlist", label: "Wishlist", icon: HeartIcon, solidIcon: HeartIconSolid, count: wishlistCount },
        { path: "/cart", label: "Cart", icon: ShoppingCartIcon, solidIcon: ShoppingCartIconSolid, count: cartCount },
        { path: isAuthenticated ? "/profile" : "/auth", label: "Profile", icon: UserCircleIcon, solidIcon: UserCircleIconSolid, count: 0 },
    ];

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm border-t border-gray-200 dark:border-gray-800 shadow-t-lg z-40">
            <div className="flex justify-around h-16">
                {navItems.map(item => (
                    <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }: any) => `${navLinkClasses} ${isActive ? activeNavLinkClasses : ''}`}
                    >
                        {({ isActive }: any) => (
                            <>
                                <div className="relative">
                                     {isActive ? <item.solidIcon className="h-6 w-6 mb-1" /> : <item.icon className="h-6 w-6 mb-1" />}
                                    {item.count > 0 && (
                                        <span className="absolute -top-1 -right-3.5 block h-5 w-5 rounded-full bg-primary-600 text-white text-[10px] flex items-center justify-center border-2 border-white dark:border-gray-900">
                                            {item.count}
                                        </span>
                                    )}
                                </div>
                                <span className="text-xs font-medium">{item.label}</span>
                            </>
                        )}
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default BottomNavBar;