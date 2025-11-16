#!/bin/bash

# Setup script for frontend development environment

echo "🚀 Setting up Cryptocurrency MCP Dashboard Frontend..."

# Check Node version
node_version=$(node --version)
echo "Node version: $node_version"

# Check npm version
npm_version=$(npm --version)
echo "npm version: $npm_version"

# Install dependencies
echo "Installing dependencies..."
npm install

# Create .env file if it doesn't exist
if [ ! -f ".env" ]; then
    echo "Creating .env file from template..."
    cat > .env << EOF
REACT_APP_API_URL=http://localhost:8000
REACT_APP_WS_URL=ws://localhost:8001
REACT_APP_APP_NAME=Crypto MCP Dashboard
REACT_APP_VERSION=1.0.0
EOF
    echo "✅ .env file created. Please update REACT_APP_API_URL if your backend is on a different URL."
else
    echo "✅ .env file already exists."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "To start the development server:"
echo "  npm start"
echo ""
echo "To build for production:"
echo "  npm run build"

