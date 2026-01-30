from typing import List, Dict, Optional
from fastapi import HTTPException
from sqlalchemy.orm import Session

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate

class ProductService:
    def __init__(self, db: Session):
        self.db = db

    def get_products(self) -> List[Product]:
        """Get all products."""
        return self.db.query(Product).all()

    def get_product(self, product_id: int) -> Optional[Product]:
        """Get a product by ID."""
        product = self.db.query(Product).filter(Product.id == product_id).first()
        if not product:
            raise HTTPException(status_code=404, detail="Product not found")
        return product

    def create_product(self, product_data: ProductCreate) -> Product:
        """Create a new product."""
        new_product = Product(**product_data.dict())
        self.db.add(new_product)
        self.db.commit()
        self.db.refresh(new_product)
        return new_product

    def update_product(self, product_id: int, product_data: ProductUpdate) -> Optional[Product]:
        """Update a product."""
        product = self.get_product(product_id)
        if not product:
            return None
        for key, value in product_data.dict(exclude_unset=True).items():
            setattr(product, key, value)
        self.db.commit()
        self.db.refresh(product)
        return product

    def delete_product(self, product_id: int) -> Dict[str, str]:
        """Delete a product."""
        product = self.get_product(product_id)
        if not product:
            return None
        self.db.delete(product)
        self.db.commit()
        return {"message": "Product deleted successfully"}