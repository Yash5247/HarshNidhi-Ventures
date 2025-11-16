import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import HistoricalData from './components/HistoricalData';
import Exchanges from './components/Exchanges';
import NotFound from './components/NotFound';
import { API_BASE_URL } from './config/api';

function App() {
  const [healthStatus, setHealthStatus] = useState('offline');

  useEffect(() => {
    const checkHealth = async () => {
      // Skip health check if using localhost (development) or if API URL is not set
      if (API_BASE_URL.includes('localhost') || !API_BASE_URL || API_BASE_URL === 'http://localhost:8000') {
        setHealthStatus('offline');
        return;
      }

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);
        
        const res = await fetch(`${API_BASE_URL}/health`, {
          signal: controller.signal,
          mode: 'cors'
        });
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();
          setHealthStatus(data.status === 'healthy' ? 'online' : 'offline');
        } else {
          setHealthStatus('offline');
        }
      } catch (error) {
        // Silently fail - offline is expected if backend is not deployed
        setHealthStatus('offline');
      }
    };
    
    checkHealth();
    
    // Optionally check health periodically
    const interval = setInterval(checkHealth, 30000); // Check every 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <Link to="/" className="logo-link">
              <h1 className="logo">🚀 Crypto MCP Dashboard</h1>
            </Link>
            <div className="nav-links">
              <Link to="/">Home</Link>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/historical">Historical Data</Link>
              <Link to="/exchanges">Exchanges</Link>
            </div>
            <div className={`status-indicator ${healthStatus}`} title={healthStatus === 'online' ? 'Backend connected' : 'Backend not connected - using demo mode'}>
              {healthStatus === 'online' ? '🟢 Online' : '🔴 Demo Mode'}
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
          <div className="footer-content">
            <p>Cryptocurrency MCP Server Dashboard - Real-time Market Data</p>
            <div className="footer-links">
              <a href="https://github.com/Yash5247/HarshNidhi-Ventures" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span>•</span>
              <a href="/dashboard">Dashboard</a>
              <span>•</span>
              <a href="/exchanges">Exchanges</a>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
