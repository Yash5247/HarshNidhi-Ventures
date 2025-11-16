"""
Pydantic schemas for request/response models
"""

from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
from datetime import datetime


class TickerResponse(BaseModel):
    """Ticker data response"""
    exchange: str
    symbol: str
    last: float
    bid: Optional[float] = None
    ask: Optional[float] = None
    high: Optional[float] = None
    low: Optional[float] = None
    volume: Optional[float] = None
    timestamp: datetime
    datetime: str


class HistoricalDataRequest(BaseModel):
    """Request model for historical data"""
    exchange: str = Field(..., description="Exchange name (e.g., 'binance', 'coinbase')")
    symbol: str = Field(..., description="Trading pair (e.g., 'BTC/USDT')")
    timeframe: str = Field(default="1h", description="Timeframe (1m, 5m, 1h, 1d, etc.)")
    limit: int = Field(default=100, ge=1, le=1000, description="Number of candles")
    since: Optional[datetime] = Field(None, description="Start timestamp")


class OHLCVData(BaseModel):
    """OHLCV candle data"""
    timestamp: datetime
    open: float
    high: float
    low: float
    close: float
    volume: float


class HistoricalDataResponse(BaseModel):
    """Historical data response"""
    exchange: str
    symbol: str
    timeframe: str
    data: List[OHLCVData]


class ExchangeInfo(BaseModel):
    """Exchange information"""
    id: str
    name: str
    enabled: bool
    countries: List[str]
    urls: Dict[str, Any]


class ExchangeInfoResponse(BaseModel):
    """Response with exchange information"""
    exchanges: List[ExchangeInfo]


class ErrorResponse(BaseModel):
    """Error response model"""
    error: str
    message: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

