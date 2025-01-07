'use client';

import { useState } from 'react';
import { Input } from './Input';
import { TodoItem } from './TodoItem';

export const TodoList = () => {
  const [todos, setTodos] = useState<string[]>([]);

  return (
    <div>
      <Input setTodos={setTodos} />
      <TodoItem todos={todos} setTodos={setTodos} />
    </div>
  );
};
