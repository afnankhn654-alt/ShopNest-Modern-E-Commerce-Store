import React from 'react';
import { useNotification } from '../contexts/NotificationContext';
import Toast from './Toast';

const NotificationHost: React.FC = () => {
  const { notifications } = useNotification();

  return (
    <div className="fixed top-4 right-4 z-[100] w-full max-w-sm space-y-4">
      {notifications.map(notification => (
        <Toast key={notification.id} notification={notification} />
      ))}
    </div>
  );
};

export default NotificationHost;
