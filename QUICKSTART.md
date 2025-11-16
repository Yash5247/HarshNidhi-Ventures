# Quick Start Guide

Get up and running with the Cryptocurrency MCP Server and Dashboard in minutes!

## Prerequisites

- Python 3.11+ installed
- Node.js 18+ installed
- Git installed

## Quick Setup (5 minutes)

### 1. Clone Repository

```bash
git clone <your-repo-url>
cd crypto-mcp-server
```

### 2. Backend Setup

**Windows:**
```bash
cd backend
setup.bat
```

**Linux/Mac:**
```bash
cd backend
chmod +x setup.sh
./setup.sh
```

**Manual:**
```bash
cd backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Start Backend

```bash
# Activate virtual environment first (if not already active)
source venv/bin/activate  # Windows: venv\Scripts\activate

# Start server
python main.py
```

Backend will be running at `http://localhost:8000`

### 4. Frontend Setup (New Terminal)

**Windows:**
```bash
cd frontend
setup.bat
```

**Linux/Mac:**
```bash
cd frontend
chmod +x setup.sh
./setup.sh
```

**Manual:**
```bash
cd frontend
npm install
```

### 5. Start Frontend

```bash
npm start
```

Frontend will open at `http://localhost:3000`

## Verify Installation

1. **Backend Health Check**
   - Visit: `http://localhost:8000/health`
   - Should return: `{"status":"healthy",...}`

2. **Frontend Dashboard**
   - Visit: `http://localhost:3000`
   - Status indicator should show "🟢 Online"

3. **Test API**
   - In dashboard, select an exchange (e.g., Binance)
   - Enter symbol: `BTC/USDT`
   - Click "Fetch Data"
   - Should display ticker information

## Common Issues

### Backend won't start
- Check Python version: `python --version` (should be 3.11+)
- Verify dependencies: `pip list`
- Check port 8000 is not in use

### Frontend won't start
- Check Node version: `node --version` (should be 18+)
- Delete `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Check port 3000 is not in use

### API connection errors
- Ensure backend is running
- Check `REACT_APP_API_URL` in frontend `.env` file
- Verify CORS settings in backend

## Next Steps

- Read [README.md](README.md) for detailed documentation
- Read [DEPLOYMENT.md](DEPLOYMENT.md) for production deployment
- Check [backend/ENV_TEMPLATE.md](backend/ENV_TEMPLATE.md) for environment variables
- Check [frontend/ENV_TEMPLATE.md](frontend/ENV_TEMPLATE.md) for frontend config

## Development Commands

### Backend
```bash
# Run server
python main.py

# Run with auto-reload
uvicorn main:app --reload

# Run tests
pytest tests/ -v

# Run tests with coverage
pytest tests/ -v --cov=.
```

### Frontend
```bash
# Start dev server
npm start

# Build for production
npm run build

# Run tests
npm test
```

## Need Help?

- Check the [README.md](README.md) for detailed information
- Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment issues
- Open an issue on GitHub

Happy coding! 🚀

