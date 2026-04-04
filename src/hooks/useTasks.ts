import { useState, useEffect, useCallback } from "react";
import type { Task } from "../types";

export function useTasks() {
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
      id: Date.now(),
      title,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTitle("");
  };
  const toggleTask = useCallback((id: number) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, []);
  const deleteTask = useCallback((id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  },[]);
  const updateTask = useCallback((id: number, newText: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newText } : task
      )
    );
  }, []);

  return {
    tasks,
    addTask,
    toggleTask,
    deleteTask,
    updateTask,
    filteredTasks,
    remainingTasks,
    setTitle, 
    title,
    filter,
    setFilter   
  };
}