import type { Task } from "../types";
interface Props {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}
function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <li className="bg-white p-3 rounded shadow flex justify-between items-center">
      <span
        onClick={() => onToggle(task.id)}
        className={`cursor-pointer ${
          task.completed ? "line-through text-gray-400" : ""
        }`}
      >
        {task.title} 
      </span>

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 text-sm ml-4"
      >
        Delete
      </button>
    </li>
  );
}
export default TaskItem;