# TravelBharat — Backend

This folder contains the Express backend API for TravelBharat. This README explains how to run locally and prepare the repository for deployment (Railway).

## Quick: Run locally

1. Copy `backend/.env.example` -> `backend/.env` and fill values.

2. Install dependencies and start in dev:

```bash
cd backend
npm install
npm run dev    # uses nodemon
```

3. Or start in production-like mode:

```bash
npm start      # runs `node server.js`
```

## Environment variables
Populate these in `backend/.env` or in your host's environment settings:

- `MONGODB_URI` — MongoDB Atlas connection string
- `PORT` — port (5000 recommended)
- `JWT_SECRET` — strong random string for JWT
- `NODE_ENV` — `production` or `development`
- `ADMIN_EMAIL` and `ADMIN_PASSWORD` — initial admin credentials
- `FRONTEND_URL` — URL of frontend for CORS

Keep `.env` out of source control. Use Railway / Render environment settings instead.

## Seed data
Run seeded sample data (optional):

```bash
npm run seed
```

## Prepare this folder as a standalone repo (recommended workflow)

1. From repository root create a new GitHub repo for the backend only, or use the `backend` folder as the repo root when creating a Git repository.

2. Initialize and push:

```bash
# from inside the backend folder
git init
git add .
git commit -m "Initial backend commit"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-backend-repo>.git
git push -u origin main
```

3. In GitHub, enable branch protection or CI as needed.

## Deploy to Railway (example)

1. Create a Railway project, choose "Deploy from GitHub" and connect your backend repo.
2. Set the root directory to `/` (the repo root is the backend code).
3. Set the start command to `npm start` and let Railway install dependencies.
4. Add environment variables in Railway (see "Environment variables" above).
5. Deploy and copy your service URL. Test endpoints like `/api/states`.

## Notes
- Uploaded files saved in `uploads/` are ephemeral on many hosts — use a cloud storage (Cloudinary/S3) for persistent images.
- Rotate secrets if they were previously committed.
# TravelBharat Backend API

Backend API for the TravelBharat tourism information platform.

## Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file** (copy from `.env.example`):
```bash
MONGODB_URI=mongodb://localhost:27017/travelbharat
PORT=5000
JWT_SECRET=your_secret_key_here
NODE_ENV=development
```

3. **Start MongoDB** (if using local MongoDB):
```bash
# On Windows
mongod

# On macOS
brew services start mongodb-community

# On Linux
sudo systemctl start mongod
```

4. **Seed initial data:**
```bash
npm run seed
```

5. **Start development server:**
```bash
npm run dev
```

## API Endpoints

### Public Endpoints

#### States
- `GET /api/states` - Get all states/UTs
- `GET /api/states/:slug` - Get single state by slug

#### Destinations
- `GET /api/destinations` - Get all destinations (with filters)
- `GET /api/destinations/slug/:slug` - Get single destination
- `GET /api/destinations/state/:stateId` - Get destinations by state

**Query Parameters for Destinations:**
- `state` - Filter by state ID
- `category` - Filter by category (Heritage, Nature, Religious, Adventure)
- `search` - Search by name or description
- `page` - Pagination (default: 1)
- `limit` - Items per page (default: 12)

### Authentication
- `POST /api/auth/admin-login` - Admin login
  ```json
  {
    "email": "admin@example.com",
    "password": "password123"
  }
  ```
- `POST /api/auth/create-admin` - Create admin user (first time setup)
- `GET /api/auth/me` - Get current user (protected)

### Admin Endpoints (Protected - requires JWT token)

#### States Management
- `POST /api/states` - Create state
- `PUT /api/states/:id` - Update state
- `DELETE /api/states/:id` - Delete state

#### Destinations Management
- `POST /api/destinations` - Create destination
- `PUT /api/destinations/:id` - Update destination
- `PATCH /api/destinations/:id/approve` - Approve destination
- `DELETE /api/destinations/:id` - Delete destination

## Authentication

Admin endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <token>
```

## Database Schemas

### State Schema
```javascript
{
  name: String (unique),
  type: String (State|UT),
  capital: String,
  population: String,
  area_km2: Number,
  bestTimeToVisit: String,
  description: String,
  attractions: [String],
  images: [String],
  slug: String (auto-generated, unique),
  createdAt: Date,
  updatedAt: Date
}
```

### Destination Schema
```javascript
{
  name: String,
  state: ObjectId (ref: State),
  city: String,
  category: String (Heritage|Nature|Religious|Adventure|Beach|HillStation),
  description: String,
  historicalSignificance: String,
  bestTimeToVisit: String,
  entryFee: String,
  timings: String,
  images: [String],
  nearbyAttractions: [String],
  mapLink: String,
  slug: String (unique),
  isApproved: Boolean (default: false),
  createdBy: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
```

### User Schema
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (admin|moderator|user),
  isActive: Boolean,
  createdAt: Date
}
```

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Future Enhancements

- [ ] Image upload API with cloud storage
- [ ] Advanced filtering and search
- [ ] Analytics dashboard
- [ ] Export functionality (CSV, PDF)
- [ ] Multi-language support
- [ ] Rate limiting and caching
- [ ] API documentation (Swagger/OpenAPI)
