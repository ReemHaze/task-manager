import { useState, useEffect } from 'react';
import { fetchTodos, addTodoApi, updateTodoApi, deleteTodoApi } from '../services/todosApi';
function useTasks() {
  const STORAGE_KEY = 'tasks';
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date');
  function isServerTask(id) {
  return typeof id === 'number';
}

  useEffect(() => {
    async function loadTasks() {
      try {
        const todos = await fetchTodos();
        const mapped = todos.map((t) => ({
          id: t.id,
          title: t.todo,
          description: '',
          completed: t.completed,
          createdAt: Date.now(),
        }));
        setTasks(mapped);
      } catch (error) {
        console.error('Failed to load todos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    loadTasks();
  }, []);

  async function addTask(title, description) {
    const tempId = crypto.randomUUID();
    const newTask = {
      id: tempId,
      title,
      description,
      completed: false,
      createdAt: Date.now(),
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);

    try {
      await addTodoApi(title);
    } catch (error) {
      console.error('Failed to add todo on server:', error);
    }
  }

  async function toggleTask(id) {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;

    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === id ? { ...t, completed: !t.completed } : t
      )
    );

    if (isServerTask(id)) {
      try {
        await updateTodoApi(id, { completed: !task.completed });
      } catch (error) {
        console.error('Failed to update todo on server:', error);
      }
    }
  
  }

  async function deleteTask(id) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));

    if (isServerTask(id)) {
      try {
        await deleteTodoApi(id);
      } catch (error) {
        console.error('Failed to delete todo on server:', error);
      }
    }
  }

  async function editTask(id, newData) {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, ...newData } : t))
    );

    if (isServerTask(id)) {
      try {
        await updateTodoApi(id, { todo: newData.title });
      } catch (error) {
        console.error('Failed to edit todo on server:', error);
      }
    }
  }

  const totalCount = tasks.length;
  const completedCount = tasks.filter((t) => t.completed).length;

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
    totalCount,
    completedCount,
    isLoading,
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