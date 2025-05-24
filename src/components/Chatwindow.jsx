
import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import MessageBubble from './MessageBubble';


const ChatWindow = ({ selectedChat }) => {
  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [displayedMessages, setDisplayedMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const [listening, setListening] = useState(false);
  const scrollRef = useRef(null);
  const fileInputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!selectedChat) return;
    setDisplayedMessages([
      { id: 1, 
        from: 'user', 
        text: selectedChat.message || 'Hello!', 
        time: 'Just now',
        avatar: selectedChat.name, 
    }
    ]);
    setTyping(true);

    const timeout = setTimeout(() => {
      setDisplayedMessages((prev) => [
        ...prev,
        { id: 2, 
          from: 'agent', 
          text: `Hi ${selectedChat.name.split(' ')[0]}, how can I help you?`, 
          time: 'Just now',
          avatar: selectedChat.name, 
        }
      ]);
      setTyping(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [selectedChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [displayedMessages, typing]);

  const handleSend = () => {
    if (!message.trim()) return;
    setDisplayedMessages((prev) => [
      ...prev,
      { id: Date.now(), from: 'user', text: message, time: 'Just now' }
    ]);
    setMessage('');
    setShowEmojiPicker(false);
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Voice recognition not supported.');
      return;
    }

    if (listening) {
      recognitionRef.current.stop();
      setListening(false);
    } else {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'en-US';
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setMessage((prev) => prev + ' ' + transcript);
      };
      recognition.onend = () => setListening(false);
      recognitionRef.current = recognition;
      recognition.start();
      setListening(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setDisplayedMessages((prev) => [
      ...prev,
      { id: Date.now(), from: 'user', text: `📎 Sent file: ${file.name}`, time: 'Just now' }
    ]);
  };

  if (!selectedChat) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        Select a chat to start messaging
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-4 bg-white dark:bg-gray-900 text-black dark:text-white relative">
      {/* Header */}
      <h2 className="text-lg font-semibold mb-4">{selectedChat.name}</h2>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 px-2">


{displayedMessages.map((msg) => (
  <MessageBubble
    key={msg.id}
    message={msg}
    isUser={msg.from === 'user'}
    avatar={msg.avatar}
  />
))}









        {typing && <MessageBubble isTyping={true} />}


        <div ref={scrollRef} />
      </div>

      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="absolute bottom-24 left-4 z-50">
          <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
        </div>
      )}

      {/* Input */}
      <div className="flex items-center gap-2 border-t pt-3">
        {/* Emoji Button */}
        <button onClick={() => setShowEmojiPicker((prev) => !prev)} className="text-xl">😊</button>

        {/* Attachment */}
        <button onClick={() => fileInputRef.current.click()} className="text-gray-600">
          <Paperclip className="w-5 h-5" />
        </button>
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />

        {/* Input */}
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 p-2 border rounded-md dark:bg-gray-800 dark:border-gray-600"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* Mic Animation */}
        {listening && (
          <motion.div className="flex gap-1 items-end h-5">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 bg-blue-500 rounded-full"
                animate={{ height: ['0.5rem', '1.5rem', '0.5rem'] }}
                transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        )}

        {/* Mic Button */}
        <button onClick={handleVoiceInput}>
          {listening ? <MicOff className="text-red-500 w-5 h-5" /> : <Mic className="text-gray-600 w-5 h-5" />}
        </button>

        {/* Send */}
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
