import React, { useState, useEffect } from 'react';
import { fetchExchanges, fetchTicker } from '../utils/apiClient';
import Stats from './Stats';
import './Dashboard.css';

const Dashboard = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState('binance');
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');
  const [ticker, setTicker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    loadExchanges();
  }, []);

  const loadExchanges = async () => {
    try {
      const data = await fetchExchanges();
      setExchanges(data.exchanges || []);
      if (data.exchanges && data.exchanges.length > 0) {
        setSelectedExchange(data.exchanges[0].id);
      }
      // Check if using mock data
      if (data.exchanges && data.exchanges[0]?.id === 'binance') {
        setIsDemoMode(true);
      }
    } catch (err) {
      console.error('Error loading exchanges:', err);
      setIsDemoMode(true);
    }
  };

  useEffect(() => {
    if (autoRefresh && selectedExchange && selectedSymbol) {
      const interval = setInterval(() => {
        loadTicker();
      }, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedExchange, selectedSymbol]);

  const loadTicker = async () => {
    if (!selectedExchange || !selectedSymbol) return;

    setLoading(true);
    try {
      const data = await fetchTicker(selectedExchange, selectedSymbol);
      setTicker(data);
      setIsDemoMode(data.exchange === 'binance' && !data.timestamp);
    } catch (err) {
      console.error('Error loading ticker:', err);
      // Still try to show something
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadTicker();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>📊 Real-Time Market Data</h1>
        <p>Get live cryptocurrency prices from major exchanges</p>
      </div>

      <Stats />

      <div className="card">
        <h2>Fetch Market Data</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label>Exchange</label>
              <select
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
                required
              >
                <option value="">Select Exchange</option>
                {exchanges.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Trading Pair (e.g., BTC/USDT)</label>
              <input
                type="text"
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
                placeholder="BTC/USDT"
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="btn" disabled={loading}>
              {loading ? 'Loading...' : 'Fetch Data'}
            </button>
            <button
              type="button"
              className={`btn ${autoRefresh ? 'btn-active' : ''}`}
              onClick={() => setAutoRefresh(!autoRefresh)}
            >
              {autoRefresh ? 'Stop Auto-Refresh' : 'Start Auto-Refresh'}
            </button>
          </div>
        </form>

        {isDemoMode && (
          <div className="demo-notice">
            <p>📊 <strong>Demo Mode:</strong> Showing sample data. Connect to backend for live data.</p>
          </div>
        )}

        {!ticker && !loading && (
          <div className="empty-state">
            <div className="empty-icon">📊</div>
            <h3>No Data Yet</h3>
            <p>Select an exchange and trading pair, then click "Fetch Data" to see real-time market information.</p>
            <div className="empty-tips">
              <p><strong>💡 Tip:</strong> Try popular pairs like:</p>
              <ul>
                <li>BTC/USDT (Bitcoin)</li>
                <li>ETH/USDT (Ethereum)</li>
                <li>BNB/USDT (Binance Coin)</li>
              </ul>
            </div>
          </div>
        )}

        {ticker && (
          <div className="ticker-display">
            <h3>{ticker.symbol} on {ticker.exchange}</h3>
            <div className="ticker-grid">
              <div className="ticker-item">
                <span className="label">Last Price</span>
                <span className="value price">${ticker.last?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="ticker-item">
                <span className="label">Bid</span>
                <span className="value">${ticker.bid?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="ticker-item">
                <span className="label">Ask</span>
                <span className="value">${ticker.ask?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="ticker-item">
                <span className="label">24h High</span>
                <span className="value">${ticker.high?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="ticker-item">
                <span className="label">24h Low</span>
                <span className="value">${ticker.low?.toFixed(2) || 'N/A'}</span>
              </div>
              <div className="ticker-item">
                <span className="label">24h Volume</span>
                <span className="value">{ticker.volume?.toFixed(2) || 'N/A'}</span>
              </div>
            </div>
            <p className="timestamp">
              Last updated: {new Date(ticker.timestamp).toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

