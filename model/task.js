const mongoose = require("mongoose");
const { type } = require("os");

const taskSchema = new mongoose.Schema({
    ID: {
        type: Number,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Description: {
        type: String,
    },
    Due_Date: {
        type: Date,
        required: true,
        default: Date.now,
    },
    Priority: {
        type: Number,
        required: true,
        default: 2,
        min: 1,
        max: 3
    },
    Status: {
        type: String,
        default: "pending",
    },
    userAssigned: [{ type: mongoose.Types.ObjectId, ref: 'User' }],


}, { timestamps: true })
// now creating a collection in db
const Task = mongoose.model('taskData', taskSchema);

module.exports = Task;