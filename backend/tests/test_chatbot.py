import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_chatbot_response():
    response = client.post("/api/chat", json={"message": "Hello, how can I help you?"})
    assert response.status_code == 200
    assert "response" in response.json()

def test_chatbot_invalid_input():
    response = client.post("/api/chat", json={"message": ""})
    assert response.status_code == 400
    assert response.json() == {"detail": "Message cannot be empty."}