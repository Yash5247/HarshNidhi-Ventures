import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Simple Home Component
const Home = () => (
  <div style={{ padding: '2rem', textAlign: 'center' }}>
    <h1 style={{ fontSize: '3rem', color: '#333', marginBottom: '1rem' }}>
      🚀 Cryptocurrency MCP Dashboard
    </h1>
    <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '2rem' }}>
      Real-time and historical cryptocurrency market data
    </p>
    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
      <Link to="/dashboard" style={{ 
        background: '#667eea', 
        color: 'white', 
        padding: '1rem 2rem', 
        borderRadius: '8px', 
        textDecoration: 'none',
        fontWeight: 'bold'
      }}>
        View Dashboard
      </Link>
      <Link to="/exchanges" style={{ 
        background: 'white', 
        color: '#667eea', 
        padding: '1rem 2rem', 
        borderRadius: '8px', 
        textDecoration: 'none',
        border: '2px solid #667eea',
        fontWeight: 'bold'
      }}>
        View Exchanges
      </Link>
    </div>
    
    <div style={{ marginTop: '3rem', textAlign: 'left', maxWidth: '800px', margin: '3rem auto' }}>
      <h2 style={{ color: '#333', marginBottom: '1rem' }}>Features</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📊</div>
          <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Real-Time Data</h3>
          <p style={{ color: '#666' }}>Get live cryptocurrency prices from major exchanges</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>📈</div>
          <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Historical Charts</h3>
          <p style={{ color: '#666' }}>View price history with interactive charts</p>
        </div>
        <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>🔄</div>
          <h3 style={{ color: '#333', marginBottom: '0.5rem' }}>Multi-Exchange</h3>
          <p style={{ color: '#666' }}>Access data from Binance, Coinbase, and more</p>
        </div>
      </div>
    </div>
  </div>
);

// Simple Dashboard Component
const Dashboard = () => {
  const [ticker, setTicker] = React.useState({
    symbol: 'BTC/USDT',
    exchange: 'binance',
    last: 43250.50,
    bid: 43248.00,
    ask: 43252.00,
    high: 43800.00,
    low: 42800.00,
    volume: 1250000.50
  });

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '1rem' }}>
        📊 Real-Time Market Data
      </h1>
      
      <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', marginBottom: '2rem' }}>
        <div style={{ background: '#e7f3ff', border: '2px solid #2196F3', borderRadius: '8px', padding: '1rem', marginBottom: '1.5rem', textAlign: 'center', color: '#1976D2' }}>
          <p style={{ margin: 0 }}>📊 <strong>Demo Mode:</strong> Showing sample data</p>
        </div>
        
        <h2 style={{ color: '#333', marginBottom: '1.5rem' }}>{ticker.symbol} on {ticker.exchange}</h2>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Last Price</div>
            <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#667eea' }}>
              ${ticker.last.toFixed(2)}
            </div>
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Bid</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              ${ticker.bid.toFixed(2)}
            </div>
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>Ask</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              ${ticker.ask.toFixed(2)}
            </div>
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>24h High</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              ${ticker.high.toFixed(2)}
            </div>
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>24h Low</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              ${ticker.low.toFixed(2)}
            </div>
          </div>
          <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '8px' }}>
            <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>24h Volume</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#333' }}>
              {ticker.volume.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Simple Exchanges Component
const Exchanges = () => {
  const exchanges = [
    { id: 'binance', name: 'Binance', enabled: true },
    { id: 'coinbase', name: 'Coinbase', enabled: true },
    { id: 'kraken', name: 'Kraken', enabled: true }
  ];

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '2.5rem', color: '#333', marginBottom: '2rem' }}>
        Supported Exchanges
      </h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
        {exchanges.map((exchange) => (
          <div key={exchange.id} style={{ 
            background: 'white', 
            padding: '2rem', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)' 
          }}>
            <h3 style={{ color: '#333', marginBottom: '0.5rem', fontSize: '1.5rem' }}>
              {exchange.name}
            </h3>
            <p style={{ color: '#666', marginBottom: '1rem' }}>ID: {exchange.id}</p>
            <div style={{ 
              display: 'inline-block', 
              padding: '0.5rem 1rem', 
              borderRadius: '20px', 
              background: '#d4edda', 
              color: '#155724',
              fontWeight: '500'
            }}>
              ✓ Enabled
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="App">
        <nav style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '1rem 2rem',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <h1 style={{ fontSize: '1.5rem', color: '#667eea', fontWeight: 'bold', margin: 0 }}>
              🚀 Crypto MCP Dashboard
            </h1>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <Link to="/" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Home</Link>
              <Link to="/dashboard" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Dashboard</Link>
              <Link to="/exchanges" style={{ textDecoration: 'none', color: '#333', fontWeight: '500' }}>Exchanges</Link>
            </div>
            <div style={{
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              background: '#f8d7da',
              color: '#721c24',
              fontSize: '0.9rem',
              fontWeight: '500'
            }}>
              🔴 Offline
            </div>
          </div>
        </nav>

        <main style={{ flex: 1, minHeight: 'calc(100vh - 200px)' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/exchanges" element={<Exchanges />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <footer style={{
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '1.5rem',
          textAlign: 'center',
          color: '#666',
          marginTop: 'auto'
        }}>
          <p style={{ margin: 0 }}>Cryptocurrency MCP Server Dashboard - Real-time Market Data</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
