const express = require('express');
const tasksController = require(`./controller/tasksController`);

const router = express.Router();

 router.get(`/tasks`, tasksController.getAll);
 router.post(`/tasks`, validateBody,  tasksController.createTask);




module.exports = router;