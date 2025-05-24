// import React, { useEffect, useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import EmojiPicker from 'emoji-picker-react';
// import { Mic, MicOff, Paperclip } from 'lucide-react';

// const ChatWindow = ({ selectedChat }) => {
//   const [displayedMessages, setDisplayedMessages] = useState([]);
//   const [typing, setTyping] = useState(false);
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [message, setMessage] = useState('');
//   const [listening, setListening] = useState(false);
//   const scrollRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const recognitionRef = useRef(null);

//   const chatHistories = {
//     1: [
//       {
//         id: 1,
//         from: 'user',
//         text: `I bought a product from your store in November as a Christmas gift for a member of my family. However, it turns out they have something very similar already. I was hoping you'd be able to refund me, as it is un-opened.`,
//         time: '1 min',
//       },
//     ],
//     2: [
//       {
//         id: 1,
//         from: 'user',
//         text: `Hello, I want to return a pair of sneakers.`,
//         time: '2 min',
//       },
//     ],
//     3: [
//       {
//         id: 1,
//         from: 'user',
//         text: `Can you send me more details about your service in New York?`,
//         time: '5 min',
//       },
//     ],
//   };

//   useEffect(() => {
//     if (!selectedChat) return;

//     setDisplayedMessages(chatHistories[selectedChat.id] || []);
//     setTyping(true);

//     const timeout = setTimeout(() => {
//       const response = {
//         id: Date.now(),
//         from: 'agent',
//         text: `Let me just look into this for you, ${selectedChat.name.split(' ')[0]}.`,
//         time: 'Just now',
//       };

//       setDisplayedMessages((prev) => [...prev, response]);
//       setTyping(false);
//     }, 1500);

//     return () => clearTimeout(timeout);
//   }, [selectedChat]);

//   useEffect(() => {
//     scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
//   }, [displayedMessages, typing]);

//   const handleEmojiClick = (emojiData) => {
//     setMessage((prev) => prev + emojiData.emoji);
//   };

//   const handleSend = () => {
//     if (!message.trim()) return;

//     const newMessage = {
//       id: Date.now(),
//       from: 'user',
//       text: message,
//       time: 'Just now',
//     };

//     setDisplayedMessages((prev) => [...prev, newMessage]);
//     setMessage('');
//     setShowEmojiPicker(false);
//   };

//   const handleVoiceInput = () => {
//     if (!('webkitSpeechRecognition' in window)) {
//       alert('Voice recognition not supported in this browser.');
//       return;
//     }

