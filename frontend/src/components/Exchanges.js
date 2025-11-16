import React, { useState, useEffect } from 'react';
import { fetchExchanges } from '../utils/apiClient';
import { initScrollAnimations } from '../utils/scrollAnimation';
import LoadingSpinner from './LoadingSpinner';
import './Exchanges.css';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false);

  useEffect(() => {
    loadExchanges();
    const timer = setTimeout(() => {
      initScrollAnimations();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const loadExchanges = async () => {
    setLoading(true);
    try {
      const data = await fetchExchanges();
      setExchanges(data.exchanges || []);
      if (data.exchanges && data.exchanges[0]?.id === 'binance') {
        setIsDemoMode(true);
      }
    } catch (err) {
      console.error('Error loading exchanges:', err);
      setIsDemoMode(true);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="card">
        <LoadingSpinner message="Loading exchanges..." />
      </div>
    );
  }

  return (
    <div className="exchanges">
      <div className="card">
        <h2>Supported Exchanges</h2>
        {isDemoMode && (
          <div className="demo-notice">
            <p>📊 <strong>Demo Mode:</strong> Showing sample exchange data.</p>
          </div>
        )}
        <p className="subtitle">
          These are the cryptocurrency exchanges currently supported by the MCP server.
        </p>

        <div className="exchanges-grid">
          {exchanges.map((exchange, index) => (
            <div key={exchange.id} className={`exchange-card animate-on-scroll`} style={{ transitionDelay: `${index * 0.1}s` }}>
              <h3>{exchange.name}</h3>
              <p className="exchange-id">ID: {exchange.id}</p>
              <div className="exchange-status">
                <span className={`status-badge ${exchange.enabled ? 'enabled' : 'disabled'}`}>
                  {exchange.enabled ? '✓ Enabled' : '✗ Disabled'}
                </span>
              </div>
              {exchange.countries && exchange.countries.length > 0 && (
                <div className="exchange-countries">
                  <strong>Countries:</strong> {exchange.countries.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>

        {exchanges.length === 0 && (
          <div className="no-exchanges">
            No exchanges available. Please check the backend connection.
          </div>
        )}
      </div>
    </div>
  );
};

export default Exchanges;

