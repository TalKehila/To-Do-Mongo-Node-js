const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http');
const socketio = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const io = socketio(httpServer, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "Authorization"]
    }
});

const DBurl = "mongodb://localhost/TaskWorksDB";

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:4200',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
}));

// Socket.IO event listeners
io.on('connection', (socket) => {
    console.log("New client connected");

    socket.on('updatedTasks', (updatedTasks) => {
        console.log("Received updated tasks:", updatedTasks);
        io.emit('taskupdate', updatedTasks); // Emit task update to all clients
    });

    socket.on('disconnect', () => {
        console.log("Client disconnected ");
    });

});

// Your route handlers and database connection
const taskRouter = require('./routes/task');
app.use('/api/task', taskRouter);

const userRouter = require('./routes/user');
app.use('/api/user', userRouter);

mongoose.connect(DBurl).then(() => {
    console.log("MongoDB connected");
    const server = httpServer.listen(8080, () => {
        console.log("Server is running on port 8080");
    });
});
