
import React, { useState, useEffect } from 'react';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';
import { motion } from "framer-motion";


const MainLayout = ({ children }) => {
   const [selectedChat, setSelectedChat] = useState(null);

  const [sidebar, chatWindow, copilotPanel] = children;

  const sidebarWithProps = React.cloneElement(sidebar, {
    onSelectChat: (chat) => setSelectedChat(chat),
  });

  const chatWindowWithProps = React.cloneElement(chatWindow, {
    selectedChat: selectedChat,
  });

  const copilotPanelWithProps = React.cloneElement(copilotPanel, {
    selectedChat: selectedChat,
  });
  

  const [isDarkMode, setIsDarkMode] = useState(false);

  // Apply class to html tag
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };


  return (
    <div className="h-screen w-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 border-b dark:border-gray-700 shrink-0">
       <motion.h1
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
  className="text-3xl font-extrabold bg-gradient-to-r from-[#6a11cb] via-[#2575fc] to-[#6dd5ed] text-transparent bg-clip-text drop-shadow-md tracking-wide"
>
  AI Copilot Messenger
</motion.h1>
      
        <button
  onClick={toggleTheme}
  className="relative inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-800 dark:to-gray-700 border border-gray-300 dark:border-gray-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
>
  {isDarkMode ? (
    <MoonIcon className="w-5 h-5 text-indigo-600 dark:text-yellow-400" />
  ) : (
    <SunIcon className="w-5 h-5 text-yellow-400 dark:text-indigo-400" />
  )}
  <span className="ml-2 text-sm font-semibold text-gray-800 dark:text-gray-100">
    {isDarkMode ? 'Dark' : 'Light'} Mode
  </span>
</button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto md:overflow-hidden">
        {/* For desktop: 3-column grid. For mobile: stacked flex column */}
        <div className="flex flex-col md:grid md:grid-cols-3 h-full">
          {/* Sidebar */}
          <div className="border-r h-full overflow-y-auto">{sidebarWithProps}</div>

          {/* ChatWindow */}
          <div className="border-r h-full overflow-y-auto">{chatWindowWithProps}</div>

          {/* Copilot Panel */}
          <div className="h-full overflow-y-auto">{copilotPanelWithProps}</div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;





// import React, { useState } from 'react';
// import Sidebar from './Sidebar';
// import ChatWindow from './ChatWindow';

// const MainLayout = () => {

//   const [selectedChat, setSelectedChat] = useState(null);

//   return (
  
//     <div className="h-screen flex">
//       {/* Sidebar */}
//       <div className="w-full md:w-1/3 lg:w-1/4 border-r border-gray-300 dark:border-gray-700">
//         <Sidebar selectedChat={selectedChat} onSelectChat={setSelectedChat} />
//       </div>

//       {/* ChatWindow */}
//       <div className="hidden md:flex flex-1">
//         <ChatWindow selectedChat={selectedChat} onClose={() => setSelectedChat(null)} />
//       </div>

//       {/* Mobile ChatView */}
//       {selectedChat && (
//         <div className="md:hidden fixed inset-0 z-50 bg-white dark:bg-gray-900">
//           <ChatWindow selectedChat={selectedChat} onClose={() => setSelectedChat(null)} />
//         </div>
//       )}
//     </div>
//   )
// }

// export default MainLayout
