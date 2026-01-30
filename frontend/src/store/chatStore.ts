import { ChatMessage } from '../types';

interface ChatState {
    messages: ChatMessage[];
    loading: boolean;
}

const createChatStore = () => {
    let state: ChatState = {
        messages: [],
        loading: false,
    };
    const listeners: Set<() => void> = new Set();

    const notify = () => {
        listeners.forEach((listener) => listener());
    };

    return {
        getState: () => state,
        subscribe: (listener: () => void) => {
            listeners.add(listener);
            return () => listeners.delete(listener);
        },
        addMessage: (message: ChatMessage) => {
            state.messages = [...state.messages, message];
            notify();
        },
        setLoading: (loading: boolean) => {
            state.loading = loading;
            notify();
        },
        clearMessages: () => {
            state.messages = [];
            notify();
        },
    };
};

const chatStore = createChatStore();
export default chatStore;