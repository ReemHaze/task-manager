import useTasks from './hooks/useTasks';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import useTheme from './hooks/useTheme';

function App() {
  const { tasks, filter, setFilter, searchTerm, setSearchTerm, sortBy, setSortBy, addTask, toggleTask, deleteTask, editTask } = useTasks();
  const { theme, toggleTheme } = useTheme();

  console.log('tasks value:', tasks);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-6 md:p-8">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            Task Manager
          </h1>
          <button
            onClick={toggleTheme}
            className="border rounded px-3 py-1 text-sm dark:text-white dark:border-gray-600"
          >
            {theme === 'dark' ? 'Light mode' : 'Dark mode'}
          </button>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1 rounded text-sm border ${filter === 'all' ? 'bg-gray-800 text-white' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-3 py-1 rounded text-sm border ${filter === 'active' ? 'bg-gray-800 text-white' : ''}`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3 py-1 rounded text-sm border ${filter === 'completed' ? 'bg-gray-800 text-white' : ''}`}
          >
            Completed
          </button>
        </div>

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search tasks..."
          className="border rounded px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1.5 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600"
        >
          <option value="date">Newest first</option>
          <option value="alphabetical">A-Z</option>
        </select>

        <TaskForm onAddTask={addTask} />

        <TaskList
          tasks={tasks}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </div>
  );
}

export default App;