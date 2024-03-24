//User.js in the ToDoTask/serverSide/model/User.js (model for user) 
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    fullName: String
});

module.exports = mongoose.model("User", userSchema);
