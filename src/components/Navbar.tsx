import React, { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  return (
    <header className={`sticky top-0 z-40 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-white/80 backdrop-blur-md shadow-sm' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Heart className="h-8 w-8 text-pink-500 fill-pink-200" />
            <span className="ml-2 text-xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Trisha's Birthday
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['Home', 'Gallery', 'Timeline', 'Messages'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-pink-500 transition-colors duration-200 font-medium text-sm"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="md:hidden">
            <button className="p-2 rounded-md text-gray-700 hover:text-pink-500 focus:outline-none">
              <span className="block h-0.5 w-6 bg-current mb-1"></span>
              <span className="block h-0.5 w-6 bg-current mb-1"></span>
              <span className="block h-0.5 w-6 bg-current"></span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;