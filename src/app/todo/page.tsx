'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './todo.module.css';
import { useRecoilState } from 'recoil';
import { darkThemeState } from '~/components/header-footer/Header-footer';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  let [darktheme, setdarktheme] = useRecoilState(darkThemeState);

  // タスクの保存
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

  useEffect(() => {
    document.title = 'todo';
  }, []);

  return (
    <div className={darktheme ? `${styles.dark_mode}` : ''}>
      <div className={styles.text_container}>
        <h1 className={styles.text}>TODO List</h1>

        <div>
          <input className={styles.input} placeholder="Enter a TODO" type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          <button className={styles.button} onClick={handleAddTodo}>
            Add
          </button>
        </div>
      </div>
      <ul className={styles.ul}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.li}>
            <input className={styles.checkbox} type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} />
            <span className={styles.span} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
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
