import React from 'react';

interface ChatMessageProps {
  message: {
    text: string;
    sender: 'user' | 'bot';
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-2`}>
      <div
        className={`max-w-xs px-4 py-2 rounded-lg ${
          isUser ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
        }`}
      >
        <p>{message.text}</p>
      </div>
    </div>
  );
};

export default ChatMessage;