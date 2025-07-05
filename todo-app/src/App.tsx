import React, { useState, useEffect } from 'react';
import { Todo } from './types';
import { AddTodo } from './components/AddTodo';
import { TodoItem } from './components/TodoItem';
import { GlobalStyle } from './styles/GlobalStyle';
import {
  AppContainer,
  TodoContainer,
  Title,
  TodoList,
  EmptyState,
  StatsContainer,
  DownloadButton,
  HeaderContainer,
  ErrorMessage,
  LoadingMessage,
  StatSpan,
} from './styles/StyledComponents';
import { todoApi, TodoApiError } from './services/todoApi';

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load todos from backend API
  const loadTodos = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetchedTodos = await todoApi.getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error loading todos:', error);
      setError(
        error instanceof TodoApiError ? error.message : 'Failed to load todos'
      );
    } finally {
      setLoading(false);
    }
  };

  // Load initial data from backend
  useEffect(() => {
    loadTodos();
  }, []);

  const addTodo = async (text: string) => {
    try {
      setError(null);
      const newTodo = await todoApi.createTodo(text);
      setTodos((prev) => [...prev, newTodo]);
    } catch (error) {
      console.error('Error adding todo:', error);
      setError(
        error instanceof TodoApiError ? error.message : 'Failed to add todo'
      );
    }
  };

  const toggleTodo = async (id: string) => {
    try {
      setError(null);
      const updatedTodo = await todoApi.toggleTodo(id);
      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? updatedTodo : todo))
      );
    } catch (error) {
      console.error('Error toggling todo:', error);
      setError(
        error instanceof TodoApiError ? error.message : 'Failed to update todo'
      );
    }
  };

  const deleteTodo = async (id: string) => {
    try {
      setError(null);
      await todoApi.deleteTodo(id);
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError(
        error instanceof TodoApiError ? error.message : 'Failed to delete todo'
      );
    }
  };

  // Download todos as JSON file
  const downloadTodos = () => {
    const dataStr = JSON.stringify(todos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'todos.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Simple drag and drop functions
  const handleDragStart = (e: React.DragEvent, todoId: string) => {
    setDraggedItem(todoId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', todoId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();

    if (!draggedItem || draggedItem === targetId) return;

    const draggedIndex = todos.findIndex((todo) => todo.id === draggedItem);
    const targetIndex = todos.findIndex((todo) => todo.id === targetId);

    if (draggedIndex !== -1 && targetIndex !== -1) {
      const newTodos = [...todos];
      const [draggedTodo] = newTodos.splice(draggedIndex, 1);
      newTodos.splice(targetIndex, 0, draggedTodo);
      setTodos(newTodos);
    }

    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  const completedCount = todos.filter((todo) => todo.completed).length;
  const totalCount = todos.length;

  if (loading) {
    return (
      <>
        <GlobalStyle />
        <AppContainer>
          <TodoContainer>
            <LoadingMessage>Loading todos...</LoadingMessage>
          </TodoContainer>
        </AppContainer>
      </>
    );
  }

  return (
    <>
      <GlobalStyle />
      <AppContainer>
        <TodoContainer>
          <HeaderContainer>
            <Title>📝 To-Do List</Title>
            <DownloadButton onClick={downloadTodos}>
              📥 Download Todos
            </DownloadButton>
          </HeaderContainer>

          {error && <ErrorMessage>{error}</ErrorMessage>}

          <AddTodo onAdd={addTodo} />

          {todos.length === 0 ? (
            <EmptyState>
              🎉 No tasks yet! Add one above to get started.
            </EmptyState>
          ) : (
            <>
              <TodoList>
                {todos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                    isDragging={draggedItem === todo.id}
                    onDragStart={(e: React.DragEvent) =>
                      handleDragStart(e, todo.id)
                    }
                    onDragOver={handleDragOver}
                    onDrop={(e: React.DragEvent) => handleDrop(e, todo.id)}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </TodoList>

              <StatsContainer>
                <StatSpan>Total: {totalCount} tasks</StatSpan>
                <StatSpan>
                  Completed: {completedCount}/{totalCount}
                </StatSpan>
                <StatSpan>
                  {completedCount === totalCount && totalCount > 0
                    ? '🎉 All done!'
                    : `${totalCount - completedCount} remaining`}
                </StatSpan>
              </StatsContainer>
            </>
          )}
        </TodoContainer>
      </AppContainer>
    </>
  );
};

export default App;
