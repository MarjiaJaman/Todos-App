import React, { useEffect, useState } from "react";
import TodoItem from "./TodoItem";
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "./api";

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:4000";

export default function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  async function load() {
    const data = await fetchTodos(API_BASE);
    setTodos(data);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    if (!text.trim()) return;
    const added = await createTodo(API_BASE, { text: text.trim() });
    setTodos((t) => [added, ...t]);
    setText("");
  }

  async function handleToggle(todo) {
    const updated = await updateTodo(API_BASE, todo.id, { done: !todo.done });
    setTodos((t) => t.map((x) => (x.id === updated.id ? updated : x)));
  }

  async function handleDelete(id) {
    await deleteTodo(API_BASE, id);
    setTodos((t) => t.filter((x) => x.id !== id));
  }

  async function handleEdit(id, newText) {
    const updated = await updateTodo(API_BASE, id, { text: newText });
    setTodos((t) => t.map((x) => (x.id === updated.id ? updated : x)));
  }

  return (
    <div className="app-container">
      <div className="card">
        <div className="app-header">
          <h1 className="app-title">My To‑Do List</h1>
          <div style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
            Lightweight • React + Node
          </div>
        </div>

        <form onSubmit={handleAdd} className="todo-form">
          <input
            className="todo-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Add a task..."
          />
          <button className="btn primary">Add</button>
        </form>

        <div className="todo-list">
          {todos.length === 0 ? (
            <p style={{ color: "var(--muted)", margin: 0 }}>No todos yet</p>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={() => handleToggle(todo)}
                onDelete={() => handleDelete(todo.id)}
                onEdit={(newText) => handleEdit(todo.id, newText)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
