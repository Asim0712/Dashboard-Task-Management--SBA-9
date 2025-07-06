import React from 'react';
import type { TaskFilterProps, TaskPriority, TaskStatus } from '../../types';

const statuses: (TaskStatus | 'all')[] = ['all', 'pending', 'in-progress', 'completed'];
const priorities: (TaskPriority | 'all')[] = ['all', 'low', 'medium', 'high'];

export default function TaskFilter({ filters, onChange }: TaskFilterProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, status: e.target.value as TaskStatus | 'all' });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({ ...filters, priority: e.target.value as TaskPriority | 'all' });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...filters, searchQuery: e.target.value });
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
      <input
        type="search"
        placeholder="Search tasks..."
        value={filters.searchQuery}
        onChange={handleSearchChange}
        className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
        aria-label="Search tasks"
      />

      <select
        aria-label="Filter by status"
        value={filters.status}
        onChange={handleStatusChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring"
      >
        {statuses.map((status) => (
          <option key={status} value={status}>
            {status === 'all' ? 'All Statuses' : status.charAt(0).toUpperCase() + status.slice(1)}
          </option>
        ))}
      </select>

      <select
        aria-label="Filter by priority"
        value={filters.priority}
        onChange={handlePriorityChange}
        className="border rounded px-3 py-2 focus:outline-none focus:ring"
      >
        {priorities.map((priority) => (
          <option key={priority} value={priority}>
            {priority === 'all' ? 'All Priorities' : priority.charAt(0).toUpperCase() + priority.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}