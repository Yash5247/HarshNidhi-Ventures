import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import ApiError from './ApiError';
import LoadingSpinner from './LoadingSpinner';
import './Exchanges.css';

const Exchanges = () => {
  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/exchanges`);
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('404: NOT_FOUND - Exchanges endpoint not available');
        }
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data = await response.json();
      setExchanges(data.exchanges || []);
      setError(null);
    } catch (err) {
      console.error('Error fetching exchanges:', err);
      setError(err);
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

  if (error) {
    return (
      <div className="card">
        <ApiError error={error} onRetry={fetchExchanges} />
      </div>
    );
  }

  return (
    <div className="exchanges">
      <div className="card">
        <h2>Supported Exchanges</h2>
        <p className="subtitle">
          These are the cryptocurrency exchanges currently supported by the MCP server.
        </p>

        <div className="exchanges-grid">
          {exchanges.map((exchange) => (
            <div key={exchange.id} className="exchange-card">
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

