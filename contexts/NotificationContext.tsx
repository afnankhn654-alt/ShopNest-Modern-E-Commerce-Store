import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { Notification } from '../types';

interface NotificationContextType {
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: number) => void;
  notifications: Notification[];
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const removeNotification = useCallback((id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = Date.now();
    const newNotification = { ...notification, id };
    setNotifications(prev => [newNotification, ...prev]);
    
    const duration = notification.duration || 5000;
    setTimeout(() => {
      // Use a function with the ID to prevent race conditions
      // where a different notification with the same ID might exist briefly
      setNotifications(currentNotifications =>
        currentNotifications.filter(n => n.id !== id)
      );
    }, duration + 500); // Add buffer for exit animation

  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};
