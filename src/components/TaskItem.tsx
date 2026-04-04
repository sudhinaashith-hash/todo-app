import React  from "react";
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
    <li className="flex items-center gap-3 bg-white border p-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">      
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id)}
        className="w-4 h-4 accent-blue-500 cursor-pointer"
        />

      {isEditing ? (
        <input
        value={editText}
        autoFocus
        onChange={(e) => setEditText(e.target.value)}
        onKeyDown={(e) => {
            if (e.key === "Enter") {
            handleSave();
            }
        }}
        onBlur={handleSave}
        className="flex-1 border p-1.5 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      ) : (
        <span
        onDoubleClick={() => setIsEditing(true)}
        className={`flex-1 cursor-pointer ${
            task.completed ? "line-through text-gray-400" : "text-gray-700"
        }`}
        >
        {task.title}
        </span>
      )}

      <button
        onClick={() => onDelete(task.id)}
        className="text-red-500 text-sm hover:text-red-600 transition ml-2"
      >
        Delete
      </button>
    </li>
  );
}

export default React.memo(TaskItem);