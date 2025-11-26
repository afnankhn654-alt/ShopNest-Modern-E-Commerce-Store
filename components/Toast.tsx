import React, { useEffect, useState } from 'react';
import { CheckCircleIcon, XCircleIcon, InformationCircleIcon, XMarkIcon } from '@heroicons/react/24/solid';
import { Notification } from '../types';
import { useNotification } from '../contexts/NotificationContext';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM as any;

interface ToastProps {
  notification: Notification;
}

const ICONS = {
  success: <CheckCircleIcon className="h-8 w-8 text-green-500" />,
  error: <XCircleIcon className="h-8 w-8 text-red-500" />,
  info: <InformationCircleIcon className="h-8 w-8 text-blue-500" />,
};

const Toast: React.FC<ToastProps> = ({ notification }) => {
  const { removeNotification } = useNotification();
  const [exiting, setExiting] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const duration = notification.duration || 5000;
    
    // Animate progress bar
    const interval = setInterval(() => {
      setProgress(p => Math.max(0, p - (100 / (duration / 100))));
    }, 100);

    const timeout = setTimeout(() => {
      setExiting(true);
    }, duration);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [notification.duration, notification.id]);
  
  // When exit animation is complete, remove from DOM
  useEffect(() => {
      if (exiting) {
          const timer = setTimeout(() => {
              removeNotification(notification.id);
          }, 500);
          return () => clearTimeout(timer);
      }
  }, [exiting, notification.id, removeNotification]);


  const handleClose = () => {
    setExiting(true);
  };
  
  const animationClasses = exiting ? 'animate-fadeOutRight' : 'animate-fadeInRight';

  return (
    <div
      className={`relative w-full max-w-sm overflow-hidden rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-2xl ring-1 ring-black/5 dark:ring-white/10 ${animationClasses}`}
      style={{ animationFillMode: 'forwards' }}
    >
      <div className="p-4 flex items-start gap-4">
        {notification.productImage && (
          <div className="flex-shrink-0">
            <img className="h-16 w-16 rounded-lg object-cover border border-gray-100 dark:border-gray-700" src={notification.productImage} alt="Product" />
          </div>
        )}
        {!notification.productImage && (
          <div className="flex-shrink-0 pt-1">{ICONS[notification.type]}</div>
        )}
        <div className="flex-1 pt-1">
          <p className="text-sm font-bold text-gray-900 dark:text-white">{notification.title}</p>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2">{notification.message}</p>
          <div className="mt-3 flex gap-4">
              <Link to="/cart" onClick={handleClose} className="text-sm font-medium text-primary-600 hover:text-primary-500">View cart</Link>
              <button onClick={handleClose} className="text-sm font-medium text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">Dismiss</button>
          </div>
        </div>
        <div className="flex-shrink-0">
          <button onClick={handleClose} className="p-1 rounded-full text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary-400 to-purple-400" style={{ width: `${progress}%`, transition: 'width 0.1s linear' }} />
    </div>
  );
};

export default Toast;
