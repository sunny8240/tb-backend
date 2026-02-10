# Travel Bharat - Deployment Guide

This guide shows you how to deploy Travel Bharat to production.

## Deployment Architecture Options

### Option 1: Separate Domains (Recommended)
- **Frontend**: `https://yourdomain.com` (hosted on Vercel, Netlify, etc.)
- **Backend**: `https://tb-backend-93wu.onrender.com/api` (hosted on Render)
- **Database**: MongoDB Atlas (Cloud)

### Option 2: Single Domain with Reverse Proxy
- **Frontend + Backend**: `https://yourdomain.com` (same server, using reverse proxy)
- **Database**: MongoDB Atlas (Cloud)

### Option 3: Single Server (Simpler)
- **Frontend + Backend + Static Files**: Same server
- **Database**: MongoDB Atlas (Cloud)

---

## Step-by-Step Deployment

### 1. Database Setup (MongoDB Atlas)
1. Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with strong password
4. Get your connection string (looks like: `mongodb+srv://user:password@cluster.mongodb.net/travelbharat`)
5. Copy this string - you'll need it for `.env`

### 2. Backend Deployment

#### Using Render.com (Recommended, Free Tier Available)

1. Push your code to GitHub
2. Go to [render.com](https://render.com)
3. Create new **Web Service**
4. Connect your GitHub repository
5. Set these settings:
   - **Runtime**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `backend`
6. Go to **Environment** tab and add:
   ```
   MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/travelbharat
   JWT_SECRET=generate_a_random_long_string_here
   NODE_ENV=production
   ADMIN_EMAIL=admin@travelBharat.com
   ADMIN_PASSWORD=secure_password_here
   FRONTEND_URL=https://your-frontend-domain.com
   PORT=5000
   ```
7. Deploy!
8. Your backend will be available at: `https://tb-backend-93wu.onrender.com`



### 3. Frontend Deployment

#### Using Vercel.com (Recommended for Vite)

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project" and import your GitHub repo
4. Set these settings:
   - **Framework**: Vite
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Install Command**: `npm install`
5. In **Environment Variables**, add:
   ```
   VITE_API_URL=https://tb-backend-93wu.onrender.com/api
   ```
6. Deploy!

#### Using Netlify.com

1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com)
3. Click "New site from Git"
4. Select your repository
5. Set these settings:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
6. In **Site settings > Build & deploy > Environment**, add:
   ```
   VITE_API_URL=https://tb-backend-93wu.onrender.com/api
   ```
7. Deploy!

#### Using GitHub Pages (Static Only - No Backend)
If hosting on GitHub Pages, build the frontend and follow their static site hosting docs.

### 4. Environment Variables Summary

**Backend (.env)** - Update your current `.env`:
```env
MONGODB_URI=mongodb+srv://your_user:your_password@cluster.mongodb.net/travelbharat
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=production
ADMIN_EMAIL=admin@travelBharat.com
ADMIN_PASSWORD=change_this_password
FRONTEND_URL=https://your-frontend-domain.com
```

**Frontend (.env)** - Update your current `.env`:
```env
VITE_API_URL=https://your-backend-api-domain.com/api
```

### 5. Testing Production URLs

After deployment:

1. **Test Backend API**:
   ```bash
   curl https://your-backend-domain.com/api/states
   ```
   Should return JSON list of states.

2. **Test Frontend**:
   Open `https://your-frontend-domain.com` in browser
   Check Network tab in DevTools - verify API calls go to correct backend URL

3. **Test Authentication**:
   Try logging in to admin panel
   Verify token is stored in localStorage

### 6. Domain Setup (Optional)

If you want custom domains like `yourdomain.com`:

1. **Register domain** at GoDaddy, Namecheap, etc.
2. **Point DNS to your hosts**:
   - Frontend: Point to Vercel/Netlify nameservers
   - Backend: Point to Render/Railway nameservers
3. **Update environment variables** with your custom domains

### 7. Post-Deployment Checklist

- [ ] Backend API is accessible from frontend domain
- [ ] Database connection is working (check console logs)
- [ ] CORS is properly configured (no "No Access-Control-Allow-Origin" errors)
- [ ] Admin login works
- [ ] Image uploads work
- [ ] Destinations display with images
- [ ] Mobile responsive design works
- [ ] All API endpoints return data
- [ ] Environment variables are secure (not in version control)

### 8. Monitoring & Debugging

**Check Backend Logs** (Render):
- Go to your service dashboard
- Click "Logs" tab
- Monitor for MongoDB connection errors

**Check Frontend Logs** (Vercel/Netlify):
- Go to your site dashboard
- Click "Deployments" or "Analytics"
- Check console output

**Common Issues**:
- ❌ "Cannot GET /api/states" → Backend not deployed correctly
- ❌ "CORS error" → `FRONTEND_URL` not set in backend `.env`
- ❌ Images not loading → Check `/uploads` path and static file serving
- ❌ Login fails → JWT_SECRET mismatch or token not stored properly

---

## Production Optimization Tips

1. **Enable HTTPS**: All platforms support free SSL
2. **Set NODE_ENV=production**: Enables optimizations
3. **Use MongoDB Atlas Free Tier**: 512MB storage, perfect for starting
4. **Add Error Tracking**: Consider Sentry or LogRocket
5. **Set up Backups**: MongoDB Atlas includes automatic backups
6. **Update Admin Credentials**: Change default admin password immediately

---

## Quick Deployment Summary

| Component | Platform | URL Pattern | Time |
|-----------|----------|-------------|------|
| Database | MongoDB Atlas | `mongodb+srv://...` | ~5 min |
| Backend | Render.com | `https://service.onrender.com` | ~10 min |
| Frontend | Vercel.com | `https://project.vercel.app` | ~5 min |

**Total Setup Time**: ~20-30 minutes

---

## Next Steps

1. Choose your hosting providers (recommendations above)
2. Update `.env` files with production values
3. Push code to GitHub
4. Deploy backend first, get URL
5. Deploy frontend with backend URL
6. Test everything works
7. Update your admin password!
