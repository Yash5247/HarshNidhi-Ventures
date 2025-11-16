import React, { useState, useEffect } from 'react';
import { fetchStats } from '../utils/apiClient';
import './Stats.css';

const Stats = () => {
  const [stats, setStats] = useState({
    exchanges: 5,
    totalMarkets: 1000,
    lastUpdate: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await fetchStats();
      setStats(data);
    } catch (err) {
      console.error('Failed to load stats:', err);
      // Keep default stats
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
      <div className="stat-card animate-on-scroll" style={{ transitionDelay: '0s' }}>
        <div className="stat-icon">🏦</div>
        <div className="stat-content">
          <div className="stat-value">{stats.exchanges}</div>
          <div className="stat-label">Supported Exchanges</div>
        </div>
      </div>
      <div className="stat-card animate-on-scroll" style={{ transitionDelay: '0.1s' }}>
        <div className="stat-icon">📈</div>
        <div className="stat-content">
          <div className="stat-value">{stats.totalMarkets > 0 ? stats.totalMarkets : '1000+'}</div>
          <div className="stat-label">Available Markets</div>
        </div>
      </div>
      <div className="stat-card animate-on-scroll" style={{ transitionDelay: '0.2s' }}>
        <div className="stat-icon">🔄</div>
        <div className="stat-content">
          <div className="stat-value">Real-time</div>
          <div className="stat-label">Data Updates</div>
        </div>
      </div>
      <div className="stat-card animate-on-scroll" style={{ transitionDelay: '0.3s' }}>
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

