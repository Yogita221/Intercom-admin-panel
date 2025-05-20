import React from 'react';

const toggleTheme = () => {
  document.documentElement.classList.toggle("dark");
};

const MainLayout = ({ children }) => {
  return (
    <div className="h-screen w-screen flex flex-col dark:bg-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-3 border-b dark:border-gray-700">
        <h1 className="text-lg font-semibold">AI Copilot Messenger</h1>
        <button
          onClick={toggleTheme}
          className="text-sm px-3 py-1 border rounded hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          Toggle Theme
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid md:grid-cols-3 grid-cols-1 overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
