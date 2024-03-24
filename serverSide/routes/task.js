// //task.js file  (not model) ./routes/task.js (server side)

// const express = require('express');
// const common = require('../services/token');
// const router = express.Router();
// const Task = require('../model/Task')

// router.get('/', common.verifyToken, async (req,res) => {
//     let tasks = await Task.find();
//     res.send(tasks);
//     res.end();
// })


// router.post('/',common.verifyToken, async (req,res) =>{
//    const tasks = new Task({
//     title: req.body.name,
//     description: req.body.description,
//     priority: req.body.priority
//    });

//    try {
//     await tasks.save();
//     res.send(tasks);
//     res.end();
//    }
//    catch(error){
//     res.status(404);
//     res.send(error);
//     res.end();
//    }
// })

// module.exports=router;


// task.js file (server-side)
const express = require('express');
const common = require('../services/token');
const router = express.Router();
const Task = require('../model/Task');

// Middleware to verify user token
router.use(common.verifyToken);

// GET endpoint to retrieve tasks
router.get('/', async (req, res) => {
    let tasks = await Task.find();
    res.send(tasks);
});

// POST endpoint to add a new task
router.post('/', async (req, res) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.description,
        priority: req.body.priority
    });

    try {
        await task.save();
        res.send(task);
    } catch (error) {
        res.status(500).send(error.message);
    }
});


router.delete('/:id',async (req,res) =>{
    try {
        const taskId = req.params.id;
        const deletetask = await Task.findOneAndDelete(taskId);
        if(!deletetask){
            res.status(404).send("Task not found");
        }
        res.send(deletetask);

    }catch(error) {
        res.status(500).send(error.message);
    }
})
module.exports = router;