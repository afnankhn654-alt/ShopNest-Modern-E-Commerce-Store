import React from 'react';

interface InfoPageProps {
  title: string;
  contentKey?: string;
}

const InfoPage: React.FC<InfoPageProps> = ({ title, contentKey }) => {
  
  // Placeholder content generator based on the page type
  const getContent = (key?: string) => {
    switch(key) {
      case 'careers':
        return (
          <div className="space-y-6">
            <p className="text-lg">Join the ShopNest team! We are looking for innovators, creators, and problem solvers.</p>
            <div className="grid gap-4 md:grid-cols-2 mt-8">
              {['Frontend Engineer', 'Product Designer', 'Supply Chain Manager', 'AI Specialist'].map(job => (
                <div key={job} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow bg-white dark:bg-gray-800">
                  <h3 className="font-bold text-xl mb-2">{job}</h3>
                  <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">Remote / Hybrid</p>
                  <button className="text-primary-600 font-medium hover:underline">View Details &rarr;</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'investors':
        return (
            <div className="space-y-6">
                <p className="text-lg">ShopNest is growing rapidly. Explore our financial reports and investor resources.</p>
                <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2">Q3 2024 Earnings Report</h3>
                    <p className="mb-4">Strong growth in consumer electronics and home goods sectors.</p>
                    <button className="bg-gray-900 text-white px-4 py-2 rounded">Download PDF</button>
                </div>
            </div>
        );
      case 'help':
        return (
           <div className="space-y-6">
             <div className="relative">
                <input type="text" placeholder="Search for help..." className="w-full p-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800" />
             </div>
             <div className="grid md:grid-cols-3 gap-6">
                {['Track Order', 'Returns & Refunds', 'Payment Settings', 'Account Security', 'Prime Membership', 'Contact Us'].map(topic => (
                    <div key={topic} className="p-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-center hover:border-primary-500 cursor-pointer">
                        <h4 className="font-bold">{topic}</h4>
                    </div>
                ))}
             </div>
           </div>
        );
      default:
        return (
          <div className="space-y-6">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              This is the official page for <strong>{title}</strong> at ShopNest. 
              We are currently updating our resources to provide you with the most up-to-date information.
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              Please check back soon for detailed updates regarding {title.toLowerCase()}.
            </p>
            <div className="p-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-lg">
               <h3 className="font-bold text-lg mb-2">Contact Us</h3>
               <p>Need immediate assistance regarding {title}?</p>
               <p className="text-primary-600 mt-2">support@shopnest.com</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-800 dark:text-gray-200">
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-12">
           <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
           <div className="h-1 w-20 bg-primary-600 rounded"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {getContent(contentKey)}
      </div>
    </div>
  );
};

export default InfoPage;
