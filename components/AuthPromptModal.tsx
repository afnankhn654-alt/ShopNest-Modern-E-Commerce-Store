import React, { useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useWishlist } from '../contexts/WishlistContext';
import { useAuth } from '../contexts/AuthContext';
import { LockClosedIcon, SparklesIcon } from '@heroicons/react/24/outline';

const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
      <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
      <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
      <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C42.021,35.592,44,30.138,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);


const AuthPromptModal: React.FC = () => {
    const { isAuthPromptOpen, closeAuthPrompt, getPendingAction, executePendingAction, clearPendingAction, addToGuestCart } = useCart();
    const { addToGuestWishlist } = useWishlist();
    const { loginWithGoogle, user, loading } = useAuth();
    const pendingAction = getPendingAction();

    useEffect(() => {
        if(user && isAuthPromptOpen && !loading) {
            executePendingAction();
            clearPendingAction();
            closeAuthPrompt();
        }
    }, [user, isAuthPromptOpen, loading, executePendingAction, clearPendingAction, closeAuthPrompt]);
    
    const handleGoogleSignIn = async () => {
        try {
            await loginWithGoogle();
            // The useEffect above will handle the rest
        } catch (error) {
            console.error("Google sign in failed from prompt", error);
        }
    };
    
    if (!isAuthPromptOpen || !pendingAction) return null;

    const product = pendingAction.product;

    const handleMaybeLater = () => {
        // This is the core logic change
        if (pendingAction.quantity === 0) {
            // This was a wishlist action, identified by the zero quantity hack
            addToGuestWishlist(product);
        } else {
            // This was a real cart action
            addToGuestCart(pendingAction.product, pendingAction.variant, pendingAction.quantity);
        }
        clearPendingAction();
        closeAuthPrompt();
    };

    return (
        <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4 animate-fade-in">
            <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-8 text-center relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500 rounded-full blur-[80px] opacity-20 dark:opacity-30"></div>
                
                <div className="relative z-10">
                    <div className="flex justify-center mb-6">
                        <div className="relative w-24 h-24">
                            <img src={product.images[0].image_url} alt={product.title} className="w-24 h-24 rounded-full object-cover shadow-lg border-4 border-white dark:border-gray-700"/>
                            <div className="absolute -bottom-2 -right-2 bg-primary-500 text-white rounded-full p-2 shadow-md border-2 border-white dark:border-gray-800">
                                <LockClosedIcon className="h-5 w-5"/>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">Don't Lose Your Finds!</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-6">
                        Sign in or create an account to save your items and access them from any device.
                    </p>

                    <div className="space-y-4">
                         <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-full flex justify-center items-center gap-3 py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                          >
                            <GoogleIcon />
                            Continue with Google
                          </button>
                         <button 
                            className="w-full py-3 px-4 bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-800 font-semibold rounded-lg hover:bg-gray-900 dark:hover:bg-white"
                         >
                             Sign In with Email
                         </button>
                    </div>

                    <div className="mt-6">
                        <button
                            onClick={handleMaybeLater}
                            className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:underline"
                        >
                            Maybe later
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPromptModal;