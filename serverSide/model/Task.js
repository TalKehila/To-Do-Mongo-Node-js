//Task.js in the ToDoTask/serverSide/model/Task.js (model for task) 
const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    priority: {
        type: Number,
        min: 1,
        max: 5
    }
});
module.exports = mongoose.model("Task", taskSchema);