import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserIcon, ArrowRightIcon } from '@heroicons/react/24/outline';
import UserAvatar from './UserAvatar';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OnboardingModal: React.FC<OnboardingModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUserName } = useAuth();
  const [displayName, setDisplayName] = useState(user?.name || '');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (displayName.trim().length < 2) {
      // Simple validation
      return;
    }
    setLoading(true);
    try {
      await updateUserName(displayName.trim());
      onClose();
    } catch (error) {
      console.error("Failed to update display name:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-gray-900/80 backdrop-blur-lg z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div className="w-full max-w-lg mx-auto bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl p-8 text-center text-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary-500 rounded-full blur-[80px] opacity-30 animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500 rounded-full blur-[80px] opacity-30 animate-pulse-slow delay-1000"></div>

        <div className="relative z-10">
          <div className="flex justify-center mb-6">
            <UserAvatar user={user} size="h-24 w-24" text="text-3xl" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Welcome to ShopNest!</h1>
          <p className="text-gray-400 mb-8">
            Your account is set up. Let's get your profile ready.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="displayName" className="block text-sm font-medium text-gray-300 mb-2 text-left">
                How should we call you?
              </label>
              <div className="relative">
                <UserIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <input
                  id="displayName"
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Enter your display name"
                  className="w-full pl-12 pr-4 py-3 bg-gray-900 border-2 border-gray-700 rounded-xl focus:border-primary-500 focus:ring-2 focus:ring-primary-500/50 outline-none text-white transition-all text-center sm:text-left"
                  required
                  minLength={2}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || displayName.trim().length < 2}
              className="w-full flex items-center justify-center gap-2 bg-primary-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-primary-700 transition-all duration-300 disabled:bg-gray-600 disabled:cursor-not-allowed group"
            >
              <span>{loading ? 'Saving...' : 'Complete Profile'}</span>
              <ArrowRightIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingModal;
