'use client';

import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import styles from './todo.module.css';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');

  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;

    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
    };

    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className={styles.APP}>
      <h1>TODO List</h1>
      <div>
        <input className={styles.input} type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
        <button className={styles.button} onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <ul className={styles.ul}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.li}>
            <span className={styles.span} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }} onClick={() => handleToggleTodo(todo.id)}>
              {todo.text}
            </span>
            <button className={styles.button} onClick={() => handleDeleteTodo(todo.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
