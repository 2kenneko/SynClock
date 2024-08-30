'use client';

import { useEffect, useState } from 'react';
import styles from './todo.module.css';
import { useRecoilState } from 'recoil';
import { darkThemeState } from '@/components/header-footer/Header';

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  isdeleting: boolean;
};

export default function Page() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>('');
  let [darktheme] = useRecoilState(darkThemeState);

  // ページが読み込まれたときにlocalStorageからTODOリストを読み込む
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // TODOリストが変更されるたびにlocalStorageに保存
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  // タスクの追加
  const handleAddTodo = () => {
    if (newTodo.trim() === '') return;
    const newTask: Todo = {
      id: Date.now(),
      text: newTodo,
      completed: false,
      isdeleting: false,
    };
    setTodos([...todos, newTask]);
    setNewTodo('');
  };

  const handleToggleTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
  };

  const handleDeleteTodo = (id: number) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, isdeleting: !todo.isdeleting } : todo)));
    setTimeout(function () {
      setTodos(todos.filter((todo) => todo.id !== id));
    }, 450);
  };

  // タスクを全てクリア
  const handleClearTodos = () => {
    setTodos([]);
    localStorage.removeItem('todos');
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
          <button className={styles.clear_button} onClick={handleClearTodos}>
            Clear All
          </button>
        </div>
      </div>
      <ul className={styles.ul}>
        {todos.map((todo) => (
          <li key={todo.id} className={`${styles.li} ${todo.completed ? styles.li_checked : ''} ${todo.isdeleting ? styles.li_deleting : ''}`}>
            <input className={styles.checkbox} type="checkbox" checked={todo.completed} onChange={() => handleToggleTodo(todo.id)} ></input>
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
