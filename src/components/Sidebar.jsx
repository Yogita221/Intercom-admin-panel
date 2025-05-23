import React from 'react';
import { motion } from 'framer-motion';

const chats = [
  { id: 1, name: 'Luis - Github', message: 'Hey! I have a question...', time: '45m', unread: false },
  { id: 2, name: 'Ivan - Nike', message: 'Hi there, I have a qu...', time: '30m', unread: true },
  { id: 3, name: 'Lead from New York', message: 'Good morning, let me...', time: '40m', unread: true },
  { id: 4, name: 'Booking API problems', message: 'Bug report', time: '45m', unread: false },
  { id: 5, name: 'Miracle - Exemplary Bank', message: 'Hey there, I am here to...', time: '45m', unread: false },
  { id: 6, name: 'Sophia - Travel Agency', message: 'Can you help with booking?', time: '40m', unread: true },
  { id: 7, name: 'Mark - Tech Support', message: 'System update completed.', time: '45m', unread: false },
  { id: 8, name: 'Anna - Marketing', message: 'New campaign launch soon!', time: '40m', unread: true },
  { id: 9, name: 'Customer Service', message: 'Your ticket has been resolved.', time: '45m', unread: false },
];

const Sidebar = ({ onSelectChat, selectedChatId }) => {
  return (
    <aside className="border-r border-gray-200 dark:border-gray-700 p-4 overflow-y-auto bg-white dark:bg-gray-900 w-full">
      <div className="flex flex-col h-full bg-gradient-to-br from-[#3e1f78] via-[#e5e5f7] to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 p-2 rounded-xl">
        
        {/* Animated Inbox Header */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Your inbox</h2>
          <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
            <span>{chats.length} Open</span>
            <button className="hover:underline transition-all duration-200">Waiting longest ▼</button>
          </div>
        </motion.div>

        {/* Chat List */}
        <ul className="space-y-2">
          {chats.map((chat, index) => (
            <motion.li
              key={chat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                selectedChatId === chat.id ? 'bg-[#e7e7ff] dark:bg-gray-700 shadow-sm' : ''
              }`}
              onClick={() => onSelectChat(chat)}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-800 dark:text-white truncate w-4/5">{chat.name}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">{chat.time}</span>
              </div>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm text-gray-500 dark:text-gray-400 truncate w-4/5">{chat.message}</span>
                {chat.unread && (
                  <span className="w-2 h-2 bg-black dark:bg-white rounded-full ml-2 shrink-0"></span>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
