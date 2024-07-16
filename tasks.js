const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/auth');

// Create a new task
router.post('/', authMiddleware, async (req, res) => {
    const { title, description, dueDate } = req.body;
    const task = new Task({ title, description, dueDate, userId: req.userId });
    await task.save();
    res.status(201).send(task);
});

// Get all tasks for the logged-in user
router.get('/', authMiddleware, async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.send(tasks);
});

// Update a task
router.put('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { title, description, dueDate } = req.body;
    const task = await Task.findOneAndUpdate({ _id: id, userId: req.userId }, { title, description, dueDate }, { new: true });
    if (!task) {
        return res.status(404).send({ message: 'Task not found' });
    }
    res.send(task);
});

// Delete a task
router.delete('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
    const task = await Task.findOneAndDelete({ _id: id, userId: req.userId });
    if (!task) {
        return res.status(404).send({ message: 'Task not found' });
    }
    res.send({ message: 'Task deleted' });
});

module.exports = router;
