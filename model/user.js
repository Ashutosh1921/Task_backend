const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    taskAssigned: [{ type: mongoose.Types.ObjectId, ref: 'taskData' }],

}, { timestamps: true });

const User = mongoose.model("users", userSchema);

module.exports = User;