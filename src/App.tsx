import React from 'react';
import Chatbot from './components/Chatbot/Chatbot';

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <Chatbot />
    </div>
  );
}

export default App;
