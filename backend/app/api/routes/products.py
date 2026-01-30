from fastapi import APIRouter, HTTPException, Depends
from fastapi.responses import JSONResponse
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.product import Product
from app.schemas.product import ProductCreate, ProductUpdate, Product as ProductSchema
from app.services.product_service import ProductService
from app.db.database import get_db

router = APIRouter()

@router.get("/", response_model=List[ProductSchema])
async def get_products(db: Session = Depends(get_db)):
    """Get all products with error handling."""
    try:
        product_service = ProductService(db)
        products = product_service.get_products()
        return products
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while fetching products: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while fetching products: {str(e)}"
        )

@router.get("/{product_id}", response_model=ProductSchema)
async def get_product(product_id: int, db: Session = Depends(get_db)):
    """Get a specific product by ID with error handling."""
    try:
        product_service = ProductService(db)
        product = product_service.get_product(product_id)
        if not product:
            raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
        return product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while fetching product: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while fetching product: {str(e)}"
        )

@router.post("/", response_model=ProductSchema, status_code=201)
async def create_product(product: ProductCreate, db: Session = Depends(get_db)):
    """Create a new product with error handling."""
    try:
        product_service = ProductService(db)
        return product_service.create_product(product)
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while creating product: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while creating product: {str(e)}"
        )

@router.put("/{product_id}", response_model=ProductSchema)
async def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db)):
    """Update a product with error handling."""
    try:
        product_service = ProductService(db)
        updated_product = product_service.update_product(product_id, product)
        if not updated_product:
            raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
        return updated_product
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while updating product: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while updating product: {str(e)}"
        )

@router.delete("/{product_id}", status_code=200)
async def delete_product(product_id: int, db: Session = Depends(get_db)):
    """Delete a product with error handling."""
    try:
        product_service = ProductService(db)
        result = product_service.delete_product(product_id)
        if not result:
            raise HTTPException(status_code=404, detail=f"Product with ID {product_id} not found")
        return {"message": "Product deleted successfully", "product_id": product_id}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while deleting product: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while deleting product: {str(e)}"
        )