# GitHub Pages Deployment Guide

## Prerequisites

✅ **gh-pages package installed** - Already installed as dev dependency
✅ **Deployment scripts added** - `predeploy` and `deploy` scripts configured

## Setup Steps

### 1. Update Homepage URL

In `todo-app/package.json`, update the homepage field with your actual GitHub details:

```json
"homepage": "https://your-username.github.io/your-repo-name"
```

Replace:

- `your-username` with your GitHub username
- `your-repo-name` with your repository name

### 2. Important: Update API Base URL

**⚠️ CRITICAL:** Before deploying, you need to update the API base URL in the frontend since GitHub Pages is a static hosting service and cannot run the Node.js backend.

You have two options:

#### Option A: Deploy Backend Separately

Deploy your backend to a service like:

- Heroku
- Vercel
- Railway
- Render

Then update `todo-app/src/services/todoApi.ts`:

```typescript
const API_BASE = 'https://your-backend-url.herokuapp.com'; // Replace with your backend URL
```

#### Option B: Use Mock Data for Demo

For a demo-only version, you can modify the app to use mock data:

1. Create `todo-app/src/data/mockTodos.ts`:

```typescript
export const mockTodos = [
  { id: '1', text: 'Buy groceries', completed: false },
  { id: '2', text: 'Read a book', completed: true },
  { id: '3', text: 'Learn React', completed: false },
];
```

2. Update `App.tsx` to use mock data instead of API calls.

### 3. Deploy to GitHub Pages

Once you've updated the API configuration:

```bash
cd todo-app
npm run deploy
```

This will:

1. Build the production version (`npm run build`)
2. Deploy to GitHub Pages (`gh-pages -d build`)

### 4. Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** tab
3. Scroll to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Select **gh-pages** branch
6. Click **Save**

Your app will be available at: `https://your-username.github.io/your-repo-name`

## Important Notes

### Backend Limitation

- GitHub Pages only hosts static files (HTML, CSS, JS)
- It **cannot run Node.js servers**
- Your Express backend needs to be deployed separately

### CORS Configuration

If you deploy the backend elsewhere, make sure to update the CORS configuration in `back-end/server.js` to include your GitHub Pages URL:

```javascript
app.use(
  cors({
    origin: [
      'http://localhost:3000',
      'http://127.0.0.1:3000',
      'https://your-username.github.io', // Add your GitHub Pages URL
    ],
    credentials: true,
  })
);
```

## Quick Deploy Checklist

- [ ] Update homepage URL in package.json
- [ ] Deploy backend to cloud service OR switch to mock data
- [ ] Update API_BASE URL in todoApi.ts
- [ ] Run `npm run deploy`
- [ ] Enable GitHub Pages in repository settings
- [ ] Update backend CORS if using separate backend

## Example Full-Stack Deployment

For a complete full-stack deployment:

1. **Backend**: Deploy to Heroku/Railway
2. **Frontend**: Deploy to GitHub Pages
3. **Database**: Use cloud storage or keep JSON file on backend server

This gives you a fully functional todo app accessible from anywhere!
