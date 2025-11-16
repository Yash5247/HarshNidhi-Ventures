# Cryptocurrency MCP Server & Dashboard

A full-stack application providing real-time and historical cryptocurrency market data through a FastAPI MCP (Model Context Protocol) server with a React dashboard frontend.

## 🚀 Features

- **Real-time Market Data**: Fetch live ticker data from major cryptocurrency exchanges
- **Historical Data**: Retrieve OHLCV (Open, High, Low, Close, Volume) data with customizable timeframes
- **Multiple Exchange Support**: Integrated with Binance, Coinbase, Kraken, Bitfinex, and more via CCXT
- **WebSocket Support**: Real-time updates via WebSocket connections
- **Caching Layer**: TTL-based caching for improved performance
- **Modern UI**: Beautiful, responsive React dashboard with charts and real-time updates
- **Production Ready**: Fully configured for deployment on Render (backend) and Vercel (frontend)

## 📁 Project Structure

```
.
├── backend/                 # FastAPI MCP Server
│   ├── main.py             # Main FastAPI application
│   ├── config.py           # Configuration settings
│   ├── requirements.txt    # Python dependencies
│   ├── Dockerfile          # Docker configuration
│   ├── render.yaml         # Render deployment config
│   ├── models/             # Pydantic schemas
│   ├── services/           # Business logic services
│   │   ├── crypto_service.py
│   │   ├── cache_service.py
│   │   └── websocket_manager.py
│   └── tests/              # Test suite
├── frontend/               # React Dashboard
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── config/        # API configuration
│   │   └── App.js         # Main app component
│   ├── package.json       # Node dependencies
│   ├── vercel.json        # Vercel deployment config
│   └── .vercelignore      # Vercel ignore patterns
├── .github/
│   └── workflows/          # GitHub Actions CI/CD
└── README.md              # This file
```

## 🛠️ Setup & Installation

### Prerequisites

- Python 3.11+
- Node.js 18+
- npm or yarn
- Git

### Local Development

#### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd crypto-mcp-server
   ```

2. **Navigate to backend directory**
   ```bash
   cd backend
   ```

3. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**
   Create a `.env` file in the `backend/` directory:
   ```env
   PORT=8000
   HOST=0.0.0.0
   DEBUG=true
   ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
   CACHE_TTL=60
   CACHE_MAX_SIZE=1000
   WS_ENABLED=true
   LOG_LEVEL=INFO
   
   # Optional: API Keys (not required for basic functionality)
   COINMARKETCAP_API_KEY=your_key_here
   BINANCE_API_KEY=your_key_here
   BINANCE_SECRET_KEY=your_secret_here
   ```

6. **Run the server**
   ```bash
   python main.py
   # Or
   uvicorn main:app --reload --host 0.0.0.0 --port 8000
   ```

   The backend will be available at `http://localhost:8000`

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `frontend/` directory:
   ```env
   REACT_APP_API_URL=http://localhost:8000
   REACT_APP_WS_URL=ws://localhost:8001
   ```

4. **Start development server**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest tests/ -v
```

With coverage:
```bash
pytest tests/ -v --cov=. --cov-report=html
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Build Frontend Locally

```bash
cd frontend
npm run build
```

## 📦 Deployment

### Backend Deployment on Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service**
   - Connect your GitHub repository
   - Select the `backend` directory as the root directory
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`

3. **Configure Environment Variables** in Render dashboard:
   ```
   PORT=8000
   HOST=0.0.0.0
   DEBUG=false
   ALLOWED_ORIGINS=https://crypto-dashboard.vercel.app,http://localhost:3000
   CACHE_TTL=60
   CACHE_MAX_SIZE=1000
   WS_ENABLED=true
   LOG_LEVEL=INFO
   ```

4. **Deploy**
   - Render will automatically deploy on every push to the main branch
   - Your backend will be available at `https://crypto-mcp-server.onrender.com`

### Frontend Deployment on Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your GitHub repository**
   - Select the `frontend` directory as the root directory
   - Framework Preset: Create React App

3. **Configure Environment Variables** in Vercel dashboard:
   ```
   REACT_APP_API_URL=https://crypto-mcp-server.onrender.com
   REACT_APP_WS_URL=wss://crypto-mcp-server.onrender.com
   ```

