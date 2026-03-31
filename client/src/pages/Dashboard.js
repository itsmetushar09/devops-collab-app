import { useEffect, useState } from "react";
import axios from "axios";
const token = localStorage.getItem("token");

const config = {
  headers: {
    Authorization: token,
  },
};
export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks", config)
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return alert("Task cannot be empty");

    await axios.post("http://localhost:5000/api/tasks", { title }, config)
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`, config)
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    const updatedStatus =
      task.status === "pending" ? "completed" : "pending";

    await axios.put(
  `http://localhost:5000/api/tasks/${task._id}`,
  { status: updatedStatus },
  config
)
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
    if (!token) {
  window.location.href = "/login";
}
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 p-6">
      
      {/* Header */}
      <h1 className="text-3xl font-bold text-center mb-6">
        🚀 DevTask Dashboard
      </h1>

      {/* Add Task */}
      <div className="max-w-xl mx-auto bg-white p-4 rounded-xl shadow-lg flex gap-2 hover:shadow-2xl transition">
        <input
          className="flex-1 border p-2 rounded outline-none focus:ring-2 focus:ring-indigo-400"
          placeholder="Enter a task..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={addTask}
          className="bg-indigo-500 text-white px-4 rounded hover:bg-indigo-600 transition"
        >
          Add
        </button>
      </div>

      {/* Tasks */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tasks.map((t) => (
          <div
            key={t._id}
            className="bg-white p-4 rounded-xl shadow-md hover:shadow-xl transition transform hover:-translate-y-1"
          >
            <h2
              className={`text-lg font-semibold mb-2 ${
                t.status === "completed"
                  ? "line-through text-gray-400"
                  : ""
              }`}
            >
              {t.title}
            </h2>

            {/* Status Badge */}
            <span
              className={`text-xs px-2 py-1 rounded ${
                t.status === "completed"
                  ? "bg-green-200 text-green-800"
                  : "bg-yellow-200 text-yellow-800"
              }`}
            >
              {t.status}
            </span>

            <div className="flex justify-between items-center mt-4">
              <button
                onClick={() => toggleStatus(t)}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Toggle
              </button>

              <button
                onClick={() => deleteTask(t._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}