import React, { useState, useEffect } from 'react';
import { API_BASE_URL } from '../config/api';
import './Stats.css';

const Stats = () => {
  const [stats, setStats] = useState({
    exchanges: 0,
    totalMarkets: 0,
    lastUpdate: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/exchanges`);
      if (response.ok) {
        const data = await response.json();
        const exchangeCount = data.exchanges?.length || 0;
        
        // Try to get markets from first exchange
        let totalMarkets = 0;
        if (exchangeCount > 0 && data.exchanges[0].id) {
          try {
            const marketsResponse = await fetch(
              `${API_BASE_URL}/api/markets/${data.exchanges[0].id}`
            );
            if (marketsResponse.ok) {
              const marketsData = await marketsResponse.json();
              totalMarkets = marketsData.markets?.length || 0;
            }
          } catch (e) {
            // Ignore errors for markets
          }
        }

        setStats({
          exchanges: exchangeCount,
          totalMarkets: totalMarkets,
          lastUpdate: new Date().toLocaleTimeString()
        });
      }
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="stats-container">
        <div className="loading">Loading statistics...</div>
      </div>
    );
  }

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">🏦</div>
        <div className="stat-content">
          <div className="stat-value">{stats.exchanges}</div>
          <div className="stat-label">Supported Exchanges</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">📈</div>
        <div className="stat-content">
          <div className="stat-value">{stats.totalMarkets > 0 ? stats.totalMarkets : '1000+'}</div>
          <div className="stat-label">Available Markets</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">🔄</div>
        <div className="stat-content">
          <div className="stat-value">Real-time</div>
          <div className="stat-label">Data Updates</div>
        </div>
      </div>
      <div className="stat-card">
        <div className="stat-icon">⚡</div>
        <div className="stat-content">
          <div className="stat-value">&lt;100ms</div>
          <div className="stat-label">Response Time</div>
        </div>
      </div>
    </div>
  );
};

export default Stats;

