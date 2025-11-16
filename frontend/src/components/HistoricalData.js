import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { API_BASE_URL } from '../config/api';
import './HistoricalData.css';

const HistoricalData = () => {
  const [exchanges, setExchanges] = useState([]);
  const [selectedExchange, setSelectedExchange] = useState('');
  const [selectedSymbol, setSelectedSymbol] = useState('BTC/USDT');
  const [timeframe, setTimeframe] = useState('1h');
  const [limit, setLimit] = useState(100);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchExchanges();
  }, []);

  const fetchExchanges = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/exchanges`);
      const data = await response.json();
      setExchanges(data.exchanges || []);
      if (data.exchanges && data.exchanges.length > 0) {
        setSelectedExchange(data.exchanges[0].id);
      }
    } catch (err) {
      setError('Failed to fetch exchanges');
    }
  };

  const fetchHistoricalData = async (e) => {
    e.preventDefault();
    if (!selectedExchange || !selectedSymbol) return;

    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/api/historical`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          exchange: selectedExchange,
          symbol: selectedSymbol,
          timeframe: timeframe,
          limit: limit,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch historical data');
      }

      const result = await response.json();
      setData(result.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const chartData = data.map((item) => ({
    time: new Date(item.timestamp).toLocaleString(),
    open: item.open,
    high: item.high,
    low: item.low,
    close: item.close,
    volume: item.volume,
  }));

  return (
    <div className="historical-data">
      <div className="card">
        <h2>Historical Market Data</h2>

        <form onSubmit={fetchHistoricalData}>
          <div className="form-row">
            <div className="form-group">
              <label>Exchange</label>
              <select
                value={selectedExchange}
                onChange={(e) => setSelectedExchange(e.target.value)}
                required
              >
                <option value="">Select Exchange</option>
                {exchanges.map((ex) => (
                  <option key={ex.id} value={ex.id}>
                    {ex.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Trading Pair</label>
              <input
                type="text"
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value.toUpperCase())}
                placeholder="BTC/USDT"
                required
              />
            </div>

            <div className="form-group">
              <label>Timeframe</label>
              <select
                value={timeframe}
                onChange={(e) => setTimeframe(e.target.value)}
                required
              >
                <option value="1m">1 Minute</option>
                <option value="5m">5 Minutes</option>
                <option value="15m">15 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">1 Day</option>
              </select>
            </div>

            <div className="form-group">
              <label>Limit (1-1000)</label>
              <input
                type="number"
                value={limit}
                onChange={(e) => setLimit(Math.min(1000, Math.max(1, parseInt(e.target.value) || 100)))}
                min="1"
                max="1000"
                required
              />
            </div>
          </div>

          <button type="submit" className="btn" disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Historical Data'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {data.length > 0 && (
          <div className="chart-container">
            <h3>Price Chart - {selectedSymbol}</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="open" stroke="#8884d8" name="Open" />
                <Line type="monotone" dataKey="high" stroke="#82ca9d" name="High" />
                <Line type="monotone" dataKey="low" stroke="#ffc658" name="Low" />
                <Line type="monotone" dataKey="close" stroke="#ff7300" name="Close" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoricalData;

