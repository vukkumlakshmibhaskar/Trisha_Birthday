import React, { useState, useEffect } from 'react';
import { Music, PauseCircle, PlayCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Welcome from './components/Welcome';
import Gallery from './components/Gallery';
import Timeline from './components/Timeline';
import Messages from './components/Messages';
import Footer from './components/Footer';

function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(() => {
    // Check localStorage on load — was it playing before?
    const stored = localStorage.getItem('musicPlaying');
    return stored === 'true'; // true or false
  });
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/Birthday.mp3'); // Replace with actual audio URL
    audio.loop = true;
    setAudioRef(audio);

    const playIfNeeded = async () => {
      if (isPlaying) {
        try {
          await audio.play();
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
          console.warn('Autoplay blocked — waiting for user interaction...');
        }
      }
    };

    // Attempt to auto-play (may be blocked)
    playIfNeeded();

    // Enable auto-play on first interaction if blocked
    const handleFirstInteraction = async () => {
      if (isPlaying && audio.paused) {
        try {
          await audio.play();
        } catch (err) {
          console.warn('Still blocked:', err);
        }
      }
    };

    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('keydown', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef) return;

    if (isPlaying) {
      audioRef.pause();
      setIsPlaying(false);
      localStorage.setItem('musicPlaying', 'false');
    } else {
      audioRef.play();
      setIsPlaying(true);
      localStorage.setItem('musicPlaying', 'true');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-purple-50">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <Welcome />
        <Gallery />
        <Timeline />
        <Messages />
      </main>

      <Footer />

      {/* Music Toggle Button */}
      <button 
        onClick={toggleMusic} 
        className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 border border-pink-200"
      >
        <Music size={18} className="text-pink-500" />
        {isPlaying ? 
          <PauseCircle size={20} className="text-pink-600" /> : 
          <PlayCircle size={20} className="text-pink-600" />
        }
        <span className="text-sm font-medium text-pink-600 hidden sm:inline">
          {isPlaying ? "Pause Music" : "Play Music"}
        </span>
      </button>
    </div>
  );
}

export default App;