//     if (listening) {
//       recognitionRef.current.stop();
//       setListening(false);
//     } else {
//       const recognition = new window.webkitSpeechRecognition();
//       recognition.lang = 'en-US';
//       recognition.interimResults = false;
//       recognition.onresult = (event) => {
//         const transcript = event.results[0][0].transcript;
//         setMessage((prev) => prev + ' ' + transcript);
//       };
//       recognition.onend = () => {
//         setListening(false);
//       };
//       recognitionRef.current = recognition;
//       recognition.start();
//       setListening(true);
//     }
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     const fileMessage = {
//       id: Date.now(),
//       from: 'user',
//       text: `📎 Sent file: ${file.name}`,
//       time: 'Just now',
//     };
//     setDisplayedMessages((prev) => [...prev, fileMessage]);
//   };

//   if (!selectedChat) {
//     return (
//       <div className="flex items-center justify-center h-full text-gray-400">
//         Select a conversation to start
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col h-full bg-white dark:bg-gray-900 text-black dark:text-white relative">
//       {/* Header */}
//       <div className="flex justify-between items-center px-4 py-3 border-b dark:border-gray-700">
//         <h2 className="font-medium text-gray-800 dark:text-white">{selectedChat.name}</h2>
//         <button className="text-sm text-gray-600 hover:text-black border border-gray-300 px-3 py-1 rounded-md transition-all duration-200 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800">
//           Close
//         </button>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">
//         {displayedMessages.map((msg, index) => (
//           <motion.div
//             key={msg.id}
//             initial={{ opacity: 0, x: msg.from === 'user' ? -20 : 20 }}
//             animate={{ opacity: 1, x: 0 }}
//             transition={{ duration: 0.3, delay: index * 0.1 }}
//             className={`max-w-[80%] p-3 rounded-lg shadow-sm text-sm ${
//               msg.from === 'user'
//                 ? 'bg-gray-100 text-gray-800 self-start'
//                 : 'bg-blue-100 text-blue-900 self-end ml-auto'
//             }`}
//           >
//             <p>{msg.text}</p>
//             <div className="text-xs text-right mt-1 text-gray-500">
//               {msg.seen ? 'Seen · ' : ''} {msg.time}
//             </div>
//           </motion.div>
//         ))}

//         {typing && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: [0, 1, 0] }}
//             transition={{ duration: 1.5, repeat: Infinity }}
//             className="text-sm italic text-gray-400 px-2"
//           >
//             Fin is typing...
//           </motion.div>
//         )}
//         <div ref={scrollRef} />
//       </div>

//       {/* Emoji Picker */}
//       {showEmojiPicker && (
//         <div className="absolute bottom-24 left-4 z-50">
//           <EmojiPicker onEmojiClick={handleEmojiClick} theme="dark" />
//         </div>
//       )}

//       {/* Input Bar */}
//       <div className="border-t px-4 py-3 bg-white dark:bg-gray-800 flex items-center gap-2">
//         {/* Emoji Button */}
//         <button
//           onClick={() => setShowEmojiPicker((prev) => !prev)}
//           className="text-2xl"
//         >
//           😊
//         </button>

//         {/* File Upload */}
//         <button onClick={() => fileInputRef.current.click()} className="text-gray-500 hover:text-gray-700">
//           <Paperclip className="w-5 h-5" />
//         </button>
//         <input
//           ref={fileInputRef}
//           type="file"
//           className="hidden"
//           onChange={handleFileChange}
//         />

//         {/* Text Input */}
//         <input
//           type="text"
//           placeholder="Type a message..."
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
//         />

//        {/* Audio Wave Animation */}
// {listening && (
//   <motion.div
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//     className="flex justify-center gap-1 mb-2"
//   >
//     {[...Array(5)].map((_, i) => (
//       <motion.div
//         key={i}
//         className="w-1.5 bg-blue-500 rounded-full"
//         animate={{
//           height: ['0.5rem', '1.5rem', '0.5rem'],
//         }}
//         transition={{
//           duration: 0.8,
//           repeat: Infinity,
//           delay: i * 0.1,
//         }}
//       />
//     ))}
//   </motion.div>
// )}


//         {/* Voice Input */}
//         <button onClick={handleVoiceInput}>
//           {listening ? (
//             <MicOff className="text-red-500 w-5 h-5" />
//           ) : (
//             <Mic className="text-gray-600 w-5 h-5" />
//           )}
//         </button>

//         {/* Send Button */}
//         <button
//           onClick={handleSend}
//           className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ChatWindow;



// ChatWindow.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Mic, MicOff, Paperclip } from 'lucide-react';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';

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
      { id: 1, from: 'user', text: selectedChat.message || 'Hello!', time: 'Just now' }
    ]);
    setTyping(true);

    const timeout = setTimeout(() => {
      setDisplayedMessages((prev) => [
        ...prev,
        { id: 2, from: 'agent', text: `Hi ${selectedChat.name.split(' ')[0]}, how can I help you?`, time: 'Just now' }
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
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, x: msg.from === 'user' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className={`max-w-[75%] px-4 py-2 rounded-lg text-sm shadow ${
              msg.from === 'user'
                ? 'bg-gray-200 text-black self-start'
                : 'bg-blue-200 text-blue-900 self-end ml-auto'
            }`}
          >
            <p>{msg.text}</p>
            <div className="text-xs text-right text-gray-500 mt-1">{msg.time}</div>
          </motion.div>
        ))}

        {typing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-sm italic text-gray-400"
          >
            Fin is typing...
          </motion.div>
        )}

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
