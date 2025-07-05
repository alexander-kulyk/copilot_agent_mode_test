# Full-Stack Todo Application 📝

A modern, full-stack todo application built with React (TypeScript) frontend and Node.js/Express backend.

## 🚀 Live Demo

**GitHub Pages Demo**: [https://alexander-kulyk.github.io/copilot_agent_mode_test](https://alexander-kulyk.github.io/copilot_agent_mode_test)

_Note: The demo version uses localStorage for persistence since GitHub Pages can't host the backend._

## ✨ Features

- ✅ **Full CRUD Operations** - Create, read, update, delete todos
- ✅ **Real-time Updates** - Changes reflected immediately
- ✅ **Drag & Drop** - Reorder todos by dragging
- ✅ **Completion Tracking** - Mark todos as complete/incomplete
- ✅ **Data Export** - Download todos as JSON
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Loading States** - Smooth user experience
- ✅ **Responsive Design** - Works on desktop and mobile
- ✅ **TypeScript** - Full type safety
- ✅ **Styled Components** - Modern CSS-in-JS styling

## 🏗️ Architecture

### Frontend (React + TypeScript)

- **React 18** with functional components and hooks
- **TypeScript** for type safety
- **Styled Components** for styling
- **Custom API service** for backend communication

### Backend (Node.js + Express)

- **Express.js** RESTful API
- **JSON file storage** for persistence
- **CORS enabled** for cross-origin requests
- **Logging middleware** for request/response tracking
- **Error handling** with proper HTTP status codes

## 📁 Project Structure

```
copilot_agent_mode_test/
├── todo-app/                 # React Frontend
│   ├── src/
│   │   ├── components/       # React components
│   │   ├── services/         # API service layer
│   │   ├── styles/           # Styled components
│   │   └── types.ts          # TypeScript types
│   └── package.json
├── back-end/                 # Node.js Backend
│   ├── controllers/          # Business logic
│   ├── routes/              # API routes
│   ├── middleware/          # Custom middleware
│   ├── todos.json           # Data storage
│   └── server.js            # Express server
└── README.md
```

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Git

### Local Development

1. **Clone the repository**

   ```bash
   git clone https://github.com/alexander-kulyk/copilot_agent_mode_test.git
   cd copilot_agent_mode_test
   ```

2. **Install Backend Dependencies**

   ```bash
   cd back-end
   npm install
   ```

3. **Install Frontend Dependencies**

   ```bash
   cd ../todo-app
   npm install
   ```

4. **Start the Backend Server**

   ```bash
   cd ../back-end
   npm start
   ```

   Backend will run on http://localhost:5000

5. **Start the Frontend Development Server**
   ```bash
   cd ../todo-app
   npm start
   ```
   Frontend will run on http://localhost:3000

## 🌐 API Endpoints

| Method | Endpoint              | Description              |
| ------ | --------------------- | ------------------------ |
| GET    | `/todos`              | Get all todos            |
| POST   | `/todos`              | Create a new todo        |
| PUT    | `/todos/:id/complete` | Toggle todo completion   |
| DELETE | `/todos/:id`          | Delete a todo            |
| PUT    | `/todos/:id`          | Update todo text (bonus) |

### Example API Usage

```javascript
// Get all todos
const response = await fetch('http://localhost:5000/todos');
const todos = await response.json();

// Create a new todo
const response = await fetch('http://localhost:5000/todos', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ text: 'New todo item' }),
});
```

## 🚀 Deployment

### Frontend (GitHub Pages)

The frontend is automatically deployed to GitHub Pages:

```bash
cd todo-app
npm run deploy
```

### Backend Deployment Options

- **Heroku**: For easy Node.js hosting
- **Railway**: Modern deployment platform
- **Vercel**: Serverless functions
- **DigitalOcean**: VPS hosting

## 🧪 Testing

### Backend Testing

```bash
cd back-end
npm test  # Run test suite
node test-setup.js  # Verify setup
```

### API Testing

Use the included `api-test.js` for manual API testing:

```bash
node api-test.js
```

## 📋 Available Scripts

### Frontend (`todo-app`)

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run tests
- `npm run deploy` - Deploy to GitHub Pages

### Backend (`back-end`)

- `npm start` - Start server
- `npm run dev` - Start with nodemon (development)
- `npm test` - Run tests

## 🔧 Configuration

### Environment Variables

Create `.env` files for configuration:

**Backend** (optional):

```
PORT=5000
NODE_ENV=development
```

**Frontend** (for production backend):

```
REACT_APP_API_BASE=https://your-backend-url.com
```

## 📝 Documentation

- [`INTEGRATION_GUIDE.md`](./INTEGRATION_GUIDE.md) - How frontend and backend work together
- [`INTEGRATION_COMPLETE.md`](./INTEGRATION_COMPLETE.md) - Complete integration overview
- [`GITHUB_PAGES_DEPLOYMENT.md`](./GITHUB_PAGES_DEPLOYMENT.md) - Deployment guide
- [`back-end/README.md`](./back-end/README.md) - Backend-specific documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with React and Node.js
- Styled with styled-components
- Deployed on GitHub Pages
- Created as a learning project for full-stack development

## 📱 Demo Features

The live demo includes:

- ✅ All CRUD operations working
- ✅ Drag and drop functionality
- ✅ Data persistence via localStorage
- ✅ Responsive design
- ✅ Error handling
- ✅ Loading states

Try it out: [https://alexander-kulyk.github.io/copilot_agent_mode_test](https://alexander-kulyk.github.io/copilot_agent_mode_test)

---

**Made with ❤️ using React, Node.js, and GitHub Copilot Agent Mode**
