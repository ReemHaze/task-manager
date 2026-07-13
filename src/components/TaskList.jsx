import TaskItem from './TaskItem';

function TaskList({ tasks = [], onToggle, onDelete, onEdit }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8 text-sm">
        No tasks yet — add one above.
      </p>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </ul>
  );
}

export default TaskList;