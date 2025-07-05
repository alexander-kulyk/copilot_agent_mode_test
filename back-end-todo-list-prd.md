
# 🛠️ Backend PRD – To-Do List API

## 📌 Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Storage**: Local file – `todos.json`
- **Middlewares**: JSON parsing, logging, validation (optional)

---

## 📄 Overview

The backend is responsible for managing the to-do items stored in a local file (`todos.json`). It will expose RESTful API endpoints to create, read, update, and delete items. The application is organized with proper separation of concerns using routes, controllers, and middlewares.

---

## 📂 API Endpoints

All endpoints operate on the local `todos.json` file.

### GET `/todos`
- 🔹 Description: Retrieve all to-do items
- 📄 Output: JSON array of task objects

### POST `/todos`
- 🔹 Description: Add a new to-do item
- 📝 Request Body:
```json
{
  "text": "Buy milk"
}
```
- 🧠 Notes: `id` and `completed` status will be handled automatically.

### DELETE `/todos/:id`
- 🔹 Description: Delete a task by its `id`
- 🧠 Notes: Task must be removed from the `todos.json` file

### PUT `/todos/:id/complete`
- 🔹 Description: Toggle the `completed` status of a task
- 🧠 Notes: This endpoint will flip the `completed` boolean

---

## 🗂️ Folder Structure

```
back-end/
├── controllers/
│   └── todosController.js
├── routes/
│   └── todosRoutes.js
├── middleware/
│   └── logger.js (optional)
├── todos.json
├── server.js
```

---

## 🧩 Middlewares

- `express.json()` – Parse JSON request bodies
- Custom middleware (optional):
  - Logger middleware for requests
  - Input validation middleware

---

## ✅ File Format – `todos.json`

Example structure:

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

---

## 🚀 Example Workflow

1. `POST /todos` ➝ Adds a new task
2. `GET /todos` ➝ Shows the full list
3. `PUT /todos/:id/complete` ➝ Toggles completion status
4. `DELETE /todos/:id` ➝ Removes the task

---

## ❓Future Enhancements

- Task editing (`PUT /todos/:id`)
- Prioritization or due dates
- Moving storage to a database (e.g. SQLite, MongoDB)

