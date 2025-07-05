import React, { useState } from 'react';
import { InputContainer, Input, AddButton } from '../styles/StyledComponents';

interface AddTodoProps {
  onAdd: (text: string) => void;
}

export const AddTodo = ({ onAdd }: AddTodoProps) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InputContainer>
        <Input
          type='text'
          value={text}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setText(e.target.value)
          }
          onKeyPress={handleKeyPress}
          placeholder='Add a new task...'
          maxLength={200}
        />
        <AddButton type='submit' disabled={!text.trim()}>
          Add Task
        </AddButton>
      </InputContainer>
    </form>
  );
};
