@echo off
REM Setup script for backend development environment (Windows)

echo 🚀 Setting up Cryptocurrency MCP Server Backend...

REM Check Python version
python --version
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    exit /b 1
)

REM Create virtual environment
if not exist "venv" (
    echo Creating virtual environment...
    python -m venv venv
)

REM Activate virtual environment
echo Activating virtual environment...
call venv\Scripts\activate.bat

REM Upgrade pip
echo Upgrading pip...
python -m pip install --upgrade pip

REM Install dependencies
echo Installing dependencies...
pip install -r requirements.txt

REM Create .env file if it doesn't exist
if not exist ".env" (
    echo Creating .env file from template...
    (
        echo PORT=8000
        echo HOST=0.0.0.0
        echo DEBUG=true
        echo ALLOWED_ORIGINS=http://localhost:3000,http://localhost:5173
        echo CACHE_TTL=60
        echo CACHE_MAX_SIZE=1000
        echo WS_ENABLED=true
        echo LOG_LEVEL=INFO
    ) > .env
    echo ✅ .env file created. Please update with your API keys if needed.
) else (
    echo ✅ .env file already exists.
)

echo.
echo ✅ Setup complete!
echo.
echo To start the server:
echo   venv\Scripts\activate
echo   python main.py
echo.
echo Or:
echo   uvicorn main:app --reload --host 0.0.0.0 --port 8000
pause

