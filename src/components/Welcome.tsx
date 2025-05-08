import React, { useEffect, useRef } from 'react';
import { Gift, Cake, PartyPopper } from 'lucide-react';
import Confetti from '../utils/Confetti';

const Welcome: React.FC = () => {
  const confettiRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (confettiRef.current) {
      const confetti = new Confetti(confettiRef.current);
      confetti.start();
      
      return () => {
        confetti.stop();
      };
    }
  }, []);

  return (
    <section id="home" className="pt-20 pb-32 relative overflow-hidden">
      <div ref={confettiRef} className="absolute inset-0 pointer-events-none"></div>
      
      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block animate-bounce-slow">
          <PartyPopper className="h-16 w-16 text-pink-500 mx-auto mb-4" />
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Happy Birthday Trisha!
          </span>
        </h1>
        
        <div className="mb-10 animate-fade-in-delay">
          <p className="text-xl md:text-2xl text-gray-700 leading-relaxed mb-8">
            To my amazing best friend, who makes every day brighter just by being you.
            Welcome to this special place created just for you on your special day!
          </p>
          
          <div className="inline-flex items-center bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-pink-200/50 transition-all duration-300">
            <Cake className="mr-2 h-5 w-5" />
            <span>Let's Celebrate!</span>
          </div>
        </div>
        
        <div className="relative mt-16 mb-8 max-w-md mx-auto">
          <div className="absolute -inset-1 bg-gradient-to-r from-pink-400 to-purple-500 rounded-lg blur opacity-25 animate-pulse-slow"></div>
          <div className="relative bg-white rounded-lg shadow-xl p-2">
            <img
              src="/1.jpg"
              alt="Trisha's Birthday"
              className="rounded-lg w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-4 -right-4 bg-white p-2 rounded-full shadow-lg border-2 border-pink-200">
            <Gift className="h-8 w-8 text-pink-500" />
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-purple-50 to-transparent"></div>
    </section>
  );
};

export default Welcome;