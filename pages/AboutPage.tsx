import React from 'react';
import { SparklesIcon, CubeTransparentIcon, GlobeAmericasIcon, UserGroupIcon, LightBulbIcon } from '@heroicons/react/24/outline';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 min-h-screen font-sans text-gray-800 dark:text-gray-200 overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <div className="relative w-full h-[80vh] flex items-center justify-center overflow-hidden bg-gray-900">
        {/* Animated Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-40">
           <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-600 rounded-full blur-[120px] animate-pulse-slow"></div>
           <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-600 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
           <div className="absolute top-[40%] left-[30%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px] opacity-60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
           <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-sm font-medium tracking-widest uppercase text-blue-200 animate-fade-in">
             Welcome to the Future of Retail
           </div>
           <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 mb-6 tracking-tight drop-shadow-2xl animate-slide-up">
             About ShopNest
           </h1>
           <p className="text-xl md:text-3xl font-light text-gray-300 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-100">
             A Smarter Store for a Smarter World.
           </p>
           <div className="mt-12 h-px w-24 bg-gradient-to-r from-transparent via-blue-500 to-transparent mx-auto"></div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
           <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
        </div>
      </div>

      {/* --- VISION STATEMENT --- */}
      <div className="py-24 px-4 bg-white dark:bg-gray-900 relative">
         <div className="max-w-4xl mx-auto text-center">
            <p className="text-2xl md:text-3xl font-medium leading-relaxed text-gray-600 dark:text-gray-300">
              <span className="text-primary-600 dark:text-primary-400 font-bold">ShopNest</span> isn’t just an online store — it’s a new way of thinking about shopping. 
              A place where <span className="text-indigo-500">innovation</span>, <span className="text-purple-500">personalization</span>, and <span className="text-blue-500">convenience</span> come together to create an experience that feels effortless from the second you land on our homepage.
            </p>
         </div>
      </div>

      {/* --- OUR STORY SECTION --- */}
      <div className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gray-50 dark:bg-gray-800/50 skew-y-3 transform origin-top-left scale-110"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2">
                <div className="relative rounded-2xl overflow-hidden shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-700">
                   <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000" alt="Office space" className="w-full h-auto object-cover" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                      <div className="text-white">
                         <h3 className="text-2xl font-bold">Born from Passion</h3>
                         <p className="opacity-80">Established 2024</p>
                      </div>
                   </div>
                </div>
             </div>
             
             <div className="lg:w-1/2 space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">Our Story</h2>
                <div className="space-y-6 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                   <p>
                     ShopNest began with a simple yet powerful vision: to build a modern, intelligent, and trusted store where quality meets convenience. Born from a passion for technology and a deep understanding of what customers truly need, ShopNest was created to make reliable products easy to find, easy to trust, and easy to buy.
                   </p>
                   <p>
                     What started as an idea has grown into a space crafted with care — combining smart product selection, a smooth shopping experience, and a design that keeps you at the center. With a focus on quality, fast delivery, and a user-friendly experience, ShopNest is built for today’s shopper.
                   </p>
                   <div className="pl-6 border-l-4 border-primary-500 italic text-gray-700 dark:text-gray-200 text-xl">
                     "At ShopNest, we believe shopping should feel simple, trustworthy, and enjoyable. That’s why every detail — from product discovery to checkout — is refined to make your experience better."
                   </div>
                   <p className="font-semibold text-primary-600 dark:text-primary-400">
                     ShopNest isn’t just a store; it’s where smart choices and great products come together effortlessly.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* --- WHY WE BUILT IT (GRID) --- */}
      <div className="py-24 bg-gray-900 text-white relative">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
         <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16">Why We Built ShopNest</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
               {[
                  { icon: CubeTransparentIcon, title: "Clarity", text: "Because shopping shouldn’t feel confusing." },
                  { icon: SparklesIcon, title: "Quality", text: "Because quality shouldn’t be hard to find." },
                  { icon: GlobeAmericasIcon, title: "Modernity", text: "Because modern consumers deserve a modern store." },
                  { icon: LightBulbIcon, title: "Innovation", text: "Because technology should improve shopping, not complicate it." }
               ].map((item, idx) => (
                  <div key={idx} className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-2xl hover:bg-white/10 transition-colors group">
                     <item.icon className="h-12 w-12 text-blue-400 mb-6 group-hover:scale-110 transition-transform" />
                     <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                     <p className="text-gray-400 text-lg">{item.text}</p>
                  </div>
               ))}
            </div>
            
            <div className="text-center mt-16 max-w-2xl mx-auto">
               <p className="text-2xl font-medium text-gray-300">
                  ShopNest is built for people who want <span className="text-white border-b-2 border-blue-500">clarity</span>, <span className="text-white border-b-2 border-purple-500">quality</span>, and <span className="text-white border-b-2 border-indigo-500">confidence</span> in every purchase.
               </p>
            </div>
         </div>
      </div>

      {/* --- TECH & TRUST --- */}
      <div className="py-24 px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-gray-900 text-white flex items-center justify-center min-h-[60vh]">
         <div className="max-w-6xl mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="md:w-1/2">
               <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
                  Powered by <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">Technology</span>.<br/>
                  Driven by <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Trust</span>.
               </h2>
               <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                  From AI-driven personalization to real-time product insights, ShopNest uses smart systems so our customers shop smarter — not harder.
               </p>
               <p className="text-2xl font-light text-white border-l-4 border-white pl-6">
                  We don’t just bring products to you.<br/>
                  We bring the <strong>right products</strong>, at the <strong>right price</strong>, with the <strong>right experience</strong>.
               </p>
            </div>
            <div className="md:w-1/2 relative">
               {/* Decorative Abstract Tech Visual */}
               <div className="relative w-full aspect-square max-w-md mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-tr from-blue-500 to-purple-500 rounded-full blur-[80px] opacity-40 animate-pulse-slow"></div>
                  <div className="relative z-10 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                     <div className="flex items-center space-x-4 mb-6">
                        <UserGroupIcon className="h-10 w-10 text-blue-300" />
                        <div>
                           <h4 className="text-xl font-bold">Designed Around You</h4>
                           <p className="text-sm text-gray-300">Adaptive. Intuitive. Beautiful.</p>
                        </div>
                     </div>
                     <p className="text-gray-200">
                        Every page, every feature, and every detail of ShopNest is crafted to feel natural, intuitive, and beautiful. A store that adapts to your device, your preferences, and your shopping style.
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>

      {/* --- CONCLUSION / CTA --- */}
      <div className="py-32 text-center bg-white dark:bg-gray-900 px-4">
         <h2 className="text-4xl md:text-6xl font-black mb-8 text-gray-900 dark:text-white tracking-tight">
            Welcome to ShopNest
         </h2>
         <p className="text-2xl text-primary-600 dark:text-primary-400 font-medium mb-12">
            Where Smart Shopping Begins.
         </p>
         <a href="/#/products" className="inline-block px-10 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-lg font-bold rounded-full hover:shadow-2xl hover:scale-105 transition-all duration-300">
            Start Exploring
         </a>
      </div>

    </div>
  );
};

export default AboutPage;
