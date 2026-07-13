import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);

  function handleSave() {
    if (editTitle.trim() === '') return;
    onEdit(task.id, { title: editTitle });
    setIsEditing(false);
  }

  return (
    <li className="flex items-center justify-between gap-3 p-3 bg-white dark:bg-surface-dark rounded-md shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="w-4 h-4 accent-primary-500 cursor-pointer"
        />
        <div className="min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              onBlur={handleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSave();
                if (e.key === 'Escape') {
                  setEditTitle(task.title);
                  setIsEditing(false);
                }
              }}
              autoFocus
              className="text-sm border rounded px-2 py-0.5 w-full dark:bg-gray-700 dark:text-white"
            />
          ) : (
            <p
              onClick={() => setIsEditing(true)}
              className={`text-sm font-medium truncate cursor-pointer ${
                task.completed
                  ? 'line-through text-gray-400'
                  : 'text-gray-800 dark:text-gray-100'
              }`}
            >
              {task.title}
            </p>
          )}

          {task.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {task.description}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          if (window.confirm(`Delete "${task.title}"? This can't be undone.`)) {
            onDelete(task.id);
          }
        }}
        className="text-red-500 hover:text-red-700 text-sm font-medium transition-colors"
      >
        Delete
      </button>
    </li>
  );
}

export default TaskItem;