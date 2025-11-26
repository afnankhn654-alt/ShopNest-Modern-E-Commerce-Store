import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { CubeTransparentIcon } from '@heroicons/react/24/outline';

const { Link } = ReactRouterDOM as any;

const NotFoundPage: React.FC = () => {
  return (
    <div className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-gray-900 text-white">
      {/* Animated Starfield Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.04)_0%,rgba(255,255,255,0)_60%)]"></div>
        <div 
          className="absolute inset-0 h-[400px] bg-repeat" 
          style={{
            backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
            animation: 'move-stars 120s linear infinite'
          }}
        ></div>
         <style>{`
          @keyframes move-stars {
            from { background-position: 0 0; }
            to { background-position: -10000px 5000px; }
          }
        `}</style>
      </div>

      {/* Floating Shapes */}
      <CubeTransparentIcon className="absolute top-1/4 left-1/4 h-16 w-16 text-primary-500/20 animate-float" style={{ animationDuration: '8s' }} />
      <CubeTransparentIcon className="absolute top-1/2 right-1/4 h-12 w-12 text-purple-500/20 animate-float" style={{ animationDuration: '10s', animationDelay: '2s' }}/>
      <CubeTransparentIcon className="absolute bottom-1/4 left-1/3 h-24 w-24 text-blue-500/10 animate-float" style={{ animationDuration: '12s', animationDelay: '4s' }} />

      <div className="relative z-10 flex flex-col items-center text-center px-4">
        {/* Glitchy 404 Text */}
        <div className="font-mono text-8xl md:text-9xl font-black relative mb-4" style={{ textShadow: '0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(59, 130, 246, 0.5)' }}>
          <span className="relative z-10">404</span>
          <span className="absolute top-0 left-0 text-purple-500 opacity-80" style={{ clipPath: 'inset(25% 0 50% 0)', animation: 'glitch-1 2s infinite' }}>404</span>
          <span className="absolute top-0 left-0 text-blue-500 opacity-80" style={{ clipPath: 'inset(50% 0 25% 0)', animation: 'glitch-2 2s infinite' }}>404</span>
        </div>
        <style>{`
            @keyframes glitch-1 { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-5px); } 40% { transform: translateX(5px); } 60% { transform: translateX(-5px); } 80% { transform: translateX(5px); } }
            @keyframes glitch-2 { 0%, 100% { transform: translateX(0); } 10% { transform: translateX(5px); } 30% { transform: translateX(-5px); } 50% { transform: translateX(5px); } 70% { transform: translateX(-5px); } 90% { transform: translateX(5px); } }
        `}</style>

        <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-gray-400">
          Lost in the Digital Cosmos?
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-xl mx-auto leading-relaxed">
          The page you're looking for seems to have drifted beyond our galaxy. Don't worry, our navigation systems can guide you back.
        </p>
        
        <Link 
          to="/" 
          className="mt-12 inline-block px-8 py-4 text-lg font-bold text-white bg-primary-600 rounded-full shadow-lg shadow-primary-500/30 hover:bg-primary-700 hover:shadow-xl hover:scale-105 transform transition-all duration-300 ease-in-out"
        >
          Return to Home Base
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;