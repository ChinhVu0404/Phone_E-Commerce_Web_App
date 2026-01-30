from fastapi import HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os

class ChatMessage(BaseModel):
    user: str
    message: str

class ChatResponse(BaseModel):
    response: str
    context: Optional[str] = None

class ChatbotService:
    def __init__(self):
        self.history: List[ChatMessage] = []
        self.openai_api_key = os.getenv("OPENAI_API_KEY")
    
    def add_message(self, user: str, message: str):
        """Add a message to the chat history."""
        chat_message = ChatMessage(user=user, message=message)
        self.history.append(chat_message)
    
    def get_response(self, message: str) -> ChatResponse:
        """
        Process user message and return chatbot response.
        Currently returns keyword-based response. 
        TODO: Integrate with LangChain + RAG for intelligent responses.
        """
        self.add_message("User", message)
        
        # Basic response logic (replace with RAG implementation later)
        response_message = self._generate_response(message)
        
        self.add_message("Bot", response_message)
        return ChatResponse(response=response_message)
    
    def _generate_response(self, message: str) -> str:
        """
        Generate response based on message content.
        This is a placeholder for RAG integration.
        """
        message_lower = message.lower()
        
        # Simple keyword-based responses
        if any(word in message_lower for word in ["hello", "hi", "hey"]):
            return "Hello! Welcome to Phone E-commerce. How can I help you find the perfect phone today?"
        
        if any(word in message_lower for word in ["iphone", "apple"]):
            return "We have the latest iPhone models including the iPhone 15 Pro Max ($1199.99) and iPhone 15 ($799.99). Would you like more details about any specific model?"
        
        if any(word in message_lower for word in ["samsung", "galaxy"]):
            return "We carry Samsung Galaxy phones including the S24 Ultra ($1299.99) and the foldable Z Fold 5 ($1799.99). What features are you looking for?"
        
        if any(word in message_lower for word in ["pixel", "google"]):
            return "Google Pixel phones are known for their AI features! We have the Pixel 8 Pro ($999.99) and the budget-friendly Pixel 8a ($499.99)."
        
        if any(word in message_lower for word in ["cheap", "budget", "affordable"]):
            return "For budget-friendly options, check out the Google Pixel 8a ($499.99) or Nothing Phone 2 ($599.99). Both offer great value!"
        
        if any(word in message_lower for word in ["camera", "photo", "photography"]):
            return "For the best camera phones, I recommend the Xiaomi 14 Ultra with Leica lenses, iPhone 15 Pro Max, or Google Pixel 8 Pro with its AI-powered photography."
        
        if any(word in message_lower for word in ["price", "cost", "how much"]):
            return "Our phones range from $499.99 (Pixel 8a) to $1799.99 (Galaxy Z Fold 5). What's your budget range?"
        
        if any(word in message_lower for word in ["help", "support"]):
            return "I'm here to help! You can ask me about phone specifications, prices, comparisons, or recommendations based on your needs."
        
        # Default response
        return f"Thanks for your message! I can help you find phones, compare specs, or answer questions about our products. What would you like to know?"
    
    def clear_history(self):
        """Clear conversation history."""
        self.history = []

# Singleton instance
chatbot_service = ChatbotService()