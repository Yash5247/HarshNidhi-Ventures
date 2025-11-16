# Vercel Deployment Fix Guide

## If the website is not showing:

### Step 1: Check Vercel Project Settings

1. Go to Vercel Dashboard → Your Project → Settings
2. Check **Build & Development Settings**:
   - **Framework Preset**: Should be "Create React App"
   - **Root Directory**: Should be `frontend`
   - **Build Command**: Should be `npm run build`
   - **Output Directory**: Should be `build`
   - **Install Command**: Should be `npm install`

### Step 2: Manual Configuration

If auto-detection failed, manually set:

```
Framework Preset: Create React App
Root Directory: frontend
Build Command: npm run build
Output Directory: build
Install Command: npm install
```

### Step 3: Environment Variables

In Vercel Dashboard → Settings → Environment Variables:
- Add if needed (not required for basic functionality):
  - `REACT_APP_API_URL` (optional)
  - `REACT_APP_WS_URL` (optional)

### Step 4: Redeploy

1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait for build to complete

### Step 5: Check Build Logs

If still not working:
1. Go to Deployments tab
2. Click on the latest deployment
3. Check "Build Logs" for errors
4. Common issues:
   - Missing dependencies → Check package.json
   - Build errors → Check console output
   - Framework detection → Manually set framework

### Step 6: Verify Build Output

The build should create:
- `frontend/build/index.html`
- `frontend/build/static/js/` (JavaScript files)
- `frontend/build/static/css/` (CSS files)

If these don't exist, the build failed.

## Quick Test

To test if React is working, check browser console (F12):
- Should see no errors
- React DevTools should detect React
- Network tab should show JS/CSS files loading

## Alternative: Deploy from CLI

```bash
cd frontend
npm install
npm run build
npx vercel --prod
```

This will deploy directly and show any errors.

