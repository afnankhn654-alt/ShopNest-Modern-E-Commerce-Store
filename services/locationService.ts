
import { Region } from '../types';
import { ALL_COUNTRIES } from '../data/countries';

// Re-export the list from data/countries for use in components
export const SUPPORTED_REGIONS = ALL_COUNTRIES;

export const detectUserRegion = async (): Promise<Region> => {
  console.log("Auto-detecting user location via IP...");
  
  try {
    // Using ipwho.is - a free IP geolocation API that doesn't require an API key for basic use
    // and supports CORS.
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout

    const response = await fetch('https://ipwho.is/', { 
        signal: controller.signal 
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    
    if (data.success) {
        const countryCode = data.country_code;
        console.log(`Detected country: ${countryCode}`);
        
        // Find the detected country in our supported list
        const region = ALL_COUNTRIES.find(r => r.code === countryCode);
        
        if (region) {
            return region;
        }
        
        // If country not in our main list, check if we can map it dynamically 
        // or just return US default.
        // For this demo, we default to US if specific country data isn't pre-configured
        console.warn(`Country ${countryCode} detected but not in configured list.`);
    }
  } catch (error) {
    console.warn("Location detection failed or timed out, defaulting to US.", error);
  }

  // Fallback to United States
  return ALL_COUNTRIES.find(r => r.code === 'US') || ALL_COUNTRIES[0];
};

export const convertPrice = (priceInUSD: number, region: Region): number => {
  return priceInUSD * region.exchangeRate;
};

export const formatCurrency = (amount: number, region: Region): string => {
  try {
    return new Intl.NumberFormat(region.locale, {
        style: 'currency',
        currency: region.currencyCode,
      }).format(amount);
  } catch (e) {
    // Fallback if locale/currency combo is invalid in some browsers
    return `${region.currencySymbol}${amount.toFixed(2)}`;
  }
};
