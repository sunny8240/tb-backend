# Deploy Travel Bharat to Vercel

This guide will help you deploy the Travel Bharat application to Vercel.

## Prerequisites

1. **GitHub Repository** - Push your code to GitHub
2. **MongoDB Atlas** - Database connection (already configured)
3. **Backend Deployed** - Deploy backend to Render.com or another platform first
4. **Vercel Account** - Create free account at [vercel.com](https://vercel.com)

---

## Step 1: Deploy Backend to Render.com (Required First)

### Why Render First?
Vercel is primarily for static sites and serverless functions. Your Express backend is better suited for Render.

### Steps:

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select your repository

3. **Configure Service**
   - **Name**: `travelbharat-api`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`

4. **Add Environment Variables**
   Click "Environment" and add:
   ```env
   MONGODB_URI=mongodb+srv://sunny8767:Sunny6767@travelbharatdb.sjglojr.mongodb.net/?retryWrites=true&w=majority
   PORT=5000
   JWT_SECRET=6d7ba953c2381c13ec47ec9853f73a0f
   NODE_ENV=production
   ADMIN_EMAIL=admin@travelBharat.com
   ADMIN_PASSWORD=SunnySharma67@67
   FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait for deployment (2-5 minutes)
   - Copy your backend URL (looks like: `https://travelbharat-api.onrender.com`)
   - **Save this URL** - you'll need it for frontend deployment

---

## Step 2: Deploy Frontend to Vercel

### Steps:

1. **Go to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - **Project Name**: `travelbharat` or similar
   - **Framework Preset**: Select "Vite" or "Other"
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: Keep default: `npm install`

4. **Environment Variables**
   - Click "Environment Variables"
   - Add:
   ```env
   VITE_API_URL=https://travelbharat-api.onrender.com/api
   ```
   (Replace with your actual backend URL from Step 1)

5. **Deploy**
   - Click "Deploy"
   - Wait for deployment (2-5 minutes)
   - You'll get a URL like: `https://travelbharat.vercel.app`

---

## Step 3: Update Environment Variables

After getting your URLs:

### Backend (.env on Render)
```env
FRONTEND_URL=https://travelbharat.vercel.app
```

### Frontend (.env.local on Vercel)
```env
VITE_API_URL=https://travelbharat-api.onrender.com/api
```

---

## Step 4: Verify Deployment

### Test Backend API
```bash
curl https://travelbharat-api.onrender.com/api/states
```
Should return JSON list of states.

### Test Frontend
1. Open `https://travelbharat.vercel.app` in browser
2. Check DevTools Network tab → Verify API calls go to your backend
3. Try admin login
4. Test image uploads

---

## Step 5: Custom Domain (Optional)

### To use custom domain like `yourdomain.com`:

1. **Buy Domain**
   - Register at GoDaddy, Namecheap, Google Domains, etc.

2. **Add to Vercel**
   - Go to Vercel project settings
   - Click "Domains"
   - Add your domain
   - Update DNS records as shown (usually A records or CNAME)

3. **Update Backend CORS**
   - Update `FRONTEND_URL` on Render to use custom domain

---

## Troubleshooting

### Issue: "Cannot GET /"
- **Solution**: Ensure Root Directory is set to `frontend` in Vercel

### Issue: API calls returning 404
- **Solution**: Check `VITE_API_URL` environment variable matches backend URL

### Issue: CORS error in console
- **Solution**: Backend might not have CORS enabled for your Vercel domain
- Check `backend/server.js` CORS configuration

### Issue: Images not loading
- **Solution**: Verify upload directory permissions on backend
- Check image URLs in API response

### Issue: Slow first load
- **Solution**: Render free tier has cold starts (5-15 seconds)
- Upgrade to paid plan for better performance

---

## Important Security Notes ⚠️

⚠️ **SECURITY WARNING**: You have exposed credentials in this guide!

**Immediately do:**

1. **Change MongoDB Password**
   - Go to MongoDB Atlas
   - Update password
   - Update all `.env` files

2. **Regenerate JWT Secret**
   ```bash
   # Generate strong JWT Secret
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
   - Update on Render environment variables

3. **Change Admin Password**
   - Use a strong, unique password in Render environment variables

4. **Never commit `.env` files**
   - They should be in `.gitignore` (if not already)

---

## Quick Reference

| What | Where | URL |
|------|-------|-----|
| Frontend | Vercel | https://travelbharat.vercel.app |
| Backend API | Render | https://travelbharat-api.onrender.com/api |
| Database | MongoDB Atlas | mongodb+srv://... |

---

## Next Steps After Deployment

1. ✅ Test all features on live site
2. ✅ Monitor logs on Vercel and Render dashboards
3. ✅ Set up GitHub integration for auto-deploy on push
4. ✅ Create CI/CD pipeline if needed
5. ✅ Monitor performance and errors

---

**Questions?** Check Vercel docs at [vercel.com/docs](https://vercel.com/docs) or Render docs at [render.com/docs](https://render.com/docs)
