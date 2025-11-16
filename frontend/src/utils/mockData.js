/**
 * Mock data for when backend is unavailable
 */

export const mockExchanges = [
  {
    id: 'binance',
    name: 'Binance',
    enabled: true,
    countries: ['Global'],
    urls: { website: 'https://binance.com' }
  },
  {
    id: 'coinbase',
    name: 'Coinbase',
    enabled: true,
    countries: ['US', 'UK'],
    urls: { website: 'https://coinbase.com' }
  },
  {
    id: 'kraken',
    name: 'Kraken',
    enabled: true,
    countries: ['US', 'Global'],
    urls: { website: 'https://kraken.com' }
  }
];

export const mockTicker = {
  exchange: 'binance',
  symbol: 'BTC/USDT',
  last: 43250.50,
  bid: 43248.00,
  ask: 43252.00,
  high: 43800.00,
  low: 42800.00,
  volume: 1250000.50,
  timestamp: new Date(),
  datetime: new Date().toISOString()
};

export const mockHistoricalData = Array.from({ length: 100 }, (_, i) => {
  const basePrice = 43000;
  const variation = Math.sin(i / 10) * 1000;
  const price = basePrice + variation;
  const timestamp = new Date(Date.now() - (100 - i) * 3600000);
  
  return {
    timestamp: timestamp,
    open: price - 50,
    high: price + 100,
    low: price - 100,
    close: price,
    volume: Math.random() * 1000 + 500
  };
});

export const mockStats = {
  exchanges: 5,
  totalMarkets: 1000,
  lastUpdate: new Date().toLocaleTimeString()
};

