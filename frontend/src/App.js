import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import HistoricalData from './components/HistoricalData';
import Exchanges from './components/Exchanges';
import NotFound from './components/NotFound';

function App() {
  const [healthStatus, setHealthStatus] = useState('offline');

  useEffect(() => {
    // Simple health check with timeout
    const checkHealth = async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);
        
        const res = await fetch('http://localhost:8000/health', {
          signal: controller.signal
        });
        clearTimeout(timeoutId);
        
        if (res.ok) {
          const data = await res.json();
          setHealthStatus(data.status === 'healthy' ? 'online' : 'offline');
        } else {
          setHealthStatus('offline');
        }
      } catch (error) {
        setHealthStatus('offline');
      }
    };
    
    checkHealth();
  }, []);

  return (
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
  );
}

export default App;
