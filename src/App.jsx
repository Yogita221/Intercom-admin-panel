
// import React from 'react';
// import MainLayout from './Layouts/MainLayout';
// import Sidebar from './components/Sidebar';
// import ChatWindow from './components/Chatwindow';
// import AICopilotPanel from './components/AICopilotPanel';

// function App() {
//   return (
//     <MainLayout>
//       <div className="flex flex-col md:flex-row w-full h-full">
        
//       <div className="w-full md:w-1/4 border-r h-[300px] md:h-full">
//           <Sidebar />
//         </div>

//        <div className="w-full md:w-2/4 h-full">
//           <ChatWindow />
//         </div>

//        <div className="w-full md:w-1/4 h-[300px] md:h-full">
//           <AICopilotPanel />
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

// export default App;


import React from 'react';
import MainLayout from './Layouts/MainLayout';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/Chatwindow';
import AICopilotPanel from './components/AICopilotPanel';

function App() {
  return (
    <MainLayout>
      <div className="border-r h-full">
        <Sidebar />
      </div>

      <div className="h-full">
        <ChatWindow />
      </div>

      <div className="border-l h-full">
        <AICopilotPanel />
      </div>
    </MainLayout>
  );
}

export default App;
