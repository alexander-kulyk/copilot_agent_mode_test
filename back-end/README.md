# 🛠️ Todo List Backend API

A RESTful API backend for the Todo List application built with Node.js and Express.js. This API manages todo items stored in a local JSON file and provides full CRUD operations.

## 📋 Table of Contents

- [🚀 Quick Start](#-quick-start)
- [📂 Project Structure](#-project-structure)
- [🔌 API Endpoints](#-api-endpoints)
- [💾 Data Storage](#-data-storage)
- [🧪 Testing the API](#-testing-the-api)
- [🔧 Configuration](#-configuration)

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Navigate to the backend directory:**

   ```bash
   cd back-end
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

   Or for production:

   ```bash
   npm start
   ```

4. **Server will be running at:**
   ```
   http://localhost:5000
   ```

## 📂 Project Structure

```
back-end/
├── controllers/
│   └── todosController.js    # Business logic for todo operations
├── routes/
│   └── todosRoutes.js       # API route definitions
├── middleware/
│   └── logger.js            # Request logging middleware
├── todos.json               # Data storage file
├── server.js                # Main server file
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔌 API Endpoints

Base URL: `http://localhost:5000`

### Health Check

- **GET** `/`
  - Returns API status and available endpoints
  - **Response:** `200 OK`

### Todo Operations

#### Get All Todos

- **GET** `/todos`
  - Retrieves all todo items
  - **Response:** `200 OK`
  ```json
  [
    {
      "id": "1",
      "text": "Buy groceries",
      "completed": false
    },
    {
      "id": "2",
      "text": "Read a book",
      "completed": true
    }
  ]
  ```

#### Create New Todo

- **POST** `/todos`
  - Creates a new todo item
  - **Request Body:**
  ```json
  {
    "text": "New task description"
  }
  ```
  - **Response:** `201 Created`
  ```json
  {
    "id": "generated-uuid",
    "text": "New task description",
    "completed": false
  }
  ```

#### Toggle Todo Completion

- **PUT** `/todos/:id/complete`
  - Toggles the completion status of a todo
  - **Response:** `200 OK`
  ```json
  {
    "id": "1",
    "text": "Buy groceries",
    "completed": true
  }
  ```

#### Delete Todo

- **DELETE** `/todos/:id`
  - Deletes a todo item by ID
  - **Response:** `200 OK`
  ```json
  {
    "message": "Todo deleted successfully",
    "deletedTodo": {
      "id": "1",
      "text": "Buy groceries",
      "completed": false
    }
  }
  ```

#### Update Todo (Bonus)

- **PUT** `/todos/:id`
  - Updates todo text and/or completion status
  - **Request Body:**
  ```json
  {
    "text": "Updated task description",
    "completed": true
  }
  ```
  - **Response:** `200 OK`

### Error Responses

All endpoints return consistent error responses:

```json
{
  "error": "Error type",
  "message": "Detailed error message"
}
```

Common status codes:

- `400` - Bad Request (invalid input)
- `404` - Not Found (todo not found)
- `500` - Internal Server Error

## 💾 Data Storage

The API uses a simple JSON file (`todos.json`) for data persistence:

```json
[
  {
    "id": "unique-uuid",
    "text": "Task description",
    "completed": false
  }
]
```

### Data Properties

- **id**: Unique identifier (UUID v4)
- **text**: Task description (string, required)
- **completed**: Completion status (boolean, default: false)

## 🧪 Testing the API

### Using curl

**Get all todos:**

```bash
curl http://localhost:5000/todos
```

**Create a new todo:**

```bash
curl -X POST http://localhost:5000/todos \
  -H "Content-Type: application/json" \
  -d '{"text": "Learn Node.js"}'
```

**Toggle completion:**

```bash
curl -X PUT http://localhost:5000/todos/your-todo-id/complete
```

**Delete a todo:**

```bash
curl -X DELETE http://localhost:5000/todos/your-todo-id
```

### Using Postman

1. Import the endpoints into Postman
2. Set base URL to `http://localhost:5000`
3. Test each endpoint with appropriate request bodies

### Browser Testing

Visit `http://localhost:5000` for the API health check and endpoint documentation.

## 🔧 Configuration

### Environment Variables

Create a `.env` file (optional):

```env
PORT=5000
NODE_ENV=development
```

### Available Scripts

```bash
npm start        # Start production server
npm run dev      # Start development server with nodemon
```

### CORS Configuration

The API is configured to accept requests from:

- `http://localhost:3000` (React development server)
- `http://127.0.0.1:3000`

To modify CORS settings, edit the `cors` configuration in `server.js`.

## 🚀 Integration with Frontend

To connect your React frontend:

1. **Update API base URL** in your React app to `http://localhost:5000`
2. **Replace localStorage calls** with API calls:

   - `GET /todos` instead of reading from localStorage
   - `POST /todos` instead of adding to localStorage
   - `PUT /todos/:id/complete` for toggling completion
   - `DELETE /todos/:id` for deletion

3. **Example React integration:**

```javascript
const API_BASE = 'http://localhost:5000';

// Get all todos
const fetchTodos = async () => {
  const response = await fetch(`${API_BASE}/todos`);
  return response.json();
};

// Create new todo
const createTodo = async (text) => {
  const response = await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });
  return response.json();
};
```

## 🎯 Features

✅ **RESTful API Design** - Standard HTTP methods and status codes  
✅ **File-based Storage** - Simple JSON file persistence  
✅ **Input Validation** - Request body validation and error handling  
✅ **CORS Support** - Ready for frontend integration  
✅ **Request Logging** - Built-in request logging middleware  
✅ **Error Handling** - Comprehensive error responses  
✅ **UUID Generation** - Unique IDs for all todos  
✅ **Graceful Shutdown** - Proper server shutdown handling

## 🔄 Development Workflow

1. **Start the backend server**: `npm run dev`
2. **Make changes** to controllers, routes, or middleware
3. **Server automatically restarts** (thanks to nodemon)
4. **Test endpoints** using curl, Postman, or browser
5. **Check logs** in the terminal for debugging

---

🎉 **Your Todo List Backend API is ready to use!** Start the server and begin building your frontend integration.
