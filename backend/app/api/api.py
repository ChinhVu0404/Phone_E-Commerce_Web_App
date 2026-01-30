from fastapi import APIRouter

# Initialize the main API router - DO NOT import this from anywhere else
api_router = APIRouter()

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}

# Include sub-routers
# Wrapped in try/except so the server can start even if route files have issues
try:
    from app.api.routes import products, cart, chatbot, users, orders
    
    api_router.include_router(products.router, prefix="/products", tags=["products"])
    api_router.include_router(cart.router, prefix="/cart", tags=["cart"])
    api_router.include_router(chatbot.router, prefix="/chatbot", tags=["chatbot"])
    api_router.include_router(users.router, prefix="/users", tags=["users"])
    api_router.include_router(orders.router, prefix="/orders", tags=["orders"])
except ImportError as e:
    print(f"Warning: Could not import some routers: {e}")