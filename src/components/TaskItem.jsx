import { useState } from 'react';
import ConfirmModal from './ConfirmModal';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description);
  const [noChangeMessage, setNoChangeMessage] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  function handleSave() {
    if (editTitle.trim() === '') return;

    const titleUnchanged = editTitle.trim() === task.title;
    const descriptionUnchanged = editDescription.trim() === (task.description || '');

    if (titleUnchanged && descriptionUnchanged) {
      setNoChangeMessage("You haven't changed anything");
      return;
    }

    onEdit(task.id, { title: editTitle, description: editDescription });
    setIsEditing(false);
  }

  function handleCancel() {
    setEditTitle(task.title);
    setEditDescription(task.description);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <li className="bg-white dark:bg-surface-dark border-l-4 border-brand-500 rounded-r-md p-4 shadow-md animate-fade-in">
        <p className="text-xs text-brand-600 dark:text-brand-500 font-medium mb-2 flex items-center gap-1">
          <span>✎</span> Editing task
        </p>
        <input
          type="text"
          value={editTitle}
          onChange={(e) => {
            setEditTitle(e.target.value);
            setNoChangeMessage('');
          }}
          autoFocus
          className="w-full text-sm font-medium border rounded px-2.5 py-2 mb-2 dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-brand-500"
        />
        <textarea
          value={editDescription}
          onChange={(e) => {
            setEditDescription(e.target.value);
            setNoChangeMessage('');
          }}
          placeholder="Description (optional)"
          rows={2}
          className="w-full text-xs text-gray-500 dark:text-gray-400 border rounded px-2.5 py-2 dark:bg-gray-700 dark:border-gray-600 resize-none focus:outline-none focus:border-brand-500"
        />
        {noChangeMessage && (
          <p className="text-xs text-amber-600 dark:text-amber-400 mb-2">
            {noChangeMessage}
          </p>
        )}
        <div className="flex gap-2 mt-3">
          <button
            onClick={handleSave}
            className="flex-1 text-sm py-1.5 rounded bg-brand-600 text-white hover:bg-brand-700 transition-colors"
          >
            Save changes
          </button>
          <button
            onClick={handleCancel}
            className="flex-1 text-sm py-1.5 rounded border dark:border-gray-600 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Discard
          </button>
        </div>
      </li>
    );
  }

  return (
    <>
    <li className="flex items-center gap-3 bg-white dark:bg-surface-dark rounded-2xl p-4 group">
      <button
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? `Mark "${task.title}" as active` : `Mark "${task.title}" as complete`}
        className={`w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center transition-colors ${
          task.completed
            ? 'bg-green-500'
            : 'border-2 border-gray-300 dark:border-gray-600'
        }`}
      >
        {task.completed && <span className="text-white text-xs">✓</span>}
      </button>

      <div className="flex-1 min-w-0" onClick={() => setIsEditing(true)}>
        <p
          className={`text-sm font-medium cursor-pointer truncate ${
            task.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-gray-100'
          }`}
        >
          {task.title}
        </p>
        {task.description && (
          <p className="text-xs text-gray-400 dark:text-gray-500 truncate mt-0.5">
            {task.completed ? 'Done' : task.description}
          </p>
        )}
      </div>

      <button
        onClick={() => setShowDeleteConfirm(true)}
        aria-label={`Delete "${task.title}"`}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-300 hover:text-red-500 text-sm"
      >
        ✕
      </button>
    </li>

    <ConfirmModal
      open={showDeleteConfirm}
      title="Delete this task?"
      message={`"${task.title}" will be removed permanently.`}
      onConfirm={() => {
        onDelete(task.id, task.title);
        setShowDeleteConfirm(false);
      }}
      onCancel={() => setShowDeleteConfirm(false)}
    />
    </>
  );
}

export default TaskItem;