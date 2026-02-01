import React, { useState } from "react";

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(todo.text);

  function save() {
    if (!text.trim()) return;
    onEdit(text.trim());
    setEditing(false);
  }

  return (
    <div className="todo-item">
      <input
        className="todo-checkbox"
        type="checkbox"
        checked={!!todo.done}
        onChange={onToggle}
      />

      {editing ? (
        <>
          <input
            className="todo-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={{ marginRight: "0.5rem" }}
          />
          <div className="actions">
            <button className="action-btn save" onClick={save}>
              Save
            </button>
            <button
              className="action-btn"
              onClick={() => {
                setEditing(false);
                setText(todo.text);
              }}
            >
              Cancel
            </button>
          </div>
        </>
      ) : (
        <>
          <div className={`todo-text ${todo.done ? "done" : ""}`}>
            {todo.text}
          </div>
          <div className="actions">
            <button
              className="action-btn edit"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button className="action-btn delete" onClick={onDelete}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
}
