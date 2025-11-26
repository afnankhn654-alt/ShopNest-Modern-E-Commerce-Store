import React from 'react';
import { User } from '../types';

interface UserAvatarProps {
  user: User | null;
  size?: string;
  text?: string;
}

const GRADIENTS = [
  'from-rose-400 to-red-500',
  'from-amber-400 to-orange-500',
  'from-lime-400 to-green-500',
  'from-emerald-400 to-teal-500',
  'from-cyan-400 to-blue-500',
  'from-sky-400 to-indigo-500',
  'from-violet-400 to-purple-500',
  'from-fuchsia-400 to-pink-500',
];

// Simple hash function to get a consistent gradient for a user
const getGradientIndex = (id: string): number => {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    const char = id.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % GRADIENTS.length;
};

const getInitials = (name: string): string => {
  if (!name) return '??';
  const names = name.split(' ');
  if (names.length > 1) {
    return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

const UserAvatar: React.FC<UserAvatarProps> = ({ user, size = 'h-10 w-10', text = 'text-base' }) => {
  if (!user) return null;

  if (user.photoURL) {
    return (
      <img
        src={user.photoURL}
        alt={user.name}
        className={`${size} rounded-full object-cover border-2 border-white dark:border-gray-700 shadow-sm`}
        referrerPolicy="no-referrer"
      />
    );
  }

  const gradient = GRADIENTS[getGradientIndex(user.id)];
  const initials = getInitials(user.name);

  return (
    <div
      className={`${size} rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center font-bold text-white shadow-md border-2 border-white dark:border-gray-700 select-none`}
    >
      <span className={text}>{initials}</span>
    </div>
  );
};

export default UserAvatar;
