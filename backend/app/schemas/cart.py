from pydantic import BaseModel
from typing import List, Optional

class CartItem(BaseModel):
    product_id: int
    quantity: int

class Cart(BaseModel):
    items: List[CartItem]
    total_price: float

class CartCreate(BaseModel):
    items: List[CartItem]

class CartUpdate(BaseModel):
    items: Optional[List[CartItem]] = None