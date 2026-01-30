# backend/app/models/__init__.py

# Import all models to ensure SQLAlchemy relationships are properly initialized
from app.models.product import Product
from app.models.cart import Cart, CartItem
from app.models.user import User
from app.models.order import Order

__all__ = ["Product", "Cart", "CartItem", "User", "Order"]