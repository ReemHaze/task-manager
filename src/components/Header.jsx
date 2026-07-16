function Header({ completedCount, totalCount, theme, onToggleTheme }) {
  return (
    <div className="bg-white dark:bg-surface-dark rounded-2xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-medium text-gray-800 dark:text-white">
            Today's tasks
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
            {completedCount} of {totalCount} done
          </p>
        </div>
        <button
          onClick={onToggleTheme}
          aria-label="Toggle dark mode"
          className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-300"
        >
          {theme === 'dark' ? '☀' : '☾'}
        </button>
      </div>

      <div className="h-1.5 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-600 transition-all duration-300"
          style={{ width: totalCount > 0 ? `${(completedCount / totalCount) * 100}%` : '0%' }}
        />
      </div>
    </div>
  );
}

export default Header;