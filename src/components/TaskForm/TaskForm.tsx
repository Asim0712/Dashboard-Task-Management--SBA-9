import React, { useState, useEffect } from 'react';
import type { TaskFormProps, TaskFormData } from '../../types';
import { validateTaskForm } from '../../utils/taskUtils';

const defaultFormData: TaskFormData = {
  title: '',
  description: '',
  status: 'pending',
  priority: 'medium',
  dueDate: '',
};

export default function TaskForm({ onSubmit, initialData }: TaskFormProps) {
  const [formData, setFormData] = useState<TaskFormData>(initialData ?? defaultFormData);
  const [errors, setErrors] = useState<{ title?: string; status?: string; priority?: string }>({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateTaskForm(formData);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }
    setErrors({});
    onSubmit(formData);
    setFormData(defaultFormData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <div className="mb-4">
        <label htmlFor="title" className="block font-semibold mb-1">
          Title <span className="text-red-600">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
            errors.title ? 'border-red-600' : 'border-gray-300'
          }`}
          value={formData.title}
          onChange={handleChange}
          required
          aria-invalid={errors.title ? 'true' : 'false'}
          aria-describedby={errors.title ? 'title-error' : undefined}
        />
        {errors.title && (
          <p className="text-red-600 mt-1 text-sm" id="title-error">
            {errors.title}
          </p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="description" className="block font-semibold mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="w-full border rounded px-3 py-2 border-gray-300 focus:outline-none focus:ring"
          value={formData.description}
          onChange={handleChange}
          rows={3}
        />
      </div>

      <div className="mb-4 flex space-x-4">
        <div className="flex-1">
          <label htmlFor="status" className="block font-semibold mb-1">
            Status <span className="text-red-600">*</span>
          </label>
          <select
            id="status"
            name="status"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.status ? 'border-red-600' : 'border-gray-300'
            }`}
            value={formData.status}
            onChange={handleChange}
            required
            aria-invalid={errors.status ? 'true' : 'false'}
            aria-describedby={errors.status ? 'status-error' : undefined}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {errors.status && (
            <p className="text-red-600 mt-1 text-sm" id="status-error">
              {errors.status}
            </p>
          )}
        </div>

        <div className="flex-1">
          <label htmlFor="priority" className="block font-semibold mb-1">
            Priority <span className="text-red-600">*</span>
          </label>
          <select
            id="priority"
            name="priority"
            className={`w-full border rounded px-3 py-2 focus:outline-none focus:ring ${
              errors.priority ? 'border-red-600' : 'border-gray-300'
            }`}
            value={formData.priority}
            onChange={handleChange}
            required
            aria-invalid={errors.priority ? 'true' : 'false'}
            aria-describedby={errors.priority ? 'priority-error' : undefined}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-600 mt-1 text-sm" id="priority-error">
              {errors.priority}
            </p>
          )}
        </div>
      </div>

      <div className="mb-4">
        <label htmlFor="dueDate" className="block font-semibold mb-1">
          Due Date
        </label>
        <input
          id="dueDate"
          name="dueDate"
          type="date"
          className="w-full border rounded px-3 py-2 focus:outline-none focus:ring border-gray-300"
          value={formData.dueDate ?? ''}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded transition"
      >
        {initialData ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
}