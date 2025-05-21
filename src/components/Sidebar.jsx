// src/components/Sidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';

const chats = [
  {
    id: 1,
    name: 'Luis - Github',
    message: 'Hey! I have a question...',
    time: '45m',
    unread: false,
    active: true,
  },
  {
    id: 2,
    name: 'Ivan - Nike',
    message: 'Hi there, I have a qu...',
    time: '30m',
    unread: true,
    active: false,
  },
  {
    id: 3,
    name: 'Lead from New York',
    message: 'Good morning, let me...',
    time: '40m',
    unread: true,
    active: false,
  },
  {
    id: 4,
    name: 'Booking API problems',
    message: 'Bug report',
    time: '45m',
    unread: false,
    active: false,
  },
  {
    id: 5,
    name: 'Miracle - Exemplary Bank',
    message: 'Hey there, I’m here to...',
    time: '45m',
    unread: false,
    active: false,
  },
];

const Sidebar = () => {
  return (
    <aside className="border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto bg-white dark:bg-gray-900 w-full">
      {/* Inbox Header */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Your inbox</h2>
        <div className="flex justify-between items-center text-sm text-gray-500 mt-1">
          <span>{chats.length} Open</span>
          <button className="hover:underline transition-all duration-200">Waiting longest ▼</button>
        </div>
      </div>

      {/* Chat List */}
      <ul className="space-y-2">
        {chats.map((chat, index) => (
          <motion.li
            key={chat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 ${
              chat.active ? 'bg-[#e7e7ff] shadow-sm' : ''
            }`}
          >
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-800 truncate w-4/5">{chat.name}</span>
              <span className="text-xs text-gray-500">{chat.time}</span>
            </div>
            <div className="flex justify-between items-center mt-1">
              <span className="text-sm text-gray-500 truncate w-4/5">{chat.message}</span>
              {chat.unread && (
                <span className="w-2 h-2 bg-black rounded-full ml-2 shrink-0"></span>
              )}
            </div>
          </motion.li>
        ))}
      </ul>

      


    </aside>
  );
};

export default Sidebar;
