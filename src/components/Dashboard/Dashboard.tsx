import { useEffect, useState } from 'react';
import TaskForm from '../TaskForm/TaskForm';
import TaskFilter from '../TaskFilter/TaskFilter';
import TaskList from '../TaskList/TaskList';
import type {
    Task,
    TaskFormData,
    TaskStatus,
    TaskPriority,
    DashboardStats,
} from '../../types';
import { filterTasks, sortTasks } from '../../utils/taskUtils';

const LOCAL_STORAGE_KEY = 'taskDashboard.tasks';

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<{
    status: TaskStatus | 'all';
    priority: TaskPriority | 'all';
    searchQuery: string;
  }>({
    status: 'all',
    priority: 'all',
    searchQuery: '',
  });

  const [stats, setStats] = useState<DashboardStats>({
    total: 0,
    completed: 0,
    inProgress: 0,
    pending: 0,
  });

  useEffect(() => {
    const storedTasks = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedTasks) {
      try {
        const parsed = JSON.parse(storedTasks) as Task[];
        setTasks(parsed);
      } catch (error) {
        console.error('Failed to parse tasks from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(tasks));
    updateStats(tasks);
  }, [tasks]);

  const updateStats = (taskList: Task[]) => {
    const total = taskList.length;
    const completed = taskList.filter((t) => t.status === 'completed').length;
    const inProgress = taskList.filter((t) => t.status === 'in-progress').length;
    const pending = taskList.filter((t) => t.status === 'pending').length;

    setStats({ total, completed, inProgress, pending });
  };

  const handleAddTask = (data: TaskFormData) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title: data.title,
      description: data.description,
      status: data.status,
      priority: data.priority,
      dueDate: data.dueDate,
      createdAt: new Date().toISOString(),
    };
    setTasks((prev) => [...prev, newTask]);
  };

  const handleUpdateTask = (updatedTask: Task) => {
    setTasks((prev) => prev.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const filtered = filterTasks(tasks, filters.status, filters.priority, filters.searchQuery);
  const sorted = sortTasks(filtered, 'createdAt');

  return (
    <main className="max-w-4xl mx-auto px-4 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8">Task Dashboard</h1>

      <TaskForm onSubmit={handleAddTask} />
      <TaskFilter filters={filters} onChange={handleFilterChange} />
      <TaskList
        tasks={sorted}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />

      <div className="mt-10 bg-white rounded shadow p-4 flex justify-around text-sm text-gray-700">
        <div>
          <span className="font-bold">{stats.total}</span> Total
        </div>
        <div>
          <span className="font-bold text-green-600">{stats.completed}</span> Completed
        </div>
        <div>
          <span className="font-bold text-yellow-600">{stats.inProgress}</span> In Progress
        </div>
        <div>
          <span className="font-bold text-red-600">{stats.pending}</span> Pending
        </div>
      </div>
    </main>
  );
}