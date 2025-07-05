import styled from 'styled-components';

export const AppContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  min-height: 100vh;
`;

export const TodoContainer = styled.div`
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  padding: 2rem;
`;

export const Title = styled.h1`
  text-align: center;
  color: #333;
  margin-bottom: 2rem;
  font-size: 2.5rem;
  font-weight: 700;
`;

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

export const Input = styled.input`
  flex: 1;
  padding: 0.75rem 1rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-size: 1rem;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #667eea;
  }
`;

export const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #5a6fd8;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

export const DownloadButton = styled.button`
  padding: 0.5rem 1rem;
  background: #28a745;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: 1rem;

  &:hover {
    background: #218838;
  }
`;

export const TodoList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

interface TodoItemProps {
  $completed: boolean;
  $isDragging: boolean;
}

export const TodoItem = styled.div<TodoItemProps>`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: ${(props) => (props.$completed ? '#f8f9fa' : 'white')};
  border: 2px solid ${(props) => (props.$completed ? '#e9ecef' : '#f0f0f0')};
  border-radius: 8px;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$isDragging ? 0.5 : 1)};
  cursor: grab;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: translateY(-2px);
  }

  &:active {
    cursor: grabbing;
  }
`;

export const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  cursor: pointer;
`;

interface TodoTextProps {
  $completed: boolean;
}

export const TodoText = styled.span<TodoTextProps>`
  flex: 1;
  font-size: 1rem;
  color: ${(props) => (props.$completed ? '#6c757d' : '#333')};
  text-decoration: ${(props) => (props.$completed ? 'line-through' : 'none')};
  transition: all 0.3s ease;
`;

export const DeleteButton = styled.button`
  background: #dc3545;
  color: white;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s ease;

  &:hover {
    background: #c82333;
  }
`;

export const DragHandle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  cursor: grab;
  padding: 0.25rem;

  &::before,
  &::after {
    content: '';
    width: 4px;
    height: 4px;
    background: #ccc;
    border-radius: 50%;
  }
`;

export const EmptyState = styled.div`
  text-align: center;
  padding: 3rem 2rem;
  color: #6c757d;
  font-size: 1.1rem;
`;

export const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e0e0e0;
  color: #6c757d;
  font-size: 0.9rem;
`;

export const ErrorMessage = styled.div`
  background: #f8d7da;
  color: #721c24;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
  border: 1px solid #f5c6cb;
  font-size: 0.9rem;
`;

export const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6c757d;
  font-size: 1.1rem;
`;

export const StatSpan = styled.span`
  color: #6c757d;
`;
