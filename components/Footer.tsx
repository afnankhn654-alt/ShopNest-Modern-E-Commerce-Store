import React from 'react';
import * as ReactRouterDOM from 'react-router-dom';

const { Link } = ReactRouterDOM as any;

const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const footerLinks = {
    "Get to Know Us": [
      { name: "About ShopNest", path: "/about" },
      { name: "Investor Relations", path: "/investors" }
    ],
    "Let Us Help You": [
      { name: "Your Account", path: "/profile" },
      { name: "Your Orders", path: "/orders" },
      { name: "Shipping Rates & Policies", path: "/shipping" },
      { name: "Returns & Replacements", path: "/returns" },
      { name: "Manage Your Content and Devices", path: "/content-devices" },
      { name: "Help", path: "/help" }
    ]
  };

  return (
    <footer className="font-sans text-sm">
      <button 
        onClick={scrollToTop} 
        className="w-full bg-slate-700 hover:bg-slate-600 text-white py-4 text-sm font-semibold transition-colors"
      >
        Back to top
      </button>

      <div className="bg-slate-800 text-white py-12 border-b border-slate-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h3 className="font-bold text-base mb-4 text-white">{title}</h3>
                <ul className="space-y-2">
                  {links.map((link, index) => (
                    <li key={index}>
                      <Link 
                        to={link.path} 
                        className="text-gray-300 hover:text-white hover:underline text-xs leading-5 block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-slate-800 text-white py-8 border-b border-slate-700">
         <div className="container mx-auto px-4 flex flex-col items-center gap-6">
            <Link to="/" className="text-2xl font-bold text-white flex items-center gap-1">
              ShopNest
            </Link>
            <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300">
               <button className="border border-gray-500 rounded px-2 py-1 hover:border-white">English</button>
               <button className="border border-gray-500 rounded px-2 py-1 hover:border-white">$ USD - U.S. Dollar</button>
               <button className="border border-gray-500 rounded px-2 py-1 hover:border-white">🇺🇸 United States</button>
            </div>
         </div>
      </div>

      <div className="bg-slate-900 text-gray-400 py-8 text-xs text-center">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-4 max-w-4xl mx-auto justify-center">
             <Link to="/help" className="hover:underline">Conditions of Use</Link>
             <Link to="/help" className="hover:underline">Privacy Notice</Link>
             <Link to="/help" className="hover:underline">Consumer Health Data Privacy Disclosure</Link>
             <Link to="/help" className="hover:underline">Your Ads Privacy Choices</Link>
        </div>
        <p>&copy; 1996-{new Date().getFullYear()}, ShopNest.com, Inc. or its affiliates</p>
      </div>
    </footer>
  );
};

export default Footer;