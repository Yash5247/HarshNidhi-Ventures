@echo off
REM Setup script for frontend development environment (Windows)

echo 🚀 Setting up Cryptocurrency MCP Dashboard Frontend...

REM Check Node version
node --version
if errorlevel 1 (
    echo ERROR: Node.js is not installed or not in PATH
    exit /b 1
)

REM Check npm version
npm --version
if errorlevel 1 (
    echo ERROR: npm is not installed or not in PATH
    exit /b 1
)

REM Install dependencies
echo Installing dependencies...
call npm install

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file from template...
    (
        echo REACT_APP_API_URL=http://localhost:8000
        echo REACT_APP_WS_URL=ws://localhost:8001
        echo REACT_APP_APP_NAME=Crypto MCP Dashboard
        echo REACT_APP_VERSION=1.0.0
    ) > .env
    echo ✅ .env file created. Please update REACT_APP_API_URL if your backend is on a different URL.
) else (
    echo ✅ .env file already exists.
)

echo.
echo ✅ Setup complete!
echo.
echo To start the development server:
echo   npm start
echo.
echo To build for production:
echo   npm run build
pause

