# Deployment Guide

This guide provides step-by-step instructions for deploying the Cryptocurrency MCP Server and Dashboard to production.

## Table of Contents

1. [Backend Deployment on Render](#backend-deployment-on-render)
2. [Frontend Deployment on Vercel](#frontend-deployment-on-vercel)
3. [Environment Variables Setup](#environment-variables-setup)
4. [Post-Deployment Configuration](#post-deployment-configuration)
5. [Troubleshooting](#troubleshooting)

## Backend Deployment on Render

### Step 1: Create Render Account

1. Go to [render.com](https://render.com)
2. Sign up for a free account (or log in)
3. Connect your GitHub account

### Step 2: Create New Web Service

1. Click **"New +"** button
2. Select **"Web Service"**
3. Connect your GitHub repository
4. Select the repository containing this project

### Step 3: Configure Service

- **Name**: `crypto-mcp-server` (or your preferred name)
- **Region**: Choose closest to your users
- **Branch**: `main` or `master`
- **Root Directory**: `backend`
- **Runtime**: `Python 3`
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

### Step 4: Set Environment Variables

In the Render dashboard, go to **Environment** tab and add:

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

**Optional API Keys** (add if you have them):
```
COINMARKETCAP_API_KEY=your_key_here
BINANCE_API_KEY=your_key_here
BINANCE_SECRET_KEY=your_secret_here
```

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Install dependencies
   - Start your server
3. Wait for deployment to complete (usually 2-5 minutes)
4. Your backend will be available at: `https://crypto-mcp-server.onrender.com`

### Step 6: Verify Deployment

1. Visit `https://crypto-mcp-server.onrender.com/health`
2. You should see: `{"status":"healthy","timestamp":"...","service":"crypto-mcp-server"}`

## Frontend Deployment on Vercel

### Step 1: Create Vercel Account

1. Go to [vercel.com](https://vercel.com)
2. Sign up for a free account (or log in)
3. Connect your GitHub account

### Step 2: Import Project

1. Click **"Add New..."** → **"Project"**
2. Select your GitHub repository
3. Click **"Import"**

### Step 3: Configure Project

- **Framework Preset**: `Create React App`
- **Root Directory**: `frontend`
- **Build Command**: `npm run build` (auto-detected)
- **Output Directory**: `build` (auto-detected)
- **Install Command**: `npm install` (auto-detected)

### Step 4: Set Environment Variables

In the **Environment Variables** section, add:

```
REACT_APP_API_URL=https://crypto-mcp-server.onrender.com
REACT_APP_WS_URL=wss://crypto-mcp-server.onrender.com
```

**Important**: Replace `crypto-mcp-server.onrender.com` with your actual Render backend URL!

### Step 5: Deploy

1. Click **"Deploy"**
2. Vercel will:
   - Install dependencies
   - Build your React app
   - Deploy to production
3. Wait for deployment (usually 1-3 minutes)
4. Your frontend will be available at: `https://crypto-dashboard.vercel.app` (or your custom domain)

### Step 6: Verify Deployment

1. Visit your Vercel URL
2. Check that the dashboard loads
3. Verify the status indicator shows "🟢 Online"
4. Test fetching ticker data

## Environment Variables Setup

### Backend (Render)

| Variable | Value | Required |
|----------|-------|----------|
| `PORT` | `8000` | Yes |
| `HOST` | `0.0.0.0` | Yes |
| `DEBUG` | `false` | Yes |
| `ALLOWED_ORIGINS` | Your Vercel URL + localhost | Yes |
| `CACHE_TTL` | `60` | No |
| `CACHE_MAX_SIZE` | `1000` | No |
| `WS_ENABLED` | `true` | No |
| `LOG_LEVEL` | `INFO` | No |

### Frontend (Vercel)

| Variable | Value | Required |
|----------|-------|----------|
| `REACT_APP_API_URL` | Your Render backend URL | Yes |
| `REACT_APP_WS_URL` | Your Render WebSocket URL (wss://) | Yes |

## Post-Deployment Configuration

### 1. Update CORS Settings

After deploying frontend, update backend `ALLOWED_ORIGINS`:

1. Go to Render dashboard
2. Navigate to your service
3. Go to **Environment** tab
4. Update `ALLOWED_ORIGINS` to include your Vercel URL:
   ```
   ALLOWED_ORIGINS=https://crypto-dashboard.vercel.app,http://localhost:3000
   ```
5. Save and redeploy

### 2. Enable Auto-Deploy

Both Render and Vercel auto-deploy on push to main branch by default. Verify:

**Render**:
- Settings → Auto-Deploy: Should be enabled

**Vercel**:
- Settings → Git → Production Branch: Should be `main` or `master`

### 3. Set Up Custom Domains (Optional)

**Render**:
1. Go to Settings → Custom Domains
2. Add your domain
3. Follow DNS configuration instructions

**Vercel**:
1. Go to Settings → Domains
2. Add your domain
3. Update DNS records as instructed

## Troubleshooting

### Backend Issues

#### Deployment Fails

**Problem**: Build fails on Render

**Solutions**:
1. Check build logs in Render dashboard
2. Verify `requirements.txt` is correct
3. Ensure Python version is 3.11+
4. Check for syntax errors in code

#### Server Not Starting

**Problem**: Service shows as unhealthy

**Solutions**:
1. Check logs for errors
2. Verify `PORT` environment variable is set
3. Ensure `uvicorn` is in requirements.txt
4. Check health endpoint: `/health`

#### CORS Errors

**Problem**: Frontend can't connect to backend

**Solutions**:
1. Verify `ALLOWED_ORIGINS` includes frontend URL
2. Check for typos in URLs
3. Ensure no trailing slashes
4. Redeploy backend after updating environment variables

### Frontend Issues

#### Build Fails

**Problem**: Vercel build fails

**Solutions**:
1. Check build logs
2. Verify all dependencies in `package.json`
3. Ensure Node.js version is 18+
4. Test build locally: `npm run build`

#### API Connection Errors

**Problem**: Frontend can't reach backend

**Solutions**:
1. Verify `REACT_APP_API_URL` is correct
2. Check backend is running and accessible
3. Test backend health endpoint manually
4. Check browser console for CORS errors

#### Environment Variables Not Working

**Problem**: Variables not available in app

**Solutions**:
1. Ensure variables start with `REACT_APP_`
2. Redeploy after adding variables
3. Clear browser cache
4. Check Vercel environment variables are set for Production

### General Issues

#### WebSocket Not Working

**Problem**: WebSocket connections fail

**Solutions**:
1. Use `wss://` (not `ws://`) for HTTPS
2. Verify `WS_ENABLED=true` in backend
3. Check firewall/proxy settings
4. Test WebSocket connection manually

#### Slow Response Times

**Problem**: API responses are slow

**Solutions**:
1. Check Render service tier (free tier may be slower)
2. Enable caching (already configured)
3. Optimize database queries (if using database)
4. Consider upgrading Render plan

## Monitoring

### Render Monitoring

- **Logs**: Available in Render dashboard
- **Metrics**: CPU, Memory, Request count
- **Alerts**: Set up in Settings → Notifications

### Vercel Monitoring

- **Analytics**: Available in Vercel dashboard
- **Logs**: Function logs and build logs
- **Performance**: Real User Monitoring (RUM)

## Next Steps

1. ✅ Backend deployed on Render
2. ✅ Frontend deployed on Vercel
3. ✅ Environment variables configured
4. ✅ CORS settings updated
5. ✅ Auto-deploy enabled
6. 🎉 Your app is live!

## Support

For issues:
1. Check logs in Render/Vercel dashboards
2. Review error messages
3. Test endpoints manually
4. Open an issue on GitHub

---

**Note**: Free tiers on Render and Vercel may have limitations:
- Render free tier: Services spin down after 15 minutes of inactivity
- Vercel free tier: Generous limits, suitable for most projects

