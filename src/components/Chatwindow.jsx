// src/components/ChatWindow.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const messages = [
  {
    id: 1,
    from: 'user',
    text: `I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.`,
    time: '1min',
  },
  {
    id: 2,
    from: 'agent',
    text: `Let me just look into this for you, Luis.`,
    time: '1min',
    seen: true,
  },
];

const ChatWindow = () => {

const [displayedText, setDisplayedText] = useState('');
const [typing, setTyping] = useState(true);
const fullText = "Let me just look into this for you, Luis.";

useEffect(() => {
   if(!typing) return;
   let index = 0;
   const interval = setInterval(() => {
    setDisplayedText((prev) => prev + fullText[index]);
    index++;
    if(index === fullText.length) {
      clearInterval(interval);
      setTyping(false);
    }
   }, 30);
   return () => clearInterval(interval); 
}, [typing])

  return (
    <div className="flex flex-col h-full border-r border-gray-200 bg-white bg-white dark:bg-gray-900 text-black dark:text-white h-full p-4">
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b">
        <h2 className="font-medium text-gray-800">Luis Easton</h2>
        <button className="text-sm text-gray-600 hover:text-black border border-gray-300 px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-100">
          Close
        </button>
      </div>

      {/* Message area */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
        {messages.map((msg, index) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.from === 'user' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`max-w-[80%] p-3 rounded-lg shadow-sm text-sm ${
              msg.from === 'user'
                ? 'bg-gray-100 text-gray-800 self-start'
                : 'bg-blue-100 text-blue-900 self-end ml-auto'
            }`}
          >
            <p>{msg.text}</p>
            <div className="text-xs text-right mt-1 text-gray-500">
              {msg.seen ? 'Seen · ' : ''} {msg.time}
            </div>
          </motion.div>
        ))}

        {/* Typing animation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-sm italic text-gray-400 px-2"
        >
          Fin is typing...
        </motion.div>
      </div>

      {/* Typing input */}
      <div className="border-t px-4 py-3 bg-white">
        <input
          type="text"
          placeholder="Type a message..."
          className="w-full rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
        />
      </div>
    </div>
  );
};

export default ChatWindow;
