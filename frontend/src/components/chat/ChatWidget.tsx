'use client';

import React, { useState, useRef, useEffect } from 'react';
import { chatApi } from '../../utils/api';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const ChatWidget: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState('');
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Auto-scroll to bottom when new messages arrive
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Focus input when chat opens
    useEffect(() => {
        if (isOpen) {
            inputRef.current?.focus();
        }
    }, [isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        
        if (!inputText.trim() || loading) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            text: inputText.trim(),
            sender: 'user',
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInputText('');
        setLoading(true);

        try {
            const response = await chatApi.sendMessage(userMessage.text);
            
            const botMessage: Message = {
                id: `bot-${Date.now()}`,
                text: response.response || 'Sorry, I could not process your request.',
                sender: 'bot',
                timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, botMessage]);
        } catch (error) {
            console.error('Error sending message:', error);
            
            const errorMessage: Message = {
                id: `error-${Date.now()}`,
                text: 'Sorry, something went wrong. Please try again later.',
                sender: 'bot',
                timestamp: new Date(),
            };
            
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Chat Window */}
            {isOpen && (
                <div className="absolute bottom-16 right-0 w-80 sm:w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200 animate-slide-in">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                    <span className="text-xl">🤖</span>
                                </div>
                                <div>
                                    <h3 className="font-semibold">PhoneShop Assistant</h3>
                                    <p className="text-xs text-blue-100">
                                        {loading ? 'Typing...' : 'Online'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                                aria-label="Close chat"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Container */}
                    <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                        {messages.length === 0 ? (
                            <div className="h-full flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-3xl">👋</span>
                                </div>
                                <h4 className="font-semibold text-gray-800 mb-2">Welcome to PhoneShop!</h4>
                                <p className="text-sm text-gray-500 max-w-[200px]">
                                    Ask me anything about our products, orders, or get help with your purchase.
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                    {['View products', 'Track order', 'Need help'].map((suggestion) => (
                                        <button
                                            key={suggestion}
                                            onClick={() => {
                                                setInputText(suggestion);
                                                inputRef.current?.focus();
                                            }}
                                            className="text-xs bg-white border border-gray-200 text-gray-600 px-3 py-1.5 rounded-full hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-colors"
                                        >
                                            {suggestion}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {messages.map((message) => (
                                    <div
                                        key={message.id}
                                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div
                                            className={`max-w-[80%] ${
                                                message.sender === 'user'
                                                    ? 'bg-blue-600 text-white rounded-2xl rounded-br-md'
                                                    : 'bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm border border-gray-100'
                                            } px-4 py-2.5`}
                                        >
                                            <p className="text-sm leading-relaxed">{message.text}</p>
                                            <p className={`text-xs mt-1 ${
                                                message.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                                            }`}>
                                                {formatTime(message.timestamp)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="flex justify-start">
                                        <div className="bg-white rounded-2xl rounded-bl-md shadow-sm border border-gray-100 px-4 py-3">
                                            <div className="flex space-x-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>
                        )}
                    </div>

                    {/* Input Form */}
                    <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100">
                        <div className="flex items-center space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputText}
                                onChange={(e) => setInputText(e.target.value)}
                                placeholder="Type your message..."
                                disabled={loading}
                                className="flex-1 px-4 py-2.5 bg-gray-100 border-0 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all disabled:opacity-50"
                            />
                            <button
                                type="submit"
                                disabled={!inputText.trim() || loading}
                                className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                                aria-label="Send message"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ${
                    isOpen
                        ? 'bg-gray-600 hover:bg-gray-700 rotate-0'
                        : 'bg-blue-600 hover:bg-blue-700 hover:scale-110'
                }`}
                aria-label={isOpen ? 'Close chat' : 'Open chat'}
            >
                {isOpen ? (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <span className="text-2xl">💬</span>
                )}
            </button>
        </div>
    );
};

export default ChatWidget;
