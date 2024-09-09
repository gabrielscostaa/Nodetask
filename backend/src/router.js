const express = require('express');
const router = express.Router();

const tasksController = require('./controller/tasksController');
const tasksMiddleware = require('./middleware/tasksMiddleware');

// Defina as rotas corretamente
router.post('/', tasksMiddleware.validateTaskFields, tasksController.createTask);
router.put('/:id', tasksMiddleware.validateTaskFields, tasksController.updateTask);
router.get('/', tasksController.getAll);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
