from pydantic import BaseModel
from typing import List, Optional

class OrderItem(BaseModel):
    product_id: int
    quantity: int

class Order(BaseModel):
    id: int
    user_id: int
    items: List[OrderItem]
    total_price: float
    status: str
    created_at: str
    updated_at: Optional[str] = None

class OrderCreate(BaseModel):
    user_id: int
    items: List[OrderItem]

class OrderUpdate(BaseModel):
    status: str
    updated_at: str