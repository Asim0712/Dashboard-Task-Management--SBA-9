import type { Task, TaskStatus, TaskPriority } from '../types';

export function filterTasks(
  tasks: Task[],
  statusFilter: TaskStatus | 'all',
  priorityFilter: TaskPriority | 'all',
  searchQuery: string
): Task[] {
  return tasks.filter((task) => {
    const matchesStatus = statusFilter === 'all' || task.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (task.description && task.description.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesStatus && matchesPriority && matchesSearch;
  });
}

export function sortTasks(tasks: Task[], sortBy: 'createdAt' | 'dueDate' = 'createdAt'): Task[] {
  return [...tasks].sort((a, b) => {
    const dateA = a[sortBy] ? new Date(a[sortBy]!).getTime() : 0;
    const dateB = b[sortBy] ? new Date(b[sortBy]!).getTime() : 0;
    return dateA - dateB;
  });
}

export function validateTaskForm(data: {
  title: string;
  status: string;
  priority: string;
}): { valid: boolean; errors: { title?: string; status?: string; priority?: string } } {
  const errors: { title?: string; status?: string; priority?: string } = {};

  if (!data.title.trim()) {
    errors.title = 'Title is required';
  }
  if (!['pending', 'in-progress', 'completed'].includes(data.status)) {
    errors.status = 'Invalid status';
  }
  if (!['low', 'medium', 'high'].includes(data.priority)) {
    errors.priority = 'Invalid priority';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function formatDate(dateStr?: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}