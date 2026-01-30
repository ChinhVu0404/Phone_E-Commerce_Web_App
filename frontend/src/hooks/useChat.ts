import { useState } from 'react';
import { ChatMessage } from '../types';

const useChat = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const sendMessage = async (message: string) => {
        setLoading(true);
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ message }),
            });
            const data = await response.json();
            setMessages((prevMessages: ChatMessage[]) => [
                ...prevMessages, 
                { id: Date.now().toString(), text: message, sender: 'user' as const }
            ]);
            setMessages((prevMessages: ChatMessage[]) => [
                ...prevMessages, 
                { id: (Date.now() + 1).toString(), text: data.reply, sender: 'bot' as const }
            ]);
        } catch (error) {
            console.error('Error sending message:', error);
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        sendMessage,
    };
};

export default useChat;