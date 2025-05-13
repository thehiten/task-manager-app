import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState('');
  const [priority, setPriority] = useState('Low');
  const [tasks, setTasks] = useState([]);

  // Fetch tasks from the backend
  const fetchTasks = async () => {
    const res = await axios.get('http://localhost:4001/tasks');
    setTasks(res.data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:4001/tasks', { name, priority });
    setName('');
    setPriority('Low');
    fetchTasks(); // Refresh task list after adding
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">📝 Task Manager</h1>

      {/* Task Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm rounded-lg p-6 mb-6 w-full max-w-md border border-gray-300"
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Task Name</label>
          <input
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Buy groceries"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Priority</label>
          <select
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-300"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded"
        >
          Add Task
        </button>
      </form>

      {/* Task List */}
      <div className="w-full max-w-md">
        <h2 className="text-2xl font-medium text-gray-700 mb-4">📋 Task List</h2>
        <ul className="bg-white shadow-sm rounded-lg p-4 space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className="flex justify-between items-center p-3 border-b border-gray-200"
            >
              <span className="text-gray-700">{task.name}</span>
              <span
                className={`text-sm font-medium ${
                  task.priority === 'Low'
                    ? 'text-green-600'
                    : task.priority === 'Medium'
                    ? 'text-yellow-600'
                    : 'text-red-600'
                }`}
              >
                {task.priority}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
