from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session

from app.schemas.cart import CartItem as CartItemSchema, Cart as CartSchema, CartCreate, CartUpdate
from app.services.cart_service import cart_service  # Use shared instance
from app.db.database import get_db

router = APIRouter()

@router.post("/", response_model=dict)
async def add_to_cart(item: CartItemSchema, db: Session = Depends(get_db)):
    """Add an item to the cart."""
    try:
        cart_service.add_item({
            "id": str(item.product_id),
            "product_id": item.product_id,
            "quantity": item.quantity,
            "price": 0  # Price should be fetched from product
        })
        return {"message": "Product added to cart", "cart_id": 1}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/", response_model=List[dict])
async def get_cart(db: Session = Depends(get_db)):
    """Get all items in the cart."""
    return cart_service.get_cart_items()

@router.delete("/{item_id}", response_model=dict)
async def remove_from_cart(item_id: int, db: Session = Depends(get_db)):
    """Remove an item from the cart."""
    try:
        cart_service.remove_item(str(item_id))
        return {"message": "Product removed from cart"}
    except Exception as e:
        raise HTTPException(status_code=404, detail=str(e))

@router.put("/{item_id}", response_model=dict)
async def update_cart_item(item_id: int, update: CartUpdate, db: Session = Depends(get_db)):
    """Update a cart item's quantity."""
    try:
        if update.items and len(update.items) > 0:
            quantity = update.items[0].quantity
            success = cart_service.update_item_quantity(str(item_id), quantity)
            if not success:
                raise HTTPException(status_code=404, detail="Item not found in cart")
        return {"message": "Cart item updated"}
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.delete("/", response_model=dict)
async def clear_cart(db: Session = Depends(get_db)):
    """Clear all items from the cart."""
    cart_service.clear_cart()
    return {"message": "Cart cleared"}

@router.get("/total", response_model=dict)
async def get_cart_total(db: Session = Depends(get_db)):
    """Get the total price of the cart."""
    total = cart_service.calculate_total()
    return {"total": total}