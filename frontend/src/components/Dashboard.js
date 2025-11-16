import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import Stats from './Stats';
import './Dashboard.css';

const Dashboard = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');
  const [ticker, setTicker] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    fetchExchanges();
  }, []);

  useEffect(() => {
    if (autoRefresh && selectedExchange && selectedSymbol) {
      const interval = setInterval(() => {
        fetchTicker();
      }, 5000); // Refresh every 5 seconds
      return () => clearInterval(interval);
    }
  }, [autoRefresh, selectedExchange, selectedSymbol]);

  const fetchExchanges = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/exchanges`);
      const data = await response.json();
      setExchanges(data.exchanges || []);
      if (data.exchanges && data.exchanges.length > 0) {
        setSelectedExchange(data.exchanges[0].id);
      }
    } catch (err) {
      setError('Failed to fetch exchanges');
    }
  };

  const fetchTicker = async () => {
    if (!selectedExchange || !selectedSymbol) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/ticker/${selectedExchange}/${selectedSymbol}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch ticker data');
      }
      const data = await response.json();
      setTicker(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchTicker();
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

        {error && <div className="error">{error}</div>}

        {!ticker && !loading && !error && (
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

