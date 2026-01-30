from pydantic import BaseModel
from typing import List, Optional

class ProductBase(BaseModel):
    name: str
    description: str
    price: float
    stock: int

class ProductCreate(ProductBase):
    pass

class ProductUpdate(ProductBase):
    stock: Optional[int] = None

class Product(ProductBase):
    id: int

    class Config:
        orm_mode = True

class ProductList(BaseModel):
    products: List[Product]