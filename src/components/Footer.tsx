import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-r from-pink-500/10 to-purple-500/10 py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center mb-4">
            <Heart className="h-6 w-6 text-pink-500 fill-pink-200 mr-2" />
            <span className="text-lg font-medium text-gray-700">A small gift from Bhaskar Senior for you Trisha Ji On the Occassion of your Birthday</span>
          </div>
          
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Wishing you the happiest of birthdays and a year filled with joy, laughter, and endless adventures!
          </p>
          
          <nav className="flex justify-center space-x-6 mb-4">
            {['Home', 'Gallery', 'Timeline', 'Messages'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-700 hover:text-pink-500 transition-colors duration-200 text-sm"
              >
                {item}
              </a>
            ))}
          </nav>
          
          <div className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} · Birthday Celebration for Trisha
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;