import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import ErrorBoundary from './components/ErrorBoundary';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import HistoricalData from './components/HistoricalData';
import Exchanges from './components/Exchanges';
import NotFound from './components/NotFound';
import { API_BASE_URL } from './config/api';

function App() {
  const [healthStatus, setHealthStatus] = useState('checking');

  useEffect(() => {
    // Check backend health
    fetch(`${API_BASE_URL}/health`)
      .then(res => res.json())
      .then(data => {
        setHealthStatus(data.status === 'healthy' ? 'online' : 'offline');
      })
      .catch(() => setHealthStatus('offline'));
  }, []);

  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <nav className="navbar">
            <div className="nav-container">
              <h1 className="logo">🚀 Crypto MCP Dashboard</h1>
              <div className="nav-links">
                <Link to="/">Home</Link>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/historical">Historical Data</Link>
                <Link to="/exchanges">Exchanges</Link>
              </div>
              <div className={`status-indicator ${healthStatus}`}>
                {healthStatus === 'online' ? '🟢 Online' : '🔴 Offline'}
              </div>
            </div>
          </nav>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/historical" element={<HistoricalData />} />
              <Route path="/exchanges" element={<Exchanges />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <footer className="footer">
            <p>Cryptocurrency MCP Server Dashboard - Real-time Market Data</p>
          </footer>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

