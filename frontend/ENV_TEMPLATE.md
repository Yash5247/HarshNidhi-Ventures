# Frontend Environment Variables Template

Copy this content to a `.env` file in the `frontend/` directory:

## Local Development

```env
# Backend API Configuration
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8001

# Application Configuration
REACT_APP_APP_NAME=Crypto MCP Dashboard
REACT_APP_VERSION=1.0.0
```

## Production (Vercel)

```env
# Backend API Configuration
REACT_APP_API_URL=https://crypto-mcp-server.onrender.com
REACT_APP_WS_URL=wss://crypto-mcp-server.onrender.com

# Application Configuration
REACT_APP_APP_NAME=Crypto MCP Dashboard
REACT_APP_VERSION=1.0.0
```

## Instructions

1. Create a `.env` file in the `frontend/` directory
2. Copy the appropriate variables above (local or production)
3. Update `REACT_APP_API_URL` with your actual backend URL
4. Update `REACT_APP_WS_URL` with your actual WebSocket URL (use `wss://` for HTTPS)

