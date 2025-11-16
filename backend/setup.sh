#!/bin/bash

# Setup script for backend development environment

echo "🚀 Setting up Cryptocurrency MCP Server Backend..."

# Check Python version
python_version=$(python3 --version 2>&1 | awk '{print $2}')
echo "Python version: $python_version"

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip

# Install dependencies
echo "Installing dependencies..."
pip install -r requirements.txt

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cat > .env << EOF
PORT=8000
HOST=0.0.0.0
DEBUG=true
ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
CACHE_TTL=60
CACHE_MAX_SIZE=1000
WS_ENABLED=true
LOG_LEVEL=INFO
EOF
    echo "✅ .env file created. Please update with your API keys if needed."
else
    echo "✅ .env file already exists."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the server:"
echo "  source venv/bin/activate"
echo "  python main.py"
echo ""
echo "Or:"
echo "  uvicorn main:app --reload --host 0.0.0.0 --port 8000"

