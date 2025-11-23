import { useState, useEffect } from 'react';

const getDeviceType = (width: number) => {
  if (width < 768) {
    return 'mobile';
  }
  if (width >= 768 && width < 1024) {
    return 'tablet';
  }
  return 'desktop';
};

/**
 * A custom hook to detect the user's device type (mobile, tablet, or desktop)
 * based on the screen width. It updates in real-time on window resize.
 * @returns An object with boolean flags: isMobile, isTablet, isDesktop.
 */
export const useDeviceDetection = () => {
  const [deviceType, setDeviceType] = useState(() => getDeviceType(window.innerWidth));

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(getDeviceType(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    // Cleanup the event listener on component unmount
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
  };
};
