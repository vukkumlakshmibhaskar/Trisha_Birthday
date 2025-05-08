import React from 'react';
import { Clock, Star } from 'lucide-react';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  image?: string;
  icon?: React.ReactNode;
}

const Timeline: React.FC = () => {
  const events: TimelineEvent[] = [
    {
      date: "January 2025",
      title: "When We getting closer from Colors First Day",
      description: "",
      image: "/32 (29) - Copy.jpg",
      icon: <Star className="h-6 w-6 text-yellow-400" />
    },
    {
      date: "January 2025",
      title: "Colors 2nd Day",
      description: "",
      image: "/32 (23) - Copy.jpg"
    },
    {
      date: "January 2025",
      title: "Colors 3rd Day",
      description: "",
      image: "/32 (25) - Copy.jpg"
    },
    {
      date: "April 2025",
      title: "Fairwell Day",
      description: "",
      image: "/18 - Copy.jpg"
    },
    {
      date: "April 2025",
      title: "Fairwell Day Frame Distribution",
      description: "",
      image: "/27 - Copy.jpg"
    },
    {
      date: "May 2025",
      title: "Signature Day",
      description: "",
      image: "/16 - Copy.jpg"
    }
  ];

  return (
    <section id="timeline" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Clock className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Our Journey</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            A walk down memory lane — from the day we met until today, every moment has been special.
          </p>
        </div>

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-pink-300 to-purple-400 rounded-full"></div>

          {events.map((event, index) => (
            <div 
              key={index}
              className={`flex flex-col md:flex-row items-center mb-16 relative ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Content */}
              <div className="flex-1 md:w-1/2 z-10 group">
                <div 
                  className={`
                    bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300
                    ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}
                    transform transition-transform duration-500 hover:-translate-y-1
                  `}
                >
                  <div className="flex items-center mb-3">
                    {event.icon || <div className="h-5 w-5 bg-pink-400 rounded-full mr-2"></div>}
                    <span className="text-sm font-semibold text-pink-600">{event.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800">{event.title}</h3>
                  <p className="text-gray-600 mb-4">{event.description}</p>
                  
                  {event.image && (
                    <div className="overflow-hidden rounded-lg">
                      <img 
                        src={event.image} 
                        alt={event.title} 
                        className="w-full h-48 object-cover transform transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full shadow-md z-20 border-4 border-white"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;