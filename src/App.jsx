

import MainLayout from './Layouts/MainLayout';
import Sidebar from './components/Sidebar';
import ChatWindow from './components/Chatwindow';
import AICopilotPanel from './components/AICopilotPanel';


function App() {
  return (
    
      <MainLayout>
      <Sidebar />
      <ChatWindow />
      <AICopilotPanel />
    </MainLayout>
   
     
   
  );
}

export default App;
