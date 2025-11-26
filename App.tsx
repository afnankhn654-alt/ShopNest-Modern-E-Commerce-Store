import React, { Suspense, lazy, useEffect } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { LocationProvider } from './contexts/LocationContext';
import { LoadingProvider } from './contexts/LoadingContext';
import { NotificationProvider } from './contexts/NotificationContext';
import { useDeviceDetection } from './hooks/useDeviceDetection';
import Header from './components/Header';
import Footer from './components/Footer';
import BottomNavBar from './components/BottomNavBar';
import MobileLayout from './components/MobileLayout';
import TopLoader from './components/TopLoader';
import Spinner from './components/Spinner';
import OnboardingModal from './components/OnboardingModal';
import NotificationHost from './components/NotificationHost';
import AuthPromptModal from './components/AuthPromptModal';

const { HashRouter, Routes, Route, useLocation } = ReactRouterDOM as any;

const HomePage = lazy(() => import('./pages/HomePage'));
const ProductListPage = lazy(() => import('./pages/ProductListPage'));
const ProductDetailPage = lazy(() => import('./pages/ProductDetailPage'));
const CartPage = lazy(() => import('./pages/CartPage'));
const AuthPage = lazy(() => import('./pages/AuthPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const WishlistPage = lazy(() => import('./pages/WishlistPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const InfoPage = lazy(() => import('./pages/InfoPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const OrdersPage = lazy(() => import('./pages/OrdersPage'));

const DesktopLayoutWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex flex-col min-h-screen animate-gradient-bg text-gray-800 dark:text-gray-200 transition-colors duration-300">
    <Header />
    <main className="flex-grow flex flex-col pb-24 md:pb-0">
      {children}
    </main>
    <Footer />
    <BottomNavBar />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { isDesktop } = useDeviceDetection();
  const { isNewGoogleUser, completeGoogleOnboarding } = useAuth();

  const RoutesContent = (
    <Suspense 
      fallback={
        <div className="flex-grow flex items-center justify-center min-h-[50vh]">
          <Spinner />
        </div>
      }
    >
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductListPage />} />
        <Route path="/products/:category" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/careers" element={<InfoPage title="Careers" contentKey="careers" />} />
        <Route path="/blog" element={<InfoPage title="ShopNest Blog" />} />
        <Route path="/investors" element={<InfoPage title="Investor Relations" contentKey="investors" />} />
        <Route path="/devices" element={<InfoPage title="ShopNest Devices" />} />
        <Route path="/science" element={<InfoPage title="ShopNest Science" />} />
        <Route path="/sell" element={<InfoPage title="Sell Products on ShopNest" />} />
        <Route path="/sell-business" element={<InfoPage title="Sell on ShopNest Business" />} />
        <Route path="/sell-apps" element={<InfoPage title="Sell Apps on ShopNest" />} />
        <Route path="/affiliate" element={<InfoPage title="Become an Affiliate" />} />
        <Route path="/advertise" element={<InfoPage title="Advertise Your Products" />} />
        <Route path="/self-publish" element={<InfoPage title="Self-Publish with Us" />} />
        <Route path="/host-hub" element={<InfoPage title="Host a ShopNest Hub" />} />
        <Route path="/business-card" element={<InfoPage title="ShopNest Business Card" />} />
        <Route path="/shop-with-points" element={<InfoPage title="Shop with Points" />} />
        <Route path="/reload-balance" element={<InfoPage title="Reload Your Balance" />} />
        <Route path="/currency-converter" element={<InfoPage title="ShopNest Currency Converter" />} />
        <Route path="/covid-19" element={<InfoPage title="ShopNest and COVID-19" />} />
        <Route path="/shipping" element={<InfoPage title="Shipping Rates & Policies" />} />
        <Route path="/returns" element={<InfoPage title="Returns & Replacements" />} />
        <Route path="/content-devices" element={<InfoPage title="Manage Your Content and Devices" />} />
        <Route path="/help" element={<InfoPage title="Help Center" contentKey="help" />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );

  const mainContent = isDesktop ? (
    <DesktopLayoutWrapper>{RoutesContent}</DesktopLayoutWrapper>
  ) : (
    <MobileLayout>{RoutesContent}</MobileLayout>
  );
  
  return (
    <>
      <OnboardingModal isOpen={isNewGoogleUser} onClose={completeGoogleOnboarding} />
      <AuthPromptModal />
      {mainContent}
    </>
  );
};

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <LoadingProvider>
        <LocationProvider>
          <AuthProvider>
            <NotificationProvider>
              <CartProvider>
                <WishlistProvider>
                  <HashRouter>
                    <ScrollToTop />
                    <TopLoader />
                    <NotificationHost />
                    <AppContent />
                  </HashRouter>
                </WishlistProvider>
              </CartProvider>
            </NotificationProvider>
          </AuthProvider>
        </LocationProvider>
      </LoadingProvider>
    </ThemeProvider>
  );
};

export default App;