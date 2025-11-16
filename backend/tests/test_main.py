"""
Tests for the main FastAPI application
"""

import pytest
from fastapi.testclient import TestClient
from main import app

client = TestClient(app)


def test_health_check():
    """Test health check endpoint"""
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert "timestamp" in data


def test_root_endpoint():
    """Test root endpoint"""
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert "name" in data
    assert "endpoints" in data


def test_get_exchanges():
    """Test getting list of exchanges"""
    response = client.get("/api/exchanges")
    assert response.status_code == 200
    data = response.json()
    assert "exchanges" in data
    assert isinstance(data["exchanges"], list)


def test_get_ticker_invalid_exchange():
    """Test getting ticker with invalid exchange"""
    response = client.get("/api/ticker/invalid_exchange/BTC/USDT")
    assert response.status_code == 500


def test_get_historical_data_invalid():
    """Test getting historical data with invalid parameters"""
    response = client.post(
        "/api/historical",
        json={
            "exchange": "invalid_exchange",
            "symbol": "BTC/USDT",
            "timeframe": "1h",
            "limit": 10
        }
    )
    assert response.status_code in [404, 500]


def test_get_markets_invalid_exchange():
    """Test getting markets for invalid exchange"""
    response = client.get("/api/markets/invalid_exchange")
    assert response.status_code == 500

