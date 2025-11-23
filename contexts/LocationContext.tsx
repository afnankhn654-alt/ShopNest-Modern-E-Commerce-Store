
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Region } from '../types';
import { detectUserRegion, SUPPORTED_REGIONS, convertPrice, formatCurrency } from '../services/locationService';
import useLocalStorage from '../hooks/useLocalStorage';

interface LocationContextType {
  currentRegion: Region;
  setRegion: (regionCode: string) => void;
  formatPrice: (priceInUSD: number) => string;
  loadingLocation: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Persist selection, default to US if nothing saved
  const [savedRegionCode, setSavedRegionCode] = useLocalStorage<string>('shopnest_region', '');
  const [currentRegion, setCurrentRegion] = useState<Region>(SUPPORTED_REGIONS[0]);
  const [loadingLocation, setLoadingLocation] = useState(true);

  useEffect(() => {
    const initLocation = async () => {
      if (savedRegionCode) {
        const region = SUPPORTED_REGIONS.find(r => r.code === savedRegionCode);
        if (region) {
          setCurrentRegion(region);
          setLoadingLocation(false);
          return;
        }
      }

      // If no saved preference, try to detect
      try {
        const detected = await detectUserRegion();
        setCurrentRegion(detected);
        setSavedRegionCode(detected.code);
      } catch (e) {
        console.error("Location detection failed", e);
        setCurrentRegion(SUPPORTED_REGIONS[0]);
      } finally {
        setLoadingLocation(false);
      }
    };

    initLocation();
  }, []);

  const setRegion = (code: string) => {
    const region = SUPPORTED_REGIONS.find(r => r.code === code);
    if (region) {
      setCurrentRegion(region);
      setSavedRegionCode(code);
    }
  };

  const getFormattedPrice = (priceInUSD: number) => {
    const converted = convertPrice(priceInUSD, currentRegion);
    return formatCurrency(converted, currentRegion);
  };

  const value = {
    currentRegion,
    setRegion,
    formatPrice: getFormattedPrice,
    loadingLocation
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error('useLocation must be used within a LocationProvider');
  }
  return context;
};
