import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_get_products():
    response = client.get("/api/products/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_create_product():
    product_data = {
        "name": "Test Phone",
        "description": "A phone for testing.",
        "price": 999.99,
        "stock": 10
    }
    response = client.post("/api/products/", json=product_data)
    assert response.status_code == 201
    assert response.json()["name"] == product_data["name"]

def test_get_product_by_id():
    response = client.get("/api/products/1")
    assert response.status_code == 200
    assert "name" in response.json()

def test_update_product():
    updated_data = {
        "name": "Updated Phone",
        "description": "An updated phone for testing.",
        "price": 899.99,
        "stock": 5
    }
    response = client.put("/api/products/1", json=updated_data)
    assert response.status_code == 200
    assert response.json()["name"] == updated_data["name"]

def test_delete_product():
    response = client.delete("/api/products/1")
    assert response.status_code == 204
    response = client.get("/api/products/1")
    assert response.status_code == 404