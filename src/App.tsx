import TaskItem from "./components/TaskItem";
import { useTasks } from "./hooks/useTasks";

function App() {
  const { tasks, addTask, toggleTask, deleteTask, updateTask, filteredTasks, remainingTasks, title, setTitle, filter, setFilter } = useTasks();
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-lg transition-all">
          <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Task Manager
          </h1>

          <div className="flex w-full gap-2 mb-4">
            <div className="flex w-full gap-2 mb-5">
              <input
                type="text"
                value={title}
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                placeholder="Enter task..."
                onChange={(e) => setTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTask();
                    setTitle("");
                  }
                }}
              />

              <button
                onClick={() => {
                  addTask();
                  setTitle("");
                }}
                className="bg-blue-500 hover:bg-blue-600 active:scale-95 transition text-white px-5 rounded-lg"
              >
                Add
              </button>
            </div>       
          </div>      
          <div className="text-sm text-gray-600 mb-4 text-center">
            <p>
              Total: <span className="font-semibold">{tasks.length}</span> | Completed:{" "}
              <span className="font-semibold">
                {tasks.filter((t) => t.completed).length}
              </span>
            </p>
            <p>{remainingTasks} tasks remaining</p>
          </div>
          <div className="flex justify-center gap-2 mb-4">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-1.5 rounded-full text-sm transition ${
                filter === "all"
                  ? "bg-blue-500 text-white shadow"
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
          <ul className="mt-4 space-y-3 transition-all duration-300">
            {filteredTasks.length === 0 ? (
              <div className="text-center text-gray-400 py-6">
                <p className="text-lg">No tasks found 👀</p>
                <p className="text-sm">Try adding a new task!</p>
              </div>
            ) : (
            filteredTasks.map((task) => (
            <TaskItem
                key={task.id}
                task={task}
                onToggle={toggleTask}
                onDelete={deleteTask}
                onUpdate={updateTask}
              />
            )))}
          </ul>      
      </div>
    </div>
  );
}

export default App;
