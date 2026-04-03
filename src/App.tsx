import { useState, useEffect } from "react";
import type { Task } from "./types";
import TaskItem from "./components/TaskItem";

function App() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });
  const remainingTasks = tasks.filter(task => !task.completed).length;
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!title.trim()) return;

    const newTask: Task = {
      id: tasks.length + 1,
      title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
  };
  const toggleTask = (id: number) => {
    setTasks(
      filteredTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };
  const deleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">
        Task Manager
      </h1>

      <div className="flex w-full gap-2 mb-4">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2 rounded flex-1 min-w-0"
          placeholder="Enter task..."
        />
        <button
          onClick={addTask}
          className="bg-blue-700 text-white px-4 py-2 rounded"
        >
          Add
        </button>        
      </div>      
      <p className="text-gray-700">
        Total: {tasks.length} | Completed: {tasks.filter(t => t.completed).length}
      </p>
      <p className="text-sm text-gray-600 mb-2">
        {remainingTasks} tasks remaining
      </p>
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => setFilter("all")}
          className={`px-3 py-1 rounded ${
            filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("active")}
          className={`px-3 py-1 rounded ${
            filter === "active" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Active
        </button>

        <button
          onClick={() => setFilter("completed")}
          className={`px-3 py-1 rounded ${
            filter === "completed" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Completed
        </button>
      </div>
      <ul className="mt-4 space-y-2">
        {filteredTasks.map((task) => (
         <TaskItem
            key={task.id}
            task={task}
            onToggle={toggleTask}
            onDelete={deleteTask}
          />
        ))}
      </ul>
      
    </div>
  );
}

export default App;
