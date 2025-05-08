import React, { useState, useEffect } from 'react';
import { MessageSquare, Heart, Send, Trash2 } from 'lucide-react';
import { db, Message } from './db';

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [newMessage, setNewMessage] = useState({ from: '', message: '' });

  // Load messages from Dexie on mount
  useEffect(() => {
    const loadMessages = async () => {
      const allMessages = await db.messages.toArray();
      setMessages(allMessages);
    };
    loadMessages();
  }, []);

  const openMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  const closeMessage = () => {
    setSelectedMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.from && newMessage.message) {
      const newMsg: Message = {
        id: Date.now(),
        from: newMessage.from,
        message: newMessage.message,
      };
      await db.messages.add(newMsg);
      setMessages(prev => [...prev, newMsg]);
      setNewMessage({ from: '', message: '' });
    }
  };

  const handleDelete = async (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    await db.messages.delete(id);
    setMessages(prev => prev.filter(msg => msg.id !== id));
    if (selectedMessage?.id === id) setSelectedMessage(null);
  };

  return (
    <section id="messages" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <MessageSquare className="h-12 w-12 text-pink-500 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4 text-gray-800">Birthday Wishes</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Share your birthday wishes with Trisha!
          </p>
        </div>

        {/* Add Message Form */}
        <div className="max-w-2xl mx-auto mb-16 bg-white rounded-xl shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                id="name"
                value={newMessage.from}
                onChange={(e) => setNewMessage({ ...newMessage, from: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Your Message</label>
              <textarea
                id="message"
                value={newMessage.message}
                onChange={(e) => setNewMessage({ ...newMessage, message: e.target.value })}
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-pink-500 focus:ring focus:ring-pink-200"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full inline-flex justify-center items-center bg-pink-500 text-white px-6 py-3 rounded-full hover:bg-pink-600 transition-colors"
            >
              <Send className="mr-2 h-5 w-5" />
              Send Wish
            </button>
          </form>
        </div>

        {/* Messages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 group cursor-pointer overflow-hidden transform hover:-translate-y-1 relative"
              onClick={() => openMessage(message)}
            >
              <div className="h-3 bg-gradient-to-r from-pink-400 to-purple-500"></div>
              <button
                onClick={(e) => handleDelete(message.id, e)}
                className="absolute top-4 right-4 p-2 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-10"
              >
                <Trash2 size={16} />
              </button>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  {message.avatar ? (
                    <img
                      src={message.avatar}
                      alt={message.from}
                      className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-pink-100"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center text-white font-bold mr-4">
                      {message.from.charAt(0)}
                    </div>
                  )}
                  <h3 className="font-semibold text-lg text-gray-800">{message.from}</h3>
                </div>
                <p className="text-gray-600 line-clamp-3 mb-3 group-hover:text-gray-800 transition-colors duration-300">
                  {message.message}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">Tap to read more</span>
                  <Heart className="h-4 w-4 text-pink-400 group-hover:text-pink-500 transition-colors duration-300" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full message modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75">
          <div
            className="bg-white rounded-xl shadow-2xl max-w-lg w-full max-h-[80vh] overflow-auto relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-t-xl"></div>
            <div className="absolute top-3 right-3 flex space-x-2">
              <button
                className="text-gray-500 hover:text-gray-800 text-3xl leading-none"
                onClick={closeMessage}
              >
                &times;
              </button>
              <button
                onClick={(e) => handleDelete(selectedMessage.id, e)}
                className="p-1.5 bg-red-500 rounded-full text-white hover:bg-red-600 flex items-center justify-center"
              >
                <Trash2 size={18} />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-center mb-6">
                {selectedMessage.avatar ? (
                  <img
                    src={selectedMessage.avatar}
                    alt={selectedMessage.from}
                    className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-pink-100"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-pink-300 to-purple-300 flex items-center justify-center text-white font-bold mr-4">
                    {selectedMessage.from.charAt(0)}
                  </div>
                )}
                <h3 className="font-bold text-xl text-gray-800">{selectedMessage.from}</h3>
              </div>

              <div className="prose max-w-none text-gray-700">
                <p className="text-lg leading-relaxed">
                  {selectedMessage.message}
                </p>
              </div>

              <div className="mt-6 text-center">
                <Heart className="h-8 w-8 mx-auto text-pink-500 fill-pink-100" />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Messages;

