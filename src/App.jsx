import useTasks from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useTheme from './hooks/useTheme';
import { useState } from 'react';
import Toast from './components/Toast';
import FilterBar from './components/FilterBar';
import Header from './components/Header';
import SortSearchBar from './components/SortSearchBar';

function App() {
  const { tasks, totalCount, completedCount, isLoading, filter, setFilter, searchTerm, setSearchTerm, sortBy, setSortBy, addTask, toggleTask, deleteTask, editTask, reorderTasks } = useTasks();
  const { theme, toggleTheme } = useTheme();
  const [toastMessage, setToastMessage] = useState('');

  function handleAdd(title, description) {
    addTask(title, description);
    setToastMessage('Task added');
  }

  function handleDelete(id, title) {
    deleteTask(id);
    setToastMessage(`Deleted "${title}"`);
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <Header
          completedCount={completedCount}
          totalCount={totalCount}
          theme={theme}
          onToggleTheme={toggleTheme}
        />

        <FilterBar filter={filter} onFilterChange={setFilter} />

        <SortSearchBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <TaskForm onAddTask={handleAdd} />

        {isLoading ? (
          <p className="text-center text-gray-400 py-8 text-sm">
            Loading tasks...
          </p>
        ) : (
          <div className="bg-white dark:bg-surface-dark rounded-2xl p-3 shadow-sm">
            <div className="max-h-[420px] overflow-y-auto pr-1">
             <TaskList
                tasks={tasks}
                onToggle={toggleTask}
                onDelete={handleDelete}
                onEdit={editTask}
                onReorder={(newOrder) => {
                  reorderTasks(newOrder);
                  setSortBy('manual');
                }}
                isDraggable={true}
              />
            </div>
          </div>
        )}
      </div>

      <Toast message={toastMessage} onDismiss={() => setToastMessage('')} />
    </div>
  );
}

export default App;