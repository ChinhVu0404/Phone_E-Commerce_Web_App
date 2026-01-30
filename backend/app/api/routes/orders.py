from fastapi import APIRouter, HTTPException, Depends
from typing import List
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError

from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate, Order as OrderSchema
from app.services.order_service import OrderService
from app.db.database import get_db

router = APIRouter()

@router.get("/", response_model=List[OrderSchema])
async def get_orders(db: Session = Depends(get_db)):
    """Get all orders with error handling."""
    try:
        order_service = OrderService(db)
        return order_service.get_orders()
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while fetching orders: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while fetching orders: {str(e)}"
        )

@router.get("/{order_id}", response_model=OrderSchema)
async def get_order(order_id: int, db: Session = Depends(get_db)):
    """Get a specific order by ID."""
    try:
        order_service = OrderService(db)
        order = order_service.get_order(order_id)
        if not order:
            raise HTTPException(status_code=404, detail=f"Order with ID {order_id} not found")
        return order
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while fetching order: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while fetching order: {str(e)}"
        )

@router.post("/", response_model=OrderSchema, status_code=201)
async def create_order(order: OrderCreate, db: Session = Depends(get_db)):
    """Create a new order."""
    try:
        order_service = OrderService(db)
        return order_service.create_order(order)
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while creating order: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while creating order: {str(e)}"
        )

@router.put("/{order_id}", response_model=OrderSchema)
async def update_order(order_id: int, order: OrderUpdate, db: Session = Depends(get_db)):
    """Update an order."""
    try:
        order_service = OrderService(db)
        updated_order = order_service.update_order(order_id, order)
        if not updated_order:
            raise HTTPException(status_code=404, detail=f"Order with ID {order_id} not found")
        return updated_order
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while updating order: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while updating order: {str(e)}"
        )

@router.delete("/{order_id}")
async def delete_order(order_id: int, db: Session = Depends(get_db)):
    """Delete an order."""
    try:
        order_service = OrderService(db)
        result = order_service.delete_order(order_id)
        if not result:
            raise HTTPException(status_code=404, detail=f"Order with ID {order_id} not found")
        return {"message": "Order deleted successfully", "order_id": order_id}
    except HTTPException:
        raise
    except SQLAlchemyError as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Database error while deleting order: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Unexpected error while deleting order: {str(e)}"
        )
