import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTasks = async () => {
    const res = await axios.get("http://localhost:5000/api/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title) return;
    await axios.post("http://localhost:5000/api/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const updateTask = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`, {
      title: editText,
    });
    setEditingId(null);
    setEditText("");
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          📝 Task Manager
        </h1>

        {/* Add Task */}
        <div className="flex gap-2 mb-6">
          <input
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter a task..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              {editingId === task._id ? (
                <>
                  <input
                    className="flex-1 border rounded px-2 py-1 mr-2"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <button
                    onClick={() => updateTask(task._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1">{task.title}</span>
                  <button
                    onClick={() => {
                      setEditingId(task._id);
                      setEditText(task.title);
                    }}
                    className="bg-yellow-400 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteTask(task._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;