4. **Deploy**
   - Vercel will automatically deploy on every push to the main branch
   - Your frontend will be available at `https://crypto-dashboard.vercel.app`

### Alternative: Using Docker

#### Backend Docker Deployment

```bash
cd backend
docker build -t crypto-mcp-server .
docker run -p 8000:8000 --env-file .env crypto-mcp-server
```

## 🔌 API Endpoints

### Health Check
```
GET /health
```

### Get Supported Exchanges
```
GET /api/exchanges
```

### Get Ticker Data
```
GET /api/ticker/{exchange}/{symbol}
```
Example: `GET /api/ticker/binance/BTC/USDT`

### Get Historical Data
```
POST /api/historical
Content-Type: application/json

{
  "exchange": "binance",
  "symbol": "BTC/USDT",
  "timeframe": "1h",
  "limit": 100
}
```

### Get Markets
```
GET /api/markets/{exchange}
```

### WebSocket Connection
```
WS /ws
```

## 🔧 Configuration

### Backend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `8000` |
| `HOST` | Server host | `0.0.0.0` |
| `DEBUG` | Debug mode | `false` |
| `ALLOWED_ORIGINS` | CORS allowed origins | Comma-separated list |
| `CACHE_TTL` | Cache time-to-live (seconds) | `60` |
| `CACHE_MAX_SIZE` | Maximum cache size | `1000` |
| `WS_ENABLED` | Enable WebSocket | `true` |
| `LOG_LEVEL` | Logging level | `INFO` |

### Frontend Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:8000` |
| `REACT_APP_WS_URL` | WebSocket URL | `ws://localhost:8001` |

## 🐛 Troubleshooting

### Backend Issues

1. **Port already in use**
   - Change the `PORT` in `.env` file
   - Or kill the process using the port

2. **Exchange connection errors**
   - Check your internet connection
   - Some exchanges may require API keys for certain endpoints
   - Check exchange status and rate limits

3. **Import errors**
   - Ensure all dependencies are installed: `pip install -r requirements.txt`
   - Verify Python version is 3.11+

### Frontend Issues

1. **CORS errors**
   - Ensure backend `ALLOWED_ORIGINS` includes your frontend URL
   - Check that backend is running and accessible

2. **API connection errors**
   - Verify `REACT_APP_API_URL` is correct
   - Check backend health endpoint: `{API_URL}/health`

3. **Build errors**
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check Node.js version: `node --version` (should be 18+)

### Deployment Issues

1. **Render deployment fails**
   - Check build logs in Render dashboard
   - Verify `requirements.txt` is correct
   - Ensure `render.yaml` is properly configured

2. **Vercel deployment fails**
   - Check build logs in Vercel dashboard
   - Verify environment variables are set
   - Ensure `package.json` has correct build scripts

3. **CORS errors in production**
   - Update `ALLOWED_ORIGINS` in backend to include Vercel URL
   - Redeploy backend after updating environment variables

## 📝 API Usage Examples

### Python Example

```python
import requests

# Get ticker data
response = requests.get("http://localhost:8000/api/ticker/binance/BTC/USDT")
print(response.json())

# Get historical data
response = requests.post(
    "http://localhost:8000/api/historical",
    json={
        "exchange": "binance",
        "symbol": "BTC/USDT",
        "timeframe": "1h",
        "limit": 100
    }
)
print(response.json())
```

### JavaScript Example

```javascript
// Get ticker data
fetch('http://localhost:8000/api/ticker/binance/BTC/USDT')
  .then(res => res.json())
  .then(data => console.log(data));

// Get historical data
fetch('http://localhost:8000/api/historical', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    exchange: 'binance',
    symbol: 'BTC/USDT',
    timeframe: '1h',
    limit: 100
  })
})
  .then(res => res.json())
  .then(data => console.log(data));
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [CCXT](https://github.com/ccxt/ccxt) - Cryptocurrency exchange trading library
- [FastAPI](https://fastapi.tiangolo.com/) - Modern web framework
- [React](https://react.dev/) - UI library
- [Render](https://render.com/) - Backend hosting
- [Vercel](https://vercel.com/) - Frontend hosting

## 📧 Contact

For questions or issues, please open an issue on GitHub.

---

**Note**: This project is for educational purposes. Always verify API endpoints and handle errors appropriately in production environments.

