import { useState } from 'react';
import useLocalStorage from './useLocalStorage';

function useTasks() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date'); 
  function addTask(title, description) {
    const newTask = {
      id: crypto.randomUUID(),
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }

  function toggleTask(id) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  }

  function editTask(id, newData) {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...newData } : task
      )
    );
  }

  const filteredTasks = tasks
    .filter((task) => {
      if (filter === 'active') return !task.completed;
      if (filter === 'completed') return task.completed;
      return true;
    })
    .filter((task) => task.title.toLowerCase().includes(searchTerm.toLowerCase()))
  .sort((a, b) => {
    if (sortBy === 'alphabetical') return a.title.localeCompare(b.title);
    return b.createdAt - a.createdAt;
  });
 return {
  tasks: filteredTasks,
  filter,
  setFilter,
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
  addTask,
  toggleTask,
  deleteTask,
  editTask,
};
}

export default useTasks;