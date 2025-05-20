import React from 'react';
import { Send } from 'lucide-react';
import { motion } from 'framer-motion';

const AICopilotPanel = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full bg-gradient-to-br from-white via-[#f9f9ff] to-[#f6f1ff] dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Top Tabs */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4 text-sm font-medium text-gray-600 dark:text-gray-300">
          <button className="text-black dark:text-white border-b-2 border-black dark:border-white pb-1">AI Copilot</button>
          <button className="hover:text-black dark:hover:text-white">Details</button>
        </div>
        <button className="hover:opacity-80">🔳</button>
      </div>

      {/* Center Prompt */}
      <div className="flex-1 flex flex-col justify-center items-center text-center px-6">
        <div className="text-2xl font-semibold text-gray-800 dark:text-white">Hi, I’m Fin AI Copilot</div>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
          Ask me anything about this conversation.
        </p>
      </div>

      {/* Suggested + Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="inline-flex items-center px-2 py-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-sm">
            ✨ How do I get a refund?
          </span>
        </div>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700">
          <input
            type="text"
            placeholder="Ask a question..."
            className="flex-1 outline-none text-sm text-gray-700 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
          />
          <button className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition">
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AICopilotPanel;
