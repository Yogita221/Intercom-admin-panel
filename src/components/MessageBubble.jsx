import React from 'react';
import { motion } from 'framer-motion';

const MessageBubble = ({ message, isUser, isTyping = false, avatar }) => {
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(avatar)}&background=${isUser ? '888888' : '2563eb'}&color=fff`;

  const aiAvatar = 'https://ui-avatars.com/api/?name=Fin&background=2563eb&color=fff';

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-start' : 'justify-end'} mb-4`}>
      {!isUser && (
        <img
          src={aiAvatar}
          alt='AI'
          className="w-8 h-8 rounded-full border border-blue-400"
        />
      )}

      {isTyping ? (
        <motion.div
          className={`px-3 py-2 rounded-lg bg-blue-100 text-blue-900 text-sm max-w-[60%]`}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        >
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.1s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.3s]" />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, x: isUser ? -20 : 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`px-3 py-2 rounded-lg shadow-sm text-sm max-w-[60%] ${
            isUser
              ? 'bg-gray-100 text-gray-800'
              : 'bg-blue-100 text-blue-900'
          }`}
        >
          <p>{message.text}</p>
          <div className="text-xs text-right text-gray-500 mt-1">{message.time}</div>
        </motion.div>
      )}

      {isUser && (
        <img
          src={avatarUrl}
          alt={avatar}
          className="w-8 h-8 rounded-full border border-gray-400"
        />
      )}
    </div>
  );
};

export default MessageBubble;
