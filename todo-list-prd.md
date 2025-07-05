
# 📝 Product Requirements Document (PRD)

## 📌 Project Name  
**To-Do List Application**

---

## 📄 Overview

The To-Do List Application allows users to manage daily tasks through a clean, interactive UI. Users can add tasks, mark them as complete, delete them, and rearrange their priority using drag-and-drop.

This is a **single-page application** built using **React 19**, styled with **styled-components**, and with drag-and-drop handled via `@atlaskit/pragmatic-drag-and-drop`. Task data is stored in a local **JSON file** to simulate persistence.

---

## 🎯 Goals

- ✅ Let users add tasks to a list.
- ✅ Let users delete tasks.
- ✅ Let users check/uncheck tasks as completed.
- ✅ Let users reorder tasks using drag and drop.
- ✅ Store all task data locally in a JSON file within the project.
- ✅ Ensure visual clarity and UX with styled-components.

---

## 👤 Target Audience

- Anyone needing a lightweight and responsive task manager.
- Developers interested in a modern React-based to-do app architecture.

---

## ⚙️ Features & Functionality

### 1. 🆕 Add Task
- User types a task into an input field and clicks “Add” or presses Enter.
- A new task appears at the end of the list.
- Tasks cannot be empty strings.

### 2. ✅ Mark Task as Complete
- Each task item includes a checkbox.
- When checked, the item is visually marked (e.g., line-through or faded).
- This state is saved in the JSON file.

### 3. 🗑️ Delete Task
- Each task has a delete (🗑️) button/icon.
- Clicking removes the task from the list and updates the data.

### 4. 🔃 Drag-and-Drop Reordering
- Tasks can be dragged to change order.
- Implemented using `@atlaskit/pragmatic-drag-and-drop`.
- The new order is persisted in the JSON file.

---

## 🧩 Tech Stack

| Area               | Technology                                 |
|--------------------|--------------------------------------------|
| Framework          | React 19                                   |
| Styling            | styled-components                          |
| Drag & Drop        | @atlaskit/pragmatic-drag-and-drop          |
| Data Storage       | Local JSON file within the project         |
| Package Manager    | npm                                         |

---

## 🗂️ Data Structure

Example `todos.json`:

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

## 🎨 UI Design Requirements

- Clean and minimal interface.
- Input field at the top with “Add” button.
- List of tasks displayed vertically.
- Each item includes:
  - Checkbox
  - Task text
  - Delete button
  - Drag handle (if visually implemented)

---

## 🧪 Non-Functional Requirements

- ⚡ Fast performance, responsive updates.
- 🧱 Reusable components.
- ✨ Smooth drag-and-drop experience.
- 📦 All dependencies and scripts must work with local React 19 setup.
- 🔄 JSON updates must happen in-place in the file (during development mode).

---

## 🚧 Implementation Notes

- Since direct editing of a JSON file from the frontend is not possible without a backend, simulate persistence:
  - Load from JSON at startup.
  - Save changes to memory (or to JSON file manually during development).
  - Optionally: Add backend/API later if needed.

---

## 📌 Milestones

| Milestone                    | Estimated Time |
|-----------------------------|----------------|
| Project setup & UI scaffold | 0.5 day        |
| Add/delete/complete logic   | 1 day          |
| Drag & drop integration     | 1 day          |
| Styling with styled-components | 0.5 day     |
| JSON data integration (simulated) | 0.5 day  |
| Final testing + cleanup     | 0.5 day        |

---

## ❓Open Questions

1. Should completed tasks be visually separated from active ones?
2. Should tasks persist across reloads via `localStorage` as a backup for the JSON file?
3. Should drag-and-drop have animations?
4. Should there be task editing in the future?
