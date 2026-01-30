from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional

# Import the centralized API router - CORRECTED IMPORT
from app.api.api import api_router
from app.services.chatbot_service import chatbot_service

app = FastAPI(
    title="Phone E-commerce API",
    description="Backend API for Phone E-commerce Web App with AI Chatbot",
    version="1.0.0"
)

# CORS Configuration - Allow ALL localhost ports for development
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    "http://localhost:3002",
    "http://localhost:3003",
    "http://127.0.0.1:3000",
    "http://127.0.0.1:3001",
    "http://127.0.0.1:3002",
    "http://127.0.0.1:3003",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Global exception handler for proper JSON error responses
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred", "error": str(exc)}
    )

# Pydantic models for chat endpoint
class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = "anonymous"

class ChatResponse(BaseModel):
    response: str
    success: bool = True

# Include the centralized API router with /api prefix
app.include_router(api_router, prefix="/api")

@app.get("/")
def read_root():
    return {"message": "Welcome to the Phone E-commerce API"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}

# Direct chat endpoint for frontend integration
@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(request: ChatRequest):
    """
    Main chat endpoint that the frontend calls.
    Processes user messages and returns chatbot responses.
    """
    if not request.message or not request.message.strip():
        raise HTTPException(status_code=400, detail="Message cannot be empty.")
    
    try:
        # Get response from chatbot service
        chat_response = chatbot_service.get_response(request.message)
        return ChatResponse(
            response=chat_response.response,
            success=True
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Chatbot error: {str(e)}")