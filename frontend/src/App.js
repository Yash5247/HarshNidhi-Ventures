import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <nav className="navbar">
        <div className="nav-container">
          <h1 className="logo">🚀 Crypto MCP Dashboard</h1>
          <div className="status">🔴 Offline</div>
        </div>
      </nav>

      <main className="main-content">
        <div className="hero">
          <h1 className="hero-title">🚀 Cryptocurrency MCP Server</h1>
          <p className="hero-subtitle">
            Real-time and historical cryptocurrency market data from major exchanges
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary">View Dashboard</button>
            <button className="btn btn-secondary">View Exchanges</button>
          </div>
        </div>

        <div className="features">
          <h2>Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-Time Data</h3>
              <p>Get live ticker prices and market data from multiple cryptocurrency exchanges</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Historical Charts</h3>
              <p>View historical OHLCV data with interactive charts and multiple timeframes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3>Multi-Exchange</h3>
              <p>Access data from Binance, Coinbase, Kraken, and more via CCXT library</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Fast & Cached</h3>
              <p>Optimized performance with intelligent caching and WebSocket support</p>
            </div>
          </div>
        </div>

        <div className="dashboard-preview">
          <h2>Market Data Preview</h2>
          <div className="ticker-card">
            <h3>BTC/USDT on Binance</h3>
            <div className="ticker-grid">
              <div className="ticker-item">
                <span className="label">Last Price</span>
                <span className="value price">$43,250.50</span>
              </div>
              <div className="ticker-item">
                <span className="label">Bid</span>
                <span className="value">$43,248.00</span>
              </div>
              <div className="ticker-item">
                <span className="label">Ask</span>
                <span className="value">$43,252.00</span>
              </div>
              <div className="ticker-item">
                <span className="label">24h High</span>
                <span className="value">$43,800.00</span>
              </div>
              <div className="ticker-item">
                <span className="label">24h Low</span>
                <span className="value">$42,800.00</span>
              </div>
              <div className="ticker-item">
                <span className="label">24h Volume</span>
                <span className="value">1,250,000.50</span>
              </div>
            </div>
            <div className="demo-notice">
              📊 <strong>Demo Mode:</strong> Showing sample data
            </div>
          </div>
        </div>

        <div className="exchanges-preview">
          <h2>Supported Exchanges</h2>
          <div className="exchanges-grid">
            <div className="exchange-card">
              <h3>Binance</h3>
              <p>ID: binance</p>
              <span className="status-badge enabled">✓ Enabled</span>
            </div>
            <div className="exchange-card">
              <h3>Coinbase</h3>
              <p>ID: coinbase</p>
              <span className="status-badge enabled">✓ Enabled</span>
            </div>
            <div className="exchange-card">
              <h3>Kraken</h3>
              <p>ID: kraken</p>
              <span className="status-badge enabled">✓ Enabled</span>
            </div>
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>Cryptocurrency MCP Server Dashboard - Real-time Market Data</p>
      </footer>
    </div>
  );
}

export default App;
