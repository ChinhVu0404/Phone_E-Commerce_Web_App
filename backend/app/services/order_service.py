from typing import List, Optional
from sqlalchemy.orm import Session

from app.models.order import Order
from app.schemas.order import OrderCreate, OrderUpdate

class OrderService:
    def __init__(self, db: Session):
        self.db = db

    def create_order(self, order: OrderCreate) -> Order:
        """Create a new order."""
        db_order = Order(
            user_id=order.user_id,
            total_amount=0,  # Calculate from items
            status="pending"
        )
        self.db.add(db_order)
        self.db.commit()
        self.db.refresh(db_order)
        return db_order

    def get_order(self, order_id: int) -> Optional[Order]:
        """Get an order by ID."""
        return self.db.query(Order).filter(Order.id == order_id).first()

    def update_order(self, order_id: int, order_update: OrderUpdate) -> Optional[Order]:
        """Update an order."""
        db_order = self.get_order(order_id)
        if db_order:
            for key, value in order_update.dict(exclude_unset=True).items():
                setattr(db_order, key, value)
            self.db.commit()
            self.db.refresh(db_order)
        return db_order

    def delete_order(self, order_id: int) -> bool:
        """Delete an order."""
        db_order = self.get_order(order_id)
        if db_order:
            self.db.delete(db_order)
            self.db.commit()
            return True
        return False

    def get_all_orders(self) -> List[Order]:
        """Get all orders."""
        return self.db.query(Order).all()