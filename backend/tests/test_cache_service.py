"""
Tests for cache service
"""

import pytest
import time
from services.cache_service import CacheService


def test_cache_set_get():
    """Test setting and getting from cache"""
    cache = CacheService(ttl=60, max_size=100)
    cache.set("test_key", "test_value")
    value = cache.get("test_key")
    assert value == "test_value"


def test_cache_expiration():
    """Test cache expiration"""
    cache = CacheService(ttl=1, max_size=100)
    cache.set("test_key", "test_value")
    time.sleep(2)
    value = cache.get("test_key")
    assert value is None


def test_cache_clear():
    """Test clearing cache"""
    cache = CacheService(ttl=60, max_size=100)
    cache.set("test_key", "test_value")
    cache.clear()
    value = cache.get("test_key")
    assert value is None


def test_cache_size():
    """Test cache size"""
    cache = CacheService(ttl=60, max_size=100)
    assert cache.size() == 0
    cache.set("test_key", "test_value")
    assert cache.size() == 1

