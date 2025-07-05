// Demo/Production API service for Todo App
// Automatically detects environment and uses appropriate data source

// Check if running on GitHub Pages or production build
const isGitHubPages = window.location.hostname.includes('github.io');
const isProductionBuild = process.env.NODE_ENV === 'production';
const DEMO_MODE = isGitHubPages || isProductionBuild;

export interface ApiTodo {
  id: string;
  text: string;
  completed: boolean;
}

export class TodoApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'TodoApiError';
  }
}

// Helper function to generate UUID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Demo data for initial load
const DEMO_TODOS: ApiTodo[] = [
  { id: '1', text: 'Welcome to the Todo App Demo! 🎉', completed: false },
  { id: '2', text: 'This demo runs on GitHub Pages', completed: false },
  { id: '3', text: 'Data is stored in browser localStorage', completed: true },
  {
    id: '4',
    text: 'Try adding, editing, and deleting todos',
    completed: false,
  },
  { id: '5', text: 'Drag and drop to reorder items', completed: false },
];

// localStorage helper functions
const loadFromStorage = (): ApiTodo[] => {
  try {
    const stored = localStorage.getItem('demo-todos');
    if (stored) {
      return JSON.parse(stored);
    }
    // First time - save demo data
    saveToStorage(DEMO_TODOS);
    return DEMO_TODOS;
  } catch {
    return DEMO_TODOS;
  }
};

const saveToStorage = (todos: ApiTodo[]): void => {
  try {
    localStorage.setItem('demo-todos', JSON.stringify(todos));
  } catch (error) {
    console.warn('Failed to save to localStorage:', error);
  }
};

// Simulate network delay for realistic feel
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const todoApi = {
  // Get all todos
  async getTodos(): Promise<ApiTodo[]> {
    if (DEMO_MODE) {
      await sleep(300); // Simulate network delay
      return loadFromStorage();
    }

    // Development API call (when backend is available)
    const API_BASE = 'http://localhost:5000';
    try {
      const response = await fetch(`${API_BASE}/todos`);
      if (!response.ok) {
        throw new TodoApiError(
          `Failed to fetch todos: ${response.statusText}`,
          response.status
        );
      }
      return await response.json();
    } catch (error) {
      if (error instanceof TodoApiError) throw error;
      throw new TodoApiError('Network error: Unable to connect to server');
    }
  },

  // Create new todo
  async createTodo(text: string): Promise<ApiTodo> {
    if (DEMO_MODE) {
      await sleep(200);
      const todos = loadFromStorage();
      const newTodo: ApiTodo = {
        id: generateId(),
        text,
        completed: false,
      };
      const updatedTodos = [...todos, newTodo];
      saveToStorage(updatedTodos);
      return newTodo;
    }

    // Development API call
    const API_BASE = 'http://localhost:5000';
    try {
      const response = await fetch(`${API_BASE}/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new TodoApiError(
          errorData.message || `Failed to create todo: ${response.statusText}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TodoApiError) throw error;
      throw new TodoApiError('Network error: Unable to create todo');
    }
  },

  // Toggle completion status
  async toggleTodo(id: string): Promise<ApiTodo> {
    if (DEMO_MODE) {
      await sleep(200);
      const todos = loadFromStorage();
      const todoIndex = todos.findIndex((t) => t.id === id);
      if (todoIndex === -1) {
        throw new TodoApiError('Todo not found', 404);
      }

      const updatedTodo = {
        ...todos[todoIndex],
        completed: !todos[todoIndex].completed,
      };
      todos[todoIndex] = updatedTodo;
      saveToStorage(todos);
      return updatedTodo;
    }

    // Development API call
    const API_BASE = 'http://localhost:5000';
    try {
      const response = await fetch(`${API_BASE}/todos/${id}/complete`, {
        method: 'PUT',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new TodoApiError(
          errorData.message || `Failed to toggle todo: ${response.statusText}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TodoApiError) throw error;
      throw new TodoApiError('Network error: Unable to toggle todo');
    }
  },

  // Delete todo
  async deleteTodo(id: string): Promise<void> {
    if (DEMO_MODE) {
      await sleep(200);
      const todos = loadFromStorage();
      const filteredTodos = todos.filter((t) => t.id !== id);
      saveToStorage(filteredTodos);
      return;
    }

    // Development API call
    const API_BASE = 'http://localhost:5000';
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new TodoApiError(
          errorData.message || `Failed to delete todo: ${response.statusText}`,
          response.status
        );
      }
    } catch (error) {
      if (error instanceof TodoApiError) throw error;
      throw new TodoApiError('Network error: Unable to delete todo');
    }
  },

  // Update todo (bonus endpoint)
  async updateTodo(
    id: string,
    updates: { text?: string; completed?: boolean }
  ): Promise<ApiTodo> {
    if (DEMO_MODE) {
      await sleep(200);
      const todos = loadFromStorage();
      const todoIndex = todos.findIndex((t) => t.id === id);
      if (todoIndex === -1) {
        throw new TodoApiError('Todo not found', 404);
      }

      const updatedTodo = { ...todos[todoIndex], ...updates };
      todos[todoIndex] = updatedTodo;
      saveToStorage(todos);
      return updatedTodo;
    }

    // Development API call
    const API_BASE = 'http://localhost:5000';
    try {
      const response = await fetch(`${API_BASE}/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new TodoApiError(
          errorData.message || `Failed to update todo: ${response.statusText}`,
          response.status
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TodoApiError) throw error;
      throw new TodoApiError('Network error: Unable to update todo');
    }
  },

  // Health check
  async healthCheck(): Promise<boolean> {
    if (DEMO_MODE) {
      return true;
    }

    const API_BASE = 'http://localhost:5000';
    try {
      const response = await fetch(`${API_BASE}/`);
      return response.ok;
    } catch {
      return false;
    }
  },
};
