
import { Region } from '../types';

// A comprehensive list of countries with approximate exchange rates relative to USD (Base 1.0)
// Rates are illustrative approximations.
export const ALL_COUNTRIES: Region[] = [
  // North America
  { code: 'US', name: 'United States', flag: '🇺🇸', currencyCode: 'USD', currencySymbol: '$', exchangeRate: 1.0, locale: 'en-US', continent: 'NA' },
  { code: 'CA', name: 'Canada', flag: '🇨🇦', currencyCode: 'CAD', currencySymbol: 'CA$', exchangeRate: 1.35, locale: 'en-CA', continent: 'NA' },
  { code: 'MX', name: 'Mexico', flag: '🇲🇽', currencyCode: 'MXN', currencySymbol: '$', exchangeRate: 16.7, locale: 'es-MX', continent: 'NA' },

  // Europe
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧', currencyCode: 'GBP', currencySymbol: '£', exchangeRate: 0.79, locale: 'en-GB', continent: 'EU' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪', currencyCode: 'EUR', currencySymbol: '€', exchangeRate: 0.92, locale: 'de-DE', continent: 'EU' },
  { code: 'FR', name: 'France', flag: '🇫🇷', currencyCode: 'EUR', currencySymbol: '€', exchangeRate: 0.92, locale: 'fr-FR', continent: 'EU' },
  { code: 'IT', name: 'Italy', flag: '🇮🇹', currencyCode: 'EUR', currencySymbol: '€', exchangeRate: 0.92, locale: 'it-IT', continent: 'EU' },
  { code: 'ES', name: 'Spain', flag: '🇪🇸', currencyCode: 'EUR', currencySymbol: '€', exchangeRate: 0.92, locale: 'es-ES', continent: 'EU' },
  { code: 'NL', name: 'Netherlands', flag: '🇳🇱', currencyCode: 'EUR', currencySymbol: '€', exchangeRate: 0.92, locale: 'nl-NL', continent: 'EU' },
  { code: 'SE', name: 'Sweden', flag: '🇸🇪', currencyCode: 'SEK', currencySymbol: 'kr', exchangeRate: 10.4, locale: 'sv-SE', continent: 'EU' },
  { code: 'NO', name: 'Norway', flag: '🇳🇴', currencyCode: 'NOK', currencySymbol: 'kr', exchangeRate: 10.6, locale: 'nb-NO', continent: 'EU' },
  { code: 'CH', name: 'Switzerland', flag: '🇨🇭', currencyCode: 'CHF', currencySymbol: 'CHF', exchangeRate: 0.88, locale: 'de-CH', continent: 'EU' },
  { code: 'PL', name: 'Poland', flag: '🇵🇱', currencyCode: 'PLN', currencySymbol: 'zł', exchangeRate: 3.95, locale: 'pl-PL', continent: 'EU' },
  
  // Asia
  { code: 'JP', name: 'Japan', flag: '🇯🇵', currencyCode: 'JPY', currencySymbol: '¥', exchangeRate: 150.5, locale: 'ja-JP', continent: 'AS' },
  { code: 'CN', name: 'China', flag: '🇨🇳', currencyCode: 'CNY', currencySymbol: '¥', exchangeRate: 7.23, locale: 'zh-CN', continent: 'AS' },
  { code: 'IN', name: 'India', flag: '🇮🇳', currencyCode: 'INR', currencySymbol: '₹', exchangeRate: 83.5, locale: 'en-IN', continent: 'AS' },
  { code: 'KR', name: 'South Korea', flag: '🇰🇷', currencyCode: 'KRW', currencySymbol: '₩', exchangeRate: 1340, locale: 'ko-KR', continent: 'AS' },
  { code: 'ID', name: 'Indonesia', flag: '🇮🇩', currencyCode: 'IDR', currencySymbol: 'Rp', exchangeRate: 15800, locale: 'id-ID', continent: 'AS' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬', currencyCode: 'SGD', currencySymbol: 'S$', exchangeRate: 1.34, locale: 'en-SG', continent: 'AS' },
  { code: 'TH', name: 'Thailand', flag: '🇹🇭', currencyCode: 'THB', currencySymbol: '฿', exchangeRate: 36.5, locale: 'th-TH', continent: 'AS' },
  { code: 'VN', name: 'Vietnam', flag: '🇻🇳', currencyCode: 'VND', currencySymbol: '₫', exchangeRate: 25000, locale: 'vi-VN', continent: 'AS' },
  { code: 'AE', name: 'United Arab Emirates', flag: '🇦🇪', currencyCode: 'AED', currencySymbol: 'dh', exchangeRate: 3.67, locale: 'ar-AE', continent: 'AS' },
  { code: 'SA', name: 'Saudi Arabia', flag: '🇸🇦', currencyCode: 'SAR', currencySymbol: '﷼', exchangeRate: 3.75, locale: 'ar-SA', continent: 'AS' },

  // Oceania
  { code: 'AU', name: 'Australia', flag: '🇦🇺', currencyCode: 'AUD', currencySymbol: 'A$', exchangeRate: 1.52, locale: 'en-AU', continent: 'OC' },
  { code: 'NZ', name: 'New Zealand', flag: '🇳🇿', currencyCode: 'NZD', currencySymbol: 'NZ$', exchangeRate: 1.65, locale: 'en-NZ', continent: 'OC' },

  // South America
  { code: 'BR', name: 'Brazil', flag: '🇧🇷', currencyCode: 'BRL', currencySymbol: 'R$', exchangeRate: 5.05, locale: 'pt-BR', continent: 'SA' },
  { code: 'AR', name: 'Argentina', flag: '🇦🇷', currencyCode: 'ARS', currencySymbol: '$', exchangeRate: 860, locale: 'es-AR', continent: 'SA' },
  { code: 'CL', name: 'Chile', flag: '🇨🇱', currencyCode: 'CLP', currencySymbol: '$', exchangeRate: 950, locale: 'es-CL', continent: 'SA' },
  { code: 'CO', name: 'Colombia', flag: '🇨🇴', currencyCode: 'COP', currencySymbol: '$', exchangeRate: 3850, locale: 'es-CO', continent: 'SA' },

  // Africa
  { code: 'ZA', name: 'South Africa', flag: '🇿🇦', currencyCode: 'ZAR', currencySymbol: 'R', exchangeRate: 18.8, locale: 'en-ZA', continent: 'AF' },
  { code: 'EG', name: 'Egypt', flag: '🇪🇬', currencyCode: 'EGP', currencySymbol: 'E£', exchangeRate: 47.5, locale: 'ar-EG', continent: 'AF' },
  { code: 'NG', name: 'Nigeria', flag: '🇳🇬', currencyCode: 'NGN', currencySymbol: '₦', exchangeRate: 1300, locale: 'en-NG', continent: 'AF' },
  { code: 'KE', name: 'Kenya', flag: '🇰🇪', currencyCode: 'KES', currencySymbol: 'KSh', exchangeRate: 130, locale: 'en-KE', continent: 'AF' },

  // Rest of World (Selection)
  { code: 'TR', name: 'Turkey', flag: '🇹🇷', currencyCode: 'TRY', currencySymbol: '₺', exchangeRate: 32.2, locale: 'tr-TR', continent: 'EU' },
  { code: 'RU', name: 'Russia', flag: '🇷🇺', currencyCode: 'RUB', currencySymbol: '₽', exchangeRate: 92.5, locale: 'ru-RU', continent: 'EU' },
  { code: 'IL', name: 'Israel', flag: '🇮🇱', currencyCode: 'ILS', currencySymbol: '₪', exchangeRate: 3.7, locale: 'he-IL', continent: 'AS' },
  { code: 'PH', name: 'Philippines', flag: '🇵🇭', currencyCode: 'PHP', currencySymbol: '₱', exchangeRate: 56.5, locale: 'en-PH', continent: 'AS' },
  { code: 'MY', name: 'Malaysia', flag: '🇲🇾', currencyCode: 'MYR', currencySymbol: 'RM', exchangeRate: 4.75, locale: 'ms-MY', continent: 'AS' },
  { code: 'PK', name: 'Pakistan', flag: '🇵🇰', currencyCode: 'PKR', currencySymbol: '₨', exchangeRate: 278, locale: 'ur-PK', continent: 'AS' },
  { code: 'BD', name: 'Bangladesh', flag: '🇧🇩', currencyCode: 'BDT', currencySymbol: '৳', exchangeRate: 110, locale: 'bn-BD', continent: 'AS' },
];
