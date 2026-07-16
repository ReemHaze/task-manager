function FilterBar({ filter, onFilterChange }) {
  return (
    <div className="flex gap-2">
      <button
        onClick={() => onFilterChange('all')}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
          filter === 'all'
            ? 'bg-brand-600 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        All
      </button>
      <button
        onClick={() => onFilterChange('active')}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
          filter === 'active'
            ? 'bg-brand-600 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        Active
      </button>
      <button
        onClick={() => onFilterChange('completed')}
        className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
          filter === 'completed'
            ? 'bg-brand-600 text-white'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
        }`}
      >
        Completed
      </button>
    </div>
  );
}

export default FilterBar;