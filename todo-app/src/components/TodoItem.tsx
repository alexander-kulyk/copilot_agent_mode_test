import React from 'react';
import { Todo } from '../types';
import {
  TodoItem as StyledTodoItem,
  Checkbox,
  TodoText,
  DeleteButton,
  DragHandle,
} from '../styles/StyledComponents';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  isDragging?: boolean;
  onDragStart?: (e: React.DragEvent) => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
  onDragEnd?: () => void;
}

export const TodoItem = ({
  todo,
  onToggle,
  onDelete,
  isDragging = false,
  onDragStart,
  onDragOver,
  onDrop,
  onDragEnd,
}: TodoItemProps) => {
  return (
    <StyledTodoItem
      $completed={todo.completed}
      $isDragging={isDragging}
      draggable
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={onDragEnd}
    >
      <DragHandle>⋮⋮</DragHandle>
      <Checkbox
        type='checkbox'
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <TodoText $completed={todo.completed}>{todo.text}</TodoText>
      <DeleteButton onClick={() => onDelete(todo.id)}>🗑️</DeleteButton>
    </StyledTodoItem>
  );
};
