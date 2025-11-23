
import React, { useEffect, useState } from 'react';
import { useLoading } from '../contexts/LoadingContext';

const TopLoader: React.FC = () => {
  const { isLoading } = useLoading();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Fixed: Use ReturnType<typeof setInterval> to be environment agnostic (Node vs Browser)
    let interval: ReturnType<typeof setInterval>;

    if (isLoading) {
      setVisible(true);
      setProgress(0);
      // Fast initial progress
      setTimeout(() => setProgress(30), 100);

      // Slow progress trickle
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 90) return prev;
          return prev + Math.random() * 10;
        });
      }, 500);
    } else {
      // Complete the bar
      setProgress(100);
      clearInterval(interval!);
      
      // Hide after animation
      const timeout = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500); // Wait for fade out
      return () => clearTimeout(timeout);
    }

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-[100] pointer-events-none">
       <div 
          className="h-full bg-gradient-to-r from-red-500 via-primary-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] loader-bar"
          style={{ 
              width: `${progress}%`,
              opacity: isLoading || progress === 100 ? 1 : 0
          }}
       ></div>
    </div>
  );
};

export default TopLoader;
