import { useState, useEffect } from "react";
import type { Task } from "../types";

type Props = {
  task: Task;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onUpdate: (id: number, text: string) => void;
};

function TaskItem({ task, onToggle, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.title);

   useEffect(() => {
    setEditText(task.title);
  }, [task.title]);

  const handleSave = () => {
    if (editText.trim() === "") return;
    onUpdate(task.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm hover:shadow-md transition">
      
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
      />

      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSave();
            }
          }}
          onBlur={handleSave}
          className="border p-1 rounded"
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          className={task.completed ? "line-through text-gray-400" : ""}
        >
          {task.title}
        </span>
      )}

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