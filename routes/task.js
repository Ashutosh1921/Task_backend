const express = require('express');
const router = express.Router();
const Task = require('../model/task');

router.post('/', async (req, res) => {
    try {
        const task = new Task(req.body);
        await task.save();
        res.status(201).send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


router.get('/', async (req, res) => {
    const { status } = req.query;
    try {
        const filter = status ? { status } : {};
        const tasks = await Task.find(filter);
        res.send(tasks);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.get('/:task_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.task_id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.put('/:task_id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'description', 'status', 'dueDate'];
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.task_id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});


router.delete('/:task_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.task_id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        res.send({ message: 'Task deleted', task });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});


router.patch('/:task_id/status', async (req, res) => {
    const { status } = req.body; // Example: { "status": "completed" }
    if (!status) {
        return res.status(400).send({ error: 'Status is required' });
    }

    try {
        const task = await Task.findById(req.params.task_id);
        if (!task) {
            return res.status(404).send({ error: 'Task not found' });
        }
        task.status = status;
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
