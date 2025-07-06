import React from 'react';
import type { TaskItemProps } from '../../types';

export default function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onUpdate({ ...task, status: e.target.value as typeof task.status });
  };

  return (
    <li className="flex justify-between items-center p-3 border rounded-md mb-2 bg-white shadow-sm">
      <div className="flex flex-col flex-1 mr-4">
        <h3 className="font-semibold text-gray-900">{task.title}</h3>
        {task.description && (
          <p className="text-gray-600 text-sm truncate">{task.description}</p>
        )}
        <p className="text-xs text-gray-500">
          Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'N/A'}
        </p>
      </div>
      <select
        className="mr-4 border rounded px-2 py-1"
        value={task.status}
        onChange={handleStatusChange}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <button
        onClick={() => onDelete(task.id)}
        className="text-red-600 hover:text-red-800 font-semibold"
        aria-label={`Delete task ${task.title}`}
      >
        Delete
      </button>
    </li>
  );
}