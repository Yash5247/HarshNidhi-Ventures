# Backend Environment Variables Template

Copy this content to a `.env` file in the `backend/` directory:

```env
# API Keys and Exchange Credentials (Optional)
COINMARKETCAP_API_KEY=your_coinmarketcap_api_key_here
BINANCE_API_KEY=your_binance_api_key_here
BINANCE_SECRET_KEY=your_binance_secret_key_here
COINBASE_API_KEY=your_coinbase_api_key_here
COINBASE_SECRET_KEY=your_coinbase_secret_key_here

# Server Configuration
PORT=8000
HOST=0.0.0.0
DEBUG=false

# CORS Configuration
ALLOWED_ORIGINS=https://crypto-dashboard.vercel.app,http://localhost:3000,http://localhost:5173

# Cache Configuration
CACHE_TTL=60
CACHE_MAX_SIZE=1000

# WebSocket Configuration
WS_ENABLED=true
WS_PORT=8001

# Logging
LOG_LEVEL=INFO
```

## Instructions

1. Create a `.env` file in the `backend/` directory
2. Copy the variables above and fill in your values
3. For local development, set `DEBUG=true`
4. API keys are optional - the server works without them for public endpoints

