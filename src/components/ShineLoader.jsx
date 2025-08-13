import { useEffect, useState } from 'react';
import './ShineLoader.css';

const ShineLoader = ({ size = 'md', className = '' }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const sizeClasses = {
    sm: 'h-8 w-8',
    md: 'h-16 w-16',
    lg: 'h-24 w-24',
    xl: 'h-32 w-32'
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm dark:bg-black/40 ${className}`}>
      <div className="relative flex flex-col items-center">
        {/* Logo */}
        <div className="mb-6">
          <img 
            src="/assets/logo.png" 
            alt="Royal Sunshine Logo" 
            className="w-20 h-20 lg:w-24 lg:h-24 animate-pulse-slow"
          />
        </div>
        
        {/* Loading animation for logo */}
        <div className="relative">
          {/* Shine effect on logo */}
          <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shine"></div>
          </div>
          
          {/* Pulse effect on logo */}
          <div className="absolute inset-0 rounded-full bg-primary-500/20 animate-pulse-slow"></div>
        </div>
        
        {/* Loading text */}
        <div className="mt-4 text-center">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300 animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShineLoader;
