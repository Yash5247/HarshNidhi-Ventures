"""
Caching service for API responses
"""

from cachetools import TTLCache
from typing import Any, Optional
import logging

logger = logging.getLogger(__name__)


class CacheService:
    """TTL-based cache service"""
    
    def __init__(self, ttl: int = 60, max_size: int = 1000):
        """
        Initialize cache service
        
        Args:
            ttl: Time to live in seconds
            max_size: Maximum number of items in cache
        """
        self.cache = TTLCache(maxsize=max_size, ttl=ttl)
        logger.info(f"Cache initialized with TTL={ttl}s, max_size={max_size}")
    
    def get(self, key: str) -> Optional[Any]:
        """Get value from cache"""
        try:
            return self.cache.get(key)
        except Exception as e:
            logger.warning(f"Cache get error for key {key}: {str(e)}")
            return None
    
    def set(self, key: str, value: Any) -> None:
        """Set value in cache"""
        try:
            self.cache[key] = value
        except Exception as e:
            logger.warning(f"Cache set error for key {key}: {str(e)}")
    
    def clear(self) -> None:
        """Clear all cache"""
        self.cache.clear()
        logger.info("Cache cleared")
    
    def size(self) -> int:
        """Get current cache size"""
        return len(self.cache)

