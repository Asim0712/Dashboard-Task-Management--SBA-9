import type { TaskListProps } from '../../types';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onUpdate,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <p className="text-center text-gray-500 mt-8">
        No tasks found matching your criteria.
      </p>
    );
  }

  return (
    <ul className="max-h-[400px] overflow-y-auto">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onUpdate={onUpdate} onDelete={onDelete} />
      ))}
    </ul>
  );
}