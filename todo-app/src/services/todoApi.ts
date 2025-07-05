const API_BASE = 'http://localhost:5000';

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

export const todoApi = {
  // Get all todos
  async getTodos(): Promise<ApiTodo[]> {
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
    try {
      const response = await fetch(`${API_BASE}/`);
      return response.ok;
    } catch {
      return false;
    }
  },
};
