import { useState } from 'react';

function TaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (title.trim() === '') return;

    onAddTask(title, description);

    setTitle('');
    setDescription('');
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
      <input
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <textarea
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />
      <button
        type="submit"
        className="self-start bg-gray-800 text-white text-sm px-4 py-2 rounded hover:bg-gray-700 transition-colors"
      >
        Add task
      </button>
    </form>
  );
}

export default TaskForm;