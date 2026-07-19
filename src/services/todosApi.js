const BASE_URL = 'https://dummyjson.com/todos';

export async function fetchTodos() {
  const res = await fetch(`${BASE_URL}?limit=10`);
  const data = await res.json();
  return data.todos;
}

export async function addTodoApi(title) {
  const res = await fetch(`${BASE_URL}/add`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      todo: title,
      completed: false,
      userId: 1,
    }),
  });
  return res.json();
}

export async function updateTodoApi(id, changes) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(changes),
  });
  return res.json();
}

export async function deleteTodoApi(id) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });
  return res.json();
}