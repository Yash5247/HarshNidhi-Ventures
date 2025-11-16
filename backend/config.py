"""
Configuration settings for the Crypto MCP Server
"""

from pydantic_settings import BaseSettings
from typing import List
import os


class Settings(BaseSettings):
    """Application settings"""
    
    # API Keys
    COINMARKETCAP_API_KEY: str = os.getenv("COINMARKETCAP_API_KEY", "")
    BINANCE_API_KEY: str = os.getenv("BINANCE_API_KEY", "")
    BINANCE_SECRET_KEY: str = os.getenv("BINANCE_SECRET_KEY", "")
    COINBASE_API_KEY: str = os.getenv("COINBASE_API_KEY", "")
    COINBASE_SECRET_KEY: str = os.getenv("COINBASE_SECRET_KEY", "")
    
    # Server Configuration
    PORT: int = int(os.getenv("PORT", "8000"))
    HOST: str = os.getenv("HOST", "0.0.0.0")
    DEBUG: bool = os.getenv("DEBUG", "false").lower() == "true"
    
    # CORS Configuration
    ALLOWED_ORIGINS: List[str] = os.getenv(
        "ALLOWED_ORIGINS",
        "https://crypto-dashboard.vercel.app,http://localhost:3000,http://localhost:5173"
    ).split(",")
    
    # Cache Configuration
    CACHE_TTL: int = int(os.getenv("CACHE_TTL", "60"))
    CACHE_MAX_SIZE: int = int(os.getenv("CACHE_MAX_SIZE", "1000"))
    
    # WebSocket Configuration
    WS_ENABLED: bool = os.getenv("WS_ENABLED", "true").lower() == "true"
    WS_PORT: int = int(os.getenv("WS_PORT", "8001"))
    
    # Logging
    LOG_LEVEL: str = os.getenv("LOG_LEVEL", "INFO")
    
    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()

