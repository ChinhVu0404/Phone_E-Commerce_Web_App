from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.chatbot_service import chatbot_service

router = APIRouter()

class ChatMessage(BaseModel):
    user_message: str

class ChatResponseModel(BaseModel):
    bot_response: str

@router.post("/chat", response_model=ChatResponseModel)
async def chat_with_bot(message: ChatMessage):
    """Chat with the AI chatbot."""
    if not message.user_message or not message.user_message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty")
    
    try:
        response = chatbot_service.get_response(message.user_message)
        return ChatResponseModel(bot_response=response.response)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")

@router.delete("/history")
async def clear_chat_history():
    """Clear the chat history."""
    chatbot_service.clear_history()
    return {"message": "Chat history cleared"}