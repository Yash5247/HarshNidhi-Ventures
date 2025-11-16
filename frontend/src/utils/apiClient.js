/**
 * API client with fallback to mock data
 */

import { API_BASE_URL } from '../config/api';
import { mockExchanges, mockTicker, mockHistoricalData, mockStats } from './mockData';

let useMockData = false;

export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(3000) // 3 second timeout
    });
    return response.ok;
  } catch (error) {
    console.warn('Backend not available, using mock data');
    useMockData = true;
    return false;
  }
};

export const fetchExchanges = async () => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ exchanges: mockExchanges });
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/exchanges`, {
      signal: AbortSignal.timeout(5000)
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Using mock exchanges data');
    return { exchanges: mockExchanges };
  }
};

export const fetchTicker = async (exchange, symbol) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        const ticker = {
          ...mockTicker,
          exchange,
          symbol,
          last: mockTicker.last + (Math.random() * 1000 - 500),
          timestamp: new Date()
        };
        resolve(ticker);
      }, 500);
    });
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/api/ticker/${exchange}/${symbol}`,
      { signal: AbortSignal.timeout(5000) }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Using mock ticker data');
    const ticker = {
      ...mockTicker,
      exchange,
      symbol,
      last: mockTicker.last + (Math.random() * 1000 - 500),
      timestamp: new Date()
    };
    return ticker;
  }
};

export const fetchHistoricalData = async (exchange, symbol, timeframe, limit) => {
  if (useMockData) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          exchange,
          symbol,
          timeframe,
          data: mockHistoricalData.slice(0, limit || 100)
        });
      }, 500);
    });
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/historical`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ exchange, symbol, timeframe, limit }),
      signal: AbortSignal.timeout(10000)
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }
    
    return await response.json();
  } catch (error) {
    console.warn('Using mock historical data');
    return {
      exchange,
      symbol,
      timeframe,
      data: mockHistoricalData.slice(0, limit || 100)
    };
  }
};

export const fetchStats = async () => {
  if (useMockData) {
    return mockStats;
  }

  try {
    const exchanges = await fetchExchanges();
    return {
      exchanges: exchanges.exchanges?.length || 5,
      totalMarkets: 1000,
      lastUpdate: new Date().toLocaleTimeString()
    };
  } catch (error) {
    return mockStats;
  }
};

