import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1 className="hero-title">🚀 Cryptocurrency MCP Server</h1>
        <p className="hero-subtitle">
          Real-time and historical cryptocurrency market data from major exchanges
        </p>
        <div className="hero-buttons">
          <Link to="/dashboard" className="btn btn-primary">
            View Dashboard
          </Link>
          <Link to="/historical" className="btn btn-secondary">
            Historical Data
          </Link>
        </div>
      </div>

      <div className="features-section">
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

      <div className="info-section">
        <h2>About This Project</h2>
        <div className="info-content">
          <p>
            This is a full-stack cryptocurrency market data application built with FastAPI (backend) 
            and React (frontend). The backend implements the Model Context Protocol (MCP) for 
            providing structured cryptocurrency market data, while the frontend offers a modern, 
            responsive dashboard for visualizing the data.
          </p>
          <div className="tech-stack">
            <h3>Tech Stack</h3>
            <div className="tech-items">
              <span className="tech-badge">FastAPI</span>
              <span className="tech-badge">React</span>
              <span className="tech-badge">CCXT</span>
              <span className="tech-badge">WebSocket</span>
              <span className="tech-badge">Docker</span>
              <span className="tech-badge">Render</span>
              <span className="tech-badge">Vercel</span>
            </div>
          </div>
        </div>
      </div>

      <div className="quick-links">
        <h2>Quick Links</h2>
        <div className="links-grid">
          <Link to="/dashboard" className="link-card">
            <h3>📊 Dashboard</h3>
            <p>View real-time market data</p>
          </Link>
          <Link to="/historical" className="link-card">
            <h3>📈 Historical Data</h3>
            <p>Explore price charts</p>
          </Link>
          <Link to="/exchanges" className="link-card">
            <h3>🏦 Exchanges</h3>
            <p>See supported exchanges</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
