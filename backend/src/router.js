const express = require('express');
const router = express.Router();

const tasksController = require('./controller/tasksController');
const tasksMiddleware = require('./middleware/tasksMiddleware');

// Validação unificada para criar e atualizar tarefas
router.post('/tasks', tasksMiddleware.validateTaskFields, tasksController.createTask);
router.put('/tasks/:id', tasksMiddleware.validateTaskFields, tasksController.updateTask);

router.get('/tasks', tasksController.getAll);
router.delete('/tasks/:id', tasksController.deleteTask);

module.exports = router;
