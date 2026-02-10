# 🚀 Quick Deployment Checklist

Your Travel Bharat website is configured for production deployment. Follow these steps:

## Before Deploying

### 1. Update Environment Variables

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb+srv://your_username:your_password@cluster.mongodb.net/travelbharat
PORT=5000
JWT_SECRET=generate_a_random_secure_string_here
NODE_ENV=production
ADMIN_EMAIL=admin@travelBharat.com
ADMIN_PASSWORD=change_to_secure_password
FRONTEND_URL=https://your-website-domain.com
```

**Frontend** (`frontend/.env`):
```env
VITE_API_URL=https://tb-backend-93wu.onrender.com/api
```

### 2. Database (MongoDB Atlas)
- Create account at [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
- Create free cluster
- Create database user
- Copy connection string → Paste in `MONGODB_URI`

## Deployment Options (Easiest First)

### ✅ **Recommended: Separate Services**

**Backend** → Render.com
- Push code to GitHub
- Create Web Service on Render
- Set Root Directory: `backend`
- Add environment variables
- Gets URL: `https://tb-backend-93wu.onrender.com`

**Frontend** → Vercel.com
- Connect GitHub repo
- Root Directory: `frontend`
- Add `VITE_API_URL=https://tb-backend-93wu.onrender.com/api`
- Gets URL like: `https://mywebsite.vercel.app`

### Alternative Platforms
- **Frontend**: Netlify, GitHub Pages, Cloudflare Pages

## Configuration Explained

| File | What to Change | Why |
|------|---|---|
| `frontend/.env` | `VITE_API_URL` | Points frontend to your backend |
| `backend/.env` | `MONGODB_URI` | Connects backend to cloud database |
| `backend/.env` | `FRONTEND_URL` | CORS security - only allows your frontend |
| `backend/.env` | `JWT_SECRET` | Change to unique secure string |

## Zero-Config Deployment

Your code is already configured to work with environment variables:

- ✅ Frontend auto-reads `VITE_API_URL` 
- ✅ Backend auto-reads `MONGODB_URI`, `PORT`, `FRONTEND_URL`
- ✅ CORS properly configured for security
- ✅ No hardcoded localhost references

Just set the environment variables in your hosting service!

## Testing After Deployment

1. **Backend works**: `curl https://tb-backend-93wu.onrender.com/api/states`
2. **Frontend loads**: Visit `https://your-frontend.com`
3. **Network tab**: Verify API calls go to correct backend
4. **Admin login**: Test with admin credentials
5. **Images upload**: Upload and verify images work

## Security Reminders

- 🔒 **Change JWT_SECRET** to a random string
- 🔒 **Change ADMIN_PASSWORD** to a strong password
- 🔒 **Add FRONTEND_URL** for CORS security
- 🔒 **Never commit `.env`** to GitHub
- 🔒 **Use environment variables** on hosting platform

## Common Issues

| Problem | Solution |
|---------|----------|
| API calls fail | Check `VITE_API_URL` matches backend domain |
| CORS error | Set `FRONTEND_URL` in backend `.env` |
| Images don't show | Check MongoDB connection working |
| Login doesn't work | Verify `JWT_SECRET` is same on backend |

## Need Help?

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed step-by-step guide for each platform.

---

**All set! You're ready to deploy.** 🎉
