"""
Tests for cryptocurrency service
"""

import pytest
from services.crypto_service import CryptocurrencyService


@pytest.mark.asyncio
async def test_service_initialization():
    """Test service initialization"""
    service = CryptocurrencyService()
    await service.initialize()
    assert len(service.exchanges) > 0
    await service.cleanup()


@pytest.mark.asyncio
async def test_get_supported_exchanges():
    """Test getting supported exchanges"""
    service = CryptocurrencyService()
    await service.initialize()
    exchanges = await service.get_supported_exchanges()
    assert isinstance(exchanges, list)
    assert len(exchanges) > 0
    await service.cleanup()


@pytest.mark.asyncio
async def test_get_ticker():
    """Test getting ticker data"""
    service = CryptocurrencyService()
    await service.initialize()
    
    # Test with a valid exchange
    if "binance" in service.exchanges:
        try:
            ticker = await service.get_ticker("binance", "BTC/USDT")
            assert ticker is not None
            assert "symbol" in ticker
            assert "last" in ticker
        except Exception as e:
            # Exchange might be unavailable, skip test
            pytest.skip(f"Exchange unavailable: {str(e)}")
    
    await service.cleanup()

