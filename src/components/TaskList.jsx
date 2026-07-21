import { DndContext, closestCenter } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, arrayMove } from '@dnd-kit/sortable';
import TaskItem from './TaskItem';

function TaskList({ tasks, onToggle, onDelete, onEdit, onReorder, isDraggable }) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-400 py-8 text-sm">
        No matching tasks. Try a different search or filter.
      </p>
    );
  }

  function handleDragEnd(event) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex((t) => t.id === active.id);
    const newIndex = tasks.findIndex((t) => t.id === over.id);
    onReorder(arrayMove(tasks, oldIndex, newIndex));
  }

  if (!isDraggable) {
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

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <ul className="flex flex-col gap-2">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              isDraggable
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
}

export default TaskList;