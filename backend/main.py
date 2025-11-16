"""
FastAPI MCP Server for Cryptocurrency Market Data
Provides real-time and historical cryptocurrency data from major exchanges
"""

from fastapi import FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
import os
from typing import List, Optional
from datetime import datetime, timedelta
import logging

from config import settings
from services.crypto_service import CryptocurrencyService
from services.cache_service import CacheService
from services.websocket_manager import WebSocketManager
from models.schemas import (
    TickerResponse,
    HistoricalDataRequest,
    HistoricalDataResponse,
    ExchangeInfoResponse,
    ErrorResponse
)

# Configure logging
logging.basicConfig(
    level=getattr(logging, settings.LOG_LEVEL),
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Initialize services
crypto_service = CryptocurrencyService()
cache_service = CacheService(ttl=settings.CACHE_TTL, max_size=settings.CACHE_MAX_SIZE)
ws_manager = WebSocketManager()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifespan context manager for startup and shutdown"""
    logger.info("Starting Crypto MCP Server...")
    await crypto_service.initialize()
    logger.info("Server started successfully")
    yield
    logger.info("Shutting down Crypto MCP Server...")
    await crypto_service.cleanup()
    logger.info("Server shut down")


# Create FastAPI app
app = FastAPI(
    title="Cryptocurrency MCP Server",
    description="MCP server for real-time and historical cryptocurrency market data",
    version="1.0.0",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Health"])
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "timestamp": datetime.utcnow().isoformat(),
        "service": "crypto-mcp-server"
    }


@app.get("/", tags=["Info"])
async def root():
    """Root endpoint with API information"""
    return {
        "name": "Cryptocurrency MCP Server",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "exchanges": "/api/exchanges",
            "ticker": "/api/ticker/{exchange}/{symbol}",
            "historical": "/api/historical",
            "websocket": "/ws"
        }
    }


@app.get("/api/exchanges", response_model=ExchangeInfoResponse, tags=["Exchanges"])
async def get_exchanges():
    """Get list of supported exchanges"""
    try:
        exchanges = await crypto_service.get_supported_exchanges()
        return ExchangeInfoResponse(exchanges=exchanges)
    except Exception as e:
        logger.error(f"Error fetching exchanges: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/ticker/{exchange}/{symbol}", response_model=TickerResponse, tags=["Market Data"])
async def get_ticker(exchange: str, symbol: str):
    """Get real-time ticker data for a symbol on a specific exchange"""
    cache_key = f"ticker:{exchange}:{symbol}"
    
    # Check cache
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return TickerResponse(**cached_data)
    
    try:
        ticker = await crypto_service.get_ticker(exchange, symbol)
        if not ticker:
            raise HTTPException(status_code=404, detail=f"Ticker not found for {symbol} on {exchange}")
        
        response = TickerResponse(**ticker)
        
        # Cache the response
        cache_service.set(cache_key, ticker)
        
        return response
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching ticker: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/historical", response_model=HistoricalDataResponse, tags=["Market Data"])
async def get_historical_data(request: HistoricalDataRequest):
    """Get historical OHLCV data for a symbol"""
    cache_key = f"historical:{request.exchange}:{request.symbol}:{request.timeframe}:{request.limit}"
    
    # Check cache
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return HistoricalDataResponse(**cached_data)
    
    try:
        data = await crypto_service.get_historical_data(
            exchange=request.exchange,
            symbol=request.symbol,
            timeframe=request.timeframe,
            limit=request.limit,
            since=request.since
        )
        
        if not data:
            raise HTTPException(
                status_code=404,
                detail=f"Historical data not found for {request.symbol} on {request.exchange}"
            )
        
        response = HistoricalDataResponse(
            exchange=request.exchange,
            symbol=request.symbol,
            timeframe=request.timeframe,
            data=data
        )
        
        # Cache the response
        cache_service.set(cache_key, response.dict())
        
        return response
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error fetching historical data: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/markets/{exchange}", tags=["Market Data"])
async def get_markets(exchange: str):
    """Get all available markets for an exchange"""
    cache_key = f"markets:{exchange}"
    
    cached_data = cache_service.get(cache_key)
    if cached_data:
        return cached_data
    
    try:
        markets = await crypto_service.get_markets(exchange)
        cache_service.set(cache_key, markets)
        return {"exchange": exchange, "markets": markets}
    except Exception as e:
        logger.error(f"Error fetching markets: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    """WebSocket endpoint for real-time updates"""
    if not settings.WS_ENABLED:
        await websocket.close(code=1008, reason="WebSocket is disabled")
        return
    
    await ws_manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Handle WebSocket messages (subscribe/unsubscribe to symbols)
            await ws_manager.handle_message(websocket, data)
    except WebSocketDisconnect:
        ws_manager.disconnect(websocket)
    except Exception as e:
        logger.error(f"WebSocket error: {str(e)}")
        ws_manager.disconnect(websocket)


@app.exception_handler(Exception)
async def global_exception_handler(request, exc):
    """Global exception handler"""
    logger.error(f"Unhandled exception: {str(exc)}")
    return JSONResponse(
        status_code=500,
        content=ErrorResponse(
            error="Internal server error",
            message=str(exc)
        ).dict()
    )


if __name__ == "__main__":
    port = int(os.getenv("PORT", settings.PORT))
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=port,
        reload=settings.DEBUG,
        log_level=settings.LOG_LEVEL.lower()
    )

