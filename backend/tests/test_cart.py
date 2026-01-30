import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_add_to_cart():
    response = client.post("/api/cart", json={"product_id": 1, "quantity": 2})
    assert response.status_code == 200
    assert response.json() == {"message": "Product added to cart", "cart_id": 1}

def test_get_cart():
    response = client.get("/api/cart")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_remove_from_cart():
    response = client.delete("/api/cart/1")
    assert response.status_code == 200
    assert response.json() == {"message": "Product removed from cart"}

def test_update_cart_item():
    response = client.put("/api/cart/1", json={"quantity": 3})
    assert response.status_code == 200
    assert response.json() == {"message": "Cart item updated"}