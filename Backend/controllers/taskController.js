import Task from '../models/taskModel.js';

export const fetchTasks = async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch tasks' });
  }
};

export const createTask = async (req, res) => {
  const { name, priority } = req.body;

  if (!name || !priority) {
    return res.status(400).json({ message: 'Name and priority are required' });
  }

  try {
    const task = await Task.create({ name, priority });
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create task' });
  }
};
