from typing import List, Dict, Any

class CartService:
    def __init__(self):
        self.cart_items: List[Dict[str, Any]] = []

    def add_item(self, item: Dict[str, Any]) -> None:
        """Add an item to the cart."""
        # Check if item already exists
        for existing_item in self.cart_items:
            if existing_item.get('id') == item.get('id'):
                existing_item['quantity'] += item.get('quantity', 1)
                return
        self.cart_items.append(item)

    def remove_item(self, item_id: str) -> None:
        """Remove an item from the cart."""
        self.cart_items = [item for item in self.cart_items if item.get('id') != item_id]

    def get_cart_items(self) -> List[Dict[str, Any]]:
        """Get all items in the cart."""
        return self.cart_items

    def clear_cart(self) -> None:
        """Clear all items from the cart."""
        self.cart_items = []

    def calculate_total(self) -> float:
        """Calculate the total price of all items in the cart."""
        return sum(item.get('price', 0) * item.get('quantity', 1) for item in self.cart_items)

    def update_item_quantity(self, item_id: str, quantity: int) -> bool:
        """Update the quantity of an item in the cart."""
        for item in self.cart_items:
            if item.get('id') == item_id:
                if quantity <= 0:
                    self.remove_item(item_id)
                else:
                    item['quantity'] = quantity
                return True
        return False

# Shared instance for the application
cart_service = CartService()