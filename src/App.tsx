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
  const updateTask = (id: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newText } : task
      )
    );
  };
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Task Manager
          </h1>

          <div className="flex w-full gap-2 mb-4">
            <input
              type="text"
              value={title}
              className="flex-1 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 min-w-0"
              placeholder="Enter task..."
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  {addTask}
                }
              }}         
            />
            <button
              onClick={addTask}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded"
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
              className={`px-3 py-1 rounded transition ${
                filter === "all"
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 hover:bg-gray-300"
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
          <ul className="mt-4 space-y-2 transition duration-200">
            {filteredTasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            ))}
          </ul>      
      </div>
    </div>
  );
}

export default App;
