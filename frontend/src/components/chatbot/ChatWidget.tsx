'use client';

import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';

interface Message {
    text: string;
    sender: 'user' | 'bot';
}

const ChatWidget: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    const handleSendMessage = async (text: string) => {
        const userMessage: Message = { text, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message: text }),
            });

            const data = await response.json();
            const botMessage: Message = { text: data.reply || data.response, sender: 'bot' };
            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            const errorMessage: Message = { text: 'Sorry, something went wrong.', sender: 'bot' };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {isOpen ? (
                <div className="w-80 bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
                        <span className="font-semibold">Chat Support</span>
                        <button onClick={() => setIsOpen(false)} className="text-white hover:text-gray-200">
                            ×
                        </button>
                    </div>
                    <div className="p-4 h-80 overflow-y-auto">
                        {messages.length === 0 && (
                            <p className="text-gray-500 text-center">Start a conversation...</p>
                        )}
                        {messages.map((msg, index) => (
                            <ChatMessage key={index} message={msg} />
                        ))}
                        {loading && <ChatMessage message={{ text: 'Typing...', sender: 'bot' }} />}
                    </div>
                    <ChatInput onSendMessage={handleSendMessage} />
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default ChatWidget;