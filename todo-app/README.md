# 📝 To-Do List Application

A modern, interactive To-Do List application built with React 19, featuring drag-and-drop functionality, beautiful styling, and local data persistence.

## ✨ Features

- ✅ **Add Tasks**: Create new tasks with a clean input interface
- ✅ **Mark Complete**: Check/uncheck tasks as completed with visual feedback
- ✅ **Delete Tasks**: Remove tasks with a single click
- ✅ **Drag & Drop**: Reorder tasks by dragging them around
- ✅ **Local Storage**: Tasks persist across browser sessions
- ✅ **Modern UI**: Beautiful, responsive design with styled-components
- ✅ **Task Statistics**: See completion progress and remaining tasks

## 🛠️ Tech Stack

- **React 19** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Styled-Components** - CSS-in-JS styling solution
- **@atlaskit/pragmatic-drag-and-drop** - Modern drag and drop
- **UUID** - Unique ID generation for tasks

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. Navigate to the project directory:

   ```bash
   cd todo-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📁 Project Structure

```
todo-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AddTodo.tsx      # Add new task component
│   │   └── TodoItem.tsx     # Individual task item
│   ├── styles/
│   │   ├── StyledComponents.ts  # All styled components
│   │   └── GlobalStyle.ts       # Global CSS styles
│   ├── data/
│   │   └── todos.json       # Initial task data
│   ├── types.ts             # TypeScript interfaces
│   ├── App.tsx             # Main application component
│   └── index.tsx           # Application entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🎯 Usage

1. **Adding Tasks**: Type in the input field and click "Add Task" or press Enter
2. **Completing Tasks**: Click the checkbox next to any task to mark it complete
3. **Deleting Tasks**: Click the trash icon (🗑️) to remove a task
4. **Reordering Tasks**: Drag tasks by the handle (⋮⋮) to reorder them
5. **View Progress**: Check the stats at the bottom to see your progress

## 🔧 Available Scripts

- `npm start` - Runs the app in development mode
- `npm test` - Launches the test runner
- `npm run build` - Builds the app for production
- `npm run eject` - Ejects from Create React App (one-way operation)

## 🎨 Design Highlights

- **Clean Interface**: Minimalist design focused on usability
- **Visual Feedback**: Smooth transitions and hover effects
- **Responsive**: Works great on desktop and mobile devices
- **Accessibility**: Keyboard navigation and screen reader friendly
- **Modern Gradient**: Beautiful background with card-based layout

## 📊 Data Persistence

Tasks are stored in:

1. **Initial Data**: `src/data/todos.json` (provides starting tasks)
2. **Runtime Storage**: Browser's `localStorage` (persists changes)

> **Note**: In a production environment, you would connect this to a backend API for true persistence across devices.

## 🚀 Future Enhancements

- [ ] Task categories/tags
- [ ] Due dates and reminders
- [ ] Task search and filtering
- [ ] Dark mode theme
- [ ] Backend API integration
- [ ] User authentication
- [ ] Task sharing and collaboration

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

Built with ❤️ using React 19 and modern web technologies.
