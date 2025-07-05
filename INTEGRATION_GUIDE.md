# 🔗 Frontend-Backend Integration Guide

This guide shows how to connect your React frontend with the Node.js backend API.

## 🚀 Quick Setup

### 1. Start Both Servers

**Backend (Terminal 1):**

```bash
cd back-end
npm run dev
# Server runs on http://localhost:5000
```

**Frontend (Terminal 2):**

```bash
cd todo-app
npm start
# React app runs on http://localhost:3000
```

### 2. Update Frontend to Use API

Replace the localStorage logic in your React app with API calls:

#### Create API Service (`src/services/todoApi.js`)

```javascript
const API_BASE = 'http://localhost:5000';

export const todoApi = {
  // Get all todos
  async getTodos() {
    const response = await fetch(`${API_BASE}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return response.json();
  },

  // Create new todo
  async createTodo(text) {
    const response = await fetch(`${API_BASE}/todos`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return response.json();
  },

  // Toggle completion
  async toggleTodo(id) {
    const response = await fetch(`${API_BASE}/todos/${id}/complete`, {
      method: 'PUT',
    });
    if (!response.ok) throw new Error('Failed to toggle todo');
    return response.json();
  },

  // Delete todo
  async deleteTodo(id) {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return response.json();
  },

  // Update todo
  async updateTodo(id, updates) {
    const response = await fetch(`${API_BASE}/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    return response.json();
  },
};
```

#### Update App.tsx

```javascript
import React, { useState, useEffect } from 'react';
import { todoApi } from './services/todoApi';
// ... other imports

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from API
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const todosFromApi = await todoApi.getTodos();
      setTodos(todosFromApi);
      setError(null);
    } catch (err) {
      setError('Failed to load todos');
      console.error('Error loading todos:', err);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text: string) => {
    try {
      const newTodo = await todoApi.createTodo(text);
      setTodos(prev => [...prev, newTodo]);
    } catch (err) {
      setError('Failed to add todo');
      console.error('Error adding todo:', err);
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? updatedTodo : todo
        )
      );
    } catch (err) {
      setError('Failed to toggle todo');
      console.error('Error toggling todo:', err);
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      await todoApi.deleteTodo(id);
      setTodos(prev => prev.filter(todo => todo.id !== id));
    } catch (err) {
      setError('Failed to delete todo');
      console.error('Error deleting todo:', err);
    }
  };

  // Remove localStorage logic and JSON import
  // Use the new API-based functions above

  // ... rest of component
};
```

## 🔧 Configuration Changes

### Remove Local Storage Dependencies

1. **Remove localStorage logic** from `useEffect`
2. **Remove JSON import**: `import todosData from './data/todos.json';`
3. **Replace localStorage calls** with API calls
4. **Add error handling** for network requests
5. **Add loading states** for better UX

### Add Error Handling

```javascript
{
  error && (
    <div style={{ color: 'red', marginBottom: '1rem' }}>
      {error}
      <button onClick={() => setError(null)}>Dismiss</button>
    </div>
  );
}

{
  loading && <div>Loading todos...</div>;
}
```

## 🧪 Testing the Integration

### 1. Test API Endpoints

**Health Check:**

```bash
curl http://localhost:5000
```

**Get Todos:**

```bash
curl http://localhost:5000/todos
```

**Create Todo:**

```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Test from API"}'
```

### 2. Browser Network Tab

1. Open browser dev tools (F12)
2. Go to Network tab
3. Interact with your React app
4. Verify API calls are being made to `localhost:5000`

### 3. Check CORS

If you get CORS errors:

- Ensure backend CORS is configured for `http://localhost:3000`
- Check that both servers are running
- Verify the API base URL is correct

## 🎯 Benefits of API Integration

✅ **Real Persistence** - Todos saved to actual file, not just browser  
✅ **Multi-Device Access** - Share todos across different browsers/devices  
✅ **Better Architecture** - Separation of frontend and backend  
✅ **Scalability** - Easy to add features like user authentication  
✅ **Data Backup** - Todos stored in `todos.json` file

## 🔄 Development Workflow

1. **Make backend changes** → Server auto-restarts (nodemon)
2. **Make frontend changes** → React auto-reloads
3. **Test endpoints** → Use browser dev tools or Postman
4. **Check logs** → Backend terminal shows request logs
5. **Debug issues** → Check both frontend and backend consoles

## 🚨 Common Issues

**CORS Error:**

- Check backend CORS configuration
- Ensure frontend URL is allowed

**Connection Refused:**

- Verify backend server is running on port 5000
- Check firewall settings

**JSON Parse Error:**

- Verify request/response content-type headers
- Check API response format

**404 Not Found:**

- Verify API endpoint URLs
- Check route definitions in backend

---

🎉 **Your full-stack Todo application is now ready!** You have a React frontend communicating with a Node.js backend API, with real file-based persistence.
