function SortSearchBar({ searchTerm, onSearchChange, sortBy, onSortChange }) {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search tasks..."
        className="flex-1 border rounded px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-brand-500"
      />

      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="border rounded px-3 py-1.5 text-sm dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:border-brand-500"
      >
        <option value="date">Newest first</option>
        <option value="alphabetical">A-Z</option>
      </select>
    </div>
  );
}

export default SortSearchBar;