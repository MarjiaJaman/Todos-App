export async function fetchTodos(base) {
  const res = await fetch(`${base}/todos`);
  return res.json();
}

export async function createTodo(base, payload) {
  const res = await fetch(`${base}/todos`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function updateTodo(base, id, payload) {
  const res = await fetch(`${base}/todos/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function deleteTodo(base, id) {
  const res = await fetch(`${base}/todos/${id}`, {
    method: "DELETE",
  });
  return res.json();
}
