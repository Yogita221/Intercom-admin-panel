
import React, { useState } from 'react';


const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};

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
  

  return (
    <div className="h-screen w-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-300 overflow-hidden">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 border-b dark:border-gray-700 shrink-0">
        <h1 className="text-lg font-semibold">AI Copilot Messenger</h1>
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 border border-blue-200 rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Toggle Theme
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
