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
      <label htmlFor="task-title" className="sr-only">Task title</label>
      <input
        id="task-title"
        type="text"
        placeholder="Task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />

      <label htmlFor="task-description" className="sr-only">Description (optional)</label>
      <textarea
        id="task-description"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
      />

      <button
        type="submit"
        className="self-start bg-brand-600 text-white text-sm px-4 py-2 rounded hover:bg-brand-700 transition-colors"
      >
        Add task
      </button>
    </form>
  );
}

export default TaskForm;