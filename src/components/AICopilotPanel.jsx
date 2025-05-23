import React, { useState, useEffect } from 'react';
import { Send, Mic } from 'lucide-react';
import { motion } from 'framer-motion';


const AICopilotPanel = () => {

  

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isListening, setIsListening] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { from: 'user', text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    simulateTyping("This is a smart AI response. 🚀");
  };

  const simulateTyping = (text) => {
    setIsTyping(true);
    setTypingText('');

    let index = 0;
    const interval = setInterval(() => {
      setTypingText((prev) => prev + text[index]);
      index++;

      if (index >= text.length) {
        clearInterval(interval);
        setMessages((prev) => [...prev, { from: 'bot', text }]);
        setIsTyping(false);
        setTypingText('');
      }
    }, 40); // adjust speed here
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setIsListening(false);
    recognition.onerror = () => setIsListening(false);

    recognition.start();
  };

  

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col h-full bg-gradient-to-br from-white via-[#e5e5f7] to-[#3e1f78] dark:from-gray-800 dark:via-gray-900 dark:to-gray-800"
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-gray-200 dark:border-gray-700">
        <div className="flex space-x-4 text-sm font-medium text-gray-600 dark:text-gray-300">
          <button className="text-black dark:text-white border-b-2 border-black dark:border-white pb-1">AI Copilot</button>
           <button className="hover:text-black dark:hover:text-white">Details</button>
         
        </div>
        <button className="hover:opacity-80">🔳</button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 text-sm text-gray-800 dark:text-gray-200">
        {messages.length === 0 && !isTyping ? (
          <div className="flex flex-col justify-center items-center h-full text-center">
            <div className="text-2xl font-semibold text-gray-800 dark:text-white">Hi, I’m Fin AI Copilot</div>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">Ask me anything about this conversation.</p>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-2 rounded-md ${msg.from === 'user' ? 'bg-blue-100 dark:bg-blue-900' : 'bg-gray-100 dark:bg-gray-700'}`}
              >
                <strong className="capitalize">{msg.from}:</strong> {msg.text}
              </div>
            ))}
            {isTyping && (
              <div className="p-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 italic">
                <strong>bot:</strong> {typingText}
              </div>
            )}
          </>
        )}
      </div>

      {/* Suggestions & Input */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-3">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span
            onClick={() => {
              setInput('How do I get a refund?');
              handleSend();
            }}
            className="inline-flex items-center px-2 py-1 bg-white dark:bg-gray-700 border dark:border-gray-600 rounded-md shadow-sm cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
          >
            ✨ How do I get a refund?
          </span>
        </div>
        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 bg-white dark:bg-gray-700">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a question..."
            className="flex-1 outline-none text-sm text-gray-700 dark:text-white dark:bg-gray-700 placeholder-gray-400 dark:placeholder-gray-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleVoiceInput}
            title="Speak"
            className={`mr-2 ${isListening ? 'text-red-500' : 'text-gray-500'} hover:text-blue-500 transition`}
          >
            <Mic className="w-4 h-4" />
          </button>
          <button
            onClick={handleSend}
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 transition"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default AICopilotPanel;


