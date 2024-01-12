
const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// GET REQUESTS

// get all task
// api/v1/tasks/
router.get('/', taskController.getAllTask);

// get a specific task
// api/v1/tasks/:id
router.get('/:id', taskController.getTaskById);

//POST REQUESTS

// create a new task
// api/v1/tasks/add
router.post('/add', taskController.addNewTask)

// PUT REQUESTS

// change task info
// api/v1/tasks/:id
router.put('/:id', taskController.changeTaskInfo);


// DELETE REQUEST

// soft delete task by id
// api/v1/tasks/:id
router.delete( '/:id', taskController.deleteATask);

module.exports = router;