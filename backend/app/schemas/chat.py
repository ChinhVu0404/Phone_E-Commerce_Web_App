from pydantic import BaseModel
from typing import List, Optional

class ChatMessage(BaseModel):
    user_id: str
    message: str
    timestamp: str

class ChatResponse(BaseModel):
    responses: List[str]
    context: Optional[str] = None

class ChatRequest(BaseModel):
    user_id: str
    message: str