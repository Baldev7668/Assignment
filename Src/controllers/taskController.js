const Task = require('../models/Task');

exports.createTask = async (req, res) => {
  try {
    const { title, description, dueDate, priority, assignedTo } = req.body;

    const task = await Task.create({
      title,
      description,
      dueDate,
      priority,
      assignedTo,
      createdBy: req.user._id,
    });

    res.status(201).json({ message: 'Task created successfully.', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({}).populate('assignedTo', 'username email');
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const task = await Task.findByIdAndUpdate(id, updates, { new: true });
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    res.status(200).json({ message: 'Task updated successfully.', task });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: 'Task not found.' });

    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
