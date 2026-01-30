
import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../contexts/CartContext';
import { useLocation } from '../contexts/LocationContext';
import * as ReactRouterDOM from 'react-router-dom';
import { processPayment, PaymentMethod } from '../services/paymentService';
import { 
  LockClosedIcon, 
  ShieldCheckIcon, 
  TruckIcon, 
  CreditCardIcon, 
  CheckCircleIcon,
  ClockIcon,
  SparklesIcon,
  UserGroupIcon,
  BanknotesIcon,
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';

const { useNavigate } = ReactRouterDOM as any;

// --- Sub-components for the Creative Checkout ---

// 1. 3D Credit Card Component
const CreditCardVisual: React.FC<{ 
  number: string, 
  name: string, 
  expiry: string, 
  cvc: string, 
  isFlipped: boolean 
}> = ({ number, name, expiry, cvc, isFlipped }) => {
  return (
    <div className="group w-full h-56 perspective-1000 mx-auto max-w-[360px]">
      <div className={`relative w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
        
        {/* Front */}
        <div className="absolute w-full h-full backface-hidden rounded-2xl p-6 text-white shadow-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-gray-700">
           {/* Abstract Holographic Mesh Background */}
           <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
           <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500 rounded-full blur-[60px] opacity-40"></div>
           <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500 rounded-full blur-[60px] opacity-40"></div>
           
           <div className="relative z-10 flex flex-col justify-between h-full">
             <div className="flex justify-between items-start">
               <img src="https://img.icons8.com/color/48/000000/chip-card.png" alt="chip" className="h-10 opacity-90" />
               <span className="font-mono text-lg tracking-widest italic opacity-80">VISA</span>
             </div>
             
             <div className="font-mono text-2xl tracking-[0.15em] drop-shadow-md">
               {number || '•••• •••• •••• ••••'}
             </div>
             
             <div className="flex justify-between items-end">
               <div>
                 <div className="text-[10px] uppercase opacity-70 mb-1">Card Holder</div>
                 <div className="font-mono text-sm tracking-wider uppercase truncate max-w-[200px]">{name || 'YOUR NAME'}</div>
               </div>
               <div>
                 <div className="text-[10px] uppercase opacity-70 mb-1">Expires</div>
                 <div className="font-mono text-sm tracking-wider">{expiry || 'MM/YY'}</div>
               </div>
             </div>
           </div>
        </div>

        {/* Back */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-2xl bg-gradient-to-bl from-gray-800 to-gray-900 shadow-2xl border border-gray-700 overflow-hidden">
           <div className="w-full h-12 bg-black mt-6 relative">
              <div className="absolute inset-0 bg-repeat-x opacity-20" style={{backgroundImage: 'linear-gradient(45deg, #333 25%, transparent 25%, transparent 75%, #333 75%, #333)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px'}}></div>
           </div>
           <div className="p-6 mt-2">
             <div className="flex flex-col items-end">
               <span className="text-xs text-gray-300 mr-2 mb-1">CVC</span>
               <div className="w-full bg-white text-gray-900 font-mono text-right px-3 py-2 rounded">
                 {cvc || '•••'}
               </div>
             </div>
             <div className="mt-8 flex justify-center opacity-50">
               <ShieldCheckIcon className="h-12 w-12 text-gray-400" />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

// 2. Slide to Pay Component
const SlideToPay: React.FC<{ onComplete: () => void, amount: string, label?: string }> = ({ onComplete, amount, label = "SLIDE TO PAY" }) => {
  const [sliderVal, setSliderVal] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  const handleDrag = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging || !trackRef.current) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const rect = trackRef.current.getBoundingClientRect();
    const offsetX = clientX - rect.left;
    const percentage = Math.min(Math.max(0, (offsetX / rect.width) * 100), 100);
    setSliderVal(percentage);

    if (percentage > 95) {
      setIsDragging(false);
      setSliderVal(100);
      onComplete();
    }
  };

  useEffect(() => {
    const stopDrag = () => {
      if (isDragging) {
        setIsDragging(false);
        if (sliderVal < 95) setSliderVal(0);
      }
    };
    window.addEventListener('mouseup', stopDrag);
    window.addEventListener('touchend', stopDrag);
    return () => {
      window.removeEventListener('mouseup', stopDrag);
      window.removeEventListener('touchend', stopDrag);
    };
  }, [isDragging, sliderVal]);

  return (
    <div className="relative w-full h-16 bg-gray-200 dark:bg-gray-700 rounded-full shadow-inner overflow-hidden select-none border border-gray-300 dark:border-gray-600" ref={trackRef}
      onMouseMove={handleDrag}
      onTouchMove={handleDrag}
      onMouseDown={(e) => e.preventDefault()}
    >
      {/* Background Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <span className="text-gray-400 font-bold tracking-widest animate-pulse uppercase">{label} {amount}</span>
      </div>
      
      {/* Fill Progress */}
      <div 
        className="absolute left-0 top-0 bottom-0 bg-green-500 transition-all duration-75 ease-linear"
        style={{ width: `${sliderVal}%` }}
      ></div>

      {/* Thumb */}
      <div 
        className="absolute top-1 bottom-1 w-14 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing z-10 transition-all duration-75 ease-linear group"
        style={{ left: `calc(${sliderVal}% - ${sliderVal > 90 ? 56 : 0}px)` }}
        onMouseDown={() => setIsDragging(true)}
        onTouchStart={() => setIsDragging(true)}
      >
        <div className="text-primary-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
        </div>
      </div>
    </div>
  );
};

// 3. Social Proof Ticker
const LiveTicker: React.FC = () => {
  const [msg, setMsg] = useState("Someone in New York just purchased NeoSound Earbuds");
  
  useEffect(() => {
    const messages = [
      "Someone in London just purchased Aura Yoga Mat",
      "24 people are viewing the Checkout page",
      "Stock running low on Trend Items",
      "Michael from Toronto bought Urban Explorer Backpack",
      "Verified Secure Session Established",
      "Free Shipping qualification verified"
    ];
    const interval = setInterval(() => {
      setMsg(messages[Math.floor(Math.random() * messages.length)]);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-md text-white py-2 z-50 overflow-hidden border-t border-gray-700">
      <div className="flex items-center justify-center space-x-2 animate-fade-in">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
        <span className="text-xs sm:text-sm font-mono tracking-wide">{msg}</span>
      </div>
    </div>
  );
};

const CheckoutPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { formatPrice } = useLocation();
  const navigate = useNavigate();

  // Payment Method Selection
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  // Form State
  const [formData, setFormData] = useState({
    // Stripe
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: '',
    zip: '',
    // JazzCash / EasyPaisa
    mobileNumber: '',
    cnic: '',
    // PayPal
    paypalEmail: ''
  });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  
  // UX State
  const [step, setStep] = useState<'review' | 'payment' | 'success'>('review');
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes
  const [processing, setProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Timer Logic
  useEffect(() => {
    if (timeLeft <= 0) return;
    const interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Basic formatting
    let formatted = value;
    if (name === 'cardNumber') {
      formatted = value.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
    } else if (name === 'expiry') {
      formatted = value.replace(/\D/g, '').slice(0, 4).replace(/(.{2})/, '$1/').slice(0, 5);
    } else if (name === 'cvc') {
      formatted = value.replace(/\D/g, '').slice(0, 3);
    }
    
    setFormData(prev => ({ ...prev, [name]: formatted }));
  };

  const handlePaymentComplete = async () => {
    setProcessing(true);
    setErrorMsg('');

    try {
        const result = await processPayment({
            method: paymentMethod,
            amount: cartTotal + 5,
            data: {
                cardNumber: formData.cardNumber,
                cvc: formData.cvc,
                expiry: formData.expiry,
                mobileNumber: formData.mobileNumber,
                email: formData.paypalEmail
            }
        });

        if (result.success) {
            setStep('success');
            clearCart();
            setTimeout(() => navigate('/'), 4000);
        } else {
            setErrorMsg(result.error || "Payment Failed. Please try again.");
            setProcessing(false);
        }
    } catch (e) {
        setErrorMsg("An unexpected error occurred.");
        setProcessing(false);
    }
  };

  if (cartItems.length === 0 && step !== 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center p-8 glass-panel rounded-2xl shadow-xl">
          <h1 className="text-2xl font-bold mb-4">Cart Empty</h1>
          <button onClick={() => navigate('/')} className="text-primary-600 hover:underline">Return to Shop</button>
        </div>
      </div>
    );
  }

  // --- SUCCESS VIEW ---
  if (step === 'success') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white relative overflow-hidden">
        {/* Confetti CSS Placeholder - in a real app use a library, here simple CSS particles */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 animate-pulse-slow"></div>
        <div className="z-10 text-center p-10 glass-panel rounded-3xl shadow-2xl border border-green-500/30 max-w-lg w-full mx-4 transform transition-all duration-1000 scale-100 opacity-100">
          <div className="mx-auto w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(34,197,94,0.6)]">
            <CheckCircleIcon className="w-14 h-14 text-white" />
          </div>
          <h1 className="text-4xl font-black mb-2 shiny-text">ORDER SECURED</h1>
          <p className="text-gray-300 text-lg mb-8">Your gear is being prepared for deployment.</p>
          <div className="bg-gray-800/50 rounded-lg p-4 mb-8 text-left border border-gray-700">
             <div className="flex justify-between text-sm text-gray-400 mb-2">
               <span>Transaction ID</span>
               <span className="font-mono">#TX-{Math.floor(Math.random() * 1000000)}</span>
             </div>
             <div className="flex justify-between text-sm text-gray-400 mb-2">
               <span>Payment Method</span>
               <span className="font-mono uppercase">{paymentMethod}</span>
             </div>
             <div className="flex justify-between text-lg font-bold">
               <span>Total Paid</span>
               <span className="text-green-400">{formatPrice(cartTotal + 5)}</span>
             </div>
          </div>
          <p className="text-sm text-gray-500">Redirecting to home base...</p>
        </div>
      </div>
    );
  }

  // --- MAIN CHECKOUT VIEW ---
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-100 pb-20 relative overflow-x-hidden">
      <LiveTicker />
      
      {/* Background Decor */}
      <div className="fixed top-0 right-0 w-[500px] h-[500px] bg-primary-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-4 lg:px-8 py-8 relative z-10">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight flex items-center gap-2">
              <LockClosedIcon className="h-8 w-8 text-primary-500" />
              SECURE CHECKOUT
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 flex items-center gap-2">
              <ShieldCheckIcon className="h-4 w-4 text-green-500" />
              Multi-Gateway Encryption Active
            </p>
          </div>
          
          {/* Scarcity Timer */}
          <div className="mt-4 md:mt-0 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg border border-red-200 dark:border-red-800 flex items-center gap-2 shadow-sm animate-pulse-slow">
             <ClockIcon className="h-5 w-5" />
             <span className="font-mono font-bold text-xl">{formatTime(timeLeft)}</span>
             <span className="text-xs uppercase font-bold tracking-wider">Inventory Reserved</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: VISUAL SUMMARY (Ticket Style) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="glass-panel rounded-3xl p-6 lg:p-8 relative overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.01]">
              <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
              
              <h2 className="text-xl font-bold mb-6 flex items-center">
                <span className="bg-gray-100 dark:bg-gray-700 text-xs px-2 py-1 rounded mr-2 uppercase tracking-wide">Receipt</span>
                Order Summary
              </h2>

              <div className="space-y-4 max-h-[400px] overflow-y-auto scrollbar-hide pr-2">
                {cartItems.map((item) => (
                  <div key={item.variant.variant_id} className="flex gap-4 group">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden shadow-md">
                      <img src={item.product.images[0].image_url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                      <div className="absolute bottom-0 right-0 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded-tl-lg font-bold">
                        x{item.quantity}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-sm line-clamp-1">{item.product.title}</h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{item.product.brand} | {Object.values(item.variant.options).join(' ')}</p>
                      <p className="font-mono text-primary-600 dark:text-primary-400 font-bold">{formatPrice(item.variant.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Dotted Line */}
              <div className="my-6 border-t-2 border-dashed border-gray-300 dark:border-gray-600 relative">
                <div className="absolute -left-9 -top-3 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full"></div>
                <div className="absolute -right-9 -top-3 w-6 h-6 bg-gray-50 dark:bg-gray-950 rounded-full"></div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>{formatPrice(cartTotal)}</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                  <span className="flex items-center gap-1"><TruckIcon className="h-4 w-4"/> Shipping</span>
                  <span className="text-green-500 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-gray-500 dark:text-gray-400">
                   <span className="flex items-center gap-1"><ShieldCheckIcon className="h-4 w-4"/> Secure Processing</span>
                   <span>$5.00</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-between items-end">
                 <div className="text-xs text-gray-400">TOTAL DUE</div>
                 <div className="text-3xl font-black shiny-text">{formatPrice(cartTotal + 5)}</div>
              </div>
              
              {/* Savings Badge */}
              {cartItems.some(i => i.product.discount_pct > 0) && (
                <div className="mt-4 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-center py-2 rounded-lg text-sm font-bold border border-green-200 dark:border-green-800 flex items-center justify-center gap-2">
                  <SparklesIcon className="h-4 w-4" />
                  You are saving big on this order!
                </div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: INTERACTIVE TERMINAL */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            
            {/* Progress Steps */}
            <div className="flex mb-8 items-center justify-center lg:justify-start gap-4">
               <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${step === 'review' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>
                  <span className="font-bold">1</span>
                  <span className="text-sm font-medium">Details</span>
               </div>
               <div className="w-12 h-0.5 bg-gray-300 dark:bg-gray-700"></div>
               <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${step === 'payment' ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' : 'bg-gray-200 dark:bg-gray-800 text-gray-500'}`}>
                  <span className="font-bold">2</span>
                  <span className="text-sm font-medium">Payment</span>
               </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden relative min-h-[500px]">
              
              {/* Step 1: Shipping Details */}
              <div className={`p-8 transition-all duration-500 absolute inset-0 ${step === 'review' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 -translate-x-full z-0 pointer-events-none'}`}>
                 <h2 className="text-2xl font-bold mb-6">Where should we send your gear?</h2>
                 <div className="grid grid-cols-2 gap-6 mb-6">
                    <div className="col-span-2">
                       <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Full Name</label>
                       <input type="text" placeholder="John Doe" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Email for Receipt</label>
                       <input type="email" placeholder="john@example.com" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                    </div>
                    <div className="col-span-2">
                       <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Street Address</label>
                       <input type="text" placeholder="123 Innovation Blvd" className="w-full bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary-500 outline-none transition-all" />
                    </div>
                 </div>
                 
                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3 mb-8">
                    <TruckIcon className="h-6 w-6 text-blue-500 mt-0.5" />
                    <div>
                       <h4 className="font-bold text-blue-700 dark:text-blue-300">Express Delivery Included</h4>
                       <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Due to high order volume, we've upgraded your shipping to Priority at no extra cost.</p>
                    </div>
                 </div>

                 <button 
                   onClick={() => setStep('payment')}
                   className="w-full bg-primary-600 text-white font-bold py-4 rounded-xl hover:bg-primary-700 hover:shadow-lg hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2"
                 >
                    Continue to Secure Payment <CheckCircleIcon className="h-5 w-5"/>
                 </button>
              </div>

              {/* Step 2: Payment Selector & Forms */}
              <div className={`p-8 transition-all duration-500 absolute inset-0 flex flex-col ${step === 'payment' ? 'opacity-100 translate-x-0 z-10' : 'opacity-0 translate-x-full z-0 pointer-events-none'}`}>
                 <button onClick={() => setStep('review')} className="absolute top-6 left-6 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 text-sm font-medium z-20">← Back to Details</button>
                 
                 <div className="mt-8 mb-6">
                    <label className="block text-xs font-bold uppercase text-gray-400 mb-2">Select Method</label>
                    <div className="grid grid-cols-5 gap-2">
                        {[
                            { id: 'stripe', icon: CreditCardIcon, label: 'Card' },
                            { id: 'jazzcash', icon: DevicePhoneMobileIcon, label: 'JazzCash', color: 'text-red-500' },
                            { id: 'easypaisa', icon: QrCodeIcon, label: 'EasyPaisa', color: 'text-green-500' },
                            { id: 'paypal', icon: GlobeAltIcon, label: 'PayPal', color: 'text-blue-500' },
                            { id: 'cod', icon: BanknotesIcon, label: 'COD' }
                        ].map((m) => (
                            <button
                                key={m.id}
                                onClick={() => setPaymentMethod(m.id as PaymentMethod)}
                                className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${paymentMethod === m.id ? 'bg-primary-50 dark:bg-primary-900/20 border-primary-500 text-primary-600' : 'bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-700 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}`}
                            >
                                <m.icon className={`h-6 w-6 mb-1 ${m.color || ''}`} />
                                <span className="text-[10px] font-bold">{m.label}</span>
                            </button>
                        ))}
                    </div>
                 </div>

                 {/* DYNAMIC CONTENT AREA */}
                 <div className="flex-grow flex flex-col">
                    
                    {/* STRIPE VIEW */}
                    {paymentMethod === 'stripe' && (
                        <>
                            <div className="flex-shrink-0 mb-8 flex justify-center transform scale-90 sm:scale-100">
                                <CreditCardVisual 
                                number={formData.cardNumber}
                                name={formData.cardName}
                                expiry={formData.expiry}
                                cvc={formData.cvc}
                                isFlipped={focusedInput === 'cvc'}
                                />
                            </div>
                            <div className="space-y-4">
                                <div className="relative">
                                    <CreditCardIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input 
                                        name="cardNumber"
                                        type="text" 
                                        placeholder="Card Number" 
                                        maxLength={19}
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-black rounded-xl outline-none font-mono transition-all shadow-inner"
                                        value={formData.cardNumber}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedInput('number')}
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input 
                                        name="cardName"
                                        type="text" 
                                        placeholder="Name on Card" 
                                        className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-black rounded-xl outline-none transition-all shadow-inner"
                                        value={formData.cardName}
                                        onChange={handleInputChange}
                                        onFocus={() => setFocusedInput('name')}
                                    />
                                    <div className="grid grid-cols-2 gap-4">
                                        <input 
                                            name="expiry"
                                            type="text" 
                                            placeholder="MM/YY" 
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-black rounded-xl outline-none font-mono text-center transition-all shadow-inner"
                                            value={formData.expiry}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedInput('expiry')}
                                        />
                                        <input 
                                            name="cvc"
                                            type="text" 
                                            placeholder="CVC" 
                                            maxLength={3}
                                            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-black rounded-xl outline-none font-mono text-center transition-all shadow-inner"
                                            value={formData.cvc}
                                            onChange={handleInputChange}
                                            onFocus={() => setFocusedInput('cvc')}
                                            onBlur={() => setFocusedInput(null)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}

                    {/* JAZZCASH / EASYPAISA VIEW */}
                    {(paymentMethod === 'jazzcash' || paymentMethod === 'easypaisa') && (
                        <div className="flex flex-col justify-center h-full space-y-6">
                            <div className="text-center">
                                {paymentMethod === 'jazzcash' ? (
                                    <div className="bg-red-600 text-white w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
                                        <span className="font-bold text-xl">Jazz</span>
                                    </div>
                                ) : (
                                    <div className="bg-green-500 text-white w-20 h-20 rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-4">
                                        <span className="font-bold text-xl">EP</span>
                                    </div>
                                )}
                                <h3 className="text-xl font-bold">Pay with {paymentMethod === 'jazzcash' ? 'JazzCash' : 'EasyPaisa'}</h3>
                                <p className="text-gray-500 text-sm">Enter your mobile account details below.</p>
                            </div>

                            <div className="space-y-4 max-w-sm mx-auto w-full">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Mobile Number</label>
                                <input 
                                    name="mobileNumber"
                                    type="text" 
                                    placeholder="03XX-XXXXXXX" 
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-black rounded-xl outline-none font-mono transition-all shadow-inner text-lg text-center"
                                    value={formData.mobileNumber}
                                    onChange={handleInputChange}
                                />
                                <p className="text-xs text-center text-gray-400">You will receive a confirmation prompt on your phone.</p>
                            </div>
                        </div>
                    )}

                    {/* PAYPAL VIEW */}
                    {paymentMethod === 'paypal' && (
                         <div className="flex flex-col justify-center h-full space-y-6">
                            <div className="text-center">
                                <div className="bg-blue-600 text-white w-20 h-20 rounded-full mx-auto flex items-center justify-center shadow-lg mb-4">
                                    <span className="font-bold italic text-2xl">P</span>
                                </div>
                                <h3 className="text-xl font-bold">Pay with PayPal</h3>
                                <p className="text-gray-500 text-sm">Safe, secure, and protected.</p>
                            </div>
                            <div className="space-y-4 max-w-sm mx-auto w-full">
                                <label className="block text-xs font-bold uppercase text-gray-400 mb-1">PayPal Email</label>
                                <input 
                                    name="paypalEmail"
                                    type="email" 
                                    placeholder="you@example.com" 
                                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border-2 border-transparent focus:border-primary-500 focus:bg-white dark:focus:bg-black rounded-xl outline-none transition-all shadow-inner text-center"
                                    value={formData.paypalEmail}
                                    onChange={handleInputChange}
                                />
                            </div>
                         </div>
                    )}

                    {/* COD VIEW */}
                    {paymentMethod === 'cod' && (
                         <div className="flex flex-col justify-center h-full space-y-6">
                            <div className="text-center">
                                <div className="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-200 w-24 h-24 rounded-full mx-auto flex items-center justify-center shadow-inner mb-4">
                                    <BanknotesIcon className="h-10 w-10" />
                                </div>
                                <h3 className="text-xl font-bold">Cash on Delivery</h3>
                                <p className="text-gray-500 text-sm max-w-xs mx-auto">Pay in cash when our courier delivers the package to your doorstep.</p>
                            </div>
                            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-xl border border-yellow-200 dark:border-yellow-800 text-sm text-yellow-800 dark:text-yellow-200 text-center">
                                ⚠ Please have exact change ready upon delivery.
                            </div>
                         </div>
                    )}

                 </div>

                 {/* Action Area */}
                 <div className="mt-8">
                   {errorMsg && (
                       <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-300 rounded-lg text-sm text-center font-medium">
                           {errorMsg}
                       </div>
                   )}
                   
                   {processing ? (
                      <div className="w-full h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center animate-pulse gap-3">
                         <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
                         <span className="font-bold text-gray-500">Contacting Gateway...</span>
                      </div>
                   ) : (
                      <SlideToPay 
                        onComplete={handlePaymentComplete} 
                        amount={formatPrice(cartTotal + 5)}
                        label={paymentMethod === 'cod' ? "SLIDE TO CONFIRM" : "SLIDE TO PAY"}
                      />
                   )}
                   <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                      <LockClosedIcon className="h-3 w-3" />
                      Payments are secure and encrypted.
                   </p>
                 </div>

              </div>
            </div>

            {/* Guarantees */}
            <div className="mt-8 grid grid-cols-3 gap-4 text-center">
               <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <div className="text-2xl mb-1">↩️</div>
                  <div className="font-bold text-xs">30-Day Returns</div>
               </div>
               <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <div className="text-2xl mb-1">🛡️</div>
                  <div className="font-bold text-xs">Warranty Included</div>
               </div>
               <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                  <div className="text-2xl mb-1">📞</div>
                  <div className="font-bold text-xs">24/7 Support</div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
