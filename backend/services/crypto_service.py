"""
Cryptocurrency data service using CCXT
"""

import ccxt
import logging
from typing import List, Dict, Optional, Any
from datetime import datetime, timedelta
import asyncio

logger = logging.getLogger(__name__)


class CryptocurrencyService:
    """Service for fetching cryptocurrency market data"""
    
    def __init__(self):
        self.exchanges: Dict[str, ccxt.Exchange] = {}
        self.supported_exchanges = ['binance', 'coinbase', 'kraken', 'bitfinex', 'huobi']
    
    async def initialize(self):
        """Initialize exchange connections"""
        logger.info("Initializing cryptocurrency exchanges...")
        
        for exchange_id in self.supported_exchanges:
            try:
                exchange_class = getattr(ccxt, exchange_id)
                exchange = exchange_class({
                    'enableRateLimit': True,
                    'timeout': 30000,
                })
                
                # Load markets
                await asyncio.to_thread(exchange.load_markets)
                self.exchanges[exchange_id] = exchange
                logger.info(f"Initialized {exchange_id} exchange")
            except Exception as e:
                logger.warning(f"Failed to initialize {exchange_id}: {str(e)}")
        
        logger.info(f"Initialized {len(self.exchanges)} exchanges")
    
    async def cleanup(self):
        """Cleanup exchange connections"""
        for exchange in self.exchanges.values():
            if hasattr(exchange, 'close'):
                await asyncio.to_thread(exchange.close)
        self.exchanges.clear()
    
    async def get_supported_exchanges(self) -> List[Dict[str, Any]]:
        """Get list of supported exchanges"""
        exchanges = []
        for exchange_id, exchange in self.exchanges.items():
            exchanges.append({
                "id": exchange_id,
                "name": exchange.name,
                "enabled": True,
                "countries": getattr(exchange, 'countries', []),
                "urls": getattr(exchange, 'urls', {})
            })
        return exchanges
    
    async def get_ticker(self, exchange_id: str, symbol: str) -> Optional[Dict[str, Any]]:
        """Get ticker data for a symbol"""
        if exchange_id not in self.exchanges:
            raise ValueError(f"Exchange {exchange_id} not supported")
        
        exchange = self.exchanges[exchange_id]
        
        try:
            ticker = await asyncio.to_thread(exchange.fetch_ticker, symbol)
            
            return {
                "exchange": exchange_id,
                "symbol": symbol,
                "last": ticker.get('last'),
                "bid": ticker.get('bid'),
                "ask": ticker.get('ask'),
                "high": ticker.get('high'),
                "low": ticker.get('low'),
                "volume": ticker.get('volume'),
                "timestamp": datetime.fromtimestamp(ticker.get('timestamp', 0) / 1000),
                "datetime": ticker.get('datetime', '')
            }
        except Exception as e:
            logger.error(f"Error fetching ticker for {symbol} on {exchange_id}: {str(e)}")
            raise
    
    async def get_historical_data(
        self,
        exchange_id: str,
        symbol: str,
        timeframe: str = "1h",
        limit: int = 100,
        since: Optional[datetime] = None
    ) -> List[Dict[str, Any]]:
        """Get historical OHLCV data"""
        if exchange_id not in self.exchanges:
            raise ValueError(f"Exchange {exchange_id} not supported")
        
        exchange = self.exchanges[exchange_id]
        
        try:
            # Convert since to milliseconds if provided
            since_ms = None
            if since:
                since_ms = int(since.timestamp() * 1000)
            
            ohlcv = await asyncio.to_thread(
                exchange.fetch_ohlcv,
                symbol,
                timeframe,
                since_ms,
                limit
            )
            
            data = []
            for candle in ohlcv:
                data.append({
                    "timestamp": datetime.fromtimestamp(candle[0] / 1000),
                    "open": candle[1],
                    "high": candle[2],
                    "low": candle[3],
                    "close": candle[4],
                    "volume": candle[5]
                })
            
            return data
        except Exception as e:
            logger.error(f"Error fetching historical data for {symbol} on {exchange_id}: {str(e)}")
            raise
    
    async def get_markets(self, exchange_id: str) -> List[str]:
        """Get all available markets for an exchange"""
        if exchange_id not in self.exchanges:
            raise ValueError(f"Exchange {exchange_id} not supported")
        
        exchange = self.exchanges[exchange_id]
        return list(exchange.markets.keys())

